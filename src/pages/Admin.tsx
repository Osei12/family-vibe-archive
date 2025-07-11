
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  Shield, 
  Search, 
  Camera, 
  FileText, 
  MessageCircle,
  Calendar,
  Eye
} from 'lucide-react';
import { InviteMemberDialog } from '@/components/InviteMemberDialog';
import { MemberProfileDialog } from '@/components/MemberProfileDialog';

// Mock data for family members
const mockFamilyMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Admin',
    joinedAt: new Date('2023-12-01'),
    lastActive: new Date('2024-01-15'),
    activities: {
      photos: 45,
      documents: 12,
      messages: 23
    },
    storageUsed: 156, // MB
    status: 'active'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Member',
    joinedAt: new Date('2023-12-01'),
    lastActive: new Date('2024-01-14'),
    activities: {
      photos: 32,
      documents: 8,
      messages: 15
    },
    storageUsed: 89,
    status: 'active'
  },
  {
    id: '3',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    role: 'Member',
    joinedAt: new Date('2023-12-15'),
    lastActive: new Date('2024-01-12'),
    activities: {
      photos: 28,
      documents: 5,
      messages: 41
    },
    storageUsed: 134,
    status: 'active'
  }
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const filteredMembers = mockFamilyMembers.filter(member =>
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
    return role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Family Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage family members and monitor activities</p>
          </div>
          
          <InviteMemberDialog />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500 dark:text-blue-400 mr-3" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">{mockFamilyMembers.length}</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">Total Members</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-green-500 dark:text-green-400 mr-3" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {mockFamilyMembers.filter(m => m.status === 'active').length}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">Active Users</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Camera className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500 dark:text-purple-400 mr-3" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {mockFamilyMembers.reduce((sum, m) => sum + m.activities.photos, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">Total Photos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-orange-500 dark:text-orange-400 mr-3" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {formatStorage(mockFamilyMembers.reduce((sum, m) => sum + m.storageUsed, 0))}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">Storage Used</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
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
          <div className="px-4 lg:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100">Family Members</h2>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredMembers.map((member) => (
              <div key={member.id} className="p-4 lg:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-600 dark:text-rose-300 font-semibold text-sm lg:text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm lg:text-base truncate">{member.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm truncate">{member.email}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                          {member.role}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Joined {member.joinedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs lg:text-sm">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="flex items-center space-x-1">
                        <Camera className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
                        <span className="dark:text-gray-300">{member.activities.photos}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
                        <span className="dark:text-gray-300">{member.activities.documents}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
                        <span className="dark:text-gray-300">{member.activities.messages}</span>
                      </div>
                    </div>
                    
                    <div className="text-left lg:text-right">
                      <div className="text-gray-600 dark:text-gray-300">{formatStorage(member.storageUsed)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Last active {member.lastActive.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <MemberProfileDialog member={member} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
