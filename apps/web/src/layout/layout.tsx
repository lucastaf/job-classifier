import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/layout/sidebar/index"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}