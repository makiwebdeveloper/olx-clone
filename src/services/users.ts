import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getCurrentUser() {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return user;
}
