import Link from "next/link";
import Icons from "./Icons";
import { buttonVariants } from "./ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-zinc-100 border-b border-zinc-300 h-fit z-[10]">
      <div className="container h-full py-2 2xl:py-3 flex items-center justify-between">
        <Link href="/">
          <Icons.logo className="w-[80px] 2xl:w-[110px]" />
        </Link>
        <Link href="/auth" className={buttonVariants()}>
          Sign in
        </Link>
      </div>
    </nav>
  );
}
