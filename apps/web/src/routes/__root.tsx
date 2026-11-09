import Layout from "@/layout/layout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../i18n";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createRootRoute({
  component: () => (
    <>
      <TooltipProvider>
        <Layout>
          <Outlet />
        </Layout>
      </TooltipProvider>
    </>
  ),
});
