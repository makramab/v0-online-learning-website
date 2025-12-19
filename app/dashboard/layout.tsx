import { UserProvider } from "@/contexts/user-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { ContinueLearningProvider } from "@/contexts/continue-learning-context"
import { SidebarProvider } from "@/contexts/sidebar-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <NotificationProvider>
        <ContinueLearningProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ContinueLearningProvider>
      </NotificationProvider>
    </UserProvider>
  )
}
