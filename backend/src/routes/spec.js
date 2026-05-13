const express = require("express");
// const prisma = require("../lib/prisma");
const { prisma, withRetry } = require("../lib/prisma");
const { generateWithLLM } = require("../services/llm");

const router = express.Router();


function buildPrompt(goal, users, constraints, template) {
  return `
You are a senior software architect creating a detailed project execution plan.

Generate a STRICTLY STRUCTURED WEEKLY EXECUTION PLAN for the project below.

RULES:
- Follow the format EXACTLY as shown below.
- Do NOT add extra text, explanations, or markdown symbols.
- Every item MUST start with "- ".
- Each task must be specific, technical, and actionable (not generic).
- Each week must have exactly 6 to 8 tasks.
- RISKS must have exactly 6 risks, labeled as "Technical risk:" or "Product risk:".

FORMAT:

WEEK 1:
- Define project scope, user roles, and core feature list
- Design PostgreSQL schema for [relevant entities based on goal]
- Set up monorepo structure with frontend and backend separation
- Configure authentication flow using JWT or session-based auth
- Initialize ORM (Prisma or Sequelize) and connect to PostgreSQL
- Define REST API contract and document all endpoints
- Set up CI/CD pipeline and environment variables

WEEK 2:
- Implement user registration, login, and role-based access control
- Build [primary feature 1 based on goal] API and database layer
- Build [primary feature 2 based on goal] API and database layer
- Develop responsive frontend UI for core user flows
- Integrate file upload handling (if applicable)
- Write unit tests for authentication and core APIs
- Implement error handling and input validation across all endpoints

WEEK 3:
- Add [secondary feature based on goal] with API and UI integration
- Integrate AI or third-party service (if applicable)
- Implement push or in-app notifications
- Add pagination, filtering, and search functionality
- Improve UI/UX based on initial feedback
- Add logging and monitoring setup
- Write integration tests for complete user flows

WEEK 4:
- Conduct full end-to-end testing across all user roles
- Perform load testing and optimize slow database queries
- Add database indexing and query caching where needed
- Deploy backend to production (Railway, Render, or AWS)
- Deploy frontend to production (Vercel or Netlify)
- Write user documentation and API reference
- Plan post-launch maintenance and version update strategy

RISKS:
- Technical risk: [specific database or backend risk]
- Technical risk: [specific auth or security risk]
- Technical risk: [specific third-party or AI integration risk]
- Technical risk: [specific performance or scalability risk]
- Product risk: [specific user adoption or UX risk]
- Product risk: [specific scope or timeline risk]

PROJECT CONTEXT:
Goal: ${goal}
Users: ${users}
Constraints: ${constraints || "None"}
Application Type: ${template || "web"}

Now generate the plan. Replace all bracketed placeholders with specifics from the project context above.
`;
}


function parseResponse(text) {
  const tasks = [];

  const sections = [
    { key: "WEEK 1:", type: "week1" },
    { key: "WEEK 2:", type: "week2" },
    { key: "WEEK 3:", type: "week3" },
    { key: "WEEK 4:", type: "week4" },
    { key: "RISKS:", type: "risk" },
  ];

  const raw = (text || "").replace(/\r/g, "").trim();

  for (let i = 0; i < sections.length; i++) {
    const { key, type } = sections[i];
    const idx = raw.toUpperCase().indexOf(key.toUpperCase());
    if (idx === -1) continue;

    let block = raw.slice(idx + key.length).trim();

    for (let j = i + 1; j < sections.length; j++) {
      const nextKey = sections[j].key;
      const nextIdx = block.toUpperCase().indexOf(nextKey.toUpperCase());
      if (nextIdx !== -1) {
        block = block.slice(0, nextIdx).trim();
        break;
      }
    }

    const lines = block
      .split("\n")
      .filter((line) => /^\s*-\s+/.test(line.trim()));

    lines.forEach((line) => {
      const title = line.replace(/^\s*-\s*/, "").trim();
      if (title) {
        tasks.push({
          title,
          type,
          order: tasks.length,
        });
      }
    });
  }

  return tasks;
}


function createFallbackTasks(specId) {
  return [
    { title: "Setup project and define scope", type: "week1", order: 0, specId },
    { title: "Implement core features", type: "week2", order: 1, specId },
    { title: "Enhance features and UX", type: "week3", order: 2, specId },
    { title: "Test and deploy application", type: "week4", order: 3, specId },
    { title: "Identify risks and bottlenecks", type: "risk", order: 4, specId },
  ];
}

