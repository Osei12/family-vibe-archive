
import { Progress } from '@/components/ui/progress';
import { HardDrive } from 'lucide-react';

interface StorageMetricsProps {
  usedStorage: number; // in MB
  totalStorage: number; // in MB
  className?: string;
}

const StorageMetrics = ({ usedStorage, totalStorage, className = '' }: StorageMetricsProps) => {
  const usagePercentage = (usedStorage / totalStorage) * 100;
  const remainingStorage = totalStorage - usedStorage;
  
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

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center mb-3">
        <HardDrive className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="font-semibold text-gray-800">Storage Usage</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatStorage(usedStorage)} used</span>
          <span>{formatStorage(remainingStorage)} remaining</span>
        </div>
        
        <Progress value={usagePercentage} className="h-2" />
        
        <div className="text-xs text-gray-500 text-center">
          {formatStorage(usedStorage)} of {formatStorage(totalStorage)} used ({usagePercentage.toFixed(1)}%)
        </div>
      </div>
      
      {usagePercentage >= 90 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600">
            Storage almost full! Consider upgrading your plan.
          </p>
        </div>
      )}
    </div>
  );
};

export default StorageMetrics;
