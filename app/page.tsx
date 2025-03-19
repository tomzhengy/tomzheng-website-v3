"use client"

import { ReactNode, useState, useEffect } from "react";
import Script from "next/script";
import TypeWriter from "./components/Typewriter";
import ContentDisplay from "./components/ContentDisplay";
import useAnimationManager from "./hooks/useAnimationManager";

// Helper component to handle both animated and static text rendering
interface AnimatedTextProps {
  segments: Array<{text: string; render?: (text: string) => ReactNode}>;
  pausePoints: Array<{index: number; duration: number}>;
  shouldAnimate: boolean;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
  customEndIndicator?: ReactNode;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  segments,
  pausePoints,
  shouldAnimate,
  onComplete,
  keepCursorAfterComplete = false,
  customEndIndicator,
  className
}) => {
  if (shouldAnimate) {
    return (
      <TypeWriter 
        segments={segments}
        pausePoints={pausePoints}
        typingSpeed={80}
        keepCursorAfterComplete={keepCursorAfterComplete}
        customEndIndicator={customEndIndicator}
        onComplete={onComplete}
        className={className}
      />
    );
  }
  
  // For static rendering, process each segment with its custom render function if available
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.render) {
          return <span key={index}>{segment.render(segment.text)}</span>;
        }
        return <span key={index}>{segment.text}</span>;
      })}
      {customEndIndicator}
    </>
  );
};

export default function Home() {
  const {
    animationState,
    shouldPlayAnimation,
    completeParaTyping,
    completeContentFading
  } = useAnimationManager();
  
  // Track whether intro typing is complete
  const [introComplete, setIntroComplete] = useState(false);
  
  // LCP optimization: Start with static render, then enable animations
  const [isClientSide, setIsClientSide] = useState(false);
  
  useEffect(() => {
    // Mark that we're on the client side, enable animations after hydration
    setIsClientSide(true);
  }, []);

  // Define all text segments with custom rendering
  const allTextSegments = [
    // Intro segments
    { text: "hey! " },
    { text: "i'm Tom—" },
    { text: "co-founder of linkd and exploring sf." },
    // Paragraph segments
    { text: "anyways, i " },
    { 
      text: "love",
      render: (text: string): ReactNode => <b>{text}</b>
    },
    { text: " meeting new people. so let&apos;s " },
    { 
      text: "chat",
      render: (text: string): ReactNode => (
        <a 
          href="https://cal.com/tomzheng/chat" 
          className="underline decoration-gray-300 hover:decoration-white transition-colors cursor-pointer" 
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
    { text: "as always, more coming soon :)" }
  ];
  
  // Define full text strings for static version
  const introFullText = "hey! i'm Tom—co-founder of linkd and exploring sf.";
  const endText = "as always, more coming soon :)";
  
  // Consolidated pause points
  const allTextPauses = [
    // Intro pauses (relative to intro segments)
    { index: 5, duration: 700 },  // Pause after "hey!"
    { index: 12, duration: 700 }, // Pause after "Tom"
    { index: 49, duration: 700 }, // Pause after "SF."
    
    // Paragraph pauses (relative to paragraph segments)
    { index: 9, duration: 500 },   // Pause after "anyways,"
    { index: 35, duration: 700 },  // Longer pause after "people."
    { index: 51, duration: 800 },  // Pause after "."
    { index: 61, duration: 500 },  // Pause after "always,"
    { index: 80, duration: 300 },  // Pause at the end
  ];

  // Render page content based on animation state
  const renderContent = () => {
    // Determine if animations should play - only after client-side hydration
    const shouldAnimate = animationState !== 'COMPLETE' && shouldPlayAnimation && isClientSide;
    
    return (
      <>
        <section aria-labelledby="introduction">
          <h1 id="introduction" className="text-xl">
            {!shouldAnimate && introFullText}
            
            {animationState !== 'INITIAL' && shouldAnimate && (
              <AnimatedText 
                segments={allTextSegments.slice(0, 3)}
                pausePoints={allTextPauses.slice(0, 3)}
                shouldAnimate={shouldAnimate}
                onComplete={() => setIntroComplete(true)}
                className=""
              />
            )}
          </h1>
          
          <p className="text-xl">
            {!shouldAnimate && (
              <>
                anyways, i <b>love</b> meeting new people. so let&apos;s{' '}
                <a 
                  href="https://cal.com/tomzheng/chat" 
                  className="underline decoration-gray-300 hover:decoration-white transition-colors cursor-pointer" 
                  aria-label="Schedule a chat with Tom"
                >
                  chat
                </a>.
                <br />
                {endText}
              </>
            )}
            
            {animationState !== 'INITIAL' && shouldAnimate && introComplete && (
              <AnimatedText 
                segments={allTextSegments.slice(3)}
                pausePoints={allTextPauses.slice(3)}
                shouldAnimate={shouldAnimate}
                keepCursorAfterComplete={true}
                onComplete={completeParaTyping}
                className=""
              />
            )}
          </p>
        </section>
        
        {animationState === 'CONTENT_FADING' || animationState === 'COMPLETE' ? (
          <ContentDisplay 
            shouldAnimate={animationState === 'CONTENT_FADING'}
            onComplete={completeContentFading}
          />
        ) : null}
      </>
    );
  };

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
            "description": "hey, i'm Tom. ",
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
          {renderContent()}
        </div>
      </main>
    </>
  );
}
