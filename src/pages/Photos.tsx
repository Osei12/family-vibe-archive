
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PhotoGallery from '@/components/PhotoGallery';
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

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: '',
          uploadedBy: 'You',
          uploadedAt: new Date(),
        };
        setPhotos(prev => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    });
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Family Photos</h1>
            <p className="text-gray-600">Share and cherish your precious moments together</p>
          </div>
          
          <Button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Photos
          </Button>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-rose-500" />
              Upload New Photos
            </h2>
            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes="image/*"
              multiple={true}
              maxSize={5}
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-rose-500 mb-2">{photos.length}</div>
            <div className="text-gray-600">Total Photos</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {new Set(photos.map(p => p.uploadedBy)).size}
            </div>
            <div className="text-gray-600">Contributors</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {Math.round((photos.length / 30) * 100)}%
            </div>
            <div className="text-gray-600">This Month</div>
          </div>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 ? (
          <PhotoGallery photos={photos} />
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No photos yet</h3>
            <p className="text-gray-600 mb-6">Start building your family photo collection</p>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              Upload Your First Photo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
