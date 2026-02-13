require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

/* Debug: ensure routes load from same directory as server.js (Windows-safe) */
const routesDir = path.join(__dirname, "routes");
console.log("[DEBUG] Routes directory:", routesDir);

const specRouter = require(path.join(routesDir, "spec"));
console.log("[DEBUG] spec route module loaded, type:", typeof specRouter);

const statusRouter = require(path.join(routesDir, "status"));
console.log("[DEBUG] status route module loaded");

app.use("/api", specRouter);
app.use("/api", statusRouter);
console.log("[DEBUG] Mounted /api -> spec and /api -> status");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log("[DEBUG] GET http://localhost:" + PORT + "/api/specs available");
});
