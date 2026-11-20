import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Mail, Lock, User, Briefcase, Building, ArrowRight,
  ArrowLeft, RefreshCw, Eye, EyeOff
} from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [role, setRole] = useState('candidate'); // candidate | employer
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'candidate') navigate('/candidate/dashboard');
      else navigate('/employer/dashboard');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
            Career<span className="text-indigo-400">AI</span>
          </span>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Registration Card */}
      <main className="relative z-10 my-auto px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md bg-zinc-950/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-white/60">
              Start building your career trajectory with AI Intelligence
            </p>
          </div>

          {/* Account Role Selector */}
          <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setRole('candidate')}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'candidate'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate</span>
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'employer'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Employer</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Employer Company Name */}
            {role === 'employer' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">Company / Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="NeuralFlow AI"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="alex.rivera@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-black text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-white/70 cursor-pointer">
                I agree to CareerAI Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create {role === 'candidate' ? 'Candidate' : 'Employer'} Account</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-white/60">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Sign In
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-4 px-6 text-center text-xs text-white/40 font-mono">
        &copy; 2026 CareerAI Platform. All rights reserved.
      </footer>
    </div>
  );
}
