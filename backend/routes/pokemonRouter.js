import express from "express";
import {
  searchPokemon,
  getPokemonByName,
} from "../controllers/pokemonController.js";

const router = express.Router();

// GET query to search for pokemon in db using regex
router.get("/", searchPokemon);

// GET pokemon by name
router.get("/by-name/:name", getPokemonByName);

export default router;
