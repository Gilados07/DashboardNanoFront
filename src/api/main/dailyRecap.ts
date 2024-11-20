import { useQuery } from "@tanstack/react-query";

async function getDailyRecap() {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/main/daily-recap"
  );
  const data = await result.json();

  return data;
}

export const dailyRecapQueryOptions = {
  queryKey: ["main", "daily-recap"],
  queryFn: getDailyRecap,
  staleTime: 1000 * 5,
};

export const useDailyRecap = () => {
  return useQuery(dailyRecapQueryOptions);
};
