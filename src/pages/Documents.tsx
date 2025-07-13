import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Search, 
  FileText, 
  Image, 
  Video, 
  Music,
  Download,
  Eye,
  Trash2,
  Share2,
  Filter,
  Grid,
  List,
  Calendar,
  User,
  HardDrive,
  File
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Rename the interface to avoid conflict with DOM Document
interface FamilyDocument {
  id: string;
  name: string;
  type: "pdf" | "doc" | "image" | "video" | "audio" | "other";
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  category: "Important" | "Medical" | "Education" | "Financial" | "Personal" | "Other";
  tags: string[];
  isShared: boolean;
  thumbnail?: string;
}

const mockDocuments: FamilyDocument[] = [
  {
    id: "1",
    name: "Family Photo Album 2022",
    type: "image",
    size: 3.2,
    uploadedBy: "John Smith",
    uploadedAt: new Date("2023-02-15"),
    category: "Personal",
    tags: ["family", "photos", "2022"],
    isShared: true,
    thumbnail: "/images/photo-album-thumbnail.jpg",
  },
  {
    id: "2",
    name: "Medical Records - John Smith",
    type: "pdf",
    size: 1.8,
    uploadedBy: "Sarah Smith",
    uploadedAt: new Date("2023-03-20"),
    category: "Medical",
    tags: ["medical", "records", "john"],
    isShared: true,
  },
  {
    id: "3",
    name: "Tax Returns 2021",
    type: "pdf",
    size: 2.5,
    uploadedBy: "John Smith",
    uploadedAt: new Date("2023-04-01"),
    category: "Financial",
    tags: ["tax", "returns", "2021"],
    isShared: false,
  },
  {
    id: "4",
    name: "School Report - Mike Smith",
    type: "doc",
    size: 1.2,
    uploadedBy: "Sarah Smith",
    uploadedAt: new Date("2023-05-10"),
    category: "Education",
    tags: ["school", "report", "mike"],
    isShared: true,
  },
  {
    id: "5",
    name: "Important Documents",
    type: "pdf",
    size: 0.9,
    uploadedBy: "John Smith",
    uploadedAt: new Date("2023-06-05"),
    category: "Important",
    tags: ["important", "documents"],
    isShared: true,
  },
  {
    id: "6",
    name: "Vacation Video - Summer 2022",
    type: "video",
    size: 15.6,
    uploadedBy: "Sarah Smith",
    uploadedAt: new Date("2023-07-12"),
    category: "Personal",
    tags: ["vacation", "video", "summer"],
    isShared: true,
    thumbnail: "/images/vacation-video-thumbnail.jpg",
  },
  {
    id: "7",
    name: "Audio Recording - Family Interview",
    type: "audio",
    size: 7.3,
    uploadedBy: "John Smith",
    uploadedAt: new Date("2023-08-18"),
    category: "Personal",
    tags: ["audio", "recording", "interview"],
    isShared: false,
  },
  {
    id: "8",
    name: "House Deed",
    type: "pdf",
    size: 1.1,
    uploadedBy: "Sarah Smith",
    uploadedAt: new Date("2023-09-22"),
    category: "Important",
    tags: ["house", "deed"],
    isShared: true,
  },
  {
    id: "9",
    name: "Car Insurance Policy",
    type: "pdf",
    size: 0.8,
    uploadedBy: "John Smith",
    uploadedAt: new Date("2023-10-28"),
    category: "Financial",
    tags: ["car", "insurance", "policy"],
    isShared: false,
  },
  {
    id: "10",
    name: "Passport Copies",
    type: "image",
    size: 2.9,
    uploadedBy: "Sarah Smith",
    uploadedAt: new Date("2023-11-03"),
    category: "Important",
    tags: ["passport", "copies"],
    isShared: true,
    thumbnail: "/images/passport-thumbnail.jpg",
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState<FamilyDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Important", name: "Important" },
    { id: "Medical", name: "Medical" },
    { id: "Education", name: "Education" },
    { id: "Financial", name: "Financial" },
    { id: "Personal", name: "Personal" },
    { id: "Other", name: "Other" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Important":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      case "Medical":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
      case "Education":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "Financial":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      case "Personal":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 mr-1" />;
      case "doc":
        return <FileText className="h-4 w-4 mr-1" />;
      case "image":
        return <Image className="h-4 w-4 mr-1" />;
      case "video":
        return <Video className="h-4 w-4 mr-1" />;
      case "audio":
        return <Music className="h-4 w-4 mr-1" />;
      default:
        return <File className="h-4 w-4 mr-1" />;
    }
  };

  const getFileSize = (size: number) => {
    if (size >= 1) {
      return `${size.toFixed(1)} MB`;
    }
    return `${(size * 1024).toFixed(1)} KB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Family Documents
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Store and share your important family documents securely
            </p>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Upload className="h-5 w-5 mr-2" />
            Upload Document
          </Button>
        </div>

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
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => setViewMode("grid")}
            active={viewMode === "grid"}
          >
            <Grid className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant="outline"
            onClick={() => setViewMode("list")}
            active={viewMode === "list"}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>

        {/* Documents List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {doc.type === "image" && doc.thumbnail ? (
                          <img
                            src={doc.thumbnail}
                            alt={doc.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            {getFileIcon(doc.type)}
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                          {doc.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300 flex items-center">
                          {getFileIcon(doc.type)}
                          {doc.type.toUpperCase()}
                        </CardDescription>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Document
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-white">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400 dark:hover:bg-red-900/20">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Badge className={getCategoryColor(doc.category)}>
                      <span className="capitalize">{doc.category}</span>
                    </Badge>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <HardDrive className="h-3 w-3 mr-1" />
                      {getFileSize(doc.size)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    Uploaded by {doc.uploadedBy}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Uploaded on {doc.uploadedAt.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Uploaded At
                  </th>
                  <th className="px-6 py-3 relative">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-4">{getFileIcon(doc.type)}</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getCategoryColor(doc.category)}>
                        <span className="capitalize">{doc.category}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{getFileSize(doc.size)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{doc.uploadedAt.toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                          <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-white">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-white">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 dark:text-red-400 dark:hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No documents found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
