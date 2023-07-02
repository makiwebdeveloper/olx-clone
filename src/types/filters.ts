import { Currency } from "@prisma/client";

export enum PostsSortEnum {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}

export interface IFilters {
  searchValue: string;
  categoryId: string;
  priceFrom: string;
  priceTo: string;
  sortType: PostsSortEnum | "";
  currency: Currency | "";
  page: string;
}
