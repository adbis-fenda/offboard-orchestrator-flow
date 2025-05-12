
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import { UserDetail as UserDetailComponent } from "@/components/UserDetail";
import { StatCard } from "@/components/StatCard";
import { filterUsers, getUserDetail } from "@/data/users";
import { mockDashboardStats } from "@/data/dashboardStats";
import type { User, UserDetail } from "@/types";

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch and filter users whenever the search query changes
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    filterUsers(searchQuery).then((users) => {
      if (!cancelled) setFilteredUsers(users);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [searchQuery]);

  // Handle reviewing user access
  const handleReviewAccess = async (userId: string) => {
    setIsLoading(true);
    const detail = await getUserDetail(userId);
    if (detail) {
      setSelectedUserDetail(detail);
    }
    setIsLoading(false);
  };

  // Go back to user list
  const handleBackToUsers = () => {
    setSelectedUserDetail(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 p-6 bg-background overflow-auto">
            {selectedUserDetail ? (
              <UserDetailComponent user={selectedUserDetail} onBack={handleBackToUsers} />
            ) : (
              <>
                {/* Dashboard Overview Stats */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockDashboardStats.map((stat, idx) => (
                      <StatCard key={idx} stat={stat} />
                    ))}
                  </div>
                </div>

                {/* User Directory */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">User Directory</h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredUsers.length} users found
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    <div className="col-span-3 py-12 text-center text-muted-foreground">
                      Loading...
                    </div>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <UserCard key={user.id} user={user} onReviewAccess={handleReviewAccess} />
                    ))
                  ) : (
                    <div className="col-span-3 py-12 text-center text-muted-foreground">
                      No users found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <SidebarTrigger className="fixed top-3 right-3" />
      </div>
    </SidebarProvider>
  );
};

export default Index;