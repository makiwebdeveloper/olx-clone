"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { CategoryGroup } from "@/types/categories";
import { useCallback } from "react";

interface Props {
  categories: CategoryGroup[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectCategoryGroups({
  value,
  onChange,
  categories,
}: Props) {
  const getGroupNameById = useCallback(
    (id: string) => {
      for (const obj of categories) {
        if (obj.id === id) {
          return obj.name;
        }
      }
      return null;
    },
    [categories]
  );

  return (
    <Select value={value} onValueChange={(value: string) => onChange(value)}>
      <SelectTrigger className=" hover:bg-white">
        <SelectValue>
          {value.length > 0 ? (
            getGroupNameById(value)
          ) : (
            <p className="text-gray-400 2xl:text-xl">Select category group</p>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((group) => (
            <SelectItem value={group.id} key={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
