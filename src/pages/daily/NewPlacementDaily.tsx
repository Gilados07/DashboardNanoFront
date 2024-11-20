import { Table } from "@/components/myComponents/Table";
import { useQuery } from "@tanstack/react-query";

const getNewPlacements = async () => {
  const result = await fetch(
    "http://localhost:3001/api/v1/reports/daily/new-placements"
  );
  const data = await result.json();

  return data;
};

export function NewPlacementDaily() {
  const { data, isLoading } = useQuery({
    queryKey: ["daily", "new-placements"],
    queryFn: getNewPlacements,
  });
  console.log(data);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full flex justify-center flex-col items-center h-full gap-10">
        <div className="w-[80%] flex items-center flex-col max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        {/* <h1>Comparesion</h1> */}
        <Table data={data} />
        {/* <Table data={[data?.reportData]} /> */}
      </div>
    </div>
  );
}
