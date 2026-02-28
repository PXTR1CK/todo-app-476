async function register(req, res) {
  // TODO for Milestone 3: insert user, hash password, unique email check
  res.status(501).json({ message: "register not implemented yet" });
}

async function login(req, res) {
  // TODO for Milestone 3: verify password, create session/JWT
  res.status(501).json({ message: "login not implemented yet" });
}

async function logout(req, res) {
  // TODO for Milestone 3: destroy session / clear token
  res.status(501).json({ message: "logout not implemented yet" });
}

module.exports = { register, login, logout };