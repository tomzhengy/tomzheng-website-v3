"use client";

export default function ContentSections() {
  return (
    <>
      <section aria-labelledby="current-activities" className="mt-10 mb-8">
          <h2 id="current-activities" className="text-xl mb-2">my time:</h2>
        <ul className="list-disc pl-5 space-y-1">
            <li className="text-xl">connecting people @ <a href="https://clado.ai" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">clado</a> (YC X25)</li>
            <li className="text-xl">sharing my thoughts on <a href="https://x.com/tomzhengy" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">x/twitter</a>.</li>
            <li className="text-xl">getting my <a href="https://www.linkedin.com/posts/tomzhengy_super-excited-to-announce-that-i-spent-my-activity-7348086484098273282-9vSN?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeaLpEBNyA26OJUo9uuklk0y_911dt6VSw" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">O1 visa</a>.</li>
            <li className="text-xl">building <a href="https://www.sdx.community/chapters/ucsd" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-white transition-colors">SDx</a> at ucsd.</li>
        </ul>
      </section>

      <section aria-labelledby="thinking thoughts" className="mt-10 mb-8">
        <h2 id="thinking " className="text-xl mb-2">i also swim (competitively), gym, read, and love creating experiences.</h2>
      </section>

      <section aria-labelledby="convictions-quote" className="mt-6 mb-8">
          <p className="text-base italic text-neutral-400 text-center">
            our convictions are not limited by our circumstances.
          </p>
      </section>
    </>
  );
} 