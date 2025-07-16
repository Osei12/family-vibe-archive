import { useState } from "react";
import { Link } from "react-router-dom";
import LandingNavigation from "@/components/LandingNavigation";
import CounterStat from "@/components/CounterStat";
import LiveDemo from "@/components/LiveDemo";
import FAQ from "@/components/FAQ";
import {
  Camera,
  FileText,
  MessageCircle,
  Heart,
  Users,
  Star,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Crown,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showLiveDemo, setShowLiveDemo] = useState(false);

  const features = [
    {
      icon: Camera,
      title: "Family Photos",
      description:
        "Upload, share, and cherish your precious family moments in a beautiful gallery",
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      link: "/photos",
    },
    {
      icon: FileText,
      title: "Documents",
      description:
        "Keep important family documents organized and easily accessible to everyone",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      link: "/documents",
    },
    {
      icon: MessageCircle,
      title: "Messages",
      description:
        "Share words of encouragement, memories, and celebrations with your loved ones",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      link: "/messages",
    },
  ];

  const stats = [
    { icon: Users, label: "Family Members", value: 12847 },
    { icon: Camera, label: "Photos Shared", value: 1247892 },
    { icon: Heart, label: "Messages of Love", value: 89234 },
    { icon: File, label: "Documents", value: 156789 },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for small families just getting started",
      storage: "1GB Storage",
      features: [
        "Up to 5 family members",
        "Basic photo sharing",
        "Simple document storage",
        "Community support",
      ],
      icon: Heart,
      popular: false,
    },
    {
      name: "Standard",
      price: "$9",
      period: "/month",
      description: "Great for growing families with more content",
      storage: "50GB Storage",
      features: [
        "Up to 15 family members",
        "Advanced photo gallery",
        "Document categorization",
        "Message scheduling",
        "Priority support",
        "Family activity tracking",
      ],
      icon: Shield,
      popular: true,
    },
    {
      name: "Premium",
      price: "$19",
      period: "/month",
      description: "Everything you need for large families",
      storage: "500GB Storage",
      features: [
        "Unlimited family members",
        "Advanced admin controls",
        "Custom categories",
        "Bulk upload tools",
        "Advanced analytics",
        "24/7 priority support",
        "Custom branding",
      ],
      icon: Crown,
      popular: false,
    },
  ];

  // Family member avatars for the hero section
  const familyMembers = [
    {
      name: "Mom",
      avatar:
        "https://images.expectful.com/image/upload/ar_1,c_thumb,w_3840/f_auto/q_50/v1699909590/Contentful/Authors/L_Oreal_Thompson_Payton.webp",
      position: "top-16 left-4 sm:top-20 sm:left-20",
    },
    {
      name: "Dad",
      avatar:
        "https://sofontsy.com/cdn/shop/products/dope-black-dad-svg-svg-bestteez-465534_1024x1024.jpg?v=1648822675",
      position: "top-24 left-32 sm:top-32 sm:left-80",
    },
    {
      name: "Emma",
      avatar:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      position: "top-12 right-6 sm:top-16 sm:right-24",
    },
    {
      name: "Jenny",
      avatar:
        "https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg",
      position: "top-32 right-4 sm:top-40 sm:right-16",
    },
    {
      name: "Grandma",
      avatar:
        "https://img.freepik.com/free-psd/happy-beautiful-black-woman-posing_23-2151879760.jpg?semt=ais_hybrid&w=740",
      position: "bottom-24 left-4 sm:bottom-32 sm:left-16",
    },
    {
      name: "Grandpa",
      avatar:
        "https://www.shutterstock.com/image-photo/real-cuban-people-feelings-portrait-260nw-537639046.jpg",
      position: "bottom-16 right-8 sm:bottom-20 sm:right-32",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <LandingNavigation />

      {/* Hero Section - with improved responsiveness */}
      <section
        id="#"
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] flex items-center"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating family member avatars with improved responsive positioning */}
          {familyMembers.map((member, index) => (
            <div
              key={member.name}
              className={`absolute ${member.position} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1 sm:p-2 bg-white dark:bg-pink-700/50 rounded-full shadow-lg flex items-center justify-center text-lg sm:text-2xl animate-bounce`}
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: "3s",
              }}
            >
              <img
                src={member.avatar}
                className="w-full h-full rounded-full bg-cover object-cover bg-center object-center"
                alt={member.name}
              />

              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap hidden sm:block">
                {member.name}
              </div>
            </div>
          ))}

          {/* Connecting lines between family members */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20" viewBox="0 0 1000 600">
              <path
                d="M200 200 Q400 100 600 200 T800 300"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M150 400 Q500 300 750 400"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    stopColor="rgb(244 63 94)"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="50%"
                    stopColor="rgb(236 72 153)"
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(244 63 94)"
                    stopOpacity="0.3"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating heart icons with responsive sizing */}
          <div className="absolute top-1/4 left-1/4 text-rose-300 animate-pulse">
            <Heart className="h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div
            className="absolute top-1/3 right-1/3 text-pink-300 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <div
            className="absolute bottom-1/4 right-1/4 text-rose-400 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12 animate-fade-in">
            {/* Trust indicator */}
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="h-4 w-4" />
              <span>Trusted Family Solution</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-neutral-300 mb-6">
              Your Family's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 relative">
                Digital Home
                <div
                  className="absolute -right-8 -top-4 text-2xl animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  🏠
                </div>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-8">
              Join thousands of families who trust us to keep their memories
              safe and accessible. Go ahead, it's FREE to start.
            </p>

            {/* Key benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  Secure & Private
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Easy to Use</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  Always Connected
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link to="/pricing">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-xl">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setShowLiveDemo(true)}
              className="px-8 py-4 text-lg font-semibold border-2 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded-xl"
            >
              Try Live Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex justify-center items-center space-x-8 opacity-60">
            <div className="text-sm text-gray-500">
              Trusted by 10,000+ families
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <CounterStat
                key={index}
                icon={stat.icon}
                label={stat.label}
                targetValue={stat.value}
                duration={2000 + index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Family Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your family's needs. Upgrade or
              downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in ${
                  plan.popular
                    ? "border-rose-500 scale-105"
                    : "border-gray-200 hover:border-rose-300"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-rose-500 text-white px-4 py-2 text-sm font-medium rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <plan.icon
                    className={`h-12 w-12 mx-auto mb-4 ${
                      plan.popular ? "text-rose-500" : "text-gray-600"
                    }`}
                  />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-800">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm font-medium text-rose-600 mt-2">
                    {plan.storage}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-rose-500 hover:bg-rose-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Privacy Your Family Deserves
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform brings families closer together with simple,
              beautiful tools for sharing what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <div
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.lightColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon
                      className={`h-8 w-8 text-${
                        feature.color.split("-")[1]
                      }-600`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-rose-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-rose-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <div id="security" className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl w-fit mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-500 dark:text-green-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Private & Secure
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your family's privacy is our priority. All data is encrypted and
              only accessible to authorized family members.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Your data is protected with military-grade encryption
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Family Only Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Control who can access your family's information
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Secure Cloud Storage
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Automatic backups ensure your memories are never lost
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Family Archive?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of families who trust us to keep their memories safe
            and accessible.
          </p>
          <Link to="/admin">
            <Button className="bg-white text-rose-500 hover:bg-gray-100 dark:bg-gray-100 dark:text-rose-600 dark:hover:bg-gray-200 px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div> */}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Building Memories?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join your family in creating a digital space filled with love,
            memories, and connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/photos">
              <Button className="bg-white text-rose-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                Upload Your First Photo
              </Button>
            </Link>
            <Link to="/messages">
              <Button
                variant="ghost"
                className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                Share a Message
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Live Demo Modal */}
      <LiveDemo isOpen={showLiveDemo} onClose={() => setShowLiveDemo(false)} />
    </div>
  );
};

export default Index;
