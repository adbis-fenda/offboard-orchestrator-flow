
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppAccessCard } from "@/components/AppAccessCard";
import { mockApps } from "@/data/applications";
import { useAuth } from "@/contexts/AuthContext";
import { ApplicationAccessRequestForm } from "@/components/ApplicationAccessRequestForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import type { Application } from "@/types";

export default function MyApplications() {
  const { user } = useAuth();
  const userId = user?.id || "1"; // Default to user 1 for demo if no user ID
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  // Fetch user's applications
  const { data: userApps, isLoading } = useQuery({
    queryKey: ["userApps", userId],
    queryFn: () => Promise.resolve(mockApps[userId] || []),
  });

  const handleRequestSubmitted = () => {
    setIsRequestFormOpen(false);
    toast({
      title: "Access request submitted",
      description: "Your request has been submitted and is pending approval.",
    });
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <Button onClick={() => setIsRequestFormOpen(true)}>Request New Access</Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p>Loading your applications...</p>
          </div>
        ) : userApps?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userApps.map((app: Application) => (
              <AppAccessCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="mb-4">You don't have access to any applications yet.</p>
              <Button onClick={() => setIsRequestFormOpen(true)}>Request Access</Button>
            </CardContent>
          </Card>
        )}

        <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Application Access</DialogTitle>
            </DialogHeader>
            <ApplicationAccessRequestForm onSubmitted={handleRequestSubmitted} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
