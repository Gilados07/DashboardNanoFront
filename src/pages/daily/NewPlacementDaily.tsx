import { useDailyNewPlacements } from "@/api/daily/newPlacement";
import { DashboardCard } from "@/components/features/DashboardCard";
import { Table } from "@/components/features/Table/Table";

export function NewPlacementDaily() {
  const { data, isLoading } = useDailyNewPlacements();

  const mostImpressions = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.Impression) > parseFloat(max.Impression) ? item : max,
    data[0]
  );

  const highestRPM = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.RPM.slice(0, -1)) > parseFloat(max.RPM.slice(0, -1))
        ? item
        : max,
    data[0]
  );

  const highestRevenue = data?.reduce(
    (max: Record<string, string>, item: Record<string, string>) =>
      parseFloat(item.Revenue.slice(0, -1)) >
      parseFloat(max.Revenue.slice(0, -1))
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
          title="Most Impressions"
          mainContent={mostImpressions.Impression}
          subContent={mostImpressions.Publisher}
        />
        <DashboardCard
          title="Highest RPM"
          mainContent={`$${highestRPM.RPM.slice(0, -1)}`}
          subContent={highestRPM.Publisher}
        />
        <DashboardCard
          title="Highest Revenue"
          mainContent={`$${highestRevenue.Revenue.slice(0, -1)}`}
          subContent={highestRevenue.Publisher}
        />
      </div>
      <Table data={data} />
    </div>
  );
}
