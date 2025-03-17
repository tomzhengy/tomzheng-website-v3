"use client"

import Image from "next/image";
import { Suspense } from "react";
import Script from "next/script";

export default function Home() {
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
        <div className="text-left max-w-[500px] w-full px-4 pt-[10vh] sm:pt-[15vh] md:pt-[20vh]">
          <section aria-labelledby="introduction">
            <h1 id="introduction" className="text-xl">hey! i&apos;m Tom—more coming soon.</h1>

            <p className="text-xl">anyways, i <b>love</b> meeting new people.
                so let&apos;s <a href="https://cal.com/tomzheng/chat" className="underline decoration-gray-300 hover:decoration-white transition-colors" aria-label="Schedule a chat with Tom">chat</a>.</p>
          </section>
          
          <section aria-labelledby="current-activities" className="mt-10 mb-12">
            <h2 id="current-activities" className="text-xl mb-2">my time:</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-xl">founding <a href="https://linkd.inc" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">linkd</a> in sf</li>
              <li className="text-xl">o1 visa</li>
              <li className="text-xl">building <a href="https://www.sdx.community/chapters/ucsd" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">sdx</a> at ucsd</li>
            </ul>
          </section>
          
          <figure className="relative w-full aspect-[3/2] mt-36 vignette-container">
            <Suspense fallback={<div className="w-full aspect-[3/2] bg-gray-800 rounded-md animate-pulse"></div>}>
              <Image 
                src="/forest-optimized.webp" 
                alt="Forest landscape with mountains and trees" 
                fill
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
                sizes="(max-width: 500px) 100vw, 500px"
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </Suspense>
            <figcaption className="sr-only">A serene forest landscape</figcaption>
          </figure>
        </div>
      </main>
    </>
  );
}
