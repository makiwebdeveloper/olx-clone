import Search from "@/components/Search";
import { getCategories } from "../services/categories";
import { getPosts } from "../services/posts";
import { IFilters } from "@/types/filters";
import Posts from "@/components/Posts";
import Pagination from "@/components/Pagination";

interface Props {
  searchParams: IFilters;
}
export const revalidate = 60;

export default async function Home({ searchParams }: Props) {
  const categories = await getCategories();

  const { posts, length: postsLength } = await getPosts(searchParams);

  return (
    <main className="p-6 sm:p-0">
      <Search categories={categories} />
      <Posts posts={posts} />
      <Pagination
        currentPage={Number(searchParams.page) || 1}
        dataLength={postsLength}
        className="center"
      />
    </main>
  );
}
