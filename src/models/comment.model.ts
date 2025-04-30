import { Schema, model } from "mongoose";
import { CommentSchema } from "../types/comment.types.js";

const commentSchema = new Schema<CommentSchema>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export const Comment = model<CommentSchema>("Comment", commentSchema);
