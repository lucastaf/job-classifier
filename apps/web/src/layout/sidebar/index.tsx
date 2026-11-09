import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarItem from "./side-bar-item";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();

  return (
    <Sidebar>
      <SidebarHeader>Job Classifier</SidebarHeader>
      <SidebarContent>
        <SideBarItem title={t("sidebar.jobs")}/>
        <SideBarItem title={t("sidebar.skills")}/>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
