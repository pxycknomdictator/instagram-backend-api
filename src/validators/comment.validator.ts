import { z } from "zod";

const commentSchema = z.object({
  comment: z.string({ message: "Comment is required" }),
});

type CommentSchema = z.infer<typeof commentSchema>;

export { commentSchema, CommentSchema };
