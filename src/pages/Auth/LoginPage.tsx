import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: user, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', data.user_id)
        .eq('password', data.password)
        .single();

      if (dbError || !user) {
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
      }

      if (user.status === '대기') {
        setError('관리자의 승인을 기다려주세요.');
        return;
      }
      if (user.status === '거절') {
        setError('가입이 거절된 계정입니다. 관리자에게 문의하세요.');
        return;
      }

      // 상태가 '일반회원' 또는 '관리자'인 경우 로그인 성공
      login({
        id: user.id,
        user_id: user.user_id,
        name: user.name,
        birthdate: user.birthdate,
        status: user.status
      });

      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-ace-light dark:bg-ace-dark">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ace-emerald mb-2 italic">ACE</h1>
          <p className="text-sm text-slate-500">축구팀 매니지먼트 시스템</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="아이디" placeholder="아이디 입력" icon={<CreditCard size={18} />} {...register('user_id')} required />
            <Input label="비밀번호" type="password" placeholder="비밀번호 입력" icon={<Lock size={18} />} {...register('password')} required />

            {error && <div className="text-sm text-rose-500 text-center bg-rose-50 p-2 rounded">{error}</div>}

            <Button type="submit" className="w-full mt-4" isLoading={isLoading}>로그인</Button>
          </form>

          <div className="mt-6 text-center text-sm">
            아직 계정이 없으신가요? <Link to="/signup" className="text-ace-emerald hover:underline">가입 신청</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
