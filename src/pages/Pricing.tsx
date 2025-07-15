import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Heart, 
  Shield, 
  Crown, 
  Zap,
  Users,
  HardDrive,
  Camera,
  FileText,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for small families just getting started',
      storage: '1GB Storage',
      features: [
        'Up to 5 family members',
        'Basic photo sharing',
        'Simple document storage',
        'Community support',
        'Basic mobile app access'
      ],
      icon: Heart,
      popular: false,
      buttonText: 'Get Started Free',
      gradient: 'from-gray-100 to-gray-200'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: { monthly: 9, yearly: 90 },
      description: 'Great for growing families with more content',
      storage: '50GB Storage',
      features: [
        'Up to 15 family members',
        'Advanced photo & video gallery',
        'Document categorization',
        'Message scheduling',
        'Priority support',
        'Family activity tracking',
        'Mobile app with offline access',
        'Advanced sharing controls'
      ],
      icon: Shield,
      popular: true,
      buttonText: 'Choose Standard',
      gradient: 'from-blue-100 to-indigo-200'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 19, yearly: 190 },
      description: 'Everything you need for large families',
      storage: '500GB Storage',
      features: [
        'Unlimited family members',
        'Advanced admin controls',
        'Custom categories & tags',
        'Bulk upload tools',
        'Advanced analytics & insights',
        '24/7 priority support',
        'Custom branding options',
        'Backup & restore features',
        'API access',
        'White-label options'
      ],
      icon: Crown,
      popular: false,
      buttonText: 'Choose Premium',
      gradient: 'from-purple-100 to-pink-200'
    }
  ];

  const features = [
    {
      category: 'Storage & Upload',
      items: [
        { name: 'Photo Storage', free: '1GB', standard: '50GB', premium: '500GB' },
        { name: 'Video Upload', free: '✕', standard: '✓', premium: '✓' },
        { name: 'Bulk Upload', free: '✕', standard: '✓', premium: '✓' },
        { name: 'Auto-backup', free: '✕', standard: '✕', premium: '✓' }
      ]
    },
    {
      category: 'Family Members',
      items: [
        { name: 'Family Members', free: '5', standard: '15', premium: 'Unlimited' },
        { name: 'Admin Controls', free: 'Basic', standard: 'Advanced', premium: 'Full' },
        { name: 'Role Management', free: '✕', standard: '✓', premium: '✓' },
        { name: 'Activity Tracking', free: '✕', standard: '✓', premium: '✓' }
      ]
    },
    {
      category: 'Features',
      items: [
        { name: 'Mobile App', free: 'Basic', standard: 'Full', premium: 'Full' },
        { name: 'Custom Categories', free: '✕', standard: 'Limited', premium: 'Unlimited' },
        { name: 'Analytics', free: '✕', standard: 'Basic', premium: 'Advanced' },
        { name: 'API Access', free: '✕', standard: '✕', premium: '✓' }
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Support', free: 'Community', standard: 'Email', premium: '24/7 Chat' },
        { name: 'Response Time', free: '48-72h', standard: '24h', premium: '2-4h' },
        { name: 'Phone Support', free: '✕', standard: '✕', premium: '✓' },
        { name: 'Dedicated Manager', free: '✕', standard: '✕', premium: '✓' }
      ]
    }
  ];

  const yearlyDiscount = billingPeriod === 'yearly' ? 17 : 0; // 17% discount for yearly

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Choose Your Family Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Select the perfect plan for your family's needs. Start free and upgrade anytime as your family grows.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all relative ${
                billingPeriod === 'yearly'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Save 17%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? 'border-rose-500 scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-rose-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-rose-500 text-white px-4 py-2 text-sm font-medium shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4`}>
                  <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-rose-600' : 'text-gray-600'}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    ${billingPeriod === 'yearly' ? Math.round(plan.price.yearly / 12) : plan.price[billingPeriod]}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">/month</span>
                </div>
                
                {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ${plan.price.yearly}/year (save ${plan.price.monthly * 12 - plan.price.yearly})
                  </p>
                )}
                
                <p className="text-sm font-medium text-rose-600 dark:text-rose-400 mt-2">
                  {plan.storage}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={`/checkout?plan=${plan.id}&billing=${billingPeriod}`}>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Standard</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <>
                    <tr key={`category-${categoryIndex}`}>
                      <td colSpan={4} className="py-6">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          {category.category}
                        </h3>
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={`${categoryIndex}-${itemIndex}`} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-6 text-gray-700 dark:text-gray-300">{item.name}</td>
                        <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-400">{item.free}</td>
                        <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-400">{item.standard}</td>
                        <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-400">{item.premium}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Questions about pricing?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're here to help! Contact our support team for any pricing questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline">
                Contact Support
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;