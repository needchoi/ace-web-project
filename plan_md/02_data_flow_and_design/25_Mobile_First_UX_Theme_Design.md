# 25. Mobile-First UX & Theme Design (Claude Sonnet Style)

## 1. 디자인 컨셉: "Claude Sonnet Clarity"
앤스로픽의 클로드(Claude) UI가 주는 **차분하고 지적인 분위기**를 재현합니다. 인위적인 화려함보다는 도구로서의 본질(데이터 전달)에 집중하며, 사용자에게 심리적 안정감을 주는 디자인을 지향합니다. 사용자가 모바일에서 장시간 사용해도 피로감이 없는 '편안한 디자인'을 최우선으로 합니다.

## 2. 모바일 특화 UX (Thumb-friendly Design)
- **하단 네비게이션**: 한 손 조작이 가능하도록 주요 메뉴(홈, 선수, 전술, 설정)를 하단 탭 바에 배치.
- **터치 타겟**: 모든 버튼과 링크의 최소 클릭 영역을 44x44px 이상으로 설정.
- **스와이프 인터랙션**: 탭 전환이나 리스트 항목 삭제 시 자연스러운 스와이프 제스처 지원.

## 3. 듀얼 테마 가이드 (Light & Dark)

### 3.1 Light Mode (Claude White)
- **Base**: #FFFFFF (순백색보다는 부드러운 화이트)
- **Surface**: #F8FAFC (연한 그레이 블루로 섹션 구분)
- **Text**: #1E293B (Main), #64748B (Secondary)
- **Border**: #E2E8F0 (아주 연한 선으로 카드 구분)

### 3.2 Dark Mode (Claude Dark)
- **Base**: #0F172A (깊이감 있는 다크 네이비)
- **Surface**: #1E293B (카드 및 컨테이너)
- **Text**: #F8FAFC (부드러운 화이트)
- **Accent**: Emerald 500 (#10B981) - 포인트 요소에만 사용.

## 4. 시각적 디테일 (Claude-like Elements)
- **Soft Card Architecture**: 정보를 담는 카드는 배경색과 미세한 차이를 두어 구분하며, 아주 얇은 테두리(Border 1px)를 사용하여 정갈함을 유지.
- **Micro-Interactions**: 버튼 클릭이나 탭 전환 시 과한 효과 대신 부드럽고 절제된 페이드(Fade)와 슬라이드(Slide)만 사용.
- **Typography**: 
  - 제목은 Semi-bold로 명확하게, 본문은 Regular로 가독성 중심.
  - 행간(Line-height)을 1.6 이상으로 설정하여 클로드 대화창과 같은 편안한 가독성 확보.
- **Rounded Corners**: 모든 카드와 버튼에 넉넉한 곡률(16px 이상)을 적용하여 부드러운 인상 부여.

## 5. 품질 관리 지표 (UX Quality)
- **FCP (First Contentful Paint)**: 모바일 네트워크 환경을 고려하여 1초 이내 렌더링 목표.
- **Layout Shift (CLS)**: 이미지 로딩 중에도 레이아웃이 흔들리지 않도록 고정 영역(Aspect Ratio) 확보.
