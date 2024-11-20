import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  GalleryVerticalEnd,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "./Table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { useState } from "react";

const data = {
  navMain: [
    {
      title: "Main Queries",
      url: "#",
      items: [
        {
          title: "Daily Recap Report",
          url: "/",
        },
        {
          title: "Daily Publisher Revenue Decrease",
          url: "/main/publisher-decrease",
        },
        {
          title: "Daily Publisher Revenue Increase",
          url: "/main/publisher-increase",
        },
      ],
    },
    {
      title: "Daily Reports",
      url: "#",
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
        },
      ],
    },
    {
      title: "Hourly Reports",
      url: "#",
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
      url: "#",
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
      url: "#",
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
          title: "Revenue Per Day",
          url: "#",
        },
      ],
    },

    {
      title: "Monthly Reports",
      url: "#",
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
      url: "#",
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
      url: "#",
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
  ],
};
interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [takingUrlForBreadcrumbs, setTakingUrlForBreadcrumbs] = useState("Daily Recap");
  const [takingHeaderUrlForBreadcrumbs, setHeaderUrlForBreadcrumbs] = useState("Main Queries")
  function handleBreadcrumbUpdate(value:string){
    setTakingUrlForBreadcrumbs(value)
  }
  function handleBreadcrumbHeaderUpdate(value:string){
    setHeaderUrlForBreadcrumbs(value)
  }
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Nano Dashboard</span>
                    <span className="">v1.0.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item, index) => (
                <Collapsible key={item.title} defaultOpen={index === 0}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem onClick={()=> handleBreadcrumbHeaderUpdate(item.title)}>
                      <SidebarMenuButton className="w-full justify-between  bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-4 pt-1">
                      {item.items?.map((subItem) => (
                        <SidebarMenuItem key={subItem.title} onClick={()=> handleBreadcrumbUpdate(subItem.title)}>
                          
                          <SidebarMenuButton asChild>
                            <Link
                              to={subItem.url}
                              className="flex w-full items-center :focus"
                            >
                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="max-h-40">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-gradient-to-r from-fuchsia-400 to-purple-600">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className="text-white" href="#">
                    {takingHeaderUrlForBreadcrumbs}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {takingUrlForBreadcrumbs}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );

}
