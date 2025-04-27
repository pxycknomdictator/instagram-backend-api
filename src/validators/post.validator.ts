import { z } from "zod";

const postSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    private: z.boolean().optional(),
  })
  .optional();

type PostSchema = z.infer<typeof postSchema>;

export { postSchema, PostSchema };
