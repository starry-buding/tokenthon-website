"use client";
import { useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { useCurrentActivityId } from "@/api/activities";
import { Suspense } from "react";

function DetailsContent() {
  const searchParams = useSearchParams();
  const activityId = Number(searchParams.get("id"));
  const { data: currentActivity, isLoading: isCurrentLoading } =
    useCurrentActivityId(activityId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      {isCurrentLoading ? (
        <div className="text-slate-700">Loading...</div>
      ) : (
        <div
          className="text-slate-700 leading-7"
          dangerouslySetInnerHTML={{ __html: currentActivity ?? "" }}
        />
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
