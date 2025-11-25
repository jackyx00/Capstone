import PokemonName from "../models/PokemonName.js";
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("tradeHistory");

    const tradeList = await Promise.all(
      user.tradeHistory.map(async (trade) => {
        const offer = await PokemonName.findOne({ name: trade.offerPokemon });
        const receive = await PokemonName.findOne({
          name: trade.receivePokemon,
        });

        return {
          ...trade.toObject(),
          offerSprite: offer?.sprites?.front_default || null,
          receiveSprite: receive?.sprites?.front_default || null,
        };
      })
    );

    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      pokecoins: user.pokecoins ?? 0,
      tradeHistory: tradeList,
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to load profile" });
  }
};
