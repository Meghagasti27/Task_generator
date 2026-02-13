// import axios from "axios";

// export async function generateWithLLM(prompt) {
//   const response = await axios.post(
//     "http://localhost:11434/api/generate",
//     {
//       model: "llama3",
//       prompt: prompt,
//       stream: false,
//     }
//   );

//   return response.data.response;
// }
const axios = require("axios");
const Groq = require("groq-sdk");

const USE_GROQ = process.env.USE_GROQ === "true";

async function generateWithOllama(prompt) {
  const res = await axios.post(
    "http://127.0.0.1:11434/api/generate",
    {
      model: "llama3:latest",
      prompt,
      stream: false,
    },
    { timeout: 120000 }
  );

  return res.data.response;
}

async function generateWithGroq(prompt) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama3-8b-8192",
  });

  return completion.choices[0].message.content;
}

async function generateWithLLM(prompt) {
  if (USE_GROQ) {
    return generateWithGroq(prompt);
  }
  return generateWithOllama(prompt);
}

module.exports = { generateWithLLM };