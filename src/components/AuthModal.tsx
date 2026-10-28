import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight, X } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import NakshaLogo from '@/components/NakshaLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'register';
  initialMode?: 'login' | 'register';
  onSwitchMode?: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  initialMode = 'login', 
  onSwitchMode,
  onSuccess
}) => {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState<'login' | 'register'>(mode || initialMode);
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

  useEffect(() => {
    if (mode) {
      setCurrentMode(mode);
    } else if (initialMode) {
      setCurrentMode(initialMode);
    }
  }, [mode, initialMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentMode === 'register') {
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
      if (currentMode === 'login') {
        const res = await authAPI.login(formData.email.trim(), formData.password);
        toast.success(`Welcome back, ${res.user?.fullName || 'Commuter'}!`);
        onClose();
        onSuccess?.();
        setTimeout(() => navigate('/dashboard'), 150);
      } else {
        const res = await authAPI.register(
          formData.email.trim(), 
          formData.password, 
          formData.fullName.trim()
        );
        toast.success(`Account created! Welcome to Naksha, ${res.user?.fullName || 'Commuter'}!`);
        onClose();
        onSuccess?.();
        setTimeout(() => navigate('/dashboard'), 150);
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggleMode = () => {
    if (onSwitchMode) {
      onSwitchMode();
    } else {
      setCurrentMode(prev => (prev === 'login' ? 'register' : 'login'));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="p-0 border-0 max-w-sm sm:max-w-md bg-transparent shadow-none">
        <div className="relative rounded-2xl bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#14121F] text-[#14121F] overflow-hidden">
          
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-[#D8472B]" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-4 top-4 p-1.5 rounded-lg border-[1.2px] border-[#14121F] bg-[#FAF5EC] hover:bg-[#FDF0ED] text-[#14121F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-7 space-y-5 text-left">

            {/* Logo */}
            <div className="text-center flex justify-center pb-1">
              <NakshaLogo size="md" />
            </div>

            {/* Heading */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-[#14121F] font-display">
                {currentMode === 'login' ? 'Sign in to Naksha' : 'Join the Commuter Network'}
              </h2>
              <p className="text-xs text-[#524C61]">
                {currentMode === 'login'
                  ? 'Access your saved trips and preferred commute routes'
                  : 'Report road hazards and save your daily travel preferences'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {currentMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#14121F]">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Arjun Mehta"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full h-10 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14121F]">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="commuter@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14121F]">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={currentMode === 'login' ? 'Enter your password' : 'At least 6 characters'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full h-10 px-3.5 pr-10 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#524C61] hover:text-[#14121F] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {currentMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#14121F]">Confirm Password</label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3.5 pr-10 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#524C61] hover:text-[#14121F] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {currentMode === 'register' && (
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 accent-[#D8472B] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-[11px] text-[#524C61] leading-relaxed">
                    I agree to the Community Guidelines and Road Hazard Reporting terms.
                  </span>
                </label>
              )}

              {/* Primary CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="ink-btn-primary w-full h-11 mt-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading
                  ? (currentMode === 'login' ? 'Signing in...' : 'Creating account...')
                  : (currentMode === 'login' ? 'Sign In' : 'Create Free Account')}
                {!isLoading && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>

            {/* Switch mode */}
            <p className="text-center text-xs text-[#524C61] pt-1">
              {currentMode === 'login' ? "Don't have an account? " : 'Already registered? '}
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-[#D8472B] hover:underline font-bold transition-colors ml-1"
              >
                {currentMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
