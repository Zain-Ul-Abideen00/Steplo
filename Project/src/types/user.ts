export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserNavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
