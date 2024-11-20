import { useDailyRecap } from "@/api/main/dailyRecap";
import { Table } from "@/components/features/Table/Table";

export function DailyRecap() {
  const { data, isLoading } = useDailyRecap();

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
