// import { useState } from "react";
// import Navigation from "@/components/Navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Upload,
//   Search,
//   Calendar,
//   User,
//   Image,
//   Download,
//   Heart,
//   MessageCircle,
//   Share2,
//   Filter,
//   Grid3X3,
//   List,
// } from "lucide-react";
// import PhotoGallery from "@/components/PhotoGallery";
// import PhotoFilters from "@/components/PhotoFilters";
// import FileUploadWithProgress from "@/components/FileUploadWithProgress";
// import BulkActions from "@/components/BulkActions";

// // Mock data for photos
// const mockPhotos = [
//   {
//     id: "1",
//     url: "/placeholder.svg",
//     title: "Family Vacation 2024",
//     description: "Amazing sunset at the beach during our summer vacation",
//     uploadedBy: "Sarah Johnson",
//     uploadedAt: new Date("2024-01-15"),
//     likes: 12,
//     comments: 3,
//     tags: ["vacation", "sunset", "beach"],
//     size: "2.5 MB",
//   },
//   {
//     id: "2",
//     url: "/placeholder.svg",
//     title: "Birthday Celebration",
//     description: "Emma's 18th birthday party with the whole family",
//     uploadedBy: "Mike Johnson",
//     uploadedAt: new Date("2024-01-10"),
//     likes: 25,
//     comments: 8,
//     tags: ["birthday", "family", "celebration"],
//     size: "3.2 MB",
//   },
//   {
//     id: "3",
//     url: "/placeholder.svg",
//     title: "Christmas Morning",
//     description: "Opening presents on Christmas morning",
//     uploadedBy: "Emma Johnson",
//     uploadedAt: new Date("2023-12-25"),
//     likes: 18,
//     comments: 6,
//     tags: ["christmas", "presents", "family"],
//     size: "4.1 MB",
//   },
//   {
//     id: "4",
//     url: "/placeholder.svg",
//     title: "Graduation Day",
//     description: "So proud of our graduate!",
//     uploadedBy: "David Johnson",
//     uploadedAt: new Date("2023-06-15"),
//     likes: 32,
//     comments: 12,
//     tags: ["graduation", "achievement", "proud"],
//     size: "2.8 MB",
//   },
// ];

// const Photos = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     search: "",
//     uploadedBy: "",
//     dateRange: "",
//     sortBy: "newest",
//   });

//   const filteredPhotos = mockPhotos.filter((photo) => {
//     const matchesSearch =
//       photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       photo.tags.some((tag) =>
//         tag.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//     const matchesUploader =
//       !filters.uploadedBy ||
//       photo.uploadedBy.toLowerCase().includes(filters.uploadedBy.toLowerCase());

//     return matchesSearch && matchesUploader;
//   });

//   const handlePhotoSelect = (photoId: string) => {
//     setSelectedPhotos((prev) =>
//       prev.includes(photoId)
//         ? prev.filter((id) => id !== photoId)
//         : [...prev, photoId]
//     );
//   };

//   const handleSelectAll = () => {
//     setSelectedPhotos(
//       selectedPhotos.length === filteredPhotos.length
//         ? []
//         : filteredPhotos.map((photo) => photo.id)
//     );
//   };

//   const handleBulkDownload = () => {
//     console.log("Downloading photos:", selectedPhotos);
//     // TODO: Implement bulk download
//   };

//   const handleBulkDelete = () => {
//     console.log("Deleting photos:", selectedPhotos);
//     // TODO: Implement bulk delete
//     setSelectedPhotos([]);
//   };

//   const handleFilterChange = (newFilters: any) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
//       <Navigation />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
//               Family Photos
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300">
//               Cherish and share your precious family memories
//             </p>
//           </div>

//           <FileUploadWithProgress
//             onFileSelect={(files) => console.log("Uploading photos:", files)}
//             acceptedTypes="image/*"
//             multiple
//           />
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4 mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <Input
//                 placeholder="Search photos by title, description, or tags..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center"
//               >
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filters
//               </Button>

//               <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("grid")}
//                   className="rounded-r-none"
//                 >
//                   <Grid3X3 className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("list")}
//                   className="rounded-l-none"
//                 >
//                   <List className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {showFilters && <PhotoFilters onFilterChange={handleFilterChange} />}
//         </div>

