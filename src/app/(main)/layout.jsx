import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/my-app/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}
