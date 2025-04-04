import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export const signInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

export const profileSchema = z.object({
  userId: z.string(),
  name: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  bio: z.string().max(160).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});
