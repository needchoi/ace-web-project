# ACE Football Manager - 시스템 설계서 (v1.0)

## 1. 프로젝트 개요
본 프로젝트는 축구팀 운영을 위한 통합 매니지먼트 시스템입니다. 선수 관리, 전술 수립, 경기 데이터 분석 및 팀원 간 소통을 지원하는 웹 플랫폼을 구축합니다.

## 2. 기술 스택 (Tech Stack)
### 2.1 Frontend
- **Framework**: React (TypeScript)
- **Bundler**: Vite
- **Styling**: TailwindCSS / Framer Motion (애니메이션)
- **State Management**: React Context API / TanStack Query (Server State)

### 2.2 Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Token) + Bcrypt.js (비밀번호 암호화)

### 2.3 Database & Storage
- **Phase 1 (Development)**: Local JSON Files / SQLite (경량화)
- **Phase 2 (Production)**: Supabase (PostgreSQL) + AWS S3 (이미지/파일)

## 3. 시스템 아키텍처
### 3.1 레이어 구조
1. **Presentation Layer**: React 기반 UI 컴포넌트
2. **API Layer**: RESTful API 엔드포인트 (Express)
3. **Service Layer**: 비즈니스 로직 및 데이터 가공
4. **Data Access Layer**: 파일 시스템 또는 DB 접근 추상화 (Repository Pattern)

### 3.2 데이터 모델 (Core Models)
- **User (사용자)**: ID, Email, Password(Hashed), Name, Role (Admin/Staff/Player), Status (Pending/Active)
- **Player Profile (선수 프로필)**: User ID 연동, 포지션, 능력치(Technical/Mental/Physical), 부상 상태
- **Team (팀)**: 팀명, 로고, 소속 선수 목록, 전술 정보
- **Match (경기)**: 일정, 결과, 상대 팀, 출전 명단, 경기 리포트

## 4. 보안 전략
1. **Password Security**: 모든 비밀번호는 `bcryptjs`를 사용하여 솔트(Salt)와 함께 해싱 저장.
2. **Access Control**: JWT를 통한 세션 관리. 권한(Role)에 따른 API 접근 제한.
3. **Data Integrity**: 입력 값 검증(Validation) 라이브러리(zod) 도입.

## 5. 개발 로드맵
### Phase 1: 기반 구축 (현재 단계)
- 프로젝트 초기화 및 기본 폴더 구조 설정
- 설계서 및 문서화 작업 (`plan_md`)
- 사용자 인증(회원가입/로그인) 기본 로직 구현 (암호화 적용)

### Phase 2: 선수 온보딩 & 대시보드
- 챗봇 형태의 선수 데이터 입력 인터페이스
- 선수 포지션 및 능력치 시각화 (Pitch Map)
- 기본 대시보드 레이아웃

### Phase 3: 팀 관리 기능
- 선수 목록 필터링 및 검색
- 전술 보드 기능
- 경기 일정 관리

### Phase 4: 배포 및 최적화
- 데이터베이스 마이그레이션 (Local -> Cloud)
- 성능 최적화 및 최종 배포 (Vercel/Heroku)
