import { z } from "zod";

const registerBody = z.object({
  username: z
    .string({ message: "username is required" })
    .trim()
    .min(3, { message: "username contain at least 3 characters" }),

  name: z
    .string({ message: "name is required" })
    .min(3, { message: "name contain at least 3 characters" }),

  email: z
    .string({ message: "email is required" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid Email Address" }),

  password: z
    .string({ message: "password is required" })
    .min(8, { message: "password contain at least 8 characters" }),
});

type RegisterBody = z.infer<typeof registerBody>;

export { registerBody, RegisterBody };
