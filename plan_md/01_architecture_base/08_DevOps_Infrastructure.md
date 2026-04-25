# 08. DevOps & Infrastructure (운영 및 인프라 전략)

## 1. CI/CD 파이프라인 (GitHub 중심)
- **Repository**: `https://github.com/needchoi/ace-web-project`
- **Workflow**: 
  1. `feat/*` 브랜치 작업 후 `main` 브랜치로 Pull Request 생성.
  2. GitHub Actions에서 `Linter`, `Type Check`, `Unit Test` 자동 실행.
  3. 모든 테스트 통과 시 `main` 브랜치 머지 및 운영 서버(Vercel/Heroku) 자동 배포.

## 2. 환경 변수 및 비밀 정보 관리
- **Supabase Credentials**: 
  - `NEXT_PUBLIC_SUPABASE_URL`: 상용 URL 연동.
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: 공개 키 관리.
  - `SUPABASE_SERVICE_ROLE_KEY`: 서버 단 전용 비밀 키 (Vercel Secrets에 저장).
- **Environment Separation**: `.env.production`을 통해 개발 환경과 운영 환경을 엄격히 분리.

## 3. 운영 품질 관리 (Quality Assurance)
- **Database Reliability**: Supabase의 PITR(Point-in-Time Recovery) 기능을 활용하여 데이터 유실 방지.
- **Performance Budget**: 메인 대시보드 로딩 시간 1.5초 이내 유지.
- **Availability**: 99.9% 가동률 목표. Supabase Health Status 모니터링 연동.

## 4. 비용 최적화 및 자원 제한 (Cost Control)
- **Image Optimization**: 업로드되는 모든 선수 사진은 클라이언트 단에서 리사이징 후 Supabase Storage에 업로드하여 용량 절감.
- **Rate Limiting**: 특정 IP에서의 초당 요청 수를 제한하여 불필요한 API 호출 및 비용 발생 방지.
- **Inactivity Policy**: Supabase 무료 티어 휴면 방지를 위한 주 1회 상태 체크 자동화.

## 5. 배포 시 안정성 확보 (Deployment Safety)
- **Preview Deployments**: PR 생성 시 별도의 프리뷰 도메인에 자동 배포하여 실환경 테스트 수행.
- **Rollback Strategy**: 배포 실패 시 즉각적으로 이전 안정 버전으로 롤백(Vercel Rollback 기능 활용).
