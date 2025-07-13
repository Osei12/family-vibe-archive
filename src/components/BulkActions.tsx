
import { useState } from 'react';
import { Download, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkActionsProps<T> {
  items: T[];
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onBulkDownload: (selectedIds: string[]) => void;
  getItemId: (item: T) => string;
  getItemName: (item: T) => string;
  className?: string;
}

function BulkActions<T>({ 
  items, 
  selectedItems, 
  onSelectionChange, 
  onBulkDownload,
  getItemId,
  getItemName,
  className = "" 
}: BulkActionsProps<T>) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(items.map(getItemId));
    }
  };

  const handleItemToggle = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    } else {
      onSelectionChange([...selectedItems, itemId]);
    }
  };

  const handleBulkDownload = () => {
    onBulkDownload(selectedItems);
    setIsSelectionMode(false);
    onSelectionChange([]);
  };

  const allSelected = selectedItems.length === items.length && items.length > 0;
  const someSelected = selectedItems.length > 0;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant={isSelectionMode ? "default" : "outline"}
            onClick={() => {
              setIsSelectionMode(!isSelectionMode);
              if (!isSelectionMode) {
                onSelectionChange([]);
              }
            }}
            className="text-sm"
          >
            {isSelectionMode ? 'Cancel Selection' : 'Select Items'}
          </Button>

          {isSelectionMode && (
            <button
              onClick={handleSelectAll}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
            >
              {allSelected ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              <span>Select All ({items.length})</span>
            </button>
          )}
        </div>

        {someSelected && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedItems.length} selected
            </span>
            <Button
              onClick={handleBulkDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Selected
            </Button>
          </div>
        )}
      </div>

      {isSelectionMode && (
        <div className="text-xs text-gray-500">
          Click on items to select them for bulk operations
        </div>
      )}
    </div>
  );
}

export default BulkActions;
