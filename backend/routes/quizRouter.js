import express from "express";
import { getQuizQuestion, updateCoins } from "../controllers/quizController.js";

const router = express.Router();

// GET quiz question info
router.get("/", getQuizQuestion);

// POST update pokecoins
router.post("/updateCoins", updateCoins);

export default router;
