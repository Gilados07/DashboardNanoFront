import { useQuery } from "@tanstack/react-query";

export const newPlacementQueryOptions = {
  queryKey: ["daily", "new-placements"],
  queryFn: getNewPlacements,
  staleTime: 1000 * 5,
};

export const useDailyNewPlacements = () => {
  return useQuery(newPlacementQueryOptions);
};

async function getNewPlacements() {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/daily/new-placements"
  );
  const data = await result.json();

  return data;
}
