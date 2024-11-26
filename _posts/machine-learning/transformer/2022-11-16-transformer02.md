---
title: "[Machine Learning] 트랜스포머(Transformer) - 트랜스포머와 컴퓨팅"
categories:
  - Machine Learning
tags:
  - Transformer
toc: true
toc_sticky: true
toc_label: "트랜스포머(Transformer) - 트랜스포머와 컴퓨팅"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/200814231-47c63128-0035-41a5-8804-a3e024c2a364.png)

# Transformer

- 트랜스포머가 거대 언어모델의 기반이 된 이유 ➔ 계산의 효율성
- 계산의 효율성은 유연한 확장성과 유사
- 컴퓨팅 관점에서의 트랜스포머의 의미 분석

<br>

## 리뷰

<br>

### 트랜스포머

![image](https://user-images.githubusercontent.com/55765292/200813758-0afe1548-3b15-4c98-aa38-6c378677776b.png){: .align-center}

- RNN과의 차별점
  - 시계열적 의존성에서 탈피
  - 결과적으로 장기의존성을 완화시키는 역할
  - 반대급부로 계산이 늘어나는 형태
  - 유연한 확장성이 장점
- 멀티 헤드 어텐션에 주목해야 함
  - 트랜스포머는 기계번역에 특화 (seq2seq)
    - 인코더-디코더의 특징
  - 언어 모델은 인코더나 디코더만 사용하는 경우가 다수
    - 멀티헤드 어텐션의 의미가 중요 → dot product attention

### dot product attention의 의미

- 내적(dot product)은 벡터의 유사도를 의미
  - 입력(출력) 임베딩은 일차적으로 토큰 간의 유사도를 학습한 결과
    - 토큰의 의미자체가 비슷한 경우를 학습
    (ex. 생각하다-고려하다 등)
  - 트랜스포머의 학습 가능한 모수인 쿼리, 키, 가치 행렬은 임베딩 벡터를 변화시키는 것으로 이해할 수 있음
    - 이는 곧 유사도를 변경시키는 역할
    - 단순한 유의어에서 벗어나 품사, 생물학적 속성
    - 확장된 속성은 곧 다양한 표현의 가능성으로..

![image](https://user-images.githubusercontent.com/55765292/202166283-c960991d-f277-4436-9e12-2ccbcab390f9.png){: .align-center}

<br>

## 딥러닝의 계산적 특성

- 대부분의 계산이 행렬곱으로 구성
  - 심층신경망, 합성곱신경망, 트랜스포머의 학습 및 추론에서 가장 큰 비중을 차지하는 것이 행렬곱

![image](https://user-images.githubusercontent.com/55765292/202167225-99cdee32-e97c-4eb8-9a2b-b2c24adc2b65.png){: .align-center}

<br>

### 행렬곱

- 현대 계산자원이 왜 행렬곱을 잘 하는가?
  - 가격대비 성능이 우수한 GPU가 왜 활용되는지를 이해
  - 이를 위해 병렬처리의 기본개념과 루프라인 모델 설명

![image](https://user-images.githubusercontent.com/55765292/202169195-094a2c28-7060-4719-9a2e-da814cf9bf1c.png){: .align-center}

<br>

### 폰노이만 아키텍처

![image](https://user-images.githubusercontent.com/55765292/202169485-849b9f85-a02f-497f-b359-8fc9145b41cc.png){: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/202169745-b858cfc5-779e-4d9f-a1da-626ea6ac730a.png){: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/202169944-e5299cee-a658-4ade-bbd2-189c5df81660.png){: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/202170157-05d7f869-7564-476e-9e4b-52883ef0983a.png){: .align-center}

<br>

## 암달의 법칙

![image](https://user-images.githubusercontent.com/55765292/202170854-c7a12872-0141-4921-adaa-214466aea537.png){: .align-center}

<br>

## AXPY

![image](https://user-images.githubusercontent.com/55765292/202171622-3cec201b-434e-4d1c-b38d-e1647206b3b2.png){: .align-center}

<br>

### AXPY의 계산 강도

![image](https://user-images.githubusercontent.com/55765292/202171817-84216373-7ea0-4f25-8dbe-e433fab941a7.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/202171922-cc57eca8-aa28-4172-b46f-ca8bcd96ae00.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/202171984-60204e95-7c17-4ab5-9979-c41ca44871d2.png){: .align-center}

<br>

## 행렬곱의 계산 강도

![image](https://user-images.githubusercontent.com/55765292/202172643-406c72c8-e852-4b6e-870f-57fc724ab981.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/202172664-eafb5e39-27b7-42f8-9e0f-9a96878fc6e3.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/202172696-7b8c6f2d-f728-4fef-8cd8-8c34f778858a.png){: .align-center}

<br>

## 계산 강도와 루프라인 모델

![image](https://user-images.githubusercontent.com/55765292/202173222-ef45cfdb-c0a7-4430-9616-19f4584edbea.png)

<br>

## 결론

- 행렬의 크기가 충분히 크다면
  - 모든 계산자원을 십분 활용할 수 있음
- 그러나 알고리즘이 행렬곱으로만 되어 있는 것은 아님
  - 거대 언어 모델의 경우 30% 수준의 이론성능 활용
    - 멀티헤드 어텐션 별로 병렬 처리가 유효
  - 구글의 PaLM이나 NVIDIA-MS의 MT-NLG는 SW최적화를 통해 이 수준을 끌어올림
