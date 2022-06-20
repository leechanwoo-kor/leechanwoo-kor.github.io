---
title: "[Ⅰ. Neural Networks and Deep Learning] Neural Networks Basics (8)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Neural Networks Basics (8)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Python and Vectorization

### Vectorizing Logistic Regression
지금까지 벡터화를 통해 코드 속도를 크게 높일 수 있는 방법에 대해 설명했습니다. 이번에는 로지스틱 회귀 구현을 벡터화하여 전체 훈련 세트를 처리할 수 있는 방법에 대해 이야기할 것입니다.

즉 명시적 for 루프를 사용하지 않고도 전체 훈련 세트와 관련하여 단일 등급의 기울기 하강을 구현할 수 있습니다. 나중에 신경망에 대해 이야기 할 때 단 하나의 명시적 for 루프도 사용하지 않습니다. 그럼 시작해보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/174506462-cb4457d2-2433-466b-8651-5810e928f5e8.png)

먼저 로지스틱 회귀의 네 가지 전파 단계를 살펴보겠습니다. $m$ 훈련 예제가 있는 경우 첫 번째 예제를 예측하려면 $z$를 계산해야 합니다. 위의 익숙한 공식을 써서 말이죠. 그리고 활성함수를 계산한 다음 첫 번째 예제에서 $\hat{y}$를 계산합니다.

두 번째 훈련 예제에 대해 예측을 수행하고 그것을 계산해야 합니다. 그런 다음 세 번째 예제에서 예측을 하려면 이를 계산하는 식으로 진행해야 합니다. 그리고 $m$ 훈련 예제가 있는 경우 이 작업을 $m$번 수행해야 할 수도 있습니다.

따라서 4개의 전파 단계를 수행하기 위해 즉 $m$ 훈련 예제에서 이러한 예측을 계산하기 위해 명시적 for 루프가 필요 없이 그렇게 하는 방법이 있습니다. 어떻게 할 수 있는지 봅시다.


먼저, 행렬 대문다 $X$를 쌓아 올려 훈련 입력으로 정의했다는 것을 보면 이것은 행렬 즉 $n_x$ x $m$ 행렬입니다. 그래서 이것을 파이썬 넘파이 모양으로 쓰고 있으며 `(n_x, m)` 이것은 $X$가 $n_x$ x $m$ 차원 행렬임을 의미합니다.














