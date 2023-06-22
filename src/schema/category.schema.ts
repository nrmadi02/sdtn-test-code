import { TypeOf, z } from "zod";

export const categoryNewSchema = z.object({
  name: z.string().min(1, "Name is required!"),
});

export const categoryEditSchema = z.object({
  slug: z.string().min(1, "Slug is required!"),
  id: z.string().min(1, "ID User is required!"),
  name: z.string().min(1, "Name is required!"),
});

export type CategoryNewSchema = TypeOf<typeof categoryNewSchema>;
export type CategoryEditSchema = TypeOf<typeof categoryEditSchema>;
