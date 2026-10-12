---
summary: "LTV 예측을 Churn·구매 가격대까지 확장하고, 예측값을 마케팅과 기획 업무에 연결한 작업."
title: "User Embedding"
category: "Predictive modeling"
period: "2024.06–2026.01"
role: "모델링 · 데이터 파이프라인 · 실험"
status: "모델·파이프라인 구축 / 논문 게재"
tags: ["TensorFlow", "Databricks", "Tableau", "Multi-task Learning", "Feature Store", "Ordinal Classification"]
order: 1
---

## 정의
신규 유저의 행동을 학습하는 LTV 예측 모델을 Churn·구매 가격대 예측으로 확장하고, 예측값을 마케팅과 게임 기획 업무에 제공한 프로젝트입니다.

기존 모델은 신규 유저의 LTV를 예측했습니다. 같은 유저 행동에서 이탈 가능성도 예측하고, 모델이 학습한 표현을 다른 업무에 활용할 수 있도록 확장하는 작업을 맡았습니다.

광고 성과를 확인하는 데에도 시간 차이가 있었습니다. 네트워크별 D7 ROAS는 유저 유입 후 7일을 기다려야 실제 값이 나옵니다. 더 이른 시점에 예측치를 확인할 수 있도록 하는 것이 활용 과제였습니다.

## 내용
### 모델·데이터 파이프라인
- Churn 목표와 학습 데이터셋을 정의하고 데이터 파이프라인을 설계·구축했습니다.
- 기존 LTV 예측을 LTV·Churn 공동 예측 구조로 확장하는 작업에 참여했습니다.
- 여러 파이프라인에서 중복 집계하던 피처를 공통으로 사용하도록 Feature Store 설계·구축을 주도했습니다.
- 논문의 베이스라인 실험과 Ablation Study를 진행하고 도표와 원고 작성에 참여했습니다.

### D7 ROAS 예측치 제공
예측 LTV와 광고 비용을 결합해 유입 후 **2–3일 내에 네트워크별 D7 ROAS 예측치**를 확인할 수 있도록 제공했습니다.

### 신규 유저의 구매 가격대 예측
게임 기획팀은 유저가 선호하는 상품 가격과 최대 결제 상품 가격 등을 상품 추천에 활용하고 있었습니다. 신규 유저에게는 구매 이력이 부족하다는 문제가 있었습니다.

가입 후 1·3·6·12·18·24시간의 행동으로 28일 시점의 구매 가격대를 예측하도록 모델의 출력 헤드를 변경했습니다. 상품 가격대는 연속적인 값이 아니므로, 회귀 결과를 반올림하는 방식과 비교해 **Ordinal Classification**을 적용했습니다. 관련 파이프라인을 구축하고 기획팀의 A/B 테스트를 준비했습니다.

<figure class="project-screenshot">
<a href="/assets/screenshots/purchase-habit-confusion-redacted.png" target="_blank" rel="noopener"><img src="/assets/screenshots/purchase-habit-confusion-redacted.png" alt="선호 구매 가격대의 실제값과 예측값을 비교하는 혼동행렬" loading="lazy"></a>
<figcaption>선호 구매 가격대 예측 혼동행렬 · 행은 실제 가격대, 열은 예측 가격대.</figcaption>
</figure>

### 모니터링 화면
여러 관측 기간과 예측 시점의 LTV·Churn을 확인하는 대시보드를 구성했습니다. 아래는 24시간 행동 데이터로 D7 Churn을 예측한 차트에서, 예측값과 관측값이 함께 있는 구간입니다.

<figure class="project-screenshot">
<a href="/assets/screenshots/churn-monitor-comparison.png" target="_blank" rel="noopener"><img src="/assets/screenshots/churn-monitor-comparison.png" alt="Churn H24 D7 예측값과 관측값의 공통 구간 비교" loading="lazy"></a>
<figcaption>D7 Churn 예측값과 관측값 비교 · 공통 관측 구간 발췌.</figcaption>
</figure>

## 결과
LTV·Churn 공동 예측을 두 게임에 적용했고, 연구 결과는 WWW 2025 Industry Track 논문으로 게재됐습니다. 저는 공동 2저자로 참여했습니다.

### 관련 논문
[TransForeCaster: In-and-Cross Categorized Feature Integration in User Representation Learning](https://doi.org/10.1145/3701716.3715267)  
The Web Conference (WWW), Industry Track, 2025 · 공동 2저자
