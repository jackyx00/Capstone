import express from "express";
import PokemonName from "../models/PokemonName.js";
import User from "../models/User.js";

const router = express.Router();

// GET user trade history by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("tradeHistory");

    const tradesWithSprites = await Promise.all(
      user.tradeHistory.map(async (trade) => {
        const offerPoke = await PokemonName.findOne({
          name: trade.offerPokemon,
        });
        const receivePoke = await PokemonName.findOne({
          name: trade.receivePokemon,
        });

        return {
          ...trade.toObject(),
          offerSprite: offerPoke?.sprites?.front_default || null,
          receiveSprite: receivePoke?.sprites?.front_default || null,
        };
      })
    );

    const userData = {
      _id: user._id,
      email: user.email,
      username: user.username,
      pokecoins: user.pokecoins ?? 0,
      tradeHistory: tradesWithSprites,
    };

    res.json(userData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

export default router;
