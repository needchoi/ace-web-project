# 09. Testing & Quality Assurance (테스트 및 품질 관리)

## 1. 테스트 전략
- **Unit Testing**: 개별 함수 및 컴포넌트 로직 검증 (Vitest / Jest).
- **Integration Testing**: API 엔드포인트와 데이터 접근 계층 간의 상호작용 검증.
- **E2E Testing**: 실제 사용자 시나리오 기반 전체 흐름 검증 (Playwright).

## 2. 코드 품질 관리
- **Static Analysis**: ESLint (Airbnb Rule 기반) 및 Prettier 적용.
- **Type Checking**: 빌드 전 `tsc`를 통한 정적 타입 검사 강제.
- **Code Review**: 모든 Merge Request는 최소 1인 이상의 승인을 거침.

## 3. 사용자 수용 테스트 (UAT)
- **Beta Testing**: 소수 인원을 대상으로 실제 팀 데이터를 입력받아 사용성 피드백 수집.
- **Bug Report System**: 사용자가 쉽게 버그를 제보할 수 있는 채널 마련.

## 4. 운영 가시성 (Observability & Monitoring)
- **Error Tracking**: `Sentry` 연동을 통해 사용자 기기에서 발생하는 런타임 에러 실시간 수집 및 알림.
- **Logging Architecture**: 중요 비즈니스 이벤트 발생 시 서버 로그 및 DB 감사 로그 동시 기록.
- **Real-time Status**: Supabase 대시보드를 활용한 DB 부하 및 API 응답 속도 상시 모니터링.

## 5. 성능 목표
- **Lighthouse Score**: 모든 항목(Performance, Accessibility, Best Practices, SEO) 90점 이상 유지.
- **API Response Time**: 평균 200ms 이내 응답 지향.
