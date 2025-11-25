import express from "express";
import { createTrade, getAllTrades } from "../controllers/tradeController.js";

const router = express.Router();

// CREATE trade
router.post("/", createTrade);

// GET all trades
router.get("/", getAllTrades);

export default router;