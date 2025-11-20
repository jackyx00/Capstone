import express from "express";
import axios from "axios";
import PokemonName from "../models/PokemonName.js";

const router = express.Router();

// GET /setup
router.get("/setup", async (req, res) => {
    try {
        const count = await PokemonName.countDocuments();

        // If already has data, skip API fetch
        if (count > 0) {
            const data = await PokemonName.find().sort({ id: 1 });
            return res.json({ fromDB: true, data });
        }

        // Fetch all pokemon
        const apiRes = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
        const list = apiRes.data.results.map((p, index) => ({
            id: index + 1,
            name: p.name
        }));

        await PokemonName.insertMany(list);

        return res.json({ fromDB: false, data: list });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Pokémon setup failed" });
    }
});

export default router;