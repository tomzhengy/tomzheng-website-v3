import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tom Zheng",
  description: "Tom's personal website",
  icons: {
    icon: [
      { url: '/notion-face-portrait.png' }
    ],
    apple: [
      { url: '/notion-face-portrait.png' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
