# AI-Powered Course Trend Analysis System

## 🚀 Overview
Professional AI-powered system that dynamically discovers and analyzes online courses using real-time web search. Identifies trending courses and those threatened by AI automation (70-80% threat level).

## 🧠 AI Components

### 1. Web Search Engine
- **Jina AI DeepSearch**: Searches entire internet for course data
- **Real-time Discovery**: No static data, everything dynamically sourced
- **Multi-query Strategy**: Uses targeted search queries for different course types

### 2. AI Analysis Engine  
- **OpenAI GPT-3.5**: Extracts and categorizes course information
- **Threat Assessment**: Calculates AI automation threat levels
- **Trend Analysis**: Identifies emerging vs declining skills

## 📊 Course Classification

### Trending Courses (High Demand)
- AI/ML and Data Science
- Cloud Computing & DevOps
- Cybersecurity
- Emerging Technologies

### AI-Threatened Courses (70-80% Automation Risk)
- Basic data entry and manual processing
- Simple content writing
- Template-based design work
- Manual testing and QA
- Basic customer service

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys
Create `.env` file with:
```
JINA_API_KEY=your_jina_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://localhost:27017/kaushalx
```

### 3. Start System
```bash
bun dev
```

## 🌐 API Endpoints

### AI Course Discovery
```
POST /api/ai-search/discover
GET /api/ai-search/status
```

### Course Data
```
GET /api/courses
GET /api/dashboard
```

## 🎯 Key Features

- **Dynamic Discovery**: Real-time web search for course data
- **AI Threat Analysis**: Identifies skills being automated
- **Professional Architecture**: Scalable, maintainable codebase
- **Error Resilience**: Handles API failures gracefully
- **Real-time Updates**: WebSocket notifications for data changes

## 🔍 Search Queries Used

### Trending Courses
- "trending online courses 2024 machine learning AI"
- "most popular programming courses 2024"
- "high demand tech skills courses 2024"
- "emerging technology courses blockchain web3"

### AI-Threatened Skills
- "jobs threatened by AI automation 2024 courses"
- "careers being replaced by artificial intelligence"
- "manual tasks automated by AI training courses"
- "traditional jobs AI disruption retraining"

## 📈 Data Flow

1. **Web Search** → Jina AI searches internet
2. **Content Extraction** → OpenAI extracts course data
3. **Threat Analysis** → AI calculates automation risk
4. **Database Storage** → Upsert to prevent duplicates
5. **Real-time Updates** → WebSocket notifications

## 🛡️ Security Features

- Proper TLS configuration
- API key validation
- Rate limiting protection
- Input sanitization
- Error boundary handling