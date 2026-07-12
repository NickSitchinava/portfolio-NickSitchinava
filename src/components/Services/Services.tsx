import FlowArt from "@/components/ui/story-scroll";
import "@/components/ui/story-scroll-entry.css";
import ServicesCursor from "./ServicesCursor";
import ServicesParallax from "./ServicesParallax";
import { ServiceCard, type ServiceCardTheme } from "./ServiceCard";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./services.module.css";

const panelThemes: ServiceCardTheme[] = [
  {
    stageBg: "#1d1d1f",
    stageInk: "#ffffff",
    cardBg: "#ffffff",
    cardInk: "#1d1d1f",
    cardInkMuted: "#707070",
    cardInkFaint: "#474747",
    borderColors: { primary: "#d6d6d6", secondary: "#a8a8ac", accent: "#1d1d1f" },
  },
  {
    stageBg: "#f5f5f7",
    stageInk: "#1d1d1f",
    cardBg: "#1d1d1f",
    cardInk: "#ffffff",
    cardInkMuted: "#a8a8ac",
    cardInkFaint: "#7d7d82",
    borderColors: { primary: "#3a3a3c", secondary: "#6e6e73", accent: "#d6d6d6" },
  },
  {
    stageBg: "#1d1d1f",
    stageInk: "#ffffff",
    cardBg: "#ffffff",
    cardInk: "#1d1d1f",
    cardInkMuted: "#707070",
    cardInkFaint: "#474747",
    borderColors: { primary: "#d6d6d6", secondary: "#a8a8ac", accent: "#1d1d1f" },
  },
];

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