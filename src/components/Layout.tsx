
import { ReactNode } from "react";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export function Layout({ children, searchQuery, setSearchQuery }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <main className="flex-1 overflow-auto bg-gray-50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
