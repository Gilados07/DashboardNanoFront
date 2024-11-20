import { Table } from "@/components/features/Table";
import { useQuery } from "@tanstack/react-query";

const getPublisherIncrease = async () => {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/main/publisher-increase"
  );
  const data = await result.json();

  return data;
};

export function PublisherIncrease() {
  const { data, isLoading } = useQuery({
    queryKey: ["main", "publisher-increase"],
    queryFn: getPublisherIncrease,
  });
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <Table data={data} pinnedCols={[0]} />
    </div>
  );
}
