"use client";

import { useRef } from "react";
import { Link2, Lock } from "lucide-react";
import { ImageTrail } from "./ImageTrail";
import Antigravity from "./Antigravity";
import { VideoMorphingDialog } from "@/components/ui/video-morphing-dialog";
import { LinkPreview } from "@/components/ui/link-preview";
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

interface DeliveryLink {
  title: string;
  description: string;
  region: string;
  duration: string;
  href?: string;
  previewSrc: string;
  private?: boolean;
}

const DELIVERY_LINKS: DeliveryLink[] = [
  {
    title: "Nick Sitchinava",
    description: "Personal portfolio site",
    region: "Georgia",
    duration: "1–2 weeks",
    href: "https://nick-sitchinava.vercel.app/",
    previewSrc: "/images/previews/nick-portfolio.webp",
  },
  {
    title: "George Sitchinava",
    description: "Personal portfolio site",
    region: "Georgia",
    duration: "2–3 weeks",
    href: "https://georgesitchinava.vercel.app/",
    previewSrc: "/images/previews/george-portfolio.webp",
  },
  {
    title: "F-Dash",
    description: "Finance dashboard",
    region: "Europe",
    duration: "13–15 weeks",
    href: "https://f-dash.vercel.app/",
    previewSrc: "/images/previews/fdash.webp",
  },
  {
    title: "Company landing page",
    description: "Marketing landing page",
    region: "Private",
    duration: "Under NDA",
    href: undefined,
    previewSrc: "/images/previews/company-landing.webp",
    private: true,
  },
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
              They understood exactly what we needed and delivered a site that felt custom-built for our business, not templated.
            </p>
            <footer className={styles.quoteAttribution}>
              &mdash; Local client, HVAC services
            </footer>
          </blockquote>
        </div>
      </div>

      <div className={styles.deliveryStrip}>
        <div className={styles.deliveryVideoCell}>
          <VideoMorphingDialog videoSrc="/videos/showreel.mp4" label="Showreel" />
        </div>

        {DELIVERY_LINKS.map((link) => {
          const card = (
            <div className={styles.deliveryCard}>
              <div className={styles.deliveryCardTop}>
                <span className={styles.deliveryCardTitle}>{link.title}</span>
                {link.private ? (
                  <Lock size={14} strokeWidth={2} className={styles.deliveryCardIcon} />
                ) : (
                  <Link2 size={14} strokeWidth={2} className={styles.deliveryCardIcon} />
                )}
              </div>

              <p className={styles.deliveryCardDescription}>{link.description}</p>

              <div className={styles.deliveryCardMeta}>
                <span className={styles.deliveryCardChip}>{link.region}</span>
                <span className={styles.deliveryCardChip}>{link.duration}</span>
              </div>
            </div>
          );

          if (link.private || !link.href) {
            return (
              <div key={link.title} className={`${styles.deliveryLink} ${styles.deliveryLinkPrivate}`}>
                {card}
              </div>
            );
          }

          return (
            <LinkPreview
              key={link.title}
              url={link.href}
              imageSrc={link.previewSrc}
              imageAlt={link.title}
              peekWidth={220}
              peekHeight={140}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.deliveryLink}
              >
                {card}
              </a>
            </LinkPreview>
          );
        })}
      </div>
    </section>
  );
} 