//         {/* Bulk Actions */}
//         {selectedPhotos.length > 0 && (
//           <BulkActions
//             items={filteredPhotos}
//             selectedItems={selectedPhotos}
//             onSelectionChange={setSelectedPhotos}
//             onBulkDownload={handleBulkDownload}
//             getItemId={(photo) => photo.id}
//             getItemName={(photo) => photo.title}
//             className="mb-6"
//           />
//         )}

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center">
//               <Image className="h-8 w-8 text-blue-500 mr-3" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//                   {filteredPhotos.length}
//                 </div>
//                 <div className="text-gray-600 dark:text-gray-400 text-sm">
//                   Total Photos
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center">
//               <Heart className="h-8 w-8 text-red-500 mr-3" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//                   {filteredPhotos.reduce((sum, photo) => sum + photo.likes, 0)}
//                 </div>
//                 <div className="text-gray-600 dark:text-gray-400 text-sm">
//                   Total Likes
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center">
//               <MessageCircle className="h-8 w-8 text-green-500 mr-3" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//                   {filteredPhotos.reduce(
//                     (sum, photo) => sum + photo.comments,
//                     0
//                   )}
//                 </div>
//                 <div className="text-gray-600 dark:text-gray-400 text-sm">
//                   Comments
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center">
//               <User className="h-8 w-8 text-purple-500 mr-3" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//                   {new Set(filteredPhotos.map((p) => p.uploadedBy)).size}
//                 </div>
//                 <div className="text-gray-600 dark:text-gray-400 text-sm">
//                   Contributors
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Photo Gallery */}
//         <PhotoGallery
//           photos={filteredPhotos}
//           onRemove={(id) => console.log("Remove photo:", id)}
//         />

//         {filteredPhotos.length === 0 && (
//           <div className="text-center py-12">
//             <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
//               No photos found
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               Try adjusting your search terms or upload some new memories.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Photos;

import { useState } from "react";
import Navigation from "@/components/Navigation";
import PhotoGallery, { PhotoType } from "@/components/PhotoGallery";
import PhotoMetadataDialog from "@/components/PhotoMetadataDialog";
import StorageMetrics from "@/components/StorageMetrics";
import FileUpload from "@/components/FileUpload";
import PhotoFilters from "@/components/PhotoFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Plus,
  Upload,
  Search,
  Filter,
  Video,
  Image,
  Calendar,
} from "lucide-react";

// Mock data - in a real app, this would come from a database
const mockPhotos: PhotoType[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    title: "Family Cat Mittens",
    description: "Our beloved family cat enjoying a sunny afternoon",
    uploadedBy: "Sarah",
    uploadedAt: new Date("2024-01-15"),
    type: "image" as const,
    size: "2.5 MB",
    tags: ["pets", "family", "cute"],
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop",
    title: "Nature Walk",
    description: "Beautiful deer we spotted during our family hike",
    uploadedBy: "Dad",
    uploadedAt: new Date("2024-01-10"),
    type: "image" as const,
    size: "3.1 MB",
    tags: ["nature", "hiking", "animals"],
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    title: "Living Room Memories",
    description: "Where we gather for movie nights",
    uploadedBy: "Mom",
    uploadedAt: new Date("2024-01-05"),
    type: "image" as const,
    size: "1.8 MB",
    tags: ["home", "family", "memories"],
  },
  // {
  //   id: "4",
  //   url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  //   title: "Birthday Party Video",
  //   description: "Emma's 16th birthday celebration",
  //   uploadedBy: "Dad",
  //   uploadedAt: new Date("2024-01-12"),
  //   type: "video" as const,
  //   size: "15.2 MB",
  //   tags: ["birthday", "celebration", "party"],
  // },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=400&h=400&fit=crop",
    title: "Christmas Morning",
    description: "Opening presents together",
    uploadedBy: "Mom",
    uploadedAt: new Date("2023-12-25"),
    type: "image" as const,
    size: "4.2 MB",
    tags: ["christmas", "presents", "holiday"],
  },
];

