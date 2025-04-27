import { Schema, model } from "mongoose";
import { PostSchema, PostType } from "../types/post.types.js";

const postSchema = new Schema<PostSchema>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postType: { type: String, enum: Object.keys(PostType), required: true },
    postUrl: { type: String, required: true, trim: true },
    private: { type: Boolean, required: false, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

export const Post = model<PostSchema>("Post", postSchema);
