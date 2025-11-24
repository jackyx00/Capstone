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
    console.log("Fetching...");
    const apiRes = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10000"
    );
    const list = await Promise.all(
      apiRes.data.results.map(async (p) => {
        const details = await axios.get(p.url); // fetch per Pokémon

        return {
          id: details.data.id,
          name:
            details.data.name.charAt(0).toUpperCase() +
            details.data.name.slice(1),

          sprites: {
            front_default: details.data.sprites.front_default,
            dream_world_front:
              details.data.sprites.other?.dream_world?.front_default || null,
            official_artwork_front:
              details.data.sprites.other?.["official-artwork"]?.front_default ||
              null,
          },
        };
      })
    );

    await PokemonName.insertMany(list);

    console.log("Stored Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pokémon setup failed" });
  }
}

export default runPokemonSetup;
