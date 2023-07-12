import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      return new Response("Forbidden", { status: 403 });
    }

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
