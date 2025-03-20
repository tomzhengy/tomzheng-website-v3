"use client";

import { useState, useEffect, ReactNode, useRef } from 'react';
import React from 'react';

interface PausePoint {
  index: number;
  duration: number;
}

interface TextSegment {
  text: string;
  render?: (text: string) => ReactNode;
}

interface TypeWriterProps {
  text?: string;
  segments?: TextSegment[];
  pausePoints?: PausePoint[];
  typingSpeed?: number;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
  customEndIndicator?: ReactNode;
  isSkipped?: boolean;
  onSkip?: (currentIndex: number) => void;
  startFromIndex?: number;
}

const TypeWriter = ({
  text,
  segments,
  pausePoints = [],
  typingSpeed = 50,
  onComplete,
  keepCursorAfterComplete = false,
  customEndIndicator = null,
  isSkipped = false,
  onSkip,
  startFromIndex = 0,
}: TypeWriterProps) => {
  const [displayedTextIndex, setDisplayedTextIndex] = useState(startFromIndex);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Make the current text index available outside the component
  useEffect(() => {
    if (onSkip && !isComplete) {
      // Expose the current position to the parent for skip handling
      return () => onSkip(displayedTextIndex);
    }
  }, [onSkip, displayedTextIndex, isComplete]);

  // Determine if we're using segments or plain text
  const usingSegments = !!segments && segments.length > 0;
  
  // Calculate the total text length
  const totalLength = usingSegments
    ? segments!.reduce((acc, segment) => acc + segment.text.length, 0)
    : text?.length || 0;

  // Effect to handle the skip animation
  useEffect(() => {
    if (isSkipped && !isComplete) {
      // Clear any ongoing typing animation
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set to complete immediately
      setDisplayedTextIndex(totalLength);
      setIsComplete(true);
      
      if (onComplete) {
        onComplete();
      }
    }
  }, [isSkipped, isComplete, totalLength, onComplete]);

  useEffect(() => {
    // Start the typing animation
    const startTyping = () => {
      if (displayedTextIndex < totalLength) {
        // Check if we need to pause at the current position
        const pausePoint = pausePoints.find(pp => pp.index === displayedTextIndex);
        
        if (pausePoint) {
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setDisplayedTextIndex(prev => prev + 1);
          }, pausePoint.duration);
        } else if (!isPaused) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedTextIndex(prev => prev + 1);
          }, typingSpeed);
        }
      } else {
        // All text has been typed
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    };

    startTyping();

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedTextIndex, isPaused, totalLength, pausePoints, typingSpeed, onComplete]);

  // Set up cursor blink
  useEffect(() => {
    // Only blink the cursor when paused or complete
    if (isPaused || isComplete) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530); // Standard cursor blink rate
    } else {
      // Keep cursor steady and visible during typing
      setShowCursor(true);
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
        cursorIntervalRef.current = null;
      }
    }

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [isPaused, isComplete]);

  // Determine whether to show the cursor, the custom indicator, or nothing
  const showCursorElement = !isComplete || (isComplete && keepCursorAfterComplete);
  const showCustomIndicator = isComplete && customEndIndicator;

  // Render function for segments
  const renderSegments = () => {
    const renderedOutput: ReactNode[] = [];
    let globalIndex = 0;
    let lastVisibleSegmentIndex = -1;
    
    // First, determine the last visible segment for cursor placement
    segments!.forEach((segment, segmentIndex) => {
      const segmentLength = segment.text.length;
      const segmentStart = globalIndex;
      
      if (displayedTextIndex > segmentStart) {
        lastVisibleSegmentIndex = segmentIndex;
      }
      
      globalIndex += segmentLength;
    });
    
    // Reset for actual rendering
    globalIndex = 0;
    
    segments!.forEach((segment, segmentIndex) => {
      const segmentLength = segment.text.length;
      const segmentStart = globalIndex;
      
      // Determine how much of this segment should be displayed
      if (displayedTextIndex <= segmentStart) {
        // This segment hasn't started being displayed yet
        renderedOutput.push(null);
      } else if (displayedTextIndex >= segmentStart + segmentLength) {
        // This segment is fully displayed
        if (segment.render) {
          renderedOutput.push(
            <React.Fragment key={`segment-${segmentIndex}`}>
              {segment.render(segment.text)}
            </React.Fragment>
          );
        } else {
          renderedOutput.push(
            <React.Fragment key={`segment-${segmentIndex}`}>
              {segment.text}
            </React.Fragment>
          );
        }
      } else {
        // This segment is partially displayed
        const partialText = segment.text.substring(0, displayedTextIndex - segmentStart);
        if (segment.render) {
          renderedOutput.push(
            <React.Fragment key={`segment-${segmentIndex}`}>
              {segment.render(partialText)}
            </React.Fragment>
          );
        } else {
          renderedOutput.push(
            <React.Fragment key={`segment-${segmentIndex}`}>
              {partialText}
            </React.Fragment>
          );
        }
      }
      
      // Add cursor after the current segment if it's the last visible one
      if (segmentIndex === lastVisibleSegmentIndex && showCursor && showCursorElement) {
        renderedOutput.push(
          <span key="cursor" className={`cursor ${(isPaused || isComplete) ? 'blinking' : ''}`}>_</span>
        );
      }
      
      globalIndex += segmentLength;
    });
    
    // Add the custom end indicator if typing is complete
    if (showCustomIndicator) {
      renderedOutput.push(
        <React.Fragment key="custom-indicator">
          {customEndIndicator}
        </React.Fragment>
      );
    }
    
    return renderedOutput;
  };

  // Render the plain text version
  const renderPlainText = () => {
    const displayedText = text?.substring(0, displayedTextIndex);
    
    return (
      <>
        <span className="text-content">{displayedText}</span>
        {showCursor && showCursorElement && (
          <span key="cursor" className={`cursor ${(isPaused || isComplete) ? 'blinking' : ''}`}>_</span>
        )}
        {showCustomIndicator && (
          <React.Fragment key="custom-indicator">
            {customEndIndicator}
          </React.Fragment>
        )}
      </>
    );
  };

  return (
    <span className="typewriter">
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .typewriter {
          position: relative;
          display: inline-block;
        }
        .typewriter .cursor {
          display: inline-block;
          margin-left: 2px;
        }
        .typewriter .cursor.blinking {
          animation: blink 1.06s step-end infinite;
        }
      `}</style>
      {usingSegments ? renderSegments() : renderPlainText()}
    </span>
  );
};

export default TypeWriter; 