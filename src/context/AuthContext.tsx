import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CustomUser {
  id: string;
  user_id: string;
  name: string;
  birthdate: string;
  status: '대기' | '일반회원' | '관리자' | '거절';
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  login: (userData: CustomUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ace_custom_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Session parse error', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: CustomUser) => {
    setUser(userData);
    localStorage.setItem('ace_custom_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ace_custom_session');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
