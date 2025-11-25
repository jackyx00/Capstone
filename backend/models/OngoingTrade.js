import mongoose from "mongoose";

const OngoingTradeSchema = new mongoose.Schema({
  offerPokemon: { type: String, required: true },
  receivePokemon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const OngoingTrade = mongoose.model(
  "OngoingTrade",
  OngoingTradeSchema,
  "ongoingTrades"
);

export default OngoingTrade;
