
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppAccessCard } from "./AppAccessCard";
import { UserDetail as UserDetailType } from "@/types";
import { ArrowLeft, UserX, UserPlus, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addAuditLog } from "@/data/auditLogs";

interface UserDetailProps {
  user: UserDetailType;
  onBack: () => void;
}

export function UserDetail({ user, onBack }: UserDetailProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOffboarding, setIsOffboarding] = useState(false);
  const [isOffboarded, setIsOffboarded] = useState(false);
  const [isAssignRoleDialogOpen, setIsAssignRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isRequestAccessDialogOpen, setIsRequestAccessDialogOpen] = useState(false);
  const [requestedApp, setRequestedApp] = useState("");
  const [requestedRole, setRequestedRole] = useState("");
  
  const handleOffboardUser = async () => {
    setIsDialogOpen(false);
    setIsOffboarding(true);
    
    // Simulate API call
    setTimeout(async () => {
      setIsOffboarding(false);
      setIsOffboarded(true);
      
      // Log the offboarding action
      await addAuditLog({
        action: "User Offboarded",
        performedBy: "Admin User", // In a real app, this would come from auth context
        targetUser: user.name,
        details: "All access has been revoked and accounts disabled."
      });
      
      toast({
        title: "User offboarded successfully",
        description: "All access has been revoked and accounts disabled.",
      });
    }, 2000);
  };

  const handleAssignRole = async () => {
    if (!selectedRole) return;
    
    // Simulate API call
    setTimeout(async () => {
      // Log the role assignment action
      await addAuditLog({
        action: "Role Assigned",
        performedBy: "Admin User", // In a real app, this would come from auth context
        targetUser: user.name,
        details: `Assigned ${selectedRole} role to user.`
      });
      
      setIsAssignRoleDialogOpen(false);
      
      toast({
        title: "Role assigned successfully",
        description: `The ${selectedRole} role has been assigned to ${user.name}.`,
      });
    }, 1000);
  };

  const handleRequestAccess = async () => {
    if (!requestedApp || !requestedRole) return;
    
    // Simulate API call
    setTimeout(async () => {
      // Log the access request
      await addAuditLog({
        action: "Access Requested",
        performedBy: "Admin User", // In a real app, this would come from auth context
        targetUser: user.name,
        targetApp: requestedApp,
        details: `Requested ${requestedRole} access to ${requestedApp}.`
      });
      
      setIsRequestAccessDialogOpen(false);
      setRequestedApp("");
      setRequestedRole("");
      
      toast({
        title: "Access request submitted",
        description: `The request for ${requestedApp} access has been submitted for approval.`,
      });
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-2"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </Button>
        <h2 className="text-2xl font-bold">User Access Details</h2>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <Badge 
                  className={cn(
                    "ml-2 text-white",
                    isOffboarded ? "bg-status-disabled" : "bg-status-active"
                  )}
                >
                  {isOffboarded ? "Disabled" : "Active"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {user.title} • {user.department}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Contact Information</h3>
              <div className="text-sm">
                <div className="mb-1">
                  <span className="text-muted-foreground">Email:</span> {user.email}
                </div>
                {user.phoneNumber && (
                  <div className="mb-1">
                    <span className="text-muted-foreground">Phone:</span> {user.phoneNumber}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Employment Details</h3>
              <div className="text-sm">
                <div className="mb-1">
                  <span className="text-muted-foreground">Join Date:</span> {user.joinDate}
                </div>
                {user.manager && (
                  <div className="mb-1">
                    <span className="text-muted-foreground">Manager:</span> {user.manager}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Application Access</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsRequestAccessDialogOpen(true)}
            disabled={isOffboarded}
          >
            <UserPlus className="h-4 w-4 mr-2" /> 
            Request Access
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAssignRoleDialogOpen(true)}
            disabled={isOffboarded}
          >
            <Shield className="h-4 w-4 mr-2" /> 
            Assign Role
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {user.applications.map((app) => (
          <AppAccessCard key={app.id} app={app} />
        ))}
      </div>
      
      <Separator className="my-8" />
      
      <div className="flex justify-center">
        <Button
          variant="destructive"
          size="lg"
          onClick={() => setIsDialogOpen(true)}
          disabled={isOffboarding || isOffboarded}
          className="px-8"
        >
          {isOffboarding ? (
            <span className="flex items-center">
              <span className="mr-2 animate-pulse-subtle">Offboarding User...</span>
            </span>
          ) : isOffboarded ? (
            <span className="flex items-center">
              <UserX size={18} className="mr-2" /> User Offboarded
            </span>
          ) : (
            <span className="flex items-center">
              <UserX size={18} className="mr-2" /> Offboard User
            </span>
          )}
        </Button>
      </div>
      
      {/* Offboarding Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Offboarding</DialogTitle>
            <DialogDescription>
              This action will revoke all access for {user.name} across all systems and mark
              the user as disabled. This process may take a few moments to complete.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted p-3 rounded-md text-sm">
            <p className="font-medium">The following will occur:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>All application access will be revoked</li>
              <li>User's account will be disabled</li>
              <li>Manager will be notified via email</li>
              <li>Audit logs will be generated</li>
            </ul>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleOffboardUser}
            >
              Proceed with Offboarding
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Assign Role Dialog */}
      <Dialog open={isAssignRoleDialogOpen} onOpenChange={setIsAssignRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Assign system-level roles to {user.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Role</label>
              <Select onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignRoleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignRole}
              disabled={!selectedRole}
            >
              Assign Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Request Access Dialog */}
      <Dialog open={isRequestAccessDialogOpen} onOpenChange={setIsRequestAccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Additional Access</DialogTitle>
            <DialogDescription>
              Request additional application access for {user.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Application</label>
              <Select onValueChange={setRequestedApp}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salesforce">Salesforce</SelectItem>
                  <SelectItem value="Google Workspace">Google Workspace</SelectItem>
                  <SelectItem value="AWS">AWS</SelectItem>
                  <SelectItem value="Microsoft 365">Microsoft 365</SelectItem>
                  <SelectItem value="Atlassian">Atlassian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Access Level</label>
              <Select onValueChange={setRequestedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRequestAccessDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestAccess}
              disabled={!requestedApp || !requestedRole}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
