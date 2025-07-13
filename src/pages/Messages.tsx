
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import MessageCard from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Send, Heart, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  comments: number;
  category?: 'encouragement' | 'memory' | 'gratitude' | 'celebration';
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: "Remember that every challenge you face is making you stronger. Our family believes in you, and we're always here to support you through anything. You've got this! ✨",
    author: 'Mom',
    createdAt: new Date('2024-01-22'),
    likes: 8,
    comments: 3,
    category: 'encouragement',
  },
  {
    id: '2',
    content: "Thinking about our amazing family vacation last summer. The way we all laughed together during that rainy day when we played board games for hours. Those are the moments that matter most. ❤️",
    author: 'Dad',
    createdAt: new Date('2024-01-20'),
    likes: 12,
    comments: 7,
    category: 'memory',
  },
  {
    id: '3',
    content: "I'm so grateful for this beautiful family. Each one of you brings so much joy and love into my life. Thank you for being the best grandchildren a grandma could ask for!",
    author: 'Grandma',
    createdAt: new Date('2024-01-18'),
    likes: 15,
    comments: 5,
    category: 'gratitude',
  },
];

const Messages = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { id: 'encouragement', label: '💪 Encouragement', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { id: 'memory', label: '📸 Memory', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    { id: 'gratitude', label: '🙏 Gratitude', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    { id: 'celebration', label: '🎉 Celebration', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      author: 'You',
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      category: selectedCategory as any || undefined,
    };

    setMessages([message, ...messages]);
    setNewMessage('');
    setSelectedCategory('');
    setShowCompose(false);
  };

  const handleLike = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center justify-center">
            <Heart className="h-8 w-8 mr-3 text-rose-500" />
            Family Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share words of encouragement, memories, gratitude, and celebrations with your loved ones
          </p>
        </div>

        {/* Compose Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowCompose(!showCompose)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Share a Message
          </Button>
        </div>

        {/* Compose Form */}
        {showCompose && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-rose-500" />
              Share Your Heart
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category (optional)
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        selectedCategory === cat.id
                          ? cat.color + ' border-current'
                          : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
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
                  className="min-h-[120px] resize-none border-gray-200 focus:border-rose-300 focus:ring-rose-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
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
        )}

        {/* Messages Feed */}
        <div className="space-y-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onLike={handleLike}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No messages yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Start sharing love and encouragement with your family</p>
              <Button
                onClick={() => setShowCompose(true)}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                Share Your First Message
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
