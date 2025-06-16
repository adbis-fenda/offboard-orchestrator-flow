
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SpendManagement from "./pages/SpendManagement";
import UsersPage from "@/pages/Users";
import CompliancePage from "@/pages/Compliance";
import SecurityPage from "@/pages/Security";
import MyApplications from "@/pages/MyApplications";
import ProfilePage from "@/pages/Profile";
import Login from "@/pages/Login";

const queryClient = new QueryClient();

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: "admin" | "user" | undefined;
  adminForbidden?: boolean; // New prop to forbid admins from accessing certain routes
}

const ProtectedRoute = ({ element, requiredRole, adminForbidden }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific role is required and user doesn't have it
  if (requiredRole && user.role !== requiredRole && requiredRole === "admin") {
    return <Navigate to="/" replace />;
  }
  
  // If admins are forbidden from this route and user is admin
  if (adminForbidden && user.role === "admin") {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute element={<Index />} />} />
      <Route path="/my-applications" element={<ProtectedRoute element={<MyApplications />} adminForbidden={true} />} />
      <Route path="/spend-management" element={<ProtectedRoute element={<SpendManagement />} requiredRole="admin" />} />
      <Route path="/users" element={<ProtectedRoute element={<UsersPage />} requiredRole="admin" />} />
      <Route path="/compliance" element={<ProtectedRoute element={<CompliancePage />} requiredRole="admin" />} />
      <Route path="/security" element={<ProtectedRoute element={<SecurityPage />} requiredRole="admin" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
