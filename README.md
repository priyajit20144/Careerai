# CareerAI Full-Stack SaaS Platform Monorepo

Welcome to the **CareerAI** monorepo workspace. This project is structured as a professional, scalable full-stack web application with distinct `frontend` and `backend` modules.

---

## 📁 Repository Structure

```
sourav/
├── frontend/             # React 19 + Vite + Tailwind CSS v4 SPA
│   ├── src/
│   │   ├── api/          # API Service Client Scaffold
│   │   ├── components/   # Portals, Modals, Navbar
│   │   ├── config/       # App Configuration
│   │   ├── constants/    # Route paths enum & Navigation
│   │   ├── context/      # React Context Store (DataContext)
│   │   ├── data/         # Mock Datasets
│   │   ├── pages/        # Landing Page, Auth Pages
│   │   ├── routes/       # React Router Configuration
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/              # Node.js + Express REST API Server
│   ├── src/
│   │   └── server.js     # Express server entry point (Port 5000)
│   ├── .env.example
│   └── package.json
├── package.json          # Root Monorepo Workspace Orchestration
└── README.md             # Platform Documentation
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
# Install all dependencies across workspaces
npm install
```

### 2. Running Frontend & Backend

```bash
# Start Frontend Dev Server (Vite)
npm run dev:frontend

# Start Backend API Engine (Express)
npm run dev:backend
```

### 3. Production Build & Linting
```bash
# Build Frontend bundle
npm run build

# Run Oxlint
npm run lint
```
# Careerai
