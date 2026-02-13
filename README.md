<h1 align="center">SpecGen</h1>

<p align="center">
  <strong>AI-Powered Engineering Specification Generator</strong><br/>
  Transform product ideas into structured user stories, engineering tasks, and risk analysis.
</p>

<hr/>

<h2>Overview</h2>

<p>
SpecGen is a full-stack AI application that converts high-level product goals into 
production-ready engineering specifications. The system integrates a Large Language Model 
via Groq to generate structured development plans, which are parsed and persisted using Prisma and PostgreSQL.
</p>

<p>
The application emphasizes clean architecture, structured prompt design, reliable parsing logic,
and production deployment readiness.
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
  <li>AI-based generation of structured development plans</li>
  <li>Strictly formatted output parsing (User Stories, Engineering Tasks, Risks)</li>
  <li>Persistent storage of generated specifications</li>
  <li>History view with recent spec retrieval</li>
  <li>Detailed spec view with ordered task breakdown</li>
  <li>Download specification as .txt</li>
  <li>Production-ready API with status health check</li>
</ul>

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
  <li><strong>API Status:</strong> 
    <a href="https://task-generator-api.onrender.com/api/status" target="_blank">
      /api/status
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

<h3>2. Backend Configuration</h3>

<pre>
cd backend
npm install
</pre>

Create a <code>.env</code> file inside the <code>backend</code> directory:

<pre>
DATABASE_URL=your_postgres_url
GROQ_API_KEY=your_groq_key
</pre>

Run:

<pre>
npx prisma generate
npm run dev
</pre>

Backend runs at:
<pre>http://localhost:5000</pre>

<h3>3. Frontend Configuration</h3>

<pre>
npm install
npm run dev
</pre>

Frontend runs at:
<pre>http://localhost:5173</pre>

<hr/>

<h2>Engineering Decisions</h2>

<ul>
  <li>
    <strong>Groq LLM Integration:</strong> Chosen for low latency inference and stable structured output.
  </li>
  <li>
    <strong>Strict Prompt Formatting:</strong> Ensures predictable parsing and reliable section extraction.
  </li>
  <li>
    <strong>Separation of Concerns:</strong> Clean division between prompt generation, parsing, persistence, and UI rendering.
  </li>
  <li>
    <strong>Production Deployment:</strong> Backend and database deployed on Render; frontend deployed on Vercel.
  </li>
</ul>


<h2>Project Focus</h2>

<p>
SpecGen prioritizes structured AI output, backend correctness, and deployment reliability 
over visual complexity. The project demonstrates practical integration of a production LLM 
into a full-stack application with persistent storage and structured parsing logic.
</p>

<hr/>

<p align="center">
  Built for practical AI system design and full-stack deployment demonstration.
</p>
