import PokemonName from "../models/PokemonName.js";

export const searchPokemon = async (req, res) => {
  const search = req.query.search?.toLowerCase() || "";

  const results = await PokemonName.find({
    name: { $regex: search, $options: "i" },
  })
    .sort({ id: 1 })
    .limit(10);

  res.json(results);
};

export const getPokemonByName = async (req, res) => {
  try {
    const name = req.params.name;
    const pokemon = await PokemonName.findOne({
      name: new RegExp("^" + name + "$", "i"),
    });

    if (!pokemon) return res.status(404).json(null);

    res.json(pokemon);
  } catch (e) {
    res.status(500).json({ error: "Error fetching Pokémon" });
  }
};
