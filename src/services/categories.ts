import { db } from "@/lib/db";

export async function getCategories() {
  const categories = await db.categoryGroup.findMany({
    select: {
      id: true,
      name: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return categories;
}
