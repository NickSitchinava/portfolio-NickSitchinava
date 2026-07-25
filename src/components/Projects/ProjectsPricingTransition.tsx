"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Projects from "./Projects";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./projects-pricing-transition.module.css";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectsPricingTransitionProps {
  locale: Locale;
}

export default function ProjectsPricingTransition({
  locale,
}: ProjectsPricingTransitionProps) {
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const heading = dictionaries[locale].pricingCalculator.heading;
  const lines = heading.split(" / ");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!headingWrapRef.current || !headingRef.current || reducedMotion) return;

      const lineEls = headingRef.current.querySelectorAll<HTMLElement>(
        `.${styles.introLine}`
      );
      if (lineEls.length === 0) return;

      gsap.set(lineEls, { opacity: 0, y: 70, scale: 0.92 });

      const tween = gsap.to(lineEls, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: headingWrapRef.current,
          start: "top 88%",
          end: "top 38%",
          scrub: 0.6,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready?.then(refresh).catch(() => undefined);
      window.addEventListener("load", refresh);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("load", refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: headingWrapRef, dependencies: [reducedMotion, lines.length] }
  );

  return (
    <>
      <Projects locale={locale} />
      <div ref={headingWrapRef} className={styles.headingWrap}>
        <h2 ref={headingRef} className={styles.introHeading}>
          {lines.map((line, index) => (
            <span key={index} className={styles.introLine}>
              {line}
            </span>
          ))}
        </h2>
      </div>
    </>
  );
}