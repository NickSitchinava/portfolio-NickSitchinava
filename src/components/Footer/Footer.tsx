"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

function MagneticPill({
  href,
  className,
  children,
  enabled,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  enabled: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || !enabled) return;

      gsap.set(node, { willChange: "transform" });

      let rect: DOMRect | null = null;
      let rafId = 0;
      let targetX = 0;
      let targetY = 0;

      const handleEnter = () => {
        rect = node.getBoundingClientRect();
      };

      const handleMove = (event: PointerEvent) => {
        if (!rect) rect = node.getBoundingClientRect();
        targetX = (event.clientX - rect.left - rect.width / 2) * 0.3;
        targetY = (event.clientY - rect.top - rect.height / 2) * 0.3;

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            gsap.to(node, {
              x: targetX,
              y: targetY,
              ease: "power2.out",
              duration: 0.4,
              overwrite: "auto",
            });
            rafId = 0;
          });
        }
      };

      const handleLeave = () => {
        rect = null;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        gsap.to(node, {
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.4)",
          duration: 1,
          overwrite: "auto",
        });
      };

      node.addEventListener("pointerenter", handleEnter, { passive: true });
      node.addEventListener("pointermove", handleMove, { passive: true });
      node.addEventListener("pointerleave", handleLeave, { passive: true });

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        node.removeEventListener("pointerenter", handleEnter);
        node.removeEventListener("pointermove", handleMove);
        node.removeEventListener("pointerleave", handleLeave);
        gsap.set(node, { x: 0, y: 0, willChange: "auto" });
      };
    },
    { scope: ref, dependencies: [enabled] }
  );

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const [inView, setInView] = useState(false);
  const year = new Date().getFullYear();
  const t = dictionaries[locale].footer;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    setPointerFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  React.useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const magneticEnabled = pointerFine && !reducedMotion;
  const decorativeMotionActive = inView && !reducedMotion;

  useGSAP(
    () => {
      if (
        reducedMotion ||
        !wrapperRef.current ||
        !giantTextRef.current ||
        !headingRef.current ||
        !actionsRef.current
      ) {
        return;
      }

      gsap.set([giantTextRef.current, headingRef.current, actionsRef.current], {
        willChange: "transform, opacity",
      });

      gsap.set(giantTextRef.current, { y: "10vh", scale: 0.85, opacity: 0 });
      gsap.set([headingRef.current, actionsRef.current], { y: 50, opacity: 0 });

      const textTween = gsap.to(giantTextRef.current, {
        y: "0vh",
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const contentTween = gsap.to([headingRef.current, actionsRef.current], {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 40%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      let refreshScheduled = false;
      const refresh = () => {
        if (refreshScheduled) return;
        refreshScheduled = true;
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          refreshScheduled = false;
        });
      };
      document.fonts?.ready?.then(refresh).catch(() => undefined);
      window.addEventListener("load", refresh);
      refresh();

      return () => {
        window.removeEventListener("load", refresh);
        textTween.scrollTrigger?.kill();
        textTween.kill();
        contentTween.scrollTrigger?.kill();
        contentTween.kill();
      };
    },
    { scope: wrapperRef, dependencies: [reducedMotion] }
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <div ref={wrapperRef} className={styles.curtain}>
        <footer className={styles.footer}>
          <div
            className={`${styles.aurora} ${!decorativeMotionActive ? styles.auroraPaused : ""}`}
            aria-hidden="true"
          />
          <div className={styles.grid} aria-hidden="true" />

          <div ref={giantTextRef} className={styles.giantText} aria-hidden="true">
            {t.giantText}
          </div>

          <div className={styles.marqueeStrip} aria-hidden="true">
            <div
              className={`${styles.marqueeTrack} ${!decorativeMotionActive ? styles.marqueeTrackPaused : ""}`}
            >
              {[0, 1].map((repeat) => (
                <div className={styles.marqueeItem} key={repeat}>
                  {t.marquee.map((item, index) => (
                    <React.Fragment key={`${repeat}-${item}`}>
                      <span lang={locale}>{item}</span>
                      {index < t.marquee.length - 1 && (
                        <span className={styles.marqueeDot}>&#10022;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.center}>
            <h2 ref={headingRef} className={styles.heading} lang={locale}>
              {t.heading}
            </h2>

            <div ref={actionsRef} className={styles.actions}>
              <div className={styles.primaryRow}>
                <MagneticPill
                  href={`/${locale}#contact`}
                  className={`${styles.pill} ${styles.pillPrimary}`}
                  enabled={magneticEnabled}
                >
                  {t.primaryCta}
                  <ArrowUpRight size={18} strokeWidth={2} />
                </MagneticPill>
                <MagneticPill
                  href={`/${locale}#projects`}
                  className={`${styles.pill} ${styles.pillPrimary}`}
                  enabled={magneticEnabled}
                >
                  {t.secondaryCta}
                  <ArrowUpRight size={18} strokeWidth={2} />
                </MagneticPill>
              </div>

              <div className={styles.secondaryRow}>
                <MagneticPill
                  href={`/${locale}#about`}
                  className={`${styles.pill} ${styles.pillSecondary}`}
                  enabled={magneticEnabled}
                >
                  {t.nav.about}
                </MagneticPill>
                <MagneticPill
                  href={`/${locale}#services`}
                  className={`${styles.pill} ${styles.pillSecondary}`}
                  enabled={magneticEnabled}
                >
                  {t.nav.services}
                </MagneticPill>
                <MagneticPill
                  href={`/${locale}#projects`}
                  className={`${styles.pill} ${styles.pillSecondary}`}
                  enabled={magneticEnabled}
                >
                  {t.nav.projects}
                </MagneticPill>
                <MagneticPill
                  href={`/${locale}#contact`}
                  className={`${styles.pill} ${styles.pillSecondary}`}
                  enabled={magneticEnabled}
                >
                  {t.nav.contact}
                </MagneticPill>
                <MagneticPill
                  href={`/${locale}/legal/privacy`}
                  className={`${styles.pill} ${styles.pillSecondary}`}
                  enabled={magneticEnabled}
                >
                  {t.legal.privacy}
                </MagneticPill>
                <MagneticPill
                  href={`/${locale}/legal/terms`}
                  className={`${styles.pill} ${styles.pillSecondary}`}
                  enabled={magneticEnabled}
                >
                  {t.legal.terms}
                </MagneticPill>
              </div>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <p className={styles.copyright}>
              &copy; {year} Nick Sitchinava. {t.rights}
            </p>

            <div className={styles.craftedBadge}>
              <span className={styles.craftedText}>{t.crafted}</span>
              <span className={styles.heart} aria-hidden="true">
                &#10084;
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className={styles.backToTop}
              aria-label={t.backToTop}
            >
              <ArrowUp size={18} strokeWidth={2} />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}