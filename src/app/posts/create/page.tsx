import axios from "axios";
import CreatePostForm from "./components/CreatePostForm";
import { CategoryGroup } from "@/types/categories";

export const revalidate = 60;

export default async function CreatePost() {
  const { data: categories } = await axios.get<CategoryGroup[]>(
    `${process.env.APP_URL}/api/categories`
  );

  return (
    <section className="bg-white shadow-sm p-6 2xl:p-10 rounded-lg">
      <h1 className="text-4xl 2xl:text-6xl font-bold">Create post</h1>
      <p className="text-slate-400 mb-4 mt-2">
        Easily sell your products and services by creating a post on our Olx
        Clone app.
      </p>
      <CreatePostForm categories={categories} />
    </section>
  );
}
