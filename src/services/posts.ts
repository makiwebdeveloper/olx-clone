import { db } from "@/lib/db";
import { IFilters, PostsSortEnum } from "@/types/filters";
import { Prisma } from "@prisma/client";

export async function getPosts({
  searchValue,
  categoryId,
  priceFrom,
  priceTo,
  currency,
  sortType,
  userId,
}: IFilters & { userId?: string }) {
  const prismaSort: Prisma.PostOrderByWithRelationInput[] = [];
  if (sortType) {
    if (sortType === PostsSortEnum.LOW_PRICE) prismaSort.push({ price: "asc" });
    else if (sortType === PostsSortEnum.HIGH_PRICE)
      prismaSort.push({ price: "desc" });
    else if (sortType === PostsSortEnum.OLDEST)
      prismaSort.push({ createdAt: "asc" });
    else if (sortType === PostsSortEnum.NEWEST)
      prismaSort.push({ createdAt: "desc" });
  }

  const posts = await db.post.findMany({
    where: {
      title:
        {
          contains: searchValue,
          mode: "insensitive",
        } || undefined,
      categoryId: categoryId || undefined,
      currency: currency || undefined,
      price: {
        gte: Number(priceFrom) || undefined,
        lte: Number(priceTo) || undefined,
      },
      userId,
    },
    orderBy: prismaSort,
  });

  return posts;
}

export async function getPostById(id: string) {
  return db.post.findUnique({
    where: {
      id,
    },
  });
}
