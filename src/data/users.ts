
import { User, UserDetail } from "@/types";
import { mockApps } from "./applications";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    department: "Engineering",
    title: "Senior Developer",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    lastActive: "Today at 10:42 AM",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    department: "Product",
    title: "Product Manager",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    lastActive: "Today at 9:15 AM",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    title: "Financial Analyst",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    lastActive: "Yesterday at 4:30 PM",
  },
  {
    id: "4",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    department: "Marketing",
    title: "Marketing Specialist",
    status: "pending",
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    lastActive: "Today at 11:20 AM",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    department: "Operations",
    title: "Operations Manager",
    status: "disabled",
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    lastActive: "3 months ago",
  },
  {
    id: "6",
    name: "Amanda Rodriguez",
    email: "amanda.rodriguez@example.com",
    department: "Customer Support",
    title: "Support Lead",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg",
    lastActive: "Today at 8:45 AM",
  },
];

export const getUserDetail = (id: string): UserDetail | undefined => {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return undefined;
  
  return {
    ...user,
    applications: mockApps[id] || [],
    joinDate: "March 15, 2022",
    manager: "Robert Johnson",
    phoneNumber: "+1 (555) 123-4567",
  };
};

// Filter users based on search query
export const filterUsers = (query: string): User[] => {
  if (!query) return mockUsers;
  
  const lowerQuery = query.toLowerCase();
  return mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.department.toLowerCase().includes(lowerQuery) ||
      user.title.toLowerCase().includes(lowerQuery)
  );
};
