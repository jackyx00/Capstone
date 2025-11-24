import axios from "axios";
import PokemonName from "../models/PokemonName.js";

// run setup once when web app launch
async function runPokemonSetup() {
    try {
        const count = await PokemonName.countDocuments();

        // If already has data, skip API fetch
        if (count > 0) {
            console.log("Redirecting...");
            return;
        }

        // Fetch all pokemon
        console.log("Fetching...")
        const apiRes = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
        const list = apiRes.data.results.map((p, index) => ({
            id: index + 1,
            name: p.name.charAt(0).toUpperCase() + p.name.slice(1)
        }));

        await PokemonName.insertMany(list);

        console.log("Stored Successfully");

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Pokémon setup failed" });
    }
};

export default runPokemonSetup;