import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Olx Clone",
  description: "Olx clone application made with Next.js 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "text-zinc-800 bg-zinc-50 pt-16 2xl:pt-24 2xl:text-xl",
          inter.className
        )}
      >
        <Providers>
          <Navbar />
          <section className="container">{children}</section>
        </Providers>
      </body>
    </html>
  );
}
