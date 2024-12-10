# News Analysis Platform

The News Analysis Platform is a web-based application designed to help readers consume news more critically by providing sentiment analysis for articles and allowing user interaction through likes, dislikes, and an AI-powered chatbot. The platform leverages the **News API** to render articles and applies sentiment analysis on article titles to indicate whether the content is positive or critical, empowering users to make informed decisions.

---
## Demo


https://github.com/user-attachments/assets/99884289-d881-4400-84f5-ef2adcbfaec4



---

## Features

- **News Rendering**: Fetches and displays news articles from the **News API**, categorized by the latest and most relevant topics.
- **Sentiment Analysis**: Analyzes article titles and descriptions to predict sentiment (positive or critical) using an integrated NLP model.
- **User Interaction**: Allows users to like or dislike articles and tracks user interactions for personalized feedback.
- **AI-Powered Chatbot**: A virtual assistant that enables readers to ask questions or seek additional context about news topics.
- **Default Image Handling**: Ensures every article has an associated image, with a fallback for articles missing images.

---

## Tech Stack

### Frontend
- **React.js**: Handles the UI and user interactions.
- **Tailwind CSS**: Provides modern, responsive, and clean styling.
- **Axios**: Facilitates API calls between the frontend and backend.

### Backend
- **Django**: Provides the backend API and handles database management.
- **Django REST Framework (DRF)**: Simplifies API development.
- **Ollama (LLaMA Models)**: Powers the AI chatbot for user interaction.
- **PostgreSQL**: Stores article data, user interactions, and sentiment analysis results.

### Sentiment Analysis
- **Hugging Face Transformers**: Used for natural language processing (NLP) to analyze article sentiment.

---

### Key Features in Detail
1. Sentiment Analysis
The platform uses the Hugging Face Transformers library to analyze the first 512 characters of each article description and predicts:

- **Positive**: Indicates optimistic or favorable content.
- **Critical**: Highlights caution or critical opinions.

2. AI Chatbot
Powered by Ollama and the LLaMA model, the chatbot:

- Answers user queries about news articles or general topics.
- Provides an interactive, conversational experience.

3. User Interactions
Authenticated users can:

- Like/Dislike Articles: Feedback helps improve user recommendations.
