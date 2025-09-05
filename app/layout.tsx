import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Lucidcraft Studio",
  description: "We build apps to unlock human potential.",
  keywords: "design, development, digital studio, creative agency",
  authors: [{ name: "Lucidcraft Studio" }],
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    title: "Lucidcraft Studio",
    description: "We build apps to unlock human potential.",
    url: "https://lucidcraft.studio",
    siteName: "Lucidcraft Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucidcraft Studio",
    description: "We build apps to unlock human potential.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
