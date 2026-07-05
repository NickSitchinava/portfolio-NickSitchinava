"use client";

import { motion } from "framer-motion";
import GlowHorizon from "@/components/ui/glow-horizon";
import { useLoaderReveal } from "@/components/ArcRevealHero/LoaderContext";
import { Button } from "@/components/ui/Button/Button";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero({ locale }: { locale: Locale }) {
  const isRevealed = useLoaderReveal();
  const animate = isRevealed ? "visible" : "hidden";
  const t = dictionaries[locale].hero;

  return (
    <section id="home" className={styles.hero} aria-label="Introduction">
      <GlowHorizon variant="top" className={styles.glow} />

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

          <motion.h1
            className={styles.headline}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {t.headlinePrefix}
            <em>{t.headlineEmphasis}</em>
          </motion.h1>

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
                "--btn-bg": "#fff",
                "--btn-fg": "#050507",
                "--btn-fill": "#050507",
                "--btn-fill-fg": "#fff",
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
                "--btn-bg": "rgba(255,255,255,0.06)",
                "--btn-fg": "#fff",
                "--btn-border": "1px solid rgba(255,255,255,0.16)",
                "--btn-blur": "blur(12px)",
                "--btn-fill": "#fff",
                "--btn-fill-fg": "#050507",
              } as React.CSSProperties
            }
          >
            {t.secondaryCta}
          </Button>
        </motion.div>
      </div>

      <div className={styles.waveDivider} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            className={styles.waveBack}
            d="M0,82 C220,24 380,124 620,72 C860,20 1040,112 1440,52 L1440,120 L0,120 Z"
            fill="oklch(32% 0.06 290 / 0.35)"
          />
          <path
            className={styles.waveFront}
            d="M0,64 C240,118 470,8 720,34 C980,60 1180,132 1440,70 L1440,120 L0,120 Z"
            fill="var(--color-bg)"
          />
        </svg>
      </div>
    </section>
  );
}