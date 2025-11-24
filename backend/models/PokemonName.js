import mongoose from "mongoose";

const PokemonNameSchema = new mongoose.Schema({
  id: Number,
  name: String,
  sprites: {
    front_default: String,
    dream_world_front: String,
    official_artwork_front: String,
  },
});

PokemonNameSchema.index({ id: 1 });
PokemonNameSchema.index({ name: 1 });
const PokemonName = mongoose.model(
  "PokemonName",
  PokemonNameSchema,
  "pokemonNames"
);

export default PokemonName;
