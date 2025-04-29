import { Schema, model } from "mongoose";
import { GenderType, UserSchema } from "../types/user.types.js";

const userSchema = new Schema<UserSchema>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    avatar: { type: String, default: "", required: false },
    bio: { type: String, minlength: 20, required: false },
    gender: { type: String, enum: Object.values(GenderType), required: false },
    website: { type: String, required: false },
    refreshToken: { type: String, required: false, select: false },
    imagePublicId: { type: String, required: false },
    avatarType: { type: String, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export const User = model<UserSchema>("User", userSchema);
