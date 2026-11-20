import React, { useState } from 'react';
import { Sparkles, X, Menu, Bot, Shield, Briefcase, User, Cpu } from 'lucide-react';

export default function Navbar({
  currentRole,
  onRoleChange,
  activeModule,
  onModuleChange,
  roleModules,
  onOpenAIEngineModal
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roles = [
    { id: 'candidate', label: 'Candidate', icon: User, badge: 'Job Seeker' },
    { id: 'employer', label: 'Employer', icon: Briefcase, badge: 'Hiring' },
    { id: 'admin', label: 'Admin', icon: Shield, badge: 'System' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 select-none">
      {/* Upper Role Header Bar */}
      <div className="px-4 sm:px-8 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-xs">
        {/* Role Selector Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-white/40 hidden sm:inline font-mono uppercase text-[10px] tracking-wider mr-1">PORTAL:</span>
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  onRoleChange(r.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* AI Engine Status Badge */}
        <button
          onClick={onOpenAIEngineModal}
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Cpu className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px] hidden sm:inline">AI Engine v4.2 Active</span>
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Career<span className="text-indigo-400">AI</span>
            </span>
            <span className="text-[10px] text-white/50 block font-mono -mt-1 uppercase tracking-widest">
              Full-Stack SaaS Platform
            </span>
          </div>
        </div>

        {/* Sub-module Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {roleModules[currentRole]?.map((mod) => {
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onModuleChange(mod.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white/20 text-white shadow-inner border border-white/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {mod.icon && <mod.icon className="w-3.5 h-3.5 text-indigo-300" />}
                <span>{mod.label}</span>
                {mod.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    {mod.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAIEngineModal}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all cursor-pointer shadow-lg shadow-indigo-600/25 border border-indigo-400/30"
          >
            <Bot className="w-4 h-4 text-indigo-200" />
            <span>AI Pipeline</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-zinc-900 border-b border-white/10 space-y-3">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider font-mono">
            {currentRole} Modules
          </div>
          <div className="grid grid-cols-2 gap-2">
            {roleModules[currentRole]?.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  onModuleChange(mod.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center gap-2 border transition-all ${
                  activeModule === mod.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {mod.icon && <mod.icon className="w-4 h-4 text-indigo-400 shrink-0" />}
                <span className="truncate">{mod.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
