import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getCurrentUser() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return user;
}

export async function getUserByUsername(username: string) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}
