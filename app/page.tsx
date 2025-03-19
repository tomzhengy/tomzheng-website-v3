"use client"

import Image from "next/image";
import { Suspense, useState, ReactNode, useEffect } from "react";
import Script from "next/script";
import TypeWriter from "./components/TypeWriter";
import FadeIn from "./components/FadeIn";

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [paragraphComplete, setParagraphComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  
  // Effect to create initial delay with just the cursor
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 2000); // 2 second delay
    
    return () => clearTimeout(timer);
  }, []);

  // Effect to delay showing content until after animations
  useEffect(() => {
    if (paragraphComplete) {
      // Add a slight delay for better effect
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [paragraphComplete]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("tom@linkd.inc");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Define the intro text with pause points
  const introText = "hey! i'm Tom—co-founder of Linkd and exploring sf.";
  const introPauses = [
    { index: 5, duration: 700 }, // Pause after "hey!"
    { index: 12, duration: 800 }, // Pause after "Tom"
    { index: 49, duration: 700 }, // Pause after "SF."
  ];

  // Define the ending text
  const endText = "as always, more coming soon :)";
  
  // Define the paragraph segments with custom rendering for "love" and "chat"
  const paragraphSegments = [
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
  
  // Define the paragraph pause points based on global character indices
  const paragraphPauses = [
    { index: 9, duration: 500 }, // Pause after "anyways,"
    { index: 35, duration: 700 }, // Longer pause after "."
    { index: 50, duration: 900 }, // Pause after "chat"
    { index: 51, duration: 800 }, // Pause after "."
    { index: 52, duration: 1000 }, // Long pause after the br
    { index: 62, duration: 500 }, // Pause after "always,"
    { index: endText.length + 52, duration: 300 }, // Pause at the end
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
      
      <main className="flex min-h-screen justify-center">
        <div className="text-left max-w-[500px] w-full px-4 pt-[10vh] sm:pt-[15vh] md:pt-[10vh]">
          <section aria-labelledby="introduction">
            <h1 id="introduction" className="text-xl">
              {startTyping ? (
                <TypeWriter 
                  text={introText} 
                  pausePoints={introPauses} 
                  typingSpeed={80}
                  onComplete={() => setIntroComplete(true)}
                  keepCursorAfterComplete={false}
                />
              ) : (
                <span className="cursor-blink">_</span>
              )}
            </h1>

            <p className="text-xl">
              {introComplete && (
                <TypeWriter 
                  segments={paragraphSegments}
                  pausePoints={paragraphPauses}
                  typingSpeed={80}
                  keepCursorAfterComplete={true}
                  onComplete={() => setParagraphComplete(true)}
                />
              )}
            </p>
          </section>
          
          {/* Line-by-line fade in sections after typewriter completes */}
          {showContent && (
            <>
              <section aria-labelledby="current-activities" className="mt-10 mb-8">
                <FadeIn delay={baseDelay}>
                  <h2 id="current-activities" className="text-xl mb-2">my time:</h2>
                </FadeIn>
                <ul className="list-disc pl-5 space-y-1">
                  <FadeIn delay={baseDelay + delayIncrement * 1}>
                    <li className="text-xl">connecting people @ <a href="https://linkd.inc" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">Linkd</a> in sf</li>
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
            </>
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
