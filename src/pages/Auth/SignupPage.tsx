import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { User, Lock, Calendar, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const signupSchema = z.object({
  user_id: z.string().min(4, '아이디는 4자 이상이어야 합니다.'),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
  passwordConfirm: z.string(),
  name: z.string().min(2, '이름을 정확히 입력해주세요.'),
  birthdate: z.string().min(1, '생년월일을 선택해주세요.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 아이디 중복 체크
      const { data: existingUser } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', data.user_id)
        .single();
        
      if (existingUser) {
        throw new Error('이미 사용 중인 아이디입니다.');
      }

      // 가입 신청 데이터 저장 (status는 DB default인 '대기'로 저장됨)
      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          user_id: data.user_id,
          password: data.password, // 실제 운영 시 해싱 필요
          name: data.name,
          birthdate: data.birthdate,
        }]);

      if (insertError) throw insertError;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || '가입 신청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-ace-light dark:bg-ace-dark">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold">가입 신청 완료</h2>
          <p className="text-slate-500">가입 신청이 성공적으로 접수되었습니다.<br/>관리자의 승인 후 로그인이 가능합니다.</p>
          <Button onClick={() => navigate('/login')} className="w-full">로그인 화면으로 이동</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-ace-light dark:bg-ace-dark">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ace-emerald mb-2">ACE 가입 신청</h1>
          <p className="text-sm text-slate-500">정보를 입력하고 가입을 신청해주세요.</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="아이디" placeholder="사용할 아이디 입력" icon={<CreditCard size={18} />} error={errors.user_id?.message} {...register('user_id')} />
            <Input label="비밀번호" type="password" placeholder="비밀번호 입력" icon={<Lock size={18} />} error={errors.password?.message} {...register('password')} />
            <Input label="비밀번호 확인" type="password" placeholder="비밀번호 재입력" icon={<Lock size={18} />} error={errors.passwordConfirm?.message} {...register('passwordConfirm')} />
            <Input label="이름" placeholder="실명 입력" icon={<User size={18} />} error={errors.name?.message} {...register('name')} />
            <Input label="생년월일" type="date" icon={<Calendar size={18} />} error={errors.birthdate?.message} {...register('birthdate')} />

            {error && <div className="text-sm text-rose-500 text-center bg-rose-50 p-2 rounded">{error}</div>}

            <Button type="submit" className="w-full mt-4" isLoading={isLoading}>가입 신청하기</Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            이미 계정이 있으신가요? <Link to="/login" className="text-ace-emerald hover:underline">로그인</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
