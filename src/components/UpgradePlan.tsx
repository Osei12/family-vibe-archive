
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap, 
  Crown,
  HardDrive,
  Users,
  Shield,
  Headphones,
  ArrowRight
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  storage: string;
  members: string;
  support: string;
  popular?: boolean;
  current?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'month',
    description: 'Perfect for small families',
    storage: '1 GB',
    members: '5 members',
    support: 'Community',
    features: [
      '1 GB storage',
      'Up to 5 family members',
      'Basic photo sharing',
      'Mobile app access',
      'Community support'
    ],
    current: true
  },
  {
    id: 'family',
    name: 'Family',
    price: 9.99,
    period: 'month',
    description: 'Great for growing families',
    storage: '50 GB',
    members: '15 members',
    support: 'Email',
    features: [
      '50 GB storage',
      'Up to 15 family members',
      'Advanced photo sharing',
      'Document management',
      'Priority email support',
      'Family calendar',
      'Photo editing tools'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    period: 'month',
    description: 'For large families with lots of memories',
    storage: '200 GB',
    members: 'Unlimited',
    support: '24/7 Chat',
    features: [
      '200 GB storage',
      'Unlimited family members',
      'All Family features',
      'Advanced analytics',
      '24/7 chat support',
      'Custom branding',
      'Backup & restore',
      'API access'
    ]
  }
];

interface UpgradePlanProps {
  className?: string;
  onUpgrade?: (planId: string) => void;
}

const UpgradePlan = ({ className = '', onUpgrade }: UpgradePlanProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true);
    setSelectedPlan(planId);
    
    try {
      // TODO: Implement actual upgrade logic with Stripe or payment provider
      console.log(`Upgrading to plan: ${planId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onUpgrade) {
        onUpgrade(planId);
      }
      
      // Redirect to payment or show success message
      console.log('Upgrade successful!');
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic': return Star;
      case 'family': return Zap;
      case 'premium': return Crown;
      default: return Star;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'basic': return 'from-gray-500 to-gray-600';
      case 'family': return 'from-blue-500 to-purple-600';
      case 'premium': return 'from-purple-600 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Upgrade to unlock more storage, add more family members, and access premium features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const PlanIcon = getPlanIcon(plan.id);
          const isSelected = selectedPlan === plan.id;
          const isLoading = isProcessing && isSelected;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : plan.current
                    ? 'border-green-500 ring-2 ring-green-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    Current Plan
                  </Badge>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPlanColor(plan.id)} flex items-center justify-center`}>
                    <PlanIcon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex items-center">
                    <HardDrive className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{plan.storage} storage</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{plan.members}</span>
                  </div>
                  <div className="flex items-center">
                    <Headphones className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{plan.support} support</span>
                  </div>
                </div>

                {/* All Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={plan.current || isLoading}
                  className={`w-full ${
                    plan.current
                      ? 'bg-green-500 hover:bg-green-600'
                      : plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : plan.current ? (
                    'Current Plan'
                  ) : (
                    <div className="flex items-center">
                      Upgrade to {plan.name}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ or Additional Info */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Need help choosing?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Family Plan</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Perfect for most families with moderate storage needs and up to 15 members.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Premium Plan</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ideal for large families or those who need unlimited members and maximum storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
