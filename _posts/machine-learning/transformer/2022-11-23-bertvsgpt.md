---
title: "[Transformer] BERT, GPT-2"
categories:
  - Machine Learning
tags:
  - Machine Learning
  - Transformer
  - BERT
  - GPT-2
toc: true
toc_sticky: true
toc_label: "트랜스포머(Transformer) - 트랜스포머와 컴퓨팅"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/203531538-6cfd7271-c90b-43a3-8bdf-b0ead846e69e.png)

# BERT, GPT-2

- BERT - Bidirectional Encoder Representations Transformer
- GPT-2 - Generative Pre-trained Transformer 2

<br>

## 리뷰

<br>

### 딥러닝의 계산적 특성

- 대부분의 계산이 행렬곱으로 구성
  - 심층신경망, 합성곱 신경망, 트랜스포머의 학습 및 추론에서 가장 큰 비중을 차지하는 것이 행렬곱

![image](https://user-images.githubusercontent.com/55765292/203532747-dd6dda33-d201-4716-8ec4-9883ec245f66.png)

<br>

### 계산 강도와 루프라인 모델

![image](https://user-images.githubusercontent.com/55765292/203537304-959b79be-a1dc-458f-9f04-11c60a7775fa.png)

<br>

## BERT (2018, Google)

![image](https://user-images.githubusercontent.com/55765292/203537391-d0436667-371e-4ac0-b405-4c46b7ecb0f9.png)

<br>

### 개 요

- 학습데이터 : 33억 개 토큰
  - 위키백과(25억) + 도서(8억)
- 구조 : 트랜스포머 인코더 12개(base), 24개(large)
  - 임베딩 벡터 크기 : 768(base), 1024(large)
  - 인코더별 어텐션 헤드의 수 : 12개(base), 16개(large)
  - 학습가능한 모수의 수 : 1.1억개(base), 3.3억개(large)
- 특징
  - Masked Language Model : 빈 칸을 맞추는 것으로 학습
  - 범용성 확보를 위해 문장 2개를 입력으로 받음
  - 당시 11개의 서로 다른 자연어 처리과업에서 SOTA 달성

![image](https://user-images.githubusercontent.com/55765292/203537638-cc43a0cb-796f-4495-a77d-114acd87322d.png)

<br>

### 입력

- 주어진 문장을 WordPiece 토큰화 ➔ 최대 512개의 토큰이 입력
  - 짧을 경우 나머지는 [PAD] 토큰으로 패딩
- 문장의 처음에는 [CLS], 끝에는 [SEP]의 특수 문자가 대응
  - 문장 두 개의 입력을 구분하기 위해서
- 트랜스포머와 유사한 위치 임베딩 활용 / 문장 구분을 위한 세그먼트 임베딩

![image](https://user-images.githubusercontent.com/55765292/203538024-68716070-9b12-4423-9eca-cb1a75861d16.png)

<br>

### 사전 학습 모델 : 마스크 언어 모델

- 입력 문장의 토큰 중 15%를 무작위로 \[MASK\] 토큰으로 설정
  - 무작위로 선정된 토큰은 80%를 \[MASK\], 10%는 다른 무작위 토큰, 10%는 그대로 둠
  - My dog is hairy 에서 hariy가 선택된경우
  <br>80%는 [MASK]로 대체
  <br>10%는 무작위(예-apple) 대체
  <br>10%는 그대로 둠
  - 무작위는 전체의 1.5% 수준
- [MASK] 토큰은 FC층을 거쳐 예측
  → 손실을 계산하여 가중치 업데이트
  
![image](https://user-images.githubusercontent.com/55765292/203539197-e86707c4-9aaa-4878-b59e-01062db03d93.png)

<br>

### 사전 학습 모델 : 문장 예측
- 두 문장의 관계를 통한 자연어 처리 과업에 대응
  - 질의응답, 추론, 감성 분석 등
- 두 문장의 입력은 50%가 연속된 문장, 50%는 무작위

![image](https://user-images.githubusercontent.com/55765292/203539865-e931226c-9a47-4b7d-9430-1b2d832a3ee3.png)

<br>

### Fine Tuning

- 배치 사이즈 : 16, 32
- 학습률(adam) : 5e-5, 3e-5, 2e-5
- Epoch : 2, 3, 4
- 10만개 수준의 재학습 데이터가 확보된 경우 초모수 선정에 자유로움
- 어텐션 마스크 추가
  - [PAD] 토큰에 대해서 0으로 부여
  - 불필요한 연산을 하지 않도록 함

![image](https://user-images.githubusercontent.com/55765292/203540503-a1e24942-e225-415c-982e-0bb8ed766ba0.png)

<br>

## GPT-2 (2019, OpenAI)

<br>

### 개 요
- 학습데이터 : 7,000권의 도서 말뭉치(GPT-1), 40GB WebText(GPT-2)
- 구조 : 트랜스포머 디코더 12개(GPT-1), 48개(GPT-2)
  - 임베딩 벡터 크기 : 768(GPT-1), 1,600(GPT-2)
  - 인코더별 어텐션 헤드의 수 : 12개(GPT-1), 12개(GPT-2)
  - 학습가능한 모수의 수 : 1.17억개(GPT-1), 15억개(GPT-2)
- 특징
  - 디코더 기반의 단방향 언어 생성으로 학습
  - GPT-1 → GPT-2의 구조적 확장을 통한 성능향상
  - 제로샷 학습으로 범용성을 증명

<br>

### 입력
- 토크화 : 50,257개의 vocabulary (Byte Pair Encoding)
- 최대 토큰수 : 1,024 (임베딩 벡터의 크기는 1,600)
  - 토큰수 만큼 사전정보를 줄 수 있다는 점에서 제로샷이 가능
- 위치 인코딩은 최대 토큰 수 만큼 (1,024)

![image](https://user-images.githubusercontent.com/55765292/203542231-8f898fb8-3723-484c-a83e-06e61107e44b.png)

<br>

### 디코더의 셀프 언텐션의 역할

![image](https://user-images.githubusercontent.com/55765292/203542560-586fd7f9-cfca-4ae7-b837-e45f4be768c7.png)

<br>

### 인코더 어텐션 vs 디코더 어텐션

![image](https://user-images.githubusercontent.com/55765292/203542648-2a70c07f-4137-4684-9285-28189bff9d16.png)

<br>

### 출력

![image](https://user-images.githubusercontent.com/55765292/203542842-4b3ce1a4-a58e-471b-980a-77031f365cd4.png)

<br>

### 재학습

![image](https://user-images.githubusercontent.com/55765292/203543124-17954876-c7df-49c1-96fc-95cb6e79b2c2.png)

<br>

## T5 (2020, Google)

<br>

### 개요

- 학습데이터 : C4(Colossal Clean Crawled Corpus)
  - 101개 언어 27TB
- 구조 : 인코더-디코더 각각 12개(base)
  - 임베딩 벡터 크기 : 768(base)
  - 인코더별 어텐션 헤드의 수 : 12개(base)
  - 학습가능한 모수의 수 : 2.2억개(base)
- 특징
  - 다양한 크기의 빈칸 채우기에 좋은 성능 보유
  - 공개 당시 디코더 구조보다 성능이 우수함
  - 계산량이 관건이라는 결론..

![image](https://user-images.githubusercontent.com/55765292/203543534-48f11e33-4a99-44fa-96ad-2467cce7bb47.png)
