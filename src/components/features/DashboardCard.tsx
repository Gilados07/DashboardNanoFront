import { DollarIcon } from "@/assets/icons/dollar";
import { InventoryIcon } from "@/assets/icons/inventory";
import { PeopleIcon } from "@/assets/icons/people";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  mainContent: string;
  subContent: string;
  iconName?: "dollar" | "people" | "inventory";
  sentiment?: "positive" | "negative";
}

export const DashboardCard = ({
  title,
  mainContent,
  subContent,
  iconName = "dollar",
}: DashboardCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {iconName === "dollar" && <DollarIcon />}
        {iconName === "people" && <PeopleIcon />}
        {iconName === "inventory" && <InventoryIcon />}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{mainContent}</div>
        <p className="text-muted-foreground">{subContent}</p>
      </CardContent>
    </Card>
  );
};
