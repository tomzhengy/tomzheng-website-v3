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
            <li className="text-xl">connecting people @ <a href="https://linkd.inc" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">Linkd</a> with yc x25.</li>
          </FadeIn>
          <FadeIn delay={baseDelay + delayIncrement * 2}>
            <li className="text-xl">getting my o1 visa.</li>
          </FadeIn>
          <FadeIn delay={baseDelay + delayIncrement * 3}>
            <li className="text-xl">building <a href="https://www.sdx.community/chapters/ucsd" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">sdx</a> at ucsd.</li>
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
    </>
  );
} 