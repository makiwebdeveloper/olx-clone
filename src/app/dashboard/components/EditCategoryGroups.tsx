"use client";

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

export default function EditCategoryGroups({ initialCategories }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");

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

  const { mutate: createGroup } = useMutation(
    async () => {
      await axios.post("/api/categories/group", {
        name: groupName,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        setGroupName("");
        toast({
          title: "Success",
          description: "Successfully created category group",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to create category group",
          description: "Something went wrong. Please try later",
          variant: "destructive",
        });
      },
    }
  );

  const { mutate: deleteGroup } = useMutation(
    async () => {
      await axios.delete(`/api/categories/group/${selectedGroupId}`);
    },
    {
      onSuccess: () => {
        setSelectedGroupId("");
        queryClient.invalidateQueries(["categories"]);
        toast({
          title: "Success",
          description: "Successfully deleted category group",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to delete category group",
          description: "Something went wrong. Please try later",
          variant: "destructive",
        });
      },
    }
  );

  return (
    <section className="bg-white sm:shadow-sm p-6 2xl:p-10 sm:rounded-lg space-y-3">
      <h3 className="text-xl 2xl:text-2xl font-semibold">
        Edit category groups
      </h3>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label htmlFor="groupName">Create category group</Label>
          <Input
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Job"
          />
        </div>
        <Button disabled={!groupName} onClick={() => createGroup()}>
          Create
        </Button>
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label htmlFor="groupName">Delete category group</Label>
          <SelectCategoryGroups
            value={selectedGroupId}
            onChange={(v: string) => setSelectedGroupId(v)}
            categories={categories}
          />
        </div>
        <Button
          variant="destructive"
          disabled={!selectedGroupId}
          onClick={() => deleteGroup()}
        >
          Delete
        </Button>
      </div>
    </section>
  );
}
