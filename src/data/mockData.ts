
import { DashboardStat, User, UserDetail } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    department: "Engineering",
    title: "Senior Developer",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    lastActive: "Today at 10:42 AM",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    department: "Product",
    title: "Product Manager",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    lastActive: "Today at 9:15 AM",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    title: "Financial Analyst",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    lastActive: "Yesterday at 4:30 PM",
  },
  {
    id: "4",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    department: "Marketing",
    title: "Marketing Specialist",
    status: "pending",
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    lastActive: "Today at 11:20 AM",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    department: "Operations",
    title: "Operations Manager",
    status: "disabled",
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    lastActive: "3 months ago",
  },
  {
    id: "6",
    name: "Amanda Rodriguez",
    email: "amanda.rodriguez@example.com",
    department: "Customer Support",
    title: "Support Lead",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg",
    lastActive: "Today at 8:45 AM",
  },
];

export const mockApps = {
  "1": [
    {
      id: "app1",
      name: "Slack",
      type: "Communication",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-slack-226533.png",
      role: "Member",
      lastUsed: "Today at 10:30 AM",
    },
    {
      id: "app2",
      name: "GitHub",
      type: "Development",
      icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
      role: "Contributor",
      lastUsed: "Today at 9:45 AM",
    },
    {
      id: "app3",
      name: "Jira",
      type: "Project Management",
      icon: "https://ww1.freelogovectors.net/svg03/jira-logo.svg",
      role: "Developer",
      lastUsed: "Yesterday at 5:20 PM",
    },
    {
      id: "app4",
      name: "AWS Console",
      type: "Cloud Infrastructure",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      role: "Developer Access",
      lastUsed: "3 days ago",
    },
    {
      id: "app5",
      name: "Figma",
      type: "Design",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      role: "Viewer",
      lastUsed: "Last week",
    }
  ],
  "2": [
    {
      id: "app1",
      name: "Slack",
      type: "Communication",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-slack-226533.png",
      role: "Member",
      lastUsed: "Today at 9:10 AM",
    },
    {
      id: "app3",
      name: "Jira",
      type: "Project Management",
      icon: "https://ww1.freelogovectors.net/svg03/jira-logo.svg",
      role: "Product Owner",
      lastUsed: "Today at 11:05 AM",
    },
    {
      id: "app6",
      name: "Google Workspace",
      type: "Productivity",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      role: "Business",
      lastUsed: "Today at 8:30 AM",
    },
    {
      id: "app7",
      name: "Salesforce",
      type: "CRM",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      role: "Standard User",
      lastUsed: "Yesterday",
    },
  ],
  "3": [
    {
      id: "app1",
      name: "Slack",
      type: "Communication",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-slack-226533.png",
      role: "Member",
      lastUsed: "Yesterday",
    },
    {
      id: "app6",
      name: "Google Workspace",
      type: "Productivity",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      role: "Business",
      lastUsed: "Today at 2:15 PM",
    },
    {
      id: "app8",
      name: "QuickBooks",
      type: "Finance",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Intuit_QuickBooks_logo.svg",
      role: "Administrator",
      lastUsed: "Today at 3:45 PM",
    },
    {
      id: "app9",
      name: "NetSuite",
      type: "ERP",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/NetSuite_logo.svg",
      role: "Financial User",
      lastUsed: "Yesterday at 10:20 AM",
    },
  ],
  "4": [
    {
      id: "app1",
      name: "Slack",
      type: "Communication",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-slack-226533.png",
      role: "Member",
      lastUsed: "Today at 11:15 AM",
    },
    {
      id: "app6",
      name: "Google Workspace",
      type: "Productivity",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      role: "Business",
      lastUsed: "Today at 10:30 AM",
    },
    {
      id: "app10",
      name: "Mailchimp",
      type: "Email Marketing",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Mailchimp_wink.svg/512px-Mailchimp_wink.svg.png",
      role: "Manager",
      lastUsed: "Yesterday at 2:00 PM",
    },
    {
      id: "app11",
      name: "HubSpot",
      type: "Marketing",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Hubspot_Logo.svg",
      role: "Marketing User",
      lastUsed: "Today at 9:45 AM",
    },
  ],
  "6": [
    {
      id: "app1",
      name: "Slack",
      type: "Communication",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-slack-226533.png",
      role: "Member",
      lastUsed: "Today at 8:40 AM",
    },
    {
      id: "app6",
      name: "Google Workspace",
      type: "Productivity", 
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      role: "Business",
      lastUsed: "Today at 8:15 AM",
    },
    {
      id: "app12",
      name: "Zendesk",
      type: "Customer Support",
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/88/Zendesk_logo.svg",
      role: "Admin",
      lastUsed: "Today at 10:05 AM",
    },
    {
      id: "app13",
      name: "Front",
      type: "Customer Communication",
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Front_app_logo.svg",
      role: "Team Member",
      lastUsed: "Today at 9:50 AM",
    },
  ],
};

export const getUserDetail = (id: string): UserDetail | undefined => {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return undefined;
  
  return {
    ...user,
    applications: mockApps[id] || [],
    joinDate: "March 15, 2022",
    manager: "Robert Johnson",
    phoneNumber: "+1 (555) 123-4567",
  };
};

export const mockDashboardStats: DashboardStat[] = [
  {
    label: "Total Users",
    value: 243,
    change: "+12%",
    direction: "up",
  },
  {
    label: "Active Users",
    value: 219,
    change: "+5%",
    direction: "up",
  },
  {
    label: "Disabled Accounts",
    value: 24,
    change: "-8%",
    direction: "down",
  },
  {
    label: "Total Applications",
    value: 47,
  },
];

// Filter users based on search query
export const filterUsers = (query: string): User[] => {
  if (!query) return mockUsers;
  
  const lowerQuery = query.toLowerCase();
  return mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.department.toLowerCase().includes(lowerQuery) ||
      user.title.toLowerCase().includes(lowerQuery)
  );
};

// Simulate API calls with console logging
export const simulateApiCall = (endpoint: string, data: any = null): Promise<any> => {
  console.log(`API Call to: ${endpoint}`, data ? { data } : "");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`API Response from: ${endpoint}`, { success: true });
      resolve({ success: true });
    }, 800);
  });
};
