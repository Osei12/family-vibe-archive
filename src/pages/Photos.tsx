
import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import PhotoGallery from "@/components/PhotoGallery";
import PhotoMetadataDialog from "@/components/PhotoMetadataDialog";
import StorageMetrics from "@/components/StorageMetrics";
import FileUpload from "@/components/FileUpload";
import PhotoFilters, { FilterOptions } from "@/components/PhotoFilters";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

// Mock data - in a real app, this would come from a database
const mockPhotos = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    title: "Family Cat Mittens",
    description: "Our beloved family cat enjoying a sunny afternoon",
    uploadedBy: "Sarah",
    uploadedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop",
    title: "Nature Walk",
    description: "Beautiful deer we spotted during our family hike",
    uploadedBy: "Dad",
    uploadedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    title: "Living Room Memories",
    description: "Where we gather for movie nights",
    uploadedBy: "Mom",
    uploadedAt: new Date("2024-01-05"),
  },
];

const Photos = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [photos, setPhotos] = useState(mockPhotos);
  const [showMetadataDialog, setShowMetadataDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({ sortBy: 'date-desc' });

  // Mock storage data - would come from backend
  const storageData = {
    used: 450, // MB
    total: 1024, // MB (1GB for free plan)
  };

  // Filter and sort photos based on current filters
  const filteredPhotos = useMemo(() => {
    let filtered = [...photos];

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(filters.searchQuery!.toLowerCase()) ||
        photo.description?.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(photo => photo.uploadedAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(photo => photo.uploadedAt <= filters.dateTo!);
    }

    // Filter by uploader
    if (filters.uploadedBy) {
      filtered = filtered.filter(photo => photo.uploadedBy === filters.uploadedBy);
    }

    // Sort photos
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return a.uploadedAt.getTime() - b.uploadedAt.getTime();
        case 'date-desc':
          return b.uploadedAt.getTime() - a.uploadedAt.getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return b.uploadedAt.getTime() - a.uploadedAt.getTime();
      }
    });

    return filtered;
  }, [photos, filters]);

  const handleFileUpload = (files: File[]) => {
    const file = files[0]; // Handle one file at a time for metadata collection
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPendingFile({
          file,
          preview: e.target?.result as string,
        });
        setShowMetadataDialog(true);
      };
      reader.readAsDataURL(file);
    }
    setShowUpload(false);
  };

  const handleMetadataSave = (metadata: {
    title: string;
    description: string;
  }) => {
    if (pendingFile) {
      const newPhoto = {
        id: Date.now().toString(),
        url: pendingFile.preview,
        title: metadata.title,
        description: metadata.description,
        uploadedBy: "You",
        uploadedAt: new Date(),
      };
      setPhotos((prev) => [newPhoto, ...prev]);
      setPendingFile(null);
      setShowMetadataDialog(false);
    }
  };

  const handleMetadataCancel = () => {
    setPendingFile(null);
    setShowMetadataDialog(false);
  };

  const handlePhotoRemove = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Family Photos
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Share and cherish your precious moments together
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <StorageMetrics
              usedStorage={storageData.used}
              totalStorage={storageData.total}
              className="flex-1 lg:w-80"
            />
            <Button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Photos
            </Button>
          </div>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-rose-500" />
              Upload New Photos
            </h2>
            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes="image/*"
              multiple={false}
              maxSize={5}
            />
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-6">
          <PhotoFilters onFilterChange={setFilters} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-rose-500 mb-2">
              {filteredPhotos.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {filteredPhotos.length === photos.length ? 'Total Photos' : 'Filtered Photos'}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {new Set(filteredPhotos.map((p) => p.uploadedBy)).size}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Contributors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {Math.round((filteredPhotos.length / 30) * 100)}%
            </div>
            <div className="text-gray-600 dark:text-gray-300">This Month</div>
          </div>
        </div>

        {/* Photo Gallery */}
        {filteredPhotos.length > 0 ? (
          <div className="max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            <PhotoGallery photos={filteredPhotos} onRemove={handlePhotoRemove} />
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {photos.length === 0 ? 'No photos yet' : 'No photos match your filters'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {photos.length === 0 
                ? 'Start building your family photo collection'
                : 'Try adjusting your filter criteria'
              }
            </p>
            {photos.length === 0 && (
              <Button
                onClick={() => setShowUpload(true)}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                Upload Your First Photo
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Photo Metadata Dialog */}
      <PhotoMetadataDialog
        isOpen={showMetadataDialog}
        onClose={handleMetadataCancel}
        onSave={handleMetadataSave}
        imagePreview={pendingFile?.preview}
      />
    </div>
  );
};

export default Photos;
