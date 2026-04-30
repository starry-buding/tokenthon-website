"use client";

import Image from "next/image";

import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { toast } from "sonner";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useCitysData } from "@/api/citys";
import { useActivityData } from "@/api/activities";
import type { CitysDataType } from "@/types/citys";
import type { ActivityItem, GuestType } from "@/types/activities";
import { formatEnglishMonthYear, parseDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { PastEventsCarousel } from "@/components/PastEventsCarousel";

const ALL_CITY_OPTION: CitysDataType = {
  id: 0,
  cityName: "All",
  isOpen: true,
};

export function DeveloperAgenda() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(0);

  const { data: citys, isLoading: isStatsLoading } = useCitysData();
  const cityOptions = useMemo(
    () => [ALL_CITY_OPTION, ...(citys ?? [])],
    [citys],
  );
  const { data: currentData, isLoading: isCurrentLoading } = useActivityData(
    selectedCity,
    true,
  );

  const currentActivity = useMemo(() => {
    return [...(currentData ?? [])].sort(
      (a, b) =>
        new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime(),
    );
  }, [currentData]);

  const { data: previousData, isLoading: isPreviousLoading } = useActivityData(
    selectedCity,
    false,
  );
  const previousActivity = useMemo(() => {
    return [...(previousData ?? [])].sort(
      (a, b) =>
        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime(),
    );
  }, [previousData]);

  const formatMonthDay = (publishTime?: string) => {
    if (!publishTime) return "";
    const { month, day } = parseDate(publishTime);
    return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  };

  const handleCityChange = (item: CitysDataType) => {
    if (!item.isOpen) {
      toast.info("Please stay tuned");
      return;
    }
    setSelectedCity(item.id);
  };

  return (
    <div className="min-h-screen bg-[#13032F] text-white">
      <SiteNav variant="landing" bgColor="bg-white/10" />

      <div className="border-t border-[#47566D]">
        <div className="mx-auto  max-w-[1200px]">
          <h1 className="text-center text-4xl font-black tracking-tight md:text-5xl mt-[120px]">
            Global Tour Schedule
          </h1>

          <nav className="flex flex-wrap items-center justify-center gap-2 pb-4 mt-12">
            {isStatsLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-9 w-24 rounded-full bg-white/15"
                  />
                ))
              : cityOptions.map((item) => {
                  const isActive = item.id === selectedCity;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={classNames(
                        "rounded-full px-5 py-2 text-sm transition cursor-pointer",
                        {
                          "bg-brand font-semibold text-white shadow-sm hover:bg-brand-hover":
                            isActive,
                          "bg-[#1B073E] font-medium text-slate-700 border border-[#5E4F78] text-white/60":
                            !isActive,
                        },
                      )}
                      onClick={() => handleCityChange(item)}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.cityName}
                    </button>
                  );
                })}
          </nav>

          {currentActivity.length > 0 ? (
            <div className="pt-10">
              {/* 内容 */}
              <h3 className="text-[24px] text-brand font-medium flex items-center">
                <span className="w-[16px] h-[16px] bg-brand block mr-[16px]"></span>
                <span>Event Theme</span>
              </h3>

              <div>
                {currentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-0"
                  >
                    <div className="w-full md:mr-10 md:w-[260px]">
                      <p className="text-[16px] leading-none font-medium text-white/45">
                        {formatEnglishMonthYear(item.publishTime)}
                      </p>
                      <p className="mt-4 text-[48px] leading-none font-semibold tracking-tight text-white/95">
                        {formatMonthDay(item.publishTime)}
                      </p>

                      <div className="mt-6">
                        <div
                          className={classNames(
                            "relative pl-7 py-2 cursor-pointer transition-colors px-6 py-5",
                            "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded rounded-xl bg-[#1D0A4A] before:bg-brand",
                          )}
                        >
                          <p
                            className={classNames(
                              "text-[18px] leading-tight font-semibold text-white",
                            )}
                          >
                            {item?.title ?? ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="relative h-[110px] w-full cursor-pointer rounded-2xl md:h-[140px] md:flex-1"
                      onClick={() => router.push(`/details?id=${item.id}`)}
                    >
                      <Image
                        src="/images/title.png"
                        alt=""
                        width={886}
                        height={179}
                        className="h-full w-full rounded-2xl object-contain md:object-cover"
                      />
                      <span className="absolute inset-y-0 left-4 right-4 flex items-center text-[20px] font-semibold text-white md:left-[40px] md:right-0">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-2xl font-bold text-gray-500 mt-20">
              --- Coming Soon --
            </div>
          )}

          <h1 className="text-center text-4xl font-black tracking-tight md:text-5xl mt-[120px]">
            Previous Events
          </h1>

          {previousActivity && previousActivity.length > 0 ? (
            <div className="previousBox mt-12 grid grid-cols-1 gap-6 pb-20">
              {isPreviousLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-[#5E4F78] bg-[#1B073E] p-6"
                  >
                    <Skeleton className="h-[150px] w-[220px] bg-white/15" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-6 w-4/5 bg-white/15" />
                      <Skeleton className="h-6 w-3/5 bg-white/15" />
                      <Skeleton className="h-5 w-full bg-white/15" />
                    </div>
                  </div>
                ))
              ) : (
                <PastEventsCarousel events={previousActivity} />
              )}
            </div>
          ) : (
            <div className="text-center text-2xl font-bold text-gray-500 mt-20">
              --- Coming Soon --
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
