import Search from "@/components/Search";
import { getCategories } from "../services/categories";
import { getPosts } from "../services/posts";
import { IFilters } from "@/types/filters";
import Posts from "@/components/Posts";
import Pagination from "@/components/Pagination";
import { getFavorites } from "@/services/favorites";
import { getAuthSession } from "@/lib/auth";
import { getPerPage } from "@/services/pagination";

interface Props {
  searchParams: IFilters;
}

export const revalidate = 60;

export default async function Home({ searchParams }: Props) {
  const session = await getAuthSession();
  const categories = await getCategories();

  const { posts, length: postsLength } = await getPosts(searchParams);
  const favoritesData = await getFavorites();
  const perPage = (await getPerPage()) || 1;

  return (
    <main className="p-6 sm:p-0">
      <Search categories={categories} />
      <Posts
        posts={posts}
        initialFavorites={favoritesData?.favorites || null}
        isAuth={!!session?.user}
      />
      <Pagination
        currentPage={Number(searchParams.page) || 1}
        dataLength={postsLength}
        className="center"
        perPage={perPage}
      />
    </main>
  );
}
