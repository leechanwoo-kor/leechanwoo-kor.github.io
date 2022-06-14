---
title: "[Ⅰ. Neural Networks and Deep Learning] Neural Networks Basics (2)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Neural Networks Basics (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Logistic Regression as a Neural Network

### Logistic Regression
로지스틱 회귀는 출력 $y$가 모두 $0$이거나 $1$일때 지도 학습 문제에 사용되는 학습 알고리즘이다. 로지스틱 회귀 분석의 목적은 예측과 훈련 데이터 사이의 오차를 최소화하는 것입니다.

예: Cat vs No -cat
특정 벡터 $x$로 표현되는 이미지가 주어지면, 알고리즘은 그 이미지에 고양이가 있을 확률을 평가할 것이다.

***Given*** $x,$ $\hat{y} = P(y=1\mid x)$ **, where** $0 ≤ \hat{y} ≤ 1$
{: .text-center}

로지스틱 회귀 분석에 사용되는 모수는 다음과 같습니다.
- 입력 특징 벡터: $𝑥∈ℝ^{𝑛_𝑥}$, where $n_x$ is the number of feature
- 훈련 레이블: $y∈0,1$
- 가중치: $w∈ℝ^{𝑛_𝑥}$, where $n_x$ is the number of feature
- 임계값: $b∈ℝ$
- 출력: $\hat{y}=\sigma(w^Tx+b)$
- 시그모이드 함수: $s=\sigma(w^Tx+b)=\sigma(z)=\frac{1}{1+e^{-z}}$

![image](https://user-images.githubusercontent.com/55765292/173469569-bb706d44-ebca-42e7-bafa-24578e27fec5.png)

$(w^Tx+b)$는 선형 함수 $(ax+b)$이지만, [0,1] 사이의 확률 제약을 찾고 있기 때문에 시그모이드 함수를 사용합니다. 함수는 위의 그래프에서와 같이 [0,1] 사이에 경계됩니다.

그래프의 일부 관측치:
- $z$가 큰 양수이면 $\sigma(z)=1$
- $z$가 작거나 큰 음수이면 $\sigma(z)=0$
- $z=0$이면 $\sigma(z)=0.5$


### Logistic Regression Cost Function
이전 포스팅에서 로지스틱 회귀 모델의 매개변수 w와 b를 훈련하기 위한 로지스틱 회귀 모델을 보았습니다. 비용 함수를 정의해야 하는데 비용 함수를 먼저 살펴보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/173470038-9e4553bc-4ab0-424a-aec3-3e1d82d5b779.png)










