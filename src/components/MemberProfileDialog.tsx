import { useState } from "react";
import {
  User,
  Activity,
  Calendar,
  Camera,
  FileText,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
  lastActive: Date;
  activities: {
    photos: number;
    documents: number;
    messages: number;
  };
  storageUsed: number;
  status: string;
  phone?: string;
  bio?: string;
  recentActivities?: Array<{
    type: "photo" | "document" | "message";
    action: string;
    date: Date;
  }>;
}

interface MemberProfileDialogProps {
  member: FamilyMember;
  trigger?: React.ReactNode;
}

export function MemberProfileDialog({
  member,
  trigger,
}: MemberProfileDialogProps) {
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

  const recentActivities = member.recentActivities || [
    {
      type: "photo" as const,
      action: "Uploaded family vacation photos",
      date: new Date("2024-01-15"),
    },
    {
      type: "message" as const,
      action: "Shared an encouragement message",
      date: new Date("2024-01-14"),
    },
    {
      type: "document" as const,
      action: "Added birth certificate",
      date: new Date("2024-01-12"),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-1" />
            View Profile
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 rounded-full flex items-center justify-center">
              <span className="text-rose-600 dark:text-rose-300 font-semibold text-lg">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            {/* <TabsTrigger value="contact">Contact</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <Camera className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {member.activities.photos}
                </div>
                <div className="text-sm text-muted-foreground">Photos</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {member.activities.documents}
                </div>
                <div className="text-sm text-muted-foreground">Documents</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {member.activities.messages}
                </div>
                <div className="text-sm text-muted-foreground">Messages</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Member since:
                </span>
                <span className="text-sm">
                  {member.joinedAt.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Last active:
                </span>
                <span className="text-sm">
                  {member.lastActive.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Storage used:
                </span>
                <span className="text-sm">
                  {formatStorage(member.storageUsed)}
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Recent Activities
              </h3>
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
                >
                  {activity.type === "photo" && (
                    <Camera className="h-4 w-4 text-purple-500" />
                  )}
                  {activity.type === "document" && (
                    <FileText className="h-4 w-4 text-blue-500" />
                  )}
                  {activity.type === "message" && (
                    <MessageCircle className="h-4 w-4 text-green-500" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="contact" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Mail className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              {member.phone && (
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Phone className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{member.phone}</p>
                  </div>
                </div>
              )}
              {member.bio && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Bio</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              )}
            </div>
          </TabsContent> */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
