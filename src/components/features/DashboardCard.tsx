import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  mainContent: string;
  subContent: string;
  iconName?: "dollar" | "people" | "inventory";
  sentiment: "positive" | "negative";
}

export const DashboardCard = ({
  title,
  mainContent,
  subContent,
  iconName = "dollar",
}: DashboardCardProps) => {
  return (
    <Card>
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

const DollarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-5 w-5 text-muted-foreground"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PeopleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-5 w-5 text-muted-foreground"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const InventoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-5 w-5 text-muted-foreground"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20" />
  </svg>
);
