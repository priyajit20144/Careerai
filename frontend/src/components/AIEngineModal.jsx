import React from 'react';
import { X, Cpu, Sparkles, ArrowDown, Bot, Briefcase, User } from 'lucide-react';

export default function AIEngineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-600/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                CareerAI Full-Stack Architecture
              </h3>
              <p className="text-xs text-white/60 font-mono">
                Multi-Role Platform Orchestration & AI Engine Subsystems
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Architecture Tree Diagram */}
        <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-6 font-mono">
          {/* Top Brand Node */}
          <div className="flex justify-center">
            <div className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/40 border border-indigo-400/40 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>CAREERAI PLATFORM</span>
            </div>
          </div>

          {/* Connectors to Portals */}
          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Candidate Portal Branch */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-300">
                <User className="w-3.5 h-3.5" />
                <span>Candidate</span>
              </div>
              <ul className="text-[10px] text-white/70 space-y-1 text-left list-disc list-inside pt-1 border-t border-white/10">
                <li>Resume</li>
                <li>AI Resume</li>
                <li>Jobs</li>
                <li>AI Match</li>
                <li>Interview</li>
                <li>Roadmap</li>
              </ul>
            </div>

            {/* Employer Portal Branch */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-purple-300">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Employer</span>
              </div>
              <ul className="text-[10px] text-white/70 space-y-1 text-left list-disc list-inside pt-1 border-t border-white/10">
                <li>Jobs Requisitions</li>
                <li>Applicants ATS</li>
                <li>Interviews Review</li>
                <li>Hiring Analytics</li>
              </ul>
            </div>
          </div>

          {/* Downward Arrow Connector */}
          <div className="flex justify-center my-2">
            <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-bounce">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          {/* Central AI Engine Pipeline Node */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-zinc-900 to-indigo-950 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white tracking-wider uppercase">
                  AI ENGINE CORE PIPELINE
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Operational
              </span>
            </div>

            {/* Three AI Engine Subsystems */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-black/50 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-300 block">Resume AI</span>
                <span className="text-[9px] text-white/50 block">ATS Bullet Optimization & Keyword Alignment</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-indigo-500/30 space-y-1">
                <span className="text-xs font-bold text-indigo-300 block">Jobs AI</span>
                <span className="text-[9px] text-white/50 block">Vector Matching & Precision Match % Scoring</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-purple-500/30 space-y-1">
                <span className="text-xs font-bold text-purple-300 block">Interview AI</span>
                <span className="text-[9px] text-white/50 block">Interactive Simulator & Evaluation Feedback</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Close Architecture Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
