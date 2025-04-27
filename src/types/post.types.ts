import { Schema, Document } from "mongoose";

enum PostType {
  video = "video",
  image = "image",
}

interface PostSchema extends Document {
  _id: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  postType: PostType;
  postUrl: string;
  private: boolean;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export { PostSchema, PostType };
