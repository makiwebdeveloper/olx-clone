import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FavoriteSelect } from "@/services/favorites";
import { getPerPage } from "@/services/pagination";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");

    // PAGINATION
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

      return new Response(JSON.stringify({ favorites, length }));
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

      return new Response(JSON.stringify({ favorites, length }));
    }
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
