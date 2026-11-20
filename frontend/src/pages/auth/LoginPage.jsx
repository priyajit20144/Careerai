import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2,
  Shield, User, Briefcase, KeyRound, AlertCircle, ArrowLeft, RefreshCw
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState('candidate'); // candidate | employer | admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Demo Credentials Map
  const demoAccounts = {
    candidate: { email: 'alex.rivera@example.com', pass: 'CandidatePass123!', title: 'Candidate Portal' },
    employer: { email: 'hr@neuralflow.ai', pass: 'EmployerPass123!', title: 'Employer Portal' },
    admin: { email: 'admin@careerai.com', pass: 'AdminPass123!', title: 'Admin System' },
  };

  const handleQuickFill = (targetRole) => {
    setRole(targetRole);
    setEmail(demoAccounts[targetRole].email);
    setPassword(demoAccounts[targetRole].pass);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication processing delay
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'candidate') navigate('/candidate/dashboard');
      else if (role === 'employer') navigate('/employer/dashboard');
      else navigate('/admin/dashboard');
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setShowForgotPasswordModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
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

      {/* Main Login Card Section */}
      <main className="relative z-10 my-auto px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md bg-zinc-950/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6"
        >
          {/* Card Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-white/60">
              Access your CareerAI Intelligence Portal
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs font-semibold">
            {[
              { id: 'candidate', label: 'Candidate', icon: User },
              { id: 'employer', label: 'Employer', icon: Briefcase },
              { id: 'admin', label: 'Admin', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = role === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setRole(tab.id);
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Demo Credentials Shortcut */}
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between text-indigo-300 font-semibold text-[11px]">
              <span className="flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                Quick Demo Login
              </span>
              <span className="text-[10px] uppercase font-mono bg-indigo-500/20 px-2 py-0.5 rounded">
                1-Click Fill
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('candidate')}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                  role === 'candidate'
                    ? 'bg-indigo-600/40 border-indigo-400 text-white'
                    : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('employer')}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                  role === 'employer'
                    ? 'bg-purple-600/40 border-purple-400 text-white'
                    : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                Employer
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                  role === 'admin'
                    ? 'bg-pink-600/40 border-pink-400 text-white'
                    : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Form Error Alert */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={
                    role === 'candidate'
                      ? 'alex.rivera@example.com'
                      : role === 'employer'
                      ? 'hr@neuralflow.ai'
                      : 'admin@careerai.com'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white/80 block">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
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

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-black text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-white/70 cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {demoAccounts[role].title}</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            <div className="text-center text-xs text-white/40 uppercase tracking-widest font-mono">
              Or continue with
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Google', 'GitHub', 'LinkedIn'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => {
                    setEmail(`user@${provider.toLowerCase()}.com`);
                    setPassword('SocialAuthPass123!');
                  }}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{provider}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Register Redirect */}
          <div className="text-center text-xs text-white/60">
            Don&apos;t have a CareerAI account yet?{' '}
            <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Create Account
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-zinc-950 border border-indigo-500/40 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-indigo-400" />
                Reset Your Password
              </h3>
              <p className="text-xs text-white/60">
                Enter your registered account email address to receive password reset instructions.
              </p>

              {resetSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Password reset email sent! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
                    >
                      Send Instructions
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-xs text-white/40 font-mono">
        &copy; 2026 CareerAI Platform. Secure JWT & Encrypted Auth Enabled.
      </footer>
    </div>
  );
}
