import { useQuery } from "@tanstack/react-query";

const getPublisherDecrease = async () => {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/main/publisher-decrease"
  );
  const data = await result.json();

  return data;
};

export const publisherDecreaseQueryOptions = {
  queryKey: ["main", "publisher-decrease"],
  queryFn: getPublisherDecrease,
  staleTime: 1000 * 5,
};

export const usePublisherDecrease = () => {
  return useQuery(publisherDecreaseQueryOptions);
};
