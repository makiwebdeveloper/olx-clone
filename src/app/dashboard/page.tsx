import { getCategories } from "@/services/categories";
import {
  EditCategories,
  EditCategoryGroups,
  EditPagination,
  GiveRole,
} from "./components";

export default async function Dashboard() {
  const categories = await getCategories();

  return (
    <main className="space-y-6">
      <section className="bg-white sm:shadow-sm p-6 2xl:p-10 sm:rounded-lg">
        <h1 className="text-4xl 2xl:text-6xl font-bold">Admin dashboard</h1>
        <p className="text-slate-400 mb-4 mt-2">
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
