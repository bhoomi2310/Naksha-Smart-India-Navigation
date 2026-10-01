import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, Settings, User, Navigation as NavIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/ThemeToggle';
import { isAuthenticated, authAPI } from '@/lib/api';
import AuthModal from '@/components/AuthModal';
import { toast } from 'sonner';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [location]);

  const navItems = [
    { icon: Compass, label: 'Navigation', href: '/dashboard' },
    { icon: User, label: 'Profile & Trips', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const handleLogout = () => {
    authAPI.logout();
    setLoggedIn(false);
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
                <NavIcon className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-orange-500 font-bold text-lg">नक्शा</span>
                  <span className="text-white font-bold text-lg">Naksha</span>
                </div>
                <span className="text-[9px] text-zinc-400 font-medium mt-0.5">
                  Built for India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-zinc-800 text-orange-400 border border-zinc-700'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-5 w-px bg-zinc-800"></div>

              <div className="flex items-center space-x-2">
                <ThemeToggle />

                {loggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-xs font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
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
                      className="text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl"
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 text-zinc-300 hover:text-white rounded-xl">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 bg-zinc-950 border-zinc-800 text-white p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-orange-500 font-bold text-lg">नक्शा</span>
                    <span className="text-white font-bold text-lg">Naksha</span>
                  </div>
                  <nav className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.label}
                          to={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                            isActive
                              ? 'bg-zinc-800 text-orange-400'
                              : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      );
                    })}

                    <div className="pt-4 border-t border-zinc-800 space-y-2">
                      {loggedIn ? (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                          }}
                          className="w-full justify-start text-xs text-rose-400"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="w-full justify-center text-xs border-zinc-800 text-zinc-200 rounded-xl"
                            onClick={() => {
                              setIsOpen(false);
                              setAuthMode('login');
                              setAuthModalOpen(true);
                            }}
                          >
                            Sign In
                          </Button>
                          <Button
                            className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl"
                            onClick={() => {
                              setIsOpen(false);
                              setAuthMode('register');
                              setAuthModalOpen(true);
                            }}
                          >
                            Sign Up
                          </Button>
                        </>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />
    </>
  );
};

export default Navigation;