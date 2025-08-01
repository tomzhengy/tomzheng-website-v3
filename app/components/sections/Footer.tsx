"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="text-sm text-foreground/50 mb-8">
      <p>© {year} Tom Zheng</p>
    </footer>
  );
} 