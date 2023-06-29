import Search from "@/components/Search";
import { CategoryGroup } from "@/types/categories";
import axios from "axios";

interface Props {
  searchParams: {
    searchValue?: string;
    categoryId?: string;
    priceFrom?: string;
    priceTo?: string;
  };
}

export const revalidate = 60;

export default async function Home({ searchParams }: Props) {
  const { data: categories } = await axios.get<CategoryGroup[]>(
    `${process.env.APP_URL}/api/categories`
  );

  return (
    <main className="p-6 sm:p-0">
      <Search categories={categories} />
    </main>
  );
}
