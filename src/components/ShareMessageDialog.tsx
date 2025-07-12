
import { useState } from 'react';
import { Share, Copy, Mail, MessageCircle, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShareMessageDialogProps {
  messageContent: string;
  author: string;
  messageId: string;
}

export function ShareMessageDialog({ messageContent, author, messageId }: ShareMessageDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = `${window.location.origin}/messages?id=${messageId}`;
  const shareText = `"${messageContent}" - ${author}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'Link copied!',
        description: 'Message link copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Family Message from ' + author);
    const body = encodeURIComponent(`${shareText}\n\nView the full message: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleShareSMS = () => {
    const text = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(`sms:?body=${text}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Message</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Message by {author}</p>
            <p className="text-sm">{messageContent.substring(0, 150)}...</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="icon"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleShareEmail}
                variant="outline"
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                onClick={handleShareSMS}
                variant="outline"
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                SMS
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
