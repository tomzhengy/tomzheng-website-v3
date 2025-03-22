    "use client";

import { ReactNode, useState, useEffect } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay: number;
  className?: string;
}

const FadeIn = ({ children, delay, className = '' }: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-opacity duration-[var(--animation-fade-in)] ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeIn; 