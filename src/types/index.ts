
export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  title: string;
  status: 'active' | 'disabled' | 'pending';
  avatarUrl: string;
  lastActive: string;
}

export interface Application {
  id: string;
  name: string;
  type: string;
  icon: string;
  role: string;
  lastUsed?: string;
}

export interface UserDetail extends User {
  applications: Application[];
  joinDate: string;
  manager?: string;
  phoneNumber?: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  direction?: 'up' | 'down' | 'neutral';
}

export interface SubscriptionCost {
  id: string;
  appId: string;
  appName: string;
  costPerSeat: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  totalSeats: number;
  activeSeats: number;
  lastUpdated: string;
  icon: string;
}

export interface SpendManagementStat {
  label: string;
  value: string | number;
  previousValue?: string | number;
  change?: string;
  direction?: 'up' | 'down' | 'neutral';
}
