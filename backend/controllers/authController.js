import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({ error: "All fields required" });

    const emailExists = await User.findOne({ email });
    const userExists = await User.findOne({ username });

    if (emailExists)
      return res.status(400).json({ error: "Email already used" });
    if (userExists)
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
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // user can login with email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.password !== password)
      return res.status(400).json({ error: "Incorrect password" });

    res.json({ message: "Login successful", user });
  } catch (e) {
    res.status(500).json({ error: "Login error" });
  }
};
