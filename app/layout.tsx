import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tom Zheng",
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
