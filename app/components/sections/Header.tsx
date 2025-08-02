"use client";

import { ComponentType } from "react";
import Tooltip from '../ui/Tooltip';

interface HeaderProps {
  currentTime: string;
  ThemeToggleComponent: ComponentType;
}

export default function Header({ currentTime, ThemeToggleComponent }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 h-8 max-w-[420px]">
      <div className="relative">
        <div 
          className="text-xl opacity-85 hover:opacity-100 min-w-[120px] h-8 flex items-center transition-all"
        >
          {currentTime}
        </div>
        
        {/* Arrow and text */}
        <div 
          className="absolute -top-12 left-8 opacity-50"
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
          className="text-base opacity-85 hover:opacity-100 transition-all"
        >
          <Tooltip text="the selfish gene">
            <a href="#" className="hover:underline transition-all">readings</a>
          </Tooltip>
          <span className="mx-2">•</span>
          <Tooltip text="coming soon!">
            <a href="#" className="hover:underline transition-all">writings</a>
          </Tooltip>
        </div>
        
        {/* Theme toggle */}
        <div 
          className="min-w-[24px] min-h-[24px] flex justify-end opacity-85 hover:opacity-100 transition-all"
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
    </div>
  );
} 