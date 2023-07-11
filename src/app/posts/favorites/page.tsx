import { getFavorites } from "@/services/favorites";
import FavoritePosts from "./components/FavoritePosts";
import { getPerPage } from "@/services/pagination";

interface Props {
  searchParams: { page: string };
}

export default async function Favorites({ searchParams }: Props) {
  const favoritesData = await getFavorites(Number(searchParams.page) || 1);
  const perPage = (await getPerPage()) || 1;

  return (
    <main className="p-6 sm:p-0">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-4xl 2xl:text-6xl font-bold">Favorite posts</h1>
        <p className="text-slate-400 mt-2">
          Here you can see your favorite posts
        </p>
      </div>
      <FavoritePosts
        initialFavorites={favoritesData}
        currentPage={Number(searchParams.page) || 1}
        perPage={perPage}
      />
    </main>
  );
}
