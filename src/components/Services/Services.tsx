"use client";

import { motion, useTransform } from "framer-motion";
import FlowArt from "@/components/ui/story-scroll";
import "@/components/ui/story-scroll-entry.css";
import ServicesCursor from "./ServicesCursor";
import ServicesParallax, { useServicesParallax } from "./ServicesParallax";
import { ServiceCard, type ServiceCardTheme } from "./ServiceCard";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./services.module.css";

const panelThemes: ServiceCardTheme[] = [
  {
    stageBg: "#1d1d1f",
    stageInk: "#ffffff",
    stageInkMuted: "#9a9aa0",
    stageInkFaint: "#87878d",
    cardBg: "#ffffff",
    cardInk: "#1d1d1f",
    borderColors: { primary: "#d6d6d6", secondary: "#a8a8ac", accent: "var(--color-accent)" },
  },
  {
    stageBg: "#f5f5f7",
    stageInk: "#1d1d1f",
    stageInkMuted: "#54545a",
    stageInkFaint: "#6b6b70",
    cardBg: "#1d1d1f",
    cardInk: "#ffffff",
    borderColors: { primary: "#3a3a3c", secondary: "#6e6e73", accent: "var(--color-accent)" },
  },
  {
    stageBg: "#1d1d1f",
    stageInk: "#ffffff",
    stageInkMuted: "#9a9aa0",
    stageInkFaint: "#87878d",
    cardBg: "#ffffff",
    cardInk: "#1d1d1f",
    borderColors: { primary: "#d6d6d6", secondary: "#a8a8ac", accent: "var(--color-accent)" },
  },
];

function ServicesProgressDot({
  scrollProgress,
  start,
  end,
}: {
  scrollProgress: ReturnType<typeof useServicesParallax>;
  start: number;
  end: number;
}) {
  const fadeIn = useTransform(scrollProgress, [start - 0.001, start], [0.35, 1]);
  const fadeOut = useTransform(scrollProgress, [end - 0.001, end], [1, 0.35]);
  const dotOpacity = useTransform(() => Math.min(fadeIn.get(), fadeOut.get()));
  return <motion.span className={styles.progressDot} style={{ opacity: dotOpacity }} />;
}

function ServicesProgress({ count }: { count: number }) {
  const scrollProgress = useServicesParallax();
  const fadeIn = useTransform(scrollProgress, [0, 0.02], [0, 1]);
  const fadeOut = useTransform(scrollProgress, [0.98, 1], [1, 0]);
  const opacity = useTransform(() => Math.min(fadeIn.get(), fadeOut.get()));

  return (
    <motion.div className={styles.progress} style={{ opacity }} aria-hidden="true">
      {Array.from({ length: count }).map((_, dotIndex) => (
        <ServicesProgressDot
          key={dotIndex}
          scrollProgress={scrollProgress}
          start={dotIndex / count}
          end={(dotIndex + 1) / count}
        />
      ))}
    </motion.div>
  );
}

export default function Services({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].services;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: t.items.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
    })),
  };

  return (
    <section id="services" className={styles.services} aria-label={t.heading}>
      <h2 className={styles.srOnly}>{t.heading}</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServicesCursor>
        <ServicesParallax>
          <ServicesProgress count={t.items.length} />
          <FlowArt aria-label={t.heading}>
            {t.items.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                locale={locale}
                theme={panelThemes[index % panelThemes.length]}
                learnMoreLabel={t.cta}
              />
            ))}
          </FlowArt>
        </ServicesParallax>
      </ServicesCursor>
    </section>
  );
}