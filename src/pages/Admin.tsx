
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { InviteMemberDialog } from "@/components/InviteMemberDialog";
import { MemberProfileDialog } from "@/components/MemberProfileDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, 
  Search, 
  Crown, 
  Users, 
  Shield, 
  Settings,
  MoreVertical,
  Eye,
  UserMinus,
  AlertTriangle,
  Activity,
  Calendar,
  Mail
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "child";
  avatar?: string;
  joinedAt: Date;
  lastActive: Date;
  isOnline: boolean;
  permissions: {
    canUploadPhotos: boolean;
    canDeletePhotos: boolean;
    canUploadDocuments: boolean;
    canDeleteDocuments: boolean;
    canPostMessages: boolean;
    canDeleteMessages: boolean;
    canInviteMembers: boolean;
  };
  stats: {
    photosUploaded: number;
    documentsShared: number;
    messagesPosted: number;
  };
  // Add missing properties to fix the build error
  activities: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;
  storageUsed: number;
  status: "active" | "inactive" | "pending";
}

const mockMembers: FamilyMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@family.com",
    role: "admin",
    joinedAt: new Date("2023-01-01"),
    lastActive: new Date(),
    isOnline: true,
    permissions: {
      canUploadPhotos: true,
      canDeletePhotos: true,
      canUploadDocuments: true,
      canDeleteDocuments: true,
      canPostMessages: true,
      canDeleteMessages: true,
      canInviteMembers: true,
    },
    stats: {
      photosUploaded: 245,
      documentsShared: 12,
      messagesPosted: 89,
    },
    activities: [
      { type: "upload", description: "Uploaded family photo", timestamp: new Date() }
    ],
    storageUsed: 1.2,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@family.com",
    role: "member",
    joinedAt: new Date("2023-01-01"),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isOnline: false,
    permissions: {
      canUploadPhotos: true,
      canDeletePhotos: false,
      canUploadDocuments: true,
      canDeleteDocuments: false,
      canPostMessages: true,
      canDeleteMessages: false,
      canInviteMembers: false,
    },
    stats: {
      photosUploaded: 156,
      documentsShared: 8,
      messagesPosted: 134,
    },
    activities: [
      { type: "message", description: "Posted a message", timestamp: new Date() }
    ],
    storageUsed: 0.8,
    status: "active",
  },
  {
    id: "3",
    name: "Mike Smith",
    email: "mike.smith@family.com",
    role: "child",
    joinedAt: new Date("2023-06-15"),
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isOnline: false,
    permissions: {
      canUploadPhotos: true,
      canDeletePhotos: false,
      canUploadDocuments: false,
      canDeleteDocuments: false,
      canPostMessages: true,
      canDeleteMessages: false,
      canInviteMembers: false,
    },
    stats: {
      photosUploaded: 89,
      documentsShared: 0,
      messagesPosted: 45,
    },
    activities: [
      { type: "photo", description: "Uploaded a photo", timestamp: new Date() }
    ],
    storageUsed: 0.3,
    status: "active",
  },
];

const Admin = () => {
  const [members, setMembers] = useState<FamilyMember[]>(mockMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleInviteMember = (memberData: { name: string; email: string; role: string }) => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: memberData.name,
      email: memberData.email,
      role: memberData.role as "admin" | "member" | "child",
      joinedAt: new Date(),
      lastActive: new Date(),
      isOnline: false,
      permissions: {
        canUploadPhotos: true,
        canDeletePhotos: memberData.role === "admin",
        canUploadDocuments: memberData.role !== "child",
        canDeleteDocuments: memberData.role === "admin",
        canPostMessages: true,
        canDeleteMessages: memberData.role === "admin",
        canInviteMembers: memberData.role === "admin",
      },
      stats: {
        photosUploaded: 0,
        documentsShared: 0,
        messagesPosted: 0,
      },
    };
    setMembers([...members, newMember]);
    setShowInviteDialog(false);
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      case "member":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
      case "child":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />;
      case "member":
        return <Users className="h-4 w-4" />;
      case "child":
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const roles = [
    { id: "all", name: "All Roles" },
    { id: "admin", name: "Admins" },
    { id: "member", name: "Members" },
    { id: "child", name: "Children" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Family Administration
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage family members, roles, and permissions
            </p>
          </div>

          <InviteMemberDialog
            trigger={
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <UserPlus className="h-5 w-5 mr-2" />
                Invite Member
              </Button>
            }
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {roles.map((role) => (
              <Badge
                key={role.id}
                variant={selectedRole === role.id ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedRole === role.id 
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                {role.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-indigo-500">
                {filteredMembers.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {selectedRole === "all" ? "Total Members" : "Filtered Members"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-500">
                {members.filter(m => m.isOnline).length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Online Now</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-red-500">
                {members.filter(m => m.role === "admin").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Admins</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-500">
                {members.filter(m => m.role === "child").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Children</p>
            </CardContent>
          </Card>
        </div>

        {/* Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card 
              key={member.id} 
              className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </CardDescription>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                      <DropdownMenuItem 
                        onClick={() => setSelectedMember(member)}
                        className="dark:hover:bg-gray-700 dark:text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="dark:hover:bg-gray-700 dark:text-white"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Permissions
                      </DropdownMenuItem>
                      {member.role !== "admin" && (
                        <DropdownMenuItem 
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Badge className={getRoleColor(member.role)}>
                    {getRoleIcon(member.role)}
                    <span className="ml-1 capitalize">{member.role}</span>
                  </Badge>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Activity className="h-3 w-3 mr-1" />
                    {member.isOnline ? "Online" : `Last seen ${member.lastActive.toLocaleDateString()}`}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-blue-500">
                      {member.stats.photosUploaded}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Photos</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-500">
                      {member.stats.documentsShared}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Docs</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-purple-500">
                      {member.stats.messagesPosted}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Messages</div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined {member.joinedAt.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No members found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Member Profile Dialog */}
        {selectedMember && (
          <MemberProfileDialog
            member={selectedMember}
            trigger={null}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
