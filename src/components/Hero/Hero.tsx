"use client";

import { motion } from "framer-motion";
import GlowHorizon from "@/components/ui/glow-horizon";
import styles from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-label="Introduction">
      <GlowHorizon variant="top" className={styles.glow} />

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.5 }}
          >
            Freelance Web Developer
          </motion.span>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.65 }}
          >
            Nick Sitchinava builds <em>fast, modern websites</em> for ambitious brands
          </motion.h1>

          <motion.p
            className={styles.subhead}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.8 }}
          >
            I&apos;m a freelance web developer designing and building custom websites,
            landing pages, and web applications for startups and growing businesses —
            from first wireframe to production launch.
          </motion.p>
        </div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.95 }}
        >
          <a href="#projects" className={styles.primaryCta}>
            View My Work
          </a>
          <a href="#contact" className={styles.secondaryCta}>
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}