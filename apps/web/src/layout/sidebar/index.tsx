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
        <SideBarItem link="/jobs" title={t("sidebar.jobs")} icon={<BriefcaseBusiness />} />
        <SideBarItem link="/skills" title={t("sidebar.skills")} icon={<Medal />} />
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
