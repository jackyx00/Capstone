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

export default router;