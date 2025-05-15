import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface UserCardProps {
  user: User;
  onReviewAccess: (userId: string) => void;
  isAdmin?: boolean;
}

export function UserCard({ user, onReviewAccess, isAdmin }: UserCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-status-active";
      case "pending":
        return "bg-status-pending";
      case "disabled":
        return "bg-status-disabled";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      case "disabled":
        return "Disabled";
      default:
        return "Unknown";
    }
  };

  return (
    <Card
      className={cn(
        "border overflow-hidden transition-all duration-200",
        isHovered && "border-brand-purple shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Badge
            className={cn(
              "rounded-full px-2 text-xs font-medium text-white",
              getStatusColor(user.status)
            )}
          >
            {getStatusText(user.status)}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-lg">{user.name}</CardTitle>
        <CardDescription>
          {user.title} • {user.department}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="text-sm text-muted-foreground mb-3">
          Last active: {user.lastActive}
        </div>
        <Button
          variant="default"
          className="w-full bg-brand-purple hover:bg-brand-light-purple"
          onClick={() => {
            if (user.status === "disabled") {
              toast({
                title: "User is already disabled",
                description: "This user has already been offboarded.",
              });
              return;
            }
            onReviewAccess(user.id);
          }}
        >
          Review Access
        </Button>
      </CardContent>
    </Card>
  );
}
