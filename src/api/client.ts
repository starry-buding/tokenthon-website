const DEFAULT_API_BASE = "https://alloyx-tokenthon-backend.onrender.com/api/v1";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? DEFAULT_API_BASE;

export function apiUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.startsWith("/")) return `${API_BASE}/${path}`;
  return `${API_BASE}${path}`;
}

export async function apiGetJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(apiUrl(path), { ...init, method: "GET" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function apiPostJson<TBody>(path: string, body: TBody): Promise<void> {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let message = `Request failed: ${res.status} ${res.statusText}`;
    try {
      const err: unknown = await res.json();
      if (err && typeof err === "object" && "message" in err) {
        const m = (err as { message: unknown }).message;
        if (typeof m === "string" && m.length > 0) message = m;
      }
    } catch {
      /* keep default message */
    }
    throw new Error(message);
  }
}

export const queryDefaults = {
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
} as const;

export function enabledById(id: number) {
  return Number.isFinite(id) && id > 0;
}
