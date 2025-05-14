
import { simulateApiCall } from "./utils";

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  targetUser?: string;
  targetApp?: string;
  details: string;
}

// Sample audit log data
export const mockAuditLogs: AuditLog[] = [
  {
    id: "log1",
    timestamp: "2025-05-14T10:30:45",
    action: "User Access Revoked",
    performedBy: "Admin User",
    targetUser: "Michael Brown",
    targetApp: "AWS Console",
    details: "Access to AWS Console was revoked due to role change"
  },
  {
    id: "log2",
    timestamp: "2025-05-14T09:15:22",
    action: "New User Created",
    performedBy: "Admin User",
    targetUser: "Emily Johnson",
    details: "New user account created for Engineering department"
  },
  {
    id: "log3",
    timestamp: "2025-05-13T16:45:12",
    action: "Role Changed",
    performedBy: "Admin User",
    targetUser: "Jessica Taylor",
    details: "Role changed from 'Viewer' to 'Editor' for Marketing applications"
  },
  {
    id: "log4",
    timestamp: "2025-05-13T14:20:33",
    action: "License Updated",
    performedBy: "Admin User",
    targetApp: "Salesforce",
    details: "Added 5 additional licenses for Sales team"
  },
  {
    id: "log5",
    timestamp: "2025-05-12T11:05:18",
    action: "Access Request Approved",
    performedBy: "Admin User",
    targetUser: "David Wilson",
    targetApp: "Figma",
    details: "Approved request for Editor access to Figma"
  }
];

export async function getAuditLogs(): Promise<AuditLog[]> {
  // Fix: Use the generic version of simulateApiCall to match the expected types
  return simulateApiCall<AuditLog[]>(mockAuditLogs);
}

export async function addAuditLog(log: Omit<AuditLog, "id" | "timestamp">): Promise<AuditLog> {
  const newLog: AuditLog = {
    id: `log${mockAuditLogs.length + 1}`,
    timestamp: new Date().toISOString(),
    ...log
  };
  
  mockAuditLogs.unshift(newLog);
  // Fix: Use the generic version of simulateApiCall to match the expected types
  return simulateApiCall<AuditLog>(newLog);
}
