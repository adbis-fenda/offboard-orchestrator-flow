
// src/data/users.ts

import { User, UserDetail } from "@/types";
import { mockApps } from "./applications";

/**
 * Simulates an API call by resolving the given data after an optional delay.
 */
export function simulateApiCall<T>(data: T, delay = 300): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

/**
 * Sample user data
 */
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

/**
 * Filter users based on a search query (case-insensitive).
 * Returns a promise to simulate async behavior.
 */
export async function filterUsers(query: string): Promise<User[]> {
  const lowerQuery = query.trim().toLowerCase();
  const results = !lowerQuery
    ? mockUsers
    : mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery) ||
          user.department.toLowerCase().includes(lowerQuery) ||
          user.title.toLowerCase().includes(lowerQuery)
      );
  return simulateApiCall(results);
}

/**
 * Fetch detailed info for a single user by ID, including applications.
 * Returns a promise to simulate async behavior.
 */
export async function getUserDetail(id: string): Promise<UserDetail | undefined> {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return simulateApiCall(undefined);

  const detail: UserDetail = {
    ...user,
    applications: mockApps[id] || [],
    joinDate: "March 15, 2022",
    manager: "Robert Johnson",
    phoneNumber: "+1 (555) 123-4567",
  };
  return simulateApiCall(detail);
}