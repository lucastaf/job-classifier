import Layout from "@/layout/layout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../i18n"

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  ),
});
