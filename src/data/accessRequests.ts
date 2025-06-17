import { simulateApiCall } from "./utils";

export interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
  applicationId: string;
  applicationName: string;
  applicationIcon: string;
  requestedRole: string;
  requestDate: string;
  status: "pending" | "approved" | "denied";
  reason?: string;
}

// Sample access request data
export const mockAccessRequests: AccessRequest[] = [
  {
    id: "req1",
    userId: "3",
    userName: "Michael Brown",
    userEmail: "michael.brown@example.com",
    userAvatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    applicationId: "app1",
    applicationName: "Slack",
    applicationIcon: "/slack.png",
    requestedRole: "Admin",
    requestDate: "2025-05-13T15:30:45",
    status: "pending"
  },
  {
    id: "req2",
    userId: "4",
    userName: "Jessica Taylor",
    userEmail: "jessica.taylor@example.com",
    userAvatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    applicationId: "app2",
    applicationName: "MongoDB",
    applicationIcon: "/mongodb.png",
    requestedRole: "Write",
    requestDate: "2025-05-14T09:15:22",
    status: "pending"
  },
  {
    id: "req3",
    userId: "6",
    userName: "Amanda Rodriguez",
    userEmail: "amanda.rodriguez@example.com",
    userAvatarUrl: "https://randomuser.me/api/portraits/women/63.jpg",
    applicationId: "app3",
    applicationName: "HubSpot",
    applicationIcon: "/hubspot.png",
    requestedRole: "Read",
    requestDate: "2025-05-14T11:05:18",
    status: "pending"
  }
];

export async function getAccessRequests(): Promise<AccessRequest[]> {
  const result = await simulateApiCall("access/requests", mockAccessRequests);
  // Return the actual data, not the wrapper object
  return mockAccessRequests;
}

interface CreateAccessRequestParams {
  userId: string;
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
  applicationId: string;
  applicationName: string;
  applicationIcon: string;
  requestedRole: string;
  reason?: string;
}

export async function createAccessRequest(params: CreateAccessRequestParams): Promise<AccessRequest> {
  const newRequest: AccessRequest = {
    id: `req${mockAccessRequests.length + 1}`,
    ...params,
    requestDate: new Date().toISOString(),
    status: "pending"
  };
  
  mockAccessRequests.push(newRequest);
  
  // Add this action to audit logs
  const { addAuditLog } = await import("./auditLogs");
  await addAuditLog({
    action: "Access Request Created",
    performedBy: params.userName,
    targetUser: params.userName,
    targetApp: params.applicationName,
    details: `Requested ${params.requestedRole} access to ${params.applicationName}`
  });
  
  return simulateApiCall("access/requests/create", newRequest);
}

export async function updateAccessRequestStatus(
  requestId: string, 
  newStatus: "approved" | "denied", 
  reason?: string
): Promise<AccessRequest> {
  const requestIndex = mockAccessRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) {
    throw new Error("Access request not found");
  }
  
  mockAccessRequests[requestIndex] = {
    ...mockAccessRequests[requestIndex],
    status: newStatus,
    reason
  };
  
  // Add this action to audit logs
  const { addAuditLog } = await import("./auditLogs");
  await addAuditLog({
    action: newStatus === "approved" ? "Access Request Approved" : "Access Request Denied",
    performedBy: "Admin User",
    targetUser: mockAccessRequests[requestIndex].userName,
    targetApp: mockAccessRequests[requestIndex].applicationName,
    details: `${newStatus === "approved" ? "Approved" : "Denied"} request for ${mockAccessRequests[requestIndex].requestedRole} access to ${mockAccessRequests[requestIndex].applicationName}`
  });
  
  return simulateApiCall("access/requests/update", mockAccessRequests[requestIndex]);
}
