import { Schema, Document } from "mongoose";

interface CommentSchema extends Document {
  _id: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export { CommentSchema };
