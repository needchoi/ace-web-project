# 07. UI/UX Design System (디자인 시스템 - Base)

## 1. 디자인 철학: "Sonnet Clarity"
- **정갈함과 가독성**: 클로드 소넷 모델이 지향하는 충분한 여백과 명확한 정보 전달.
- **모바일 우선 (Mobile-First)**: 모든 UI 요소는 모바일 환경에서의 조작 편의성을 최우선으로 함.
- **심리적 편안함**: 자극적인 색상을 배제하고, 부드러운 톤과 곡선을 사용하여 장시간 사용에도 피로감이 없는 디자인.

## 2. 테마 시스템 (Dual Theme)
- **구현 방식**: Tailwind v4에 따라 `src/index.css`의 `@theme` 블록에 CSS 변수로 정의하여 관리.

### 2.1 라이트 모드 (Light Mode)
- **Primary**: #10B981 (Emerald 500)
- **Background**: #FFFFFF / Surface: #F8FAFC
- **Text**: #1E293B (Main), #64748B (Secondary)
- **Concept**: 깨끗하고 투명한 느낌의 정갈한 사무용 도구 스타일.

### 2.2 다크 모드 (Dark Mode)
- **Primary**: #10B981 (Emerald 500)
- **Background**: #0F172A (Deep Navy) / Surface: #1E293B
- **Text**: #F8FAFC (Main), #94A3B8 (Secondary)
- **Concept**: 깊이감 있고 세련된 전술 분석 도구 스타일.

## 3. 모바일 레이아웃 규칙
- **Grid**: 모바일 4컬럼 / 데스크톱 12컬럼 시스템.
- **Spacing**: 4px 단위의 증분 시스템 (4, 8, 12, 16, 24, 32...).
- **Radius**: 부드러운 인상을 위한 `Rounded-2xl` (16px) 표준 적용.

## 4. 타이포그래피 (Mobile Optimized)
- **Font Family**: Inter, sans-serif (가변 폰트 활용).
- **Scale**: 모바일 가독성을 위해 본문 최소 크기를 15px~16px로 유지.
- **Line Height**: 텍스트 뭉침 방지를 위해 1.6 이상 확보.

## 5. 인터랙션 가이드
- **Touch Targets**: 모든 클릭 요소는 최소 44x44px 영역 확보.
- **Feedback**: 터치 시 미세한 햅틱 효과(애니메이션)와 컬러 변화로 피드백 제공.
