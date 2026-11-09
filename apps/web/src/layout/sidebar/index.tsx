import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarItem from "./side-bar-item";
import { useTranslation } from "react-i18next";
import { BriefcaseBusiness, Medal } from "lucide-react";

export function AppSidebar() {
  const { t } = useTranslation();

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SideBarItem title={t("sidebar.jobs")} icon={<BriefcaseBusiness />} />
        <SideBarItem title={t("sidebar.skills")} icon={<Medal />} />
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
