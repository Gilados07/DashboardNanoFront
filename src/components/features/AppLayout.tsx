import { ChevronDown, GalleryVerticalEnd } from "lucide-react";
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
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { navigationList } from "@/constants/navigationList";
import { NavigationBreadcrumbs } from "./NavigationBreadcrumbs";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
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
              {navigationList.map((item, index) => (
                <Collapsible key={item.title} defaultOpen={index === 0}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="w-full justify-between hover:bg-sidebar-accent/80">
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-4 pt-1">
                      {item.items?.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NavigationBreadcrumbs />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
