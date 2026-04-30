"use client";
import { useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { useCurrentNewsId } from "@/api/news";
import { Suspense } from "react";

function DetailsContent() {
  const searchParams = useSearchParams();
  const newsId = Number(searchParams.get("id"));
  const { data: currentNews, isLoading: isCurrentLoading } =
    useCurrentNewsId(newsId);
  console.log("currentNews", currentNews);

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      {isCurrentLoading ? (
        <div className="text-slate-700">Loading...</div>
      ) : !currentNews ? (
        <div className="text-slate-700">未找到该新闻或链接无效。</div>
      ) : (
        <>
          {currentNews.title && (
            <div className="text-4xl text-brand font-bold mb-10">
              {currentNews.title}
            </div>
          )}

          {/* {currentNews.description && (
            <div className="text-lg text-brand font-bold mb-8">
              {currentNews.description}
            </div>
          )} */}

          <div
            className="text-slate-700 leading-7"
            dangerouslySetInnerHTML={{ __html: currentNews.content ?? "" }}
          />
        </>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <Suspense
        fallback={
          <main className="mx-auto max-w-3xl px-6 py-14">
            <div className="text-slate-700">Loading...</div>
          </main>
        }
      >
        <DetailsContent />
      </Suspense>
    </div>
  );
}