const Media = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [photos, setPhotos] = useState(mockPhotos);
  const [showMetadataDialog, setShowMetadataDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<{
    file: File;
    preview: string;
    type: "image" | "video";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    uploader: "",
    dateRange: { start: "", end: "" },
    tags: [] as string[],
    sortBy: "newest",
    type: "all", // all, image, video
  });

  // Mock storage data - would come from backend
  const storageData = {
    used: 450, // MB
    total: 1024, // MB (1GB for free plan)
  };

  const handleFileUpload = (files: File[]) => {
    const file = files[0]; // Handle one file at a time for metadata collection
    if (file) {
      const isVideo = file.type.startsWith("video/");
      const reader = new FileReader();
      reader.onload = (e) => {
        setPendingFile({
          file,
          preview: e.target?.result as string,
          type: isVideo ? "video" : "image",
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
        type: pendingFile.type,
        size: `${(pendingFile.file.size / (1024 * 1024)).toFixed(1)} MB`,
        tags: ["new-upload"],
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

  // Filter photos based on search and filters
  const filteredPhotos = photos
    .filter((photo) => {
      const matchesSearch =
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesUploader =
        !filters.uploader ||
        photo.uploadedBy.toLowerCase().includes(filters.uploader.toLowerCase());

      const matchesType = filters.type === "all" || photo.type === filters.type;

      const matchesDateRange =
        !filters.dateRange.start ||
        !filters.dateRange.end ||
        (photo.uploadedAt >= new Date(filters.dateRange.start) &&
          photo.uploadedAt <= new Date(filters.dateRange.end));

      return (
        matchesSearch && matchesUploader && matchesType && matchesDateRange
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return a.uploadedAt.getTime() - b.uploadedAt.getTime();
        case "newest":
        default:
          return b.uploadedAt.getTime() - a.uploadedAt.getTime();
      }
    });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      uploader: "",
      dateRange: { start: "", end: "" },
      tags: [],
      sortBy: "newest",
      type: "all",
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-neutral-200 mb-2">
              Family Media
            </h1>
            <p className="text-gray-600 dark:text-neutral-400">
              Share photos, videos, and cherish your precious moments together
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* <StorageMetrics
              usedStorage={storageData.used}
              totalStorage={storageData.total}
              className="flex-1 lg:w-80"
            /> */}
            <Button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Media
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search photos, videos, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>
                      Filter your media by date, uploader, type, and more
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <PhotoFilters
                      onFilterChange={handleFilterChange}
                      currentFilters={filters}
                    />
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
                <Button
                  variant={filters.type === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, type: "all" }))
                  }
                  className="rounded-r-none"
                >
                  All
                </Button>
                <Button
                  variant={filters.type === "image" ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, type: "image" }))
                  }
                  className="rounded-none"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  variant={filters.type === "video" ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, type: "video" }))
                  }
                  className="rounded-l-none"
                >
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm ||
            filters.uploader ||
            filters.type !== "all" ||
            filters.dateRange.start) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchTerm && (
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  Search: "{searchTerm}"
                </div>
              )}
              {filters.uploader && (
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  Uploader: {filters.uploader}
                </div>
              )}
              {filters.type !== "all" && (
                <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  Type: {filters.type}
                </div>
              )}
            </div>
          )}
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
              acceptedTypes="image/*,video/*"
              multiple={false}
              maxSize={50}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, MOV, AVI. Max size: 50MB
              per file.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-rose-500 mb-2">
              {filteredPhotos.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Media</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {filteredPhotos.filter((p) => p.type === "image").length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Photos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {filteredPhotos.filter((p) => p.type === "video").length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Videos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {new Set(filteredPhotos.map((p) => p.uploadedBy)).size}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Contributors</div>
          </div>
        </div>

        {/* Media Gallery */}
        {filteredPhotos.length > 0 ? (
          <div className="max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <PhotoGallery
              photos={filteredPhotos}
              onRemove={handlePhotoRemove}
            />
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              No media found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filters.uploader || filters.type !== "all"
                ? "Try adjusting your search or filters to find more content."
                : "Start building your family media collection"}
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

      {/* Photo Metadata Dialog */}
      <PhotoMetadataDialog
        isOpen={showMetadataDialog}
        onClose={handleMetadataCancel}
        onSave={handleMetadataSave}
        type={pendingFile?.type === "video" ? "video" : "image"} // fallback safety
        imagePreview={pendingFile?.preview}
      />
    </div>
  );
};

export default Media;
