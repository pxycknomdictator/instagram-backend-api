import { Schema, Document } from "mongoose";

interface PostSchema extends Document {
  _id: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  postUrl: string;
  postPublicId: string;
  postType: string;
  private: boolean;
  title?: string;
  description?: string;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export { PostSchema };
