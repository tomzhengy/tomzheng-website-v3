"use client";

import { useState, ReactNode } from 'react';

interface ImageTooltipProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  width?: number;
  height?: number;
}

export default function ImageTooltip({ 
  children, 
  imageSrc, 
  imageAlt = "Tooltip image",
  width = 200,
  height = 150 
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
          className="absolute pointer-events-none z-10 bg-black/80 rounded p-2"
          style={{
            left: `${position.x + 10}px`,
            top: `${position.y - height - 20}px`,
          }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt}
            width={width}
            height={height}
            className="rounded"
            style={{ width: `${width}px`, height: `${height}px`, objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}
