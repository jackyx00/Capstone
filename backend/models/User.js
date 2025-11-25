import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", UserSchema, "users")

export default User;