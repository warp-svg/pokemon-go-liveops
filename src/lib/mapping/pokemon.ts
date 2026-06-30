import { popularityData } from "@/lib/domain/data";

export function getPopularityTierLabel(tier: string) {
  return popularityData.find((entry) => entry.tier === tier)?.description ?? tier;
}

export function getTypeSummary(types: string[]) {
  return types.join(" / ");
}
