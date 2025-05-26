"use client";

import { useState } from "react";
import FadeIn from "../ui/animation/FadeIn";
import { ANIMATIONS } from "../../utils/animation";

interface SocialLinksProps {
  baseDelay: number;
  delayIncrement: number;
}

export default function SocialLinks({ baseDelay, delayIncrement }: SocialLinksProps) {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("tom@clado.ai");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), ANIMATIONS.TOAST.SHORT);
  };

  return (
    <div className="flex justify-center space-x-8 mt-12 mb-10">
      <FadeIn delay={baseDelay + delayIncrement * 6} className="inline-block">
        <a href="https://linkedin.com/in/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </FadeIn>
      <FadeIn delay={baseDelay + delayIncrement * 7} className="inline-block">
        <a href="https://x.com/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </a>
      </FadeIn>
      <FadeIn delay={baseDelay + delayIncrement * 8} className="inline-block">
        <a href="https://github.com/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </FadeIn>
      <FadeIn delay={baseDelay + delayIncrement * 9} className="inline-block">
        <button 
          onClick={copyEmailToClipboard} 
          className="relative cursor-pointer"
          aria-label="Copy email address to clipboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M22 7l-10 7L2 7"></path>
          </svg>
          {emailCopied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-foreground text-xs whitespace-nowrap bg-background/80 px-2 py-1 rounded-md backdrop-blur-sm">
              tom@clado.ai copied!
            </span>
          )}
        </button>
      </FadeIn>
    </div>
  );
} 