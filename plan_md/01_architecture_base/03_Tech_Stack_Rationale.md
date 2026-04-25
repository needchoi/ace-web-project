# 03. Tech Stack & Rationale (기술 스택 및 선정 사유)

## 1. Frontend Stack
- **React (v19) & Vite**: 최신 컴포넌트 모델과 빠른 빌드 성능을 제공하여 쾌적한 사용성을 보장.
- **Routing**: `react-router-dom` (보호 라우트 및 가드 없이 개방형 라우팅 구조 적용)

## 2. Data & Backend Stack
- **Supabase (Database ONLY)**: 데이터 저장(PostgreSQL) 및 실시간 공용 CRUD API 전용.

## 3. 필수 라이브러리 및 도구 (Dependencies)
- **UI & Styling**:
  - `tailwindcss v4`: 최신 엔진을 사용하며, `@theme` 블록을 통한 테마 관리.
  - `lucide-react`, `framer-motion`: 아이콘 및 애니메이션 효과.
- **State & Logic**:
  - `@supabase/supabase-js`: 무인증(Public) 상태로 데이터베이스 CRUD 연동.
  - `@tanstack/react-query`: 서버 상태 관리 및 캐싱.
  - `zod`: 데이터 스키마 검증.
- **Authentication**:
  - *(사용하지 않음. 관련된 라이브러리 모두 배제)*
