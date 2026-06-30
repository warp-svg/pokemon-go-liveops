export function simulateOptimizer({
  budget,
  cadence,
  confidence
}: {
  budget: number;
  cadence: number;
  confidence: number;
}) {
  const efficiency = 0.7 + confidence * 0.2;
  const projectedImpact = budget * 0.03 * cadence * efficiency;

  return {
    projectedImpact: Number(projectedImpact.toFixed(1)),
    recommendation: projectedImpact > 120 ? "Accelerate" : "Maintain"
  };
}
