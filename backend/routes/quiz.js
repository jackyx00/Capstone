import express from "express";
import PokemonName from "../models/PokemonName.js";

const router = express.Router();

// GET quiz question info
router.get("/", async (req, res) => {
  try {
    const count = await PokemonName.countDocuments();

    let correctPokemon = null;

    // Random correct Pokémon
    // Try up to 20 times to find a Pokémon with a Dream World sprite
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * count);
      const p = await PokemonName.findOne().skip(randomIndex);

      if (p && p.sprites?.dream_world_front) {
        correctPokemon = p;
        break;
      }
    }

    if (!correctPokemon) {
      return res.status(404).json({ error: "No Pokémon found" });
    }

    // Get 3 random incorrect Pokémon
    const wrongChoices = await PokemonName.aggregate([
      { $match: { id: { $ne: correctPokemon.id } } },
      { $sample: { size: 3 } },
    ]);

    const choices = [
      correctPokemon.name,
      ...wrongChoices.map((p) => p.name),
    ].sort(() => 0.5 - Math.random()); // shuffle

    res.json({
      id: correctPokemon.id,
      name: correctPokemon.name,
      sprite: correctPokemon.sprites.dream_world_front,
      choices,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch quiz question" });
  }
});

export default router;
