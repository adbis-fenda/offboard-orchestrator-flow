
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Application } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export function AppAccessCard({ app }: { app: Application }) {
  const { toast } = useToast();
  const [isRevoking, setIsRevoking] = useState(false);
  const [isRevoked, setIsRevoked] = useState(false);

  const handleRevoke = () => {
    setIsRevoking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRevoking(false);
      setIsRevoked(true);
      toast({
        title: "Access Revoked",
        description: `Access to ${app.name} has been successfully revoked.`,
      });
    }, 800);
  };

  return (
    <Card className={cn("border", isRevoked && "opacity-60")}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0">
        <div className="mr-3">
          <div className="bg-accent p-2 rounded-md">
            <img 
              src={app.icon} 
              alt={`${app.name} icon`} 
              className="w-8 h-8"
            />
          </div>
        </div>
        <div className="flex-1">
          <CardTitle className="text-base flex items-center">
            {app.name}
          </CardTitle>
          <CardDescription>{app.type}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className="bg-muted">
            Role: {app.role}
          </Badge>
          {!isRevoked ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleRevoke}
              disabled={isRevoking}
              className="ml-2"
            >
              {isRevoking ? "Revoking..." : "Revoke"}
            </Button>
          ) : (
            <Badge variant="outline" className="bg-status-disabled text-white">
              Revoked
            </Badge>
          )}
        </div>
        {app.lastUsed && (
          <div className="text-xs text-muted-foreground mt-2">
            Last used: {app.lastUsed}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
