import { useState } from "react";
import {
  X,
  Camera,
  FileText,
  MessageCircle,
  Users,
  Heart,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LiveDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveDemo = ({ isOpen, onClose }: LiveDemoProps) => {
  const [activeTab, setActiveTab] = useState("photos");

  if (!isOpen) return null;

  const demoPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop",
      title: "Family Cat",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop",
      title: "Nature Walk",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop",
      title: "Living Room",
    },
  ];

  const demoDocuments = [
    { id: 1, name: "Family Tree Research.pdf", type: "PDF", size: "2.5 MB" },
    { id: 2, name: "Recipe Collection.docx", type: "Word", size: "1.8 MB" },
    { id: 3, name: "Medical Records.pdf", type: "PDF", size: "3.2 MB" },
  ];

  const demoMessages = [
    { id: 1, author: "Mom", message: "Love you all!", time: "2 hours ago" },
    {
      id: 2,
      author: "Dad",
      message: "Great family dinner tonight!",
      time: "1 day ago",
    },
    {
      id: 3,
      author: "Sarah",
      message: "Can't wait for the weekend!",
      time: "2 days ago",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center ">
      <div className="bg-white rounded-2xl max-w-[90%] w-full max-h-[90dvh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            FamilyHub Live Demo
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex border-b">
          {[
            { id: "photos", label: "Photos", icon: Camera },
            { id: "documents", label: "Documents", icon: FileText },
            { id: "messages", label: "Messages", icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-rose-500 text-rose-600 bg-rose-50"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 h-96 overflow-y-auto">
          {activeTab === "photos" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {demoPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-3">
              {demoDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-4">
              {demoMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border border-rose-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">
                      {msg.author}
                    </span>
                    <span className="text-sm text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span className="text-sm text-gray-600">3 loves</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <p className="text-center text-gray-600 mb-4">
            Experience the full power of FamilyHub by signing up today!
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              Start Free Trial
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
