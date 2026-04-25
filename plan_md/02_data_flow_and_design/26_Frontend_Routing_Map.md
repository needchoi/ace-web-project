# 26. Frontend Routing Map (프런트엔드 라우팅 맵)

## 1. 라우팅 정의
애플리케이션의 URL 구조와 각 페이지별 접근 권한을 정의합니다.

| Path | Component | Auth Required | Admin Only | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/login` | `LoginPage` | No | No | 로그인 화면 (이메일 기반) |
| `/signup` | `SignupPage` | No | No | 회원가입 화면 |
| `/` | `DashboardPage` | Yes | No | 메인 대시보드 (Coming Soon) |
| `/admin` | `AdminPage` | Yes | Yes | 가입 신청자 승인 및 관리 |
| `/reset-password` | `ResetPasswordPage` | No | No | 비밀번호 재설정 페이지 |

## 2. 접근 가드 (Route Guards)
- **Guest Only**: 로그인한 사용자가 `/login` 또는 `/signup` 접근 시 `/`로 리다이렉트.
- **Auth Required**: 비로그인 사용자가 보호된 경로 접근 시 `/login`으로 리다이렉트.
- **Admin Only**: `user.role !== 'ADMIN'` 인 사용자가 `/admin` 접근 시 `/`로 리다이렉트.
