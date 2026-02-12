// const express = require("express");
// const router = express.Router();

// router.get("/specs/recent",(req,res)=>{
//     res.json({message:"recent specs route working "});
// });

// router.get("/spec/:id",(req,res)=>{
//     res.json({message:"single spec route working"});
// });

// module.exports = router;

const express = require("express");
// const { PrismaClient } = require("@prisma/client");

const router = express.Router();
// const prisma = new PrismaClient();
const prisma = require("../lib/prisma");
// GET last 5 specs
router.get("/specs/recent", async (req, res) => {
  try {
    const specs = await prisma.spec.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    });

    res.json(specs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recent specs" });
  }
});

// GET single spec with tasks
router.get("/spec/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const spec = await prisma.spec.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!spec) {
      return res.status(404).json({ error: "Spec not found" });
    }

    res.json(spec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch spec" });
  }
});

module.exports = router;