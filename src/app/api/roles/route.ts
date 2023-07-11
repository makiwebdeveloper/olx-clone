import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { username } = await req.json();

    await db.user.update({
      where: {
        username,
      },
      data: {
        role: "ADMIN",
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Failed to change role. Please try later", {
      status: 500,
    });
  }
}
