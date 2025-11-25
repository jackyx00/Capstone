import OngoingTrade from "../models/OngoingTrade.js";
import User from "../models/User.js";

export const createTrade = async (req, res) => {
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
    res.status(500).json({ error: "Trade creation failed" });
  }
};

export const getAllTrades = async (req, res) => {
  try {
    const trades = await OngoingTrade.find().sort({ createdAt: -1 });
    res.json(trades);
  } catch (e) {
    res.status(500).json({ error: "Failed to load trades" });
  }
};
