# 06. Security & Authentication (관리자 승인 기반 인증 전략)

## 1. 인증 정책 (Custom Auth & Approval)
- **Authentication**: Supabase Auth 대신 `public.users` 테이블의 아이디/비밀번호를 직접 대조하는 커스텀 인증 방식을 사용합니다.
- **Manual Approval Flow**: 모든 신규 가입자는 'PENDING' 상태로 생성되며, 관리자의 명시적인 승인이 있어야만 세션이 활성화됩니다.

## 2. 가입 및 로그인 프로세스
1.  **Signup**: 사용자가 아이디, 비밀번호, 이름, 생년월일을 입력하여 가입 신청.
2.  **Pending**: DB에 `status: 'PENDING'`으로 저장됨.
3.  **Admin Review**: 관리자가 관리자 페이지에서 신청자 명단 확인 후 '승인' 버튼 클릭.
4.  **Login**: 승인된(`ACTIVE`) 사용자만 아이디/비밀번호 대조를 통해 대시보드 진입 허용.

## 3. 보안 고려사항
- **Access Control**: 로그인 쿼리 성공 시 반드시 `status === 'ACTIVE'` 인지 확인하는 로직이 프런트엔드 가드에 포함되어야 함.
- **Admin Security**: 관리자 페이지는 `role === 'ADMIN'`인 계정만 접근 가능하도록 제한.
