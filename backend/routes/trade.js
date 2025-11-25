import express from "express";
import OngoingTrade from "../models/OngoingTrade.js";
import User from "../models/User.js";

const router = express.Router();

// CREATE trade
router.post("/", async (req, res) => {
  try {
    const { offerPokemon, receivePokemon, userId } = req.body;

    const trade = await OngoingTrade.create({
      offerPokemon,
      receivePokemon,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { tradeHistory: trade._id },
    });

    res.json(trade);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Trade creation failed" });
  }
});

// GET all trades
router.get("/", async (req, res) => {
  try {
    const trades = await OngoingTrade.find().sort({ createdAt: -1 });
    res.json(trades);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load trades" });
  }
});

export default router;
