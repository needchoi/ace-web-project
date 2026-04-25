# 22. Frontend Component Architecture (프런트엔드 컴포넌트 아키텍처)

## 1. 컴포넌트 계층 구조 (Layered Structure)
데이터의 단방향 흐름과 재사용성을 극대화하기 위해 다음과 같이 계층을 분리합니다.

### 1.1 Layout Components (틀)
- `MainLayout`: 전체 테마(Dark/Light) 상태를 관리하는 컨테이너.
- `MobileBottomNav`: 모바일 웹에서 엄지손가락으로 조작 가능한 하단 고정 탭 바.
- `Header`: 상단 로고 및 테마 토글 버튼 배치.

### 1.2 View Components (페이지)
- `DashboardPage`, `OnboardingPage`, `PlayerDetailPage`: 특정 경로(Route)에 대응하며, 필요한 데이터를 패칭(Fetching)하고 하위로 전달.

### 1.3 Container Components (로직)
- `PitchMapContainer`, `AttributeFormContainer`: 비즈니스 로직(데이터 가공, API 호출)을 담당.

### 1.4 Presentational Components (UI)
- `PlayerCard`, `StatBar`, `PositionBadge`: 순수하게 Props를 받아 UI만 렌더링 (Atomic Design 지향).

## 2. 상태 관리 전략 (State Management)
- **Theme State**: `Context API`를 통해 사용자의 테마 선택(Light/Dark)을 전역 관리하며, `localStorage`와 연동하여 유지.
- **Server State**: `TanStack Query` (React Query) - 캐싱, 로딩 처리, 자동 리패칭 담당.
- **Form State**: `React Hook Form` - 온보딩 및 프로필 수정 시 입력값 제어 및 유효성 검증.

## 3. 디자인 시스템 연동 (Mobile-First)
- **Tailwind System**: 기본 스타일은 모바일 사이즈를 기준으로 작성하며, 데스크톱은 `md:` 접두사를 활용해 보조적으로 지원.
- **Theme Variables**: CSS 변수(`--bg-primary`, `--text-main`)를 테마별로 정의하여 실시간 전환 지원.
- **Glassmorphism**: 소넷 스타일의 부드러운 카드 디자인을 위해 `backdrop-blur`와 `bg-opacity` 최적화.
