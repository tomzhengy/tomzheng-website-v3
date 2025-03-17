"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  
  useEffect(() => {
    setShowOverlay(true);
  }, []);

  return (
    <div className="flex min-h-screen justify-center">
      {showOverlay && <div className="page-overlay" />}
      
      <div className="text-left max-w-[500px] w-full px-4 pt-[10vh] sm:pt-[15vh] md:pt-[20vh]">
        <p className="text-xl">hey! i'm Tom—more coming soon.</p>

        <p className="text-xl">anyways, i <b>love</b> meeting new people.
            so let's <a href="https://cal.com/tomzheng/chat" className="underline decoration-gray-300 hover:decoration-white transition-colors">chat</a>.</p>
        
        <div className="mt-10 mb-12">
          <p className="text-xl mb-2">my time:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-xl">founding <a href="https://linkd.inc" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">linkd</a> in sf</li>
            <li className="text-xl">o1 visa</li>
            <li className="text-xl">building <a href="https://www.sdx.community/chapters/ucsd" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">sdx</a> at ucsd</li>
          </ul>
        </div>
        
        <div className="relative w-full aspect-[3/2] mt-36 vignette-container">
          <Image 
            src="/forest-optimized.webp" 
            alt="Forest landscape" 
            fill
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
            sizes="(max-width: 500px) 100vw, 500px"
            style={{ objectFit: 'cover' }}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
