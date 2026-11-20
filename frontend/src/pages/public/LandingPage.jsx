import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, ChevronDown, Menu, X, ArrowRight, Target, FileText,
  Briefcase, Shield
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTab, setActiveTab] = useState('candidate'); // candidate | employer | admin

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Candidate Suite', href: '#features' },
    { name: 'AI Workflows', href: '#tools' },
    { name: 'AI Interview', href: '#interview' },
    { name: 'For Employers', href: '#employers' },
  ];

  const faqs = [
    {
      q: 'How does CareerAI calculate precision Job Compatibility?',
      a: 'CareerAI indexes your verified skills, experience level, and project achievements against target job requisitions to compute a precision 90%+ match score based on semantic vector alignment.',
    },
    {
      q: 'Can employers access candidate resumes without permission?',
      a: 'No. Candidates retain full control over profile visibility. Resumes are shared only when an application is submitted or when candidate matching permission is explicitly enabled.',
    },
    {
      q: 'Are AI interview mock sessions realistic?',
      a: 'Yes! The AI Interview Simulator evaluates technical accuracy, answer structure, and clarity, providing actionable score breakdowns, keyword recommendations, and real-time feedback.',
    },
    {
      q: 'How does CareerAI streamline hiring for employers?',
      a: 'Employers can post requisitions, leverage automated ATS candidate scoring, inspect AI interview transcripts, and shortlist top talent in days instead of weeks.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* HERO SECTION WITH IMMERSIVE VIDEO BACKDROP */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-95 pointer-events-none" />

        {/* Floating Navigation Header */}
        <div className="relative z-10 flex flex-col min-h-screen justify-between">
          <nav className="px-5 py-5 sm:px-8 sm:py-6 lg:px-12 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 text-white transition-opacity hover:opacity-90">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Career<span className="text-indigo-400">AI</span>
              </span>
            </a>

            {/* Desktop Navigation Pill Cluster */}
            <div className="hidden md:flex items-center gap-3">
              <div className="rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-xl border border-white/15 flex items-center gap-1 shadow-2xl">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Login & Get Started Pill Buttons */}
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="rounded-full px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-all bg-[linear-gradient(to_bottom,#2B2B2B,#101010)] border border-white/20 shadow-lg cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden h-10 w-10 rounded-full bg-white/15 backdrop-blur-lg border border-white/20 flex items-center justify-center relative z-50 text-white cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Drawer */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl px-6 pt-24 pb-10 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-lg font-medium text-white border-b border-white/10"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-3 rounded-full bg-white/10 text-white text-sm font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/register');
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Main Hero Content (Bottom-Anchored) */}
          <main className="mt-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
            {/* Left Column: Headline + Email CTA */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-indigo-300 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Next-Gen Career Intelligence Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-semibold leading-[1.1] tracking-tight text-white">
                Build the career you&apos;re capable of.
              </h1>

              <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                AI-driven resume optimization, precision job match scoring, and real-time interview simulation — engineered to accelerate your career trajectory.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/register?email=${encodeURIComponent(email)}`);
                }}
                className="mt-6 sm:mt-8 flex flex-col sm:inline-flex sm:flex-row sm:items-center rounded-full sm:bg-white sm:p-1.5 gap-3 sm:gap-0 w-full sm:w-auto shadow-2xl"
              >
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-64 rounded-full sm:rounded-none bg-white sm:bg-transparent px-5 py-3 sm:px-4 sm:py-2 text-sm text-gray-900 placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full px-6 py-3 sm:py-2.5 text-sm font-medium text-white bg-[linear-gradient(to_bottom,#2B2B2B,#101010)] hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Launch CareerAI</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </button>
              </form>
            </div>

            {/* Right Column: Two Glass Cards */}
            <div className="flex flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5 w-full lg:w-auto">
              {/* Floating Statistics Card */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 sm:p-6 sm:w-64 flex flex-col justify-between shadow-2xl">
                <div>
                  <span className="font-silkscreen font-bold tracking-tight text-3xl sm:text-4xl text-white">
                    48,000+
                  </span>
                  <p className="text-sm leading-relaxed mt-3 sm:mt-4 text-white/80">
                    Professionals accelerating their career breakthrough with CareerAI.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300 font-mono">
                  <span>Match Rate</span>
                  <span className="font-bold text-white">96.8%</span>
                </div>
              </div>

              {/* Floating Testimonial Card */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 sm:p-6 sm:w-64 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">CareerAI Testimonial</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/85">
                    &ldquo;CareerAI automated my resume tailoring and prepared me for tough technical interviews in days.&rdquo;
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 flex items-center gap-3 pt-3 border-t border-white/10">
                  <img
                    src="https://i.pravatar.cc/72?img=12"
                    alt="Sara Klein"
                    className="w-9 h-9 rounded-full object-cover border border-white/30 shrink-0"
                  />
                  <div>
                    <span className="text-sm font-semibold text-white block leading-tight">
                      Sara Klein
                    </span>
                    <span className="text-xs text-white/60 block leading-tight">
                      Lead Product Manager
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* SECTION 1: TRUSTED BY & PLATFORM METRICS */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
            <div className="text-3xl font-bold font-mono text-indigo-400">96.8%</div>
            <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">Job Fit Accuracy</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
            <div className="text-3xl font-bold font-mono text-purple-400">14,200+</div>
            <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">Active Requisitions</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
            <div className="text-3xl font-bold font-mono text-emerald-400">4.2 Days</div>
            <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">Avg Candidate Hire Time</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
            <div className="text-3xl font-bold font-mono text-pink-400">48,900+</div>
            <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">AI Interviews Conducted</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE PRODUCT PORTAL PREVIEW */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">
            Platform Orchestration
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for Candidates, Employers & Admins
          </h2>
          <p className="text-sm sm:text-base text-white/70">
            Switch between portal views below to preview how CareerAI connects talent discovery with intelligent hiring workflows.
          </p>

          {/* Interactive Portal Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-zinc-900 border border-white/15 backdrop-blur-xl gap-2 mt-4 text-xs font-semibold">
            {[
              { id: 'candidate', label: 'Candidate Portal', icon: Target },
              { id: 'employer', label: 'Employer Portal', icon: Briefcase },
              { id: 'admin', label: 'Admin Portal', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Cards */}
        <div className="bg-zinc-950/80 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          {activeTab === 'candidate' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="space-y-4 lg:col-span-1">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Candidate Career Intelligence</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Automate resume tailoring for target roles, analyze missing ATS keywords, and practice with real-time AI interview simulations.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/candidate/resume')}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Candidate Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">AI Resume Enhancer</span>
                    <span className="text-emerald-400 font-mono">ATS 98%</span>
                  </div>
                  <p className="text-xs text-white/60 font-mono leading-relaxed">
                    &bull; Architected streaming LLM pipelines and low-latency search UX.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">AI Interview Simulator</span>
                    <span className="text-indigo-400 font-mono">Score: 94/100</span>
                  </div>
                  <p className="text-xs text-white/60 font-mono leading-relaxed">
                    Evaluates clarity, technical accuracy, and key architecture terms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employer' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="space-y-4 lg:col-span-1">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Employer Hiring Engine</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Post position requisitions, leverage AI match scoring on applicants, review AI interview transcripts, and shorten your hiring cycle.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/employer/jobs')}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Employer Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                  <span className="text-xs text-white/50 uppercase font-mono">Active Job Requisitions</span>
                  <div className="text-2xl font-bold font-mono text-purple-400">14 Active Roles</div>
                  <span className="text-[10px] text-emerald-400">Verified corporate portal</span>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                  <span className="text-xs text-white/50 uppercase font-mono">Applicant ATS Sorting</span>
                  <div className="text-2xl font-bold font-mono text-indigo-400">42 Applicants</div>
                  <span className="text-[10px] text-indigo-300">AI Match Score: 96%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="space-y-4 lg:col-span-1">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">System Admin Control</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Monitor platform health metrics, manage candidate and employer user directories, and inspect AI Engine token usage in real time.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/admin/analytics')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Admin Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                  <span className="text-xs text-white/50 uppercase font-mono">AI Engine Latency</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">280 ms</div>
                  <span className="text-[10px] text-emerald-300">99.98% Operational</span>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                  <span className="text-xs text-white/50 uppercase font-mono">Token Audit Logs</span>
                  <div className="text-2xl font-bold font-mono text-indigo-400">142.8 M Tokens</div>
                  <span className="text-[10px] text-indigo-300">Live token meter</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: AI CAREER INTELLIGENCE WORKFLOW PIPELINE */}
      <section id="tools" className="py-24 px-6 max-w-7xl mx-auto space-y-12 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">
            End-to-End Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            AI Career Intelligence Workflow
          </h2>
          <p className="text-sm text-white/70">
            From resume optimization to job matching and interview preparation, CareerAI guides every step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 font-mono text-xs">
          {[
            { step: '01', title: 'Resume Upload', desc: 'Text parsing & ATS scoring' },
            { step: '02', title: 'AI Analysis', desc: 'Skill extraction & keyword audit' },
            { step: '03', title: 'Skill Gap', desc: 'Identify missing requirements' },
            { step: '04', title: 'Roadmap', desc: 'Personalized growth trajectory' },
            { step: '05', title: 'Job Match', desc: 'Precision 92%+ scoring' },
            { step: '06', title: 'AI Interview', desc: 'Real-time mock evaluation' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all space-y-2"
            >
              <span className="text-indigo-400 font-bold">{item.step}</span>
              <h4 className="text-sm font-bold text-white font-sans">{item.title}</h4>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FAQ & FOOTER */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-white/10 space-y-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 cursor-pointer transition-all hover:border-white/20"
            >
              <div className="flex items-center justify-between font-semibold text-sm text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === idx ? 'rotate-180 text-indigo-400' : 'text-white/40'}`} />
              </div>
              {activeFaq === idx && (
                <p className="mt-3 text-xs text-white/70 leading-relaxed border-t border-white/10 pt-3 font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-xs text-white/40 border-t border-white/10 font-mono flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <div>
          &copy; 2026 CareerAI Platform Inc. All rights reserved. Premium AI-Powered Career Intelligence.
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/60">
          <button onClick={() => navigate('/login')} className="hover:text-white">Login</button>
          <span>&bull;</span>
          <button onClick={() => navigate('/register')} className="hover:text-white">Register</button>
          <span>&bull;</span>
          <a href="#features" className="hover:text-white">Portals</a>
        </div>
      </footer>
    </div>
  );
}
