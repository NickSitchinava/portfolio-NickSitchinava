import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ArcRevealHero } from "@/components/ArcRevealHero/ArcRevealHero";
import GradualBlur from "@/components/ui/gradual-blur";
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
  title: "Nick Sitchinava — Freelance Web Developer | Websites & Landing Pages",
  description:
    "Nick Sitchinava is a freelance web developer building fast, custom websites, landing pages, and web applications for startups and growing businesses.",
  keywords: [
    "Nick Sitchinava",
    "freelance web developer",
    "web developer",
    "website developer",
    "landing page developer",
    "custom website design",
    "Next.js developer",
    "responsive web design",
    "business website development",
  ],
  openGraph: {
    type: "website",
    url: "https://nicksitchinava.dev",
    title: "Nick Sitchinava — Freelance Web Developer",
    description:
      "Custom websites, landing pages, and web applications, built by freelance web developer Nick Sitchinava.",
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
        <GradualBlur
          target="page"
          position="bottom"
          height="7rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
        />
      </body>
    </html>
  );
}