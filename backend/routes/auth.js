import express from "express";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists)
      return res.status(400).json({ error: "Email already used" });
    if (usernameExists)
      return res.status(400).json({ error: "Username already taken" });

    const newUser = await User.create({
      email,
      username,
      password,
      pokecoins: 0,
      tradeHistory: [],
    });

    res.json({ message: "Registration successful", user: newUser });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// LOGIN (email OR username)
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "Both fields required" });
    }

    // user can login with email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.json({ message: "Login successful", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Login error" });
  }
});

export default router;
