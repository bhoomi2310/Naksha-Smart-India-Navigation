import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation as NavIcon, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';

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
      await authAPI.login(email.trim(), password);
      toast.success('Signed in successfully');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-center bg-zinc-950 text-zinc-100 px-4 py-12 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
              <NavIcon className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-orange-500 font-black text-2xl tracking-tight">नक्शा</span>
                <span className="text-white font-bold text-2xl tracking-tight">Naksha</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium tracking-widest mt-0.5">Built for India</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight pt-2">Sign in to your account</h1>
          <p className="text-xs text-zinc-400">Sync saved routes, commuter badges, and road hazard reports</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-7 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <Label htmlFor="email" className="text-xs font-semibold text-zinc-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 text-white rounded-xl text-xs h-11 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-zinc-300">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-950 border-zinc-800 text-white rounded-xl text-xs h-11 pr-10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-6 rounded-xl shadow-lg shadow-orange-600/25 transition-transform active:scale-95"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="pt-2 border-t border-zinc-800 text-center text-xs text-zinc-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold">
              Create an account
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link to="/dashboard" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            Continue without signing in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
