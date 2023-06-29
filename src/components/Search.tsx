"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import { FilterX, Search as SearchIcon } from "lucide-react";
import SelectCategory from "./SelectCategory";
import { CategoryGroup } from "@/types/categories";
import { PostsSortEnum } from "@/types/search";
import SelectSortType from "./SelectSortType";
import SelectCurrency from "./SelectCurrency";
import { Currency } from "@prisma/client";
import { Label } from "./ui/Label";

interface IFilters {
  searchValue: string;
  categoryId: string;
  priceFrom: string;
  priceTo: string;
  sortType: PostsSortEnum | "";
  currency: Currency;
}

interface Props {
  categories: CategoryGroup[];
}

export default function Search({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<IFilters>({
    searchValue: "",
    categoryId: "",
    priceFrom: "",
    priceTo: "",
    sortType: "",
    currency: Currency.UAH,
  });

  const handleSearchParams = useCallback(() => {
    let params = new URLSearchParams(window.location.search);

    if (filters.priceTo.length > 0 && filters.priceFrom.length > 0) {
      if (Number(filters.priceFrom) > Number(filters.priceTo)) {
        alert('"Price from" should be less than "Price to"');
        return;
      }
    }

    for (const key in filters) {
      if (filters[key as keyof IFilters].length > 0) {
        params.set(key, filters[key as keyof IFilters]);
      } else {
        params.delete(key);
      }
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [pathname, router, filters]);

  const removeFilters = useCallback(() => {
    setFilters({
      searchValue: "",
      categoryId: "",
      priceFrom: "",
      priceTo: "",
      sortType: "",
      currency: Currency.UAH,
    });
  }, []);

  // Set Initial Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const searchValue = params.get("searchValue") ?? "";
    const categoryId = params.get("categoryId") ?? "";
    const sortType = (params.get("sortType") as PostsSortEnum) ?? "";
    const priceFrom = params.get("priceFrom") ?? "";
    const priceTo = params.get("priceTo") ?? "";
    const currency = (params.get("currency") as Currency) ?? Currency.UAH;

    setFilters({
      searchValue,
      categoryId,
      priceFrom,
      priceTo,
      sortType,
      currency,
    });
  }, []);

  return (
    <div className="space-y-2 ">
      <div className="flex items-end gap-2">
        <div className="w-full">
          <Label>Search</Label>
          <Input
            placeholder="e.g Iphone 14 pro"
            value={filters.searchValue}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchValue: e.target.value }))
            }
          />
        </div>
        <Button onClick={handleSearchParams} className="gap-1">
          <p className="hidden sm:block">Search</p>{" "}
          <SearchIcon className="w-5 h-5" />
        </Button>
        <Button variant="destructive" onClick={removeFilters}>
          <FilterX className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <Label htmlFor="category">Category</Label>
          <SelectCategory
            value={filters.categoryId}
            categories={categories}
            onChange={(value: string) =>
              setFilters((prev) => ({ ...prev, categoryId: value }))
            }
          />
        </div>
        <div className="w-full">
          <Label htmlFor="sort-type">Sort type</Label>
          <SelectSortType
            value={filters.sortType}
            onChange={(value: PostsSortEnum) =>
              setFilters((prev) => ({ ...prev, sortType: value }))
            }
          />
        </div>
      </div>
      <div className="flex sm:gap-2">
        <div className="w-full">
          <Label htmlFor="price-from">Price from</Label>
          <Input
            id="price-from"
            value={filters.priceFrom}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priceFrom: e.target.value }))
            }
            type="number"
            placeholder="Price from"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="price-to">Price to</Label>
          <Input
            id="price-to"
            value={filters.priceTo}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priceTo: e.target.value }))
            }
            type="number"
            placeholder="Price to"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="currency">Currency</Label>
          <SelectCurrency
            value={filters.currency}
            onChange={(value: Currency) =>
              setFilters((prev) => ({ ...prev, currency: value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
