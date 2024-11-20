import { useQuery } from "@tanstack/react-query";

const getPublisherIncrease = async () => {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/main/publisher-increase"
  );
  const data = await result.json();

  return data;
};

export const publisherIncreaseQueryOptions = {
  queryKey: ["main", "publisher-increase"],
  queryFn: getPublisherIncrease,
  staleTime: 1000 * 5,
};

export const usePublisherIncrease = () =>
  useQuery(publisherIncreaseQueryOptions);
