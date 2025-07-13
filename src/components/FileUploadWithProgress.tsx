
import { useState, useRef } from 'react';
import { Upload, X, File, Image, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FileWithProgress extends File {
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface FileUploadWithProgressProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes?: string;
  multiple?: boolean;
  maxSize?: number;
  className?: string;
}

const FileUploadWithProgress = ({ 
  onFileSelect, 
  acceptedTypes = "*", 
  multiple = true, 
  maxSize = 10,
  className = "" 
}: FileUploadWithProgressProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [filesWithProgress, setFilesWithProgress] = useState<FileWithProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    const newFilesWithProgress: FileWithProgress[] = validFiles.map(file => ({
      ...file,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading' as const
    }));

    setFilesWithProgress(prev => [...prev, ...newFilesWithProgress]);

    // Simulate upload progress
    newFilesWithProgress.forEach((fileWithProgress) => {
      simulateUploadProgress(fileWithProgress.id);
    });

    onFileSelect(validFiles);
  };

  const simulateUploadProgress = (fileId: string) => {
    const interval = setInterval(() => {
      setFilesWithProgress(prev => 
        prev.map(file => {
          if (file.id === fileId && file.status === 'uploading') {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100);
            const status = newProgress === 100 ? 'completed' : 'uploading';
            
            if (status === 'completed') {
              clearInterval(interval);
            }
            
            return { ...file, progress: newProgress, status };
          }
          return file;
        })
      );
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFilesWithProgress(prev => prev.filter(file => file.id !== fileId));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file: FileWithProgress) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-500" />;
    }
    return <File className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-rose-400 bg-rose-50' 
            : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />

        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Maximum file size: {maxSize}MB • {multiple ? 'Multiple files supported' : 'Single file only'}
        </p>
        
        <Button 
          onClick={openFileDialog}
          variant="outline"
          className="hover:bg-rose-50 hover:border-rose-200"
        >
          Choose Files
        </Button>
      </div>

      {filesWithProgress.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Upload Progress:</h4>
          {filesWithProgress.map((file) => (
            <div key={file.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Progress value={file.progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="capitalize">{file.status}</span>
                  <span>{Math.round(file.progress)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadWithProgress;
