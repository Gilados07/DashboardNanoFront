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
    <div className="w-full flex justify-center flex-col items-center h-full gap-10">
      <div className="w-[80%] flex items-center flex-col max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        <Table data={data} />
      </div>
    </div>
  );
}
