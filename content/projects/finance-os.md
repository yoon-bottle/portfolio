---
summary: "공급사별 데이터 수집과 매출 집계를 API 기반 정산 업무로 전환한 작업."
title: "Finance OS"
category: "Workflow automation"
period: "2026.03–2026.05"
role: "웹 개발 · 집계 로직 설계·검증"
status: "재무팀 정산 업무에 사용"
tags: ["API integration", "Data validation", "Web app"]
order: 6
---

## 정의
공급사별 인앱 결제·광고 수익 데이터를 API로 수집하고 집계해 월 정산 업무를 자동화한 프로젝트입니다.

재무팀은 매월 공급사별 사이트에서 인앱 결제와 광고 수익 데이터를 내려받아 정산표에 정리했습니다. 팀의 사용 후기에 따르면 이 과정에 약 5인일이 필요했습니다.

## 내용
공급사 API로 수집한 원천 데이터를 바탕으로 매출 집계 로직을 설계·검증하고, 정산 업무를 수행하는 웹앱 개발을 담당했습니다.

### 정산 절차 자동화
개별 사이트를 오가며 데이터를 수집하고 정리하던 절차를 API 기반으로 전환했습니다. 데이터 수집 이후의 집계와 확인 작업을 웹앱에서 수행하도록 구현했습니다.

### 화면 예시
<figure class="project-screenshot">
<a href="/assets/screenshots/finance-os-summary.png" target="_blank" rel="noopener"><img src="/assets/screenshots/finance-os-summary.png" alt="월별 공급사 데이터 준비 상태를 확인하고 매출정리를 생성하는 Finance OS 화면" loading="lazy"></a>
<figcaption>월별 공급사 데이터 준비 상태 확인 및 매출정리 생성 화면.</figcaption>
</figure>

## 결과
재무팀의 실제 사용 후기를 기준으로 월 정산 업무가 **5인일에서 1인일 이내**로 줄었습니다.
