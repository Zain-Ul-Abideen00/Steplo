"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      expand={false}
      richColors
      closeButton
      theme="light"
      duration={4000}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          title: "group-[.toast]:font-semibold group-[.toast]:text-foreground",
          error: "group-[.toast]:bg-destructive group-[.toast]:text-destructive-foreground",
          success: "group-[.toast]:bg-success group-[.toast]:text-success-foreground",
          warning: "group-[.toast]:bg-warning group-[.toast]:text-warning-foreground",
          info: "group-[.toast]:bg-info group-[.toast]:text-info-foreground",
        },
      }}
    />
  );
}
