import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileValidator } from "@/lib/validators/profile";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { email, name, username, phone, image } =
      ProfileValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isEmailCorrect = email === session.user.email;

    if (isEmailCorrect) {
      await db.user.update({
        where: {
          email,
        },
        data: {
          name,
          username,
          phone,
          image,
        },
      });

      return new Response("OK");
    } else {
      return new Response("Bad request", { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Failed to create post. Please try later", {
      status: 500,
    });
  }
}
