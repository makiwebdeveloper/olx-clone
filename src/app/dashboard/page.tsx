import { getCategories } from "@/services/categories";
import {
  EditCategories,
  EditCategoryGroups,
  EditPagination,
  GiveRole,
} from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Olx Clone",
  description: "In this page you can change data of Olx Clone application",
};

export default async function Dashboard() {
  const categories = await getCategories();

  return (
    <main className="space-y-6">
      <section className="bg-white sm:shadow-sm p-6 2xl:p-10 sm:rounded-lg">
        <h1 className="title">Admin dashboard</h1>
        <p className="description mb-4 mt-2">
          Here you can edit data of this application. For example you can
          create/delete category or give new role to someone
        </p>
      </section>
      <EditCategoryGroups initialCategories={categories} />
      <EditCategories initialCategories={categories} />
      <EditPagination />
      <GiveRole />
    </main>
  );
}
