import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Tom Zheng",
  description: "hey, i'm Tom.",
  keywords: ["Tom Zheng", "linkd", "San Francisco", "founder", "engineer", "O1 visa", "SDX", "UCSD", "Y Combinator", "Y Combinator X25", "YC X25", "linkd inc", "linkd.inc", "Tom", "Tom Zheng"],
  authors: [{ name: "Tom Zheng" }],
  creator: "Tom Zheng",
  publisher: "Tom Zheng",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tomzheng.dev",
    title: "Tom Zheng",
    description: "hey, i'm Tom.",
    siteName: "Tom Zheng",
    images: [{
      url: "/notion-face-portrait.png",
      width: 1200,
      height: 630,
      alt: "Tom Zheng"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Zheng",
    description: "hey, i'm Tom.",
    images: ["/notion-face-portrait.png"]
  },
  icons: {
    icon: [
      { url: '/notion-face-portrait.png' }
    ],
    apple: [
      { url: '/notion-face-portrait.png' }
    ]
  },
  alternates: {
    canonical: "https://tomzheng.dev"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Inline Theme Script - Will run immediately, before page renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Theme detection and application script
                try {
                  // Check localStorage first
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light' || savedTheme === 'dark') {
                    document.documentElement.classList.add(savedTheme);
                    return;
                  }
                  
                  // Then check system preference
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
                } catch (e) {
                  // Fallback to default theme if detection fails
                  document.documentElement.classList.add('dark');
                }
              })();
            `
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
