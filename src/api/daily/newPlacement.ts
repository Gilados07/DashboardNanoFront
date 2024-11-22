import { useQuery, queryOptions } from "@tanstack/react-query";
import { fetchRequest } from "../fetchRequest";

async function getNewPlacements() {
  const data = await fetchRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/daily/new-placements`
  );

  return data;
}

export const newPlacementQueryOptions = queryOptions({
  queryKey: ["daily", "new-placements"],
  queryFn: getNewPlacements,
  staleTime: 1000 * 5,
});

export const useDailyNewPlacements = () => {
  return useQuery(newPlacementQueryOptions);
};
