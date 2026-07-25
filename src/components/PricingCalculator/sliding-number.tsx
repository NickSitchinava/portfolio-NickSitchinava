"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const SPRING = { stiffness: 240, damping: 28, mass: 1 };
const DIGIT_HEIGHT_EM = 1;

function Digit({ digit }: { digit: string }) {
  const prefersReducedMotion = useReducedMotion();
  const numeric = Number(digit);
  const isNumeric = !Number.isNaN(numeric);

  if (!isNumeric) {
    return <span style={{ display: "inline-block" }}>{digit}</span>;
  }

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: "1ch",
        height: `${DIGIT_HEIGHT_EM}em`,
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        animate={{ y: `-${numeric * 10}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", ...SPRING }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            style={{
              height: `${DIGIT_HEIGHT_EM}em`,
              lineHeight: `${DIGIT_HEIGHT_EM}em`,
            }}
          >
            {index}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export interface SlidingNumberProps {
  value: number;
  className?: string;
  padStart?: number;
}

export function SlidingNumber({ value, className, padStart }: SlidingNumberProps) {
  const rounded = Math.round(value);
  const raw = Math.abs(rounded).toString();
  const padded = padStart ? raw.padStart(padStart, "0") : raw;
  const characters = [...(rounded < 0 ? "-" : ""), ...padded];

  return (
    <span className={className} style={{ display: "inline-block", lineHeight: `${DIGIT_HEIGHT_EM}em` }}>
      {characters.map((char, index) => (
        <Digit key={`${index}-${characters.length}`} digit={char} />
      ))}
    </span>
  );
}

export default SlidingNumber;