# Smart Task Summarizer + Tagger

An AI-powered tool that cleans messy task descriptions using GPT-4 and returns clear summaries, tags, and priorities.

## 🧠 Features
- Uses GPT-4 for task summarization
- Web form for user input (React)
- Exports results to CSV
- (Bonus) Google Sheet to Notion automation via n8n

## 🛠 Tools
- GPT-4 via OpenAI
- React + Express
- n8n (automation)
- CSV export with Papaparse

## 🌐 How It Works
1. User submits unstructured tasks
2. GPT-4 summarizes & tags them
3. Results displayed and exported
4. (Optional) n8n pulls tasks from Sheets, writes back summaries

## ✅ To Run Locally
```bash
cd backend && npm install && node server.js //needs .env file with openAI api key to work
cd frontend && npm install && npm run dev
```

## 💡 Improvements
- Add user auth
- Schedule summaries daily
- Integrate directly with Notion API