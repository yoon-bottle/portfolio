# 이윤병 · Data Scientist Portfolio

`https://yoon-bottle.github.io/portfolio/` 배포를 위한 정적 포트폴리오입니다.
프로젝트별 문제 정의, 수행 내용, 결과를 정리합니다.

## 로컬에서 보기

Node.js 22 이상과 Python 3가 필요합니다.

```sh
npm ci
npm run preview
```

브라우저에서 `http://localhost:4321`을 엽니다.

## 프로젝트별로 글 쓰기

`content/projects/`의 Markdown 파일 하나가 상세 페이지 하나입니다.
기존 파일을 복사한 뒤 파일명과 상단 정보를 수정하면 홈과 상세 페이지가 자동으로 생성됩니다.

```yaml
---
title: "Project Name"
category: "Predictive modeling"
period: "2026.01–2026.03"
role: "내가 맡은 일"
status: "운영 중"
tags: ["Python", "SQL"]
order: 9
summary: "프로젝트가 해결한 문제를 한 문장으로 설명합니다."
---
```

본문의 `##` 제목은 상세 페이지의 목차로 자동 연결됩니다.
본문 순서: 정의 → 내용 → 결과.
이미지는 `assets/`에 저장하고 `![설명](/assets/파일명.png)`으로 넣습니다.
표와 코드 블록도 사용할 수 있습니다. 사내 URL이나 원본 데이터는 넣지 않습니다.

## 빌드와 확인

```sh
npm run build
npm run check
```

`docs/`는 자동 생성 결과입니다. 이 폴더의 파일을 직접 고치지 않습니다.
현재는 모든 Markdown 파일이 빌드에 포함됩니다. 비공개 메모는 이 저장소에 추가하지 않습니다.

## GitHub Pages

저장소 이름: `portfolio`
배포 소스: `main` 브랜치의 `/docs` 폴더. `.nojekyll` 파일이 함께 생성됩니다.
내용 변경 후 빌드와 확인을 마치고 `docs/`도 함께 커밋·푸시하면 Pages가 갱신됩니다.
Markdown 원문과 Git 이력도 공개되므로 비공개 참고 자료와 원본 데이터는 저장소 밖에서 관리합니다.

## 편집 파일

- `content/projects/*.md`: 프로젝트별 상세 글
- `scripts/build.mjs`: 홈 소개, 공통 헤더·푸터, HTML 생성
- `assets/style.css`: 레이아웃, 글꼴, 색상

현재 PDF 이력서 다운로드는 연결하지 않았습니다. 공개할 PDF가 확정되면 `assets/`에 추가하고 링크를 연결합니다.
