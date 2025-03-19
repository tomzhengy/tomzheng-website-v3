"use client"

import Image from "next/image";
import { Suspense, useState, ReactNode, useEffect } from "react";
import Script from "next/script";
import TypeWriter from "./components/Typewriter";
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
  const endPauses = [
    { index: 7, duration: 700 }, // Pause after "as always,"
  ];

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
    { index: 51, duration: 800 }, // Pause after "."
    { index: 52, duration: 1000 }, // Long pause after the br
    { index: 59, duration: 500 }, // Pause after "always,"
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
              
              <div className="flex justify-center space-x-8 mt-20 mb-10">
                <FadeIn delay={baseDelay + delayIncrement * 6} className="inline-block">
                  <a href="https://linkedin.com/in/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 7} className="inline-block">
                  <a href="https://x.com/tomzheng" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 8} className="inline-block">
                  <a href="https://github.com/toomzheng" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </FadeIn>
                <FadeIn delay={baseDelay + delayIncrement * 9} className="inline-block">
                  <button 
                    onClick={copyEmailToClipboard} 
                    className="relative cursor-pointer"
                    aria-label="Copy email address to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 hover:opacity-100 transition-opacity">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                    {emailCopied && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90">
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
