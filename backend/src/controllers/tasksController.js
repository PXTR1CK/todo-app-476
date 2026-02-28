const pool = require("../db/pool");

async function listTasks(req, res) {
  try {
    // Temporary hardcoding user_id=1 until auth exists
    const userId = 1;

    const [rows] = await pool.query(
      "SELECT task_id, title, status, priority, due_date FROM Tasks WHERE user_id = ? ORDER BY due_date ASC",
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTask(req, res) {
  res.status(501).json({ message: "getTask not implemented yet" });
}

async function createTask(req, res) {
  res.status(501).json({ message: "createTask not implemented yet" });
}

async function updateTask(req, res) {
  res.status(501).json({ message: "updateTask not implemented yet" });
}

async function deleteTask(req, res) {
  res.status(501).json({ message: "deleteTask not implemented yet" });
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };