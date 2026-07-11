"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./ServicesCursor.module.css";

interface CursorContextValue {
  setActive: (active: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useServicesCursor() {
  return useContext(CursorContext);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServicesCursor({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 42, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 42, mass: 0.4 });

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const node = containerRef.current;
    if (!node) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => {
      setVisible(false);
      setActive(false);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  return (
    <CursorContext.Provider value={{ setActive }}>
      <div ref={containerRef} className={enabled ? styles.scope : undefined}>
        {children}
        {enabled && (
          <>
            <motion.div
              aria-hidden="true"
              className={styles.dot}
              style={{ left: springX, top: springY }}
              animate={{ opacity: visible ? 1 : 0, scale: active ? 1.4 : 1 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
            <motion.div
              aria-hidden="true"
              className={styles.ring}
              style={{ left: springX, top: springY }}
              animate={{ opacity: visible ? 1 : 0, scale: active ? 1.8 : 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          </>
        )}
      </div>
    </CursorContext.Provider>
  );
}