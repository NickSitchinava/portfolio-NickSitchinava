import {
  ADDON_CONTENT_ASSISTANCE_GEL,
  ADDON_SEO_GEL,
  BASE_PRICE_GEL,
  BASE_TIME_WEEKS,
  CREATIVITY_MULTIPLIER,
  CREATIVITY_TIME_MULTIPLIER,
  PRICE_RANGE_SPREAD,
  SIZE_MULTIPLIER,
  TIMELINE_MULTIPLIER,
  TIMELINE_TIME_MULTIPLIER,
} from "./config";
import type { PriceRangeGel, PricingResult, PricingSelections, WeekRange } from "./types";

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function calculatePriceGel(selections: PricingSelections): PriceRangeGel {
  const { projectType, size, creativity, timeline, seo, content } = selections;

  const base = BASE_PRICE_GEL[projectType];
  const sizeMultiplier = SIZE_MULTIPLIER[projectType][size] ?? 1;
  const creativityMultiplier = CREATIVITY_MULTIPLIER[creativity];
  const timelineMultiplier = TIMELINE_MULTIPLIER[timeline];

  let estimate = base * sizeMultiplier * creativityMultiplier * timelineMultiplier;

  if (seo) estimate += ADDON_SEO_GEL;
  if (content === "assistance") estimate += ADDON_CONTENT_ASSISTANCE_GEL;

  const rounded = roundToNearest(estimate, 10);

  return {
    estimate: rounded,
    min: roundToNearest(rounded * (1 - PRICE_RANGE_SPREAD), 10),
    max: roundToNearest(rounded * (1 + PRICE_RANGE_SPREAD), 10),
  };
}

export function calculateTimeWeeks(selections: PricingSelections): WeekRange {
  const { projectType, size, creativity, timeline } = selections;

  const [baseMin, baseMax] = BASE_TIME_WEEKS[projectType][size] ?? [1, 2];
  const creativityMultiplier = CREATIVITY_TIME_MULTIPLIER[creativity];
  const timelineMultiplier = TIMELINE_TIME_MULTIPLIER[timeline];

  const min = baseMin * creativityMultiplier * timelineMultiplier;
  const max = baseMax * creativityMultiplier * timelineMultiplier;

  return {
    min: Math.max(1, Math.round(min)),
    max: Math.max(Math.round(min) + 1, Math.round(max)),
  };
}

export function calculatePricing(selections: PricingSelections): PricingResult {
  return {
    priceGel: calculatePriceGel(selections),
    timeWeeks: calculateTimeWeeks(selections),
  };
} 