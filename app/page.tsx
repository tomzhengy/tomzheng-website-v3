"use client"

// import Image from "next/image"; /* Temporarily unused while image is hidden */
import { Suspense, useState, ReactNode, useEffect, useRef } from "react";
import Script from "next/script";
import TypeWriter from "./components/ui/animation/Typewriter";
import FadeIn from "./components/ui/animation/FadeIn";
import dynamic from 'next/dynamic';
import SkipHint from "./components/sections/SkipHint";
import ContentSections from "./components/sections/ContentSections";
import SocialLinks from "./components/sections/SocialLinks";
import Footer from "./components/sections/Footer";
import Header from "./components/sections/Header";

// Dynamically import ThemeToggle with no SSR to avoid hydration issues
const ThemeToggle = dynamic(() => import('./components/ui/theme/ThemeToggle'), { ssr: false });

export default function Home() {
  const [paragraphComplete, setParagraphComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isAnimationSkipped, setIsAnimationSkipped] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [skipHintFading, setSkipHintFading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showHeaderElements, setShowHeaderElements] = useState(false);
  const hasSkippedRef = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Base delay for fade-in animations (starts after typewriter completes)
  const baseDelay = 0;
  // Increment between items
  const delayIncrement = 300;
  
  // Effect to create initial delay with just the cursor
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
      
      // Show skip hint bit after typing starts, but only if not already skipped
      if (!hasSkippedRef.current && !isAnimationSkipped && !paragraphComplete) {
        const hintTimer = setTimeout(() => {
          // Double check that no skip has occurred before showing hint
          if (!hasSkippedRef.current) {
            setShowSkipHint(true);
          }
        }, 1000);
        return () => clearTimeout(hintTimer);
      }
    }, 2000); // 2 second delay
    
    return () => clearTimeout(timer);
  }, [isAnimationSkipped, paragraphComplete]);

  // Effect to show header elements after all content animations complete
  useEffect(() => {
    if (showContent) {
      // Calculate when the last fade-in animation would finish
      // The last animation is at baseDelay + delayIncrement * 9
      // Add animation duration (~700ms) to ensure it's complete
      const lastFadeInDelay = baseDelay + delayIncrement * 9;
      const animationDuration = 700;
      const totalDelay = lastFadeInDelay + animationDuration;
      
      const timer = setTimeout(() => {
        setShowHeaderElements(true);
      }, totalDelay);
      
      return () => clearTimeout(timer);
    }
  }, [showContent, baseDelay, delayIncrement]);

  // Effect to update the SF time every minute
  useEffect(() => {
    const updateSFTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        hour: 'numeric', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles'
      };
      const sfTime = new Date().toLocaleTimeString('en-US', options);
      setCurrentTime(sfTime);
    };
    
    // Initial update
    updateSFTime();
    
    // Set interval to update every second
    const interval = setInterval(updateSFTime, 1);
    
    return () => clearInterval(interval);
  }, []);

  // Effect for keyboard and button listeners
  useEffect(() => {
    const handleSkip = (e: Event) => {
      if (!paragraphComplete && startTyping) {
        if (e instanceof KeyboardEvent && e.code !== 'Space') {
          return; // Only respond to space key
        }
        
        e.preventDefault(); // Prevent default behavior
        
        // Immediately mark as skipped to prevent hint from showing
        hasSkippedRef.current = true;
        
        // Hide skip hint if it's showing
        if (showSkipHint) {
          setSkipHintFading(true);
          setTimeout(() => {
            setShowSkipHint(false);
            setSkipHintFading(false);
          }, 500); // Match the duration of the fade-out animation
        }
        
        if (!isAnimationSkipped) {
          // Skip the paragraph animation
          setIsAnimationSkipped(true);
        }
      }
    };

    // Keyboard listener
    window.addEventListener('keydown', handleSkip as EventListener);
    
    // Skip button listener
    const skipButton = document.getElementById('skip-button');
    if (skipButton) {
      skipButton.addEventListener('click', handleSkip);
    }
    
    // Touch screen listener for mobile
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('touchstart', handleSkip);
    }
    
    return () => {
      window.removeEventListener('keydown', handleSkip as EventListener);
      if (skipButton) {
        skipButton.removeEventListener('click', handleSkip);
      }
      if (mainElement) {
        mainElement.removeEventListener('touchstart', handleSkip);
      }
    };
  }, [paragraphComplete, startTyping, isAnimationSkipped]);

  // Effect to delay showing content until after animations
  useEffect(() => {
    if (paragraphComplete) {
      // Add a slight delay for better effect
      const timer = setTimeout(() => {
        setShowContent(true);
      }, isAnimationSkipped ? 100 : 800); // Shorter delay if skipped
      return () => clearTimeout(timer);
    }
  }, [paragraphComplete, isAnimationSkipped]);

  // Effect to fade out the skip hint when typing completes
  useEffect(() => {
    if (paragraphComplete && showSkipHint) {
      // Start fade-out animation
      setSkipHintFading(true);
      
      // Remove element after animation completes
      const fadeOutTimer = setTimeout(() => {
        setShowSkipHint(false);
        setSkipHintFading(false);
      }, 500); // Match the duration of the fade-out animation
      
      return () => clearTimeout(fadeOutTimer);
    }
  }, [paragraphComplete, showSkipHint]);

  // Define ending text
  const endText = "as always, more coming soon :)";

  // Define the intro text and paragraph segments as a single array
  const allSegments = [
    { text: "hey! i'm " },
    { 
      text: "Tom Zheng",
      render: (text: string): ReactNode => <b>{text}</b>
    },
    { text: "—co-founder of Linkd, based in sf." },
    { text: " " },
    { 
      text: " ",
      render: (): ReactNode => <br />
    },
    { text: "anyways, i " },
    { 
      text: "love",
      render: (text: string): ReactNode => <b>{text}</b>
    },
    { text: " meeting new people. so let's " },
    { 
      text: "chat",
      render: (text: string): ReactNode => (
        <a 
          href="https://cal.com/tomzheng/chat" 
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gray-300 hover:decoration-white transition-colors" 
          aria-label="Schedule a chat with Tom"
        >
          {text}
        </a>
      )
    },
    { text: "." },
    { 
      text: " ",
      render: (): ReactNode => <br />
    },
    { 
      text: " ",
      render: (): ReactNode => <br />
    },
    { text: endText }
  ];
  
  // Calculate correct indices for pause points
  const calculatePauseIndices = () => {
    // Calculate precise segment boundaries
    let totalLength = 0;
    const segmentStartIndices: number[] = [];
    
    // First, collect all segment starting positions
    allSegments.forEach(segment => {
      segmentStartIndices.push(totalLength);
      totalLength += segment.text.length;
    });
    
    // For logging/debugging - remove in production
    // console.log("Segment start indices:", segmentStartIndices);
    // console.log("Total text length:", totalLength);
    
    // Create pause points using exact character indices
    return [
      { index: segmentStartIndices[0] + "hey! ".length, duration: 600 }, // Pause after "hey!"
      { index: segmentStartIndices[1] + "Tom Zheng".length, duration: 600 }, // Pause after "Tom Zheng"
      { index: segmentStartIndices[2] + "—co-founder of Linkd, based in sf.".length, duration: 600 }, // Pause after sf.
      // The space character + line break
      { index: segmentStartIndices[4] + " ".length, duration: 600 }, // Pause after br
      { index: segmentStartIndices[5] + "anyways, ".length, duration: 500 }, // Pause after "anyways,"
      { index: segmentStartIndices[7] + " meeting new people.".length, duration: 600 }, // Pause after "people."
      { index: segmentStartIndices[9] + ".".length, duration: 600 }, // Pause after period
      { index: segmentStartIndices[10] + " ".length, duration: 500 }, // Pause after first br
      { index: segmentStartIndices[11] + " ".length, duration: 500 }, // Pause after second br
      { index: segmentStartIndices[12] + "as always,".length, duration: 600 }, // Pause after "always,"
      { index: totalLength - 1, duration: 300 }, // Pause right before end
      { index: totalLength, duration: 300 }, // Pause at the very end
    ];
  };
  
  // Combine and adjust pause points for the entire content
  const allPausePoints = calculatePauseIndices();

  return (
    <>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Tom Zheng",
            "url": "https://tomzheng.dev",
            "jobTitle": "Founder",
            "worksFor": {
              "@type": "Organization",
              "name": "linkd",
              "url": "https://linkd.inc"
            },
            "knowsAbout": ["Programming", "Entrepreneurship", "Community Building", "Y Combinator", "O1 Visa", "SDX", "UCSD", "San Francisco", "Founder", "Engineer", "Linkd", "Linkd Inc", "Linkd.Inc", "Tom Zheng", "Tom", "Founder", "Engineer"],
            "sameAs": [
              "https://www.sdx.community/chapters/ucsd", "https://linkd.inc", "https://tomzheng.dev", "https://linkedin.com/in/tomzheng"
            ]
          })
        }}
      />
      
      <main ref={mainRef} className="flex min-h-screen justify-center">
        <div className="text-left max-w-[500px] w-full px-4 pt-[8vh] sm:pt-[8vh] md:pt-[8vh]">
          {/* Header with theme toggle and SF time */}
          <Header 
            currentTime={currentTime} 
            showHeaderElements={showHeaderElements}
            ThemeToggleComponent={ThemeToggle}
          />
          
          {/* Skip hint component */}
          <SkipHint 
            showSkipHint={showSkipHint} 
            skipHintFading={skipHintFading} 
          />
          
          <section aria-labelledby="introduction">
            <div className="text-xl">
              {startTyping ? (
                <TypeWriter 
                  segments={allSegments}
                  pausePoints={allPausePoints}
                  typingSpeed={60}
                  onComplete={() => setParagraphComplete(true)}
                  keepCursorAfterComplete={true}
                  isSkipped={isAnimationSkipped}
                />
              ) : (
                <span className="cursor-blink">_</span>
              )}
            </div>
          </section>
          
          {/* Content sections that fade in after typewriter completes */}
          {showContent && (
            <div className={isAnimationSkipped ? 'animate-fade-in' : ''}>
              {/* Content sections */}
              <ContentSections
                baseDelay={baseDelay}
                delayIncrement={delayIncrement}
              />
              
              {/* Social links */}
              <SocialLinks
                baseDelay={baseDelay}
                delayIncrement={delayIncrement}
              />
              
              {/* Footer */}
              <Footer
                baseDelay={baseDelay}
                delayIncrement={delayIncrement}
              />
            </div>
          )}
        </div>
      </main>
      <style jsx global>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1.06s step-end infinite;
          margin-left: 2px;
        }
      `}</style>
    </>
  );
}
