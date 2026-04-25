import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { LogOut, Sun, Moon, Shield, User as UserIcon, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardPage = () => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-ace-light dark:bg-ace-dark transition-colors duration-300">
      {/* Global Header */}
      <header className="sticky top-0 z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ace-emerald tracking-tight italic">ACE</h1>
        <div className="flex items-center gap-2">
          {user?.status === '관리자' && (
            <Link to="/admin" className="p-2 rounded-2xl bg-amber-50 text-amber-600 hover:bg-amber-100 mr-2 text-xs font-bold flex items-center gap-1">
              <Shield size={14} /> 관리자 메뉴
            </Link>
          )}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            onClick={logout}
            className="p-2 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-500 hover:text-rose-500 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-6 pt-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Welcome Profile */}
          <div className="flex items-center gap-4 px-2">
            <div className="w-16 h-16 rounded-3xl bg-ace-emerald/10 flex items-center justify-center text-ace-emerald">
              <UserIcon size={32} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">환영합니다!</p>
              <h2 className="text-xl font-bold dark:text-white">{user?.name}님</h2>
              <p className="text-[10px] text-slate-400">{user?.user_id}</p>
            </div>
          </div>

          <Card className="glass-card text-center py-16 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-ace-emerald/10">
               <Activity size={120} />
            </div>
            
            <div className="space-y-3 relative z-10">
              <h2 className="text-3xl font-black tracking-[0.2em] text-slate-900 dark:text-white uppercase">Ready to Play</h2>
              <div className="h-1 w-12 bg-ace-emerald mx-auto rounded-full" />
              <p className="text-sm text-slate-500 px-6 leading-relaxed">
                성공적으로 시스템에 접속했습니다.<br />경기 및 팀 정보를 확인할 수 있습니다.
              </p>
            </div>

            <div className="pt-4 px-8 relative z-10 flex justify-center">
               <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 text-center inline-block min-w-[120px]">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-bold text-ace-emerald">{user?.status}</p>
               </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};
