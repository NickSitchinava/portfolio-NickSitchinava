"use client";

import { useEffect, useRef, useState } from "react";
import { Link2, Lock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ImageTrail } from "./ImageTrail";
import Antigravity from "./Antigravity";
import { VideoMorphingDialog } from "@/components/ui/video-morphing-dialog";
import { LinkPreview } from "@/components/ui/link-preview";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./projects.module.css";
import trailStyles from "./ImageTrail.module.css";

gsap.registerPlugin(ScrollTrigger);

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
  const gridRef = useRef<HTMLDivElement>(null);
  const trailPanelRef = useRef<HTMLDivElement>(null);
  const quotePanelRef = useRef<HTMLDivElement>(null);
  const [enableParallax, setEnableParallax] = useState(false);
  const [quoteInView, setQuoteInView] = useState(false);
  const [trailInView, setTrailInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setReduceMotion(motionQuery.matches);
    evaluate();
    motionQuery.addEventListener("change", evaluate);
    return () => motionQuery.removeEventListener("change", evaluate);
  }, []);

  useEffect(() => {
    setEnableParallax(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        window.innerWidth >= 901
    );
  }, []);

  useEffect(() => {
    const node = quotePanelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setQuoteInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setQuoteInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = trailPanelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setTrailInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setTrailInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (
        !enableParallax ||
        !gridRef.current ||
        !trailPanelRef.current ||
        !quotePanelRef.current
      ) {
        return;
      }

      const trailTween = gsap.fromTo(
        trailPanelRef.current,
        { y: 34 },
        {
          y: -34,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      const quoteTween = gsap.fromTo(
        quotePanelRef.current,
        { y: -18 },
        {
          y: 18,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      return () => {
        trailTween.scrollTrigger?.kill();
        trailTween.kill();
        quoteTween.scrollTrigger?.kill();
        quoteTween.kill();
      };
    },
    { scope: gridRef, dependencies: [enableParallax] }
  );

  return (
    <section id="projects" className={styles.projects} aria-label={t.heading} lang={locale}>
      <div className={styles.grid} ref={gridRef}>
        <div className={styles.trailPanel} ref={trailPanelRef}>
          <h2 className={styles.trailHeading}>{t.trailHeading}</h2>
          <div className={styles.trailWindow} ref={trailContainerRef}>
            <ImageTrail
              containerRef={trailContainerRef}
              active={trailInView && !reduceMotion}
              interval={90}
              minDistance={60}
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

        <div className={styles.quotePanel} ref={quotePanelRef}>
          <div className={styles.quoteBg} aria-hidden="true">
            {quoteInView && !reduceMotion && (
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
            )}
          </div>
          <blockquote className={styles.quote} lang={locale}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <p className={styles.quoteText}>{t.problemStatement}</p>
            <footer className={styles.quoteAttribution}>{t.problemAttribution}</footer>
          </blockquote>
        </div>
      </div>

      <div className={styles.deliveryStrip}>
        <div className={styles.deliveryVideoCell}>
          <VideoMorphingDialog
            videoSrc="/videos/showreel.mp4"
            label={t.showreelLabel}
            active={quoteInView}
          />
        </div>

        {t.deliveryLinks.map((link) => {
          const card = (
            <div className={styles.deliveryCard} lang={locale}>
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