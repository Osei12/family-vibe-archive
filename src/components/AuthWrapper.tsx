import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PinAuth from "./PinAuth";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useAuth } from "@/contexts/AuthContext";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [showPinAuth, setShowPinAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Don't show session timeout on login/signup pages
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Redirect logged-in users away from landing page
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/media");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const { resetTimer } = useSessionTimeout({
    timeout: 5 * 60 * 1000, // 5 minutes
    onTimeout: () => {
      if (isAuthenticated && !isPublicRoute) {
        setShowPinAuth(true);
      }
    },
  });

  const handleAuthenticated = () => {
    setShowPinAuth(false);
    resetTimer();
  };

  const handleLogout = () => {
    setShowPinAuth(false);
    navigate("/login");
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
