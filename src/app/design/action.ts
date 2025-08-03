"use server";

import { generateDecorSuggestions, GenerateDecorSuggestionsOutput } from "@/ai/flows/generate-decor-suggestions";

// Helper to convert file to data URI
const fileToDataUri = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
};

export async function getSuggestions(
  formData: FormData
): Promise<{ data?: GenerateDecorSuggestionsOutput; error?: string }> {
  try {
    const photo = formData.get("photo") as File;
    const roomType = formData.get("roomType") as string | undefined;
    const roomSize = formData.get("roomSize") as string | undefined;

    if (!photo) {
      return { error: "No photo provided." };
    }

    const photoDataUri = await fileToDataUri(photo);

    const suggestions = await generateDecorSuggestions({
      photoDataUri,
      roomType,
      roomSize,
    });

    return { data: suggestions };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    return { error: `Failed to generate suggestions: ${errorMessage}` };
  }
}
