"use client";

import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';

interface TrailDot {
  x: number;
  y: number;
  size: number;
  alpha: number;
  dx: number;
  dy: number;
  ttl: number;
}

export default function MouseTrail() {
  const { theme } = useTheme();
  const [dots, setDots] = useState<TrailDot[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Add mouse event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add a new dot
      setDots(prevDots => {
        const newDot: TrailDot = {
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1, // Random size between 1-4px
          alpha: 0.7,
          dx: (Math.random() - 0.5) * 2, // Random direction
          dy: (Math.random() - 0.5) * 2,
          ttl: 20 // Time to live
        };
        
        // Only keep recent dots
        const updatedDots = [...prevDots, newDot];
        return updatedDots.slice(-30); // Keep only last 30 dots
      });
    };
    
    // Hide trail when mouse leaves the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    // Show trail when mouse enters the window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // Update dots for animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prevDots => 
        prevDots
          .map(dot => ({
            ...dot,
            x: dot.x + dot.dx,
            y: dot.y + dot.dy,
            alpha: dot.alpha * 0.92, // Fade out
            ttl: dot.ttl - 1
          }))
          .filter(dot => dot.ttl > 0 && dot.alpha > 0.01) // Remove expired dots
      );
    }, 30); // Update every 30ms
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Don't render if not visible
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: theme === 'dark' ? 'rgba(247, 247, 239, 0.3)' : 'rgba(36, 34, 34, 0.3)',
            opacity: dot.alpha,
            transform: 'translate(-50%, -50%)',
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  );
} 