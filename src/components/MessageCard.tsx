
import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShareMessageDialog } from './ShareMessageDialog';
import { CommentDialog } from './CommentDialog';
import { useToast } from '@/hooks/use-toast';

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
  onDelete?: (id: string) => void;
}

const MessageCard = ({ message, onLike, onComment, onShare, onDelete }: MessageCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(message.comments);
  const { toast } = useToast();

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'encouragement':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'memory':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      case 'gratitude':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'celebration':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(message.id);
  };

  const handleDelete = () => {
    onDelete?.(message.id);
    toast({
      title: 'Message deleted',
      description: 'The message has been removed.',
    });
  };

  const handleCommentAdded = () => {
    setCommentCount(prev => prev + 1);
    onComment?.(message.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            {message.author[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-100">{message.author}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {message.category && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(message.category)}`}>
              {message.category}
            </span>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 dark:text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          {message.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isLiked 
                ? 'text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400' 
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{message.likes + (isLiked ? 1 : 0)}</span>
          </button>

          <CommentDialog
            messageId={message.id}
            initialCommentCount={commentCount}
            onCommentAdded={handleCommentAdded}
          />
        </div>

        <ShareMessageDialog
          messageContent={message.content}
          author={message.author}
          messageId={message.id}
        />
      </div>
    </div>
  );
};

export default MessageCard;
