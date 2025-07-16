import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Activity,
  Shield,
  Search,
  Camera,
  FileText,
  MessageCircle,
  Calendar,
  UserPlus,
  HardDrive,
  TrendingUp,
} from "lucide-react";
import { InviteMemberDialog } from "@/components/InviteMemberDialog";
import { MemberProfileDialog } from "@/components/MemberProfileDialog";
import DetailedStorageMetrics from "@/components/DetailedStorageMetrics";
import UserRoleManager from "@/components/UserRoleManager";
import StorageManagement from "@/components/StorageManagement";
import UpgradePlan from "@/components/UpgradePlan";
import UserDropdown from "@/components/UserDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mock data for family members
const mockFamilyMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    joinedAt: new Date("2023-12-01"),
    lastActive: new Date("2024-01-15"),
    activities: {
      photos: 45,
      documents: 12,
      messages: 23,
    },
    storageUsed: 156, // MB
    status: "active",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Member",
    joinedAt: new Date("2023-12-01"),
    lastActive: new Date("2024-01-14"),
    activities: {
      photos: 32,
      documents: 8,
      messages: 15,
    },
    storageUsed: 89,
    status: "active",
  },
  {
    id: "3",
    name: "Emma Johnson",
    email: "emma@example.com",
    role: "Member",
    joinedAt: new Date("2023-12-15"),
    lastActive: new Date("2024-01-12"),
    activities: {
      photos: 28,
      documents: 5,
      messages: 41,
    },
    storageUsed: 134,
    status: "active",
  },
];

// Admin Overview Component
const AdminOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = mockFamilyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  const getRoleColor = (role: string) => {
    return role === "Admin"
      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log(`Changing role for user ${userId} to ${newRole}`);
    // TODO: Implement role change logic
  };

  const handleUpgrade = () => {
    console.log("Upgrading plan...");
    // TODO: Implement upgrade logic
  };

  // Mock detailed storage data
  const detailedStorageData = {
    used: 450,
    total: 1024,
    photos: 320,
    documents: 130,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Manage Family Archive
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Add family members and manage storage for your family archive
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <InviteMemberDialog />
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Storage Metrics */}
      <DetailedStorageMetrics
        usedStorage={detailedStorageData.used}
        totalStorage={detailedStorageData.total}
        photosStorage={detailedStorageData.photos}
        documentsStorage={detailedStorageData.documents}
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {mockFamilyMembers.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Total Members
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {mockFamilyMembers.filter((m) => m.status === "active").length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Active Users
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Camera className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {mockFamilyMembers.reduce(
                  (sum, m) => sum + m.activities.photos,
                  0
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Total Photos
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {formatStorage(
                  mockFamilyMembers.reduce((sum, m) => sum + m.storageUsed, 0)
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Storage Used
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search family members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Family Members List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Family Members
          </h2>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 dark:text-rose-300 font-semibold text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Joined {member.joinedAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Camera className="h-4 w-4 text-gray-400" />
                      <span className="dark:text-gray-300">
                        {member.activities.photos}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="dark:text-gray-300">
                        {member.activities.documents}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="dark:text-gray-300">
                        {member.activities.messages}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-gray-600 dark:text-gray-300">
                      {formatStorage(member.storageUsed)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Last active {member.lastActive.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <UserRoleManager
                      userId={member.id}
                      currentRole={member.role}
                      userName={member.name}
                      onRoleChange={handleRoleChange}
                    />
                    <MemberProfileDialog member={member} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const navItems = [
  // { path: "/", label: "Home", icon: Home },
  { path: "/media", label: "Media", icon: Camera },
  { path: "/documents", label: "Documents", icon: FileText },
  { path: "/messages", label: "Messages", icon: MessageCircle },
  ,
];
const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
      {/* <Navigation /> */}

      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />

          <div className="flex-1">
            <div className="sticky top-0 z-10 flex justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
              <SidebarTrigger />

              <div className="">
                <div className="hidden md:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${"text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <UserDropdown />
              </div>
            </div>

            <main className="p-8">
              <Routes>
                <Route path="/" element={<AdminOverview />} />
                <Route path="/members" element={<AdminOverview />} />
                <Route path="/storage" element={<StorageManagement />} />
                <Route path="/subscription" element={<UpgradePlan />} />
                <Route
                  path="/roles"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        User Roles Management
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Analytics Dashboard
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/backup"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Backup & Restore
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Settings
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/security"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibent text-gray-800 dark:text-gray-100">
                        Security Settings
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Notification Settings
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Privacy Settings
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Billing History
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Coming soon...
                      </p>
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;
