import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getFavorites() {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const favorites = await db.favoritePost.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return favorites;
}

export async function getFavoriteById(postId: string) {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const favorite = await db.favoritePost.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
  });

  return favorite;
}
