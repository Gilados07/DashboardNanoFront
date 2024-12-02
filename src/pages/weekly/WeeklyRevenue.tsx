import { Line, LineChart, XAxis, YAxis } from "recharts";
import { useWeeklyRevenue } from "@/api/weekly/weeklyRevenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardCard } from "@/components/features/DashboardCard";
import { NoDataMessage } from "@/components/features/NoDataMessage";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function WeeklyRevenue() {
  const { data, isLoading } = useWeeklyRevenue();

  return isLoading ? (
    <div>Loading...</div>
  ) : !data?.length ? (
    <NoDataMessage />
  ) : (
    <div className="flex flex-col gap-5 w-full h-full p-5 ">
      <div className="flex gap-5 w-full h-min">
        <WeeklyRecapChart data={data} />
        <WeeklyRecapCards data={data} />
      </div>
    </div>
  );
}

const WeeklyRecapCards = ({ data }: { data: Record<string, string>[] }) => {
  const maxRevenueItem = data?.reduce(
    (max, item) => (item.Total_Revenue > max.Total_Revenue ? item : max),
    data[0]
  );
  const minRevenueItem = data?.reduce(
    (min, item) => (item.Total_Revenue < min.Total_Revenue ? item : min),
    data[0]
  );

  const formatCurrency = (value: string) => `$${parseFloat(value).toFixed(2)}`;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const suffix =
      dayOfMonth % 10 === 1 && dayOfMonth !== 11
        ? "st"
        : dayOfMonth % 10 === 2 && dayOfMonth !== 12
        ? "nd"
        : dayOfMonth % 10 === 3 && dayOfMonth !== 13
        ? "rd"
        : "th";
    return `${day}, ${dayOfMonth}${suffix} of ${month}`;
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <DashboardCard
        mainContent={formatCurrency(maxRevenueItem!.Total_Revenue)}
        subContent={formatDate(maxRevenueItem!.date)}
        title="Best Day"
      />
      <DashboardCard
        mainContent={formatCurrency(minRevenueItem!.Total_Revenue)}
        subContent={formatDate(minRevenueItem!.date)}
        title="Worst Day"
      />
    </div>
  );
};

const WeeklyRecapChart = ({ data }: { data: Record<string, string>[] }) => {
  const formatXaxisDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-w-[473px]">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatXaxisDate}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  value !== 0 ? `${value / 1000}k` : ""
                }
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                type="monotone"
                dataKey="Total_Revenue"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
