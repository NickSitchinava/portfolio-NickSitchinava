"use client";

import { createContext, useContext, useRef } from "react";
import { useScroll, useMotionValue, type MotionValue } from "framer-motion";

const ParallaxContext = createContext<MotionValue<number> | null>(null);

export function useServicesParallax(): MotionValue<number> {
  const context = useContext(ParallaxContext);
  const fallback = useMotionValue(0);
  return context ?? fallback;
}

export default function ServicesParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref}>
      <ParallaxContext.Provider value={scrollYProgress}>{children}</ParallaxContext.Provider>
    </div>
  );
}