
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PinAuth from './PinAuth';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // In real app, check actual auth status
  const [showPinAuth, setShowPinAuth] = useState(false);
  const location = useLocation();

  // Don't show session timeout on login/signup pages
  const publicRoutes = ['/login', '/signup', '/'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  const { resetTimer } = useSessionTimeout({
    timeout: 5 * 60 * 1000, // 5 minutes
    onTimeout: () => {
      if (isAuthenticated && !isPublicRoute) {
        setShowPinAuth(true);
      }
    }
  });

  const handleAuthenticated = () => {
    setShowPinAuth(false);
    resetTimer();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowPinAuth(false);
    // In real app, clear auth tokens and redirect to login
    window.location.href = '/login';
  };

  // Reset timer on route change (user activity)
  useEffect(() => {
    if (isAuthenticated && !isPublicRoute) {
      resetTimer();
    }
  }, [location.pathname, isAuthenticated, isPublicRoute, resetTimer]);

  return (
    <>
      {children}
      {!isPublicRoute && (
        <PinAuth
          isOpen={showPinAuth}
          onAuthenticated={handleAuthenticated}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default AuthWrapper;
