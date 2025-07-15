import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Check, 
  ArrowLeft,
  Heart,
  Crown,
  Lock,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  const planId = searchParams.get('plan') || 'standard';
  const billing = searchParams.get('billing') || 'monthly';

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      icon: Heart,
      features: ['Up to 5 family members', 'Basic photo sharing', '1GB storage']
    },
    standard: {
      name: 'Standard',
      price: { monthly: 9, yearly: 90 },
      icon: Shield,
      features: ['Up to 15 family members', 'Advanced features', '50GB storage']
    },
    premium: {
      name: 'Premium',
      price: { monthly: 19, yearly: 190 },
      icon: Crown,
      features: ['Unlimited members', 'All features', '500GB storage']
    }
  };

  const selectedPlan = plans[planId as keyof typeof plans] || plans.standard;
  const price = selectedPlan.price[billing as keyof typeof selectedPlan.price];
  const yearlyDiscount = billing === 'yearly' && price > 0 ? selectedPlan.price.monthly * 12 - price : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Welcome to the ${selectedPlan.name} plan. Your account has been upgraded.`,
      });

      // In a real app, redirect to success page or dashboard
      console.log('Payment processed for plan:', planId, 'billing:', billing);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (planId === 'free') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                Welcome to Family Vibe Archive!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                You've successfully signed up for the Free plan. Start building your family archive today!
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link to="/photos">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pricing">View Other Plans</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/pricing" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Contact Information</h3>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Payment Method</h3>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Billing Address</h3>
                    <div>
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          placeholder="San Francisco"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      `Complete Payment - $${price}${billing === 'yearly' ? '/year' : '/month'}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Details */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <selectedPlan.icon className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{selectedPlan.name} Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {billing === 'monthly' ? 'Monthly' : 'Yearly'} billing
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Included Features:</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {selectedPlan.name} Plan ({billing})
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      ${billing === 'yearly' ? price : price}
                    </span>
                  </div>

                  {yearlyDiscount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Yearly discount</span>
                      <span>-${yearlyDiscount}</span>
                    </div>
                  )}

                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>Total</span>
                    <span>${price}{billing === 'yearly' ? '/year' : '/month'}</span>
                  </div>
                </div>

                {billing === 'yearly' && yearlyDiscount > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-700 mr-2">SAVE 17%</Badge>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        You're saving ${yearlyDiscount} with yearly billing!
                      </span>
                    </div>
                  </div>
                )}

                {/* Money Back Guarantee */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">30-Day Money Back Guarantee</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Not satisfied? Get a full refund within 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;