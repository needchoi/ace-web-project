# 02. System Architecture (시스템 아키텍처)

## 1. 전체 아키텍처 모델
본 시스템은 **Cloud-Native 3-Tier Architecture**를 채택하여 높은 가용성과 확장성을 보장합니다.

### 1.1 Presentation Layer (Frontend)
- **Vercel Deployment**: GitHub 연동 자동 배포.
- **Mobile Web Optimization**: PWA(Progressive Web App) 기술 적용을 지향함. (현재 Vite 8 호환성 검토 중으로, 초기 버전에서는 모바일 브라우저 최적화 우선 적용).
- **Supabase Client SDK**: 실시간 데이터 동기화.

### 1.2 Application Layer (Backend)
- **Express API Proxy**: 복잡한 트랜잭션, 타 서비스 연동, 관리자 전용 로직 등 비즈니스 로직의 중앙 제어 역할을 수행합니다.
- **Serverless Functions**: 필요에 따라 Supabase Edge Functions를 활용하여 확장성 있는 로직 처리를 지원합니다.

### 1.3 Data Layer (Supabase)
- **PostgreSQL**: 관계형 데이터를 저장하는 핵심 DB.
- **Supabase Auth**: JWT 기반의 사용자 인증 및 RBAC 권한 관리.
- **Supabase Storage**: 선수 이미지 및 리포트 파일 저장.

## 2. 데이터 흐름 (Data Flow)
1. **Request**: 사용자가 UI를 통해 요청.
2. **Auth**: Supabase Auth를 통해 클라이언트 단에서 즉각적인 세션 확인.
3. **API Call**: 쓰기 작업이나 복잡한 조회는 Express 서버(Proxy)를 통해 수행.
4. **DB Operation**: Supabase PostgreSQL과 통신하여 데이터 처리.
5. **Real-time Update**: DB 변경 시 클라이언트에 실시간으로 데이터 변경 사항 전파 (Real-time).

## 3. 운영 환경 최적화
- **Global CDN**: 정적 자산은 글로벌 서버에 분산되어 지연 시간 최소화.
- **Database Indexing**: Supabase(PostgreSQL)의 인덱싱 기능을 활용하여 검색 성능 최적화.
- **Connection Pooling**: 다수의 동시 접속 처리를 위한 연결 풀링 관리.