/* ===========================
   GET ALL SPECS
=========================== */
router.get("/specs", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 20);

    // const specs = await prisma.spec.findMany({
    const specs = await withRetry(() =>
      prisma.spec.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      }));
    res.json(specs);
  } catch (err) {
    console.error("[Specs] GET /specs failed:", err.message);
    res.status(500).json({ error: "Failed to fetch specs" });
  }
});

/* ===========================
   GET RECENT SPECS
=========================== */
router.get("/specs/recent", async (req, res) => {
  try {
    // const specs = await prisma.spec.findMany({
    const specs = await withRetry(() =>
      prisma.spec.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }));

    res.json(specs);
  } catch (err) {
    console.error("[Specs] GET /specs/recent failed:", err.message);
    res.status(500).json({ error: "Failed to fetch specs" });
  }
});

/* ===========================
   GET SINGLE SPEC
=========================== */
router.get("/spec/:id", async (req, res) => {
  try {
    // const spec = await prisma.spec.findUnique({
    const spec = await withRetry(() =>
      prisma.spec.findUnique({
        where: { id: req.params.id },
        include: { tasks: { orderBy: { order: "asc" } } },
      }));

    if (!spec) {
      return res.status(404).json({ error: "Spec not found" });
    }

    res.json(spec);
  } catch (err) {
    console.error("[Specs] GET /spec/:id failed:", err.message);
    res.status(500).json({ error: "Failed to fetch spec" });
  }
});

/* ===========================
   GENERATE SPEC
=========================== */
router.post("/generate", async (req, res) => {
  const goal = req.body?.goal?.trim();
  const users = req.body?.users?.trim();
  const constraints = (req.body?.constraints || "").trim();
  const template = (req.body?.template || "web").trim();

  if (!goal || !users) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["goal", "users"],
    });
  }

  let spec;

  try {
    // spec = await prisma.spec.create({
    spec = await withRetry(() =>
      prisma.spec.create({
        data: {
          goal,
          users,
          constraints,
          templateType: template,
        },
      }));
  } catch (err) {
    console.error("[Generate] DB create failed:", err.message);
    return res.status(500).json({ error: "Spec creation failed" });
  }

  const prompt = buildPrompt(goal, users, constraints, template);

  try {
    const raw = await generateWithLLM(prompt);
    const parsed = parseResponse(raw);


    // await prisma.task.createMany({
    await withRetry(() =>
      prisma.task.createMany({
        data:
          parsed.length > 0
            ? parsed.map((t) => ({
              title: t.title,
              type: t.type,
              order: t.order,
              specId: spec.id,
            }))
            : createFallbackTasks(spec.id),
      }));


    return res.json({ id: spec.id });


  } catch (err) {
    console.error("[Generate] LLM failed:", err.message);


    await prisma.task.createMany({
      data: createFallbackTasks(spec.id),
    });


    return res.status(503).json({
      error: "Generation failed",
    });
  }
});



/* ===========================
   GET PROGRESS
=========================== */
router.get("/progress/:specId", async (req, res) => {
  try {
    const progress = await withRetry(() =>
      prisma.progress.findMany({
        where: { specId: req.params.specId },
      })
    );

    res.json(progress);
  } catch (err) {
    console.error("[Progress] fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});


/* ===========================
   SAVE PROGRESS
=========================== */
router.post("/progress", async (req, res) => {
  const { specId, taskId, completed } = req.body;

  if (!specId || !taskId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await withRetry(() =>
      prisma.progress.upsert({
        where: {
          specId_taskId: { specId, taskId },
        },
        update: { completed },
        create: { specId, taskId, completed },
      })
    );

    res.json({ success: true });
  } catch (err) {
    console.error("[Progress] save failed:", err.message);
    res.status(500).json({ error: "Failed to save progress" });
  }
});
/* ===========================
   DELETE SPEC
=========================== */
router.delete("/spec/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // delete tasks first (due to relation)
    await withRetry(() =>
      prisma.task.deleteMany({
        where: { specId: id },
      })
    );

    // delete progress (if exists)
    await withRetry(() =>
      prisma.progress.deleteMany({
        where: { specId: id },
      })
    );

    // delete spec
    await withRetry(() =>
      prisma.spec.delete({
        where: { id },
      })
    );

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;