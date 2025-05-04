import { Schema, model } from "mongoose";
import { StorySchema } from "../types/story.types.js";
import { ONE_DAY_IN_MS } from "../constant.js";

const storySchema = new Schema<StorySchema>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    storyUrl: { type: String, required: true },
    caption: { type: String, required: false },
    storyPublicId: { type: String, required: true },
    storyType: { type: String, required: true },
    viewCount: { type: Number, default: 0 },
    viewBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + ONE_DAY_IN_MS),
      index: { expires: 0 },
    },
  },
  { timestamps: true },
);

export const Story = model<StorySchema>("Story", storySchema);
