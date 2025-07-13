
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  HardDrive, 
  Camera, 
  FileText, 
  Trash2, 
  Download,
  Upload,
  AlertTriangle,
  TrendingUp,
  Database,
  Archive
} from 'lucide-react';

interface StorageManagementProps {
  className?: string;
}

const StorageManagement = ({ className = '' }: StorageManagementProps) => {
  const [storageData] = useState({
    used: 750, // MB
    total: 1024, // MB (1GB)
    photos: 520,
    documents: 180,
    other: 50
  });

  const usagePercentage = (storageData.used / storageData.total) * 100;
  const remainingStorage = storageData.total - storageData.used;
  
  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  const getStorageColor = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleCleanup = () => {
    console.log('Starting storage cleanup...');
    // TODO: Implement storage cleanup
  };

  const handleArchive = () => {
    console.log('Starting archive process...');
    // TODO: Implement archive functionality
  };

  const handleUpgrade = () => {
    console.log('Redirecting to upgrade page...');
    // TODO: Implement upgrade functionality
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Storage Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <HardDrive className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Storage Overview</h2>
          </div>
          <Badge variant={usagePercentage >= 90 ? "destructive" : usagePercentage >= 75 ? "secondary" : "default"}>
            {usagePercentage.toFixed(1)}% Used
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>Total Usage</span>
              <span className="font-medium">{formatStorage(storageData.used)} of {formatStorage(storageData.total)}</span>
            </div>
            <Progress value={usagePercentage} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{formatStorage(storageData.used)} used</span>
              <span>{formatStorage(remainingStorage)} remaining</span>
            </div>
          </div>

          {usagePercentage >= 90 && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Storage Almost Full</p>
                <p className="text-xs text-red-600 dark:text-red-400">Consider upgrading your plan or cleaning up old files.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Storage Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-medium text-gray-800 dark:text-gray-100">Photos</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {formatStorage(storageData.photos)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(storageData.photos / storageData.total) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((storageData.photos / storageData.total) * 100).toFixed(1)}% of total
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium text-gray-800 dark:text-gray-100">Documents</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {formatStorage(storageData.documents)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(storageData.documents / storageData.total) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((storageData.documents / storageData.total) * 100).toFixed(1)}% of total
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium text-gray-800 dark:text-gray-100">Other</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {formatStorage(storageData.other)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(storageData.other / storageData.total) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((storageData.other / storageData.total) * 100).toFixed(1)}% of total
          </div>
        </div>
      </div>

      {/* Storage Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Storage Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center"
            onClick={handleCleanup}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Cleanup
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center"
            onClick={handleArchive}
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive Old Files
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center"
            onClick={handleUpgrade}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorageManagement;
