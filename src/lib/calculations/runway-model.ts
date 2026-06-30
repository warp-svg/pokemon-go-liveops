export function getRunwayProjection(months: number, burnRate: number, startingBudget: number) {
  const monthlyBurn = burnRate;
  const runwayMonths = startingBudget / monthlyBurn;
  return {
    runwayMonths: Math.max(0, runwayMonths),
    months,
    burnRate,
    startingBudget
  };
}
