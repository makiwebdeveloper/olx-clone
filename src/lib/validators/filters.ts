import { PostsSortEnum } from "@/types/filters";
import { z } from "zod";

export const FiltersValidator = z.object({
  searchValue: z.string().optional(),
  categoryId: z.string().optional(),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  currency: z.enum(["UAH", "USD", "EUR"]).optional(),
  sortType: z.enum(["high-price", "low-price", "newest", "oldest"]).optional(),
});

export type FiltersValidatorType = z.infer<typeof FiltersValidator>;
