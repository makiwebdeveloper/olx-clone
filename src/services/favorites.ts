import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Favorite, FavoritesData } from "@/types/favorites";
import { getPerPage } from "./pagination";

export const FavoriteSelect = {
  id: true,
  createdAt: true,
  post: true,
  user: true,
};

export async function getFavorites(
  page?: number
): Promise<FavoritesData | null> {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  if (page) {
    const perPage = (await getPerPage()) || 1;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * perPage;

    const favorites = await db.favoritePost.findMany({
      where: {
        userId: session.user.id,
      },
      select: FavoriteSelect,
      skip,
      take: perPage,
    });

    const length = await db.favoritePost.count({
      where: {
        userId: session.user.id,
      },
    });

    return { favorites, length };
  } else {
    const favorites = await db.favoritePost.findMany({
      where: {
        userId: session.user.id,
      },
      select: FavoriteSelect,
    });

    const length = await db.favoritePost.count({
      where: {
        userId: session.user.id,
      },
    });

    return { favorites, length };
  }
}

export async function getFavoriteById(
  postId: string
): Promise<Favorite | null> {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const favorite = await db.favoritePost.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
    select: FavoriteSelect,
  });

  return favorite;
}
