import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Favorite } from "@/types/favorites";

export const FavoriteSelect = {
  id: true,
  createdAt: true,
  post: true,
  user: true,
};

export async function getFavorites(): Promise<Favorite[] | null> {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const favorites = await db.favoritePost.findMany({
    where: {
      userId: session.user.id,
    },
    select: FavoriteSelect,
  });

  return favorites;
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
