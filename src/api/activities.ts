import { useQuery } from "@tanstack/react-query";
import type {
  ActivityItem,
  PaginatedResponse,
} from "@/types/activities";
import { API_BASE, apiGetJson, enabledById, queryDefaults } from "@/api/client";

function activitiesTopUrl(citysId: number, isTop: boolean): string {
  const params = new URLSearchParams({
    citysId: String(citysId),
    isTop: String(isTop),
  });
  return `${API_BASE}/activities/by-city?${params}`;
}

async function fetchActivitiesTop(
  citysId: number,
  isTop: boolean = true,
): Promise<ActivityItem[]> {
  return apiGetJson<ActivityItem[]>(activitiesTopUrl(citysId, isTop));
}

export const useActivityData = (citysId: number, isTop: boolean = true) => {
  return useQuery<ActivityItem[]>({
    queryKey: ["current", citysId, isTop],
    queryFn: () => fetchActivitiesTop(citysId, isTop),
    ...queryDefaults,
  });
};

export const useCurrentActivityId = (id: number) => {
  return useQuery<string>({
    queryKey: ["currentActivityId", id],
    queryFn: async () => {
      const data: ActivityItem = await apiGetJson(`/activities/${id}`);
      return typeof data?.contentJson === "string" ? data.contentJson : "";
    },
    enabled: enabledById(id),
    ...queryDefaults,
  });
};

export const useActivityHomeData = () => {
  return useQuery<PaginatedResponse<ActivityItem>>({
    queryKey: ["home"],
    queryFn: () =>
      apiGetJson<PaginatedResponse<ActivityItem>>("/activities?is_banner=true"),
    ...queryDefaults,
  });
};
