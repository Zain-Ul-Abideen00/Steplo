export type UserRole = 'admin' | 'manager' | 'editor';

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface Permission {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface RolePermission {
  role: UserRole;
  permission_id: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  roles: UserRole[];
  permissions: string[];
} 