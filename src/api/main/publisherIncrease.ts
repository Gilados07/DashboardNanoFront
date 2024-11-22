import { useQuery, queryOptions } from "@tanstack/react-query";
import { fetchRequest } from "../fetchRequest";

const getPublisherIncrease = async () => {
  const data = await fetchRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/main/publisher-increase`
  );

  return data;
};

export const publisherIncreaseQueryOptions = queryOptions({
  queryKey: ["main", "publisher-increase"],
  queryFn: getPublisherIncrease,
  staleTime: 1000 * 5,
});

export const usePublisherIncrease = () =>
  useQuery(publisherIncreaseQueryOptions);
