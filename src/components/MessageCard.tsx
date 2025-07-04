
import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  comments: number;
  category?: 'encouragement' | 'memory' | 'gratitude' | 'celebration';
}

interface MessageCardProps {
  message: Message;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
}

const MessageCard = ({ message, onLike, onComment, onShare }: MessageCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'encouragement':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'memory':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'gratitude':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'celebration':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(message.id);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            {message.author[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{message.author}</h3>
            <p className="text-sm text-gray-500">
              {message.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        {message.category && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(message.category)}`}>
            {message.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed text-base">
          {message.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isLiked 
                ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{message.likes + (isLiked ? 1 : 0)}</span>
          </button>

          <button
            onClick={() => onComment?.(message.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{message.comments}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onShare?.(message.id)}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            <Share className="h-4 w-4" />
          </button>
          
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
