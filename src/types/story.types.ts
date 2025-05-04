import { Schema, Document } from "mongoose";

interface StorySchema extends Document {
  _id: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  storyUrl: string;
  storyPublicId: string;
  storyType: string;
  viewCount: number;
  viewBy: Schema.Types.ObjectId[];
  captain?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export { StorySchema };
