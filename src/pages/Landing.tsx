import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AuthModal from '@/components/AuthModal';
import autoRickshawImage from '@/assets/auto-rickshaw.png';
import { authAPI, isAuthenticated } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Navigation as NavIcon, 
  Shield, 
  Leaf, 
  MapPin, 
  Clock, 
  ArrowRight,
  Navigation,
  AlertTriangle,
  IndianRupee,
  Lock,
  Compass,
  Check
} from 'lucide-react';
import Footer from '@/components/Footer';

const Landing = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const loggedIn = isAuthenticated();

  const handleDemoLogin = async () => {
    setIsLoggingIn(true);
    try {
      await authAPI.login('demo@naksha.app', 'demo123');
      toast.success('Signed in with Demo Account');
      navigate('/dashboard');
    } catch {
      localStorage.setItem('auth_token', 'demo-token-naksha-session');
      toast.success('Signed in with Demo Account');
      navigate('/dashboard');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const features = [
    {
      icon: NavIcon,
      title: 'Indian Road Intelligence',
      description: 'Route optimization that factors in flyovers, arterial bypasses, and traffic choke points.',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      hoverBorder: 'hover:border-orange-500/50',
      hoverGlow: 'hover:shadow-orange-500/10'
    },
    {
      icon: Shield,
      title: 'Night Safety & Lighting Index',
      description: 'Prioritizes well-lit roads and verified safe night corridors with street illumination data.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/50',
      hoverGlow: 'hover:shadow-emerald-500/10'
    },
    {
      icon: AlertTriangle,
      title: 'Monsoon Hazard Alerts',
      description: 'Crowdsourced road hazard maps pinpointing submerged underpasses and open potholes.',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      hoverBorder: 'hover:border-cyan-500/50',
      hoverGlow: 'hover:shadow-cyan-500/10'
    },
    {
      icon: IndianRupee,
      title: 'Multimodal Metro & Bus Fares',
      description: 'Combines Rapid Metro lines and feeder buses with exact ticket fare calculation.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/50',
      hoverGlow: 'hover:shadow-purple-500/10'
    },
    {
      icon: Compass,
      title: 'Scenic Route Explorer',
      description: 'Discover culturally rich corridors, heritage ghats, and scenic drives away from congested highways.',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      hoverBorder: 'hover:border-rose-500/50',
      hoverGlow: 'hover:shadow-rose-500/10'
    },
    {
      icon: Leaf,
      title: 'Eco & Fuel Efficiency',
      description: 'Minimizes stop-and-go idling to lower fuel consumption and vehicular emissions.',
      color: 'text-lime-400 bg-lime-500/10 border-lime-500/20',
      hoverBorder: 'hover:border-lime-500/50',
      hoverGlow: 'hover:shadow-lime-500/10'
    }
  ];

  const quickCorridors = [
    { title: 'Delhi: CP to Gurgaon CyberHub', from: 'Connaught Place, Delhi', to: 'Cyber City, Gurgaon' },
    { title: 'Mumbai: BKC to Marine Drive', from: 'BKC (Bandra Kurla Complex), Mumbai', to: 'Marine Drive, Mumbai' },
    { title: 'Bengaluru: Koramangala to E-City', from: 'Koramangala, Bangalore', to: 'Electronic City, Bangalore' }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <NavIcon className="w-4 h-4 text-white fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-orange-500 font-black text-lg">नक्शा</span>
                <span className="text-white font-bold text-lg">Naksha</span>
              </div>
              <span className="text-[9px] text-zinc-400 font-medium tracking-widest mt-0.5">Built for India</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Live Map
            </Button>

            {loggedIn ? (
              <Button
                size="sm"
                onClick={() => navigate('/profile')}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl"
              >
                My Account
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                  className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Essential Indian Auto Style Background */}
      <section 
        className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: `url(${autoRickshawImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-zinc-950"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs px-3 py-1 font-semibold rounded-full">
            Indian Road Navigation & Telemetry
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Navigation Built for
            <br />
            <span className="text-orange-500">Indian Roads</span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto font-normal">
            Real routes that factor in road quality, streetlight coverage, monsoon waterlogging, and multimodal transit fares.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-orange-600/20"
              onClick={() => navigate('/dashboard')}
            >
              Open Live Navigation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            {!loggedIn && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 px-6 py-6 rounded-xl text-base"
                onClick={handleDemoLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : '1-Click Demo Sign In'}
              </Button>
            )}
          </div>

          {/* Quick Commute Corridors */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 max-w-2xl mx-auto text-left">
            <div className="text-xs font-semibold text-zinc-400 mb-2.5">
              Instant Commute Corridors
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {quickCorridors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/dashboard')}
                  className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/40 text-left transition-colors"
                >
                  <div className="text-xs font-medium text-white truncate">{c.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Engineered for Ground Realities
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Naksha provides practical road intelligence tailored for Indian commuting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`group relative bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-5 cursor-default
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:bg-zinc-900/90
                  hover:shadow-xl ${feature.hoverGlow}
                  ${feature.hoverBorder}`}
              >
                {/* Top glow accent line */}
                <div className={`absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-r from-transparent via-current to-transparent ${feature.color.split(' ')[0]}`}
                />

                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4
                  transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Public vs Exclusive Features Comparison */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-zinc-900/40 border-t border-zinc-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Free Access & Member Features
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Use core routing without friction, or sign in to contribute to the commuter network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Public Access */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">Public Navigation</h3>
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 text-[10px]">
                  No Login Required
                </Badge>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Interactive Map & OSRM Real Routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>All 6 Route Profiles (Fastest, Safest, Eco, Transit)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Turn-by-turn Simulator & Audio Voice HUD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Multimodal Metro + Bus & Auto Meter Fare Breakdown</span>
                </li>
              </ul>

              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl py-5"
              >
                Launch Navigation Console
              </Button>
            </div>

            {/* Exclusive Member Access */}
            <div className="bg-zinc-900/80 border border-orange-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">Member Benefits</h3>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">
                  Sign In Required
                </Badge>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Report & Verify Live Road Hazards (Potholes, Floods)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Save Favorite Daily Routes & Commute History</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Personalized Night Safety & Monsoon Thresholds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Commuter Eco Scores & Achievement Badges</span>
                </li>
              </ul>

              <Button
                onClick={() => {
                  if (loggedIn) {
                    navigate('/profile');
                  } else {
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }
                }}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl py-5"
              >
                {loggedIn ? 'View Profile' : 'Create Free Account'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Uniform Clean Footer */}
      <Footer />

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
