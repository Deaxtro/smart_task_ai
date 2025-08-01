import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { OpenAI } from 'openai';

config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptTemplate = (tasks) => `
You're an AI assistant helping a busy project manager clean up raw task notes.

For each task, return:
1. A short, clear summary (max 15 words)
2. 1–2 relevant tags (e.g. #urgent, #frontend, #client, #design)
3. A priority score from 1 (lowest) to 5 (highest)

Tasks:
${tasks.map((t) => `- ${t}`).join('\n')}

Return in this format:
[
  {
    "summary": "...",
    "tags": ["#tag1", "#tag2"],
    "priority": 3
  },
  ...
]
`;

app.post('/summarize', async (req, res) => {
  const tasks = req.body.tasks || [];

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.4,
      messages: [
        { role: 'system', content: 'You are a task summarizing assistant.' },
        { role: 'user', content: promptTemplate(tasks) },
      ],
    });

    const raw = chat.choices[0].message.content.trim();
    const parsed = JSON.parse(raw);
    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to summarize tasks' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});