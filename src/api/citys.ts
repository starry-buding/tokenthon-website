import { useQuery } from "@tanstack/react-query";
import type { CitysDataType } from "@/types/citys";
import { apiGetJson, queryDefaults } from "@/api/client";

async function fetchCitys(): Promise<CitysDataType[]> {
  const data: unknown = await apiGetJson("/citys");
  if (!Array.isArray(data)) {
    throw new Error("Invalid cities response: expected an array");
  }

  return data as CitysDataType[];
}

export const useCitysData = () => {
  return useQuery({
    queryKey: ["citys"],
    queryFn: fetchCitys,
    ...queryDefaults,
  });
};
