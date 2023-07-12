import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function GET() {
  const categories = await db.categoryGroup.findMany({
    select: {
      id: true,
      name: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(categories));
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      return new Response("Forbidden", { status: 403 });
    }

    const { name, categoryGroupId } = await req.json();

    const category = await db.category.create({
      data: {
        name,
        categoryGroupId,
      },
    });

    return new Response(JSON.stringify(category));
  } catch (error) {
    return new Response("Failed to create category. Please try later", {
      status: 500,
    });
  }
}
