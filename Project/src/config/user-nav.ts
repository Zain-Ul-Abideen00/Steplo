import { UserNavItem } from "@/types/user";
import { User, Settings, Package } from "lucide-react";

export const userNavItems: UserNavItem[] = [
  {
    title: "Profile",
    href: "/member/profile",
    icon: User,
  },
  {
    title: "Orders",
    href: "/member/orders",
    icon: Package,
  },
  {
    title: "Settings",
    href: "/member/settings",
    icon: Settings,
  },
];
