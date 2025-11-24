import express from "express";
import PokemonName from "../models/PokemonName.js";

const router = express.Router();

// query to search for pokemon in db using regex
router.get("/", async (req, res) => {
  const search = req.query.search?.toLowerCase() || "";

  const results = await PokemonName.find({
    name: { $regex: search, $options: "i" }
  })
    .sort({ id: 1 })
    .limit(10);

  res.json(results);
});

router.get("/by-name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const pokemon = await PokemonName.findOne({
      name: new RegExp("^" + name + "$", "i")
    });

    if (!pokemon) return res.status(404).json(null);

    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Pokémon" });
  }
});

export default router;