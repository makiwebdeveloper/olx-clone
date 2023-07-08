"use client";

import Posts from "@/components/Posts";
import { Favorite } from "@/types/favorites";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
  initialFavorites: Favorite[] | null;
}

export default function FavoritePosts({ initialFavorites }: Props) {
  const session = useSession();

  const { data: favorites } = useQuery(
    ["favorites"],
    async () => {
      const { data: favorites } = await axios.get<Favorite[]>(
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
    <Posts
      posts={favorites?.map((fav) => fav.post) || []}
      initialFavorites={favorites}
      isAuth={!!session}
    />
  );
}
