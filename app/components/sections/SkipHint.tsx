"use client";

import { ANIMATION_CLASSES } from "../../utils/animation";

interface SkipHintProps {
  showSkipHint: boolean;
  skipHintFading: boolean;
}

export default function SkipHint({ showSkipHint, skipHintFading }: SkipHintProps) {
  if (!showSkipHint) return null;
  
  return (
    <div 
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${skipHintFading ? ANIMATION_CLASSES.FADE_OUT : ANIMATION_CLASSES.FADE_IN}`}
      style={{ opacity: skipHintFading ? 1 : 0 }} // Initial state for animation
    >
      <button 
        id="skip-button"
        className="bg-transparent text-gray-500 text-xs hover:text-gray-300 transition-colors py-1 px-2 rounded"
        aria-label="Skip typewriter animation"
      >
        <em className="sm:hidden">tap to skip</em>
        <em className="hidden sm:inline">space to skip</em>
      </button>
    </div>
  );
} 