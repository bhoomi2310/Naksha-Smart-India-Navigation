import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import NakshaLogo from '@/components/NakshaLogo';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.login(email.trim(), password);
      const u = res?.user || res;
      const displayName = u?.fullName || u?.full_name || email.split('@')[0];
      toast.success(`Welcome back, ${displayName}!`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#F6EFE3] text-[#14121F] px-4 py-12 paper-grain selection:bg-[#F2A31B] selection:text-[#14121F]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <NakshaLogo size="lg" />
          </Link>
          <h1 className="text-2xl font-black text-[#14121F] font-display tracking-tight pt-2">
            Sign in to your account
          </h1>
          <p className="text-xs text-[#524C61]">
            Access saved routes, commuter badges, and road hazard reports
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FFFDF9] border-2 border-[#14121F] rounded-2xl p-7 shadow-[6px_6px_0_#14121F] space-y-5 text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#14121F]">Email</label>
              <input
                type="email"
                placeholder="commuter@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#14121F]">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 pr-10 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
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

            <Button
              type="submit"
              disabled={isLoading}
              className="ink-btn-primary w-full h-11 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="border-t-[1.2px] border-[#14121F]/15 pt-4 text-center">
            <p className="text-xs text-[#524C61]">
              New to Naksha?{' '}
              <Link to="/register" className="text-[#D8472B] hover:underline font-bold">
                Create a free account
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link to="/" className="text-xs text-[#524C61] hover:text-[#14121F] font-semibold transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
