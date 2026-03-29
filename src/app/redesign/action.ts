"use server";

import { generateCostEstimate, GenerateCostEstimateInput, GenerateCostEstimateOutput } from "@/ai/flows/generate-cost-estimate";

export async function getCostEstimate(
  input: GenerateCostEstimateInput
): Promise<{ data?: GenerateCostEstimateOutput; error?: string }> {
  try {
    const estimate = await generateCostEstimate(input);
    return { data: estimate };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    return { error: `Failed to generate cost estimate: ${errorMessage}` };
  }
}
