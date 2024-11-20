import { Table } from "@/components/features/Table";
import { useQuery } from "@tanstack/react-query";

const getPublisherDecrease = async () => {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/main/publisher-decrease"
  );
  const data = await result.json();

  return data;
};

export function PublisherDecrease() {
  const { data, isLoading } = useQuery({
    queryKey: ["main", "publisher-decrease"],
    queryFn: getPublisherDecrease,
  });
  console.log(data);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <Table data={data} pinnedCols={[0]} />
    </div>
  );
}
