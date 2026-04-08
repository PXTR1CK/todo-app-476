const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const tasksRoutes = require("./routes/tasks");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "TaskFlow backend running" });
});

app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});