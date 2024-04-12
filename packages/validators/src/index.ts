import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
export const createBookSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1),
  imageLink: z.string().url(),
  status: z.enum(["active", "disabled", "archived"]).nullable(),
  price: z.coerce.number().min(1),
  author: z.string(),
  genre: z.string(),
  amount: z.coerce.number().positive(),
});
export const deleteBookSchema = z.object({
  id: z.number().min(1),
});
export const updateBookSchema = createBookSchema.extend({
  id: z.number().min(1),
});
export const updateBookStatusSchema = z.object({
  id: z.number(),
  status: z.enum(["active", "disabled", "archived"]),
});
export const createReviewSchema = z.object({
  content: z.string().min(1),
  rating: z.number().min(1),
  bookId: z.number(),
});
export const deleteReviewSchema = z.object({
  id: z.number().min(1),
});
export const updateReviewSchema = createBookSchema.extend({
  id: z.number().min(1),
  createdById: z.string().min(1),
});

export const createOrderSchema = z.object({
  deliveryType: z.enum(["avito", "pr", "self"]),
  deliveryAddress: z.object({ lat: z.number(), lng: z.number() }),
  books: z.array(
    z.object({
      bookId: z.number().positive(),
      bookQuantity: z.number().positive(),
    }),
  ),
});
