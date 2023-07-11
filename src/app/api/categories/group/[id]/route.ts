import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.categoryGroup.delete({
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
