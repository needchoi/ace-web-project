# Test 02. System Architecture Verification

## 1. 테스트 목적
- Supabase 클라우드 데이터베이스 연동 및 PWA 설정이 설계대로 구현되었는지 확인.

## 2. 테스트 시나리오
| ID | 테스트 항목 | 기대 결과 | 통과 여부 |
| :--- | :--- | :--- | :--- |
| ARCH-01 | Supabase 연결 | .env 설정 후 Supabase 클라이언트가 정상 초기화됨 | |
| ARCH-02 | PWA 구동 확인 | 브라우저 개발자 도구의 Application 탭에서 Service Worker가 활성화됨 | |
| ARCH-03 | Edge Function 호출 | 특정 비즈니스 로직 호출 시 서버리스 함수가 정상 응답함 | |

## 3. 검증 환경
- 환경: 모바일 웹 브라우저 (Chrome/Safari)
- 데이터베이스: Supabase PostgreSQL
