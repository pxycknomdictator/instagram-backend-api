import { Schema, model } from "mongoose";
import { PostSchema } from "../types/post.types.js";

const postSchema = new Schema<PostSchema>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postUrl: { type: String, required: true, trim: true },
    private: { type: Boolean, required: false, default: false },
    title: { type: String, required: false },
    postType: { type: String, required: false },
    postPublicId: { type: String, required: false },
    description: { type: String, required: false },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

export const Post = model<PostSchema>("Post", postSchema);
