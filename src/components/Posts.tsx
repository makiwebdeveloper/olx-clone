"use client";

import { Post } from "@prisma/client";
import PostItem from "./PostItem";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  posts: Post[];
  initialFavorites: Post[] | null;
  isAuth: boolean;
}

export default function Posts({ posts, initialFavorites, isAuth }: Props) {
  const { data: session } = useSession();

  const { data: favorites } = useQuery(
    ["favorites"],
    async () => {
      const { data: favorites } = await axios.get<Post[]>(
        "/api/posts/favorites"
      );
      return favorites;
    },
    {
      initialData: initialFavorites,
      enabled: session ? true : false,
    }
  );

  return (
    <div className="my-4">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem
            post={post}
            key={post.id}
            isFavorite={
              favorites ? favorites.some((fav) => fav.id === post.id) : false
            }
            isAuth={isAuth}
          />
        ))}
      </div>
    </div>
  );
}
