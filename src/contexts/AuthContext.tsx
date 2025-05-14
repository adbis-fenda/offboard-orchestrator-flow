
import React, { createContext, useState, useContext, useEffect } from "react";

// Define user types and roles
export type UserRole = "admin" | "user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as UserRole,
    avatarUrl: "https://github.com/shadcn.png",
  },
  {
    id: "user1",
    name: "Normal User",
    email: "user@example.com",
    password: "user123",
    role: "user" as UserRole,
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const matchedUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      // Remove password before storing
      const { password, ...secureUser } = matchedUser;
      setUser(secureUser);
      localStorage.setItem("authUser", JSON.stringify(secureUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
