import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const ai = genkit({
  plugins: [googleAI()],
});

async function main() {
  try {
    const result = await ai.generate({
      model: 'googleai/imagen-4.0-generate-001',
      prompt: 'A photorealistic beautiful living room',
      output: { format: 'media' }
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();
