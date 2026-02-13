const Groq = require("groq-sdk");


async function generateWithLLM(prompt) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY not set");
  }


  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });


  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
  });


  return completion.choices[0].message.content;
}


module.exports = { generateWithLLM };
