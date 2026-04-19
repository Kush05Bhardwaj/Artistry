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

import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function saveDesignAction(data: {
  originalImage: string;
  generatedImage?: string;
  roomType?: string;
  style?: string;
  suggestions?: string[];
  costEstimate?: GenerateCostEstimateOutput;
}) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "You must be logged in to save designs" };
    }

    const client = await clientPromise;
    const db = client.db("artistry");

    const newDesign = {
      userEmail: session.user.email,
      originalImage: data.originalImage,
      generatedImage: data.generatedImage || null,
      roomType: data.roomType || "room",
      style: data.style || "modern",
      suggestions: data.suggestions || [],
      costEstimate: data.costEstimate || null,
      createdAt: new Date().toISOString()
    };

    const result = await db.collection("designs").insertOne(newDesign);
    return { success: true, id: result.insertedId.toString() };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    return { error: `Failed to save design: ${errorMessage}` };
  }
}

