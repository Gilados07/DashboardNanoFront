import { usePublisherDecrease } from "@/api/main/publisherDecrease";
import { DashboardCard } from "@/components/features/DashboardCard";
import { Table } from "@/components/features/Table/Table";

export function PublisherDecrease() {
  const { data, isLoading } = usePublisherDecrease();

  const biggestTotalRevenueDecrease = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.Revenue_Diffrence.slice(0, -1)) >
      parseFloat(max.Revenue_Diffrence.slice(0, -1))
        ? item
        : max,
    data[0]
  );

  const biggestPercentageDecrease = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.Downgrade.slice(0, -1)) <
      parseFloat(max.Downgrade.slice(0, -1))
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
          title="Highest Total Decrease"
          mainContent={`$${biggestTotalRevenueDecrease.Revenue_Diffrence.slice(
            0,
            -1
          )}`}
          subContent={biggestTotalRevenueDecrease.Publisher}
        />
        <DashboardCard
          title="Highest Relative Decrease"
          mainContent={biggestPercentageDecrease.Downgrade}
          subContent={biggestPercentageDecrease.Publisher}
        />
      </div>
      <Table data={data} pinnedCols={[0]} />
    </div>
  );
}
