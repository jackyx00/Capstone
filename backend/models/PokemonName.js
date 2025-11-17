import mongoose from "mongoose";

const PokemonNameSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const PokemonName = mongoose.model("PokemonName", PokemonNameSchema, "pokemonNames")

export default PokemonName;