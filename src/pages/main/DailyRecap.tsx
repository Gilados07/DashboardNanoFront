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
  console.log(data);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full flex justify-center flex-col items-center h-full gap-10 ">
      <div className="w-[80%] flex items-center flex-col">
        <h1>Comparesion</h1>
        <Table data={data?.comparison} />
      </div>
      <div className="w-[80%] ">
        <Table data={data?.today} />
      </div>
      <div className="w-[80%]">
        <Table data={data?.yesterday} />
      </div>
    </div>
  );
}
