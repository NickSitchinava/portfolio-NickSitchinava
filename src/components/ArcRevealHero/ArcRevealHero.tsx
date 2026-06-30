"use client";

import * as React from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import "./tailwind-entry.css";

export type ArcRevealGreeting = {
  text: string;
  lang?: string;
};

export interface ArcRevealHeroProps {
  greetings?: ArcRevealGreeting[];
  greetingHold?: number;
  revealDuration?: number;
  className?: string;
  introClassName?: string;
  greetingClassName?: string;
  revealClassName?: string;
  storageKey?: string;
  children?: React.ReactNode;
}

const DEFAULT_GREETINGS: ArcRevealGreeting[] = [
  { text: "Custom websites." },
  { text: "Landing pages that convert." },
  { text: "Code that loads fast." },
  { text: "Built for SEO." },
  { text: "Clean. Fast. Found." },
];

type Phase = "intro" | "reveal" | "done";

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 620,
  revealDuration = 1500,
  className,
  introClassName,
  greetingClassName,
  revealClassName,
  storageKey,
  children,
}: ArcRevealHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const [phase, setPhase] = React.useState<Phase>("intro");
  const [index, setIndex] = React.useState(0);

  const progress = useMotionValue(0);
  const arcPath = useTransform(progress, (p: number) => {
    const edge = 110 - p * 140;
    const control = edge + 25;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge} L 100 110 L 0 110 Z`;
  });

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }
    if (storageKey && typeof window !== "undefined") {
      try {
        if (window.sessionStorage.getItem(storageKey) === "done") {
          setPhase("done");
        }
      } catch {}
    }
  }, [prefersReducedMotion, storageKey]);

  React.useEffect(() => {
    if (phase !== "intro") return;
    const isLast = index >= greetings.length - 1;
    if (isLast) {
      const t = window.setTimeout(() => setPhase("reveal"), greetingHold + 220);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), greetingHold);
    return () => window.clearTimeout(t);
  }, [phase, index, greetingHold, greetings.length]);

  React.useEffect(() => {
    if (phase !== "reveal") return;
    const controls = animate(progress, 1, {
      duration: revealDuration / 1000,
      ease: [0.85, 0, 0.15, 1],
      onComplete: () => {
        if (storageKey && typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(storageKey, "done");
          } catch {}
        }
        setPhase("done");
      },
    });
    return () => controls.stop();
  }, [phase, progress, revealDuration, storageKey]);

  const showOverlay = phase !== "done";

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (showOverlay) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [showOverlay]);

  const current = greetings[Math.min(index, greetings.length - 1)];

  return (
    <div
      className={cn(
        "relative isolate w-full bg-background text-foreground",
        className
      )}
    >
      <div
        className={cn("relative z-0", revealClassName)}
        aria-hidden={showOverlay}
        inert={showOverlay ? true : undefined}
      >
        {children}
      </div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="arc-reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
            className={cn(
              "fixed inset-0 z-30 h-dvh w-full overflow-hidden bg-foreground",
              introClassName
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <AnimatePresence mode="wait">
                {phase === "intro" && current && (
                  <motion.span
                    key={`${index}-${current.text}`}
                    lang={current.lang}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "select-none text-center text-3xl font-semibold tracking-tight text-background sm:text-5xl md:text-6xl",
                      greetingClassName
                    )}
                  >
                    {current.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path d={arcPath} style={{ fill: "var(--color-bg)" }} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArcRevealHero;