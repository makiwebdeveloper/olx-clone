import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify({ user }));
  } catch (error) {
    return new Response("Failed to get user. Please try later", {
      status: 500,
    });
  }
}
