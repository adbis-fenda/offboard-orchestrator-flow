
import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import { UserDetail as UserDetailComponent } from "@/components/UserDetail";
import { StatCard } from "@/components/StatCard";
import { filterUsers, getUserDetail } from "@/data/users";
import { mockDashboardStats } from "@/data/dashboardStats";
import type { User, UserDetail } from "@/types";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

// Sample spend management data
const applications = [
  { name: 'ServiceNow', seats: 50, cost: '9.355,40$', icon: '/servicenow.png' },
  { name: 'HubSpot', seats: 50, cost: '4.115,40$', icon: '/hubspot.png' },
  { name: 'Slack', seats: 50, cost: '2.100,40$', icon: '/slack.png' },
  { name: 'MongoDB', seats: 50, cost: '355,40$', icon: '/mongodb.png' },
];

const Index: React.FC = () => {
  const { user: authUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentUserData, setCurrentUserData] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check for userId in URL params to show user detail
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    
    if (userId) {
      handleReviewAccess(userId);
    } else if (authUser && authUser.role !== "admin") {
      // For normal users, automatically load their own data
      fetchCurrentUserData();
    }
  }, [location.search, authUser]);

  // Fetch current user data for normal users
  const fetchCurrentUserData = async () => {
    if (!authUser) return;
    
    setIsLoading(true);
    // For demo purposes, we'll use the first user in the list as the current user
    // In a real app, this would fetch the data for the authenticated user from the backend
    const userDetail = await getUserDetail("1"); // Using ID 1 as a placeholder for normal user
    setCurrentUserData(userDetail || null);
    setIsLoading(false);
  };

  // Fetch and filter users whenever the search query changes (only for admins)
  useEffect(() => {
    if (authUser?.role !== "admin") return;
    
    let cancelled = false;
    setIsLoading(true);
    filterUsers(searchQuery).then((users) => {
      if (!cancelled) setFilteredUsers(users);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [searchQuery, authUser]);

  // Handle reviewing user access
  const handleReviewAccess = async (userId: string) => {
    setIsLoading(true);
    const detail = await getUserDetail(userId);
    if (detail) {
      // For admins, this sets selectedUserDetail
      // For normal users, this sets their own data
      if (authUser?.role === "admin") {
        navigate(`/?userId=${userId}`);
      } else {
        setCurrentUserData(detail);
      }
    }
    setIsLoading(false);
  };

  // Go back to user list
  const handleBackToUsers = () => {
    if (authUser?.role === "admin") {
      navigate('/');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 p-6 bg-background overflow-auto space-y-8">
            {/* For admin showing another user's details OR normal user showing their own details */}
            {(location.search.includes('userId') && authUser?.role === "admin") || 
             (authUser?.role !== "admin" && currentUserData) ? (
              <UserDetailComponent 
                user={authUser?.role === "admin" ? 
                  (filteredUsers.find(u => u.id === new URLSearchParams(location.search).get('userId')) as UserDetail) : 
                  (currentUserData as UserDetail)} 
                onBack={handleBackToUsers} 
              />
            ) : (
              <>
                {/* Dashboard Overview Stats - visible to all */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockDashboardStats.map((stat, idx) => (
                      <StatCard key={idx} stat={stat} />
                    ))}
                  </div>
                </div>

                {/* Spend Management (only visible for admin) */}
                {authUser?.role === "admin" && (
                  <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Spend Management</h2>
                    <h3 className="text-lg font-medium mb-2">Most Used Applications</h3>
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={app.icon} alt={`${app.name} icon`} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-sm text-muted-foreground">{app.seats} Seats</p>
                            </div>
                          </div>
                          <p className="font-semibold">{app.cost} / Month</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* User Directory - only visible to admins */}
                {authUser?.role === "admin" ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
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
                            isAdmin={authUser?.role === "admin"}
                          />
                        ))
                      ) : (
                        <div className="col-span-3 py-12 text-center text-muted-foreground">
                          No users found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* For normal users - show a button to view their access */
                  <div className="mt-6">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">My Access</h2>
                      <p className="text-muted-foreground mb-4">
                        View your application access and request additional permissions.
                      </p>
                      <button 
                        className="bg-brand-purple hover:bg-brand-light-purple text-white px-4 py-2 rounded"
                        onClick={() => fetchCurrentUserData()}
                      >
                        View My Access
                      </button>
                    </Card>
                  </div>
                )}
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
