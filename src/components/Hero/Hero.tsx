"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";
import InkReveal from "@/components/Hero/InkReveal";
import MeshText from "@/components/Hero/MeshText";
import HeroCursor from "@/components/Hero/HeroCursor";
import { useLoaderReveal } from "@/components/ArcRevealHero/LoaderContext";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./Hero.module.css";

const HEADLINE_FONT_SIZE = 96;
const HEADLINE_FONT_WEIGHT = 600;
const HEADLINE_FONT_FAMILY = "Poppins";

function measureLineWidths(lines: string[], fontSize: number): number[] {
  if (typeof document === "undefined") return lines.map(() => 0);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return lines.map(() => 0);
  ctx.font = `${HEADLINE_FONT_WEIGHT} ${fontSize}px ${HEADLINE_FONT_FAMILY}, sans-serif`;
  return lines.map((line) => ctx.measureText(line).width);
}

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const BG_IMAGE_URL = "/images/HeroBG.webp";

export default function Hero({ locale }: { locale: Locale }) {
  const isRevealed = useLoaderReveal();
  const animate = isRevealed ? "visible" : "hidden";
  const t = dictionaries[locale].hero;
  const sectionRef = useRef<HTMLElement>(null);

  const headlineLines = t.headlineLines ?? [t.headlinePrefix + t.headlineEmphasis];
  const [lineWidths, setLineWidths] = useState<number[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      setLineWidths(measureLineWidths(headlineLines, HEADLINE_FONT_SIZE));
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(measure);
    } else {
      measure();
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headlineLines.join("|")]);

  return (
    <section id="home" ref={sectionRef} className={styles.hero} aria-label="Introduction">
      <HeroCursor containerRef={sectionRef} />

      <div className={styles.canvasLayer} aria-hidden="true">
        <Image
          src={BG_IMAGE_URL}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <InkReveal className={styles.inkCanvas} maskColor={[244, 243, 240]} brushSize={160} />
      </div>

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <motion.span
            className={styles.eyebrow}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            {t.eyebrow}
          </motion.span>

          <motion.div
            className={styles.headline}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {headlineLines.map((line, index) => {
              const measuredWidth = lineWidths?.[index] ?? 0;
              const boxWidth = measuredWidth > 0 ? measuredWidth * 1.18 + 48 : undefined;
              return (
                <div
                  key={index}
                  className={styles.headlineLine}
                  style={boxWidth ? { width: `min(94vw, ${boxWidth}px)` } : undefined}
                >
                  {lineWidths && (
                    <MeshText
                      text={line}
                      color="#111111"
                      fontFamily={HEADLINE_FONT_FAMILY}
                      fontWeight={HEADLINE_FONT_WEIGHT}
                      colorSplit={false}
                      fontSize={HEADLINE_FONT_SIZE}
                      force={16}
                    />
                  )}
                  <span className={styles.headlineSrOnly}>{line}</span>
                </div>
              );
            })}
          </motion.div>

          <motion.p
            className={styles.subhead}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            {t.subhead}
          </motion.p>

          <motion.ul
            className={styles.chips}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            {t.chips.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className={styles.actions}
          initial="hidden"
          animate={animate}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
        >
          <Button
            href="#projects"
            className={styles.primaryCta}
            style={
              {
                "--btn-bg": "#111111",
                "--btn-fg": "#f4f3f0",
                "--btn-fill": "var(--color-accent)",
                "--btn-fill-fg": "#111111",
              } as React.CSSProperties
            }
          >
            {t.primaryCta}
          </Button>
          <Button
            href="#contact"
            className={styles.secondaryCta}
            style={
              {
                "--btn-bg": "rgba(17,17,17,0.05)",
                "--btn-fg": "#111111",
                "--btn-border": "1px solid rgba(17,17,17,0.14)",
                "--btn-fill": "#111111",
                "--btn-fill-fg": "#f4f3f0",
              } as React.CSSProperties
            }
          >
            {t.secondaryCta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}