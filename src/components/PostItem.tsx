"use client";

import { formatPrice } from "@/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ToggleFavoriteButton from "./ToggleFavoriteButton";
import { Favorite } from "@/types/favorites";

interface Props {
  post: Post;
  initialFavorites: Favorite[] | null;
  isAuth: boolean;
}

export default function PostItem({ post, initialFavorites, isAuth }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className={
        "flex flex-col sm:flex-row bg-white rounded-lg shadow-sm transition hover:shadow-md"
      }
    >
      <div className="relative sm:w-1/4 h-[150px]">
        <Image
          src={post.images[0]}
          alt={`${post.title} image`}
          fill
          className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-zinc-100"
        />
      </div>
      <div className="p-4 sm:p-2 flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between sm:w-3/4">
        <p className="font-medium text-xl break-words sm:w-4/5">{post.title}</p>
        <div className="flex sm:flex-col justify-between sm:w-1/5 items-end">
          <p className="font-semibold break-words">
            {formatPrice(post.price)} {post.currency}
          </p>
          {isAuth ? (
            <ToggleFavoriteButton
              postId={post.id}
              initialFavorites={initialFavorites}
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
}
