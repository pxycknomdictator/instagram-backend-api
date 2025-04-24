import { z } from "zod";

const registerBody = z.object({
  username: z
    .string({ message: "username is required" })
    .trim()
    .nonempty({ message: "username contain at least 3 characters" })
    .min(3, { message: "username contain at least 3 characters" }),

  name: z
    .string({ message: "name is required" })
    .nonempty({ message: "name contain at least 3 characters" })
    .min(3, { message: "name contain at least 3 characters" }),

  email: z
    .string({ message: "email is required" })
    .trim()
    .toLowerCase()
    .nonempty()
    .email({ message: "Invalid Email Address" }),

  password: z
    .string({ message: "password is required" })
    .nonempty({ message: "password contain at least 8 characters" })
    .min(8, { message: "password contain at least 8 characters" }),
});

type RegisterBody = z.infer<typeof registerBody>;

export { registerBody, RegisterBody };
