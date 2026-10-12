---
summary: "클릭과 D1 리텐션 예측에 기반한 발송 정책, 온라인 피처와 실시간 서빙."
title: "Push Optimization"
category: "Model serving"
period: "2025.07–2026.01"
role: "예측 모델 · 온라인 피처 · 실시간 API"
status: "개발 완료 / A/B 테스트 준비"
tags: ["MMoE", "Databricks", "Online Feature Store"]
order: 3
---

## 정의
클릭·D1 리텐션 예측을 바탕으로 유저별 푸시 발송 여부를 결정하고, 실시간 예측을 제공하는 프로젝트입니다.

푸시 최적화 관련 연구를 검토한 뒤 회사의 발송 현황을 살펴봤습니다. 보수적인 발송 정책에서 발송량을 늘리되, 유저별 과발송을 막을 수 있는 기준이 필요했습니다.

## 내용
### 담당 범위
- 푸시 클릭 확률과 D1 리텐션 확률을 공동 예측하는 MMoE 모델을 개발했습니다.
- 트리 기반 모델과 멀티태스크 모델을 비교하고 시간 단위 행동 피처를 평가했습니다.
- 피처 집계와 학습 파이프라인부터 Databricks Online Feature Store, 실시간 예측 API까지 개발했습니다.
- 목표 발송 비율을 바탕으로 임계값을 정하고 A/B 실험을 설계했습니다.

### 예측과 발송 정책
모델은 유저의 클릭 가능성과 다음 날 잔존 가능성을 예측합니다. 목표로 하는 발송 비율을 정한 뒤, 그 비율에 맞도록 클릭·리텐션 예측값의 기준을 설정해 발송 여부를 나눴습니다.

정책 설계 과정에서는 클릭 확률과 D1 리텐션 확률의 곱을 기준으로 발송 대상을 구분하고, 임계값에 따른 발송 대상 비율을 비교했습니다.

<figure class="project-screenshot">
<a href="/assets/screenshots/push-send-policy.png" target="_blank" rel="noopener"><img src="/assets/screenshots/push-send-policy.png" alt="클릭 확률과 D1 리텐션 확률에 따른 발송 대상 분포와 임계값 경계" loading="lazy"></a>
<figcaption>발송 정책 설계 과정의 예측값 분포 및 임계값 검토. 61%는 해당 기준 적용 시 발송 대상 비율입니다.</figcaption>
</figure>

### 실시간 서빙
발송 시점에 유저의 피처를 조회하고 예측할 수 있도록 Databricks 내 서빙 구조를 구성했습니다. 온라인 피처 저장소와 API를 연결해 모델 학습 이후의 사용 경로까지 개발했습니다.

## 결과
모델·실시간 서빙 개발 및 A/B 테스트 설계를 완료했습니다.
