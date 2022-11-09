---
title: "[Transformer] 트랜스포머(Transformer) - 트랜스포머의 이해"
categories:
  - Machine Learning
tags:
  - Machine Learning
  - Transformer
toc: true
toc_sticky: true
toc_label: "트랜스포머(Transformer) - 트랜스포머의 이해"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/200814231-47c63128-0035-41a5-8804-a3e024c2a364.png)

# Transformer

![image](https://user-images.githubusercontent.com/55765292/200813758-0afe1548-3b15-4c98-aa38-6c378677776b.png){: .align-center}

<br>

## Transformer의 구조

![image](https://user-images.githubusercontent.com/55765292/200815384-483e9641-7364-4d4e-8467-cd8726318a42.png){: .align-center}

<br>

### 임베딩 레이어

![image](https://user-images.githubusercontent.com/55765292/200817795-88573c60-daf4-4ea5-ae8a-6b3e6d4780f0.png){: .align-center}

- 텍스트 데이터를 수치로 표현
  - 입력 : 일련의 문장
  - 토큰화
    - byte pair encoding (영어-독일어) : 37K 토큰
    - word-peice vocabulary (영어-불어) : 32K 토큰
  - 임베딩 행렬
    - 토큰수 x 임베딩 벡터 크기로 트랜스포머에서는 이미 학습된 임베딩 행렬 사용 (필요에 따라 별도 구축 가능)
    - 기본적인 역할 : 임베딩 벡터 간의 거리로 토큰의 유사도를 측정할 수 있음
  - 출력 : 입력 문장의 토큰수 x 임베딩 벡터 크기

<br>

### 위치 인코딩

![image](https://user-images.githubusercontent.com/55765292/200817850-2ed8f610-50d0-4754-b12d-c5386bfe11a8.png){: .align-center}

- 토큰 임베딩 벡터별로 위치를 부여
  - 입력 : 임베딩된 벡터
  - 위치 인코딩 알고리즘
    - 임베딩된 벡터에 위치를 부여하는 방식은 여러가지가 있으나 임베딩된 벡터 원소에 영향을 최소화해야 함
    - 같은 위치의 토큰은 같은 위치 값을 가져야 함 → 주기함수
    - 위치 인코딩의 크기 == 임베딩된 벡터의 크기 → 주기함수의 중복성 배제
    
    ![image](https://user-images.githubusercontent.com/55765292/200818174-d0e8abf9-c4e1-44ed-88c8-0981d66048ed.png)

  - 출력 : 임베딩 벡터 + 위치 인코딩 벡터
    - 덧셈을 하는 이유?
      - 계산상의 이유 때문

<br>

---

> 어텐션 메커니즘

![image](https://user-images.githubusercontent.com/55765292/200820508-2d13a263-8e1e-479a-895f-02153c6f8835.png){: .align-center}

>- 은닉 상태를 한 번 더 가공하는 접근
> - 소수의 FC 층
> - Dot-product 어텐션
>   - 쿼리 - 키 - 가치로 구성
>   - 키 - 가치는 딕셔너리로 이해 가능
>   - 쿼리 - 키의 유사도는 dot-product로
>   - dot-product 값에 가치를 곱하여 어텐션 모수 산출
> - 바이나우 어텐션
>   - 쿼리의 시점이 t-1

---

<br>

## 트랜스포머의 구조 - 인코더

![image](https://user-images.githubusercontent.com/55765292/200822988-92b25acd-f1eb-4899-aebd-137cc449cfc3.png)

> 무엇을 학습하는가?

![image](https://user-images.githubusercontent.com/55765292/200823071-2e547146-5929-4b6a-b156-fee92aff14bc.png)

<br>

### (셀프) 어텐션 헤드

![image](https://user-images.githubusercontent.com/55765292/200823327-3ae71c31-e8f4-459b-8ed8-9a0e86d9828f.png)

<br>

#### 행렬곱

![image](https://user-images.githubusercontent.com/55765292/200824030-7ec201dd-5cbf-4899-b11a-0260dea93bb9.png)

<br>

#### 어텐션 값

![image](https://user-images.githubusercontent.com/55765292/200824813-2db2b1e7-328d-49db-806c-8998ab17193b.png){: .align-center}

<br>

## 쿼리, 키, 가치

<br>

### 쿼리, 키의 의미

![image](https://user-images.githubusercontent.com/55765292/200825000-07ee5dd8-3ebf-434d-ad60-66e75d6e23e7.png)

<br>

### 가치의 의미

![image](https://user-images.githubusercontent.com/55765292/200825046-357e5f0d-4183-48b3-af7b-872fe65e8ab3.png)

<br>

## 멀티 헤드 (셀프) 어텐션

![image](https://user-images.githubusercontent.com/55765292/200825128-052b21c1-5a75-47d0-b4e7-ccfd104dc827.png)

<br>

### FC층의 역할

![image](https://user-images.githubusercontent.com/55765292/200825181-59b8547b-49a1-412c-9fc8-b5254ac84c7b.png)

<br>

## 트랜스포머의 의미
- 언어모델에서의 문맥적 관계를 학습
  - 입력된 값에 대해서도 학습 → 셀프 어텐션
  - 어디까지나 확률적 의미에서의 문맥적 관계
  - 장기 의존성 문제를 계산으로 해결
- 계산적인 측면에서의 트랜스포머
  - 어텐션 헤드 → 계산적으로 독립 → 매우 쉽게 병렬처리 가능
  - 어텐션의 계산 → 모두 행렬곱으로…
  - Multi-GPU 환경, Multi-GPU 클러스터 환경에서의 킬러 앱
  - 현대 계산자원의 특성을 십분 고려한 알고리즘의 개발 → 거대언어 모델의 기반
