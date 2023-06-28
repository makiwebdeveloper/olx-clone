"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

interface Props {
  categories: CategoryGroup[];
  field: any;
}

export default function SelectCategory({ categories, field }: Props) {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const getCategoryNameById = useCallback((id: string) => {
    for (const obj of categories) {
      for (const item of obj.categories) {
        if (item.id === id) {
          return item.name;
        }
      }
    }
    return null;
  }, []);

  useEffect(() => {
    field.onChange(categoryId);
  }, [categoryId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {categoryId ? getCategoryNameById(categoryId) : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                      setCategoryId(
                        currentCategoryId === categoryId
                          ? ""
                          : currentCategoryId
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        categoryId === category.id ? "opacity-100" : "opacity-0"
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
