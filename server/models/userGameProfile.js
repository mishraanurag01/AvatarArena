// models/userProfile.js
import mongoose from "mongoose";
import GameProfile from "./gameProfile.js";

const userGameProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: GameProfile }]
});

const UserGameProfile = mongoose.model('UserGameProfile', userGameProfileSchema);

export default UserGameProfile;
