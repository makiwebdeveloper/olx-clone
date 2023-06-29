import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 characters long",
    })
    .max(30, {
      message: "Title must be less than 30 characters long",
    }),
  description: z.string().optional(),
  price: z.number().min(1, "Price must be at least more than 1"),
  currency: z.enum(["UAH", "USD", "EUR"]),
  categoryId: z.string().min(1, { message: "Select a category" }),
  images: z.array(z.string()).min(1, { message: "Upload at least 1 image" }),
});

export type PostValidatorType = z.infer<typeof PostValidator>;
