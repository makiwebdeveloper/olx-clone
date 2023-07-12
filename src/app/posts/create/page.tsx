import { getCategories } from "@/services/categories";
import CreatePostForm from "@/components/CreatePostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create post | Olx Clone",
  description: "Page for creation new post in Olx Clone applocation",
};

export const revalidate = 3600;

export default async function CreatePost() {
  const categories = await getCategories();

  return (
    <main className="bg-white shadow-sm p-6 2xl:p-10 rounded-lg">
      <h1 className="text-4xl 2xl:text-6xl font-bold">Create post</h1>
      <p className="text-slate-400 mb-4 mt-2">
        Easily sell your products and services by creating a post on our Olx
        Clone app
      </p>
      <CreatePostForm categories={categories} />
    </main>
  );
}
