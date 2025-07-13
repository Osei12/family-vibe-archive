import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Search,
  Heart,
  MessageCircle,
  Calendar,
  User,
  Reply,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import MessageCard, { MessageType } from "@/components/MessageCard";
import { ShareMessageDialog } from "@/components/ShareMessageDialog";
import { Textarea } from "@/components/ui/textarea";

// Mock data for family messages
const mockMessages: MessageType[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    content:
      "Just wanted to share this beautiful sunset photo from our vacation! The colors were absolutely stunning tonight. Hope everyone is doing well! 🌅",
    timestamp: new Date("2024-01-15T18:30:00"),
    createdAt: new Date("2024-01-15T18:30:00"),
    likes: 12,
    replies: 3,
    comments: 3,
    avatar: "SJ",

    category: "encouragement",
  },
  {
    id: "2",
    author: "Mike Johnson",
    content:
      "Happy anniversary to mom and dad! 25 years of love and laughter. Thanks for showing us what true partnership looks like. ❤️",
    timestamp: new Date("2024-01-14T14:20:00"),
    createdAt: new Date("2024-01-14T14:20:00"),
    likes: 18,
    replies: 7,
    comments: 7,
    avatar: "MJ",

    category: "encouragement",
  },
  {
    id: "3",
    author: "Emma Johnson",
    content:
      "Guess what everyone! I got accepted into the university program I applied for! Thank you all for your support and encouragement. Can't wait to start this new chapter! 🎓",
    timestamp: new Date("2024-01-13T10:15:00"),
    createdAt: new Date("2024-01-13T10:15:00"),
    likes: 24,
    replies: 12,
    comments: 12,
    avatar: "EJ",

    category: "encouragement",
  },
  {
    id: "4",
    author: "David Johnson",
    content:
      "Family game night was so much fun! Thanks everyone for coming over. Emma destroyed us all at Monopoly again 😄 Same time next week?",
    timestamp: new Date("2024-01-12T21:45:00"),
    createdAt: new Date("2024-01-12T21:45:00"),
    likes: 15,
    replies: 8,
    comments: 8,
    avatar: "DJ",

    category: "encouragement",
  },
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(mockMessages);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredMessages = mockMessages.filter(
    (message) =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Implement send message functionality
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const categories = [
    {
      id: "encouragement",
      label: "💪 Encouragement",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "memory",
      label: "📸 Memory",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "gratitude",
      label: "🙏 Gratitude",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "celebration",
      label: "🎉 Celebration",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: MessageType = {
      id: Date.now().toString(),
      content: newMessage,
      author: "You",
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      category: (selectedCategory as any) || undefined,
      avatar: "",
      timestamp: undefined,
      replies: 0,
    };

    setMessages([message, ...messages]);
    setNewMessage("");
    setSelectedCategory("");
    setShowCompose(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Family Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share memories, updates, and stay connected with your family
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* New Message */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Share with Family
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="What's on your mind?"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-rose-500" />
            Share Your Heart
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.id ? "" : cat.id
                      )
                    }
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedCategory === cat.id
                        ? cat.color + " border-current"
                        : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts, memories, or words of encouragement..."
                className="min-h-[120px] resize-none border-gray-200 focus:border-rose-300 focus:ring-rose-200"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCompose(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Share Message
              </Button>
            </div>
          </form>
        </div>

        {/* Messages */}
        <div className="space-y-6">
          {filteredMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No messages found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search terms or start a new conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
