# Test 04. Data Modeling & DB Integrity Test

## 1. 테스트 목적
- 사용자, 선수 프로필, 감사 로그 테이블의 스키마 및 제약 조건 검증.

## 2. 테스트 시나리오
| ID | 테스트 항목 | 기대 결과 | 통과 여부 |
| :--- | :--- | :--- | :--- |
| DB-01 | 이메일 중복 방지 | 동일한 이메일로 가입 시 DB 수준에서 에러가 발생함 | |
| DB-02 | 감사 로그 생성 | 로그인 성공 시 `audit_logs` 테이블에 레코드가 즉시 생성됨 | |
| DB-03 | RLS 정책 적용 | 인증되지 않은 사용자가 `users` 테이블 직접 조회 시 차단됨 | |

## 3. 검증 쿼리
- `SELECT * FROM public.users WHERE email = 'test@example.com';`
- `SELECT * FROM public.audit_logs ORDER BY created_at DESC LIMIT 1;`
