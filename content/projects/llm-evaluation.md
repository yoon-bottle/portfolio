---
summary: "사내 업무 기반 벤치마크로 오픈모델을 평가하고, 합성 데이터로 Fine-tuning을 수행한 작업."
title: "LLM Evaluation & Fine-tuning"
category: "Model evaluation"
period: "2026.07–2026.09"
role: "벤치마크 · 학습 · 리더보드 개발"
status: "사내 평가 및 결과 공유"
tags: ["LLM Evaluation", "LoRA", "SFT"]
order: 4
---

## 정의
사내 업무에 맞춘 벤치마크로 프론티어 모델과 오픈모델을 비교하고, Fine-tuning 전후 성능을 평가한 프로젝트입니다.

공개 리더보드 점수만으로는 오픈모델이 사내 업무에 적합한지 판단하기 어려웠습니다. 프론티어 모델과 오픈모델을 실제 업무에 가까운 조건에서 비교할 평가 기준이 필요했습니다.

## 내용
### 벤치마크와 자동 채점
사내 데이터를 바탕으로 Steerability, Tool Use, Data Analysis의 세 가지 벤치마크와 자동 채점 체계를 구현했습니다.

- **통제성:** 지시와 정책을 따르는지 평가
- **도구 호출:** 주어진 업무에서 필요한 도구를 사용하는지 평가
- **데이터 분석:** 내부 업무에 가까운 분석 문제를 해결하는지 평가

비교 결과를 공유할 수 있는 리더보드 웹도 개발·배포했습니다.

### 리더보드
<figure class="project-screenshot">
<a href="/assets/screenshots/llm-leaderboard-redacted.png" target="_blank" rel="noopener"><img src="/assets/screenshots/llm-leaderboard-redacted.png" alt="벤치마크별 모델 비교 차트를 보여주는 사내 LLM 리더보드" loading="lazy"></a>
<figcaption>사내 벤치마크별 모델 비교 리더보드.</figcaption>
</figure>

### Fine-tuning 실험
사내 데이터를 바탕으로 생성한 합성 데이터로 LoRA 기반 SFT를 수행했습니다. 사내 업무 기반 평가셋에서 학습 전후 성능을 비교했습니다.

## 결과
3개 벤치마크와 자동 채점 체계를 구축하고, 모델별 비교 결과를 확인할 수 있는 리더보드를 사내에 배포했습니다. 합성 데이터 기반 SFT를 수행하고 사내 업무 평가셋에서 학습 전후 성능을 비교했습니다.
