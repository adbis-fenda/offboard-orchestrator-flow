
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionCost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SubscriptionCard({ subscription }: { subscription: SubscriptionCost }) {
  const usagePercentage = Math.round((subscription.activeSeats / subscription.totalSeats) * 100);
  const unusedSeats = subscription.totalSeats - subscription.activeSeats;
  const monthlyCost = subscription.costPerSeat * subscription.totalSeats;
  const wasteCost = subscription.costPerSeat * unusedSeats;
  
  // Define thresholds for usage efficiency
  const isEfficient = usagePercentage >= 90;
  const isWarning = usagePercentage < 90 && usagePercentage >= 75;
  const isDanger = usagePercentage < 75;
  
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-md">
              <img 
                src={subscription.icon} 
                alt={`${subscription.appName} icon`} 
                className="w-8 h-8"
              />
            </div>
            <div>
              <CardTitle className="text-lg">{subscription.appName}</CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                Last updated: {subscription.lastUpdated}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              ${subscription.costPerSeat} / seat
            </div>
            <div className="text-xs text-muted-foreground">
              {subscription.billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm font-medium">Seat Usage</div>
              <div className="text-sm font-medium">
                {subscription.activeSeats} / {subscription.totalSeats} seats
              </div>
            </div>
            <Progress value={usagePercentage} className={cn(
              isEfficient && "bg-green-200 [&>div]:bg-green-600",
              isWarning && "bg-amber-200 [&>div]:bg-amber-600",
              isDanger && "bg-red-200 [&>div]:bg-red-600",
            )} />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="space-y-1">
              <div className="font-medium">Total Monthly Cost</div>
              <div className="text-lg font-bold">${monthlyCost.toLocaleString()}</div>
            </div>
            <div className={cn(
              "space-y-1 text-right",
              unusedSeats > 0 && "text-red-600",
            )}>
              <div className="font-medium flex items-center justify-end">
                {unusedSeats > 0 && <AlertTriangle size={14} className="mr-1" />}
                Wasted Spend
              </div>
              <div className="text-lg font-bold">
                {unusedSeats > 0 ? `$${wasteCost.toLocaleString()}` : "$0"}
              </div>
            </div>
          </div>
          
          <div className="pt-2 flex justify-between items-center">
            <Badge variant="outline" className="bg-muted">
              {subscription.totalSeats} total seats
            </Badge>
            {unusedSeats > 0 && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                {unusedSeats} unused seats
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
