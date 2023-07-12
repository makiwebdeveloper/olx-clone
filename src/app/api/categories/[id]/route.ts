import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      return new Response("Forbidden", { status: 403 });
    }

    await db.category.delete({
      where: {
        id: params.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Failed to delete category group. Please try later", {
      status: 500,
    });
  }
}
