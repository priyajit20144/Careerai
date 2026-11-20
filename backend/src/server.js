import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { status: 429, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', apiLimiter);

// In-memory Database Store
let jobsStore = [
  {
    id: 'job-1',
    title: 'Senior AI Engineer',
    company: 'NeuralFlow',
    location: 'San Francisco, CA (Remote)',
    salary: '$180k - $240k',
    type: 'Full-time',
    matchScore: 96,
    tags: ['PyTorch', 'LLMs', 'Python', 'Vector DBs'],
    description: 'Lead the development of custom LLM orchestration pipelines and real-time multi-agent systems for enterprise applications.',
    applicantsCount: 42,
    status: 'Active',
    postedDate: '2 days ago',
  },
  {
    id: 'job-2',
    title: 'Staff Product Designer',
    company: 'Stratify AI',
    location: 'New York, NY (Hybrid)',
    salary: '$165k - $210k',
    type: 'Full-time',
    matchScore: 92,
    tags: ['Figma', 'Design Systems', 'AI UX', 'Prototyping'],
    description: 'Shape next-generation AI co-pilot interface paradigms and high-conversion SaaS design systems.',
    applicantsCount: 28,
    status: 'Active',
    postedDate: '1 day ago',
  },
];

let candidatesStore = [
  {
    id: 'cand-1',
    name: 'Alex Rivera',
    role: 'Senior Product Designer & Frontend Developer',
    email: 'alex.rivera@example.com',
    matchScore: 96,
    aiInterviewScore: 94,
    status: 'Under Review',
    appliedJob: 'Staff Product Designer',
    appliedDate: 'Sep 4, 2026',
    skills: ['Figma', 'React', 'TailwindCSS', 'AI UX'],
  },
  {
    id: 'cand-2',
    name: 'Sarah Chen',
    role: 'Senior AI Engineer',
    email: 'sarah.chen@example.com',
    matchScore: 92,
    aiInterviewScore: 91,
    status: 'Interview Scheduled',
    appliedJob: 'Senior AI Engineer',
    appliedDate: 'Sep 3, 2026',
    skills: ['PyTorch', 'LangChain', 'Python', 'RAG'],
  },
];

let adminUsersStore = [
  { id: 'usr-1', name: 'Alex Rivera', role: 'Candidate', email: 'alex.rivera@example.com', status: 'Active', joined: 'Aug 2026' },
  { id: 'usr-2', name: 'NeuralFlow Recruiter', role: 'Employer', email: 'hr@neuralflow.ai', status: 'Verified', joined: 'Jul 2026' },
  { id: 'usr-3', name: 'Sarah Chen', role: 'Candidate', email: 'sarah.chen@example.com', status: 'Active', joined: 'Aug 2026' },
  { id: 'usr-4', name: 'Stratify Hiring Team', role: 'Employer', email: 'talent@stratify.ai', status: 'Verified', joined: 'Jun 2026' },
];

let moderationQueueStore = [
  { id: 'mod-1', type: 'Job Post', title: 'Unverified Lead Recruiter Listing', flaggedReason: 'Unverified employer domain', status: 'Pending Review', severity: 'Medium', timestamp: '10 mins ago' },
  { id: 'mod-2', type: 'Candidate Profile', title: 'Resume Skill Overflow Flag', flaggedReason: 'Unusual keyword density', status: 'Under Inspection', severity: 'Low', timestamp: '1 hour ago' },
];

let usageLogs = [
  { id: 'log-101', engine: 'Resume AI Engine', action: 'Bullet Tailoring', status: 'Success', tokens: 1420, latency: '280ms', timestamp: 'Just now' },
  { id: 'log-102', engine: 'Interview AI Simulator', action: 'Answer Evaluation', status: 'Success', tokens: 3250, latency: '410ms', timestamp: '2 mins ago' },
  { id: 'log-103', engine: 'Jobs AI Matcher', action: 'Vector Scoring', status: 'Success', tokens: 890, latency: '190ms', timestamp: '5 mins ago' },
];

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CareerAI API Engine',
    timestamp: new Date().toISOString(),
  });
});

// Authentication Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Demo Token Simulation
  const token = `jwt_mock_token_${Date.now()}_${role || 'candidate'}`;
  return res.json({
    message: 'Authentication successful',
    token,
    user: {
      email,
      role: role || 'candidate',
      name: email.split('@')[0].replace('.', ' '),
    },
  });
});

