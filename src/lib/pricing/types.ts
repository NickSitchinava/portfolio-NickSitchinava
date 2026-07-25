export type ProjectType = "landing" | "website" | "portfolio";

export type LandingSize = "short" | "standard" | "long";
export type WebsiteSize = "small" | "medium" | "large";
export type PortfolioSize = "small" | "medium" | "large";
export type ProjectSize = LandingSize | WebsiteSize | PortfolioSize;

export type Creativity = "standard" | "enhanced" | "creative";
export type Timeline = "flexible" | "asap";
export type ContentOption = "client" | "assistance";

export interface PricingSelections {
  projectType: ProjectType;
  size: ProjectSize;
  creativity: Creativity;
  timeline: Timeline;
  seo: boolean;
  content: ContentOption;
}

export interface WeekRange {
  min: number;
  max: number;
}

export interface PriceRangeGel {
  min: number;
  max: number;
  estimate: number;
}

export interface PricingResult {
  priceGel: PriceRangeGel;
  timeWeeks: WeekRange;
}