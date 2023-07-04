import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getFavorites() {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const favoritesData = await db.favoritePost.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      post: true,
    },
  });

  const favorites = favoritesData.map((fav) => fav.post);
  return favorites;
}
