"use client";

import { DOTS, usePagination } from "@/hooks/usePagination";
import Button from "./ui/Button";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

import Icons from "./Icons";

interface Props {
  dataLength: number;
  currentPage: number;
  className?: string;
  perPage: number;
}

export default function Pagination({
  dataLength,
  currentPage,
  className,
  perPage,
}: Props) {
  const [screenSize, setScreenSize] = useState({
    width: 640,
    height: 0,
  });
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const paginationRange = usePagination({
    currentPage,
    dataLength,
    perPage,
    siblingCount: screenSize.width >= 640 ? 2 : 1,
  });

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  function onChange(page: number) {
    let params = new URLSearchParams(window.location.search);
    params.set("page", String(page));
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const next = () => {
    if (currentPage !== lastPage) {
      onChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage !== 1) {
      onChange(currentPage - 1);
    }
  };

  return (
    <ul className={cn("flex gap-1 items-center", className)}>
      <li>
        <Button
          onClick={prev}
          disabled={currentPage === 1}
          className="w-8 h-8 p-2 sm:w-12 sm:h-10 sm:p-4 2xl:px-0"
        >
          <Icons.stepBack />
        </Button>
      </li>
      {paginationRange.map((pageNumber, index) => (
        <li key={index}>
          {pageNumber === DOTS ? (
            <div className="w-3 h-10 center">&#8230;</div>
          ) : (
            <Button
              variant={pageNumber === currentPage ? "default" : "ghost"}
              key={pageNumber}
              onClick={() => onChange(+pageNumber)}
              className="w-8 h-8 sm:w-12 sm:h-10 text-xs sm:text-base"
            >
              {pageNumber}
            </Button>
          )}
        </li>
      ))}
      <li>
        <Button
          onClick={next}
          disabled={currentPage === lastPage}
          className="w-8 h-8 p-2 sm:w-12 sm:h-10 sm:p-4 2xl:px-0"
        >
          <Icons.stepForward />
        </Button>
      </li>
    </ul>
  );
}
