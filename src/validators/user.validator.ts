import { z } from "zod";

const registerSchema = z.object({
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

const loginSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid Email Address" }),

  password: z
    .string({ message: "password is required" })
    .min(1, { message: "password contain at least 1 character" }),
});

const passwordsSchema = z.object({
  oldPassword: z.string({ message: "old password is required" }),
  newPassword: z.string({ message: "new password is required" }),
});

const resetPasswordSchema = z
  .object({
    password: z.string({ message: "Password is required" }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
    username: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const settingsSchema = z
  .object({
    website: z.string(),
    bio: z.string(),
    gender: z.string(),
  })
  .optional();

const forgotSchema = z.object({
  email: z.string({ message: "email is required" }),
});

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;
type PasswordSchema = z.infer<typeof passwordsSchema>;
type SettingsSchema = z.infer<typeof settingsSchema>;
type ForgotSchema = z.infer<typeof forgotSchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export {
  registerSchema,
  RegisterSchema,
  loginSchema,
  LoginSchema,
  passwordsSchema,
  PasswordSchema,
  settingsSchema,
  SettingsSchema,
  forgotSchema,
  ForgotSchema,
  resetPasswordSchema,
  ResetPasswordSchema,
};
