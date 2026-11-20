import React, { useState } from 'react';
import {
  FileText, Sparkles, Target, Bot, Map, CheckCircle2,
  Search, RefreshCw, AlertCircle, Award,
  Zap, DollarSign, MapPin, Bookmark, BookmarkCheck
} from 'lucide-react';
import { useData } from '../context/useData';

export default function CandidatePortal({ activeModule, jobs, interviewQuestions, onTriggerToast }) {
  const {
    resumeText,
    setResumeText,
    aiTailoredBullet,
    generateAiTailoredBullet,
    evaluateInterviewAnswer,
    userEvaluations,
    savedJobIds,
    toggleSaveJob,
  } = useData();

  const [targetRole, setTargetRole] = useState('Senior AI Engineer');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // State for Jobs filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(jobs[0] || null);

  // State for AI Interview Simulator
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Current question evaluation from context store
  const currentQuestion = interviewQuestions[currentQuestionIndex] || interviewQuestions[0];
  const aiEvaluation = currentQuestion ? userEvaluations[currentQuestion.id] : null;

  // Handle AI Resume Enhancement
  const handleEnhanceResume = async () => {
    setIsGeneratingAI(true);
    await generateAiTailoredBullet(targetRole);
    setIsGeneratingAI(false);
    onTriggerToast('AI Resume Engine completed tailoring!');
  };

  // Handle AI Interview Evaluation
  const handleEvaluateAnswer = async () => {
    if (!userAnswerText.trim() || !currentQuestion) return;
    setIsEvaluating(true);
    await evaluateInterviewAnswer(currentQuestion.id, userAnswerText);
    setIsEvaluating(false);
    onTriggerToast('AI Interview Engine evaluated your response!');
  };

  // Filtered jobs
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* MODULE 1: RESUME BUILDER */}
      {activeModule === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Candidate Resume Core</h3>
              </div>
              <button
                onClick={() => onTriggerToast('Resume draft saved to cloud.')}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
              >
                Save Draft
              </button>
            </div>
            <p className="text-xs text-white/60">
              Keep your profile updated. Our AI Engine uses your core resume to calculate real-time job match scores.
            </p>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={12}
              className="w-full bg-black/50 border border-white/15 rounded-xl p-4 text-sm text-white font-mono leading-relaxed focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                AI Health & Score Rating
              </h4>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-emerald-400 font-mono">92/100</span>
                <span className="text-xs text-emerald-300/80 mb-1 font-semibold">Strong Profile</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full w-[92%]" />
              </div>
              <ul className="text-xs text-white/70 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Impact metrics included (40% adoption growth)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Modern stack keywords detected (React, Tailwind)</span>
                </li>
                <li className="flex items-center gap-2 text-amber-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Add 2 more LLM/Vector DB technical tags</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: AI RESUME ENHANCER */}
      {activeModule === 'ai-resume' && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Resume Generator & Tailoring</h3>
                <p className="text-xs text-white/60">
                  Select a target role to generate AI-optimized achievements tailored for ATS scanners.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Target Job Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.title}>
                    {j.title} ({j.company})
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex items-end">
              <button
                onClick={handleEnhanceResume}
                disabled={isGeneratingAI}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/25 transition-all"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Processing AI Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-purple-200" />
                    <span>Generate Tailored Resume Points</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Output Result Box */}
          <div className="bg-black/50 border border-purple-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-400" />
                AI Generated Bullet Points for: {targetRole}
              </span>
              <span className="bg-purple-500/20 px-2 py-0.5 rounded text-[10px]">ATS Score: 98%</span>
            </div>
            <textarea
              readOnly
              value={
                aiTailoredBullet ||
                'Click "Generate Tailored Resume Points" above to run the AI Engine optimization.'
              }
              rows={5}
              className="w-full bg-transparent text-sm text-white/90 font-mono focus:outline-none resize-none leading-relaxed"
            />
            {aiTailoredBullet && (
              <button
                onClick={() => {
                  setResumeText((prev) => prev + '\n\n' + aiTailoredBullet);
                  onTriggerToast('Appended AI points into main resume!');
                }}
                className="px-4 py-2 rounded-lg bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs font-semibold hover:bg-purple-600/50 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
                <span>Apply to Core Resume</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODULE 3: SEARCHABLE JOBS BOARD */}
      {activeModule === 'jobs' && (
        <div className="space-y-6">
          {/* Search Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job titles, skills, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="text-xs text-white/60 font-mono">
              Showing <span className="text-white font-bold">{filteredJobs.length}</span> active listings
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job List Cards */}
            <div className="lg:col-span-1 space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedJob.id === job.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20'
                      : 'bg-zinc-900/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{job.title}</h4>
                      <p className="text-xs text-white/70">{job.company}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                    <span>{job.location}</span>
                    <span className="font-semibold text-white/90">{job.salary}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Job Detail Panel */}
            <div className="lg:col-span-2 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
              {selectedJob && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-white">{selectedJob.title}</h3>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {selectedJob.matchScore}% AI Match
                        </span>
                      </div>
                      <p className="text-sm text-indigo-400 font-semibold mt-1">{selectedJob.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-white/40" />
                          {selectedJob.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          {selectedJob.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          toggleSaveJob(selectedJob.id);
                          onTriggerToast(
                            savedJobIds.includes(selectedJob.id)
                              ? `Removed ${selectedJob.title} from saved jobs.`
                              : `Saved ${selectedJob.title} to your profile!`
                          );
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          savedJobIds.includes(selectedJob.id)
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-white/10 border-white/15 text-white/70 hover:bg-white/20'
                        }`}
                        title="Save Job"
                      >
                        {savedJobIds.includes(selectedJob.id) ? (
                          <BookmarkCheck className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => onTriggerToast(`Application sent to ${selectedJob.company}!`)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all cursor-pointer shadow-lg shadow-blue-600/25 border border-blue-400/30"
                      >
                        1-Click Apply with AI Profile
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      Required Skills & Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white/90 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      Role Overview
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">{selectedJob.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: AI MATCH GAP ANALYZER */}
      {activeModule === 'ai-match' && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Match & Skill Gap Engine</h3>
                <p className="text-xs text-white/60">
                  Compare your candidate profile directly against enterprise target job descriptions.
                </p>
              </div>
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-400">92% Match</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/50 border border-white/10 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Matching Qualifications (8)
              </h4>
              <ul className="text-xs text-white/80 space-y-2">
                <li className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <span>Design Systems & Component Architecture</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </li>
                <li className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <span>React 19 & TailwindCSS Integration</span>
                  <span className="text-emerald-400 font-bold">98%</span>
                </li>
                <li className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <span>AI Co-Pilot & UX Interaction Design</span>
                  <span className="text-emerald-400 font-bold">95%</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Skill Gaps to Bridge (2)
              </h4>
              <ul className="text-xs text-white/80 space-y-2">
                <li className="p-2 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <span>Vector Database Indexing (Pinecone/Weaviate)</span>
                  <button
                    onClick={() => onTriggerToast('Added Pinecone course to Roadmap!')}
                    className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded"
                  >
                    + Add to Roadmap
                  </button>
                </li>
                <li className="p-2 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <span>LangChain Multi-Agent Workflows</span>
                  <button
                    onClick={() => onTriggerToast('Added LangChain prep to Roadmap!')}
                    className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded"
                  >
                    + Add to Roadmap
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: AI INTERVIEW SIMULATOR */}
      {activeModule === 'interview' && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Interactive AI Interview Simulator</h3>
                <p className="text-xs text-white/60">
                  Simulate technical & behavioral interviews with instant evaluation feedback.
                </p>
              </div>
            </div>
            <div className="text-xs text-white/60 font-mono">
              Question {currentQuestionIndex + 1} of {interviewQuestions.length}
            </div>
          </div>

          {/* Question Display Card */}
          <div className="bg-black/60 border border-blue-500/30 rounded-xl p-5 space-y-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {interviewQuestions[currentQuestionIndex].category}
            </span>
            <h4 className="text-base font-semibold text-white leading-relaxed">
              {interviewQuestions[currentQuestionIndex].question}
            </h4>
            <p className="text-xs text-white/50 italic">
              Hint: {interviewQuestions[currentQuestionIndex].hints[0]}
            </p>
          </div>

          {/* User Answer Input */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-white/70 block">Your Answer Response</label>
            <textarea
              value={userAnswerText}
              onChange={(e) => setUserAnswerText(e.target.value)}
              placeholder="Type your structured answer here (e.g., using STAR method or architectural breakdown)..."
              rows={5}
              className="w-full bg-black/50 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-all"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => (prev + 1) % interviewQuestions.length)
                }
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
              >
                Next Question
              </button>
              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !userAnswerText.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/25 disabled:opacity-50 transition-all"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Evaluating Response...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-blue-200" />
                    <span>Submit & Run AI Evaluation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Score Feedback Panel */}
          {aiEvaluation && (
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">AI Evaluation Score</span>
                </div>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {aiEvaluation.overallScore}/100
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">{aiEvaluation.feedback}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {aiEvaluation.suggestedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-400/30 font-mono"
                  >
                    +{kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 6: CAREER ROADMAP */}
      {activeModule === 'roadmap' && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                <Map className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Personalized AI Career Growth Roadmap</h3>
                <p className="text-xs text-white/60">
                  Step-by-step career path trajectory generated by CareerAI Engine.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/30">
              Target: Principal AI Architect
            </span>
          </div>

          <div className="relative border-l-2 border-indigo-500/40 ml-4 pl-6 space-y-8">
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-2 border-black ring-4 ring-indigo-500/30" />
              <h4 className="text-sm font-bold text-white">Phase 1: Current Mastery (Product Designer & Developer)</h4>
              <p className="text-xs text-white/70 mt-1">
                Completed React 19 UI, Tailwind design systems, and enterprise co-pilot flows.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-black ring-4 ring-purple-500/30" />
              <h4 className="text-sm font-bold text-white">Phase 2: In Progress (Vector DBs & RAG Architecture)</h4>
              <p className="text-xs text-white/70 mt-1">
                Building hands-on pinecone vector index pipelines and multi-agent state machines.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white/30 border-2 border-black" />
              <h4 className="text-sm font-bold text-white/60">Phase 3: Upcoming (Principal AI Leadership)</h4>
              <p className="text-xs text-white/50 mt-1">
                Overseeing multi-model LLM latency optimization, security moderation, and org growth.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
