"use client";

// import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useWeeklyRevenue } from "@/api/weekly/weeklyRevenue";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function WeeklyRevenue() {
  const { data, isLoading } = useWeeklyRevenue();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  //   const formatCurrency = (value: string) => {
  //     return new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     }).format(parseFloat(value));
  //   };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={formatDate}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"

                    // formatValue={(value: string) => formatCurrency(value)}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="Total_Revenue"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
