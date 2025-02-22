import { Button } from "./Button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface SocialAuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google";
  isLoading?: boolean;
}

export function SocialAuthButton({
  provider,
  isLoading,
  className,
  ...props
}: SocialAuthButtonProps) {
  const icons = {
    google: Icons.google,
  };

  const Icon = icons[provider];

  return (
    <Button
      variant="outline"
      type="button"
      className={cn(
        "w-full bg-background flex items-center justify-center gap-2 relative",
        "hover:bg-gray-50 transition-colors duration-200",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Icons.spinner className="h-4 w-4 animate-spin" />
          <span>Connecting to {provider}...</span>
        </>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          <span>
            Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </span>
        </>
      )}
    </Button>
  );
}
