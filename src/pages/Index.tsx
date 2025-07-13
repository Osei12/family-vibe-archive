
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  FileText, 
  MessageSquare, 
  Users, 
  Shield, 
  Heart,
  Star,
  Calendar,
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react";

const Index = () => {
  const [stats] = useState({
    totalPhotos: 1247,
    documentsShared: 89,
    messagesExchanged: 2156,
    familyMembers: 8,
  });

  const recentActivities = [
    {
      id: 1,
      type: "photo",
      user: "Sarah",
      action: "uploaded 5 new photos",
      time: "2 hours ago",
      icon: Camera,
    },
    {
      id: 2,
      type: "document",
      user: "Dad",
      action: "shared family budget document",
      time: "5 hours ago",
      icon: FileText,
    },
    {
      id: 3,
      type: "message",
      user: "Mom",
      action: "posted a family announcement",
      time: "1 day ago",
      icon: MessageSquare,
    },
  ];

  const quickActions = [
    {
      title: "Share Photos",
      description: "Upload and share your latest family moments",
      icon: Camera,
      link: "/photos",
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
    },
    {
      title: "Family Messages",
      description: "Stay connected with family announcements",
      icon: MessageSquare,
      link: "/messages",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Documents",
      description: "Access important family documents",
      icon: FileText,
      link: "/documents",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      title: "Manage Family",
      description: "Add members and manage permissions",
      icon: Users,
      link: "/admin",
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Family Hub
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your private family space to share precious moments, important documents, 
            and stay connected with the people who matter most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/photos" className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Sharing
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-300"
            >
              <Link to="/admin" className="flex items-center dark:text-white">
                <Users className="mr-2 h-5 w-5" />
                Manage Family
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/20 rounded-full w-fit mx-auto mb-2">
                <Camera className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalPhotos.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">Photos Shared</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-2">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.documentsShared}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">Documents</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-2">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.messagesExchanged.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">Messages</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-2">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.familyMembers}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">Family Members</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action) => (
            <Card 
              key={action.title} 
              className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm overflow-hidden"
            >
              <Link to={action.link}>
                <CardHeader className="pb-4">
                  <div className={`p-4 ${action.color} rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {action.description}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-6 w-6 text-rose-500" />
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
              </div>
              <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">
                Last 24 hours
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                    <activity.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Banner */}
        <Card className="mt-8 border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-full">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-1">
                  Your Family Data is Secure
                </h3>
                <p className="text-green-700 dark:text-green-200 text-sm">
                  End-to-end encryption ensures your family moments stay private and secure.
                </p>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
