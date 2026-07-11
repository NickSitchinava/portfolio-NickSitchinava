"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GradualBlur from "./gradual-blur";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageBottomBlur() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("about");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          return;
        }
        setVisible(entry.boundingClientRect.top > 0);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
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
    </motion.div>
  );
}