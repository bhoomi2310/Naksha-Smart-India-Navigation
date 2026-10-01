import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Navigation, ArrowRight } from 'lucide-react';
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
        toast.success('Signed in successfully');
        onClose();
        setTimeout(() => navigate('/dashboard'), 100);
      } else {
        await authAPI.register(formData.email, formData.password, formData.fullName);
        toast.success('Account created!');
        onClose();
        setTimeout(() => navigate('/onboarding'), 100);
      }
    } catch (error: any) {
      toast.error(error.message || `${mode === 'login' ? 'Sign in' : 'Registration'} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const useDemoAccount = async () => {
    if (mode === 'login') {
      setIsLoading(true);
      try {
        await authAPI.login('demo@naksha.app', 'demo123');
        toast.success('Signed in with demo account');
        onClose();
        setTimeout(() => navigate('/dashboard'), 300);
      } catch {
        localStorage.setItem('auth_token', 'demo-token-naksha-session');
        toast.success('Signed in with demo account');
        onClose();
        setTimeout(() => navigate('/dashboard'), 300);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormData({ fullName: 'Demo User', email: 'demo@naksha.app', password: 'demo123', confirmPassword: 'demo123' });
      setAcceptTerms(true);
      toast.info('Demo credentials filled — click Create Account to proceed.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-sm w-full [&>button]:hidden overflow-visible">
        <div className="relative bg-zinc-900 border border-zinc-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">

          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />

          <div className="px-7 pt-7 pb-8 space-y-5">

            {/* Logo */}
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-white fill-current" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-orange-500 font-black text-xl leading-none">नक्शा</span>
                  <span className="text-white font-bold text-xl leading-none">Naksha</span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 tracking-widest font-medium">Built for India</p>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800" />

            {/* Heading */}
            <div>
              <h2 className="text-lg font-bold text-white">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {mode === 'login'
                  ? 'Sign in to access your routes and saved journeys'
                  : 'Join the Naksha community and navigate smarter'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Arjun Mehta"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full h-10 px-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full h-10 px-3.5 pr-10 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Confirm Password</label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3.5 pr-10 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 accent-orange-500 w-3.5 h-3.5 flex-shrink-0"
                  />
                  <span className="text-[11px] text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    I agree to the{' '}
                    <span className="text-orange-400 hover:underline cursor-pointer">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-orange-400 hover:underline cursor-pointer">Privacy Policy</span>
                  </span>
                </label>
              )}

              {/* Primary CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 mt-1 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isLoading
                  ? (mode === 'login' ? 'Signing in…' : 'Creating account…')
                  : (mode === 'login' ? 'Sign In' : 'Create Account')}
                {!isLoading && <ArrowRight className="w-3.5 h-3.5" />}
              </button>

              {/* Demo account shortcut */}
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={useDemoAccount}
                  disabled={isLoading}
                  className="w-full h-9 rounded-xl border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                >
                  Try with Demo Account
                </button>
              )}
            </form>

            {/* Switch mode */}
            <p className="text-center text-xs text-zinc-500">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={onSwitchMode}
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
