"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { PostsSortEnum } from "@/types/filters";
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
      <SelectTrigger className="hover:bg-white">
        <SelectValue>
          {postsSortTypes.find((item) => item.value === value)?.title || (
            <p className="text-gray-400 2xl:text-xl">Select sort type</p>
          )}
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
