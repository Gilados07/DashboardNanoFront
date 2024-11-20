import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { useNavigationList } from "@/hooks/useNavigationList";

export const NavigationBreadcrumbs = React.memo(() => {
  const { folderName, path } = useNavigationBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink className="select-none">{folderName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage className="select-none">{path}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
});

NavigationBreadcrumbs.displayName = "NavigationBreadcrumbs";

const useNavigationBreadcrumbs = () => {
  const { pathname } = useLocation();
  const { navigationList } = useNavigationList();
  const [folderUrl, pathUrl] = pathname.split("/").slice(1);

  const folder = navigationList.find((item) => item.id === folderUrl);
  const path = folder?.items.find((item) => item.url.includes(pathUrl));

  return {
    folderName: folder?.title,
    path: path?.title,
  };
};
