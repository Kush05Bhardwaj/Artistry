"use server";

import { auth } from "@/lib/auth";
import { saveDesign } from "@/lib/designs";

interface SaveDesignInput {
  originalImage: string;
  redesignedImage: string;
  roomType: string;
  style: string;
  budget: number;
  suggestions: string[];
  budgetAnalysis: {
    furniture: { name: string; estimatedCost: number; productUrl?: string }[];
    decor: { name: string; estimatedCost: number; productUrl?: string }[];
    lighting: { name: string; estimatedCost: number; productUrl?: string }[];
    totalEstimated: number;
  };
}

export async function saveDesignAction(input: SaveDesignInput) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { error: "Please sign in to save designs" };
    }

    const userId = session.user.id ?? session.user.email;
    if (!userId) {
      return { error: "Missing user identity" };
    }

    await saveDesign({
      userId,
      userEmail: session.user.email,
      ...input,
    });

    return { success: true };
  } catch (err) {
    console.error("Error saving design:", err);
    return { error: "Failed to save design" };
  }
}