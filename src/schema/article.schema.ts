import { TypeOf, z } from "zod";

export const articleNewSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  categories: z.string().array().min(1, "Category is required!"),
  status: z.string().min(1, "Status is required!"),
  description: z.string().min(1, "Description is required!"),
  thumbnail: z.string().min(1, "Thumbnail is required!"),
  content: z.string().min(1, "Content is required!"),
});

export const articleEditSchema = z.object({
  id: z.string().min(1, "ID User is required!"),
  title: z.string().min(1, "Title is required!"),
  categories: z.string().array().min(1, "Category is required!"),
  status: z.string().min(1, "Status is required!"),
  description: z.string().min(1, "Description is required!"),
  thumbnail: z.string().min(1, "Thumbnail is required!"),
  content: z.string().min(1, "Content is required!"),
});

export type ArticleNewSchema = TypeOf<typeof articleNewSchema>;
export type ArticleEditSchema = TypeOf<typeof articleEditSchema>;
