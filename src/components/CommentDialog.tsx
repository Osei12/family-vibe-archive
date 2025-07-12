
import { useState } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

interface CommentDialogProps {
  messageId: string;
  initialCommentCount: number;
  onCommentAdded?: () => void;
}

export function CommentDialog({ messageId, initialCommentCount, onCommentAdded }: CommentDialogProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Dad',
      content: 'This is so beautiful! Thank you for sharing.',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      author: 'Sister',
      content: 'Love this! It brought tears to my eyes 🥰',
      createdAt: new Date('2024-01-16'),
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        content: newComment,
        createdAt: new Date(),
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      setIsSubmitting(false);
      onCommentAdded?.();
      
      toast({
        title: 'Comment added!',
        description: 'Your comment has been posted.',
      });
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4 mr-2" />
          {comments.length || initialCommentCount}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
            Comments ({comments.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3 border-t pt-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>Posting...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
