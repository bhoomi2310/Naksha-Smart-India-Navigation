import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, MapPin, X, Navigation } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onSwitchMode }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (!acceptTerms) {
        toast.error('Please accept the terms and conditions');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await authAPI.login(formData.email, formData.password);
        toast.success('Login successful!');
        onClose();
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        await authAPI.register(formData.email, formData.password, formData.fullName);
        toast.success('Registration successful!');
        onClose();
        // Redirect to onboarding after registration
        setTimeout(() => {
          navigate('/onboarding');
        }, 100);
      }
    } catch (error: any) {
      toast.error(error.message || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const useDemoAccount = async () => {
    // Auto-submit if in login mode
    if (mode === 'login') {
      setIsLoading(true);
      try {
        await authAPI.login('demo@naksha.app', 'demo123');
        toast.success('Login successful! Welcome back!');
        onClose();
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      } catch (error: any) {
        console.error('Demo login error:', error);
        toast.error(error.message || 'Login failed. Please check your connection and try again.');
        // Fill form anyway so user can see credentials
        setFormData({
          fullName: 'Demo User',
          email: 'demo@naksha.app',
          password: 'demo123',
          confirmPassword: 'demo123'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // For register mode, just fill the form
      setFormData({
        fullName: 'Demo User',
        email: 'demo@naksha.app',
        password: 'demo123',
        confirmPassword: 'demo123'
      });
      setAcceptTerms(true);
      toast.info('Demo credentials filled. Click Create Account to continue.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-orange-200 dark:border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-6 h-6 text-orange-500" />
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Naksha
            </DialogTitle>
          </div>
          <DialogTitle className="text-xl">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' 
              ? 'Sign in to your account to continue' 
              : 'Join Naksha to start your journey'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11 pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-11 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>
          )}

          {mode === 'login' && (
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-900/30 dark:hover:text-orange-300 font-medium transition-all duration-300"
              onClick={useDemoAccount}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Use Demo Account
            </Button>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 dark:from-orange-600 dark:to-orange-500 dark:hover:from-orange-700 dark:hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading 
              ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
              : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={onSwitchMode}
                className="text-orange-500 hover:underline font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {mode === 'login' && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-muted-foreground mb-2">
                Demo Credentials:
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-xs space-y-1">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Email:</span> demo@naksha.app
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Password:</span> demo123
                </p>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
