"use server";

import { generateDecorSuggestions, GenerateDecorSuggestionsOutput } from "@/ai/flows/generate-decor-suggestions";

// Helper to convert file to data URI
const fileToDataUri = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
};

type SuggestionsPayload = {
  photoDataUri: string;
  roomType?: string;
  roomSize?: string;
  style?: string;
  budget?: string;
};

export async function getSuggestions(
  input: FormData | SuggestionsPayload
): Promise<{ data?: GenerateDecorSuggestionsOutput; error?: string }> {
  try {
    let photoDataUri: string | null = null;
    let roomType: string | undefined;
    let roomSize: string | undefined;
    let style: string | undefined;
    let budget: string | undefined;

    if (input instanceof FormData) {
      const photo = input.get("photo") as File | null;
      roomType = input.get("roomType") as string | undefined;
      roomSize = input.get("roomSize") as string | undefined;
      style = input.get("style") as string | undefined;
      budget = input.get("budget") as string | undefined;

      if (!photo) {
        return { error: "No photo provided." };
      }

      photoDataUri = await fileToDataUri(photo);
    } else {
      photoDataUri = input.photoDataUri;
      roomType = input.roomType;
      roomSize = input.roomSize;
      style = input.style;
      budget = input.budget;
    }

    if (!photoDataUri) {
      return { error: "No photo provided." };
    }

    const suggestions = await generateDecorSuggestions({
      photoDataUri,
      roomType,
      roomSize,
      style,
      budget,
    });

    return { data: suggestions };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    return { error: `Failed to generate suggestions: ${errorMessage}` };
  }
}
