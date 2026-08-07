"use client";

import { useEffect, useMemo, useState } from "react";
import { calculatePricing } from "@/lib/pricing/engine";
import { convertGelToUsd, getGelToUsdRate } from "@/lib/pricing/currency";
import type {
  ContentOption,
  Creativity,
  ProjectSize,
  ProjectType,
  Timeline,
} from "@/lib/pricing/types";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { DropdownField, type DropdownOption } from "./DropdownField";
import { SlidingNumber } from "./sliding-number";
import { Button } from "@/components/ui/Button/Button";
import styles from "./pricing-calculator.module.css";

const SIZE_KEYS_BY_TYPE: Record<ProjectType, ProjectSize[]> = {
  landing: ["short", "standard", "long"],
  website: ["small", "medium", "large"],
  portfolio: ["small", "medium", "large"],
};

interface Selections {
  projectType: ProjectType | null;
  size: ProjectSize | null;
  creativity: Creativity | null;
  timeline: Timeline | null;
  seo: boolean | null;
  content: ContentOption | null;
}

const INITIAL_SELECTIONS: Selections = {
  projectType: null,
  size: null,
  creativity: null,
  timeline: null,
  seo: null,
  content: null,
};

const FIELD_ORDER: (keyof Selections)[] = [
  "projectType",
  "size",
  "creativity",
  "timeline",
  "seo",
  "content",
];

function getSizeOption(
  t: (typeof dictionaries)["en"]["pricingCalculator"],
  projectType: ProjectType,
  size: ProjectSize
): { label: string; description: string } {
  switch (projectType) {
    case "landing":
      return t.steps.size.options.landing[size as "short" | "standard" | "long"];
    case "website":
      return t.steps.size.options.website[size as "small" | "medium" | "large"];
    case "portfolio":
      return t.steps.size.options.portfolio[size as "small" | "medium" | "large"];
  }
}

function isComplete(selections: Selections): selections is {
  projectType: ProjectType;
  size: ProjectSize;
  creativity: Creativity;
  timeline: Timeline;
  seo: boolean;
  content: ContentOption;
} {
  return FIELD_ORDER.every((key) => selections[key] !== null);
}

