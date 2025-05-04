import { z } from "zod";

const storySchema = z
  .object({
    caption: z.string().optional(),
  })
  .optional();

type StorySchema = z.infer<typeof storySchema>;

export { storySchema, StorySchema };
