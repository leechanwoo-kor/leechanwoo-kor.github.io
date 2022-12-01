---
title: "[Language Model] 사전학습 언어 모델(Pretrained Language Model)"
categories:
  - Machine Learning
tags:
  - Machine Learning
  - MobileBERT
  - ELECTRA
  - DeBERTa
  - DeBERTa V3
toc: true
toc_sticky: true
toc_label: "사전학습 언어 모델(Pretrained Language Model)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/203531538-6cfd7271-c90b-43a3-8bdf-b0ead846e69e.png)

# 사전학습 언어 모델(Pretrained Language Model)

- MobileBERT
- ELECTRA - Efficiently Learning on Encoder that Classifies Token Replacements Accurately
- DeBERTa - Decoding-enhanced BERT with Disentangled Attention
- DeBERTa V3

<br>

## [리뷰] 트랜스포머의 핵심

- 트랜스포머는 멀티 헤드 어텐션을 일반화한 단어로 활용
  - 트랜스포머는 인코더-디코더 구조를 가짐
    → BERT, GPT, T5 에 활용되는 트랜스포머가 인코더-디코더를 의미하지는 않음
  - 다양한 언어모델에서 활용되는 트랜스포머의 의미는 멀티 헤드 어텐션으로 이해할 수 있음
- 멀티 헤드 어텐션 ➔ 다수의 어텐션 헤드
  - 어텐션 헤드의 역할은 임베딩된 벡터의 관점을 변환시키는 역할
  - 관점을 변환시키는 것이 쿼리, 키, 가치 행렬
  - 임베딩 벡터 → 쿼리 행렬(학습 가능) → 쿼리 벡터
    임베딩 벡터 → 키 행렬(학습 가능) → 키 벡터
  - 쿼리 벡터와 키 벡터의 내적(dot product)는 해당 토큰의 관계를 설정

<br>

- BERT와 GPT의 차이
  - 인코더와 디코더의 차이로 알려져 있으나 둘 모두 멀티 헤드 어텐션으로…
  - 멀티 헤드 어텐션을 구성하는 각각의 어텐션 헤드가 관계를 설정하는 영역에 따라 인코더, 디코더 차이로 이해할 수 있음

