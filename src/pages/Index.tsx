
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import { UserDetail } from "@/components/UserDetail";
import { StatCard } from "@/components/StatCard";
import { filterUsers, getUserDetail, mockDashboardStats, simulateApiCall } from "@/data/mockData";
import { UserDetail as UserDetailType } from "@/types";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(filterUsers(""));
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter users when search query changes
  useEffect(() => {
    setFilteredUsers(filterUsers(searchQuery));
  }, [searchQuery]);

  // Handle reviewing user access
  const handleReviewAccess = (userId: string) => {
    setIsLoading(true);
    setSelectedUserId(userId);
    
    // Simulate API call to fetch user details
    simulateApiCall(`/api/users/${userId}/details`)
      .then(() => {
        const userDetail = getUserDetail(userId);
        if (userDetail) {
          setSelectedUserDetail(userDetail);
        }
        setIsLoading(false);
      });
  };

  // Go back to user list
  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setSelectedUserDetail(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 p-6 bg-background overflow-auto">
            {selectedUserId && selectedUserDetail ? (
              <UserDetail user={selectedUserDetail} onBack={handleBackToUsers} />
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockDashboardStats.map((stat, index) => (
                      <StatCard key={index} stat={stat} />
                    ))}
                  </div>
                </div>

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
                    filteredUsers.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onReviewAccess={handleReviewAccess}
                      />
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
