const pool = require("../db/pool");

const ALLOWED_STATUS = ["Pending", "In Progress", "Completed"];
const ALLOWED_PRIORITY = ["Low", "Medium", "High"];

function isValidDate(value) {
  if (!value) return false;
  return !Number.isNaN(Date.parse(value));
}

function validateTaskInput(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || !body.title.trim()) {
      errors.push("Title is required.");
    }
  }

  if (!isUpdate || body.due_date !== undefined) {
    if (!body.due_date || !isValidDate(body.due_date)) {
      errors.push("A valid due date is required.");
    }
  }

  if (body.status !== undefined && !ALLOWED_STATUS.includes(body.status)) {
    errors.push("Status must be Pending, In Progress, or Completed.");
  }

  if (body.priority !== undefined && !ALLOWED_PRIORITY.includes(body.priority)) {
    errors.push("Priority must be Low, Medium, or High.");
  }

  return errors;
}

async function listTasks(req, res) {
  try {
    const userId = Number(req.headers["x-user-id"]);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const [rows] = await pool.query(
      `SELECT task_id, user_id, title, description, status, priority, due_date, created_at, updated_at
       FROM Tasks
       WHERE user_id = ?
       ORDER BY due_date ASC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("listTasks error:", err);
    res.status(500).json({ message: "Server error while loading tasks." });
  }
}

async function getTask(req, res) {
  try {
    const userId = Number(req.headers["x-user-id"]);
    const taskId = Number(req.params.id);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const [rows] = await pool.query(
      `SELECT task_id, user_id, title, description, status, priority, due_date, created_at, updated_at
       FROM Tasks
       WHERE task_id = ? AND user_id = ?`,
      [taskId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("getTask error:", err);
    res.status(500).json({ message: "Server error while loading task." });
  }
}

async function createTask(req, res) {
  try {
    const userId = Number(req.headers["x-user-id"]);
    const { title, description, status, priority, due_date } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const errors = validateTaskInput(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed.", errors });
    }

    const [result] = await pool.query(
      `INSERT INTO Tasks (user_id, title, description, status, priority, due_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, title.trim(), description || null, status || "Pending", priority || "Medium", due_date]
    );

    res.status(201).json({
      message: "Task created successfully.",
      task_id: result.insertId,
    });
  } catch (err) {
    console.error("createTask error:", err);
    res.status(500).json({ message: "Server error while creating task." });
  }
}

async function updateTask(req, res) {
  try {
    const userId = Number(req.headers["x-user-id"]);
    const taskId = Number(req.params.id);
    const { title, description, status, priority, due_date } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const errors = validateTaskInput(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed.", errors });
    }

    const [existing] = await pool.query(
      `SELECT task_id FROM Tasks WHERE task_id = ? AND user_id = ?`,
      [taskId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    await pool.query(
      `UPDATE Tasks
       SET title = ?, description = ?, status = ?, priority = ?, due_date = ?
       WHERE task_id = ? AND user_id = ?`,
      [title.trim(), description || null, status, priority, due_date, taskId, userId]
    );

    res.json({ message: "Task updated successfully." });
  } catch (err) {
    console.error("updateTask error:", err);
    res.status(500).json({ message: "Server error while updating task." });
  }
}

async function deleteTask(req, res) {
  try {
    const userId = Number(req.headers["x-user-id"]);
    const taskId = Number(req.params.id);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const [result] = await pool.query(
      `DELETE FROM Tasks WHERE task_id = ? AND user_id = ?`,
      [taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json({ message: "Task deleted successfully." });
  } catch (err) {
    console.error("deleteTask error:", err);
    res.status(500).json({ message: "Server error while deleting task." });
  }
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};