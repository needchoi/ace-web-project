# 24. State Persistence & Recovery (상태 보존 및 복구 전략)

## 1. 개요
브라우저 새로고침, 창 닫기, 네트워크 오류 등 비정상적인 상황에서도 사용자의 작업 흐름이 끊기지 않도록 하는 설계입니다.

## 2. 보존 전략 (Persistence Strategy)
- **Onboarding Progress**: 진행 중인 단계(Step 1~4)와 입력값은 `sessionStorage`에 실시간으로 저장.
- **Authentication**: Supabase Auth가 관리하는 JWT 토큰은 `localStorage`에 자동 보존되어 세션 유지.
- **User Preferences**: 다크 모드 설정, 대시보드 레이아웃 커스텀 정보는 DB의 `user_settings` 필드에 동기화.

## 3. 장애 복구 시나리오 (Recovery Flow)
1. **새로고침 시**: 
   - 앱 구동 초기화 과정에서 `sessionStorage`를 체크하여 온보딩 도중이었다면 해당 단계로 즉시 복원.
2. **네트워크 재연결 시**: 
   - `window.addEventListener('online')` 이벤트를 감지하여 서버와 로컬 상태의 정합성 자동 체크.
3. **API 에러 시**: 
   - 전술 변경 등 중요 액션 실패 시 팝업을 통해 "다시 시도" 또는 "로컬에 저장된 버전으로 복구" 옵션 제공.

## 4. 데이터 클렌징
- 온보딩 완료 시 `sessionStorage`에 남아있는 모든 임시 데이터 삭제.
- 보안을 위해 로그아웃 시 모든 로컬/세션 스토리지 초기화.
