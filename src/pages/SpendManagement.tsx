
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { mockSubscriptionCosts, getSpendStats } from "@/data/mockData";
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { SubscriptionCost } from "@/types";

const SpendManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const spendStats = getSpendStats();
  
  // Filter subscriptions based on search query
  const filteredSubscriptions = mockSubscriptionCosts.filter((sub) => 
    sub.appName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
                <div className="h-80">
                  <ChartContainer
                    config={{
                      active: { label: "Active Spend", color: "#6E59A5" },
                      waste: { label: "Wasted Spend", color: "#ea384c" }
                    }}
                  >
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <Bar dataKey="active" stackId="a" fill="var(--color-active, #6E59A5)" />
                      <Bar dataKey="waste" stackId="a" fill="var(--color-waste, #ea384c)" />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent />
                        }
                      />
                    </BarChart>
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
                {filteredSubscriptions.length} subscriptions found
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubscriptions.map((subscription: SubscriptionCost) => (
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
