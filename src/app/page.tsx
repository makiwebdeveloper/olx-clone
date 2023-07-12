import Search from "@/components/Search";
import { getCategories } from "../services/categories";
import { getPosts } from "../services/posts";
import { IFilters } from "@/types/filters";
import Posts from "@/components/Posts";
import Pagination from "@/components/Pagination";
import { getFavorites } from "@/services/favorites";
import { getAuthSession } from "@/lib/auth";
import { getPerPage } from "@/services/pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Olx Clone",
  description:
    "The OLX marketplace is a platform for buying and selling services and goods such as electronics, fashion items, furniture, household goods, cars and bikes",
};

interface Props {
  searchParams: IFilters;
}

export const revalidate = 60;

export default async function Home({ searchParams }: Props) {
  const sessionFetchData = getAuthSession();
  const categoriesFetchData = getCategories();
  const postsFetchData = getPosts(searchParams);
  const favoritesFetchData = getFavorites();
  const perPageFetchData = getPerPage();

  const [session, categories, postsData, favoritesData, perPageData] =
    await Promise.all([
      sessionFetchData,
      categoriesFetchData,
      postsFetchData,
      favoritesFetchData,
      perPageFetchData,
    ]);

  const perPage = perPageData || 1;

  return (
    <main className="p-6 sm:p-0">
      <Search categories={categories} />
      <Posts
        posts={postsData.posts}
        initialFavorites={favoritesData?.favorites || null}
        isAuth={!!session?.user}
      />
      <Pagination
        currentPage={Number(searchParams.page) || 1}
        dataLength={postsData.length}
        className="center"
        perPage={perPage}
      />
    </main>
  );
}
