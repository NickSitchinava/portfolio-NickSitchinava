"use client";

import { useRef } from "react";
import { ImageTrail } from "./ImageTrail";
import Antigravity from "./Antigravity";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./projects.module.css";
import trailStyles from "./ImageTrail.module.css";

const TRAIL_IMAGES = [
  { src: "/images/projects/nick-portfolio-hero.webp", alt: "Nick Sitchinava portfolio" },
  { src: "/images/projects/nick-portfolio-detail.webp", alt: "Nick Sitchinava portfolio detail" },
  { src: "/images/projects/george-portfolio-hero.webp", alt: "George Sitchinava portfolio" },
  { src: "/images/projects/george-portfolio-detail.webp", alt: "George Sitchinava portfolio detail" },
  { src: "/images/projects/fdash-hero.webp", alt: "F-Dash finance dashboard" },
  { src: "/images/projects/fdash-detail.webp", alt: "F-Dash finance dashboard detail" },
  { src: "/images/projects/company-landing-hero.webp", alt: "Company landing page" },
];

export default function Projects({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].projects;
  const trailContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className={styles.projects} aria-label={t.heading}>
      <div className={styles.grid}>
        <div className={styles.trailPanel}>
          <h2 className={styles.trailHeading}>See for yourself</h2>
          <div className={styles.trailWindow} ref={trailContainerRef}>
            <ImageTrail
              containerRef={trailContainerRef}
              interval={90}
              minDistance={60}
              rotationRange={12}
              newOnTop
            >
              {TRAIL_IMAGES.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={trailStyles.trailImageEl}
                />
              ))}
            </ImageTrail>
          </div>
        </div>

        <div className={styles.quotePanel}>
          <div className={styles.quoteBg} aria-hidden="true">
            <Antigravity
              count={280}
              magnetRadius={4.5}
              ringRadius={5}
              waveSpeed={0.4}
              waveAmplitude={1}
              particleSize={1.1}
              lerpSpeed={0.05}
              color="#5b4bda"
              autoAnimate
              particleVariance={1}
              rotationSpeed={0}
              depthFactor={1}
              pulseSpeed={3}
              particleShape="capsule"
              fieldStrength={10}
            />
          </div>
          <blockquote className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <p className={styles.quoteText}>
              Clean, well-finished work with a true creative eye, always flexible and quick to respond.
            </p>
            <footer className={styles.quoteAttribution}>
              &mdash; Adrien Pin, founding partner @Merci-Michel
            </footer>
          </blockquote>
        </div>
      </div>

      <div className={styles.deliveryStrip}>
        <div className={styles.deliveryIntro}>
          <span className={styles.deliveryEyebrow}>Latest delivery</span>
          <p className={styles.deliveryText}>New projects typically start within 2 weeks.</p>
        </div>

        {t.items.map((project) => (
          <div key={project.title} className={styles.deliveryRow}>
            <p className={styles.deliveryTitle}>{project.description}</p>
            <div className={styles.deliveryMeta}>
              <span className={styles.metaTag}>{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}