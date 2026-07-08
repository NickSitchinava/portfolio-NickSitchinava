import { Code2, Layout, TrendingUp, type LucideIcon } from "lucide-react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import "@/components/ui/story-scroll-entry.css";
import styles from "./services.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const serviceIcons: LucideIcon[] = [Code2, Layout, TrendingUp];

const panelThemes = [
  { bg: "#050507", fg: "#ffffff" },
  { bg: "var(--color-bg)", fg: "var(--color-text)" },
  { bg: "#050507", fg: "#ffffff" },
];

function CascadeChars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((char, index) => (
        <span
          key={index}
          className={styles.cascadeChar}
          style={{ transitionDelay: `${index * 16}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
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

      <FlowArt aria-label={t.heading}>
        {t.items.map((service, index) => {
          const Icon = serviceIcons[index];
          const theme = panelThemes[index % panelThemes.length];

          return (
            <FlowSection
              key={service.title}
              aria-label={service.title}
              style={{ backgroundColor: theme.bg, color: theme.fg }}
            >
              <div className={styles.panelTop}>
                <span className={styles.panelEyebrow}>
                  {String(index + 1).padStart(2, "0")} / {t.heading}
                </span>
                <span className={styles.panelIcon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
              </div>

              <hr className={styles.panelDivider} />

              <h3
                className={styles.panelTitle}
                aria-label={service.title}
                itemProp="name"
              >
                <span className={styles.cascadeWrap}>
                  <CascadeChars text={service.title} />
                </span>
              </h3>

              <hr className={styles.panelDivider} />

              <p className={styles.panelText}>{service.description}</p>
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}