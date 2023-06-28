import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { name } = await req.json();

  const categoryGroup = await db.categoryGroup.create({
    data: {
      name,
    },
  });

  return new Response(JSON.stringify(categoryGroup));
}
