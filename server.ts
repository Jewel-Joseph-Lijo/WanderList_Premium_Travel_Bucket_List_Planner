import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: Ask Gemini for local tips & itinerary
  app.post('/api/gemini/tips', async (req, res) => {
    try {
      const { name, country, category, description } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Destination name is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured in the active environment. Please expand Settings > Secrets to configure your credential.'
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const prompt = `You are an elite, highly experienced world-class travel orchestrator.
Provide a premium, inspiring, and concise 3-day travel itinerary and top insider tips for the destination.
Keep the output highly structured, utilizing bold markdown headers, clean bullet points, and elegant summaries.

Destination Name: ${name}
Country: ${country || 'Global'}
Category: ${category || 'Universal'}
Description: ${description || 'A beautiful bucket-list location to explore.'}

Provide:
1. **Insider Pocket Tips**: 2-3 elite recommendations (e.g. best time to visit without crowds, hidden viewpoints, of local secrets)
2. **Premium 3-Day Itinerary**:
   - **Day 1: Immersion & Main Icons** - Morning, Afternoon, Evening suggestions.
   - **Day 2: Secret Spots & Off the Beaten Track** - Morning, Afternoon, Evening suggestions.
   - **Day 3: Scenic Excursions & Local Culinary** - Morning, Afternoon, Evening suggestions.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || 'An error occurred while generating itinerary' });
    }
  });

  // Client-side assets and Vite dev server middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
});
