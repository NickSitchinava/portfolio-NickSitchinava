import FlowArt from "@/components/ui/story-scroll";
import "@/components/ui/story-scroll-entry.css";
import ServicesCursor from "./ServicesCursor";
import { ServiceCard, type ServiceCardTheme } from "./ServiceCard";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./services.module.css";

const panelThemes: ServiceCardTheme[] = [
  {
    stageBg: "#050507",
    ink: "#ffffff",
    inkMuted: "#a3a3a8",
    inkFaint: "#7a7a80",
    panelBg: "rgba(255, 255, 255, 0.05)",
    panelBorder: "rgba(255, 255, 255, 0.1)",
    panelShadow: "inset 0 0 24px rgba(255, 255, 255, 0.05)",
  },
  {
    stageBg: "var(--color-bg)",
    ink: "var(--color-text)",
    inkMuted: "var(--color-muted)",
    inkFaint: "#9a9a9a",
    panelBg: "rgba(17, 17, 17, 0.04)",
    panelBorder: "rgba(17, 17, 17, 0.08)",
    panelShadow: "inset 0 0 20px rgba(17, 17, 17, 0.03)",
  },
  {
    stageBg: "#050507",
    ink: "#ffffff",
    inkMuted: "#a3a3a8",
    inkFaint: "#7a7a80",
    panelBg: "rgba(255, 255, 255, 0.05)",
    panelBorder: "rgba(255, 255, 255, 0.1)",
    panelShadow: "inset 0 0 24px rgba(255, 255, 255, 0.05)",
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
      </ServicesCursor>
    </section>
  );
}