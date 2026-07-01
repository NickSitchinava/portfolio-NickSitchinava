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
  title: "Web Design & Development Agency | Nick Sitchinava",
  description:
    "We design and build custom websites, landing pages, and web applications for startups and growing businesses. Fast, SEO-friendly, built to convert.",
  keywords: [
    "web design agency",
    "website design and development",
    "custom website design",
    "landing page design services",
    "web development agency",
    "small business website design",
    "web app development",
    "responsive website design",
    "Next.js development agency",
    "Nick Sitchinava",
  ],
  openGraph: {
    type: "website",
    url: "https://nicksitchinava.dev",
    title: "Web Design & Development Agency | Nick Sitchinava",
    description:
      "Custom websites, landing pages, and web applications, designed and built to convert.",
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