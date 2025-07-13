
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Users,
  HardDrive,
  Settings,
  Shield,
  CreditCard,
  FileText,
  Activity,
  Bell,
  Lock,
  Trash2,
  Download,
  Upload,
  BarChart3,
  UserCog,
  Database
} from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Overview',
    url: '/admin',
    icon: Activity,
    exact: true
  },
  {
    title: 'Family Members',
    url: '/admin/members',
    icon: Users
  },
  {
    title: 'Storage Management',
    url: '/admin/storage',
    icon: HardDrive
  },
  {
    title: 'User Roles',
    url: '/admin/roles',
    icon: UserCog
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'Backup & Restore',
    url: '/admin/backup',
    icon: Database
  }
];

const systemMenuItems = [
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings
  },
  {
    title: 'Security',
    url: '/admin/security',
    icon: Shield
  },
  {
    title: 'Notifications',
    url: '/admin/notifications',
    icon: Bell
  },
  {
    title: 'Privacy',
    url: '/admin/privacy',
    icon: Lock
  }
];

const billingMenuItems = [
  {
    title: 'Subscription',
    url: '/admin/subscription',
    icon: CreditCard
  },
  {
    title: 'Billing History',
    url: '/admin/billing',
    icon: FileText
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string, exact = false) => {
    return isActive(path, exact) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50";
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.exact}
                      className={getNavClassName(item.url, item.exact)}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Billing Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Billing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {billingMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
