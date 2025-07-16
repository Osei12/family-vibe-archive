import { Progress } from "@/components/ui/progress";
import { HardDrive, Camera, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailedStorageMetricsProps {
  usedStorage: number; // in MB
  totalStorage: number; // in MB
  photosStorage: number; // in MB
  documentsStorage: number; // in MB
  className?: string;
}

const DetailedStorageMetrics = ({
  usedStorage,
  totalStorage,
  photosStorage,
  documentsStorage,
  className = "",
}: DetailedStorageMetricsProps) => {
  const usagePercentage = (usedStorage / totalStorage) * 100;
  const remainingStorage = totalStorage - usedStorage;
  const photosPercentage = (photosStorage / totalStorage) * 100;
  const documentsPercentage = (documentsStorage / totalStorage) * 100;

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  const getStorageColor = () => {
    if (usagePercentage >= 90) return "bg-red-500";
    if (usagePercentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <HardDrive className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Storage Usage
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* Overall Usage */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Total Usage</span>
            <span className="font-medium">
              {formatStorage(usedStorage)} of {formatStorage(totalStorage)}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{usagePercentage.toFixed(1)}% used</span>
            <span>{formatStorage(remainingStorage)} remaining</span>
          </div>
        </div>

        {/* Photos Storage */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="flex items-center">
              <Camera className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">Photos</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {formatStorage(photosStorage)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${photosPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {photosPercentage.toFixed(1)}% of total storage
          </div>
        </div>

        {/* Documents Storage */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                Documents
              </span>
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {formatStorage(documentsStorage)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${documentsPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {documentsPercentage.toFixed(1)}% of total storage
          </div>
        </div>
      </div>

      {usagePercentage >= 90 && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            ⚠️ Storage almost full! Consider upgrading your plan for more space.
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailedStorageMetrics;
