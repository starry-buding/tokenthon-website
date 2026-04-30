"use client";

import Link from "next/link";
import { toast } from "sonner";
import type { TourEvent } from "@/data/activity";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ACTIVE_EVENT_ID = 1;

export function EventCard({ event }: { event: TourEvent }) {
  const router = useRouter();

  return (
    <Image
      src={event.imgSrc}
      alt={event.title}
      width={1156}
      height={500}
      className="cursor-pointer"
      onClick={() => {
        if (event.id === ACTIVE_EVENT_ID) {
          router.push("/?id=" + event.id);
        }
      }}
    />
  );
}
