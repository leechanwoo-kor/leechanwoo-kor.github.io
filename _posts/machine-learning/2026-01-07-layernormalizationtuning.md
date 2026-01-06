---
title: "[Machine Learning] Layer Normalization Tuning"
categories:
  - Machine Learning
tags:
  - Layer Normalization
  - Layer Normalization Tuning
toc: true
toc_sticky: true
toc_label: "Parquet vs Arrow"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/user-attachments/assets/251e861e-8c9f-4619-ae93-e3759ff404a5){: .align-center}<br>

# LN-Tuning: Layer Normalization으로 대규모 언어 모델을 효율적으로 파인튜닝하기

현대의 대규모 사전학습 언어 모델(Pre-trained Language Models, PLMs)은 수십억 개의 파라미터를 가지고 있습니다. BERT, GPT 시리즈와 같은 모델들을 특정 태스크에 맞게 파인튜닝하려면 엄청난 계산 비용과 메모리가 필요합니다. 각 다운스트림 태스크마다 모델의 전체 복사본을 저장하고 학습시켜야 한다면 이는 현실적으로 불가능합니다.

이러한 문제를 해결하기 위해 파라미터 효율적 튜닝(Parameter-Efficient Tuning) 기법들이 등장했습니다. 2022년 11월, Zhejiang Lab 연구팀이 발표한 LN-Tuning은 이 분야에 혁신적인 접근법을 제시했습니다.

