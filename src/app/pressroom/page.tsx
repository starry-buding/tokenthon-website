"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { useNewsData } from "@/api/news";
import { Skeleton } from "@/components/ui/skeleton";

export default function PressroomPage() {
  const router = useRouter();
  const { data: pressItems, isLoading: isLoading } = useNewsData();
  console.log("pressItems", pressItems);
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
        <header className="border-b border-slate-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand/75">
            Media Center
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Pressroom
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Latest Tokenthon announcements, media notes, and milestone updates.
            For interview requests or speaking opportunities, contact our media
            team directly.
          </p>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5"
                >
                  <Skeleton className="h-36 w-full rounded-xl" />
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-5 w-11/12" />
                    <Skeleton className="h-5 w-9/12" />
                  </div>
                  <Skeleton className="mt-3 h-4 w-24" />
                </article>
              ))
            : pressItems?.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 cursor-pointer"
                  onClick={() => {
                    router.push(`/newsDetails?id=${item.id}`);
                  }}
                >
                  <div className="relative h-36 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold leading-snug text-slate-900 line-clamp-3">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold uppercase text-gray-400">
                    {item.publishTime}
                  </p>
                </article>
              ))}
        </section>
      </main>
    </div>
  );
}
