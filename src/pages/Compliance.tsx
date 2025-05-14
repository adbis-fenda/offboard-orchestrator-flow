
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Download, FileBarChart } from "lucide-react";
import { mockAuditLogs, AuditLog } from "@/data/auditLogs";

export default function CompliancePage() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  
  const handleGenerateReport = () => {
    if (!reportType) {
      toast({
        title: "Error",
        description: "Please select a report type",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(true);
      setAuditLogs(mockAuditLogs);
      
      toast({
        title: "Report Generated",
        description: `${reportType} report has been generated successfully.`,
      });
    }, 1500);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your report download has started.",
    });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header searchQuery="" setSearchQuery={() => {}} />
          <div className="flex-1 p-6 bg-background overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Compliance Reports</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Generate Report</CardTitle>
                  <CardDescription>
                    Create compliance reports for audit and regulatory purposes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="access_audit">Access Audit Report</SelectItem>
                          <SelectItem value="license_compliance">License Compliance Report</SelectItem>
                          <SelectItem value="user_activity">User Activity Report</SelectItem>
                          <SelectItem value="role_changes">Role Changes Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <Button 
                      className="w-full bg-brand-purple hover:bg-brand-light-purple"
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <span className="flex items-center">
                          <span className="mr-2 animate-pulse-subtle">Generating...</span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FileBarChart className="mr-2 h-4 w-4" />
                          Generate Report
                        </span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Report Results</CardTitle>
                    <CardDescription>
                      View and download your generated compliance reports.
                    </CardDescription>
                  </div>
                  {generatedReport && (
                    <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {!generatedReport ? (
                    <div className="flex flex-col items-center justify-center h-64">
                      <FileBarChart className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Generate a report to view results
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.targetUser || "N/A"}</TableCell>
                            <TableCell>{log.details}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <SidebarTrigger className="fixed top-3 right-3" />
      </div>
    </SidebarProvider>
  );
}
