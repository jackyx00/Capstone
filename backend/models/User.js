import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  pokecoins: { type: Number, default: 0 },
  tradeHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "OngoingTrade" }],
});

const User = mongoose.model("User", UserSchema, "users");

export default User;
