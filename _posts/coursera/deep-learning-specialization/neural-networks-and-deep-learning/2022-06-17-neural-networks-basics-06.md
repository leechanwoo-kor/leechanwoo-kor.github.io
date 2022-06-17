---
title: "[Ⅰ. Neural Networks and Deep Learning] Neural Networks Basics (6)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Neural Networks Basics (6)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Logistic Regression as a Neural Network

### Logistic Regression Gradient Descent
이번에는 로지스틱 회귀에 대한 기울기 하강을 구현하기 위해 도함수를 계산하는 방법에 대해 다뤄보겠습니다. 여기서 가장 중요한 부분은 무엇을 구현하느냐 입니다. 즉, 로지스특 회귀를 위한 기울기 하강을 구현하는 데 필요한 핵심 방적식입니다.

계산 그래프를 이용하여 이 계산을 하려고 합니다. 계산 그래프를 사용하는 것은 로지스틱 회귀에 대한 기울기 하강을 유도하는 데 약간 과도하다는 것을 인정해야 하지만 여러분이 이러한 아이디어에 익숙해지도록 이러한 방식으로 설명을 시작하고자 합니다.

본격적인 신경망에 대해 이야기할 때 조금 더 이해가 되시길 바랍니다. 그러면 이제 로지스틱 회귀분석을 위한 기울기 하강에 대해 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/174207344-c5e1fd21-e62d-4065-b545-a688c676c3f2.png)

요약하자면, 로지스틱 회귀를 그림과 같이 설정했었는데요. $\hat{y}$은 $a = \sigma(z)$로 정의됩니다. 여기서 $z$는 $w^Tx + b$입니다. 현재 한 가지 예제에 초점을 맞추면 손실 또는 그 한 가지 예에 대해 다음과 같이 정의됩니다.

$L(a,y) = -(y\log{(a)} + (1-y)\log{(1-a))}$
{: .text-center}

여기서 $a$는 로지스틱 회귀의 출력이고 $y$는 기준 값 레이블입니다. 이것을 계산 그래프로 작성하고 이 예에서는 $x_1$과 $x_2$라는 두 가지 기능만 있다고 가정해 보겠습니다.

$z$를 계산하려면 특성 값 $x_1,x_2$ 외에도 $w_1,w_2$ 및 $b$를 입력해야 합니다. 이러한 것들은 계산 그래프에서 $z$를 계산하는 데 사용됩니다. $z = w_1x_1 + w_2x_2 + b$이며 그 주위에 직사각형 상자가 있습니다.

그런 다음 $\hat{y}$ 또는 $a = \sigma(z)$를 계산합니다. 이것이 계산 그래프의 다음 단계 입니다.

마지막으로 $L(a,y)$를 계산하면 공식은 적지 않겠습니다. 로지스틱 회귀에서 우리가 원하는 것은 이 손실을 줄이기 위해 매개변수 $w$와 $b$를 수정하는 것입니다. 우리는 실제로 어떻게 도함수 공식을 제공할 것인지에 대한 단일 훈련 예제에서 손실을 계산하고 이제 도함수를 계산하기 위해 역방향으로 이동할 수 있는 방법에 대해 살펴보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/174207363-5d0cd927-485b-4395-a107-e03c31b3bbb9.png)






















