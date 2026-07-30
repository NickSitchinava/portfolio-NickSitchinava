"use client";

import { useState, useRef, useEffect, useId } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 40,
  speedOnHover,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 40, mass: 0.4 });
  const currentSpeedRef = useRef(speed);
  const uid = useId();

  useEffect(() => {
    const target = isHovering && speedOnHover !== undefined ? speedOnHover : speed;
    const controls = animate(currentSpeedRef.current, target, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        currentSpeedRef.current = value;
      },
    });
    return () => controls.stop();
  }, [isHovering, speed, speedOnHover]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstGroup = track.firstElementChild as HTMLElement | null;
    if (!firstGroup) return;

    const measure = () => {
      const rect = firstGroup.getBoundingClientRect();
      setGroupWidth(rect.width + gap);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(firstGroup);
    return () => ro.disconnect();
  }, [children, gap]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || groupWidth === 0) return;

    const direction = reverse ? 1 : -1;
    const moveBy = direction * currentSpeedRef.current * (delta / 1000);
    let next = rawX.get() + moveBy;

    next = ((next % groupWidth) + groupWidth) % groupWidth;
    if (!reverse) next -= groupWidth;

    rawX.set(next);
  });

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        ref={trackRef}
        style={{
          x: prefersReducedMotion ? 0 : x,
          display: "flex",
          width: prefersReducedMotion ? "100%" : "max-content",
          flexWrap: prefersReducedMotion ? "wrap" : "nowrap",
          justifyContent: prefersReducedMotion ? "center" : "flex-start",
          gap,
          willChange: "transform",
        }}
      >
        <SliderGroup gap={gap} uid={`${uid}-a`}>
          {children}
        </SliderGroup>
        {!prefersReducedMotion && (
          <SliderGroup gap={gap} uid={`${uid}-b`} ariaHidden>
            {children}
          </SliderGroup>
        )}
      </motion.div>
    </div>
  );
}

function SliderGroup({
  children,
  gap,
  uid,
  ariaHidden,
}: {
  children: React.ReactNode;
  gap: number;
  uid: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexShrink: 0, gap }}
      aria-hidden={ariaHidden || undefined}
      data-slider-group={uid}
    >
      {children}
    </div>
  );
}