
fetch('https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=' + process.env.GEMINI_API_KEY, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    instances: [
      { prompt: 'A cozy beautiful bedroom' }
    ],
    parameters: { sampleCount: 1 }
  })
}).then(r=>r.json()).then(r => console.log(r.error ? r.error : 'SUCCESS')).catch(console.error);

