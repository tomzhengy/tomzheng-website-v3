"use client";

import { ComponentType, useEffect, useState } from "react";

interface HeaderProps {
  currentTime: string;
  showHeaderElements: boolean;
  ThemeToggleComponent: ComponentType;
}

export default function Header({ currentTime, showHeaderElements, ThemeToggleComponent }: HeaderProps) {
  // State to track if component is mounted - for non-critical elements
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render non-critical elements after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="flex items-center justify-between mb-8 h-8 max-w-[420px]">
      {/* Non-critical elements - render after mount */}
      {isMounted && (
        <>
          <div className="relative">
            <div 
              className={`text-xl opacity-0 min-w-[120px] transition-all ${showHeaderElements ? 'opacity-85 hover:opacity-100 translate-x-0' : 'translate-x-8'}`}
              style={{ 
                transitionDuration: 'var(--animation-header)',
                transitionTimingFunction: 'var(--transition-timing)'
              }}
            >
              {currentTime}
            </div>
            
            {/* Arrow and text */}
            <div 
              className={`absolute -top-12 left-8 opacity-0 ${showHeaderElements ? 'opacity-50' : 'opacity-0 -translate-y-2'}`}
              style={{ 
                transition: `opacity var(--animation-header) var(--transition-timing),
                            transform var(--animation-header) var(--transition-timing)`,
                transitionDelay: showHeaderElements ? '0.6s' : '0s'
              }}
            >
              {/* Simple text with slant */}
              <span 
                className="text-xs italic text-foreground/50 whitespace-nowrap inline-block"
                style={{ 
                  transform: 'rotate(-5deg)',
                  transition: 'color var(--transition-duration) var(--transition-timing)'
                }}
              >
                my local time!
              </span>
              
              {/* Smooth curved arrow pointing down */}
              <svg 
                width="50" 
                height="30" 
                viewBox="0 0 50 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-5 left-0"
                style={{
                  transition: 'stroke var(--transition-duration) var(--transition-timing)'
                }}
              >
                <path 
                  d="M 35 2 Q 20 12 8 24 L 10 21 M 8 24 L 11 23" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Photography • Writings text */}
            <div 
              className={`text-base opacity-0 transition-all ${showHeaderElements ? 'opacity-85 hover:opacity-100' : 'opacity-0 translate-y-2'}`}
              style={{ 
                transitionDuration: 'var(--animation-header)',
                transitionTimingFunction: 'var(--transition-timing)'
              }}
            >
              <a href="#" className="hover:underline transition-all">readings</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:underline transition-all">writings</a>
            </div>
            
            {/* Theme toggle */}
            <div 
              className={`opacity-0 min-w-[24px] min-h-[24px] flex justify-end transition-all ${showHeaderElements ? 'opacity-85 hover:opacity-100 translate-x-0' : '-translate-x-8'}`}
              style={{ 
                transitionDuration: 'var(--animation-header)',
                transitionTimingFunction: 'var(--transition-timing)'
              }}
            >
              <div 
                className="transform hover:rotate-12 transition-transform"
                style={{ 
                  transitionDuration: 'var(--animation-short)',
                  transitionTimingFunction: 'var(--transition-timing)'
                }}
              >
                <ThemeToggleComponent />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 