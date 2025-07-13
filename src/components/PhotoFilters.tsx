
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Filter, X, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PhotoFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  dateFrom?: Date;
  dateTo?: Date;
  uploadedBy?: string;
  searchQuery?: string;
  sortBy?: 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';
}

const PhotoFilters = ({ onFilterChange }: PhotoFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'date-desc'
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = { sortBy: 'date-desc' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.dateFrom || filters.dateTo || filters.uploadedBy || filters.searchQuery;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 dark:border-gray-700 dark:hover:bg-gray-800">
          <Filter className="h-4 w-4" />
          Filter Photos
          {hasActiveFilters && (
            <span className="h-2 w-2 bg-rose-500 rounded-full" />
          )}
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="dark:bg-gray-900 dark:border-gray-700">
        <DrawerHeader className="dark:text-white">
          <DrawerTitle className="flex items-center justify-between">
            Filter Photos
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-rose-500 hover:text-rose-600 dark:hover:bg-gray-800"
              >
                Clear All
              </Button>
            )}
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="dark:text-gray-200">Search by title</Label>
            <Input
              id="search"
              placeholder="Search photos..."
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <Label className="dark:text-gray-200">Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-from" className="text-sm dark:text-gray-300">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal dark:border-gray-700 dark:hover:bg-gray-800",
                        !filters.dateFrom && "text-muted-foreground dark:text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom}
                      onSelect={(date) => handleFilterChange('dateFrom', date)}
                      className="pointer-events-auto dark:text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="date-to" className="text-sm dark:text-gray-300">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal dark:border-gray-700 dark:hover:bg-gray-800",
                        !filters.dateTo && "text-muted-foreground dark:text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateTo ? format(filters.dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo}
                      onSelect={(date) => handleFilterChange('dateTo', date)}
                      className="pointer-events-auto dark:text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Uploaded By */}
          <div className="space-y-2">
            <Label className="dark:text-gray-200">Uploaded By</Label>
            <Select 
              value={filters.uploadedBy || ''} 
              onValueChange={(value) => handleFilterChange('uploadedBy', value || undefined)}
            >
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="All contributors" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="" className="dark:text-white dark:hover:bg-gray-700">All contributors</SelectItem>
                <SelectItem value="Sarah" className="dark:text-white dark:hover:bg-gray-700">Sarah</SelectItem>
                <SelectItem value="Dad" className="dark:text-white dark:hover:bg-gray-700">Dad</SelectItem>
                <SelectItem value="Mom" className="dark:text-white dark:hover:bg-gray-700">Mom</SelectItem>
                <SelectItem value="You" className="dark:text-white dark:hover:bg-gray-700">You</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label className="dark:text-gray-200">Sort By</Label>
            <Select 
              value={filters.sortBy} 
              onValueChange={(value) => handleFilterChange('sortBy', value)}
            >
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="date-desc" className="dark:text-white dark:hover:bg-gray-700">Newest First</SelectItem>
                <SelectItem value="date-asc" className="dark:text-white dark:hover:bg-gray-700">Oldest First</SelectItem>
                <SelectItem value="title-asc" className="dark:text-white dark:hover:bg-gray-700">Title A-Z</SelectItem>
                <SelectItem value="title-desc" className="dark:text-white dark:hover:bg-gray-700">Title Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PhotoFilters;
