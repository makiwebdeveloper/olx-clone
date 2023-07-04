import Search from "@/components/Search";
import { getCategories } from "../services/categories";
import { getPosts } from "../services/posts";
import { IFilters } from "@/types/filters";
import Posts from "@/components/Posts";
import Pagination from "@/components/Pagination";
import { getFavorites } from "@/services/favorites";
import { getAuthSession } from "@/lib/auth";

interface Props {
  searchParams: IFilters;
}
export const revalidate = 60;

export default async function Home({ searchParams }: Props) {
  const session = await getAuthSession();
  const categories = await getCategories();

  const { posts, length: postsLength } = await getPosts(searchParams);
  const favorites = await getFavorites();

  return (
    <main className="p-6 sm:p-0">
      <Search categories={categories} />
      <Posts
        posts={posts}
        initialFavorites={favorites}
        isAuth={!!session?.user}
      />
      <Pagination
        currentPage={Number(searchParams.page) || 1}
        dataLength={postsLength}
        className="center"
      />
    </main>
  );
}
