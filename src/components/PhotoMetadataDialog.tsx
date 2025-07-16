import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PhotoMetadataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (metadata: { title: string; description: string }) => void;
  imagePreview?: string;
  type: "image" | "video";
}

const PhotoMetadataDialog = ({
  isOpen,
  onClose,
  onSave,
  imagePreview,
  type,
}: PhotoMetadataDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave({ title: title || "Untitled Photo", description });
    setTitle("");
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Photo Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {imagePreview && (
            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
              {type === "image" ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={imagePreview}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Photo Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this photo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description or memory about this photo"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-rose-500 hover:bg-rose-600"
          >
            Save Media
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoMetadataDialog;
