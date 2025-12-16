import React, { useState } from 'react';
import { Menu, X, MapPin, Settings, User, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: MapPin, label: 'Home', href: '/' },
    { icon: MapPin, label: 'Routes', href: '/routes' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">Naksha</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="ghost" asChild>
                <a href="/login">Login</a>
              </Button>
              <Button asChild>
                <a href="/register">Sign Up</a>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-semibold text-gradient">Naksha</h2>
                </div>
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-center justify-between px-3">
                      <span className="text-sm font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/login" onClick={() => setIsOpen(false)}>Login</a>
                    </Button>
                    <Button className="w-full" asChild>
                      <a href="/register" onClick={() => setIsOpen(false)}>Sign Up</a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;