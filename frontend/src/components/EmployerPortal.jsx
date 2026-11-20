import React, { useState } from 'react';
import {
  Plus, Bot, BarChart3, Download
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function EmployerPortal({ activeModule, jobs, candidates, onTriggerToast }) {
  const { addJob, updateCandidateStatus } = useData();
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0] || null);

  // Create Job Modal state
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobSalary, setNewJobSalary] = useState('$160k - $200k');
  const [newJobLocation, setNewJobLocation] = useState('Remote');

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;
    
    const created = addJob({
      title: newJobTitle,
      company: 'CareerAI Partner',
      location: newJobLocation,
      salary: newJobSalary,
      type: 'Full-time',
      description: 'Newly created position powered by CareerAI Engine.',
    });

    setNewJobTitle('');
    setShowCreateJobModal(false);
    onTriggerToast(`Job listing "${created.title}" published!`);
  };

  return (
    <div className="space-y-6">
      {/* MODULE 1: EMPLOYER JOBS MANAGEMENT */}
      {activeModule === 'jobs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/60 p-5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div>
              <h3 className="text-lg font-bold text-white">Active Job Postings</h3>
              <p className="text-xs text-white/60">
                Manage position requisitions and trigger AI candidate matching.
              </p>
            </div>
            <button
              onClick={() => setShowCreateJobModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25 border border-indigo-400/30"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Role</span>
            </button>
          </div>

          {/* Job Creation Modal */}
          {showCreateJobModal && (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-indigo-500/40 shadow-2xl space-y-4 animate-in fade-in duration-200">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                Create New Employer Requisition
              </h4>
              <form onSubmit={handleCreateJob} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-white/70 block mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead AI Architect"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/70 block mb-1">Salary Range</label>
                  <input
                    type="text"
                    placeholder="$160k - $200k"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/70 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="San Francisco / Remote"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateJobModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
                  >
                    Publish Job Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Job List Table */}
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase">
                <tr>
                  <th className="p-4">Position</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Salary</th>
                  <th className="p-4">Applicants</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4 font-semibold text-white">
                      <div>{j.title}</div>
                      <div className="text-[10px] text-white/40 font-normal">{j.company}</div>
                    </td>
                    <td className="p-4 text-white/70">{j.location}</td>
                    <td className="p-4 text-emerald-400 font-mono">{j.salary}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                        {j.applicantsCount} candidates
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {j.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onTriggerToast(`AI matching candidates for ${j.title}...`)}
                        className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-all text-[11px]"
                      >
                        Run AI Pipeline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: APPLICANT TRACKING (ATS) */}
      {activeModule === 'applicants' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider font-mono">
              Candidates Ranked by AI Match %
            </h4>
            {candidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => setSelectedCandidate(cand)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedCandidate.id === cand.id
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-lg'
                    : 'bg-zinc-900/60 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-10 h-10 rounded-full border border-white/20 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-white truncate">{cand.name}</h5>
                    <p className="text-xs text-white/60 truncate">{cand.role}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {cand.matchScore}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            {selectedCandidate && (
              <>
                <div className="flex items-start justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedCandidate.avatar}
                      alt={selectedCandidate.name}
                      className="w-14 h-14 rounded-full border-2 border-indigo-500"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedCandidate.name}</h3>
                      <p className="text-xs text-indigo-400 font-semibold">{selectedCandidate.role}</p>
                      <span className="text-[10px] text-white/50">{selectedCandidate.email}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                      AI Match: {selectedCandidate.matchScore}%
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold font-mono">
                      Interview Score: {selectedCandidate.aiInterviewScore}/100
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Verified Skill Inventory
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-xs text-white/90 font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    AI Summary Analysis
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10">
                    {selectedCandidate.summary}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, 'Shortlisted');
                      onTriggerToast(`${selectedCandidate.name} has been shortlisted!`);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Shortlist Candidate
                  </button>
                  <button
                    onClick={() => onTriggerToast(`Interview request sent to ${selectedCandidate.name}`)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Schedule Live Interview
                  </button>
                  <button
                    onClick={() => onTriggerToast('Candidate profile exported to PDF.')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export ATS Profile</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODULE 3: INTERVIEW REVIEWS */}
      {activeModule === 'interviews' && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Interview Recordings & Transcripts</h3>
                <p className="text-xs text-white/60">
                  Review simulated AI interview responses and automated transcript ratings.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30">
              3 Recordings Available
            </span>
          </div>

          <div className="space-y-4">
            {candidateList.map((cand) => (
              <div
                key={cand.id}
                className="p-5 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img src={cand.avatar} alt={cand.name} className="w-10 h-10 rounded-full border border-white/20" />
                  <div>
                    <h5 className="text-sm font-bold text-white">{cand.name}</h5>
                    <p className="text-xs text-white/60">{cand.appliedJob}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right font-mono">
                    <div className="text-xs text-emerald-400 font-bold">
                      {cand.aiInterviewScore}/100 Rating
                    </div>
                    <div className="text-[10px] text-white/40">Verified AI Evaluation</div>
                  </div>
                  <button
                    onClick={() => onTriggerToast(`Playing AI transcript audio for ${cand.name}...`)}
                    className="px-4 py-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-400/30 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Review Transcript
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: EMPLOYER ANALYTICS */}
      {activeModule === 'analytics' && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Hiring Velocity & Match Metrics</h3>
                <p className="text-xs text-white/60">
                  Real-time reporting on applicant conversion, AI score distributions, and time to hire.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-xs text-white/50 uppercase font-mono">Avg Time to Offer</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">4.2 Days</div>
              <span className="text-[10px] text-emerald-300">↓ 65% faster than industry average</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-xs text-white/50 uppercase font-mono">AI Screening Accuracy</span>
              <div className="text-2xl font-bold font-mono text-indigo-400">96.8%</div>
              <span className="text-[10px] text-indigo-300">Based on manager interview passes</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-xs text-white/50 uppercase font-mono">Total Pipeline Candidates</span>
              <div className="text-2xl font-bold font-mono text-purple-400">128 Applicants</div>
              <span className="text-[10px] text-purple-300">+24 new this week</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
