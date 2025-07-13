import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import PhotoGallery from "@/components/PhotoGallery";
import PhotoMetadataDialog from "@/components/PhotoMetadataDialog";
import StorageMetrics from "@/components/StorageMetrics";
import FileUploadWithProgress from "@/components/FileUploadWithProgress";
import BulkActions from "@/components/BulkActions";
import PhotoFilters from "@/components/PhotoFilters";
import ShareDialog from "@/components/ShareDialog";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Share2 } from "lucide-react";

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
  const [filteredPhotos, setFilteredPhotos] = useState(mockPhotos);
  const [showMetadataDialog, setShowMetadataDialog] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Array<{file: File; preview: string}>>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const photosPerPage = 12;

  // Mock storage data - would come from backend
  const storageData = {
    used: 450, // MB
    total: 1024, // MB (1GB for free plan)
  };

  const handleMetadataSave = (metadata: {
    title: string;
    description: string;
  }) => {
    if (pendingFiles) {
      pendingFiles.forEach(pendingFile => {
        const newPhoto = {
          id: Date.now().toString(),
          url: pendingFile.preview,
          title: metadata.title,
          description: metadata.description,
          uploadedBy: "You",
          uploadedAt: new Date(),
        };
        setPhotos((prev) => [newPhoto, ...prev]);
      });
      setPendingFiles([]);
      setShowMetadataDialog(false);
    }
  };

  const handleMetadataCancel = () => {
    setPendingFiles([]);
    setShowMetadataDialog(false);
  };

  const handlePhotoRemove = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleFileUpload = (files: File[]) => {
    const newPendingFiles = files.map(file => {
      const reader = new FileReader();
      return new Promise<{file: File; preview: string}>((resolve) => {
        reader.onload = (e) => {
          resolve({
            file,
            preview: e.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPendingFiles).then(results => {
      setPendingFiles(results);
      if (results.length > 0) {
        setShowMetadataDialog(true);
      }
    });
    setShowUpload(false);
  };

  const handleBulkDownload = (selectedIds: string[]) => {
    selectedIds.forEach(photoId => {
      const photo = photos.find(p => p.id === photoId);
      if (photo) {
        const link = document.createElement('a');
        link.href = photo.url;
        link.download = `${photo.title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...photos];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        photo.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply uploader filter
    if (filters.uploadedBy) {
      filtered = filtered.filter(photo => photo.uploadedBy === filters.uploadedBy);
    }

    // Apply date filter
    if (filters.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      if (filters.dateRange !== '') {
        filtered = filtered.filter(photo => photo.uploadedAt >= filterDate);
      }
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.uploadedAt.getTime() - b.uploadedAt.getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredPhotos(filtered);
    setCurrentPage(1);
  };

  const loadMorePhotos = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 1000); // Simulate loading
  };

  const displayedPhotos = filteredPhotos.slice(0, currentPage * photosPerPage);
  const hasMore = displayedPhotos.length < filteredPhotos.length;

  const handlePhotoShare = (photo: any) => {
    return (
      <ShareDialog
        title={photo.title}
        content={`Check out this photo: ${photo.description || ''}`}
        url={photo.url}
      >
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </ShareDialog>
    );
  };

  const handlePhotoDownload = (photo: any) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-neutral-200 mb-2">
              Family Photos
            </h1>
            <p className="text-gray-600 dark:text-neutral-400">
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
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-rose-500" />
              Upload New Photos
            </h2>
            <FileUploadWithProgress
              onFileSelect={handleFileUpload}
              acceptedTypes="image/*"
              multiple={true}
              maxSize={5}
            />
          </div>
        )}

        {/* Photo Filters */}
        <PhotoFilters onFilterChange={handleFilterChange} />

        {/* Bulk Actions */}
        {filteredPhotos.length > 0 && (
          <BulkActions
            items={filteredPhotos}
            selectedItems={selectedPhotos}
            onSelectionChange={setSelectedPhotos}
            onBulkDownload={handleBulkDownload}
            getItemId={(photo) => photo.id}
            getItemName={(photo) => photo.title}
            className="mb-6"
          />
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-rose-500 mb-2">
              {photos.length}
            </div>
            <div className="text-gray-600">Total Photos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {new Set(photos.map((p) => p.uploadedBy)).size}
            </div>
            <div className="text-gray-600">Contributors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {Math.round((photos.length / 30) * 100)}%
            </div>
            <div className="text-gray-600">This Month</div>
          </div>
        </div>

        {/* Photo Gallery with Infinite Scroll */}
        {displayedPhotos.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {displayedPhotos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-sm font-medium truncate mb-2">
                      {photo.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-xs">by {photo.uploadedBy}</p>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePhotoDownload(photo)}
                          className="text-white hover:bg-white/20 h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {handlePhotoShare(photo)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={loadMorePhotos}
                  disabled={loading}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  {loading ? "Loading..." : "Load More Photos"}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No photos yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your family photo collection
            </p>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              Upload Your First Photo
            </Button>
          </div>
        )}
      </div>

      {/* Photo Metadata Dialog - Updated for multiple files */}
      <PhotoMetadataDialog
        isOpen={showMetadataDialog}
        onClose={handleMetadataCancel}
        onSave={handleMetadataSave}
        imagePreview={pendingFiles[0]?.preview}
      />
    </div>
  );
};

export default Photos;
