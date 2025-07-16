import { useState } from "react";
import { X, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PhotoType {
  id: string;
  url: string;
  title: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: Date;
  type: "image" | "video"; // ✅ fixed
  size: string;
  tags: string[];
}

interface PhotoGalleryProps {
  photos: PhotoType[];
  onRemove: (id: string) => void;
}

const PhotoGallery = ({ photos, onRemove }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  const toggleLike = (photoId: string) => {
    const newLiked = new Set(likedPhotos);
    if (newLiked.has(photoId)) {
      newLiked.delete(photoId);
    } else {
      newLiked.add(photoId);
    }
    setLikedPhotos(newLiked);
  };

  return (
    <div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => setSelectedPhoto(photo)}
          >
            {photo.type === "image" ? (
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                src={photo.url}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                muted
                playsInline
                preload="metadata"
              />
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-sm font-medium truncate">
                {photo.title}
              </h3>
              <p className="text-white/80 text-xs">by {photo.uploadedBy}</p>
            </div>

            {/* Like button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(photo.id);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
            >
              <Heart
                className={`h-4 w-4 ${
                  likedPhotos.has(photo.id)
                    ? "text-red-500 fill-current"
                    : "text-gray-600"
                }`}
              />
            </button>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(photo.id);
              }}
              className="absolute top-3 left-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Photo/Video Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {selectedPhoto.type === "image" ? (
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <video
                src={selectedPhoto.url}
                controls
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Close button */}
            <Button
              onClick={() => setSelectedPhoto(null)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Info section */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-2">
                {selectedPhoto.title}
              </h2>
              {selectedPhoto.description && (
                <p className="text-gray-300 mb-2">
                  {selectedPhoto.description}
                </p>
              )}
              <div className="flex justify-between items-center text-sm">
                <span>Uploaded by {selectedPhoto.uploadedBy}</span>
                <span>{selectedPhoto.uploadedAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
