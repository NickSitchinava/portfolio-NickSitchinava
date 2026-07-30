"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import styles from "./HeroCursor.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const enabled = pointerFine && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dotX = useSpring(x, { stiffness: 700, damping: 46, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 700, damping: 46, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 320, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 34, mass: 0.5 });

  useEffect(() => {
    setPointerFine(window.matchMedia("(pointer: fine)").matches);
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
    const handleDown = () => setActive(true);
    const handleUp = () => setActive(false);

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointerleave", handleLeave);
    node.addEventListener("pointerdown", handleDown);
    node.addEventListener("pointerup", handleUp);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
      node.removeEventListener("pointerdown", handleDown);
      node.removeEventListener("pointerup", handleUp);
    };
  }, [enabled, containerRef, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={styles.dot}
        style={{ left: dotX, top: dotY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.6 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <motion.div
        aria-hidden="true"
        className={styles.ring}
        style={{ left: ringX, top: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: active ? 0.7 : 1,
        }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </>
  );
}