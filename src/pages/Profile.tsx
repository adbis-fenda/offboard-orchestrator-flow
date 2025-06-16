
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, Calendar, User, Building } from "lucide-react";
import { getUserDetail } from "@/data/users";
import { UserDetail } from "@/types";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserDetail();
    }
  }, [userId]);

  const fetchUserDetail = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const detail = await getUserDetail(userId);
      setUserDetail(detail || null);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: UserDetail["status"]) => {
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

  const getStatusText = (status: UserDetail["status"]) => {
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

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex justify-center items-center min-h-[300px]">
            <p>Loading user profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!userDetail) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex justify-center items-center min-h-[300px]">
            <p>User not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userDetail.avatarUrl} alt={userDetail.name} />
              <AvatarFallback className="text-2xl">
                {userDetail.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{userDetail.name}</h1>
                <Badge
                  className={`rounded-full px-3 py-1 text-white ${getStatusColor(userDetail.status)}`}
                >
                  {getStatusText(userDetail.status)}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground mb-1">{userDetail.title}</p>
              <p className="text-lg text-muted-foreground">{userDetail.department}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userDetail.email}</span>
              </div>
              {userDetail.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userDetail.phoneNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {userDetail.joinDate}</span>
              </div>
              {userDetail.manager && (
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Manager: {userDetail.manager}</span>
                </div>
              )}
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Last Active</p>
                <p className="text-sm font-medium">{userDetail.lastActive}</p>
              </div>
            </CardContent>
          </Card>

          {/* Applications Access */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Application Access</CardTitle>
              <CardDescription>
                Applications and permissions for {userDetail.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userDetail.applications.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {userDetail.applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-10 h-10 rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-sm text-muted-foreground">{app.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {app.role}
                        </Badge>
                        {app.lastUsed && (
                          <p className="text-xs text-muted-foreground">
                            Last used: {app.lastUsed}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No applications assigned
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
