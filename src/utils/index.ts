import { PostsSortEnum } from "@/types/filters";
import { Currency } from "@prisma/client";

export const currencies: Currency[] = ["UAH", "USD", "EUR"];

export const postsSortTypes: { title: string; value: PostsSortEnum }[] = [
  { title: "High price", value: PostsSortEnum.HIGH_PRICE },
  { title: "Low price", value: PostsSortEnum.LOW_PRICE },
  { title: "Newest", value: PostsSortEnum.NEWEST },
  { title: "Oldest", value: PostsSortEnum.OLDEST },
];
