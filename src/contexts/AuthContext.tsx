import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    initials: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Test credentials
const TEST_CREDENTIALS = {
  email: "test@family.com",
  password: "password123",
  user: {
    name: "Sarah Johnson",
    email: "test@family.com",
    initials: "SJ",
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for existing auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("familyArchiveAuth");
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check test credentials
    if (
      email === TEST_CREDENTIALS.email &&
      password === TEST_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setUser(TEST_CREDENTIALS.user);

      // Save to localStorage
      localStorage.setItem(
        "familyArchiveAuth",
        JSON.stringify({
          isAuthenticated: true,
          user: TEST_CREDENTIALS.user,
        })
      );

      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("familyArchiveAuth");
    navigate("/login");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
