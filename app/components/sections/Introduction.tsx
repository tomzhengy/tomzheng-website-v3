"use client";

import { ReactNode } from "react";
import TypeWriter from "../ui/animation/Typewriter";

interface IntroductionProps {
  startTyping: boolean;
  isAnimationSkipped: boolean;
  allSegments: { text: string; render?: (text: string) => ReactNode }[];
  allPausePoints: { index: number; duration: number }[];
  onComplete: () => void;
}

export default function Introduction({
  startTyping,
  isAnimationSkipped,
  allSegments,
  allPausePoints,
  onComplete
}: IntroductionProps) {
  return (
    <section aria-labelledby="introduction">
      <div className="text-xl">
        {startTyping ? (
          <TypeWriter 
            segments={allSegments}
            pausePoints={allPausePoints}
            typingSpeed={60}
            onComplete={onComplete}
            keepCursorAfterComplete={true}
            isSkipped={isAnimationSkipped}
          />
        ) : (
          <span className="cursor-blink">_</span>
        )}
      </div>
    </section>
  );
} 