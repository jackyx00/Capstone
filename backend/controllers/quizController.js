import PokemonName from "../models/PokemonName.js";
import User from "../models/User.js";

export const getQuizQuestion = async (req, res) => {
  try {
    const count = await PokemonName.countDocuments();
    let correct = null;

    // Random correct Pokémon
    // Try up to 20 times to find a Pokémon with a Dream World sprite
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * count);
      const poke = await PokemonName.findOne().skip(randomIndex);
      if (poke?.sprites?.dream_world_front) {
        correct = poke;
        break;
      }
    }

    if (!correct) return res.status(404).json({ error: "No Pokémon found" });

    // Get 3 random incorrect Pokémon
    const wrong = await PokemonName.aggregate([
      { $match: { id: { $ne: correct.id } } },
      { $sample: { size: 3 } },
    ]);

    const choices = [correct.name, ...wrong.map((p) => p.name)].sort(
      () => Math.random() - 0.5
    ); // shuffle

    res.json({
      id: correct.id,
      name: correct.name,
      sprite: correct.sprites.dream_world_front,
      choices,
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch quiz question" });
  }
};

export const updateCoins = async (req, res) => {
  try {
    const { userId, pokecoins } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { pokecoins },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update coins" });
  }
};
