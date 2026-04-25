# 12. Database Schema SQL (관리자 승인 체제)

## 1. Users Table (사용자 관리용)
아래 쿼리를 Supabase SQL Editor에서 실행하여 테이블을 생성하십시오.

```sql
-- 사용자 테이블 생성
CREATE TABLE public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,          -- 로그인 아이디
  password TEXT NOT NULL,                -- 비밀번호 (암호화 권장)
  name TEXT NOT NULL,                    -- 이름
  birthdate DATE NOT NULL,               -- 생년월일
  status TEXT DEFAULT 'PENDING',         -- 상태: 'PENDING', 'ACTIVE', 'REJECTED'
  role TEXT DEFAULT 'PLAYER',            -- 권한: 'ADMIN', 'STAFF', 'PLAYER'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 초기 관리자 계정 생성 (선택 사항)
-- 아이디: admin / 비밀번호: admin123 (예시)
INSERT INTO public.users (user_id, password, name, birthdate, status, role)
VALUES ('admin', 'admin123', '최고관리자', '1990-01-01', 'ACTIVE', 'ADMIN');
```

## 2. 상태 관리 원칙
- **PENDING (대기)**: 가입 신청 직후 기본값. 로그인 불가능.
- **ACTIVE (승인)**: 관리자 승인 후 상태. 로그인 및 서비스 이용 가능.
- **REJECTED (거절)**: 가입 거절 상태. 로그인 불가능.
