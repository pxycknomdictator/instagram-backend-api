import { Schema, model } from "mongoose";
import { Gender, UserSchema } from "../types/user.types.js";

const userSchema = new Schema<UserSchema>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    avatar: { type: String, default: "", required: false },
    bio: { type: String, minlength: 20, required: false },
    gender: { type: String, enum: Object.values(Gender), required: false },
    website: { type: String, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true },
);

export const User = model<UserSchema>("User", userSchema);
