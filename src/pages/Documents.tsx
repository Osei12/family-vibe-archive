
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import FileUpload from '@/components/FileUpload';
import DocumentPreview from '@/components/DocumentPreview';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FileText, Download, Eye, Calendar, User, Folder } from 'lucide-react';

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

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Family Tree Research.pdf',
    type: 'application/pdf',
    size: 2500000,
    uploadedBy: 'Grandma',
    uploadedAt: new Date('2024-01-20'),
    category: 'family',
    url: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Recipe Collection.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1800000,
    uploadedBy: 'Mom',
    uploadedAt: new Date('2024-01-18'),
    category: 'family',
    content: 'Sample recipe content for preview...',
  },
];

const Documents = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploadCategory, setUploadCategory] = useState<'family' | 'legal' | 'medical' | 'financial' | 'other'>('other');
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const categories = [
    { id: 'all', label: 'All Documents', count: documents.length },
    { id: 'family', label: 'Family', count: documents.filter(d => d.category === 'family').length },
    { id: 'legal', label: 'Legal', count: documents.filter(d => d.category === 'legal').length },
    { id: 'medical', label: 'Medical', count: documents.filter(d => d.category === 'medical').length },
    { id: 'financial', label: 'Financial', count: documents.filter(d => d.category === 'financial').length },
    { id: 'other', label: 'Other', count: documents.filter(d => d.category === 'other').length },
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedBy: 'You',
        uploadedAt: new Date(),
        category: uploadCategory,
      };
      setDocuments(prev => [newDoc, ...prev]);
    });
    setShowUpload(false);
  };

  const handleCategoryUpload = (category: 'family' | 'legal' | 'medical' | 'financial' | 'other') => {
    setUploadCategory(category);
    setShowUpload(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('image')) return '🖼️';
    return '📁';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'family': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      case 'legal': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'medical': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'financial': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleViewDocument = (doc: Document) => {
    setPreviewDocument(doc);
  };

  const handleDownloadDocument = (doc: Document) => {
    if (doc.url) {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc.content) {
      const blob = new Blob([doc.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Family Documents</h1>
            <p className="text-gray-600 dark:text-gray-300">Keep important family documents organized and accessible</p>
          </div>
          
          <Button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Document
          </Button>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-6 lg:mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Upload New Document
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Category
              </label>
              <Select value={uploadCategory} onValueChange={(value: string) => setUploadCategory(value as 'family' | 'legal' | 'medical' | 'financial' | 'other')}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              multiple={true}
              maxSize={10}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <Folder className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between text-sm lg:text-base ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                    {category.id !== 'all' && (
                      <Button
                        onClick={() => handleCategoryUpload(category.id as any)}
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
            {filteredDocuments.length > 0 ? (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start space-x-4 flex-1 min-w-0">
                        <div className="text-2xl lg:text-3xl flex-shrink-0">{getFileIcon(doc.type)}</div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
                            {doc.name}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <div className="flex items-center">
                              <User className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                              {doc.uploadedBy}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                              {doc.uploadedAt.toLocaleDateString()}
                            </div>
                            <div>{formatFileSize(doc.size)}</div>
                          </div>

                          <span className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                            {doc.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 w-full lg:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/30 flex-1 lg:flex-none"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/30 flex-1 lg:flex-none"
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
              <div className="text-center py-12 lg:py-16">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-10 w-10 lg:h-12 lg:w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No documents yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Start organizing your family documents</p>
                <Button
                  onClick={() => setShowUpload(true)}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
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
