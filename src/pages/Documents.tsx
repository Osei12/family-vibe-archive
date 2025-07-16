import { useState } from "react";
import Navigation from "@/components/Navigation";
import FileUploadWithProgress from "@/components/FileUploadWithProgress";
import DocumentPreview from "@/components/DocumentPreview";
import BulkActions from "@/components/BulkActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Folder,
  Trash2,
  CheckSquare,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  category: "family" | "legal" | "medical" | "financial" | "other";
  url?: string;
  content?: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Family Tree Research.pdf",
    type: "application/pdf",
    size: 2500000,
    uploadedBy: "Grandma",
    uploadedAt: new Date("2024-01-20"),
    category: "family",
    url: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Recipe Collection.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 1800000,
    uploadedBy: "Mom",
    uploadedAt: new Date("2024-01-18"),
    category: "family",
    content: "Sample recipe content for preview...",
  },
];

const Documents = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [uploadCategory, setUploadCategory] = useState<"family" | "legal" | "medical" | "financial" | "other">("other");
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "All Documents", count: documents.length },
    {
      id: "family",
      label: "Family",
      count: documents.filter((d) => d.category === "family").length,
    },
    {
      id: "legal",
      label: "Legal",
      count: documents.filter((d) => d.category === "legal").length,
    },
    {
      id: "medical",
      label: "Medical",
      count: documents.filter((d) => d.category === "medical").length,
    },
    {
      id: "financial",
      label: "Financial",
      count: documents.filter((d) => d.category === "financial").length,
    },
    {
      id: "other",
      label: "Other",
      count: documents.filter((d) => d.category === "other").length,
    },
  ];

  const filteredDocuments =
    selectedCategory === "all"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory);

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedBy: "You",
        uploadedAt: new Date(),
        category: uploadCategory,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    });
    setShowUpload(false);
  };

  const handleCategoryUpload = (category: "family" | "legal" | "medical" | "financial" | "other") => {
    setUploadCategory(category);
    setShowUpload(true);
  };

  const handleBulkDownload = (selectedIds: string[]) => {
    selectedIds.forEach(docId => {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        if (doc.url) {
          const link = document.createElement("a");
          link.href = doc.url;
          link.download = doc.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (doc.content) {
          const blob = new Blob([doc.content], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = doc.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    });
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    setDocuments(prev => prev.filter(doc => !selectedIds.includes(doc.id)));
    setSelectedDocuments([]);
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word") || type.includes("document")) return "📝";
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
    if (type.includes("image")) return "🖼️";
    return "📁";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "family":
        return "bg-rose-100 text-rose-700";
      case "legal":
        return "bg-blue-100 text-blue-700";
      case "medical":
        return "bg-green-100 text-green-700";
      case "financial":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDocument = (doc: Document) => {
    setPreviewDocument(doc);
  };

  const handleDownloadDocument = (doc: Document) => {
    if (doc.url) {
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc.content) {
      const blob = new Blob([doc.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-neutral-300">
              Family Documents
            </h1>
            <p className="text-gray-600 dark:text-neutral-400">
              Keep important family documents organized and accessible
            </p>
          </div>

          <Button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Document
          </Button>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              Upload New Document to {uploadCategory.charAt(0).toUpperCase() + uploadCategory.slice(1)}
            </h2>

            <FileUploadWithProgress
              onFileSelect={handleFileUpload}
              acceptedTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              multiple={true}
              maxSize={10}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-300 mb-4 flex items-center">
                <Folder className="h-5 w-5 mr-2 text-blue-500" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === category.id
                          ? "bg-blue-50 dark: text-blue-600 border border-blue-200"
                          : "text-gray-600 dark:text-neutral-400 hover:bg-gray-50"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                    {category.id !== "all" && (
                      <Button
                        onClick={() =>
                          handleCategoryUpload(
                            category.id as "family" | "legal" | "medical" | "financial" | "other"
                          )
                        }
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add to {category.label}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-3">
            {/* Selection Controls */}
            {filteredDocuments.length > 0 && (
              <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={handleSelectAll}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <CheckSquare className="h-4 w-4" />
                      <span>
                        {selectedDocuments.length === filteredDocuments.length ? "Deselect All" : "Select All"}
                      </span>
                    </Button>
                    {selectedDocuments.length > 0 && (
                      <span className="text-sm text-gray-600">
                        {selectedDocuments.length} of {filteredDocuments.length} selected
                      </span>
                    )}
                  </div>
                  {selectedDocuments.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleBulkDownload(selectedDocuments)}
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Selected
                      </Button>
                      <Button
                        onClick={() => handleBulkDelete(selectedDocuments)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {filteredDocuments.length > 0 ? (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md ${
                      selectedDocuments.includes(doc.id) 
                        ? "border-blue-200 bg-blue-50" 
                        : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={() => handleDocumentSelect(doc.id)}
                            className="mt-1"
                          />
                          <div className="text-3xl">{getFileIcon(doc.type)}</div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                            {doc.name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {doc.uploadedBy}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {doc.uploadedAt.toLocaleDateString()}
                            </div>
                            <div>{formatFileSize(doc.size)}</div>
                          </div>

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              doc.category
                            )}`}
                          >
                            {doc.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-200"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-green-50 hover:border-green-200"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No documents yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start organizing your family documents
                </p>
                <Button
                  onClick={() => setShowUpload(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Upload Your First Document
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreview
          document={previewDocument}
          isOpen={!!previewDocument}
          onClose={() => setPreviewDocument(null)}
          onDownload={() => handleDownloadDocument(previewDocument)}
        />
      )}
    </div>
  );
};

export default Documents;
