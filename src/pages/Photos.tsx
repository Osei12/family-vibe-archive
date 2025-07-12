
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PhotoGallery from '@/components/PhotoGallery';
import PhotoMetadataDialog from '@/components/PhotoMetadataDialog';
import StorageMetrics from '@/components/StorageMetrics';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

// Mock data - in a real app, this would come from a database
const mockPhotos = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    title: 'Family Cat Mittens',
    description: 'Our beloved family cat enjoying a sunny afternoon',
    uploadedBy: 'Sarah',
    uploadedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop',
    title: 'Nature Walk',
    description: 'Beautiful deer we spotted during our family hike',
    uploadedBy: 'Dad',
    uploadedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    title: 'Living Room Memories',
    description: 'Where we gather for movie nights',
    uploadedBy: 'Mom',
    uploadedAt: new Date('2024-01-05'),
  },
];

const Photos = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [photos, setPhotos] = useState(mockPhotos);
  const [showMetadataDialog, setShowMetadataDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<{file: File, preview: string} | null>(null);

  // Mock storage data - would come from backend
  const storageData = {
    used: 450, // MB
    total: 1024, // MB (1GB for free plan)
  };

  const handleFileUpload = (files: File[]) => {
    const file = files[0]; // Handle one file at a time for metadata collection
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPendingFile({
          file,
          preview: e.target?.result as string
        });
        setShowMetadataDialog(true);
      };
      reader.readAsDataURL(file);
    }
    setShowUpload(false);
  };

  const handleMetadataSave = (metadata: { title: string; description: string }) => {
    if (pendingFile) {
      const newPhoto = {
        id: Date.now().toString(),
        url: pendingFile.preview,
        title: metadata.title,
        description: metadata.description,
        uploadedBy: 'You',
        uploadedAt: new Date(),
      };
      setPhotos(prev => [newPhoto, ...prev]);
      setPendingFile(null);
    }
  };

  const handleMetadataCancel = () => {
    setPendingFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Family Photos</h1>
            <p className="text-gray-600 dark:text-gray-300">Share and cherish your precious moments together</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <StorageMetrics 
              usedStorage={storageData.used} 
              totalStorage={storageData.total}
              className="flex-1 lg:w-80"
            />
            <Button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Photos
            </Button>
          </div>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-6 lg:mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-rose-500 dark:text-rose-400" />
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-2xl lg:text-3xl font-bold text-rose-500 dark:text-rose-400 mb-2">{photos.length}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">Total Photos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-2xl lg:text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">
              {new Set(photos.map(p => p.uploadedBy)).size}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">Contributors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-2xl lg:text-3xl font-bold text-green-500 dark:text-green-400 mb-2">
              {Math.round((photos.length / 30) * 100)}%
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">This Month</div>
          </div>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 ? (
          <div className="max-h-[600px] lg:max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            <PhotoGallery photos={photos} />
          </div>
        ) : (
          <div className="text-center py-12 lg:py-16">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-10 w-10 lg:h-12 lg:w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No photos yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Start building your family photo collection</p>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white"
            >
              Upload Your First Photo
            </Button>
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
