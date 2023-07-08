"use client";

import { Post } from "@prisma/client";
import PostItem from "./PostItem";
import { Favorite } from "@/types/favorites";

interface Props {
  posts: Post[];
  initialFavorites: Favorite[] | null;
  isAuth: boolean;
}

export default function Posts({ posts, initialFavorites, isAuth }: Props) {
  if (posts.length === 0) {
    return (
      <div className="flex justify-center p-12">
        <h3 className="text-2xl 2xl:text-4xl font-bold">No posts...</h3>
      </div>
    );
  }
  return (
    <div className="my-4">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem
            post={post}
            key={post.id}
            initialFavorites={initialFavorites}
            isAuth={isAuth}
          />
        ))}
      </div>
    </div>
  );
}
