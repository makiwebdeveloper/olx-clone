"use client";

import { FavoritePost, Post } from "@prisma/client";
import PostItem from "./PostItem";

interface Props {
  posts: Post[];
  initialFavorites: FavoritePost[] | null;
  isAuth: boolean;
}

export default function Posts({ posts, initialFavorites, isAuth }: Props) {
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
