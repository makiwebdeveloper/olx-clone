import { z } from "zod";

export const ProfileValidator = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .optional(),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .optional(),
  phone: z
    .string()
    .min(10, {
      message: "Phone must be at least 10 characters long",
    })
    .optional(),
  image: z.string().optional(),
});

export type ProfileValidatorType = z.infer<typeof ProfileValidator>;
