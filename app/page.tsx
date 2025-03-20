"use client"

// import Image from "next/image"; /* Temporarily unused while image is hidden */
import { Suspense, useState, ReactNode, useEffect, useRef } from "react";
import Script from "next/script";
import TypeWriter from "./components/Typewriter";
import FadeIn from "./components/FadeIn";
import dynamic from 'next/dynamic';

// Dynamically import ThemeToggle with no SSR to avoid hydration issues
const ThemeToggle = dynamic(() => import('./components/ThemeToggle'), { ssr: false });

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [paragraphComplete, setParagraphComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isAnimationSkipped, setIsAnimationSkipped] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [skipHintFading, setSkipHintFading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Effect to create initial delay with just the cursor
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
      // Show skip hint a bit after typing starts
      setTimeout(() => setShowSkipHint(true), 1000);
    }, 2000); // 2 second delay
    
    return () => clearTimeout(timer);
  }, []);

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
        // Start fading out the skip hint
        setSkipHintFading(true);
        setTimeout(() => {
          setShowSkipHint(false);
          setSkipHintFading(false);
        }, 500); // Match the duration of the fade-out animation
        
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

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("tom@linkd.inc");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Define ending text
  const endText = "as always, more coming soon :)";

  // Define the intro text and paragraph segments as a single array
  const allSegments = [
    { text: "hey! i'm Tom Zheng—co-founder of Linkd." },
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
  
  // Combine and adjust pause points for the entire content
  const allPausePoints = [
    { index: 5, duration: 600 }, // Pause after "hey!"
    { index: 18, duration: 600 }, // Pause after "Tom"
    { index: 39, duration: 600 }, // Pause after "Linkd.
    { index: 49, duration: 400 }, // Pause after "anyways,"
    { index: 75, duration: 600 }, // Longer pause after "."
    { index: 90, duration: 800 }, // Pause after "chat"
    { index: 91, duration: 700 }, // Pause after "."
    { index: 93, duration: 700 }, // Long pause after the br
    { index: 103, duration: 500 }, // Pause after "always,"
    { index: 93 + endText.length, duration: 300 }, // Pause at the end
  ];

  // Base delay for fade-in animations (starts after typewriter completes)
  const baseDelay = 0;
  // Increment between items
  const delayIncrement = 300;

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
          {/* Theme toggle and SF time in the same line within text margins */}
          <div className="flex justify-between items-center mb-8 h-8 relative">
            <div className="text-xl opacity-70 hover:opacity-100 transition-opacity min-w-[120px]">
              {currentTime}
            </div>
            <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2 w-12 h-12">
              <img 
                src="/notion-face-transparent.webp"
                alt="Tom Zheng"
                className="w-12 h-12 opacity-90 hover:opacity-100 transition-opacity"
                width={24}
                height={24}
              />
            </div>
            <div className="w-full max-w-[25%] h-px bg-current opacity-20 absolute left-[18%] top-1/2 transform -translate-y-1/2"></div>
            <div className="w-full max-w-[36%] h-px bg-current opacity-20 absolute left-[57%] top-1/2 transform -translate-y-1/2"></div>
            <div className="opacity-70 hover:opacity-100 transition-opacity min-w-[24px] min-h-[24px] flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          
          {/* Skip hint with button for mobile - centered on screen */}
          {showSkipHint && (
            <div 
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${skipHintFading ? 'animate-fade-out' : 'animate-fade-in'}`}
              style={{ opacity: skipHintFading ? 1 : 0 }} // Initial state for animation
            >
              <button 
                id="skip-button"
                className="bg-transparent text-gray-500 text-xs hover:text-gray-300 transition-colors py-1 px-2 rounded"
                aria-label="Skip typewriter animation"
              >
                <em className="sm:hidden">tap to skip</em>
                <em className="hidden sm:inline">press space to skip</em>
              </button>
            </div>
          )}
          
          <section aria-labelledby="introduction">
            <div className="text-xl">
              {startTyping ? (
                <TypeWriter 
                  segments={allSegments}
                  pausePoints={allPausePoints}
                  typingSpeed={80}
                  onComplete={() => setParagraphComplete(true)}
                  keepCursorAfterComplete={true}
                  isSkipped={isAnimationSkipped}
                />
              ) : (
                <span className="cursor-blink">_</span>
              )}
            </div>
          </section>
          
          {/* Line-by-line fade in sections after typewriter completes */}
          {showContent && (
            <div className={isAnimationSkipped ? 'animate-fade-in' : ''}>
              <section aria-labelledby="current-activities" className="mt-10 mb-8">
                <FadeIn delay={baseDelay}>
                  <h2 id="current-activities" className="text-xl mb-2">my time:</h2>
                </FadeIn>
                <ul className="list-disc pl-5 space-y-1">
                  <FadeIn delay={baseDelay + delayIncrement * 1}>
                    <li className="text-xl">connecting people @ <a href="https://linkd.inc" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">Linkd</a> & doing yc spring.</li>
                  </FadeIn>
                  <FadeIn delay={baseDelay + delayIncrement * 2}>
                    <li className="text-xl">getting my o1 visa</li>
                  </FadeIn>
                  <FadeIn delay={baseDelay + delayIncrement * 3}>
                    <li className="text-xl">building <a href="https://www.sdx.community/chapters/ucsd" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">sdx</a> at ucsd</li>
                  </FadeIn>
                </ul>
              </section>

              <section aria-labelledby="thinking thoughts" className="mt-10 mb-8">
                <FadeIn delay={baseDelay + delayIncrement * 4}>
                  <h2 id="thinking thoughts" className="text-xl mb-2">thinking about reading—dm me suggestions.</h2>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 5}>
                  <h2 id="learning" className="text-xl mb-2">learning how to balance learning and doing (and golang).</h2>
                </FadeIn>
              </section>
              
              <div className="flex justify-center space-x-8 mt-12 mb-10">
                <FadeIn delay={baseDelay + delayIncrement * 6} className="inline-block">
                  <a href="https://linkedin.com/in/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 7} className="inline-block">
                  <a href="https://x.com/tomzheng" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 8} className="inline-block">
                  <a href="https://github.com/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 9} className="inline-block">
                  <button 
                    onClick={copyEmailToClipboard} 
                    className="relative cursor-pointer"
                    aria-label="Copy email address to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 hover:opacity-100 transition-opacity">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M22 7l-10 7L2 7"></path>
                    </svg>
                    {emailCopied && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs whitespace-nowrap">
                        tom@linkd.inc copied!
                      </span>
                    )}
                  </button>
                </FadeIn>
              </div>
              
              {/* Image section temporarily hidden
              <FadeIn delay={baseDelay + delayIncrement * 10}>
                <figure className="relative w-[105%] md:w-[112%] aspect-[3/2] mt-10 vignette-container -ml-[2.5%] md:-ml-[6%]">
                  <Suspense fallback={<div className="w-full aspect-[3/2] bg-gray-800 rounded-md animate-pulse"></div>}>
                    <Image 
                      src="/forest-optimized.webp" 
                      alt="Forest landscape with mountains and trees" 
                      fill
                      priority={true}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
                      sizes="(max-width: 768px) 105vw, 112vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </Suspense>
                  <figcaption className="sr-only">A serene forest landscape</figcaption>
                </figure>
              </FadeIn>
              */}
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
