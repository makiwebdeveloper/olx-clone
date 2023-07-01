import Search from "@/components/Search";
import { getCategories } from "../services/categories";
import { getPosts } from "../services/posts";
import { IFilters } from "@/types/filters";

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
      <div className="space-y-2">
        {posts.map((post) => (
          <div className="bg-white p-2">
            {post.title} {post.price}
            {post.currency}
          </div>
        ))}
      </div>
    </main>
  );
}
