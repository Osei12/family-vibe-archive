
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, AlertTriangle } from 'lucide-react';

interface PinAuthProps {
  isOpen: boolean;
  onAuthenticated: () => void;
  onLogout: () => void;
}

const PinAuth = ({ isOpen, onAuthenticated, onLogout }: PinAuthProps) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const correctPin = '1234'; // In real app, this would be user-specific
  const maxAttempts = 3;

  useEffect(() => {
    if (pin.length === 4) {
      handlePinSubmit();
    }
  }, [pin]);

  const handlePinSubmit = async () => {
    setIsLoading(true);
    setError('');

    // Simulate PIN verification
    setTimeout(() => {
      if (pin === correctPin) {
        onAuthenticated();
        setPin('');
        setAttempts(0);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= maxAttempts) {
          setError('Too many failed attempts. You will be logged out for security.');
          setTimeout(() => {
            onLogout();
          }, 2000);
        } else {
          setError(`Incorrect PIN. ${maxAttempts - newAttempts} attempts remaining.`);
        }
        setPin('');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-rose-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Session Timeout</DialogTitle>
          <DialogDescription className="text-gray-600">
            For your security, please enter your PIN to continue your session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-center block">
                Enter your 4-digit PIN
              </label>
              <InputOTP
                value={pin}
                onChange={setPin}
                maxLength={4}
                disabled={isLoading}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {isLoading && (
              <div className="text-sm text-gray-500">
                Verifying PIN...
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              Logout Instead
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              Your session timed out after 5 minutes of inactivity for security purposes.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinAuth;
