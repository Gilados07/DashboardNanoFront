import { ChevronDown, MoreVertical, GalleryVerticalEnd } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar as BaseSideBar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset as MainArea,
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
import { useNavigationList } from "@/hooks/useNavigationList";
import { NavigationBreadcrumbs } from "./NavigationBreadcrumbs";
import { useAuth } from "@/contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isLoggedIn } = useAuth();

  return (
    <SidebarProvider>
      {isLoggedIn && <Sidebar />}
      <MainArea className="max-h-screen">
        {isLoggedIn && <TopBar />}
        <ContentArea>{children}</ContentArea>
      </MainArea>
    </SidebarProvider>
  );
}

const ContentArea = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full">{children}</div>;
};

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <BaseSideBar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="red">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Nano Dashboard</span>
                    <span className="">v1.0.0</span>
                  </div>
                  <MoreVertical className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuItem>
                  <Button onClick={() => logout()} variant="ghost">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Navigation />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </BaseSideBar>
  );
};

const Navigation = () => {
  const { navigationList, openFolderIndex, activePathIndex } =
    useNavigationList();

  return navigationList.map((item, folderIndex) => (
    <Collapsible key={item.title} defaultOpen={folderIndex === openFolderIndex}>
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
          {item.items?.map((subItem, itemIndex) => (
            <SidebarMenuItem
              key={subItem.title}
              onMouseEnter={subItem.prefetch}
            >
              <SidebarMenuButton
                asChild
                isActive={
                  itemIndex === activePathIndex &&
                  folderIndex === openFolderIndex
                }
              >
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
  ));
};

const TopBar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <NavigationBreadcrumbs />
      </div>
    </header>
  );
};
