# AI-Powered Course Discovery Setup

## Overview
This system uses AI-powered web search to dynamically discover trending courses and identify courses in fields threatened by AI automation (70-80% threat level).

## Required API Keys

### 1. Jina AI API Key
- Visit: https://jina.ai/
- Sign up for an account
- Get your API key from the dashboard
- Add to `.env`: `JINA_API_KEY=your_jina_api_key_here`

### 2. OpenAI API Key
- Visit: https://platform.openai.com/
- Sign up for an account
- Generate an API key
- Add to `.env`: `OPENAI_API_KEY=your_openai_api_key_here`

## How It Works

### 1. Web Search
- Uses Jina AI's DeepSearch API to search the entire internet
- Searches for trending courses and AI-threatened skills
- Real-time data from multiple sources

### 2. AI Analysis
- OpenAI GPT-3.5 extracts course information from search results
- Analyzes AI threat levels (0-1 scale)
- Categorizes courses by demand and job availability

### 3. Dynamic Updates
- No static data - everything is discovered dynamically
- Courses are automatically categorized as:
  - **Trending**: High demand, emerging technologies
  - **Stable**: Consistent demand
  - **Outdated**: High AI threat level (70-80%)

## API Endpoints

### Trigger AI Discovery
```
POST /api/ai-search/discover
```

### Check Status
```
GET /api/ai-search/status
```

## Course Categories

### Trending (High Demand)
- AI/ML
- Data Science  
- Cloud Computing
- Cybersecurity
- DevOps

### AI-Threatened (70-80% automation risk)
- Basic data entry
- Simple content writing
- Manual testing
- Basic customer service
- Template-based design

## Environment Variables
```
JINA_API_KEY=your_jina_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage
1. Set up API keys in `.env`
2. Start the server: `bun dev`
3. AI discovery runs automatically on startup
4. Manual trigger: `POST /api/ai-search/discover`