import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FavoriteSelect } from "@/services/favorites";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const favorites = await db.favoritePost.findMany({
      where: {
        userId: session.user.id,
      },
      select: FavoriteSelect,
    });

    return new Response(JSON.stringify(favorites));
  } catch (error) {
    return new Response("Failed to get favorite posts. Please try later", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const favorites = await db.favoritePost.findMany({
      where: {
        postId,
        userId: session.user.id,
      },
      select: FavoriteSelect,
    });

    if (favorites.some((fav) => fav.post.id === postId)) {
      await db.favoritePost.deleteMany({
        where: {
          postId,
        },
      });
    } else {
      await db.favoritePost.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    return new Response("Failed to toggle favorite post. Please try later", {
      status: 500,
    });
  }
}
