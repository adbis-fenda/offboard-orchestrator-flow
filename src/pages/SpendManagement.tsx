import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { mockSubscriptionCosts, getSpendStats } from "@/data/subscriptions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend, LabelList } from "recharts";
import { SubscriptionCost } from "@/types";

const SpendManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const spendStats = getSpendStats();
  
  // Filter subscriptions based on search query
  const filteredSubscriptions = mockSubscriptionCosts.filter((sub) => 
    sub.appName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Include any subscriptions not matching the search alongside filtered results
  const allSubscriptions = [
    ...filteredSubscriptions,
    ...mockSubscriptionCosts.filter(sub =>
      !filteredSubscriptions.some(f => f.id === sub.id)
    )
  ];
  
  // Prepare data for the chart
  const chartData = mockSubscriptionCosts.map((sub) => {
    const activeSpend = sub.costPerSeat * sub.activeSeats;
    const wasteSpend = sub.costPerSeat * (sub.totalSeats - sub.activeSeats);
    
    return {
      name: sub.appName,
      active: activeSpend,
      waste: wasteSpend,
    };
  });
  
  // Calculate totals for the summary table
  const totalMonthlySpend = mockSubscriptionCosts.reduce(
    (total, sub) => total + sub.costPerSeat * sub.totalSeats, 
    0
  );
  
  const totalWasteSpend = mockSubscriptionCosts.reduce(
    (total, sub) => total + sub.costPerSeat * (sub.totalSeats - sub.activeSeats), 
    0
  );
  
  const wastePercentage = ((totalWasteSpend / totalMonthlySpend) * 100).toFixed(1);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 p-6 bg-background overflow-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Spend Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {spendStats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </div>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Subscription Cost Breakdown</CardTitle>
                <CardDescription>
                  Active vs. Wasted Spend (based on unused seats)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-100">
                  <ChartContainer
                    config={{
                      active: { label: "Active Spend", color: "#6E59A5" },
                      waste: { label: "Wasted Spend", color: "#ea384c" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <defs>
                          <linearGradient id="colorActiveGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6E59A5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#6E59A5" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorWasteGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ea384c" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ea384c" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar dataKey="active" stackId="a" fill="url(#colorActiveGradient)" radius={[8, 8, 0, 0]}>
                          <LabelList dataKey="active" position="top" formatter={(value) => `$${value.toLocaleString()}`} />
                        </Bar>
                        <Bar dataKey="waste" stackId="a" fill="url(#colorWasteGradient)" radius={[8, 8, 0, 0]}>
                          <LabelList dataKey="waste" position="top" formatter={(value) => `$${value.toLocaleString()}`} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Subscription Cost Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Total Monthly Spend</TableCell>
                      <TableCell className="text-right">${totalMonthlySpend.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Active Spend</TableCell>
                      <TableCell className="text-right">${(totalMonthlySpend - totalWasteSpend).toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-red-600">Wasted Spend</TableCell>
                      <TableCell className="text-right text-red-600">${totalWasteSpend.toLocaleString()} ({wastePercentage}%)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Application Subscriptions</h3>
              <div className="text-sm text-muted-foreground">
                {allSubscriptions.length} subscriptions found
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSubscriptions.map((subscription: SubscriptionCost) => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
              ))}
            </div>
          </div>
        </div>
        <SidebarTrigger className="fixed top-3 right-3" />
      </div>
    </SidebarProvider>
  );
};

export default SpendManagement;
