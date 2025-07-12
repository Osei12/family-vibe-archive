
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, FileText, Image } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  category: 'family' | 'legal' | 'medical' | 'financial' | 'other';
  url?: string;
  content?: string;
}

interface DocumentPreviewProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const DocumentPreview = ({ document, isOpen, onClose, onDownload }: DocumentPreviewProps) => {
  const renderPreview = () => {
    if (document.type.startsWith('image/')) {
      return (
        <div className="flex justify-center">
          <img 
            src={document.url || '/placeholder.svg'} 
            alt={document.name}
            className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
          />
        </div>
      );
    }

    if (document.type === 'application/pdf') {
      return (
        <div className="text-center py-8">
          <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">PDF Preview</p>
          <p className="text-sm text-gray-500">
            This is a PDF document. Click download to view the full document.
          </p>
        </div>
      );
    }

    if (document.content) {
      return (
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {document.content}
          </pre>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Document Preview</p>
        <p className="text-sm text-gray-500">
          Preview not available for this file type. Click download to access the document.
        </p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold truncate pr-4">
              {document.name}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                onClick={onDownload}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={onClose}
                size="sm"
                variant="outline"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            <span>Uploaded by {document.uploadedBy}</span>
            <span>•</span>
            <span>{document.uploadedAt.toLocaleDateString()}</span>
            <span>•</span>
            <span>{(document.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto mt-4">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreview;
