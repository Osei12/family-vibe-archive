
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Check } from 'lucide-react';

interface ShareDialogProps {
  title: string;
  content: string;
  url?: string;
  children?: React.ReactNode;
}

const ShareDialog = ({ title, content, url = window.location.href, children }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `${title}\n\n${content}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this message</DialogTitle>
          <DialogDescription>
            Choose how you'd like to share this content with your family and friends.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {shareLinks.map((platform) => (
              <Button
                key={platform.name}
                onClick={() => window.open(platform.url, '_blank')}
                className={`${platform.color} text-white`}
              >
                {platform.name}
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="flex items-center space-x-2">
            <Input value={url} readOnly className="flex-1" />
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
