"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ActivityItem } from "@/types/activities";
import { normalizeCoverImageSrc } from "@/lib/utils";
import { useRouter } from "next/navigation";

function PastEventCard({ event }: { event: ActivityItem }) {
  const router = useRouter();
  return (
    <article
      className="flex min-h-[160px] w-[min(540px,92vw)] shrink-0 flex-col overflow-hidden shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-stretch px-4 py-6 border border-white/20  bg-[#1B073E] rounded-2xl cursor-pointer"
      onClick={() => router.push(`/details?id=${event.id}`)}
    >
      <div className="relative w-full md:h-full md:w-[250px] md:shrink-0">
        {event.coverImage ? (
          <Image
            src={normalizeCoverImageSrc(event.coverImage).src}
            alt={event.title}
            width={250}
            height={140}
            className="h-auto w-full object-cover object-center rounded-[6px]"
            unoptimized={normalizeCoverImageSrc(event.coverImage).unoptimized}
          />
        ) : (
          <div className="h-[140px] w-full rounded-[6px] bg-white/10" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between px-4">
        <h3 className="text-lg font-semibold leading-snug text-brand h-[80px] w-full overflow-hidden text-ellipsis line-clamp-5">
          {event.title}
        </h3>
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-white/70 flex items-center">
            <Image
              src="/images/address.svg"
              alt="Sci-fi data center and database visualization"
              width={24}
              height={24}
            />
            <span>{event?.city?.cityName}</span>
          </p>
          <p className="text-sm text-white/70 flex items-center">
            <Image
              src="/images/dateSvg.svg"
              alt="Sci-fi data center and database visualization"
              width={24}
              height={24}
            />
            <span>{event.publishTime}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function PastEventsCarousel({ events }: { events: ActivityItem[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  const isHoveredRef = useRef(false);
  const containerHoveredRef = useRef(false);
  const nudgeAnimatingRef = useRef(false);
  const nudgeRafRef = useRef<number | null>(null);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const set1Ref = useRef<HTMLDivElement | null>(null);
  const set2Ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const width1Ref = useRef(0);
  const stepRef = useRef(260);
  const offsetRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const measure = () => {
      const set1 = set1Ref.current;
      const set2 = set2Ref.current;
      const track = trackRef.current;
      if (!set1 || !set2 || !track) return;

      // Period = distance between the start of set1 and the start of set2.
      // This includes the spacer between them, so wrapping won't "flash".
      width1Ref.current = set2.offsetLeft - set1.offsetLeft;

      // Step = first card -> second card left offset difference (fallback to ~card width)
      const cards = Array.from(
        set1.querySelectorAll("article"),
      ) as HTMLElement[];
      if (cards.length >= 2) {
        stepRef.current = Math.max(
          1,
          cards[1].offsetLeft - cards[0].offsetLeft,
        );
      } else if (cards.length === 1) {
        stepRef.current = cards[0].offsetWidth + 12; // approx gap-3 (12px @ 16px rem)
      }
    };

    const applyOffset = () => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const normalize = () => {
      const w = width1Ref.current;
      if (w <= 0) return;
      while (offsetRef.current <= -w) offsetRef.current += w;
      while (offsetRef.current > 0) offsetRef.current -= w;
    };

    const speedPxPerSec = 45;
    let last = performance.now();

    // initial
    measure();
    offsetRef.current = 0;
    normalize();
    applyOffset();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      if (
        !isHoveredRef.current &&
        !nudgeAnimatingRef.current &&
        width1Ref.current > 0
      ) {
        offsetRef.current -= (speedPxPerSec * dt) / 1000;
        // wrap seamlessly
        if (offsetRef.current <= -width1Ref.current) {
          offsetRef.current += width1Ref.current;
        }
        applyOffset();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      measure();
      normalize();
      applyOffset();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (nudgeRafRef.current) cancelAnimationFrame(nudgeRafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  if (events.length === 0) return null;

  if (reduceMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-3 md:justify-start">
        {events.map((event) => (
          <PastEventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }

  const applyTransform = () => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  const normalizeOffset = () => {
    const w = width1Ref.current;
    if (!(w > 0)) return;
    while (offsetRef.current <= -w) offsetRef.current += w;
    while (offsetRef.current > 0) offsetRef.current -= w;
  };

  const runNudge = (direction: "prev" | "next") => {
    const step = stepRef.current;
    if (!(step > 0)) return;

    if (nudgeRafRef.current) {
      cancelAnimationFrame(nudgeRafRef.current);
      nudgeRafRef.current = null;
    }

    nudgeAnimatingRef.current = true;
    isHoveredRef.current = true;

    const start = offsetRef.current;
    const targetRaw = direction === "prev" ? start + step : start - step;
    const durationMs = 480;
    const t0 = performance.now();

    const frame = (now: number) => {
      const elapsed = now - t0;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      offsetRef.current = start + (targetRaw - start) * eased;
      applyTransform();

      if (t < 1) {
        nudgeRafRef.current = requestAnimationFrame(frame);
      } else {
        nudgeRafRef.current = null;
        nudgeAnimatingRef.current = false;
        normalizeOffset();
        applyTransform();
        isHoveredRef.current = containerHoveredRef.current;
      }
    };

    nudgeRafRef.current = requestAnimationFrame(frame);
  };

  const onPrev = () => runNudge("prev");

  const onNext = () => runNudge("next");

  return (
    <div
      className="group relative -mx-1 overflow-hidden py-2"
      onMouseEnter={() => {
        containerHoveredRef.current = true;
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        containerHoveredRef.current = false;
        if (!nudgeAnimatingRef.current) {
          isHoveredRef.current = false;
        }
      }}
    >
      <div ref={trackRef} className="flex flex-nowrap will-change-transform">
        <div ref={set1Ref} className="flex flex-nowrap gap-3">
          {events.map((event) => (
            <PastEventCard key={event.id} event={event} />
          ))}
        </div>
        {/* Add a small spacer so the end and start items aren't flush together */}
        <div className="shrink-0 w-3" aria-hidden />
        <div ref={set2Ref} className="flex flex-nowrap gap-3" aria-hidden>
          {events.map((event) => (
            <PastEventCard key={`${event.id}-dup`} event={event} />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-2 shadow-sm ring-1 ring-slate-200 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto cursor-pointer"
      >
        <ChevronLeft className="h-5 w-5 text-slate-700" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-2 shadow-sm ring-1 ring-slate-200 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto cursor-pointer"
      >
        <ChevronRight className="h-5 w-5 text-slate-700" />
      </button>
    </div>
  );
}