export default function PricingCalculator({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].pricingCalculator;
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [usdRate, setUsdRate] = useState<number | null>(null);

  useEffect(() => {
    if (locale !== "en") return;
    let active = true;
    getGelToUsdRate().then((rate) => {
      if (active) setUsdRate(rate);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const unlockedCount = useMemo(() => {
    let count = 1;
    for (const key of FIELD_ORDER) {
      if (selections[key] === null) break;
      count += 1;
    }
    return Math.min(count, FIELD_ORDER.length);
  }, [selections]);

  const result = useMemo(() => {
    if (!isComplete(selections)) return null;
    return calculatePricing(selections);
  }, [selections]);

  const priceDisplay = useMemo(() => {
    if (!result) return null;
    if (locale === "ka") {
      return { min: result.priceGel.min, max: result.priceGel.max, symbol: "₾", ready: true };
    }
    if (usdRate === null) return { min: 0, max: 0, symbol: "$", ready: false };
    return {
      min: convertGelToUsd(result.priceGel.min, usdRate),
      max: convertGelToUsd(result.priceGel.max, usdRate),
      symbol: "$",
      ready: true,
    };
  }, [result, locale, usdRate]);

  const sizeOptions: DropdownOption[] = selections.projectType
    ? SIZE_KEYS_BY_TYPE[selections.projectType].map((size) => ({
        value: size,
        ...getSizeOption(t, selections.projectType!, size),
      }))
    : [];

  const projectTypeOptions: DropdownOption[] = (
    ["landing", "website", "portfolio"] as ProjectType[]
  ).map((type) => ({ value: type, label: t.steps.projectType.options[type].label }));

  const creativityOptions: DropdownOption[] = (
    ["standard", "enhanced", "creative"] as Creativity[]
  ).map((level) => ({
    value: level,
    label: t.steps.creativity.options[level].label,
    description: t.steps.creativity.options[level].description,
  }));

  const timelineOptions: DropdownOption[] = (["flexible", "asap"] as Timeline[]).map(
    (option) => ({ value: option, label: t.steps.timeline.options[option].label })
  );

  const seoOptions: DropdownOption[] = [
    { value: "no", label: t.steps.seo.no },
    { value: "yes", label: t.steps.seo.yes },
  ];

  const contentOptions: DropdownOption[] = (["client", "assistance"] as ContentOption[]).map(
    (option) => ({ value: option, label: t.steps.content.options[option] })
  );

  return (
    <section id="pricing" className={styles.pricing} aria-label={t.heading} lang={locale}>
      <div className={styles.layout}>
        <div className={styles.sticky}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <p className={styles.subhead}>{t.subhead}</p>
        </div>

        <div className={styles.right}>
          <div className={styles.panel}>
            <DropdownField
              index={1}
              locale={locale}
              label={t.steps.projectType.title}
              placeholder={t.placeholder}
              options={projectTypeOptions}
              value={selections.projectType}
              onChange={(value) =>
                setSelections((prev) => ({
                  ...prev,
                  projectType: value as ProjectType,
                  size: SIZE_KEYS_BY_TYPE[value as ProjectType].includes(
                    prev.size as ProjectSize
                  )
                    ? prev.size
                    : null,
                }))
              }
              disabled={unlockedCount < 1}
            />

            <DropdownField
              index={2}
              locale={locale}
              label={t.steps.size.title}
              placeholder={t.placeholder}
              options={sizeOptions}
              value={selections.size}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, size: value as ProjectSize }))
              }
              disabled={unlockedCount < 2}
            />

            <DropdownField
              index={3}
              locale={locale}
              label={t.steps.creativity.title}
              placeholder={t.placeholder}
              options={creativityOptions}
              value={selections.creativity}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, creativity: value as Creativity }))
              }
              disabled={unlockedCount < 3}
            />

            <DropdownField
              index={4}
              locale={locale}
              label={t.steps.timeline.title}
              placeholder={t.placeholder}
              options={timelineOptions}
              value={selections.timeline}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, timeline: value as Timeline }))
              }
              disabled={unlockedCount < 4}
            />

            <DropdownField
              index={5}
              locale={locale}
              label={t.steps.seo.title}
              placeholder={t.placeholder}
              options={seoOptions}
              value={selections.seo === null ? null : selections.seo ? "yes" : "no"}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, seo: value === "yes" }))
              }
              disabled={unlockedCount < 5}
            />

            <DropdownField
              index={6}
              locale={locale}
              label={t.steps.content.title}
              placeholder={t.placeholder}
              options={contentOptions}
              value={selections.content}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, content: value as ContentOption }))
              }
              disabled={unlockedCount < 6}
            />
          </div>

          {result && (
            <div className={styles.resultsRow}>
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>{t.result.timeLabel}</span>
                <p className={styles.resultTime}>
                  <SlidingNumber value={result.timeWeeks.min} />
                  <span className={styles.resultDash}>–</span>
                  <SlidingNumber value={result.timeWeeks.max} />
                  <span className={styles.resultUnit}>{t.result.weeksUnit}</span>
                </p>
              </div>

              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>{t.result.priceLabel}</span>
                <p className={styles.resultPrice}>
                  {priceDisplay?.ready ? (
                    <>
                      <span className={styles.resultSymbol}>{priceDisplay.symbol}</span>
                      <SlidingNumber value={priceDisplay.min} />
                      <span className={styles.resultDash}>–</span>
                      <span className={styles.resultSymbol}>{priceDisplay.symbol}</span>
                      <SlidingNumber value={priceDisplay.max} />
                    </>
                  ) : (
                    t.result.loadingRate
                  )}
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className={styles.footer}>
              <Button
                href={`/${locale}#contact`}
                style={
                  {
                    "--btn-bg": "var(--color-text)",
                    "--btn-fg": "var(--color-bg)",
                    "--btn-fill": "oklch(30% 0.01 290)",
                    "--btn-fill-fg": "var(--color-bg)",
                    width: "100%",
                    padding: "1.15rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  } as React.CSSProperties
                }
              >
                {t.result.ctaButton}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}