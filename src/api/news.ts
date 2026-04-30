import { useQuery } from "@tanstack/react-query";
import type { NewsDataType } from "@/types/news";
import { apiGetJson, enabledById, queryDefaults } from "@/api/client";

async function fetchNews(): Promise<NewsDataType[]> {
  return apiGetJson<NewsDataType[]>("/news");
}

export const useNewsData = () => {
  return useQuery<NewsDataType[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
    ...queryDefaults,
  });
};

export const useCurrentNewsId = (id: number) => {
  return useQuery<NewsDataType>({
    queryKey: ["currentNewsId", id],
    queryFn: () => apiGetJson<NewsDataType>(`/news/${id}`),
    enabled: enabledById(id),
    ...queryDefaults,
  });
};
