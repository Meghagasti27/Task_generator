# SpecGen

SpecGen is an AI-powered engineering specification generator that converts product ideas into structured user stories, engineering tasks, and risk analysis.

## Live Demo
Frontend: <your-frontend-url>
Backend: <your-backend-url>

---

## Tech Stack

Frontend:
- React
- Tailwind CSS
- React Router

Backend:
- Node.js
- Express
- Prisma ORM
- PostgreSQL (Render)
- Groq SDK (LLM)

---

## How to Run Locally

### 1. Clone Repository

git clone <repo-url>
cd project-folder

---

### 2. Backend Setup

cd backend
npm install

Create .env file:

DATABASE_URL=your_postgres_url
GROQ_API_KEY=your_groq_key

Run:

npx prisma generate
npm run dev

Backend runs at:
http://localhost:5000

---

### 3. Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173 (or your configured port)

---

## What Is Done

- Spec creation and storage
- Structured prompt engineering
- Groq LLM integration
- Parsing into structured sections
- Download spec as .txt
- History endpoint
- Production deployment ready
- Render PostgreSQL integration

---

## What Is Not Done

- PDF export
- Authentication system
- Multi-user accounts
- Advanced UI animations
- Spec editing after creation
- Caching layer

---

## Deployment

Backend and database deployed using Render.
Frontend deployed separately (e.g., Vercel / Render static).