"use client";

import Icons from "@/components/Icons";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Favorite } from "@/types/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
  initialFavorites: Favorite[] | null;
  withText?: boolean;
  className?: string;
}

export default function ToggleFavoriteButton({
  className,
  postId,
  withText,
  initialFavorites,
}: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data: favorites } = useQuery(
    ["favorites"],
    async () => {
      const { data: favorites } = await axios.get<Favorite[]>(
        "/api/posts/favorites"
      );

      return favorites;
    },
    {
      initialData: initialFavorites,
      enabled: session ? true : false,
    }
  );

  const { mutate: toggleFavorite, isLoading } = useMutation(
    async (postId: string) => {
      await axios.post("/api/posts/favorites", {
        postId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favorites"]);
      },
    }
  );

  const favorite = favorites?.find((fav) => fav.post.id === postId);

  return (
    <Button
      disabled={isLoading}
      className={cn(
        "h-fit w-fit p-2 2xl:p-2 bg-zinc-300 hover:bg-zinc-400 gap-1",
        favorite && "bg-pink-300 sm:hover:bg-pink-400",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(postId);
      }}
    >
      <Icons.heart className="w-5 h-5 2xl:w-7 2xl:h-7" />{" "}
      {withText
        ? `${favorite ? "Delete from favorite" : "Add to favorite"}`
        : null}
    </Button>
  );
}
