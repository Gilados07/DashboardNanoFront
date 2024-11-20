import { usePublisherDecrease } from "@/api/main/publisherDecrease";
import { Table } from "@/components/features/Table/Table";

export function PublisherDecrease() {
  const { data, isLoading } = usePublisherDecrease();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <Table data={data} pinnedCols={[0]} />
    </div>
  );
}
