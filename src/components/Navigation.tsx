import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, Settings, User, Navigation as NavIcon, LogOut, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

  // Unauthenticated users see public exploration items
  // Authenticated users get their personal Profile & Settings
  const navItems = loggedIn
    ? [
        { icon: Compass, label: 'Navigation', href: '/dashboard' },
        { icon: GitFork, label: 'Route Profiles', href: '/routes' },
        { icon: User, label: 'Profile & Trips', href: '/profile' },
        { icon: Settings, label: 'Settings', href: '/settings' },
      ]
    : [
        { icon: Compass, label: 'Navigation', href: '/dashboard' },
        { icon: GitFork, label: 'Route Profiles', href: '/routes' },
      ];

  const handleLogout = () => {
    authAPI.logout();
    setLoggedIn(false);
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 sticky top-0 z-50 transition-all duration-300 shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/30 group-hover:scale-105 group-hover:shadow-orange-500/50 transition-all duration-300">
                <NavIcon className="w-4 h-4 fill-current transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-orange-500 font-bold text-lg tracking-tight">नक्शा</span>
                  <span className="text-white font-bold text-lg tracking-tight">Naksha</span>
                </div>
                <span className="text-[9px] text-zinc-400 font-medium mt-0.5 tracking-wider">
                  Built for India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-zinc-800/90 text-orange-400 border border-orange-500/30 shadow-sm shadow-orange-500/10'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800"></div>

              <div className="flex items-center space-x-2">
                {loggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-1.5"
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
                      className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900 rounded-xl"
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthModalOpen(true);
                      }}
                      className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl shadow-sm"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-xl">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-orange-500 font-bold text-lg">नक्शा</span>
                    <span className="text-zinc-900 dark:text-white font-bold text-lg">Naksha</span>
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
                              ? 'bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400'
                              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      );
                    })}

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                      {loggedIn ? (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                          }}
                          className="w-full justify-start text-xs text-rose-600 dark:text-rose-400"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="w-full justify-center text-xs border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-xl"
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