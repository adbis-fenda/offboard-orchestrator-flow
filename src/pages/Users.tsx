
// src/pages/Users.tsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterUsers, getUserDetail, mockUsers } from "@/data/users";
import { User, UserDetail } from "@/types";
import { UserPlusIcon, UserX, UserCog, FileBarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addAuditLog } from "@/data/auditLogs";

export default function UsersPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    title: "",
  });
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    filterUsers(searchQuery)
      .then((result) => {
        setUsers(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, [searchQuery]);

  const handleCreateUser = async () => {
    // In a real app, this would connect to an API
    const newUserId = `${mockUsers.length + 1}`;
    
    const createdUser = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      department: newUser.department,
      title: newUser.title,
      status: 'pending' as const,
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg", // Default avatar
      lastActive: "Just now",
    };
    
    // Add to mock users (in real app, this would be persisted to a database)
    mockUsers.push(createdUser);
    
    // Record audit log
    await addAuditLog({
      action: "New User Created",
      performedBy: "Admin User", // Would come from auth context in real app
      targetUser: createdUser.name,
      details: `New user account created in ${createdUser.department} department`
    });
    
    setIsNewUserDialogOpen(false);
    setNewUser({ name: "", email: "", department: "", title: "" });
    
    toast({
      title: "Employee Created",
      description: `${createdUser.name} has been successfully added.`,
    });
    
    // Refresh user list
    const updatedUsers = await filterUsers(searchQuery);
    setUsers(updatedUsers);
  };

  const handleViewUserDetail = (userId: string) => {
    navigate(`/?userId=${userId}`);
  };

  const handleChangeRole = async (userId: string) => {
    setIsLoading(true);
    try {
      const user = await getUserDetail(userId);
      if (user) {
        setSelectedUser(user);
        setIsRoleDialogOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser || !selectedRole) return;
    
    // In a real app, this would connect to an API
    // Record audit log
    await addAuditLog({
      action: "Role Changed",
      performedBy: "Admin User", // Would come from auth context in real app
      targetUser: selectedUser.name,
      details: `Role updated to ${selectedRole}`
    });
    
    setIsRoleDialogOpen(false);
    setSelectedRole("");
    
    toast({
      title: "Role Updated",
      description: `${selectedUser.name}'s role has been updated to ${selectedRole}.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 p-6 bg-background overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Users & Access Management</h1>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsNewUserDialogOpen(true)}
                  className="bg-brand-purple hover:bg-brand-light-purple"
                >
                  <UserPlusIcon size={18} className="mr-2" />
                  Create Employee
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/compliance")}
                >
                  <FileBarChart size={18} className="mr-2" />
                  Compliance Reports
                </Button>
              </div>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <img 
                                src={user.avatarUrl} 
                                alt={user.name} 
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>{user.title}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                user.status === "active" ? "bg-status-active text-white" :
                                user.status === "pending" ? "bg-status-pending text-white" :
                                "bg-status-disabled text-white"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewUserDetail(user.id)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleChangeRole(user.id)}
                              >
                                <UserCog size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        <SidebarTrigger className="fixed top-3 right-3" />
      </div>
      
      {/* Create New Employee Dialog */}
      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                value={newUser.name} 
                onChange={e => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={newUser.email} 
                onChange={e => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">Department</label>
                <Input 
                  id="department" 
                  value={newUser.department} 
                  onChange={e => setNewUser({...newUser, department: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  value={newUser.title} 
                  onChange={e => setNewUser({...newUser, title: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewUserDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateUser}
              disabled={!newUser.name || !newUser.email || !newUser.department || !newUser.title}
            >
              Create Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center">
                <img 
                  src={selectedUser.avatarUrl} 
                  alt={selectedUser.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium">{selectedUser.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Select Role</label>
                <Select onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Standard User</SelectItem>
                    <SelectItem value="power_user">Power User</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleRoleUpdate}
              disabled={!selectedRole}
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
