
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { createAccessRequest } from "@/data/accessRequests";

// Form schema
const formSchema = z.object({
  applicationId: z.string({ required_error: "Application is required" }),
  requestedRole: z.string({ required_error: "Access level is required" }),
  reason: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Define available applications for dropdown
const availableApplications = [
  { id: "app1", name: "Slack", icon: "/slack.png" },
  { id: "app2", name: "MongoDB", icon: "/mongodb.png" },
  { id: "app3", name: "HubSpot", icon: "/hubspot.png" },
  { id: "app4", name: "AWS Console", icon: "" },
  { id: "app5", name: "Figma", icon: "" },
  { id: "app6", name: "Google Workspace", icon: "" },
  { id: "app7", name: "Salesforce", icon: "" },
];

const accessLevels = [
  { value: "Read", label: "Read (View Only)" },
  { value: "Write", label: "Write (Edit)" },
  { value: "Admin", label: "Admin (Full Control)" },
];

interface ApplicationAccessRequestFormProps {
  onSubmitted: () => void;
}

export function ApplicationAccessRequestForm({ onSubmitted }: ApplicationAccessRequestFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationId: "",
      requestedRole: "",
      reason: "",
    },
  });

  // Mutation for submitting the request
  const mutation = useMutation({
    mutationFn: createAccessRequest,
    onSuccess: () => {
      onSubmitted();
      form.reset();
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Find the application to get its name and icon
    const application = availableApplications.find(app => app.id === values.applicationId);
    
    if (!user || !application) {
      setIsSubmitting(false);
      return;
    }

    mutation.mutate({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userAvatarUrl: user.avatarUrl || "",
      applicationId: values.applicationId,
      applicationName: application.name,
      applicationIcon: application.icon,
      requestedRole: values.requestedRole,
      reason: values.reason,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="applicationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableApplications.map((app) => (
                    <SelectItem key={app.id} value={app.id} className="flex items-center gap-2">
                      {app.icon && <img src={app.icon} alt={app.name} className="w-4 h-4" />}
                      {app.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestedRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accessLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justification (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please explain why you need access to this application"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Form>
  );
}
