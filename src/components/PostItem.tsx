"use client";

import { formatPrice } from "@/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  post: Post;
  isFavorite: boolean;
  isAuth: boolean;
}

export default function PostItem({ post, isFavorite, isAuth }: Props) {
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite } = useMutation(
    async (postId: string) => {
      await axios.post("/api/posts/favorites", {
        postId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favorites"]);
      },
    }
  );

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
            <Button
              className={cn(
                "h-fit w-fit p-2 bg-zinc-300 hover:bg-pink-400",
                isFavorite && "bg-pink-300"
              )}
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(post.id);
              }}
            >
              <Heart className="w-5 h-5" />
            </Button>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
