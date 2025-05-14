// src/pages/Users.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";

interface User {
  id: string;
  name: string;
  applications: string[];
}

// TODO: replace with real data fetching
const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", applications: ["ServiceNow", "HubSpot"] },
  { id: "2", name: "Bob Lee",       applications: ["Slack", "MongoDB"] },
  { id: "3", name: "Carol Smith",   applications: ["ServiceNow"] },
];

export default function UsersPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 bg-background overflow-auto">
            <Header searchQuery="" setSearchQuery={() => {}} />
            <h1 className="text-2xl font-bold mb-6">Users & Access</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUsers.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">Applications</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {user.applications.map((app) => (
                        <li key={app}>{app}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <SidebarTrigger className="fixed top-3 right-3" />
      </div>
    </SidebarProvider>
  );
}