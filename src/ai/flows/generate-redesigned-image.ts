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
    const apiKey = process.env.FAL_KEY;
    if (!apiKey) { throw new Error('Missing FAL_KEY in environment variables. Please add it to your .env.local file.'); }
    const prompt = 'Photorealistic interior design of a ' + (input.roomType || 'room') + '. Apply the following suggestions: ' + input.suggestions.join(', ') + '. Clean, well-lit, highly detailed, structural boundaries strictly preserved.';
    const response = await fetch('https://fal.run/fal-ai/flux/dev/image-to-image', { method: 'POST', headers: { 'Authorization': 'Key ' + apiKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: prompt, image_url: input.photoDataUri, strength: 0.85, guidance_scale: 3.5, num_inference_steps: 28, enable_safety_checker: true }) });
    if (!response.ok) { const err = await response.text(); throw new Error('fal.ai generation failed: ' + err); }
    const data = await response.json();
    const generatedImageUrl = data.images?.[0]?.url;
    if (!generatedImageUrl) { throw new Error('fal.ai returned success but no image URL was found.'); }
    const imageResponse = await fetch(generatedImageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';
    return {photoDataUri: 'data:' + mimeType + ';base64,' + buffer.toString('base64')};
  },
);