import Icons from "@/components/Icons";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import UserAvatar from "@/components/UserAvatar";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { getFavorites } from "@/services/favorites";
import { getPerPage } from "@/services/pagination";
import { getPosts } from "@/services/posts";
import { getUserByUsername } from "@/services/users";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
  searchParams: {
    page: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params;

  return {
    title: `${username} | Olx Clone`,
  };
}

export const revalidate = 60;

export default async function Profile({ params, searchParams }: Props) {
  const userFetchData = getUserByUsername(params.username);
  const sessionFetchData = getAuthSession();
  const favoritesFetchData = getFavorites();
  const perPageFetchData = getPerPage();

  const [user, session, favoritesData, perPageData] = await Promise.all([
    userFetchData,
    sessionFetchData,
    favoritesFetchData,
    perPageFetchData,
  ]);

  const perPage = perPageData || 1;

  const { posts, length: postsLength } = await getPosts({
    userId: user?.id,
    searchValue: "",
    categoryId: "",
    priceFrom: "",
    priceTo: "",
    sortType: "",
    currency: "",
    page: searchParams.page,
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="p-6 sm:p-0">
      <section className="bg-white rounded-lg p-6 shadow-sm flex justify-between">
        <div className="flex gap-6">
          <UserAvatar user={user} className="w-24 h-24 2xl:w-32 2xl:h-32" />
          <div>
            <p className="font-semibold text-2xl 2xl:text-4xl">{user.name}</p>
            <p className="2xl:text-md">
              email: <span className="text-slate-400">{user.email}</span>
            </p>
            <p className="2xl:text-md ">
              username: <span className="text-slate-400">{user.username}</span>
            </p>
            {user.phone && (
              <p className="2xl:text-md ">
                phone: <span className="text-slate-400">{user.phone}</span>
              </p>
            )}
          </div>
        </div>
        {user.id === session?.user.id && (
          <Link
            href="/settings"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-fit h-fit p-2 sm:px-3 gap-2"
            )}
          >
            <Icons.settings className="w-5 h-5" />
            <span className="hidden sm:block">Edit profile</span>
          </Link>
        )}
      </section>
      <Posts
        posts={posts}
        initialFavorites={favoritesData?.favorites || null}
        isAuth={!!session?.user}
      />
      <Pagination
        currentPage={Number(searchParams.page) || 1}
        dataLength={postsLength}
        className="center"
        perPage={perPage}
      />
    </main>
  );
}
