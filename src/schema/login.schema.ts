import { TypeOf, z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Email is invalid"),
  password: z.string().min(1, "Password is required!"),
});

export type LoginInput = TypeOf<typeof loginSchema>;