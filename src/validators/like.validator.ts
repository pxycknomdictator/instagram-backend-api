import { z } from "zod";

const likeSchema = z.object({
  postId: z.string({ message: "post id is required" }),
});

type LikeSchema = z.infer<typeof likeSchema>;

export { likeSchema, LikeSchema };
