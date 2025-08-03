'use server';

/**
 * @fileOverview An AI agent that generates decor suggestions for a room based on an image.
 *
 * - generateDecorSuggestions - A function that handles the decor suggestion generation process.
 * - GenerateDecorSuggestionsInput - The input type for the generateDecorSuggestions function.
 * - GenerateDecorSuggestionsOutput - The return type for the generateDecorSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDecorSuggestionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  roomType: z.string().optional().describe('The type of the room (e.g., living room, bedroom).'),
  roomSize: z.string().optional().describe('The size of the room (e.g., small, medium, large).'),
});

export type GenerateDecorSuggestionsInput = z.infer<typeof GenerateDecorSuggestionsInputSchema>;

const GenerateDecorSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of decor suggestions for the room.'),
  detectedItems: z.array(z.string()).describe('A list of items detected in the room.'),
});

export type GenerateDecorSuggestionsOutput = z.infer<typeof GenerateDecorSuggestionsOutputSchema>;

export async function generateDecorSuggestions(
  input: GenerateDecorSuggestionsInput
): Promise<GenerateDecorSuggestionsOutput> {
  return generateDecorSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDecorSuggestionsPrompt',
  input: {schema: GenerateDecorSuggestionsInputSchema},
  output: {schema: GenerateDecorSuggestionsOutputSchema},
  prompt: `You are an AI interior design assistant. You will analyze a photo of a room and provide decor suggestions to improve the space.

You will identify specific items detected in the image and recommend incorporating additional items to enhance the room's aesthetics.

Room Type: {{roomType}}
Room Size: {{roomSize}}
Photo: {{media url=photoDataUri}}

Suggestions should be specific and actionable, providing clear guidance on how to implement the proposed changes.

Format your output as a JSON object with 'suggestions' (a list of decor suggestions) and 'detectedItems' (a list of items detected in the room).`,
});

const generateDecorSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateDecorSuggestionsFlow',
    inputSchema: GenerateDecorSuggestionsInputSchema,
    outputSchema: GenerateDecorSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
