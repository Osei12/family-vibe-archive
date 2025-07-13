
import { useState } from "react";
import Navigation from "@/components/Navigation";
import DocumentPreview from "@/components/DocumentPreview";
import StorageMetrics from "@/components/StorageMetrics";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Eye, 
  Trash2,
  Filter,
  Calendar,
  User,
  FolderOpen
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
  category: "financial" | "medical" | "legal" | "personal" | "other";
  url?: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Family Budget 2024.xlsx",
    type: "Excel Spreadsheet",
    size: "2.3 MB",
    uploadedBy: "Dad",
    uploadedAt: new Date("2024-01-20"),
    category: "financial",
  },
  {
    id: "2",
    name: "Medical Records - Sarah.pdf",
    type: "PDF Document",
    size: "1.8 MB",
    uploadedBy: "Mom",
    uploadedAt: new Date("2024-01-18"),
    category: "medical",
  },
  {
    id: "3",
    name: "House Insurance Policy.pdf",
    type: "PDF Document",
    size: "3.2 MB",
    uploadedBy: "Dad",
    uploadedAt: new Date("2024-01-15"),
    category: "legal",
  },
  {
    id: "4",
    name: "Vacation Photos Backup.zip",
    type: "Archive",
    size: "15.7 MB",
    uploadedBy: "Sarah",
    uploadedAt: new Date("2024-01-12"),
    category: "personal",
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock storage data
  const storageData = {
    used: 850,
    total: 2048,
  };

  const categories = [
    { id: "all", name: "All Documents", color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" },
    { id: "financial", name: "Financial", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200" },
    { id: "medical", name: "Medical", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200" },
    { id: "legal", name: "Legal", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" },
    { id: "personal", name: "Personal", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200" },
    { id: "other", name: "Other", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200" },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type || "Unknown",
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        uploadedBy: "You",
        uploadedAt: new Date(),
        category: "other",
      };
      setDocuments((prev) => [newDocument, ...prev]);
    });
    setShowUpload(false);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Family Documents
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Securely store and share important family documents
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
              className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              Upload New Documents
            </h2>
            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
              multiple={true}
              maxSize={50}
            />
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.id 
                    ? "bg-blue-500 hover:bg-blue-600 text-white" 
                    : `${category.color} hover:opacity-80`
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-500">
                {filteredDocuments.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {selectedCategory === "all" ? "Total Documents" : "Filtered Documents"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-500">
                {categories.length - 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Categories</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-purple-500">
                {new Set(documents.map(d => d.uploadedBy)).size}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Contributors</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-orange-500">
                {documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0).toFixed(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">MB Total Size</p>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <Card 
                key={document.id} 
                className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge className={getCategoryColor(document.category)}>
                      {categories.find(c => c.id === document.category)?.name}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {document.name}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {document.type} • {document.size}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {document.uploadedBy}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {document.uploadedAt.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setSelectedDocument(document)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(document.id)}
                      className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {documents.length === 0 ? "No documents yet" : "No documents match your search"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {documents.length === 0 
                ? "Start by uploading your first document"
                : "Try adjusting your search or filter criteria"
              }
            </p>
            {documents.length === 0 && (
              <Button
                onClick={() => setShowUpload(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Upload Your First Document
              </Button>
            )}
          </div>
        )}

        {/* Document Preview Modal */}
        {selectedDocument && (
          <DocumentPreview
            document={selectedDocument}
            isOpen={!!selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Documents;
