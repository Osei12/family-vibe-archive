
import { useState, useEffect, useCallback } from 'react';

interface UseSessionTimeoutProps {
  timeout?: number; // in milliseconds
  onTimeout: () => void;
}

export const useSessionTimeout = ({ 
  timeout = 5 * 60 * 1000, // 5 minutes default
  onTimeout 
}: UseSessionTimeoutProps) => {
  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setIsActive(true);
  }, []);

  const events = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click'
  ];

  useEffect(() => {
    const handleActivity = () => resetTimer();

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Check for timeout every second
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      
      if (timeSinceLastActivity >= timeout && isActive) {
        setIsActive(false);
        onTimeout();
      }
    }, 1000);

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(interval);
    };
  }, [lastActivity, timeout, isActive, onTimeout, resetTimer]);

  return {
    resetTimer,
    isActive,
    lastActivity
  };
};
