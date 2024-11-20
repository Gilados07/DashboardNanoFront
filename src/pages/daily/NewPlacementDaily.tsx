import { Table } from "@/components/features/Table";
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
    <div className="w-full flex justify-center flex-col items-center gap-10 py-10 px-15">
      <div className="w-[80%]">
        {/* <h1>Comparesion</h1> */}
        <Table data={data} />
        {/* <Table data={[data?.reportData]} /> */}
      </div>
    </div>
  );
}
