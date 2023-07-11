import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const pagination = await db.pagination.findUnique({
      where: { id: "1" },
    });

    return new Response(JSON.stringify(pagination?.perPage));
  } catch (error) {
    return new Response("Failed to get per page. Please try later", {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { perPage } = await req.json();

    const pagination = await db.pagination.update({
      where: { id: "1" },
      data: {
        perPage,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Failed to get per page. Please try later", {
      status: 500,
    });
  }
}