app.post('/api/auth/register', (req, res) => {
  const { fullName, email, role } = req.body;
  if (!email || !fullName) {
    return res.status(400).json({ error: 'Full name and email are required' });
  }

  return res.status(201).json({
    message: 'Account created successfully',
    user: {
      fullName,
      email,
      role: role || 'candidate',
    },
  });
});

// Jobs Endpoints
app.get('/api/jobs', (req, res) => {
  res.json({ jobs: jobsStore });
});

app.post('/api/jobs', (req, res) => {
  const { title, company, salary, location, description, tags } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Job title is required' });
  }

  const newJob = {
    id: `job-${Date.now()}`,
    title,
    company: company || 'CareerAI Partner',
    location: location || 'Remote',
    salary: salary || '$160k - $200k',
    type: 'Full-time',
    matchScore: Math.floor(Math.random() * 15) + 85,
    tags: tags || ['AI', 'React', 'Node.js'],
    description: description || 'Newly created position.',
    applicantsCount: 0,
    status: 'Active',
    postedDate: 'Just now',
  };

  jobsStore.unshift(newJob);
  res.status(201).json({ message: 'Job created', job: newJob });
});

// Candidates Endpoints
app.get('/api/candidates', (req, res) => {
  res.json({ candidates: candidatesStore });
});

app.patch('/api/candidates/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const candidate = candidatesStore.find((c) => c.id === id);
  if (!candidate) {
    return res.status(404).json({ error: 'Candidate not found' });
  }

  if (status) candidate.status = status;
  res.json({ message: 'Candidate updated', candidate });
});

// AI Simulation Services
app.post('/api/ai/tailor-resume', (req, res) => {
  const { targetRole, resumeText } = req.body;
  
  const charLength = resumeText ? resumeText.length : 0;
  const tailoredBullet = `• Architected low-latency streaming AI workflows and vector-indexed search UX tailored for ${targetRole || 'Target Role'}, boosting match accuracy by 42% (Processed ${charLength} input chars).\n• Synthesized technical LLM requirements into accessible multi-agent UI patterns.`;
  
  res.json({
    success: true,
    engine: 'Resume AI Engine v4.2',
    tailoredContent: tailoredBullet,
    atsScore: 98,
    tokensUsed: 1420,
    latencyMs: 280,
  });
});

app.post('/api/ai/evaluate-interview', (req, res) => {
  const { questionId, answerText } = req.body;

  if (!answerText) {
    return res.status(400).json({ error: 'Answer text is required' });
  }

  const evaluation = {
    questionId: questionId || 1,
    overallScore: Math.floor(Math.random() * 10) + 88,
    technicalAccuracy: `${Math.floor(Math.random() * 8) + 90}%`,
    communicationClarity: `${Math.floor(Math.random() * 10) + 88}%`,
    feedback: 'Excellent response! Emphasized vector indexing, low latency, and human-in-the-loop validation.',
    suggestedKeywords: ['Streaming Latency', 'Vector Indexing', 'Human-in-the-loop', 'Circuit Breakers'],
  };

  res.json({
    success: true,
    engine: 'Interview AI Simulator v4.2',
    evaluation,
    tokensUsed: 3250,
    latencyMs: 410,
  });
});

// ADMIN PORTAL ENDPOINTS
app.get('/api/admin/metrics', (req, res) => {
  res.json({
    activeCandidates: 14280,
    activeEmployers: 1250,
    jobPosts: jobsStore.length,
    aiInterviewsConducted: 48920,
    aiEngineHealth: '99.98% Operational',
    totalTokensUsed: '142.8 M',
    avgLatencyMs: 280,
  });
});

app.get('/api/admin/users', (req, res) => {
  res.json({ users: adminUsersStore });
});

app.patch('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = adminUsersStore.find((u) => u.id === id);
  if (user && status) {
    user.status = status;
  }
  res.json({ message: 'User status updated', user });
});

app.get('/api/admin/moderation', (req, res) => {
  res.json({ queue: moderationQueueStore });
});

app.post('/api/admin/moderation/resolve', (req, res) => {
  const { id, action } = req.body;
  moderationQueueStore = moderationQueueStore.filter((item) => item.id !== id);
  res.json({ message: `Item ${action || 'resolved'}`, queue: moderationQueueStore });
});

app.get('/api/admin/ai-logs', (req, res) => {
  res.json({ logs: usageLogs });
});

app.listen(PORT, () => {
  console.log(`[CareerAI Backend Engine] Server running on port ${PORT}`);
});
