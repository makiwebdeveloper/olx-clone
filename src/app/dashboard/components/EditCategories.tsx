"use client";

import SelectCategory from "@/components/SelectCategory";
import SelectCategoryGroups from "@/components/SelectCategoryGroups";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/hooks/useToast";
import { CategoryGroup } from "@/types/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Props {
  initialCategories: CategoryGroup[];
}

export default function EditCategories({ initialCategories }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const { data: categories } = useQuery(
    ["categories"],
    async () => {
      const res = await axios.get<CategoryGroup[]>("/api/categories");
      return res.data;
    },
    {
      initialData: initialCategories,
    }
  );

  const { mutate: createCategory } = useMutation(
    async () => {
      await axios.post("/api/categories", {
        name: categoryName,
        categoryGroupId: selectedGroupId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        setCategoryName("");
        setSelectedGroupId("");
        toast({
          title: "Success",
          description: "Successfully created category",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to create category",
          description: "Something went wrong. Please try later",
          variant: "destructive",
        });
      },
    }
  );

  const { mutate: deleteCategory } = useMutation(
    async () => {
      await axios.delete(`/api/categories/${selectedCategoryId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        setSelectedCategoryId("");
        toast({
          title: "Success",
          description: "Successfully deleted category",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to delete category",
          description: "Something went wrong. Please try later",
          variant: "destructive",
        });
      },
    }
  );

  return (
    <section className="bg-white sm:shadow-sm p-6 2xl:p-10 sm:rounded-lg space-y-3">
      <h3 className="text-xl 2xl:text-2xl font-semibold">Edit category</h3>
      <div>
        <Label>Select category group for create new category</Label>
        <SelectCategoryGroups
          value={selectedGroupId}
          onChange={(v: string) => setSelectedGroupId(v)}
          categories={categories}
        />
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label>Create category</Label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Smartphones"
          />
        </div>
        <Button
          disabled={!selectedGroupId || !categoryName}
          onClick={() => createCategory()}
        >
          Create
        </Button>
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label>Delete category</Label>
          <SelectCategory
            value={selectedCategoryId}
            onChange={(v: string) => setSelectedCategoryId(v)}
            categories={categories}
          />
        </div>
        <Button
          disabled={!selectedCategoryId}
          variant="destructive"
          onClick={() => deleteCategory()}
        >
          Delete
        </Button>
      </div>
    </section>
  );
}
