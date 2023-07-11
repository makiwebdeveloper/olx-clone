"use client";

import { useState, useCallback, useEffect } from "react";

import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { CategoryGroup } from "@/types/categories";
import { ScrollArea } from "@/components/ui/ScrollArea";
import Icons from "./Icons";

interface Props {
  value: string;
  categories: CategoryGroup[];
  onChange: (value: string) => void;
}

export default function SelectCategory({ categories, onChange, value }: Props) {
  const [open, setOpen] = useState(false);

  const getCategoryNameById = useCallback(
    (id: string) => {
      for (const obj of categories) {
        for (const item of obj.categories) {
          if (item.id === id) {
            return item.name;
          }
        }
      }
      return null;
    },
    [categories]
  );

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal hover:bg-white"
        >
          {value.length > 0 ? (
            getCategoryNameById(value)
          ) : (
            <p className="text-gray-400 2xl:text-xl">Select category</p>
          )}
          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <ScrollArea className="h-80 w-full">
          <Command>
            <CommandEmpty>No categories found.</CommandEmpty>
            {categories.map((categoryGroup) => (
              <CommandGroup heading={categoryGroup.name} key={categoryGroup.id}>
                {categoryGroup.categories.map((category) => (
                  <CommandItem
                    value={category.id}
                    key={category.id}
                    onSelect={(currentCategoryId) => {
                      onChange(
                        currentCategoryId === value ? "" : currentCategoryId
                      );
                      setOpen(false);
                    }}
                  >
                    <Icons.check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
