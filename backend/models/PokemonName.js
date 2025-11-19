import mongoose from "mongoose";

const PokemonNameSchema = new mongoose.Schema({
    id: Number,
    name: String
});

PokemonNameSchema.index({ id: 1 });
PokemonNameSchema.index({ name: 1 });
const PokemonName = mongoose.model("PokemonName", PokemonNameSchema, "pokemonNames")

export default PokemonName;