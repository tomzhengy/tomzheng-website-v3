"use client";

import { useState, useEffect } from 'react';

export type AnimationState = 'INITIAL' | 'TYPING' | 'CONTENT_FADING' | 'COMPLETE';

const TEN_MINUTES_MS = 10 * 60 * 10;
const STORAGE_KEY = 'lastAnimationTime';

export const useAnimationManager = () => {
  // Start with INITIAL state to avoid hydration mismatch
  const [animationState, setAnimationState] = useState<AnimationState>('INITIAL');
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

  // Check for animation cooldown on client-side only
  useEffect(() => {
    try {
      const lastAnimationTime = localStorage.getItem(STORAGE_KEY);
      const currentTime = new Date().getTime();
      
      // If no previous animation or more than 10 minutes have passed
      if (!lastAnimationTime || (currentTime - parseInt(lastAnimationTime)) > TEN_MINUTES_MS) {
        setShouldPlayAnimation(true);
        setAnimationState('TYPING');
      } else {
        // Skip to final state if less than 10 minutes have passed
        setAnimationState('COMPLETE');
      }
    } catch (error) {
      // Handle localStorage errors (private browsing, etc.)
      console.error('Error accessing localStorage:', error);
      setShouldPlayAnimation(true);
      setAnimationState('TYPING');
    }
  }, []);
  
  const completeIntroTyping = () => {
    // This function is kept for backward compatibility but is no longer needed
    // It simply redirects to completeParaTyping
    completeParaTyping();
  };
  
  const completeParaTyping = () => {
    if (shouldPlayAnimation) {
      setAnimationState('CONTENT_FADING');
    }
  };
  
  const completeContentFading = () => {
    if (shouldPlayAnimation) {
      try {
        // Store the current time when animation completes
        localStorage.setItem(STORAGE_KEY, new Date().getTime().toString());
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
      setAnimationState('COMPLETE');
    }
  };
  
  return {
    animationState,
    shouldPlayAnimation,
    completeIntroTyping,
    completeParaTyping,
    completeContentFading
  };
};

export default useAnimationManager; 