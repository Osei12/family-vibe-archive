import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar, User } from 'lucide-react';

interface PhotoFiltersProps {
  onFilterChange: (filters: PhotoFilterOptions) => void;
  currentFilters?: PhotoFilterOptions;
}

interface PhotoFilterOptions {
  uploader: string;
  dateRange: { start: string; end: string };
  tags: string[];
  sortBy: string;
  type?: string;
}

const PhotoFilters = ({ onFilterChange, currentFilters }: PhotoFiltersProps) => {
  const [filters, setFilters] = useState<PhotoFilterOptions>(
    currentFilters || {
      uploader: '',
      dateRange: { start: '', end: '' },
      tags: [],
      sortBy: 'newest',
      type: 'all'
    }
  );

  const handleFilterChange = (key: keyof PhotoFilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      uploader: '',
      dateRange: { start: '', end: '' },
      tags: [],
      sortBy: 'newest',
      type: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="space-y-6">
      {/* Uploaded By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Uploaded By
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Filter by uploader..."
            value={filters.uploader}
            onChange={(e) => handleFilterChange('uploader', e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date Range
        </label>
        <div className="space-y-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              placeholder="Start date"
              value={filters.dateRange.start}
              onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
              className="pl-9"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              placeholder="End date"
              value={filters.dateRange.end}
              onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort By
        </label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Date Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Filters
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              handleFilterChange('dateRange', { start: today, end: today });
            }}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              handleFilterChange('dateRange', { 
                start: weekAgo.toISOString().split('T')[0], 
                end: today.toISOString().split('T')[0] 
              });
            }}
          >
            This Week
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoFilters;