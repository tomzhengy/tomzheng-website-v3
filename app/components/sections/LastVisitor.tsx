"use client";

import { useEffect, useState } from "react";
import FadeIn from "../ui/animation/FadeIn";
import { supabase } from "@/app/lib/supabase-client";

interface Visitor {
  city: string | null;
  country: string | null;
  visited_at: string;
}

export default function LastVisitor() {
  const [lastVisitor, setLastVisitor] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);

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
          .limit(1)
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
        // Update with the new visitor
        if (payload.new) {
          setLastVisitor({
            city: payload.new.city,
            country: payload.new.country,
            visited_at: payload.new.visited_at
          });
        }
      })
      .subscribe();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading || !lastVisitor || !supabase) {
    return null;
  }

  return (
    <FadeIn delay={1000} className="fixed bottom-4 right-4 z-40">
      <div className="text-xs text-neutral-400">
        Last visit from {lastVisitor.city}, {lastVisitor.country}
      </div>
    </FadeIn>
  );
} 