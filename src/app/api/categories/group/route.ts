import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const categoryGroup = await db.categoryGroup.create({
      data: {
        name,
      },
    });

    return new Response(JSON.stringify(categoryGroup));
  } catch (error) {
    return new Response("Failed to create category group. Please try later", {
      status: 500,
    });
  }
}
