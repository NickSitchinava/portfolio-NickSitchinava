import type {
  Creativity,
  ProjectType,
  Timeline,
} from "./types";

export const BASE_PRICE_GEL: Record<ProjectType, number> = {
  landing: 499,
  website: 899,
  portfolio: 699,
};

export const SIZE_MULTIPLIER: Record<ProjectType, Record<string, number>> = {
  landing: {
    short: 1.0,
    standard: 1.35,
    long: 1.75,
  },
  website: {
    small: 1.0,
    medium: 1.45,
    large: 2.1,
  },
  portfolio: {
    small: 1.0,
    medium: 1.35,
    large: 1.95,
  },
};

export const CREATIVITY_MULTIPLIER: Record<Creativity, number> = {
  standard: 1.0,
  enhanced: 1.3,
  creative: 1.6,
};

export const TIMELINE_MULTIPLIER: Record<Timeline, number> = {
  flexible: 1.0,
  asap: 1.35,
};

export const ADDON_SEO_GEL = 150;
export const ADDON_CONTENT_ASSISTANCE_GEL = 200;

export const PRICE_RANGE_SPREAD = 0.15;

export const BASE_TIME_WEEKS: Record<ProjectType, Record<string, [number, number]>> = {
  landing: {
    short: [2, 3],
    standard: [3, 4],
    long: [4, 5],
  },
  website: {
    small: [3, 4],
    medium: [5, 7],
    large: [8, 9],
  },
  portfolio: {
    small: [2, 3],
    medium: [3, 5],
    large: [7, 11],
  },
};

export const CREATIVITY_TIME_MULTIPLIER: Record<Creativity, number> = {
  standard: 1.0,
  enhanced: 1.3,
  creative: 1.55,
};

export const TIMELINE_TIME_MULTIPLIER: Record<Timeline, number> = {
  flexible: 1.0,
  asap: 0.7,
};

export const FALLBACK_GEL_TO_USD_RATE = 0.37;

export const USD_ROUNDING_STEP = 5;