"use client";

import dynamic from 'next/dynamic';

// Dynamically import MouseTrail with no SSR
const MouseTrail = dynamic(() => import('./ui/effects/MouseTrail'), { ssr: false });

export default function MouseTrailProvider() {
  return <MouseTrail />;
} 