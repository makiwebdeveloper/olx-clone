import { db } from "@/lib/db";
import { IFilters, PostsSortEnum } from "@/types/filters";
import { postsPerPage } from "@/utils";
import { Prisma } from "@prisma/client";

export async function getPosts({
  searchValue,
  categoryId,
  priceFrom,
  priceTo,
  currency,
  sortType,
  userId,
  page,
}: IFilters & { userId?: string }) {
  // SORT
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

  // Search Filter
  const prismaSearchFilter: Prisma.PostWhereInput = {
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
  };

  // PAGINATION
  const perPage = postsPerPage;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * perPage;

  const posts = await db.post.findMany({
    where: prismaSearchFilter,
    orderBy: prismaSort,
    skip,
    take: perPage,
  });

  return {
    posts,
    length: await db.post.count({
      where: prismaSearchFilter,
    }),
  };
}

export async function getPostById(id: string) {
  return db.post.findUnique({
    where: {
      id,
    },
  });
}
