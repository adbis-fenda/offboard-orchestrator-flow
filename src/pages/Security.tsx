
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistance } from "date-fns";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Shield, Check, X, AlertCircle } from "lucide-react";
import { getAccessRequests, updateAccessRequestStatus } from "@/data/accessRequests";

export default function SecurityPage() {
  const queryClient = useQueryClient();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [dialogAction, setDialogAction] = useState<"approve" | "deny" | null>(null);

  const { data: accessRequests, isLoading } = useQuery({
    queryKey: ["accessRequests"],
    queryFn: getAccessRequests
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ requestId, status }: { requestId: string, status: "approved" | "denied" }) => 
      updateAccessRequestStatus(requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accessRequests"] });
      const actionText = dialogAction === "approve" ? "approved" : "denied";
      toast({
        title: `Access request ${actionText}`,
        description: `The access request has been ${actionText} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update request: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    }
  });

  const handleAction = (requestId: string, action: "approve" | "deny") => {
    setSelectedRequestId(requestId);
    setDialogAction(action);
  };

  const confirmAction = () => {
    if (selectedRequestId && dialogAction) {
      updateStatusMutation.mutate({
        requestId: selectedRequestId,
        status: dialogAction === "approve" ? "approved" : "denied"
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <Shield className="mr-2" /> Security
          </h1>
          <div className="flex justify-center items-center min-h-[300px]">
            <p>Loading access requests...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const pendingRequests = accessRequests?.filter(req => req.status === "pending") || [];

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Shield className="mr-2" /> Security
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Access Requests</h2>
          
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <AlertCircle className="mx-auto mb-2 text-muted-foreground" />
                <p>No pending access requests</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{request.applicationName}</CardTitle>
                      <img 
                        src={request.applicationIcon} 
                        alt={request.applicationName} 
                        className="w-8 h-8 object-contain" 
                      />
                    </div>
                    <CardDescription>
                      Requested {formatDistance(new Date(request.requestDate), new Date(), { addSuffix: true })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={request.userAvatarUrl} />
                        <AvatarFallback>{request.userName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{request.userName}</p>
                        <p className="text-sm text-muted-foreground">{request.userEmail}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p><span className="font-medium">Requested Role:</span> {request.requestedRole}</p>
                      <p><span className="font-medium">Date:</span> {format(new Date(request.requestDate), 'MMM d, yyyy')}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-500 hover:bg-red-50"
                      onClick={() => handleAction(request.id, "deny")}
                    >
                      <X className="mr-1 h-4 w-4" /> Deny
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-600 hover:bg-green-50"
                      onClick={() => handleAction(request.id, "approve")}
                    >
                      <Check className="mr-1 h-4 w-4" /> Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!selectedRequestId && !!dialogAction} onOpenChange={(open) => {
        if (!open) {
          setSelectedRequestId(null);
          setDialogAction(null);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogAction === "approve" ? "Approve Access Request" : "Deny Access Request"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogAction === "approve" 
                ? "Are you sure you want to approve this access request? The user will be granted the requested permissions."
                : "Are you sure you want to deny this access request? The user will be notified that their request was rejected."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmAction}
              className={dialogAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {dialogAction === "approve" ? "Approve" : "Deny"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
