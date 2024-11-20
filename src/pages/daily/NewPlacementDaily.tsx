import { useDailyNewPlacements } from "@/api/daily/newPlacement";
import { Table } from "@/components/features/Table";

export function NewPlacementDaily() {
  const { data, isLoading } = useDailyNewPlacements();

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
