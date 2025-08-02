"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/app/lib/supabase-client";

interface Visitor {
  city: string | null;
  country: string | null;
  visited_at: string;
}

export default function LastVisitor() {
  const [lastVisitor, setLastVisitor] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayedLocation, setDisplayedLocation] = useState<string>("");
  const typedLocationRef = useRef<string>("");

  useEffect(() => {
    // Skip if Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured - skipping visitor tracking');
      setLoading(false);
      return;
    }

    // Get location from IP using client-side API
    const getLocationAndTrack = async () => {
      try {
        // Get location using ipapi.co (works from browser too)
        const locationResponse = await fetch('https://ipapi.co/json/');
        
        if (!locationResponse.ok) {
          console.log('Location API rate limited or unavailable');
          return;
        }
        
        const locationData = await locationResponse.json();
        
        // Check if we got an error response from ipapi
        if (locationData.error || locationData.reason === 'RateLimited') {
          console.log('Location API rate limited:', locationData.message || 'Too many requests');
          return;
        }
        
        // Track this visit
        const { error: trackError } = await supabase
          .from('visitors')
          .insert({
            city: locationData.city || 'Unknown',
            country: locationData.country_name || 'Unknown',
            ip: locationData.ip || null,
          });
          
        if (trackError) {
          // Only log if it's not a typical development error
          if (trackError.message && !trackError.message.includes('Failed to fetch')) {
            console.log('Visitor tracking disabled:', trackError.message);
          }
        }
      } catch (error) {
        // Silently handle errors in development
        if (error instanceof Error && !error.message.includes('Failed to fetch')) {
          console.log('Visitor tracking unavailable');
        }
      }
    };

    // Fetch last visitor
    const fetchLastVisitor = async () => {
      try {
        const { data, error } = await supabase
          .from('visitors')
          .select('city, country, visited_at')
          .order('visited_at', { ascending: false })
          .range(1, 1)  // Get the second row (skip the current visitor)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          // Only log if it's not a "no rows" error
          console.log('Could not fetch last visitor');
        } else if (data) {
          setLastVisitor(data);
        }
      } catch (error) {
        // Silently handle in development
      } finally {
        setLoading(false);
      }
    };

    // Track visit and then fetch last visitor
    getLocationAndTrack().then(() => {
      // Wait a bit to ensure the database has updated
      setTimeout(fetchLastVisitor, 1000);
    });

    // Set up real-time subscription for new visitors
    const subscription = supabase
      .channel('visitors-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'visitors' 
      }, (payload: any) => {
        // When a new visitor arrives, the current "last visitor" becomes the second-to-last
        // So we don't need to update the display - it should still show the previous visitor
        // Only update if we're currently showing no visitor
        if (!lastVisitor && payload.new) {
          // This handles the edge case where there was no previous visitor
          // In this case, we can show the new visitor as the "last" visitor
          setLastVisitor({
            city: payload.new.city,
            country: payload.new.country,
            visited_at: payload.new.visited_at
          });
        }
        // Otherwise, keep showing the same "last visitor" (which is now second-to-last)
      })
      .subscribe();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Typewriter effect when location data is loaded
  useEffect(() => {
    if (lastVisitor && lastVisitor.city && lastVisitor.country) {
      const location = `${lastVisitor.city}, ${lastVisitor.country}`;
      
      // Only run typewriter if this is a new location
      if (typedLocationRef.current === location) {
        setDisplayedLocation(location);
        return;
      }
      
      typedLocationRef.current = location;
      let currentIndex = 0;
      setDisplayedLocation("");

      const typeInterval = setInterval(() => {
        if (currentIndex < location.length) {
          setDisplayedLocation(location.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50); // Adjust speed as needed

      return () => clearInterval(typeInterval);
    }
  }, [lastVisitor]);

  // Always show "last visit from" text
  if (!supabase) {
    return null;
  }

  // Don't render if we're still loading or if there's no visitor data
  if (loading) {
    return (
      <div className="text-sm text-foreground/50 mb-3">
        last visit from <span className="inline-block animate-[blink_1s_ease-in-out_infinite]">|</span>
      </div>
    );
  }

  if (!lastVisitor || !lastVisitor.city || !lastVisitor.country) {
    return null;
  }

  const fullLocation = `${lastVisitor.city}, ${lastVisitor.country}`;

  return (
    <div className="text-sm text-foreground/50 mb-3">
      last visit from {displayedLocation}<span className="inline-block animate-[blink_1s_ease-in-out_infinite]">|</span>
    </div>
  );
} 