import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ArcRevealHero } from "@/components/ArcRevealHero/ArcRevealHero";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicksitchinava.dev"),
  title: "Nick Sitchinava — Web Developer | Websites & Landing Pages",
  description:
    "Nick Sitchinava is a web developer building fast, custom websites and high-converting landing pages.",
  keywords: [
    "Nick Sitchinava",
    "web developer",
    "website developer",
    "landing page developer",
    "Next.js developer",
  ],
  openGraph: {
    type: "website",
    url: "https://nicksitchinava.dev",
    title: "Nick Sitchinava — Web Developer",
    description:
      "Custom websites and high-converting landing pages, built by Nick Sitchinava.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ArcRevealHero>{children}</ArcRevealHero>
      </body>
    </html>
  );
}