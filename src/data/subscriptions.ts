
import { SpendManagementStat, SubscriptionCost } from "@/types";

// Mock subscription costs data
export const mockSubscriptionCosts: SubscriptionCost[] = [
  {
    id: "sub1",
    appId: "app1",
    appName: "Slack",
    costPerSeat: 8,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 250,
    activeSeats: 219,
    lastUpdated: "2025-05-10",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-slack-226533.png"
  },
  {
    id: "sub2",
    appId: "app2",
    appName: "GitHub",
    costPerSeat: 10,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 180,
    activeSeats: 165,
    lastUpdated: "2025-05-11",
    icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
  },
  {
    id: "sub3",
    appId: "app3",
    appName: "Jira",
    costPerSeat: 12,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 200,
    activeSeats: 186,
    lastUpdated: "2025-05-09",
    icon: "https://ww1.freelogovectors.net/svg03/jira-logo.svg"
  },
  {
    id: "sub4",
    appId: "app4",
    appName: "AWS Console",
    costPerSeat: 20,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 60,
    activeSeats: 42,
    lastUpdated: "2025-05-08",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    id: "sub5",
    appId: "app5",
    appName: "Figma",
    costPerSeat: 15,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 50,
    activeSeats: 38,
    lastUpdated: "2025-05-10",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
  },
  {
    id: "sub6",
    appId: "app6",
    appName: "Google Workspace",
    costPerSeat: 12,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 250,
    activeSeats: 243,
    lastUpdated: "2025-05-11",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
  },
  {
    id: "sub7",
    appId: "app7",
    appName: "Salesforce",
    costPerSeat: 25,
    currency: "USD",
    billingCycle: "monthly",
    totalSeats: 120,
    activeSeats: 98,
    lastUpdated: "2025-05-07",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
  }
];

// Calculate spend stats
export const getSpendStats = (): SpendManagementStat[] => {
  const totalApps = mockSubscriptionCosts.length;
  
  const monthlySpend = mockSubscriptionCosts.reduce((total, sub) => {
    return total + (sub.costPerSeat * sub.totalSeats);
  }, 0);
  
  const previousMonthlySpend = monthlySpend * 0.92; // Simulated previous month (8% less)
  
  const totalSeats = mockSubscriptionCosts.reduce((total, sub) => total + sub.totalSeats, 0);
  const activeSeats = mockSubscriptionCosts.reduce((total, sub) => total + sub.activeSeats, 0);
  const unusedSeats = totalSeats - activeSeats;
  const unusedCost = mockSubscriptionCosts.reduce((total, sub) => {
    const unusedSeatsForApp = sub.totalSeats - sub.activeSeats;
    return total + (unusedSeatsForApp * sub.costPerSeat);
  }, 0);
  
  return [
    {
      label: "Total Monthly Spend",
      value: `$${monthlySpend.toLocaleString()}`,
      previousValue: `$${previousMonthlySpend.toLocaleString()}`,
      change: "+8%",
      direction: "up" as const
    },
    {
      label: "Active Applications",
      value: totalApps,
      change: "+1",
      direction: "up" as const
    },
    {
      label: "Unused Seats",
      value: unusedSeats,
      change: "+12",
      direction: "up" as const
    },
    {
      label: "Monthly Waste",
      value: `$${unusedCost.toLocaleString()}`,
      change: "+5%",
      direction: "up" as const
    },
  ];
};
