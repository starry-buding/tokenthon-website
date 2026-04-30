import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDate(str: string) {
  console.log("Parsing date:", str);
  const [year, month, day] = str.split("-");

  return {
    year: year,
    month: month,
    day: day,
  };
}

const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** 将日期字符串格式化为 UI 文案，例如 `April 2026`（供 JSX 渲染，避免直接渲染对象） */
export function formatEnglishMonthYear(iso: string | undefined): string {
  if (!iso) return "";
  const [y, m] = iso.split("-");
  const year = Number(y);
  const month = Number(m);
  if (!year || !month || month < 1 || month > 12) return "";
  return `${MONTH_NAMES_EN[month - 1]} ${year}`;
}

export function normalizeCoverImageSrc(src: string): {
  src: string;
  unoptimized: boolean;
} {
  const trimmed = src.trim();
  if (!trimmed) return { src: "", unoptimized: false };

  if (trimmed.startsWith("http://localhost:3000/")) {
    return {
      src: trimmed.replace("http://localhost:3000", ""),
      unoptimized: false,
    };
  }
  if (trimmed.startsWith("http://127.0.0.1:3000/")) {
    return {
      src: trimmed.replace("http://127.0.0.1:3000", ""),
      unoptimized: false,
    };
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return { src: trimmed, unoptimized: true };
  }

  return { src: trimmed, unoptimized: false };
}
