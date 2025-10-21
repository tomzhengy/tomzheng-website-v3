"use client";

import { useState, ReactNode } from 'react';

interface ImageTooltipProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export default function ImageTooltip({ 
  children, 
  imageSrc, 
  imageAlt = "Tooltip image",
  maxWidth = 300,
  maxHeight = 300 
}: ImageTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isVisible && (
        <div
          className="absolute pointer-events-none z-10 bg-black p-2"
          style={{
            left: `${position.x + 10}px`,
            bottom: `${-position.y + 25}px`,
          }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt}
            style={{
              maxWidth: `${maxWidth}px`,
              maxHeight: `${maxHeight}px`,
              width: 'auto',
              height: 'auto',
            }}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
