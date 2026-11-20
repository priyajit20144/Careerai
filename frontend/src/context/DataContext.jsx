import React, { useState, useEffect } from 'react';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_INTERVIEW_QUESTIONS,
  SYSTEM_ANALYTICS,
  AI_USAGE_LOGS,
} from '../data/mockData';
import { DataContext } from './dataContextInstance';

function createJobObject(newJobData) {
  return {
    id: `job-${Date.now()}`,
    postedDate: 'Just now',
    applicantsCount: 0,
    status: 'Active',
    matchScore: Math.floor(Math.random() * 15) + 85,
    tags: newJobData.tags || ['AI', 'React', 'TypeScript'],
    ...newJobData,
  };
}

function createInterviewEvaluation(answerText) {
  const wordCount = answerText ? answerText.trim().split(/\s+/).length : 0;
  return {
    overallScore: Math.min(99, Math.max(75, 80 + Math.floor(wordCount / 5))),
    technicalAccuracy: `${Math.floor(Math.random() * 8) + 90}%`,
    communicationClarity: `${Math.floor(Math.random() * 10) + 88}%`,
    feedback: `Excellent answer (${wordCount} words)! You correctly emphasized streaming response tokens, latency optimization, and robust error handling. Highlighted human-in-the-loop validation effectively.`,
    suggestedKeywords: ['Streaming Latency', 'Vector Indexing', 'Human-in-the-loop', 'Circuit Breakers'],
    evaluatedAt: new Date().toISOString(),
  };
}

function createAiUsageLog(engine, action, tokens, latency) {
  return {
    id: `log-${Date.now()}`,
    engine,
    action,
    status: 'Success',
    tokens,
    latency,
    timestamp: 'Just now',
  };
}

// Persistence key helpers
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`careerai_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`careerai_${key}`, JSON.stringify(value));
  } catch {
    // ignore
  }
};

export function DataProvider({ children }) {
  // State initialization
  const [jobs, setJobs] = useState(() => getStored('jobs', INITIAL_JOBS));
  const [candidates, setCandidates] = useState(() => getStored('candidates', INITIAL_CANDIDATES));
  const [interviewQuestions] = useState(INITIAL_INTERVIEW_QUESTIONS);
  const [systemAnalytics, setSystemAnalytics] = useState(() => getStored('analytics', SYSTEM_ANALYTICS));
  const [aiUsageLogs, setAiUsageLogs] = useState(() => getStored('ai_logs', AI_USAGE_LOGS));

  // Candidate specific state
  const [resumeText, setResumeText] = useState(() =>
    getStored(
      'resumeText',
      `Alex Rivera\nSenior Product Designer & AI UX Strategist\n\nExperience:\n- Lead designer for enterprise AI co-pilot tools, driving 40% adoption growth.\n- Architected high-converting design systems with React and TailwindCSS.\n- Conducted user testing with 50+ enterprise product leaders.`
    )
  );
  const [aiTailoredBullet, setAiTailoredBullet] = useState('');
  const [savedJobIds, setSavedJobIds] = useState(() => getStored('savedJobs', ['job-1', 'job-2']));
  const [userEvaluations, setUserEvaluations] = useState(() => getStored('evaluations', {}));

  // Sync to localStorage
  useEffect(() => setStored('jobs', jobs), [jobs]);
  useEffect(() => setStored('candidates', candidates), [candidates]);
  useEffect(() => setStored('resumeText', resumeText), [resumeText]);
  useEffect(() => setStored('savedJobs', savedJobIds), [savedJobIds]);
  useEffect(() => setStored('evaluations', userEvaluations), [userEvaluations]);
  useEffect(() => setStored('ai_logs', aiUsageLogs), [aiUsageLogs]);
  useEffect(() => setStored('analytics', systemAnalytics), [systemAnalytics]);

  const logAiUsage = (engine, action, tokens, latency) => {
    const newLog = createAiUsageLog(engine, action, tokens, latency);
    setAiUsageLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Actions
  const addJob = (newJobData) => {
    const job = createJobObject(newJobData);
    setJobs((prev) => [job, ...prev]);

    // Update analytics
    setSystemAnalytics((prev) => ({
      ...prev,
      jobPosts: prev.jobPosts + 1,
    }));

    // Log AI action
    logAiUsage('Jobs AI Engine', 'Requisition Indexed', 450, '120ms');

    return job;
  };

  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const generateAiTailoredBullet = async (targetRole) => {
    // Simulate AI response delay
    await new Promise((res) => setTimeout(res, 1200));

    const tailored = `• Architected low-latency streaming AI workflows and vector-indexed search UX tailored for ${targetRole}, boosting candidate match accuracy by 42%.\n• Designed and shipped scalable design system primitives using TailwindCSS and React 19.\n• Synthesized technical LLM requirements into accessible multi-agent UI patterns.`;

    setAiTailoredBullet(tailored);

    logAiUsage('Resume AI Engine', 'Bullet Tailoring', 1420, '280ms');

    return tailored;
  };

  const evaluateInterviewAnswer = async (questionId, answerText) => {
    // Simulate AI response delay
    await new Promise((res) => setTimeout(res, 1400));

    const evaluation = createInterviewEvaluation(answerText);

    setUserEvaluations((prev) => ({
      ...prev,
      [questionId]: evaluation,
    }));

    setSystemAnalytics((prev) => ({
      ...prev,
      aiInterviewsConducted: prev.aiInterviewsConducted + 1,
    }));

    logAiUsage('Interview AI Simulator', 'Answer Evaluation', 3250, '410ms');

    return evaluation;
  };

  return (
    <DataContext.Provider
      value={{
        jobs,
        candidates,
        interviewQuestions,
        systemAnalytics,
        aiUsageLogs,
        resumeText,
        setResumeText,
        aiTailoredBullet,
        savedJobIds,
        userEvaluations,
        addJob,
        updateCandidateStatus,
        toggleSaveJob,
        generateAiTailoredBullet,
        evaluateInterviewAnswer,
        logAiUsage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
