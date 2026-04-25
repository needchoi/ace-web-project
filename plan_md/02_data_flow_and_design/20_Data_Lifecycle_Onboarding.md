# 20. Data Lifecycle: Onboarding Flow (최종본)

## 1. 개요
인증과 데이터 동기화 안정성을 위해 **Server-side Automation(Trigger)** 기반의 데이터 흐름을 정의합니다.

## 2. 데이터 흐름 (Data Architecture)
1. **Frontend**: 사용자가 가입 정보(Email, PW, Name, Birthdate) 입력.
2. **Auth Call**: `supabase.auth.signUp()` 호출 시 `options.data`에 Name과 Birthdate를 메타데이터로 포함하여 전송.
3. **Database Trigger**: `auth.users`에 레코드가 생성되는 즉시 `public.handle_new_user()` 함수가 실행되어 `public.users`에 프로필 자동 생성.
4. **Consistency**: 이 방식을 통해 외래 키 제약 조건(Foreign Key Error)을 원천 차단하고 데이터 무결성 보장.

## 3. 예외 처리
- **Duplicate ID**: 가입 시도 중 통신 에러로 재시도 시 `ON CONFLICT DO NOTHING` 로직이 중복 에러 방지.
- **Metadata Fallback**: 가입 정보 누락 시 `COALESCE` 함수를 통해 기본값(예: 1987-01-01) 자동 부여.
