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
