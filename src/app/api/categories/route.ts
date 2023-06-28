import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { name, categoryGroupId } = await req.json();

  const category = await db.category.create({
    data: {
      name,
      categoryGroupId,
    },
  });

  return new Response(JSON.stringify(category));
}

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
