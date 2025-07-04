
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Camera, FileText, MessageCircle, Heart, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: 'Family Photos',
      description: 'Upload, share, and cherish your precious family moments in a beautiful gallery',
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50',
      link: '/photos',
    },
    {
      icon: FileText,
      title: 'Documents',
      description: 'Keep important family documents organized and easily accessible to everyone',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      link: '/documents',
    },
    {
      icon: MessageCircle,
      title: 'Messages',
      description: 'Share words of encouragement, memories, and celebrations with your loved ones',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      link: '/messages',
    },
  ];

  const stats = [
    { icon: Users, label: 'Family Members', value: '12' },
    { icon: Camera, label: 'Photos Shared', value: '247' },
    { icon: Heart, label: 'Messages of Love', value: '89' },
    { icon: Star, label: 'Special Moments', value: '156' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 to-orange-50/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Welcome to Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Family Archive
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A beautiful, safe space where our family comes together to share memories, 
              documents, and words of love and encouragement. Every moment matters, every story counts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/photos">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="px-8 py-3 text-lg border-gray-300 hover:bg-gray-50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-rose-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Everything Your Family Needs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform brings families closer together with simple, beautiful tools 
              for sharing what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.lightColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color.split('-')[1]}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-rose-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-rose-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Building Memories?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join your family in creating a digital space filled with love, memories, and connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/photos">
              <Button className="bg-white text-rose-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold shadow-lg">
                Upload Your First Photo
              </Button>
            </Link>
            <Link to="/messages">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 text-lg font-semibold"
              >
                Share a Message
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
