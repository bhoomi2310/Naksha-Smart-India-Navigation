import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Compass, Settings, User, LogOut, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { isAuthenticated, authAPI } from '@/lib/api';
import AuthModal from '@/components/AuthModal';
import NakshaLogo from '@/components/NakshaLogo';
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
      <nav className="bg-[#FAF5EC] border-b-[1.5px] border-[#14121F] sticky top-0 z-50 transition-all shadow-[0_2px_0_#14121F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A31B] rounded-lg p-1"
              aria-label="Naksha Home"
            >
              <NakshaLogo size="sm" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#FFFDF9] text-[#D8472B] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F]'
                          : 'text-[#14121F] hover:text-[#D8472B] hover:bg-[#F6EFE3] border-[1.5px] border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D8472B]' : 'text-[#524C61]'}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-5 w-px bg-[#14121F]/20" aria-hidden="true" />

              <div className="flex items-center space-x-2">
                {loggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-xs font-bold text-[#D8472B] hover:bg-[#FDF0ED] rounded-lg flex items-center gap-1.5"
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
                      className="text-xs font-bold text-[#14121F] hover:bg-[#E6DCCB]/60 rounded-lg px-3"
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthModalOpen(true);
                      }}
                      className="ink-btn-primary text-xs rounded-lg px-3.5 py-1.5"
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
                  <button
                    aria-label="Open navigation drawer"
                    className="p-2 text-[#14121F] rounded-lg border-[1.5px] border-[#14121F] bg-[#FFFDF9] shadow-[2px_2px_0_#14121F] hover:bg-[#FAF5EC]"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 bg-[#F6EFE3] border-l-[1.5px] border-[#14121F] text-[#14121F] p-6"
                >
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b-[1.5px] border-[#14121F]/20">
                    <NakshaLogo size="sm" />
                  </div>

                  <div className="flex flex-col space-y-2 mb-6">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-[#FFFDF9] text-[#D8472B] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F]'
                              : 'text-[#14121F] hover:bg-[#FFFDF9]/60'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#D8472B]' : 'text-[#524C61]'}`} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t-[1.5px] border-[#14121F]/20">
                    {loggedIn ? (
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        className="ink-btn-secondary w-full text-xs font-bold py-2 rounded-lg"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsOpen(false);
                            setAuthMode('login');
                            setAuthModalOpen(true);
                          }}
                          className="ink-btn-secondary w-full text-xs font-bold py-2 rounded-lg"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            setIsOpen(false);
                            setAuthMode('register');
                            setAuthModalOpen(true);
                          }}
                          className="ink-btn-primary w-full text-xs font-bold py-2 rounded-lg"
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode((m) => (m === 'login' ? 'register' : 'login'))}
      />
    </>
  );
};

export default Navigation;
