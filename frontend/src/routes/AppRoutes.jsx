import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import App from '../App';
import { ROUTES } from '../constants/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      
      {/* Dynamic Portal Subroutes */}
      <Route path="/candidate/*" element={<App />} />
      <Route path="/employer/*" element={<App />} />
      <Route path="/admin/*" element={<App />} />
      
      {/* Fallback wildcard redirect */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
