
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  LayoutDashboard, 
  Shield, 
  Settings, 
  LogOut,
  CreditCard,
  FileBarChart,
  LayoutGrid
} from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export function AppSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate("/")}>
                  <div className="flex items-center">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate("/my-applications")}>
                  <div className="flex items-center">
                    <LayoutGrid />
                    <span>My Applications</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {user.role === "admin" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate("/users")}>
                      <div className="flex items-center">
                        <Users />
                        <span>Users</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate("/compliance")}>
                      <div className="flex items-center">
                        <FileBarChart />
                        <span>Compliance</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate("/security")}>
                      <div className="flex items-center">
                        <Shield />
                        <span>Security</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate("/spend-management")}>
                      <div className="flex items-center">
                        <CreditCard />
                        <span>Spend Management</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center">
                <Settings />
                <span>Settings</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleLogout}>
              <div className="flex items-center text-red-400 hover:text-red-500">
                <LogOut />
                <span>Log Out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
