import Search from "@/components/Search";
import { getCategories } from "../services/categories";
import { getPosts } from "../services/posts";
import { IFilters } from "@/types/filters";
import Posts from "@/components/Posts";

interface Props {
  searchParams: IFilters;
}
export const revalidate = 60;

export default async function Home({ searchParams }: Props) {
  const categories = await getCategories();

  const posts = await getPosts(searchParams);

  return (
    <main className="p-6 sm:p-0">
      <Search categories={categories} />
      <Posts posts={posts} />
    </main>
  );
}
