// models/gameProfile.js
import mongoose from "mongoose";

const gameProfileSchema = new mongoose.Schema({
  gameUserId: { type: String, required: true },
  game: { type: String, required: true },
  name: { type: String, required: true },
  homeState: { type: String, required: true },
  username: { type: String, required: true },
  country: { type: String, required: true },
  dob: { type: String, required: true },
  status: { type: String, required: true, trim: true },
  team: { type: String, required: true, trim: true },
  role: { type: String, required: true },
  // Add more fields as needed for game profile details
});

const GameProfile = mongoose.model('GameProfile', gameProfileSchema);

export default GameProfile;
