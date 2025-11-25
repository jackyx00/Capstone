import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
import runPokemonSetup from "./utils/pokemonSetup.js";
import pokemonRoute from "./routes/pokemon.js";
import tradeRoute from "./routes/trade.js";
import quizRoute from "./routes/quiz.js";
import authRoute from "./routes/auth.js";

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

app.use("/pokemon", pokemonRoute);
app.use("/trade", tradeRoute);
app.use("/quiz", quizRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
