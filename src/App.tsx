import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Auth/LoginPage';
import { SignupPage } from './pages/Auth/SignupPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { useAuth } from './context/AuthContext';

// Protected Route for Authenticated Users ('일반회원' or '관리자')
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.status === '대기' || user.status === '거절') return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};

// Admin Guard ('관리자' only)
const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user || user.status !== '관리자') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Guest Only Guard (로그인 안 한 사용자만 접근 가능)
const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (user && (user.status === '일반회원' || user.status === '관리자')) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<GuestGuard><LoginPage /></GuestGuard>} />
        <Route path="/signup" element={<GuestGuard><SignupPage /></GuestGuard>} />

        {/* Protected Routes */}
        <Route path="/" element={<AuthGuard><DashboardPage /></AuthGuard>} />
        
        {/* Admin Route */}
        <Route path="/admin" element={<AdminGuard><AdminPage /></AdminGuard>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
