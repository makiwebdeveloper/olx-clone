import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function getPerPage() {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== Role.ADMIN) {
      throw new Error("Unauthorized");
    }

    const pagination = await db.pagination.findUnique({
      where: { id: "1" },
    });

    return pagination?.perPage;
  } catch (error) {
    console.log(error);
  }
}
