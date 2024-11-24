import { useQuery, queryOptions } from "@tanstack/react-query";
import { fetchRequest } from "../fetchRequest";

async function getDailyRecap() {
  const data = await fetchRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/main/daily-recap`
  );

  return data;
}

export const dailyRecapQueryOptions = queryOptions({
  queryKey: ["main", "daily-recap"],
  queryFn: getDailyRecap,
  staleTime: 1000 * 5,
});

export const useDailyRecap = () => {
  return useQuery(dailyRecapQueryOptions);
};