[Parameter-Efficient Tuning on Layer Normalization for Pre-trained Language Models](https://arxiv.org/pdf/2211.08682)

## LN-Tuning이란?

LN-Tuning은 Transformer 아키텍처의 **Layer Normalization(LayerNorm)** 모듈에만 집중합니다. 구체적으로 LayerNorm의 **gain(γ)** 과 **bias(β)** 파라미터만을 학습 가능하게 유지하고, 나머지 모든 파라미터는 고정시키는 방법입니다.

LayerNorm의 수식은 다음과 같습니다:

```
LayerNorm(x) = γ ⊙ (x - μ) / σ + β
```

- μ: 평균
- σ: 표준편차
- γ: gain term (스케일 파라미터)
- β: bias term (시프트 파라미터)

## 왜 LayerNorm인가?

연구팀은 기존 방법들이 간과한 중요한 사실을 발견했습니다.

- **사전학습과 파인튜닝 간의 Gap**: LayerNorm의 gain과 bias는 사전학습 단계에서 거대한 일반 코퍼스로 학습되지만, 특정 도메인의 다운스트림 태스크에 적응할 때는 고정됩니다.
- **Fine-grained Adaptation**: Gain과 bias는 각 입력 뉴런에 대해 affine transformation을 수행하여 데이터에 대한 세밀한 적응 모듈로 작동합니다.
- **최소한의 파라미터**: 전체 모델의 **단 0.03-0.04%** 파라미터만 튜닝합니다.

## 기존 방법들과의 비교

### 1. Adapter 기반 방법

- Feed-Forward Network(FFN)에 추가 병목 레이어 삽입
- 파라미터: 약 0.3-0.7%

### 2. Prefix-Tuning / P-tuning v2

- Multi-Head Attention(MHA)에 학습 가능한 prefix 추가
- 파라미터: 약 0.3%

### 3. BitFit

- Transformer의 bias 벡터만 튜닝
- 파라미터: 약 0.07-0.08%

### 4. MAM Adapter

- MHA와 FFN을 동시에 튜닝하는 통합 프레임워크
- 파라미터: 약 0.66%

## LN-Tuning의 성능

놀랍게도 LN-Tuning은 **BitFit의 절반 정도의 파라미터**만으로도 훨씬 뛰어난 성능을 보였습니다.

|방법|파라미터 비율|BERT-Large 평균 성능|
|---|---|---|
|Full Fine-tuning|100%|79.9|
|MAM Adapter|0.66%|79.0|
|Adapter|0.33%|78.2|
|Prefix-Tuning|0.33%|78.3|
|BitFit|0.07%|74.8|
|LN-Tuning|0.03%|76.1|

## 실험 결과와 인사이트

### 1. 시간 효율성

LN-Tuning은 모든 방법 중 가장 빠른 학습 시간을 보였습니다.

- BERT-base에서 Full Tuning 대비 약 80% 시간
- BERT-large에서 약 70% 시간
- 추론 시간은 BitFit 및 Full Tuning과 동일하게 가장 빠름

### 2. 통합 프레임워크: Prefix-Tuning + LN-Tuning

연구팀은 LN-Tuning을 다른 방법들과 결합하는 실험을 수행했습니다. 흥미로운 발견이 있었습니다.

- MHA + LN-Tuning = 성능 향상
  - Prefix-Tuning + LN-Tuning이 SOTA 성능 달성
  - MAM Adapter를 능가하는 결과
- FFN + LN-Tuning = 성능 하락
  - Adapter(FFN) + LN-Tuning은 오히려 성능 감소
  - FFN과 LayerNorm의 동시 튜닝이 부정적 영향

|통합 방법|BERT-Large 평균|
|---|---|
|Prefix-Tuning|78.3|
|**Prefix + LN**|**79.8**|
|Adapter (FFN)|78.2|
|Adapter + LN|77.8 ⬇️|
|MAM|79.0|


### 3. Ablation Study: 무엇이 중요한가?

- Terms (항 분석):
  - Bias term이 gain term보다 더 중요
  - 둘 다 필요하지만, bias만 튜닝해도 어느 정도 효과
- Modules (모듈 분석):
  - MHA 이후의 LayerNorm이 FFN 이후보다 중요
  - 모든 LayerNorm 모듈을 튜닝하는 것이 최선
- Layers (레이어 분석):
  - 출력에 가까운 레이어(상위 레이어)가 더 많이 변화
  - BERT-large에서는 레이어 13-24가 더 중요
  - BERT-base에서는 레이어 1-6이 더 중요

### 4. 시각화: Gain과 Bias의 변화

연구팀은 파인튜닝 전후 gain과 bias의 변화를 시각화했습니다.

주요 발견
- 상위 레이어(15-24)가 하위 레이어보다 훨씬 많이 변화
- 복잡한 태스크(QA, NER)가 단순 분류보다 큰 변화 필요
- 데이터셋 규모가 클수록 term의 변화량이 큼

## LN-Tuning의 장점

### 1. 극도의 파라미터 효율성

- 전체 모델의 0.03%만 튜닝
- 메모리 사용량 최소화
- 여러 태스크의 모델을 동시에 저장 가능

### 2. 빠른 학습 속도

- Adapter 기반 방법보다 20-30% 빠름
- 추론 시간은 변화 없음

### 3. 높은 호환성

- 다른 PEFT 방법과 쉽게 결합 가능
- Prefix-Tuning과의 결합으로 SOTA 달성

### 4. 폭넓은 적용성

- NLU 태스크: NER, NLI, QA, 감정 분석 등
- NLG 태스크: Table-to-Text, 대화 요약 등
- 다양한 PLM 아키텍처: BERT, GPT-2

## 이론적 이해: 왜 작동하는가?

- Distribution Shift 완화: 사전학습 데이터와 다운스트림 데이터 간의 분포 차이를 LayerNorm의 gain/bias 조정으로 효과적으로 완화합니다.
- Fine-grained FFN: Gain과 bias는 각 뉴런에 대한 개별적인 affine transformation으로, 매우 경량화된 Feed-Forward Network로 볼 수 있습니다.
- Architectural Importance: LayerNorm은 Transformer의 모든 블록에 존재하며(MHA 이후, FFN 이후), 각 레이어의 출력을 정규화하는 핵심 역할을 합니다.

## 최신 연구 동향 (2024-2026)

LN-Tuning은 발표 이후 다양한 분야로 확장되고 있습니다

### 1. 의료 비전-언어 모델

- 의료 이미지와 텍스트를 다루는 모델에서 LN-Tuning 효과 검증
- 레이어 정규화가 안정성 제공의 핵심임을 재확인

### 2. 시계열 모델

- 시계열 foundation model에서 LoRA와 함께 비교
- FourierFT와 결합한 연구 진행 중

### 3. Deepfake 탐지

- CLIP 모델에 LN-Tuning 적용
- 일반화 성능 향상 확인

LN-Tuning은 "적은 것이 더 많은 것이다(Less is More)"라는 원칙을 완벽하게 구현한 사례입니다. Transformer 아키텍처의 가장 작은 컴포넌트 중 하나인 LayerNorm에 주목함으로써, 연구팀은 파라미터 효율성의 새로운 기준을 제시했습니다.

- 단 0.03%의 파라미터로 효과적인 전이 학습
- 최고의 시간 효율성
- 다른 PEFT 방법과의 높은 호환성
- Prefix-Tuning과 결합 시 SOTA 성능

대규모 언어 모델의 실용적 활용을 고민하는 연구자와 실무자들에게 LN-Tuning은 간단하면서도 강력한 솔루션을 제공합니다.

## 참고문헌

1. Qi, W., Ruan, Y. P., Zuo, Y., & Li, T. (2022). Parameter-Efficient Tuning on Layer Normalization for Pre-trained Language Models. arXiv preprint arXiv:2211.08682. [논문 링크](https://arxiv.org/pdf/2211.08682)
2. Chen, J., Yang, D., Jiang, Y., et al. (2024). Efficiency in Focus: LayerNorm as a Catalyst for Fine-tuning Medical Visual Language Models. ACM MM 2024.
3. Gupta, D., Bhatti, A., & Parmar, S. (2024). Beyond LoRA: Exploring Efficient Fine-Tuning Techniques for Time Series Foundational Models. arXiv preprint arXiv:2409.11302.

