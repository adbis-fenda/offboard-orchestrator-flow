
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStat } from "@/types";
import { cn } from "@/lib/utils";

export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{stat.value}</div>
          {stat.change && (
            <div
              className={cn(
                "text-xs font-medium",
                stat.direction === "up" && "text-green-600",
                stat.direction === "down" && "text-red-600",
                stat.direction === "neutral" && "text-gray-500"
              )}
            >
              {stat.direction === "up" && "↑ "}
              {stat.direction === "down" && "↓ "}
              {stat.change}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
