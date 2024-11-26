---
title: "[Machine Learning] Attention Is All You Need (1)"
categories:
  - Machine Learning
tags:
  - Support Vecrtor Machine
  - SVM
toc: true
toc_sticky: true
toc_label: "Attention Is All You Need (1)"
toc_icon: "sticky-note"
---

# Attention Is All You Need

<br>

## Transformer 의의

<br>

### Transformer 기여
- 기존의 Sequence Transduction(변환) 모델은 인코더(Encoder)와 디코더(Decoder)를 포함하는 구조를 바탕으로, 순환 신경망(Recurrent)나 Convolution Layer를 사용함
- 좋은 성능을 보인 모델의 특징 : Attention 메커니즘을 활용해서, 인코더와 디코더를 연결한 모델
- Attention 메커니즘만을 사용하는 "Transformer"라는 새로운 구조를 제안
  - 기계번역(Machine Translation) Task에서 매우 좋은 성능
  - 학습 시, 우수한 병렬화(Parallelizable) 및 훨씬 더 적은 시간 소요
  - 구문분석(Constituency Parsing) 분야에서도 우수한 성능 → 일반화(Generalization)도 잘됨

**📌 Parsing?**
![image](https://user-images.githubusercontent.com/55765292/195633401-84291ae1-82bc-4fce-a8e7-ae98da87db93.png)

<br>

## Background

### Sequential 문제를 풀기 위한, 이전 연구
- LSTM, GRU 등을 활용한, "Rucurrent(순환) 구조"가 언어 모델링 및 기계번역 등의 Task에서 확고한 입지를 다져왔음
- Recurrent(순환) 구조는 Input과 Output Sequence를 활용
  - $h_t$ : $t-1$를 Input과 $h_{t-1}$를 통해 생성 → 이러한 구조로 인해 일괄처리가 제한됨.
  - 순차적으로 $t$이전의 Output이 다 계산되어야 최종 Output이 생성
    - 병렬화 제한됨
    - Sequence의 길이가 길어질수록 더 취약해짐 → Factorization Trick이나 Condition Computation으로 계산 효율성을 증대했으나 한계점 존재

<br>

### Sequential Computation 문제를 풀기 위한, 이전 연구
- CNN 구조를 통한 병렬화 고려 했지만, 여전히 한계점 존재
  - 인코더와 디코더를 연결하기 위한 추가 연산 필요
  - 원거리 Position 간의 Dependencies(종속성)을 학습하기 어려움

**📌 CNN**

![image](https://user-images.githubusercontent.com/55765292/195637481-1bc76d4b-544d-478b-be8e-8cf2b18122fa.png)

<br>

### Attention 메커니즘
- Sequence 모델링에서 필수적인 요소
- Input이나, Output Sequence에 관계없이, Dependencies(종속성)을 학습할 수 있음
- 하지만, 일반적으로 RNN에 붙여서 사용했음

**📌 Attention**

![image](https://user-images.githubusercontent.com/55765292/195638421-3af14ad5-cf1d-4730-b4d0-aced4836f523.png)

<br>

### Self-Attention 메커니즘
- **Infra-Attention**이라고도 불림
- 단일 Sequence 안에서의 Position들을 연결
- Self-Attention은 독해, 요약, Sentence Representation에서 효과적
- **Recurrent Attention**이 **Sequence-ALigned Recurrent** 보다 End-to-End 학습에서 더 좋은 성능

<br>

### Transformer의 특징
- 일괄처리가 되지 않는 Recurrance 구조 피함 → Self-Attention만으로 입∙출력의 Representation을 계산
- Input과 Output 사이의 **Global Dependency**를 학습
- 병렬화(Parallelizable) 우수 (P100-8 GPU → 12시간 학습)
- SOTA 달성

<br>

## Model Architecture

<br>

### 전체적인 구조
- 기계번역 모델은 일반적으로 **Encoder-Decoder** 구조를 가짐
- 입력 $(x_1, \dots, x_n)$은 encoder를 통해 $z=(z_1, \dots, z_n)$로 표현 및 매핑됨
- Encoder로 표현된 $z$를 활용하여, 한 번에 한 Element 씩 Output Sequence $(y_1, \dots, y_m)가 생성
  -  Auto-Regressive : 생성된 Symbol은 다음 생성 과정에서 추가 입력으로 사연

![image](https://user-images.githubusercontent.com/55765292/195642002-9f1f2438-6aff-480d-a50d-f41483d95794.png)

Encoder-Decoder 구조{: .text-center}

<br>

### Encoder 구조
- $N=6$의 동일한 Layer Stack으로 구성
- 각 Layer는 2개의 Sub-Layer로 구성
  - Multi-Head Self-Attention 메커니즘
  - Position-wise Fully Connected Feed-Forward Network
    - 1x1 Conv Layer가 2개 이어진 것과 같음
    - Position 별로 동일한 Fully Connected Feed-Forward Network가 적용(Dim=2048)
- 각 Sub-Layer는 Residual Connection 및 Layer Normalization 적용

$LayerNorm(x+SubLayer(x))${: .text-center}

- Residual Connection 적용을 용이하게 하기 위해, Sub-layer, Embedding, Output Dimension을 512로 통일
  - Residual Connection 적용을 위해선, Input과 연결되 Output의 Dimenstion이 동일해야함

![image](https://user-images.githubusercontent.com/55765292/195643160-5d7b0ff2-1893-4a67-9e4a-27c60401bd0d.png)

<br>

### Decoder 구조
- $N=6$의 동일한 Layer Stack으로 구성
- 각 Layer는 3개의 Sub-Layer로 구성
  - Masked Multi-Head Self-Attention 메커니즘
    - Decoder의 Multi-Head Self-Attention은 Masking을 사용하여, 후속(Subsequent) Position은 Attention 안 하도록 조정
    - Position$(i)$를 예측할 때는, $(i)$ 보다 작은 위치에 알려진 Output에만 의존
    - Output Embedding은 One Position 씩 Offset(주소 참조)
  - Encoder의 Output에 대해 Multi-Head Self-Attention 메커니즘 수행
  - Position-wise Fully Connected Feed-Forward Network

<br>

### Encoder-Decoder 구조 정리 및 요약
- Encoder는 Self-attention layers 구조로 구성
  - 이전 Encoder Layer에서의 출력 → 현재 Encoder Layer에서의 동일 Position의 입력
  - 각 Encoder Layer는 이전 Layer로부터 모든 위치를 처리한 정보를 활용
- Decoder Layer 특징
  - Sequence-to-Sequence 모델에서의 일반적인 인코더-디코더 Attention 메커니즘을 모방
  - Query : 이전 Decoder Layer에서 가지고옴
  - Key와 Value : encoder에서의 output에서 가지고 옴
  - 각 Decoder는 Encoder의 모든 Position정보를 사용함
- Decoder에서의 모든 Position 정보 사용 방지
  - auto-regressive 속성(Property)을 위해 왼쪽으로부터 넘어오는 정보흐름을 방지해야 함
  - 잘못된 연결에 해당하는 Softmax 값을 마스킹(-∞)으로 세팅

<br>

### Attention에 대한 고찰
- 크게 두 가지 종류가 있음

**📌 Attention 종류**

![image](https://user-images.githubusercontent.com/55765292/195646591-26a2dbd5-4bb3-4839-9475-58f8be4d00b3.png)

1) Additive Attention : Single Hidden Layer로 구성된 Feed-Forwad Network를 활용 → Compatibility(일치성) 계산

**📌 Additive Attention?**

![image](https://user-images.githubusercontent.com/55765292/195646908-2ce5ae6c-da0d-436b-8a0b-d4f7265ec4ce.png)

2) Dot-product(Multiplicative) Attention : 
- 장점 : 효율적인 행렬곱 구성으로, **실제로 더 빠르고 공간 효율적**
- 단점 : 작은 Key 벡터의 차원$(d_k)$에서는 두 메커니즘이 유사한 성능을 보이지만, 더 큰 $d_k$에서는 Additive Attention이 더 좋음

<br>

### Attention 핵심 계산 과정

### The Beast with Many Head

### 최종 Self-Attention 계산 과정 요약

### Position-wise Feed-Forward Networks

### Embedding 및 Softmax 구성
