
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Camera,
  FileText,
  MessageCircle,
  Heart,
  User,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import UserDropdown from "./UserDropdown";
import LightLogo from "@/assets/logo/logo-2.webp";
import DarkLogo from "@/assets/logo/logo-3.webp";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/photos", label: "Photos", icon: Camera },
    { path: "/documents", label: "Documents", icon: FileText },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/admin", label: "Admin", icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={LightLogo} className="w-24 block dark:hidden" />
            <img src={DarkLogo} className="w-12 hidden dark:block" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-rose-50 text-rose-600 shadow-sm dark:bg-rose-900/20 dark:text-rose-400"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <UserDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
