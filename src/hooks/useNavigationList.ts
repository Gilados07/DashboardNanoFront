import { newPlacementQueryOptions } from "@/api/daily/newPlacement";
import { dailyRecapQueryOptions } from "@/api/main/dailyRecap";
import { publisherDecreaseQueryOptions } from "@/api/main/publisherDecrease";
import { publisherIncreaseQueryOptions } from "@/api/main/publisherIncrease";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useNavigationList = () => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const navigationList = [
    {
      title: "Main Queries",
      id: "main",
      items: [
        {
          title: "Daily Recap Report",
          url: "/main/recap",
          prefetch: () => {
            queryClient.prefetchQuery(dailyRecapQueryOptions);
          },
        },
        {
          title: "Daily Publisher Revenue Decrease",
          url: "/main/publisher-decrease",
          prefetch: () => {
            queryClient.prefetchQuery(publisherDecreaseQueryOptions);
          },
        },
        {
          title: "Daily Publisher Revenue Increase",
          url: "/main/publisher-increase",
          prefetch: () => {
            queryClient.prefetchQuery(publisherIncreaseQueryOptions);
          },
        },
      ],
    },
    {
      title: "Daily Reports",
      id: "daily",
      items: [
        {
          title: "Revenue Decrease",
          url: "#",
        },
        {
          title: "Inventory Decrease",
          url: "#",
        },
        {
          title: "RPM Decrease",
          url: "#",
        },
        {
          title: "Revenue Increase",
          url: "#",
        },
        {
          title: "Inventory Increase",
          url: "#",
        },
        {
          title: "RPM Increase",
          url: "#",
        },
        {
          title: "New Placements",
          url: "/daily/new-placements",
          prefetch: () => {
            queryClient.prefetchQuery(newPlacementQueryOptions);
          },
        },
      ],
    },
    {
      title: "Hourly Reports",
      id: "hourly",
      items: [
        {
          title: "Revenue Decrease",
          url: "#",
        },
        {
          title: "Inventory Decrease",
          url: "#",
        },
        {
          title: "Revenue Increase",
          url: "#",
        },
        {
          title: "Inventory Increase",
          url: "#",
        },
        {
          title: "RPM Decrease",
          url: "#",
        },
      ],
    },
    {
      title: "Weekend Reports",
      id: "weekend",
      items: [
        {
          title: "Weekend Decrease",
          url: "#",
        },
        {
          title: "Weekend Increase",
          url: "#",
        },
        {
          title: "New Placements",
          url: "#",
        },
      ],
    },
    {
      title: "Weekly Reports",
      id: "weekly",
      items: [
        {
          title: "Revenue Weekly Graph",
          url: "/weekly/weekly-revenue",
          prefetch: () => {
            queryClient.prefetchQuery(newPlacementQueryOptions);
          },
        },
        {
          title: "Revenue Decrease",
          url: "#",
        },
        {
          title: "Revenue Increase",
          url: "#",
        },
        {
          title: "New Placements",
          url: "#",
        },
        {
          title: "Revenue Per Day",
          url: "#",
        },
      ],
    },
    {
      title: "Monthly Reports",
      id: "monthly",
      items: [
        {
          title: "Revenue Decrease",
          url: "#",
        },
        {
          title: "Revenue Increase",
          url: "#",
        },
        {
          title: "New Placements",
          url: "#",
        },
        {
          title: "Revenue Per Week",
          url: "#",
        },
      ],
    },
    {
      title: "A/B Testing",
      id: "testing",
      items: [
        {
          title: "Display",
          url: "#",
        },
        {
          title: "Video",
          url: "#",
        },
      ],
    },
    {
      title: "Others",
      id: "others",
      items: [
        {
          title: "Zero Impressions Yesterday",
          url: "#",
        },
        {
          title: "Negative Profit Yesterday",
          url: "#",
        },
        {
          title: "Bad Viewabilty",
          url: "#",
        },
      ],
    },
  ];

  const openFolderIndex = navigationList.findIndex((folder) =>
    pathname.startsWith(`/${folder.id}`)
  );

  const activePathIndex = navigationList[openFolderIndex]?.items?.findIndex(
    (item) => item.url === pathname
  );

  return { navigationList, openFolderIndex, activePathIndex };
};
