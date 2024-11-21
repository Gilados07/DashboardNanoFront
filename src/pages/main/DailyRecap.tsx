import { useDailyRecap } from "@/api/main/dailyRecap";
import { DashboardCard } from "@/components/features/DashboardCard";
import { NoDataMessage } from "@/components/features/NoDataMessage";

export function DailyRecap() {
  const { formattedData, isLoading } = useDailyRecapData();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-wrap gap-5 p-5">
      {formattedData.length === 0 && <NoDataMessage />}
      {formattedData.map((item, index) => (
        <div key={index}>
          <DashboardCard
            title={item.title}
            mainContent={item.mainContent}
            subContent={item.subContent}
            iconName={item.iconName}
            sentiment={item.sentiment}
          />
        </div>
      ))}
    </div>
  );
}

const useDailyRecapData = () => {
  const { data, isLoading } = useDailyRecap();

  if (data?.comparison?.length === 0) {
    return { formattedData: [], isLoading };
  }

  const [revenueToday, revenueComparison, revenueSentiment] =
    getFormattedValues({
      key: "Revenue",
      changeKey: "RevChange",
      data,
    });

  const [profitToday, profitComparison, profitSentiment] = getFormattedValues({
    key: "Profit",
    changeKey: "ProfitChange",
    data,
  });

  const [rpmToday, rpmComparison, rpmSentiment] = getFormattedValues({
    key: "RPM",
    changeKey: "RPMChange",
    data,
  });

  const [impressionsToday, impressionsComparison, impressionsSentiment] =
    getFormattedValues({
      key: "Imp",
      changeKey: "ImpChange",
      data,
      withDollar: false,
    });

  const [inventoryToday, inventoryComparison, inventorySentiment] =
    getFormattedValues({
      key: "Inventory",
      changeKey: "InvChange",
      withDollar: false,
      data,
    });

  const formattedData = [
    {
      title: "Total Revenue",
      mainContent: revenueToday,
      subContent: revenueComparison,
      sentiment: revenueSentiment,
    } as const,
    {
      title: "Total Profit",
      mainContent: profitToday,
      subContent: profitComparison,
      sentiment: profitSentiment,
    } as const,
    {
      title: "Total RPM",
      mainContent: rpmToday,
      subContent: rpmComparison,
      sentiment: rpmSentiment,
    } as const,
    {
      title: "Total Impressions",
      iconName: "people",
      mainContent: impressionsToday,
      subContent: impressionsComparison,
      sentiment: impressionsSentiment,
    } as const,
    {
      title: "Total Inventory",
      mainContent: inventoryToday,
      subContent: inventoryComparison,
      iconName: "inventory",
      sentiment: inventorySentiment,
    } as const,
  ];

  return { formattedData, isLoading };
};

interface GetFormattedValuesType {
  key: string;
  changeKey: string;
  withDollar?: boolean;
  data: Record<string, Record<string, string>[]>;
}

const getFormattedValues = ({
  key,
  changeKey,
  withDollar = true,
  data,
}: GetFormattedValuesType) => {
  const today = withDollar
    ? parseFloat(data?.today?.[0]?.[key].replace(/[$,]/g, "")).toLocaleString(
        "en-US",
        { style: "currency", currency: "USD" }
      )
    : parseFloat(data?.today?.[0]?.[key]).toLocaleString("en-US", {
        style: "decimal",
      });
  const yesterday = withDollar
    ? parseFloat(
        data?.yesterday?.[0]?.[key].replace(/[$,]/g, "")
      ).toLocaleString("en-US", { style: "currency", currency: "USD" })
    : parseFloat(data?.yesterday?.[0]?.[key]).toLocaleString("en-US", {
        style: "decimal",
      });

  const changeData = data?.comparison?.[0]?.[changeKey];
  const comparison =
    changeData === "0%"
      ? "Same as yesterday"
      : `${
          !changeData?.startsWith("-") ? `+${changeData}` : changeData
        } from yesterday's ${yesterday}`;

  const sentiment = changeData?.startsWith("-") ? "negative" : "positive";

  const formattedValues = [today, comparison, sentiment] as const;

  return formattedValues;
};
