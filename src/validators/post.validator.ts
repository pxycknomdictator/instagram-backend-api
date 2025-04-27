import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { PostType } from "../types/post.types.js";

const postSchema = z.object({
  createdBy: z.string().refine((id) => isValidObjectId(id), {
    message: "Invalid user id",
  }),
  title: z.string().optional(),
  description: z.string().optional(),
  postType: z.enum([PostType.image, PostType.video]),
  postUrl: z.string({ message: "post url is required" }).trim(),
  private: z.boolean().optional(),
});

type PostSchema = z.infer<typeof postSchema>;

export { postSchema, PostSchema };
