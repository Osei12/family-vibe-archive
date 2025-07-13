
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Heart, Camera, FileText, MessageCircle, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-rose-100 dark:bg-rose-900/30 p-4 rounded-full">
                <Heart className="h-12 w-12 text-rose-500 dark:text-rose-400" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              Your Family's
              <span className="text-rose-500 dark:text-rose-400 block">Digital Archive</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Preserve precious memories, share important documents, and stay connected with your loved ones. 
              Everything your family needs in one secure, beautiful space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/photos">
                <Button className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  Start Exploring
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" className="px-8 py-3 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 w-full sm:w-auto">
                  Manage Family
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Everything Your Family Needs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Organize, share, and preserve what matters most with powerful tools designed for families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Photo Archive */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-xl w-fit mb-6">
              <Camera className="h-8 w-8 text-rose-500 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Photo Archive</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Store and organize thousands of family photos with smart categorization and easy sharing.
            </p>
            <Link to="/photos">
              <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                View Photos
              </Button>
            </Link>
          </div>

          {/* Document Storage */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl w-fit mb-6">
              <FileText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Document Storage</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Keep important family documents safe, organized, and accessible to authorized family members.
            </p>
            <Link to="/documents">
              <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                View Documents
              </Button>
            </Link>
          </div>

          {/* Family Messages */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl w-fit mb-6">
              <MessageCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Family Messages</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Share updates, coordinate events, and stay connected with your family through private messaging.
            </p>
            <Link to="/messages">
              <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                View Messages
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl w-fit mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-500 dark:text-green-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Private & Secure
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your family's privacy is our priority. All data is encrypted and only accessible to authorized family members.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Your data is protected with military-grade encryption</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Family Only Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Control who can access your family's information</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Secure Cloud Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Automatic backups ensure your memories are never lost</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Family Archive?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of families who trust us to keep their memories safe and accessible.
          </p>
          <Link to="/admin">
            <Button className="bg-white text-rose-500 hover:bg-gray-100 dark:bg-gray-100 dark:text-rose-600 dark:hover:bg-gray-200 px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
