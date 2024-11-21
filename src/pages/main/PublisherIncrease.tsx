import { usePublisherIncrease } from "@/api/main/publisherIncrease";
import { DashboardCard } from "@/components/features/DashboardCard";
import { Table } from "@/components/features/Table/Table";

export function PublisherIncrease() {
  const { data, isLoading } = usePublisherIncrease();

  const topTotalRevenueIncrease = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.Revenue_Diffrence.slice(0, -1)) >
      parseFloat(max.Revenue_Diffrence.slice(0, -1))
        ? item
        : max,
    data[0]
  );

  const topPercentageIncrease = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.Increase.slice(0, -1)) >
      parseFloat(max.Increase.slice(0, -1))
        ? item
        : max,
    data[0]
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col gap-5 w-full h-full p-5">
      <div className="flex gap-5 w-full">
        <DashboardCard
          title="Highest Total Increase"
          mainContent={`$${topTotalRevenueIncrease.Revenue_Diffrence.slice(
            0,
            -1
          )}`}
          subContent={topTotalRevenueIncrease.Publisher}
        />
        <DashboardCard
          title="Highest Relative Increase"
          mainContent={topPercentageIncrease.Increase}
          subContent={topPercentageIncrease.Publisher}
        />
      </div>
      <Table data={data} pinnedCols={[0]} />
    </div>
  );
}
