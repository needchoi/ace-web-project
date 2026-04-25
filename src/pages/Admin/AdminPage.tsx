import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UserCheck, UserX, Clock, ShieldCheck, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PendingUser {
  id: string;
  user_id: string;
  name: string;
  birthdate: string;
  created_at: string;
}

export const AdminPage = () => {
  useAuth(); // ensure context is loaded
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPendingUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('status', '대기')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPendingUsers(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPendingUsers();
  }, []);

  const handleStatusChange = async (userId: string, newStatus: '일반회원' | '거절') => {
    setActionLoading(userId);
    try {
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Status update failed:', err);
      alert('상태 변경 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-ace-light dark:bg-ace-dark p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-ace-emerald/10 flex items-center justify-center text-ace-emerald shadow-sm">
                <ShieldCheck size={28} />
             </div>
             <div>
                <h1 className="text-xl font-bold dark:text-white">관리자 페이지</h1>
                <p className="text-xs text-slate-500 font-medium">가입 신청 및 회원 관리</p>
             </div>
          </div>
        </header>

        <Card className="flex items-center justify-between py-4 px-6 border-ace-emerald/20 bg-ace-emerald/5">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">승인 대기 중</span>
          <span className="text-3xl font-black text-ace-emerald">{pendingUsers.length}</span>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">가입 대기 명단</h2>
            <button onClick={fetchPendingUsers} className="text-[10px] font-bold text-ace-emerald hover:underline">새로고침</button>
          </div>
          
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="py-20 text-center text-slate-400 animate-pulse text-xs">데이터를 불러오는 중입니다...</div>
            ) : pendingUsers.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="text-center py-16 space-y-4 border-dashed opacity-60">
                   <div className="flex justify-center text-slate-300">
                      <Clock size={48} />
                   </div>
                   <div className="space-y-1">
                      <p className="text-sm font-bold dark:text-slate-400">대기 중인 회원이 없습니다.</p>
                   </div>
                </Card>
              </motion.div>
            ) : (
              pendingUsers.map((applicant) => (
                <motion.div key={applicant.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: -20 }}>
                  <Card className="space-y-5 overflow-hidden relative">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg dark:text-white">{applicant.name}</h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                           {new Date(applicant.created_at).toLocaleString()} 신청
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100">
                         대기
                      </div>
                    </div>

                    <div className="space-y-2.5 py-2">
                       <div className="flex items-center gap-3 text-[13px] text-slate-600 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                          <User size={14} className="text-slate-400" />
                          <span className="font-mono">{applicant.user_id}</span>
                       </div>
                       <div className="flex items-center gap-3 text-[13px] text-slate-600 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                          <Calendar size={14} className="text-slate-400" />
                          <span>{applicant.birthdate}</span>
                       </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 py-3 text-xs border-rose-200 text-rose-500 hover:bg-rose-50"
                        onClick={() => handleStatusChange(applicant.id, '거절')}
                        isLoading={actionLoading === applicant.id}
                      >
                        <UserX size={18} className="mr-2" /> 가입 거절
                      </Button>
                      <Button 
                        className="flex-1 py-3 text-xs"
                        onClick={() => handleStatusChange(applicant.id, '일반회원')}
                        isLoading={actionLoading === applicant.id}
                      >
                        <UserCheck size={18} className="mr-2" /> 승인하기
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
