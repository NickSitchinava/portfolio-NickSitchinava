"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const SPRING = { stiffness: 240, damping: 28, mass: 1 };
const DIGIT_HEIGHT_EM = 1;

function Digit({ digit }: { digit: string }) {
  const prefersReducedMotion = useReducedMotion();
  const numeric = Number(digit);
  const isNumeric = !Number.isNaN(numeric);

  if (!isNumeric) {
    return (
      <span
        style={{
          display: "inline-block",
          width: "0.6ch",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {digit}
      </span>
    );
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
        fontVariantNumeric: "tabular-nums",
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
        initial={false}
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
  const isNegative = rounded < 0;
  const digitChars = padded.split("");

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        lineHeight: `${DIGIT_HEIGHT_EM}em`,
        whiteSpace: "nowrap",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {isNegative && <Digit digit="-" />}
      <AnimatePresence initial={false} mode="popLayout">
        {digitChars.map((char, indexFromLeft) => {
          const stableKey = digitChars.length - indexFromLeft;
          return (
            <motion.span
              key={stableKey}
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "1ch" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              <Digit digit={char} />
            </motion.span>
          );
        })}
      </AnimatePresence>
    </span>
  );
}

export default SlidingNumber;