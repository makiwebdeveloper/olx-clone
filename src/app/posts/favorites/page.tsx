import { getFavorites } from "@/services/favorites";
import FavoritePosts from "./components/FavoritePosts";
import { getPerPage } from "@/services/pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | Olx Clone",
  description: "In this page you can see your favorites page",
};

interface Props {
  searchParams: { page: string };
}

export default async function Favorites({ searchParams }: Props) {
  const favoritesFetchData = await getFavorites(Number(searchParams.page) || 1);
  const perPageFetchData = getPerPage();

  const [favoritesData, perPageData] = await Promise.all([
    favoritesFetchData,
    perPageFetchData,
  ]);

  const perPage = perPageData || 1;

  return (
    <main className="p-6 sm:p-0">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="title">Favorite posts</h1>
        <p className="description mt-2">Here you can see your favorite posts</p>
      </div>
      <FavoritePosts
        initialFavorites={favoritesData}
        currentPage={Number(searchParams.page) || 1}
        perPage={perPage}
      />
    </main>
  );
}
