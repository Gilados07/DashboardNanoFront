import { useDailyNewPlacements } from "@/api/daily/newPlacement";
import { Table } from "@/components/features/Table/Table";

export function NewPlacementDaily() {
  const { data, isLoading } = useDailyNewPlacements();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <Table data={data} />
    </div>
  );
}
