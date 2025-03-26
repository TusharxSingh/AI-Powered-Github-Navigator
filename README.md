# AI-Powered GitHub Navigator

## 📌 Overview
AI-Powered GitHub Navigator is a web application designed to help students and developers find open-source projects on GitHub based on their skills and interests. Using AI-driven recommendations, it simplifies project discovery, making open-source contributions more accessible.

## 🚀 Features
- 🔍 **Skill-Based Search:** Find GitHub repositories based on programming languages and technologies.
- 🤖 **AI-Powered Recommendations:** Uses AI to suggest projects that match user expertise.
- 📂 **GitHub API Integration:** Fetches real-time data about repositories, issues, and contributions.
- ⚡ **User-Friendly Interface:** A smooth and interactive UI for easy navigation.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Django
- **AI Model:** OpenAI/Custom NLP Model
- **Database:** PostgreSQL / SQLite
- **API Integration:** GitHub REST API

## 📌 Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ai-github-navigator.git
   cd ai-github-navigator
   ```
2. Install dependencies:
   ```sh
   pip install -r backend/requirements.txt
   cd frontend && npm install
   ```
3. Set up environment variables (GitHub API key, database config, etc.).
4. Run the backend:
   ```sh
   cd backend
   python manage.py runserver
   ```
5. Run the frontend:
   ```sh
   cd frontend
   npm start
   ```
6. Access the app at `http://localhost:3000`

