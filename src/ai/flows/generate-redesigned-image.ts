'use server';

/**
 * @fileOverview An AI agent that generates a redesigned image of a room based on an original image and decor suggestions.
 *
 * - generateRedesignedImage - A function that handles the image redesign process.
 * - GenerateRedesignedImageInput - The input type for the generateRedesignedImage function.
 * - GenerateRedesignedImageOutput - The return type for the generateRedesignedImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRedesignedImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.",
    ),
  suggestions: z.array(z.string()).describe('A list of decor suggestions to apply.'),
  roomType: z.string().optional().describe('The type of the room (e.g., living room, bedroom).'),
});
export type GenerateRedesignedImageInput = z.infer<typeof GenerateRedesignedImageInputSchema>;

const GenerateRedesignedImageOutputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "The redesigned photo of the room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateRedesignedImageOutput = z.infer<typeof GenerateRedesignedImageOutputSchema>;

export async function generateRedesignedImage(
  input: GenerateRedesignedImageInput,
): Promise<GenerateRedesignedImageOutput> {
  return generateRedesignedImageFlow(input);
}

const generateRedesignedImageFlow = ai.defineFlow(
  {
    name: 'generateRedesignedImageFlow',
    inputSchema: GenerateRedesignedImageInputSchema,
    outputSchema: GenerateRedesignedImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {
          text: `Redesign this ${input.roomType || 'room'} by applying the following suggestions: ${input.suggestions.join(', ')}. Generate a photorealistic image.`,
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {photoDataUri: media!.url};
  },
);
