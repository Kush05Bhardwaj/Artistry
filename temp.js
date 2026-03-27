const fs = require('fs');
const content = fs.readFileSync('E:/Projects/Artistry-V1/src/ai/flows/generate-redesigned-image.ts', 'utf8');
const start = content.indexOf('  async input => {');
const endContent = \  async input => {
    const apiKey = process.env.FAL_KEY;
    if (!apiKey) {
      throw new Error("Missing FAL_KEY in environment variables. Please add it to your .env.local file.");
    }

    const prompt = \\\Photorealistic interior design of a \. Apply the following suggestions: \. Clean, well-lit, highly detailed, structural boundaries strictly preserved.\\\;

    const response = await fetch("https://fal.run/fal-ai/flux/dev/image-to-image", {
      method: "POST",
      headers: {
        "Authorization": \\\Key \\\\,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        image_url: input.photoDataUri,
        strength: 0.85,
        guidance_scale: 3.5,
        num_inference_steps: 28,
        enable_safety_checker: true
      })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error("fal.ai generation failed: " + err);
    }

    const data = await response.json();
    const generatedImageUrl = data.images?.[0]?.url;

    if (!generatedImageUrl) {
        throw new Error("fal.ai returned success but no image URL was found.");
    }

    const imageResponse = await fetch(generatedImageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";
    
    return {photoDataUri: \\\data:\;base64,\\\\};
  },
);
\;
const newContent = content.substring(0, start) + endContent;
fs.writeFileSync('E:/Projects/Artistry-V1/src/ai/flows/generate-redesigned-image.ts', newContent);
