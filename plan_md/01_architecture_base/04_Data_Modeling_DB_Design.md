# 04. Data Modeling & Database Design (관리자 승인형 모델링)

## 1. 개요
사용자 권한과 상태를 엄격히 분리하여, 인증된 사용자 중에서도 승인된 인원만 데이터에 접근할 수 있도록 설계합니다.

## 2. 주요 엔티티
### 2.1 Users (사용자 정보 및 인증 상태)
- `user_id`: 로그인 식별자 (Unique)
- `password`: 비밀번호
- `name`: 실명
- `birthdate`: 생년월일
- `status`: 가입 상태 (PENDING, ACTIVE, REJECTED)
- `role`: 시스템 권한 (ADMIN, PLAYER)

## 3. 데이터 흐름
- **가입**: Frontend -> DB (INSERT with PENDING)
- **승인**: Admin Frontend -> DB (UPDATE status to ACTIVE)
- **로그인**: Frontend -> DB (SELECT where user_id & password & status=ACTIVE)
