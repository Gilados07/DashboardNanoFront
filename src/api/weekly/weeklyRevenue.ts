import { useQuery, queryOptions } from "@tanstack/react-query";
import { fetchRequest } from "../fetchRequest";
async function getWeeklyRevenue() {
  const data = await fetchRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/weekly/weekly-revenue`
  );

  return data;
}

export const newWeeklyRevenueQueryOptions = queryOptions({
  queryKey: ["weekly", "weekly-revenue"],
  queryFn: getWeeklyRevenue,
  staleTime: 1000 * 5,
});

export const useWeeklyRevenue = () => {
  return useQuery(newWeeklyRevenueQueryOptions);
};
