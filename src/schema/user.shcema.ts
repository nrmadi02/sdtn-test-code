import { TypeOf, z } from "zod";

export const userNewSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Email is invalid"),
  password: z.string().min(1, "Password is required!"),
  name: z.string().min(1, "Name is required!"),
  bio: z.string().min(1, "Biodata is required!"),
  avatar: z.string().min(1, "Avatar is required!"),
  roleId: z.string().min(1, "Role is required!"),
});

export const userEditSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Email is invalid"),
  id: z.string().min(1, "ID User is required!"),
  name: z.string().min(1, "Name is required!"),
  bio: z.string().min(1, "Biodata is required!"),
  avatar: z.string().min(1, "Avatar is required!"),
  roleId: z.string().min(1, "Role is required!"),
});

export type UserNewSchema = TypeOf<typeof userNewSchema>;
export type UserEditSchema = TypeOf<typeof userEditSchema>;
