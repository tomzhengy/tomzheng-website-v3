"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 mb-4 z-50 bg-background text-center text-xs text-foreground/50">
      <p>© {year} Tom Zheng</p>
    </footer>
  );
} 