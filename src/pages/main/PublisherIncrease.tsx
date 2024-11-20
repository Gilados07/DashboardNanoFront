import { usePublisherIncrease } from "@/api/main/publisherIncrease";
import { Table } from "@/components/features/Table/Table";

export function PublisherIncrease() {
  const { data, isLoading } = usePublisherIncrease();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <Table data={data} pinnedCols={[0]} />
    </div>
  );
}
