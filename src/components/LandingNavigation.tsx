import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import LightLogo from "@/assets/logo/logo-2.webp";
import DarkLogo from "@/assets/logo/logo-3.webp";

const LandingNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Home", sectionId: "#" },
    { label: "Features", sectionId: "features" },
    { label: "Security", sectionId: "security" },
    // { label: "Explore", sectionId: "explore" },
    { label: "FAQ", sectionId: "faq" },
  ];

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
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" className="mr-2">
                Sign In
              </Button>
            </Link>
            <Link to="/pricing">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                Get Started
              </Button>
            </Link>
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
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 px-4 pt-4">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavigation;
