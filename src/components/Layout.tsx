
import { ReactNode } from "react";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export function Layout({ children, searchQuery, setSearchQuery }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex flex-1 w-full">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto bg-gray-50">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
