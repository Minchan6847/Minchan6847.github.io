# Minchan6847.github.io

[English](README.md) | **한국어**

디지털 회로설계 엔지니어 김민찬의 이력서 겸 포트폴리오 사이트입니다.
주소: <https://minchan6847.github.io/#ko>

## 사이트 구성

HTML, CSS, JavaScript만으로 만들었습니다. build 단계가 없으며, GitHub Pages가 `main`의 파일을 그대로 제공합니다.

| 파일 | 내용 |
|---|---|
| `index.html` | 페이지의 틀. font, stylesheet, script 2개를 불러옵니다. |
| `assets/content.js` | 사이트의 모든 문구. 각 문자열을 `L("English", "한국어")` 형태로 적습니다. |
| `assets/app.js` | `content.js`로 페이지를 그리고 화면 이동을 처리합니다. |
| `assets/style.css` | 색, 글꼴, layout. light와 dark theme을 지원합니다. |
| `docs/` | 프로젝트 페이지에서 연결하는 보고서(PDF) |

## 수정 방법

- 문구를 바꾸려면 `assets/content.js`만 수정합니다.
- 프로젝트를 추가하려면 `assets/content.js`의 `projects`에 항목을 추가합니다. `stages`가 첫 화면 flow map에서 채워질 칸을 정합니다.
- 프로젝트의 보고서 링크는 `report.path`에 적힌 파일이 repository에 있을 때만 표시됩니다.

## 주소

| 주소 | 페이지 |
|---|---|
| `/#en`, `/#ko` | 첫 화면 (영어, 한국어) |
| `/#orca`, `/#ko-orca` | 프로젝트 페이지 (`content.js`의 프로젝트 `id`) |
| `/#projects`, `/#ko-projects` | 첫 화면의 section |
