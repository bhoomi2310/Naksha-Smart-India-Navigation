import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AuthModal from '@/components/AuthModal';
import autoRickshawImage from '@/assets/auto-rickshaw.png';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Navigation as NavIcon, 
  Shield, 
  Leaf, 
  MapPin, 
  Clock, 
  Zap,
  ArrowRight,
  Navigation,
  TrendingUp
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('register');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleDemoLogin = async () => {
    setIsLoggingIn(true);
    try {
      await authAPI.login('demo@naksha.app', 'demo123');
      toast.success('Welcome! Logging in with demo account...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.');
      // Fallback: open modal if direct login fails
      setAuthMode('login');
      setAuthModalOpen(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const features = [
    {
      icon: NavIcon,
      title: 'Smart Routing',
      description: 'AI-powered route optimization based on real Indian road conditions',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Routes that prioritize well-lit roads and safer paths, especially at night',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Choose routes that minimize fuel consumption and reduce your carbon footprint',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Clock,
      title: 'Time Optimized',
      description: 'Get the fastest routes using real-time traffic data and actual travel speeds',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Indian Context',
      description: 'Built specifically for Indian roads, understanding local conditions and culture',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Multiple Options',
      description: 'Choose from fastest, safest, cheapest, scenic, eco-friendly, or popular routes',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50K+', label: 'Routes Calculated' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '24/7', label: 'Real-time Updates' }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      {/* Hero Section with Auto-rickshaw Background (Image 6) */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: `url(${autoRickshawImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/85 via-yellow-400/80 to-orange-600/85 animate-gradient"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300/20 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto text-center py-20">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
            <Navigation className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Smart Navigation for India</span>
          </div>
          
          <h1 className="heading-hero text-white mb-6 drop-shadow-2xl animate-fade-in">
            Navigate India
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Smarter, Safer
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-4 font-light drop-shadow-lg max-w-3xl mx-auto">
            Routes that understand real Indian road conditions
          </p>
          <p className="text-lg text-white/90 mb-12 font-light drop-shadow-md max-w-2xl mx-auto">
            Built with AI, designed for India. Experience navigation like never before.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:bg-white dark:text-orange-600 dark:hover:bg-orange-50 dark:hover:text-orange-700 px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
              onClick={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-3 border-white text-white hover:bg-white hover:text-orange-600 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-orange-600 px-10 py-7 text-lg font-semibold backdrop-blur-md bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
            >
              Sign In
            </Button>
          </div>

          {/* Demo Credentials */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 max-w-md mx-auto mb-16">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <MapPin className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-semibold">Try Demo Account</span>
            </div>
            <div className="text-white/90 text-sm space-y-1 text-center">
              <p><span className="font-medium">Email:</span> demo@naksha.app</p>
              <p><span className="font-medium">Password:</span> demo123</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-3 border-white/50 text-white hover:bg-white hover:text-orange-600 dark:border-white/50 dark:text-white dark:hover:bg-white dark:hover:text-orange-600 transition-all duration-300"
              onClick={handleDemoLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging in...' : 'Sign In with Demo'}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/10">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50/50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-4 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              Features
            </Badge>
            <h2 className="heading-section mb-6 text-gray-900 dark:text-white">
              Why Choose <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-gradient">Naksha</span>?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              Navigation designed specifically for Indian roads with real-world intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative border-2 border-orange-200/50 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                  
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  {/* Top-right decorative accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-300/30 via-yellow-300/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110"></div>
                  
                  {/* Bottom-left decorative accent */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700 -z-10`}></div>
                  
                  <CardHeader className="relative z-10 p-6">
                    <div className={`relative w-24 h-24 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl group-hover:shadow-3xl`}>
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      <Icon className="w-12 h-12 text-white drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardTitle className="text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 p-6 pt-0">
                    <CardDescription className="text-base text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 font-medium">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  
                  {/* Animated shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                  
                  {/* Bottom border accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-600 dark:from-orange-600 dark:via-yellow-500 dark:to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEtLjktMi0yLTJIMjZjLTEuMSAwLTIgLjktMiAydjJjMCAxLjEuOSAyIDIgMmg4YzEuMSAwIDItLjkgMi0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TrendingUp className="w-16 h-16 text-white mx-auto mb-6 opacity-90" />
          <h2 className="heading-section text-white mb-6 drop-shadow-lg">
            Ready to Navigate Smarter?
          </h2>
          <p className="text-xl text-white/95 mb-10 font-light max-w-2xl mx-auto">
            Join thousands of users navigating India's roads with confidence and intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:bg-white dark:text-orange-600 dark:hover:bg-orange-50 dark:hover:text-orange-700 px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
              onClick={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-3 border-white text-white hover:bg-white hover:text-orange-600 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-orange-600 px-10 py-7 text-lg font-semibold backdrop-blur-md bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
            >
              Sign In
            </Button>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">Or try our demo account:</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-white text-xs">
                <span className="font-semibold">demo@naksha.app</span> / <span className="font-semibold">demo123</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Naksha
            </h3>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Smart navigation for Indian roads • Built with real-world intelligence • Powered by AI
            </p>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Naksha. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />
    </div>
  );
};

export default Landing;
