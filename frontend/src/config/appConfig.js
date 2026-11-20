export const APP_CONFIG = {
  name: 'CareerAI',
  version: '1.0.0-phase1',
  description: 'AI-Powered Career Intelligence & Hiring Platform',
  supportEmail: 'support@careerai.com',
  roles: {
    CANDIDATE: 'candidate',
    EMPLOYER: 'employer',
    ADMIN: 'admin',
  },
  defaultModules: {
    candidate: 'resume',
    employer: 'jobs',
    admin: 'analytics',
  },
};
