"use client";

import { useState } from "react";

import type { TourEvent } from "@/data/activity";

type CityBlock = { city: string; events: TourEvent[] };

export function ScheduleCityMenu({ cities }: { cities: CityBlock[] }) {
  const [selectedCity, setSelectedCity] = useState(cities[0]?.city ?? "");

  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <nav
        className="flex flex-wrap items-center justify-center gap-2 pb-4"
        aria-label="Tour cities"
      >
        {cities.map(({ city }) => {
          const isActive = city === selectedCity;
          return (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={
                isActive
                  ? "rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover cursor-pointer"
                  : "rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand/40 hover:text-brand cursor-pointer"
              }
              aria-current={isActive ? "true" : undefined}
            >
              {city}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
