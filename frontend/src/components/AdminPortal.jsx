import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ShieldAlert, Cpu, Search, CheckCircle2, RefreshCw,
  Zap, Activity, ShieldCheck, UserCheck, UserX, Sliders
} from 'lucide-react';

export default function AdminPortal({
  activeModule,
  systemAnalytics,
  aiUsageLogs,
  onTriggerToast
}) {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState(false);

  // Editable local user directory state for demo interactivity
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Alex Rivera', role: 'Candidate', email: 'alex.rivera@example.com', status: 'Active', joined: 'Aug 2026' },
    { id: 'usr-2', name: 'NeuralFlow Recruiter', role: 'Employer', email: 'hr@neuralflow.ai', status: 'Verified', joined: 'Jul 2026' },
    { id: 'usr-3', name: 'Sarah Chen', role: 'Candidate', email: 'sarah.chen@example.com', status: 'Active', joined: 'Aug 2026' },
    { id: 'usr-4', name: 'Stratify Hiring Team', role: 'Employer', email: 'talent@stratify.ai', status: 'Verified', joined: 'Jun 2026' },
    { id: 'usr-5', name: 'Marcus Vance', role: 'Candidate', email: 'marcus.v@example.com', status: 'Active', joined: 'Sep 2026' },
  ]);

  // Moderation items
  const [moderationItems, setModerationItems] = useState([
    { id: 'mod-1', type: 'Requisition', title: 'Senior AI Engineer at StealthCo', reason: 'Unverified corporate email domain', severity: 'Medium', timestamp: '12m ago' },
    { id: 'mod-2', type: 'Candidate', title: 'Alex Rivera Resume Draft', reason: 'High keyword density flag', severity: 'Low', timestamp: '1h ago' },
  ]);

  const handleToggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          onTriggerToast(`Updated ${u.name} status to ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleResolveModeration = (itemId, action) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== itemId));
    onTriggerToast(`Moderation item ${action.toLowerCase()} successfully.`);
  };

  const handleRefreshTelemetry = () => {
    setIsRefreshingTelemetry(true);
    setTimeout(() => {
      setIsRefreshingTelemetry(false);
      onTriggerToast('Refreshed AI Engine telemetry & live token metrics.');
    }, 1000);
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeModule}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* MODULE 1: SYSTEM ANALYTICS */}
        {activeModule === 'analytics' && (
          <div className="space-y-6">
            {/* Top KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 font-mono uppercase">Total Candidates</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {systemAnalytics.activeCandidates.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>+14% growth month-over-month</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 font-mono uppercase">Employers Onboarded</span>
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-indigo-400">
                  {systemAnalytics.activeEmployers.toLocaleString()}
                </div>
                <span className="text-[11px] text-indigo-300 block">Verified corporate accounts</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase font-mono">Active Job Postings</span>
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-purple-400">
                  {systemAnalytics.jobPosts.toLocaleString()}
                </div>
                <span className="text-[11px] text-purple-300 block">Live requisitions</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase font-mono">AI Interviews Run</span>
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-emerald-400">
                  {systemAnalytics.aiInterviewsConducted.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-300 block">Real-time simulation sessions</span>
              </motion.div>
            </div>

            {/* Platform System Telemetry Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    Infrastructure & Cluster Telemetry
                  </h4>
                  <span className="px-2.5 py-1 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-semibold">
                    {systemAnalytics.aiEngineHealth}
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  Real-time health monitoring of vector embedding databases, LLM inference endpoints, and rate-limited backend services.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono">
                    <span className="text-[11px] text-white/50 block">Uptime</span>
                    <span className="text-lg font-bold text-white block mt-1">99.98%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono">
                    <span className="text-[11px] text-white/50 block">P99 Latency</span>
                    <span className="text-lg font-bold text-indigo-400 block mt-1">
                      {systemAnalytics.avgLatencyMs || 280} ms
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono sm:col-span-1 col-span-2">
                    <span className="text-[11px] text-white/50 block">Throughput</span>
                    <span className="text-lg font-bold text-emerald-400 block mt-1">1.4k req/sec</span>
                  </div>
                </div>
              </div>

              {/* Quick Admin Actions */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  Admin Quick Controls
                </h4>
                <div className="space-y-2 text-xs">
                  <button
                    onClick={handleRefreshTelemetry}
                    disabled={isRefreshingTelemetry}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>Purge Cache & Sync Metrics</span>
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingTelemetry ? 'animate-spin text-indigo-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => onTriggerToast('Generated system health report PDF.')}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-white font-semibold flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>Export Telemetry Audit PDF</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: USERS DIRECTORY */}
        {activeModule === 'users' && (
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Platform User Directory</h3>
                  <p className="text-xs text-white/60">
                    Manage candidate profiles, employer accounts, and access permissions.
                  </p>
                </div>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users by name, role, email..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase">
                  <tr>
                    <th className="p-3">User Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Joined</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-all">
                      <td className="p-3 font-bold text-white">{u.name}</td>
                      <td className="p-3 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.role === 'Employer'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-white/70 font-mono">{u.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === 'Active' || u.status === 'Verified'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-white/50 font-mono text-[11px]">{u.joined}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 ml-auto transition-all cursor-pointer ${
                            u.status === 'Active' || u.status === 'Verified'
                              ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                          }`}
                        >
                          {u.status === 'Active' || u.status === 'Verified' ? (
                            <>
                              <UserX className="w-3.5 h-3.5" />
                              <span>Suspend</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Activate</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 3: MODERATION QUEUE */}
        {activeModule === 'moderation' && (
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Content Moderation Queue</h3>
                  <p className="text-xs text-white/60">
                    Review job postings or candidate profiles flagged for policy verification.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                {moderationItems.length} Alerts Pending
              </span>
            </div>

            {moderationItems.length === 0 ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h5 className="text-sm font-bold text-white">All Flagged Items Resolved</h5>
                    <p className="text-xs text-emerald-300/80">
                      AI moderation filter automatically cleared 142 job requisitions today.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onTriggerToast('Moderation filter scan completed.')}
                  className="px-4 py-2 rounded-lg bg-emerald-600/30 text-emerald-200 border border-emerald-400/30 text-xs font-semibold hover:bg-emerald-600/50 cursor-pointer"
                >
                  Force Re-scan
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {moderationItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                          {item.type}
                        </span>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs text-white/60">{item.reason}</p>
                      <span className="text-[10px] text-white/40 font-mono block">{item.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResolveModeration(item.id, 'Approved')}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Approve Item
                      </button>
                      <button
                        onClick={() => handleResolveModeration(item.id, 'Dismissed')}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                      >
                        Dismiss Flag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODULE 4: AI ENGINE USAGE & TOKENS */}
        {activeModule === 'ai-usage' && (
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Engine Metrics & Token Consumption</h3>
                  <p className="text-xs text-white/60">
                    Monitor live token throughput, API latency, and model cost allocation.
                  </p>
                </div>
              </div>
              <button
                onClick={handleRefreshTelemetry}
                disabled={isRefreshingTelemetry}
                className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-2 hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingTelemetry ? 'animate-spin' : ''}`} />
                <span>{systemAnalytics.aiEngineHealth || '99.98% Operational'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-xs text-white/50 uppercase font-mono">Total Tokens (24h)</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {systemAnalytics.totalTokensUsed || '142.8 M'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-xs text-white/50 uppercase font-mono">Avg API Response Latency</span>
                <div className="text-2xl font-bold font-mono text-indigo-400">
                  {systemAnalytics.avgLatencyMs || 280} ms
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-xs text-white/50 uppercase font-mono">Est. Token Cost (MTD)</span>
                <div className="text-2xl font-bold font-mono text-purple-400">$342.80</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white/50 uppercase font-mono tracking-wider">
                Live AI Pipeline Execution Log Stream
              </h4>
              <div className="bg-black/80 border border-white/10 rounded-xl p-4 font-mono text-xs text-white/80 space-y-2 max-h-60 overflow-y-auto">
                {aiUsageLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span className="text-emerald-400">[{log.timestamp}]</span>
                    <span className="text-white font-bold">{log.engine}</span>
                    <span className="text-indigo-300">{log.tokens} tokens</span>
                    <span className="text-white/50">{log.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
