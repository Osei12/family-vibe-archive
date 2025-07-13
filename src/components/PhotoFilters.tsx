
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
import { Filter, Search, Calendar, User } from 'lucide-react';

interface PhotoFiltersProps {
  onFilterChange: (filters: PhotoFilterOptions) => void;
}

interface PhotoFilterOptions {
  search: string;
  uploadedBy: string;
  dateRange: string;
  sortBy: string;
}

const PhotoFilters = ({ onFilterChange }: PhotoFiltersProps) => {
  const [filters, setFilters] = useState<PhotoFilterOptions>({
    search: '',
    uploadedBy: '',
    dateRange: '',
    sortBy: 'newest',
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof PhotoFilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      uploadedBy: '',
      dateRange: '',
      sortBy: 'newest',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search photos..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Uploaded By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Uploaded By
              </label>
              <Select value={filters.uploadedBy} onValueChange={(value) => handleFilterChange('uploadedBy', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All members</SelectItem>
                  <SelectItem value="Sarah">Sarah</SelectItem>
                  <SelectItem value="Dad">Dad</SelectItem>
                  <SelectItem value="Mom">Mom</SelectItem>
                  <SelectItem value="You">You</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Range
              </label>
              <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="name">By name</SelectItem>
                  <SelectItem value="size">By size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={clearFilters} size="sm">
              Clear all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoFilters;
