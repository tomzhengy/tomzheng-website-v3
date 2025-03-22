"use client";

import { useState, useEffect, ReactNode, useRef } from 'react';
import React from 'react';
import { ANIMATIONS } from '../../../utils/animation';

interface PausePoint {
  index: number;
  duration: number;
}

interface TextSegment {
  text: string;
  render?: (text: string) => ReactNode;
  pauseAfter?: { duration: number };
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
  typingSpeed = 60,
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pauseResumeAttempts = useRef(0);

  useEffect(() => {
    if (onSkip && !isComplete) {
      return () => onSkip(displayedTextIndex);
    }
  }, [onSkip, displayedTextIndex, isComplete]);

  const usingSegments = !!segments && segments.length > 0;
  
  const totalLength = usingSegments
    ? segments!.reduce((acc, segment) => acc + segment.text.length, 0)
    : text?.length || 0;

  useEffect(() => {
    if (isPaused) {
      const forceResumeTimeout = setTimeout(() => {
        pauseResumeAttempts.current += 1;
        if (pauseResumeAttempts.current >= 3) {
          setIsPaused(false);
          setDisplayedTextIndex(prev => prev + 1);
          pauseResumeAttempts.current = 0;
        }
      }, 1000);
      
      return () => {
        clearTimeout(forceResumeTimeout);
      };
    } else {
      pauseResumeAttempts.current = 0;
    }
  }, [isPaused, displayedTextIndex]);

  useEffect(() => {
    if (isSkipped && !isComplete) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setDisplayedTextIndex(totalLength);
      setIsComplete(true);
      
      if (onComplete) {
        onComplete();
      }
    }
  }, [isSkipped, isComplete, totalLength, onComplete]);

  useEffect(() => {
    const startTyping = () => {
      if (displayedTextIndex < totalLength) {
        const pausePoint = pausePoints.find(pp => pp.index === displayedTextIndex);
        
        if (pausePoint) {
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setDisplayedTextIndex(prev => prev + 1);
          }, pausePoint.duration);
        } else if (!isPaused) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedTextIndex(prev => Math.min(prev + 1, totalLength));
          }, typingSpeed);
        }
      } else {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    };

    startTyping();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedTextIndex, isPaused, totalLength, pausePoints, typingSpeed, onComplete]);

  const showCursorElement = !isComplete || (isComplete && keepCursorAfterComplete);
  const showCustomIndicator = isComplete && customEndIndicator;

  const renderCursor = () => (
    <span 
      key="cursor" 
      className={`cursor-blink ${!isPaused && !isComplete ? 'typing' : ''}`}
    >
      _
    </span>
  );

  const renderSegments = () => {
    const renderedOutput: ReactNode[] = [];
    let globalIndex = 0;
    let lastVisibleSegmentIndex = -1;
    let cursorAdded = false;
    
    segments!.forEach((segment, segmentIndex) => {
      const segmentLength = segment.text.length;
      const segmentStart = globalIndex;
      
      if (displayedTextIndex > segmentStart) {
        lastVisibleSegmentIndex = segmentIndex;
      }
      
      globalIndex += segmentLength;
    });
    
    globalIndex = 0;
    
    segments!.forEach((segment, segmentIndex) => {
      const segmentLength = segment.text.length;
      const segmentStart = globalIndex;
      
      if (displayedTextIndex <= segmentStart) {
        renderedOutput.push(null);
      } else if (displayedTextIndex >= segmentStart + segmentLength) {
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
        
        if (segmentIndex === lastVisibleSegmentIndex && 
            displayedTextIndex === segmentStart + segmentLength && 
            showCursorElement && 
            !cursorAdded) {
          renderedOutput.push(renderCursor());
          cursorAdded = true;
        }
      } else {
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
        
        if (segmentIndex === lastVisibleSegmentIndex && 
            showCursorElement && 
            !cursorAdded) {
          renderedOutput.push(renderCursor());
          cursorAdded = true;
        }
      }
      
      globalIndex += segmentLength;
    });
    
    if (displayedTextIndex >= totalLength && 
        showCursorElement && 
        !cursorAdded) {
      renderedOutput.push(renderCursor());
    }
    
    if (showCustomIndicator) {
      renderedOutput.push(
        <React.Fragment key="custom-indicator">
          {customEndIndicator}
        </React.Fragment>
      );
    }
    
    return renderedOutput;
  };

  const renderPlainText = () => {
    const displayedText = text?.substring(0, displayedTextIndex);
    
    return (
      <>
        <span className="text-content">{displayedText}</span>
        {showCursorElement && renderCursor()}
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
      {usingSegments ? renderSegments() : renderPlainText()}
    </span>
  );
};

export default TypeWriter; 