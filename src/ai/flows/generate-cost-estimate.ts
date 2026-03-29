'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCostEstimateInputSchema = z.object({
  originalPhotoDataUri: z.string().describe("Original room photo data URI"),
  redesignedPhotoDataUri: z.string().describe("Redesigned room photo data URI"),
  budget: z.string().optional().describe('The user budget constraint.'),
  roomType: z.string().optional().describe('The type of room.'),
});

export type GenerateCostEstimateInput = z.infer<typeof GenerateCostEstimateInputSchema>;

const CostItemSchema = z.object({
  item: z.string().describe('The specific furniture or decor item upgraded or added'),
  reason: z.string().describe('Why it is needed based on the redesign'),
  estimatedCost: z.number().describe('Estimated cost for this item as a number'),
});

const GenerateCostEstimateOutputSchema = z.object({
  items: z.array(CostItemSchema).describe('List of items that were changed or added'),
  totalCostRaw: z.number().describe('The sum of all estimated costs'),
  currency: z.string().describe("The currency used, always use INR (Rs.) unless specified otherwise"),
  summary: z.string().describe("A 1-2 sentence summary of the cost breakdown")
});

export type GenerateCostEstimateOutput = z.infer<typeof GenerateCostEstimateOutputSchema>;

export async function generateCostEstimate(
  input: GenerateCostEstimateInput
): Promise<GenerateCostEstimateOutput> {
  return generateCostEstimateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCostEstimatePrompt',
  input: {schema: GenerateCostEstimateInputSchema},
  output: {schema: GenerateCostEstimateOutputSchema},
  prompt: `You are an expert interior design cost estimator. I will provide you with two images: the original room and the newly redesigned AI-generated room.

Analyze both images to determine what furniture, decor, textures, and structural items were changed, upgraded, or added.
Create a line-item estimate for each visible change.

Room Type: {{roomType}}
User's Target Budget: {{budget}}

Original Photo: {{media url=originalPhotoDataUri}}
Redesigned Photo: {{media url=redesignedPhotoDataUri}}

Format your output as JSON matching the schema. Use realistic approximate market prices in India (INR) for the items. Keep it within the requested budget if possible.`,
const generateCostEstimateFlow = ai.defineFlow(
  {
    name: 'generateCostEstimateFlow',
    inputSchema: GenerateCostEstimateInputSchema,
    outputSchema: GenerateCostEstimateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
