# 11. Supabase Operational Strategy (순수 DB 운영 전략)

## 1. 운영 범위 (Database Only)
- 본 프로젝트에서 Supabase는 **순수 PostgreSQL 데이터베이스** 역할만 수행합니다.
- **Excluded Features**: Supabase Auth, Supabase Edge Functions(인증용), Supabase Storage(인증 연동)는 사용하지 않습니다.

## 2. 데이터 관리 전략
- **No-Auth Tables**: `public` 스키마의 모든 테이블은 구글 인증 정보와 논리적으로 연결됩니다.
- **Realtime Sync**: 경기 결과 및 팀 공지사항의 실시간 동기화에 집중합니다.
- **Backup**: 데이터베이스 레벨의 정기 백업을 통해 비즈니스 데이터의 안전성을 확보합니다.
