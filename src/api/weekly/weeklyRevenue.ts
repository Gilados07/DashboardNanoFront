import { useQuery, queryOptions } from "@tanstack/react-query";
import { fetchRequest } from "../fetchRequest";

type IWeeklyRevenue = IWeeklyRevenueItem[];

type IWeeklyRevenueItem = {
  Total_Revenue: string;
  date: string;
};

async function getWeeklyRevenue() {
  const data = await fetchRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/weekly/weekly-revenue`
  );

  return data;
}

export const newWeeklyRevenueQueryOptions = queryOptions<IWeeklyRevenue>({
  queryKey: ["weekly", "weekly-revenue"],
  queryFn: getWeeklyRevenue,
  staleTime: 1000 * 5,
});

export const useWeeklyRevenue = () => {
  return useQuery(newWeeklyRevenueQueryOptions);
};
