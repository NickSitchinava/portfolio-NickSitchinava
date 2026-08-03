import { FALLBACK_GEL_TO_USD_RATE, USD_ROUNDING_STEP } from "./config";

const RATE_API_URL = "https://open.er-api.com/v6/latest/GEL";
const FETCH_TIMEOUT_MS = 2500;

let cachedRate: number | null = null;
let fetchPromise: Promise<number> | null = null;

async function fetchLiveRate(): Promise<number> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(RATE_API_URL, { signal: controller.signal });
    if (!response.ok) throw new Error("Rate API request failed");

    const data = await response.json();
    const rate = data?.rates?.USD;

    if (typeof rate !== "number" || Number.isNaN(rate) || rate <= 0) {
      throw new Error("Rate API returned invalid data");
    }

    return rate;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getGelToUsdRate(): Promise<number> {
  if (cachedRate !== null) return cachedRate;

  if (!fetchPromise) {
    fetchPromise = fetchLiveRate()
      .then((rate) => {
        cachedRate = rate;
        return rate;
      })
      .catch(() => {
        cachedRate = FALLBACK_GEL_TO_USD_RATE;
        return FALLBACK_GEL_TO_USD_RATE;
      });
  }

  return fetchPromise;
}

export function convertGelToUsd(gelAmount: number, rate: number): number {
  const raw = gelAmount * rate;
  return Math.round(raw / USD_ROUNDING_STEP) * USD_ROUNDING_STEP;
}