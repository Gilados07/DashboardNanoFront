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
import { navigationList } from "@/constants/navigationList";

export const NavigationBreadcrumbs = React.memo(() => {
  const { folderName, path } = useNavigationBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink className="text-white" href="#">
            {folderName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">{path}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
});

NavigationBreadcrumbs.displayName = "NavigationBreadcrumbs";

const useNavigationBreadcrumbs = () => {
  const { pathname } = useLocation();
  const [folderUrl, pathUrl] = pathname.split("/").slice(1);

  const folder = navigationList.find((item) => item.id === folderUrl);
  const path = folder?.items.find((item) => item.url.includes(pathUrl));

  return {
    folderName: folder?.title,
    path: path?.title,
  };
};