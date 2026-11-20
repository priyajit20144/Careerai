import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FileText, Sparkles, Briefcase, Target, Bot, Map, Users, BarChart3,
  ShieldAlert, Cpu, CheckCircle2
} from 'lucide-react';

import Navbar from './components/Navbar';
import CandidatePortal from './components/CandidatePortal';
import EmployerPortal from './components/EmployerPortal';
import AdminPortal from './components/AdminPortal';
import AIEngineModal from './components/AIEngineModal';
import { useData } from './context/useData';

const ROLE_MODULES = {
  candidate: [
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'ai-resume', label: 'AI Resume', icon: Sparkles, badge: 'AI' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'ai-match', label: 'AI Match', icon: Target, badge: '92%' },
    { id: 'interview', label: 'Interview', icon: Bot, badge: 'Sim' },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
  ],
  employer: [
    { id: 'jobs', label: 'Jobs Requisitions', icon: Briefcase },
    { id: 'applicants', label: 'Applicants (ATS)', icon: Users, badge: 'AI Score' },
    { id: 'interviews', label: 'AI Interviews', icon: Bot },
    { id: 'analytics', label: 'Hiring Analytics', icon: BarChart3 },
  ],
  admin: [
    { id: 'analytics', label: 'System Metrics', icon: BarChart3 },
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'moderation', label: 'Moderation Queue', icon: ShieldAlert },
    { id: 'ai-usage', label: 'AI Usage & Tokens', icon: Cpu, badge: 'Live' },
  ],
};

const DEFAULT_MODULES = {
  candidate: 'resume',
  employer: 'jobs',
  admin: 'analytics',
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = useData();

  const parts = location.pathname.split('/').filter(Boolean);
  const pathRole = parts[0] && ROLE_MODULES[parts[0]] ? parts[0] : 'candidate';
  const roleModulesList = ROLE_MODULES[pathRole];
  const validModule = roleModulesList.find((m) => m.id === parts[1]);
  const currentRole = pathRole;
  const activeModule = validModule ? parts[1] : DEFAULT_MODULES[pathRole];

  const [isAIEngineModalOpen, setIsAIEngineModalOpen] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Validate pathname with navigation
  useEffect(() => {
    const currentParts = location.pathname.split('/').filter(Boolean);
    const candidateRole = currentParts[0];
    const candidateModule = currentParts[1];

    if (candidateRole && ROLE_MODULES[candidateRole]) {
      const isValid = ROLE_MODULES[candidateRole].some((m) => m.id === candidateModule);
      if (!isValid) {
        const fallback = DEFAULT_MODULES[candidateRole];
        navigate(`/${candidateRole}/${fallback}`, { replace: true });
      }
    } else {
      navigate('/candidate/resume', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Handle role change and set default active module for that role
  const handleRoleChange = (role) => {
    const targetModule = DEFAULT_MODULES[role] || 'resume';
    navigate(`/${role}/${targetModule}`);
    triggerToast(`Switched portal view to ${role.toUpperCase()}`);
  };

  const handleModuleChange = (modId) => {
    navigate(`/${currentRole}/${modId}`);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background Subtle Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Notification Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 text-white px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 border border-indigo-500/40 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        roleModules={ROLE_MODULES}
        onOpenAIEngineModal={() => setIsAIEngineModalOpen(true)}
      />

      {/* Main Container */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Dynamic Portal Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/40 p-5 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-indigo-400 font-bold">
              <span>{currentRole} Portal</span>
              <span>/</span>
              <span className="text-white">{activeModule}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 capitalize">
              {currentRole} {activeModule.replace('-', ' ')} Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIEngineModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Inspect AI Architecture</span>
            </button>
          </div>
        </div>

        {/* Dynamic Role Views */}
        {currentRole === 'candidate' && (
          <CandidatePortal
            activeModule={activeModule}
            jobs={data.jobs}
            candidates={data.candidates}
            interviewQuestions={data.interviewQuestions}
            onTriggerToast={triggerToast}
          />
        )}

        {currentRole === 'employer' && (
          <EmployerPortal
            activeModule={activeModule}
            jobs={data.jobs}
            candidates={data.candidates}
            onTriggerToast={triggerToast}
          />
        )}

        {currentRole === 'admin' && (
          <AdminPortal
            activeModule={activeModule}
            systemAnalytics={data.systemAnalytics}
            aiUsageLogs={data.aiUsageLogs}
            candidates={data.candidates}
            onTriggerToast={triggerToast}
          />
        )}
      </main>

      {/* AI Engine Architecture Inspector Modal */}
      <AIEngineModal
        isOpen={isAIEngineModalOpen}
        onClose={() => setIsAIEngineModalOpen(false)}
      />
    </div>
  );
}