![image](https://user-images.githubusercontent.com/55765292/205069235-19b73947-6582-4d40-8f8a-73c9c1e03a6c.png)

<br>

## MobileBERT(2020, Google & CMU)

<br>

### 개요

![image](https://user-images.githubusercontent.com/55765292/205071000-1f89e7bb-61cc-4a13-aed0-ed7ab615c687.png)

- 학습데이터 : 33억 개 토큰
  - 위키백과(25억) + 도서(8억)
- 구조 : IB-BERT(teacher), MobileBERT
  - 인코더의 수 : 24개 (BERT large와 동일)
  - 임베딩 벡터 크기 : 128 → conv → 512
  - 인코더별 어텐션 헤드의 수 : 4개(IB-BERT), 4개(MobileBERT)
  - 학습가능한 모수의 수 : 2.93억개(IB-BERT), 0.25억개(MobileBERT)
- 특징
  - 지식 증류(Knowledge Distillation)을 활용한 지식 전이, 신경망 구조 탐색 활용 최적화
  - BERT base(3.3억개) 보다 4.3배 작고, 5.5배 빠름
  - 일부 과업에서는 BERT를 능가

<br>

### 모델의 전반적인 형태

![image](https://user-images.githubusercontent.com/55765292/205072754-ef9645cc-5b2a-42c3-b497-d88cf6661d6f.png)

<br>

### 지식 증류(Knowledge Distillation)

- Classifier(softmax의 output)의 결과에 지식이 포함되어 있다는 가정
- Hard label vs. soft label

![image](https://user-images.githubusercontent.com/55765292/205073513-7a6d0e84-d01b-4d4a-89ae-59c494c7d03e.png)

<br>

### 신경망 구조 탐색(Neural Architecture Search)

- 최적의 초모수(hyper-parameter)를 탐색하는 방법
- 초기에는 대규모 컴퓨팅 파워가 관건이었으나 최근에는 모바일/엣지장치의 경량화에 많이 활용됨

![image](https://user-images.githubusercontent.com/55765292/205074454-f67f4dd3-a660-4ea4-841e-d3ebdc17dbaf.png)

<br>

## ELECTRA (2020, Google)

<br>

### 개요

- 학습데이터 : 33억 개 토큰 (BERT와 동일)
  - 위키백과(25억) + 도서(8억)
- 구조 : 인코더 수 12(small), 12(base), 24(large)
  - 임베딩 벡터 크기 : 128(small), 768(base), 1024(large)
  - 인코더별 어텐션 헤드의 수 : 4개(small), 12개(base), 24(large)
  - 학습가능한 모수의 수 : 0.14억개(small), 1.1억개(base), 3.35억개(large)
- 특징
  - GAN을 활용해 마스크드 언어 모델 학습
  - 더 낮은 학습 비용과 더 높은 성능 달성
  - Small 모델(0.14억개)도 우수한 성능 보유

<br>

### GAN을 활용한 언어모델 학습

- [MASK] 토큰을 학습시 무작위로 선택

<br>

![image](https://user-images.githubusercontent.com/55765292/205077321-06634a87-ecbd-4fbf-89d9-7e7bd32384f9.png)

<br>

## DeBERTa (2020, MS)

<br>

### 개요

- 학습데이터 : 85GB, 161GB(1.5B)
  - 위키백과, 도서, OpenWebText, Stories, CC-News(1.5B 모델에서만)
- 구조 : 인코더 수 12(base), 24(large), 48(1.5B)
  - 임베딩 벡터 크기 : 768(base), 1024(large), 1536(1.5B)
  - 인코더별 어텐션 헤드의 수 : 12개(base), 16개(large), 24개(1.5B)
  - 학습가능한 모수의 수 : 1억개(base), 3.5억개(large), 15억개(1.5B)
- 특징
  - 풀어진 어텐션 메커니즘(disentangled attention mechanism)
  - 강화된 마스크 디코더(enhanced mask decoder)
  - 가상 적대 학습(virtual adversarial training)으로 재학습 효율 증대

<br>

### Disentangled attention
- (BERT의 입력) 토큰 임베딩 + 위치 임베딩 (덧셈)
- (DeBERTa의 입력) 토큰 임베딩과 위치 임베딩에 어텐션을 적용
  - 토큰의 위치가 유의미한 정보를 담고 있다 (ex - deep learning)
- 토큰 위치의 중요성을 상대적 위치(relative position)로도 표현

<br>

### Enhanced mask decoder
- 토큰의 위치가 매우 중요하다는 전제 아래 절대 위치(absolute position)를 고려
- 절대 위치는 단어의 위치에 따른 품사로 이해할 수 있음
- 마스크 토큰을 예측하기 전에 절대 위치 임베딩(absolute word position embedding)을 추가로 통합

<br>

## DeBERTa V3 (2021, MS)

<br>

### 개 요
- 학습데이터 : 161GB text
  - 위키백과, 도서, OpenWebText, Stories, CC-News(1.5B 모델에서만)
- 구조 : 인코더 수 6(small), 12(base), 24(large)
  - 임베딩 벡터 크기 : 768(base), 768(base), 1024(large)
  - 인코더별 어텐션 헤드의 수 : 12개 (small, base, large)
  - 학습가능한 모수의 수 : 0.44억개(small), 0.86억개(base), 3억개(large)
- 특징
  - 마스크드 언어 모델을 ELECTRA의 RTD(Replace Token Detection)으로 변경
  - 마스크를 대체하는 생성기의 토큰 임베딩과 판별기의 토큰 임베딩의 공유하는 ELECTRA의 접근을 대체한 Gradient-Disentanlged Embedding Sharing 기법 활용
