import { Table } from "@/components/features/Table";
import { useQuery } from "@tanstack/react-query";

const getDailyRecap = async () => {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/main/daily-recap"
  );
  const data = await result.json();

  return data;
};

export function DailyRecap() {
  const { data, isLoading } = useQuery({
    queryKey: ["main", "daily-recap"],
    queryFn: getDailyRecap,
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full flex flex-col">
      <Table data={data?.comparison} />
      <Table data={data?.today} />
      <Table data={data?.yesterday} />
    </div>
  );
}
