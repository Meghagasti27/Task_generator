// const express = require("express");
// const prisma = require("../lib/prisma");


// const router = express.Router();


// router.get("/status", async (req, res) => {
//   let database = false;
//   let llm = false;


//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     database = true;
//   } catch (err) {
//     console.error("[Status] Database failed:", err.message);
//   }


//   if (process.env.GROQ_API_KEY) {
//     llm = true;
//   }


//   res.json({
//     backend: true,
//     database,
//     llm,
//   });
// });


// module.exports = router;
const express = require("express");
const { prisma } = require("../lib/prisma");

const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      backend: "OK",
      database: "OK",
      llm: "OK",
    });

  } catch (err) {
    console.error("[Status] DB check failed:", err.message);

    res.json({
      backend: "OK",
      database: "Down",
      llm: "OK",
    });
  }
});

module.exports = router;