import { getFavorites } from "@/services/favorites";
import FavoritePosts from "./components/FavoritePosts";

export default async function Favorites() {
  const favorites = await getFavorites();

  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-4xl 2xl:text-6xl font-bold">Favorite posts</h1>
        <p className="text-slate-400 mt-2">
          Here you can see your favorite posts
        </p>
      </div>
      <FavoritePosts initialFavorites={favorites} />
    </main>
  );
}
