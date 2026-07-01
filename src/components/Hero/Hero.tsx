"use client";

import { motion } from "framer-motion";
import GlowHorizon from "@/components/ui/glow-horizon";
import { useLoaderReveal } from "@/components/ArcRevealHero/LoaderContext";
import styles from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const isRevealed = useLoaderReveal();
  const animate = isRevealed ? "visible" : "hidden";

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
            Web Design & Development Agency
          </motion.span>

          <motion.h1
            className={styles.headline}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            We build <em>websites that convert</em>
          </motion.h1>

          <motion.p
            className={styles.subhead}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            Custom website design, landing pages, and web app development for
            startups and growing businesses.
          </motion.p>

          <motion.ul
            className={styles.chips}
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            <li className={styles.chip}>Website Design</li>
            <li className={styles.chip}>Landing Pages</li>
            <li className={styles.chip}>Web Applications</li>
          </motion.ul>
        </div>

        <motion.div
          className={styles.actions}
          initial="hidden"
          animate={animate}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
        >
          <a href="#projects" className={styles.primaryCta}>
            View Our Work
          </a>
          <a href="#contact" className={styles.secondaryCta}>
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}