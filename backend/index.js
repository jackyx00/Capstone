import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
import runPokemonSetup from "./utils/pokemonSetup.js";
import pokemonRouter from "./routes/pokemonRouter.js";
import tradeRouter from "./routes/tradeRouter.js";
import quizRouter from "./routes/quizRouter.js";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to database and run setup in background
connectDB().then(() => {
  runPokemonSetup();
});

app.get("/", (req, res) => {
  res.json("Database Running...");
});

app.use("/pokemon", pokemonRouter);
app.use("/trade", tradeRouter);
app.use("/quiz", quizRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
