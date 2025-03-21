"use client";

import { ComponentType } from "react";

interface HeaderProps {
  currentTime: string;
  showHeaderElements: boolean;
  ThemeToggleComponent: ComponentType;
}

export default function Header({ currentTime, showHeaderElements, ThemeToggleComponent }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 h-8 relative">
      <div className={`text-xl opacity-0 min-w-[120px] transition-all duration-700 ${showHeaderElements ? 'opacity-85 hover:opacity-100 translate-x-0' : 'translate-x-8'}`}>
        {currentTime}
      </div>
      <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2 w-16 h-16">
        <img 
          src="/notion-face-transparent.webp"
          alt="Tom Zheng"
          className="w-16 h-16 opacity-85 hover:opacity-100 transition-opacity"
          width={24}
          height={24}
        />
      </div>
      <div className={`w-full max-w-[20%] sm:max-w-[26%] max-w-[18%] h-px bg-current opacity-0 absolute sm:left-[18%] left-[22%] top-1/2 transform -translate-y-1/2 transition-all duration-700 ${showHeaderElements ? 'opacity-20' : 'scale-x-0'}`}></div>
      <div className={`w-full max-w-[32.25%] sm:max-w-[35.5%] max-w-[28%] h-px bg-current opacity-0 absolute sm:left-[56%] left-[58%] top-1/2 transform -translate-y-1/2 transition-all duration-700 ${showHeaderElements ? 'opacity-20' : 'scale-x-0'}`}></div>
      <div className={`opacity-0 min-w-[24px] min-h-[24px] flex justify-end transition-all duration-700 ${showHeaderElements ? 'opacity-70 hover:opacity-100 translate-x-0' : '-translate-x-8'} sm:mt-0 mt-0 sm:top-1/2 top-1/2`}>
        <div className="transform hover:rotate-12 transition-transform duration-300">
          <ThemeToggleComponent />
        </div>
      </div>
    </div>
  );
} 