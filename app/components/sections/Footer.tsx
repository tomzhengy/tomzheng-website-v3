"use client";

import FadeIn from "../ui/animation/FadeIn";

interface FooterProps {
  baseDelay: number;
  delayIncrement: number;
}

export default function Footer({ baseDelay, delayIncrement }: FooterProps) {
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-16 mb-8 text-center text-xs text-foreground/50">
      <FadeIn delay={baseDelay + delayIncrement * 10} className="inline-block">
        <p>© {year} Tom Zheng</p>
      </FadeIn>
    </footer>
  );
} 