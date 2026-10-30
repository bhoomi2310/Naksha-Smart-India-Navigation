import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import NakshaLogo from '@/components/NakshaLogo';

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.register(email.trim(), password, fullName.trim(), phone.trim());
      const u = res?.user || res;
      const displayName = u?.fullName || u?.full_name || fullName.trim();
      toast.success(`Account created! Welcome to Naksha, ${displayName}.`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
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
            Create your account
          </h1>
          <p className="text-xs text-[#524C61]">
            Join fellow commuters and start reporting road hazards
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FFFDF9] border-2 border-[#14121F] rounded-2xl p-7 shadow-[6px_6px_0_#14121F] space-y-5 text-left">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14121F]">Full Name *</label>
              <input
                type="text"
                placeholder="Arjun Mehta"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full h-10 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14121F]">Email Address *</label>
              <input
                type="email"
                placeholder="commuter@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14121F]">Phone Number (Optional)</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14121F]">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14121F]">Confirm Password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-10 px-3.5 rounded-lg bg-[#FAF5EC] border-[1.5px] border-[#14121F] text-[#14121F] text-sm placeholder:text-[#787287] focus:outline-none focus:ring-2 focus:ring-[#F2A31B] transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="ink-btn-primary w-full h-11 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="border-t-[1.2px] border-[#14121F]/15 pt-4 text-center">
            <p className="text-xs text-[#524C61]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#D8472B] hover:underline font-bold">
                Sign in
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

export default Register;
