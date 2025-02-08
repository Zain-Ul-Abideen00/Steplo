"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const settingsSchema = z.object({
  marketing_emails: z.boolean().default(false),
  order_updates: z.boolean().default(true),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  user: User;
  initialSettings: SettingsFormValues;
}

export function SettingsForm({ user, initialSettings }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      marketing_emails: initialSettings?.marketing_emails || false,
      order_updates: initialSettings?.order_updates || true,
    },
  });

  async function onSubmit(data: SettingsFormValues) {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user.id,
          ...data,
        })
        .single();

      if (error) throw error;

      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="marketing_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Marketing emails</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order_updates"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Order updates</FormLabel>
                <FormDescription>
                  Receive notifications about your order status.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
