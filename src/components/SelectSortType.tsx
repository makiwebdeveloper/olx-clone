"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { PostsSortEnum } from "@/types/search";
import { postsSortTypes } from "@/utils";

interface Props {
  value: string;
  onChange: (value: PostsSortEnum) => void;
}

export default function SelectSortType({ onChange, value }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value: PostsSortEnum) => onChange(value)}
    >
      <SelectTrigger className="bg-white">
        <SelectValue>
          {postsSortTypes.find((item) => item.value === value)?.title ||
            "Select sort type"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {postsSortTypes.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
