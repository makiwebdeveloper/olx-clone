"use client";

import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import Icons from "./Icons";
import { signOut } from "next-auth/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "email" | "image">;
}

export default function UserAccountNav({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
          className="h-10 w-10 2xl:h-14 2xl:w-14"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (
              <p className="font-medium 2xl:text-xl">{user.name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm 2xl:text-md text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer flex items-center gap-2"
        >
          <Link href="/create-post">
            <Icons.creaePost className="w-5 h-5" /> Create post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer flex items-center gap-2"
        >
          <Link href="/favorites">
            <Icons.heart className="w-5 h-5" /> Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer flex items-center gap-2"
        >
          <Link href="/profile">
            <Icons.user className="w-5 h-5" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer flex items-center gap-2"
        >
          <Link href="/settings">
            <Icons.settings className="w-5 h-5" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2"
          onSelect={(e) => {
            signOut({
              callbackUrl: `/auth`,
            });
          }}
        >
          <Icons.logout className="w-5 h-5" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
