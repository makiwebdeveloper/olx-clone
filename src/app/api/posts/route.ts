import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, price, currency, categoryId, images } =
      PostValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const post = await db.post.create({
      data: {
        title,
        description,
        price,
        currency,
        categoryId,
        images,
        userId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Failed to create post. Please try later", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("searchValue");
  const categoryId = searchParams.get("categoryId");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
}
