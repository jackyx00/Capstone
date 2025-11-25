import express from "express";
import { getUserProfile } from "../controllers/profileController.js";

const router = express.Router();

// GET user trade history by id
router.get("/:id", getUserProfile);

export default router;
