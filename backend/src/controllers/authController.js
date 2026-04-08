const pool = require("../db/pool");
const bcrypt = require("bcrypt");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const [existing] = await pool.query(
      "SELECT user_id FROM Users WHERE email = ?",
      [email.trim()]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO Users (name, email, password_hash)
       VALUES (?, ?, ?)`,
      [name || null, email.trim(), passwordHash]
    );

    res.status(201).json({
      message: "Account created successfully.",
      user: {
        user_id: result.insertId,
        name: name || null,
        email: email.trim(),
      },
    });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const [rows] = await pool.query(
      `SELECT user_id, name, email, password_hash
       FROM Users
       WHERE email = ?`,
      [email.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      message: "Login successful.",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
}

async function logout(req, res) {
  try {
    // For Milestone 3 (no sessions/JWT), just respond success
    // Frontend handles clearing localStorage

    res.json({
      message: "Logout successful.",
    });
  } catch (err) {
    console.error("logout error:", err);
    res.status(500).json({ message: "Server error during logout." });
  }
}

module.exports = {
  register,
  login,
  logout,
};