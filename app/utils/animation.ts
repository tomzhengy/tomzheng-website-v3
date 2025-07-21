"use client";

/**
 * Animation timing constants
 * This file serves as a single source of truth for animation timing values.
 * Any component that needs animation timing should import from here.
 */

// Function to get a CSS variable value with fallback
export function getCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// Function to get a numeric value from a CSS variable
export function getCssVarAsNumber(name: string, fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return fallback;
  
  // Parse the value - handle cases like "0.5s" or "500ms"
  if (value.endsWith('ms')) {
    return parseFloat(value.replace('ms', ''));
  } else if (value.endsWith('s')) {
    return parseFloat(value.replace('s', '')) * 1000;
  }
  
  return parseFloat(value) || fallback;
}

// Animation constants - use CSS variables where available
export const ANIMATIONS = {
  // Durations in milliseconds
  SHORT: () => getCssVarAsNumber('--animation-short', 300),
  MEDIUM: () => getCssVarAsNumber('--animation-medium', 500),
  LONG: () => getCssVarAsNumber('--animation-long', 800),
  
  // Fade animations
  FADE_IN: () => getCssVarAsNumber('--animation-fade-in', 600),
  FADE_OUT: () => getCssVarAsNumber('--animation-fade-out', 500),
  
  // Notification durations
  TOAST: {
    SHORT: 2000,
    MEDIUM: 3500,
    LONG: 5000,
  },
};

// CSS class names for animations
export const ANIMATION_CLASSES = {
  FADE_IN: 'animate-fade-in',
  FADE_OUT: 'animate-fade-out',
}; 