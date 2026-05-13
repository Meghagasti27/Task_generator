// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// module.exports = prisma;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* ===========================
   CONNECT WITH RETRY
=========================== */
async function connectWithRetry(retries = 10, delay = 3000) {
    for (let i = 1; i <= retries; i++) {
        try {
            await prisma.$connect();
            console.log("✅ Database connected");
            return;
        } catch (err) {
            console.log(`❌ DB connection failed (attempt ${i})`);

            if (i === retries) {
                console.error("🔥 DB failed after retries");
                throw err;
            }

            console.log("⏳ Waiting before retry...");
            await new Promise((res) => setTimeout(res, delay));
        }
    }
}

/* ===========================
   QUERY RETRY WRAPPER
=========================== */
async function withRetry(operation, retries = 3) {
    for (let i = 1; i <= retries; i++) {
        try {
            return await operation();
        } catch (err) {
            const retryable =
                err.code === "P1001" || // can't reach DB
                err.code === "P1017";

            if (!retryable || i === retries) {
                throw err;
            }

            console.log(`🔁 Retrying DB query (attempt ${i})...`);
            await new Promise((res) => setTimeout(res, 2000));
        }
    }
}

module.exports = { prisma, connectWithRetry, withRetry };