const express = require("express");
const prisma = require("../lib/prisma");
const { generateWithLLM } = require("../services/llm");

const router = express.Router();

/* ===========================
   STRICT PROMPT BUILDER
=========================== */
function buildPrompt(goal, users, constraints, template) {
  return `
You are a senior software architect.

Generate a STRICTLY STRUCTURED development plan.

Follow this format EXACTLY.
Do NOT add extra text.
Do NOT add explanations.
Do NOT use markdown symbols.
Do NOT change section names.
Each item MUST start with "- ".

FORMAT:

USER STORIES:
- As a <role>, I want <feature>, so that <benefit>.
- Minimum 3 items.

ENGINEERING TASKS:
- Action-oriented implementation task.
- Minimum 6 items.

RISKS:
- Potential technical or product risk.
- Minimum 3 items.

CONTEXT:
Goal: ${goal}
Users: ${users}
Constraints: ${constraints || "None"}
Application Type: ${template || "web"}
`;
}

/* ===========================
   RESPONSE PARSER
=========================== */
function parseResponse(text) {
  const tasks = [];
  const sections = [
    { key: "USER STORIES:", type: "story" },
    { key: "ENGINEERING TASKS:", type: "engineering" },
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
      if (title) tasks.push({ title, type, order: tasks.length });
    });
  }

  return tasks;
}

function createFallbackTasks(specId) {
  return [
    { title: "Define user stories", type: "story", order: 0, specId },
    { title: "Implement core features", type: "engineering", order: 1, specId },
    { title: "Review risks", type: "risk", order: 2, specId },
  ];
}

/* ===========================
   GET ALL SPECS
=========================== */
router.get("/specs", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 20);

    const specs = await prisma.spec.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

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
    const specs = await prisma.spec.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

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
    const spec = await prisma.spec.findUnique({
      where: { id: req.params.id },
      include: { tasks: { orderBy: { order: "asc" } } },
    });

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
    spec = await prisma.spec.create({
      data: {
        goal,
        users,
        constraints,
        templateType: template,
      },
    });
  } catch (err) {
    console.error("[Generate] DB create failed:", err.message);
    return res.status(500).json({ error: "Spec creation failed" });
  }

  const prompt = buildPrompt(goal, users, constraints, template);

  try {
    const raw = await generateWithLLM(prompt);
    const parsed = parseResponse(raw);


    await prisma.task.createMany({
      data:
        parsed.length > 0
          ? parsed.map((t) => ({
              title: t.title,
              type: t.type,
              order: t.order,
              specId: spec.id,
            }))
          : createFallbackTasks(spec.id),
    });


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

module.exports = router;
