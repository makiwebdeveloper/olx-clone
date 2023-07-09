import { getPostById } from "@/services/posts";
import { redirect } from "next/navigation";
import Carousel from "@/components/Carousel";
import UserAvatar from "@/components/UserAvatar";
import { buttonVariants } from "@/components/ui/Button";
import Icons from "@/components/Icons";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { getFavorites } from "@/services/favorites";
import ToggleFavoriteButton from "@/components/ToggleFavoriteButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params }: Props) {
  const post = await getPostById(params.id);

  if (!post) {
    redirect("/");
  }

  const favoritesData = await getFavorites();

  return (
    <main className="sm:space-y-6">
      <section className="space-y-4 sm:shadow-sm bg-white rounded-lg p-6">
        <Carousel items={post.images} />
        <div className="flex items-center justify-between">
          <h1 className="text-6xl font-bold break-words w-full">
            {post.title}
          </h1>
        </div>

        <div>
          <h3 className="text-slate-600 font-semibold">Price:</h3>
          <p className="text-2xl font-semibold">
            {post.price} {post.currency}
          </p>
        </div>
        <div>
          <h3 className="text-slate-600 font-semibold">Description:</h3>
          <p className="whitespace-pre text-slate-400">{post.description}</p>
        </div>
        <div>
          <h3 className="text-slate-600 font-semibold">Category:</h3>
          <p className="whitespace-pre text-slate-400">{post.category.name}</p>
        </div>
        <div>
          <h3 className="text-slate-600 font-semibold">Published on:</h3>
          <p className="whitespace-pre text-slate-400">
            {post.createdAt.toLocaleDateString()}
          </p>
        </div>
        <ToggleFavoriteButton
          postId={post.id}
          initialFavorites={favoritesData?.favorites || null}
          withText
        />
      </section>
      <section className="sm:shadow-sm bg-white rounded-lg p-6 space-y-6">
        <h3 className="text-slate-600 font-semibold">Contact seller</h3>
        <div className="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-between">
          <div className="flex gap-3">
            <UserAvatar user={post.user} className="w-16 h-16" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{post.user.username}</p>
              <p className="text-slate-400">{post.user.name}</p>
            </div>
          </div>
          <Link
            href={`/users/${post.user.id}`}
            className={cn(buttonVariants({ variant: "outline" }), "gap-1")}
          >
            <Icons.user className="w-4 h-4" /> Profile
          </Link>
        </div>
      </section>
    </main>
  );
}
