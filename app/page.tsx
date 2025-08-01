"use client"

// import Image from "next/image"; /* Temporarily unused while image is hidden */
import { Suspense, useState, ReactNode, useEffect, useRef } from "react";
import Script from "next/script";
import dynamic from 'next/dynamic';
import ContentSections from "./components/sections/ContentSections";
import SocialLinks from "./components/sections/SocialLinks";
import Footer from "./components/sections/Footer";
import Header from "./components/sections/Header";
import LastVisitor from "./components/sections/LastVisitor";

// Dynamically import ThemeToggle with no SSR to avoid hydration issues
const ThemeToggle = dynamic(() => import('./components/ui/theme/ThemeToggle'), { ssr: false });

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showHeaderElements, setShowHeaderElements] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Effect to show header elements after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeaderElements(true);
    }, 300); // Reduced delay since we only have time and theme toggle
    
    return () => clearTimeout(timer);
  }, []);

  // Effect to update the EST time every second
  useEffect(() => {
    const updateESTTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        hour: 'numeric', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/New_York'
      };
      const estTime = new Date().toLocaleTimeString('en-US', options);
      setCurrentTime(estTime);
    };
    
    // Initial update
    updateESTTime();
    
    // Set interval to update every second
    const interval = setInterval(updateESTTime, 1);
    
    return () => clearInterval(interval);
  }, []);

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
            "url": "https://tyzheng.com",
            "jobTitle": "Founder",
            "worksFor": {
              "@type": "Organization",
              "name": "clado",
              "url": "https://clado.ai"
            },
            "knowsAbout": ["Programming", "Entrepreneurship", "Community Building", "Y Combinator", "`O1 Visa`", "SDX", "UCSD", "San Francisco", "Founder", "Engineer", "Clado", "Clado AI", "clado.ai", "Tom Zheng", "Tom", "Founder", "Engineer"],
            "sameAs": [
              "https://www.sdx.community/chapters/ucsd", "https://clado.ai", "https://tyzheng.com", "https://tomzhe.ng", "https://tomzheng.dev", "https://linkedin.com/in/tomzheng"
            ]
          })
        }}
      />
      
      <main ref={mainRef} className="flex min-h-screen justify-center">
        <div className="text-left max-w-[500px] w-full px-4 pt-[8vh] sm:pt-[8vh] md:pt-[8vh] pb-16">
          {/* Header with theme toggle and EST time */}
          <Header 
            currentTime={currentTime} 
            showHeaderElements={showHeaderElements}
            ThemeToggleComponent={ThemeToggle}
          />
          
          <section aria-labelledby="introduction">
            <div className="text-xl">
              hey! i'm <b>Tom Zheng</b>—cofounder of <a href="https://clado.ai" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">clado</a>.<br />
              i'd love to meet <b>you.</b> so let's <a 
                href="https://x.com/tomzhengy" 
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gray-300 hover:decoration-white transition-colors" 
                aria-label="Schedule a chat with Tom"
              >chat.</a> i always reply
            </div>
          </section>
          
          {/* Content sections */}
          <ContentSections />
          
          {/* Bottom section */}
          <div className="mt-6">
            {/* Social links */}
            <SocialLinks />
            
            {/* Last visitor tracker */}
            <LastVisitor />
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
