"use client";

import { ComponentType, useEffect, useState } from "react";
import Image from "next/image";

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
    <div className="flex justify-between items-center mb-8 h-8 relative">
      {/* Profile image - highest priority for LCP */}
      <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2 w-16 h-16">
        <Image 
          src="/notion-face-transparent.webp"
          alt="Tom Zheng"
          className="opacity-85 hover:opacity-100 transition-opacity"
          style={{ 
            transitionDuration: 'var(--animation-header)',
            transitionTimingFunction: 'var(--transition-timing)'
          }}
          width={64}
          height={64}
          priority
          fetchPriority="high"
          loading="eager"
          unoptimized={false}
        />
      </div>
      
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
              className={`absolute -top-12 left-8 opacity-0 transition-all ${showHeaderElements ? 'opacity-50' : 'opacity-0 -translate-y-2'}`}
              style={{ 
                transitionDuration: 'var(--animation-header)',
                transitionDelay: showHeaderElements ? '0.6s' : '0s',
                transitionTimingFunction: 'var(--transition-timing)'
              }}
            >
              {/* Simple text with slant */}
              <span 
                className="text-xs italic text-foreground/50 whitespace-nowrap inline-block"
                style={{ transform: 'rotate(-5deg)' }}
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
          
          <div 
            className={`w-full max-w-[20%] sm:max-w-[26%] max-w-[18%] h-px bg-current opacity-0 absolute sm:left-[18%] left-[22%] top-1/2 transform -translate-y-1/2 transition-all ${showHeaderElements ? 'opacity-20' : 'scale-x-0'}`}
            style={{ 
              transitionDuration: 'var(--animation-header)',
              transitionTimingFunction: 'var(--transition-timing)'
            }}
          ></div>
          <div 
            className={`w-full max-w-[32.25%] sm:max-w-[35.5%] max-w-[28%] h-px bg-current opacity-0 absolute sm:left-[56%] left-[58%] top-1/2 transform -translate-y-1/2 transition-all ${showHeaderElements ? 'opacity-20' : 'scale-x-0'}`}
            style={{ 
              transitionDuration: 'var(--animation-header)',
              transitionTimingFunction: 'var(--transition-timing)'
            }}
          ></div>
          <div 
            className={`opacity-0 min-w-[24px] min-h-[24px] flex justify-end transition-all ${showHeaderElements ? 'opacity-85 hover:opacity-100 translate-x-0' : '-translate-x-8'} sm:mt-0 mt-0 sm:top-1/2 top-1/2`}
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
        </>
      )}
    </div>
  );
} 