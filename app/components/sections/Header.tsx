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
            
            {/* Arrow and tooltip */}
            <div 
              className={`absolute -top-12 left-0 opacity-0 transition-all ${showHeaderElements ? 'opacity-100' : 'translate-y-2'}`}
              style={{ 
                transitionDuration: 'var(--animation-header)',
                transitionDelay: showHeaderElements ? '0.3s' : '0s',
                transitionTimingFunction: 'var(--transition-timing)'
              }}
            >
              {/* Arrow */}
              <svg 
                width="60" 
                height="30" 
                viewBox="0 0 60 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-6 left-8"
              >
                <path 
                  d="M5 5 Q20 15 35 25" 
                  stroke="#FF1744" 
                  strokeWidth="2" 
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#FF1744"
                    />
                  </marker>
                </defs>
              </svg>
              
              {/* Tooltip bubble */}
              <div className="bg-[#FF1744] text-white px-4 py-2 rounded-lg relative shadow-sm">
                <span className="text-sm font-medium whitespace-nowrap">my local time!</span>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-10 w-0 h-0 
                  border-l-[6px] border-l-transparent
                  border-t-[8px] border-t-[#FF1744]
                  border-r-[6px] border-r-transparent">
                </div>
              </div>
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