<h1 align="center">SpecGen</h1>

<p align="center">
  <strong>AI-Powered Weekly Roadmap & Execution Planner</strong><br/>
  Transform product ideas into structured weekly execution plans with interactive progress tracking.
</p>

<hr/>

<h2>Overview</h2>

<p>
SpecGen is a full-stack AI-powered planning application that converts high-level product ideas into
structured weekly execution roadmaps. The system integrates a Large Language Model via Groq
to generate actionable development plans, which are parsed, stored, and tracked using Prisma and PostgreSQL.
</p>

<p>
The application focuses on practical AI integration, structured prompt engineering,
backend reliability, and execution tracking through an interactive roadmap interface.
</p>

<hr/>

<h2>Architecture</h2>

<ul>
  <li><strong>Frontend:</strong> React + Vite + Tailwind CSS</li>
  <li><strong>Backend:</strong> Node.js + Express</li>
  <li><strong>Database:</strong> PostgreSQL (Render)</li>
  <li><strong>ORM:</strong> Prisma</li>
  <li><strong>LLM Provider:</strong> Groq</li>
  <li><strong>Model Used:</strong> llama-3.1-8b-instant</li>
</ul>

<hr/>

<h2>Core Features</h2>

<ul>
  <li>AI-generated weekly execution roadmaps</li>
  <li>Structured roadmap parsing and task extraction</li>
  <li>Interactive task progress tracking</li>
  <li>Persistent storage using PostgreSQL</li>
  <li>History view with roadmap retrieval</li>
  <li>Delete roadmap functionality</li>
  <li>Download roadmap as .txt file</li>
  <li>Auto-expanding input fields for improved UX</li>
  <li>Production-ready backend API architecture</li>
</ul>

<hr/>

<h2>How It Works</h2>

<ol>
  <li>User enters project details and requirements</li>
  <li>Frontend sends request to backend API</li>
  <li>Backend generates a structured AI prompt</li>
  <li>Groq LLM creates a weekly execution roadmap</li>
  <li>Backend parses the response into structured tasks</li>
  <li>Roadmap is stored in PostgreSQL database</li>
  <li>Frontend displays roadmap timeline with progress tracking</li>
</ol>

<hr/>

<h2>Live Deployment</h2>

<ul>
  <li><strong>Frontend:</strong> 
    <a href="https://task-generator-five.vercel.app" target="_blank">
      https://task-generator-five.vercel.app
    </a>
  </li>

  <li><strong>Backend:</strong> 
    <a href="https://task-generator-api.onrender.com" target="_blank">
      https://task-generator-api.onrender.com
    </a>
  </li>
</ul>

<hr/>

<h2>Local Development Setup</h2>

<h3>1. Clone Repository</h3>

<pre>
git clone &lt;repository-url&gt;
cd project-folder
</pre>

<h3>2. Frontend Setup</h3>

<pre>
npm install
</pre>

Create a root <code>.env</code> file:

<pre>
VITE_API_URL=http://localhost:5001/api
</pre>

Run frontend:

<pre>
npm run dev
</pre>

Frontend runs at:

<pre>
http://localhost:5173
</pre>

<h3>3. Backend Setup</h3>

<pre>
cd backend
npm install
</pre>

Create a <code>.env</code> file inside backend directory:

<pre>
DATABASE_URL=your_postgresql_url
GROQ_API_KEY=your_groq_api_key
PORT=5001
</pre>

Install Prisma dependencies:

<pre>
npm install prisma@5.22.0 @prisma/client@5.22.0
</pre>

Generate Prisma client:

<pre>
npx prisma generate
</pre>

Push schema to database:

<pre>
npx prisma db push
</pre>

Run backend:

<pre>
npm run dev
</pre>

Backend runs at:

<pre>
http://localhost:5001
</pre>

<hr/>

<h2>Database Models</h2>

<ul>
  <li><strong>Spec:</strong> Stores roadmap details and project information</li>
  <li><strong>Task:</strong> Stores parsed weekly tasks and risks</li>
  <li><strong>Progress:</strong> Stores interactive task completion tracking</li>
</ul>

<hr/>

<h2>Engineering Decisions</h2>

<ul>
  <li>
    <strong>Structured Prompt Engineering:</strong> Used to generate predictable weekly roadmap output.
  </li>

  <li>
    <strong>Response Parsing Logic:</strong> Custom parser extracts weekly tasks into structured database records.
  </li>

  <li>
    <strong>Retry-Based Database Handling:</strong> Added retry mechanism for improved reliability with Render PostgreSQL.
  </li>

  <li>
    <strong>Progress Tracking System:</strong> Allows persistent roadmap execution tracking across sessions.
  </li>

  <li>
    <strong>Separation of Concerns:</strong> Clean architecture separating AI generation, parsing, persistence, and UI rendering.
  </li>
</ul>

<hr/>

<h2>Challenges Faced</h2>

<ul>
  <li>Prisma version compatibility issues</li>
  <li>Database connection failures and retry handling</li>
  <li>Ensuring consistent AI-generated structure</li>
  <li>Reliable parsing of dynamic LLM responses</li>
</ul>

<hr/>

<h2>Project Focus</h2>

<p>
SpecGen focuses on practical AI system design, execution planning,
backend reliability, and structured roadmap generation rather than visual complexity.
The project demonstrates real-world integration of AI into a deployable full-stack application.
</p>

<hr/>

<p align="center">
  Built for practical AI system design and full-stack execution planning.
</p>