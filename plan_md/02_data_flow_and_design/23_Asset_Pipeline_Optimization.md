# 23. Asset Pipeline & Optimization (자산 파이프라인 최적화)

## 1. 미디어 자산 관리 목표
비용 절감과 로딩 속도 향상을 위해 이미지 처리를 자동화합니다.

## 2. 이미지 업로드 흐름 (Upload Pipeline)
1. **Client-side Compression**: 
   - 사용자가 이미지를 선택하면 `browser-image-compression` 라이브러리를 통해 최대 800px 너비, 0.7 품질의 WebP 형식으로 압축.
2. **Supabase Storage Upload**: 
   - 압축된 파일을 `player_avatars/` 또는 `team_logos/` 경로에 저장.
   - 파일명은 `user_id_timestamp.webp` 형식을 사용하여 중복 방지 및 캐싱 최적화.

## 3. 이미지 렌더링 최적화
- **Lazy Loading**: 리스트 화면의 선수 사진은 뷰포트에 들어올 때 로드.
- **Placeholder**: 이미지 로딩 전까지 선수의 포지션 컬러를 배경으로 한 스켈레톤(Skeleton) 표시.
- **CDN Caching**: Supabase Storage에서 제공하는 공용 URL과 브라우저 캐시 컨트롤 헤더 활용.

## 4. 정적 자산(Static Assets) 관리
- 아이콘은 `Lucide React`와 같은 SVG 기반 라이브러리를 사용하여 번들 크기 최소화.
- 폰트는 가급적 시스템 폰트를 우선하되, 웹폰트 사용 시 `woff2` 형식을 사용하여 전송량 절감.
