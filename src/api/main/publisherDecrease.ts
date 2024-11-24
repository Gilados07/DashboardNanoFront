import { useQuery, queryOptions } from "@tanstack/react-query";
import { fetchRequest } from "../fetchRequest";

const getPublisherDecrease = async () => {
  const data = await fetchRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/main/publisher-decrease`
  );

  return data;
};

export const publisherDecreaseQueryOptions = queryOptions({
  queryKey: ["main", "publisher-decrease"],
  queryFn: getPublisherDecrease,
  staleTime: 1000 * 5,
});

export const usePublisherDecrease = () => {
  return useQuery(publisherDecreaseQueryOptions);
};
