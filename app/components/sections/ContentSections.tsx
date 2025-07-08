"use client";

import FadeIn from "../ui/animation/FadeIn";

interface ContentSectionsProps {
  baseDelay: number;
  delayIncrement: number;
}

export default function ContentSections({ baseDelay, delayIncrement }: ContentSectionsProps) {
  return (
    <>
      <section aria-labelledby="current-activities" className="mt-10 mb-8">
        <FadeIn delay={baseDelay}>
          <h2 id="current-activities" className="text-xl mb-2">my time:</h2>
        </FadeIn>
        <ul className="list-disc pl-5 space-y-1">
          <FadeIn delay={baseDelay + delayIncrement * 1}>
            <li className="text-xl">connecting people @ <a href="https://clado.ai" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">clado</a> (YC X25)</li>
          </FadeIn>
          <FadeIn delay={baseDelay + delayIncrement * 2}>
            <li className="text-xl">sharing my thoughts on <a href="https://x.com/tomzhengy" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">x/twitter</a>.</li>
          </FadeIn>
          <FadeIn delay={baseDelay + delayIncrement * 2}>
            <li className="text-xl">getting my O1 visa.</li>
          </FadeIn>
          <FadeIn delay={baseDelay + delayIncrement * 3}>
            <li className="text-xl">building <a href="https://www.sdx.community/chapters/ucsd" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">SDx</a> at ucsd.</li>
          </FadeIn>
        </ul>
      </section>

      <section aria-labelledby="thinking thoughts" className="mt-10 mb-8">
      <FadeIn delay={baseDelay + delayIncrement * 4}>
        <h2 id="thinking " className="text-xl mb-2">i also swim (competitively), gym, read, and love creating experiences.</h2>
      </FadeIn>
      </section>

      <section aria-labelledby="convictions-quote" className="mt-6 mb-8">
        <FadeIn delay={baseDelay + delayIncrement * 5}>
          <p className="text-xl italic">
            "our convictions are not held back by our circumstances."
          </p>
        </FadeIn>
      </section>
    </>
  );
} 