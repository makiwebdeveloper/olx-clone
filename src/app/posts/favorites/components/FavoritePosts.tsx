"use client";

import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import { Favorite, FavoritesData } from "@/types/favorites";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  initialFavorites: FavoritesData | null;
  currentPage: number;
}

export default function FavoritePosts({
  initialFavorites,
  currentPage,
}: Props) {
  const session = useSession();
  const router = useRouter();

  const { data: favoritesData } = useQuery(
    [`favorites`, currentPage],
    async () => {
      const { data: favoritesData } = await axios.get<{
        favorites: Favorite[];
        length: number;
      }>(`/api/posts/favorites?page=${currentPage}`);

      return favoritesData;
    },
    {
      initialData: initialFavorites,
      enabled: session ? true : false,
    }
  );

  useEffect(() => {
    if (favoritesData?.favorites.length === 0) {
      router.push(
        `/posts/favorites?page=${currentPage > 1 ? currentPage - 1 : 1}`
      );
    }
  }, [favoritesData]);

  return (
    <div>
      <Posts
        posts={favoritesData?.favorites?.map((fav) => fav.post) || []}
        initialFavorites={favoritesData?.favorites || null}
        isAuth={!!session}
      />
      {favoritesData && (
        <Pagination
          className="center"
          currentPage={currentPage}
          dataLength={favoritesData.length}
        />
      )}
    </div>
  );
}
