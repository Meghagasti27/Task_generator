Below is a clean, professional **README.md** tailored to your Tasks Generator project (React + Express + PostgreSQL + OpenAI).
You can copy this directly into your repo and adjust links.

---

# Tasks Generator – Mini Planning Tool

A lightweight web application that converts a feature idea into structured user stories and engineering tasks using an LLM.

The app allows users to:

* Describe a feature (goal, users, constraints)
* Generate structured user stories and tasks
* Edit and reorder tasks
* Export results as Markdown
* View the last 5 generated specs
* Check backend, database, and LLM system health

---

## Live Demo

Frontend: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
Backend: [https://your-backend-url.onrender.com](https://your-backend-url.onrender.com)

---

## Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* TailwindCSS

### Backend

* Node.js
* Express
* Prisma ORM

### Database

* PostgreSQL (Render)

### LLM

* OpenAI API (JSON structured output mode)

---

## Features Implemented

### Core

* Feature idea submission form
* Structured LLM-based spec generation
* Persistent storage in PostgreSQL
* Edit and reorder tasks
* Export as Markdown (copy + download)
* Last 5 specs history view

### System

* `/status` health endpoint
* Backend health check
* Database connectivity check
* LLM connectivity check

### Safety & Validation

* Input validation for empty fields
* JSON parsing validation for LLM response
* Graceful error handling
* No API keys stored in repository

---

## Project Structure

```
root/
 ├── client/          # React frontend
 ├── server/          # Express backend
 ├── prisma/          # Prisma schema
 ├── README.md
 ├── AI_NOTES.md
 ├── PROMPTS_USED.md
 ├── ABOUTME.md
 └── .env.example
```

---

## Environment Variables

Create a `.env` file in the server directory.

Example:

```
DATABASE_URL=postgresql://username:password@host:port/dbname
OPENAI_API_KEY=your_openai_key
PORT=5000
```

Frontend `.env`:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

The repository includes `.env.example` for reference.

---

## Running Locally

### 1. Clone Repository

```
git clone https://github.com/yourusername/tasks-generator.git
cd tasks-generator
```

---

### 2. Setup Backend

```
cd server
npm install
npx prisma migrate dev
node index.js
```

The backend runs on:

```
http://localhost:5000
```

---

### 3. Setup Frontend

```
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

### POST /generate

Generates a new spec using LLM and stores it in DB.

### GET /specs?limit=5

Returns the latest generated specs.

### GET /spec/:id

Fetch a specific spec.

### PUT /spec/:id

Update edited spec.

### GET /status

Returns system health:

```
{
  "backend": "ok",
  "database": "ok",
  "llm": "ok"
}
```

---

## Export Functionality

Specs can be:

* Copied to clipboard
* Downloaded as `.md` file

Markdown is generated dynamically on the frontend.

---

## Deployment

### Database

* PostgreSQL hosted on Render

### Backend

* Hosted on Render
* Build command:

  ```
  npm install && npx prisma migrate deploy
  ```
* Start command:

  ```
  node index.js
  ```

### Frontend

* Hosted on Vercel
* Environment variable: `VITE_API_URL`


---

## Known Limitations

* LLM output quality depends on prompt quality.
* No rate limiting on generation endpoint.
* No spec version history.

---

## License

This project is submitted as part of a technical evaluation.


