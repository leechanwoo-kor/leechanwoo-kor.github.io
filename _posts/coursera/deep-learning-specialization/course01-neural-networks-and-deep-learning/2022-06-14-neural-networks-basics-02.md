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

첫 번째 식은 이전에 정의한 내용으로 로지스틱 회귀를 훈련하는 데 사용할 수 있습니다. 따라서 이 출력하는 $\hat{y}$는 $w$의 행렬을 뒤바꿔서 계산한 식이면서 z의 시그모이드는 정의된 것과 같습니다.

따라서 모델에 대한 매개변수를 학습하기위해 훈련 예제를 제공 받았으며 매개 변수 $w$와 $b$를 찾는 것이 당연해 보입니다. 최소한 훈련 세트에서 출력이 훈련 세트에 대한 예측을 가질 수 있도록 하기 위해 이를 $\hat{y}^{(i)}$으로 쓸 것이며 이는 훈련 세트 내에서 얻은 레이블 $y^{(i)}$에 가까울 것입니다.

위에 있는 방정식에 대해 조금 더 상세히 알려드리자면, 훈련 예제 $x$에 대해 맨 위에 정의된 $\hat{y}$라고 말했습니다. 물론 각 훈련 예제에 대해서는 괄호 안에 괄호가 있는 상위 표기를 사용하여 서로 다른 훈련 예제로 인덱스를 작성합니다.

훈련 예제 i에 대한 예측인 $\hat{y}^{(i)}$는 시그모이드 함수를 취하고 훈련 예제에 대한 입력에 $b$를 더한 $w^Tx^{(i)}$에 적용하여 얻을 수 있습니다. 그리고 여기서 $z^{(i)}$는 $w^Tx^{(i)}+b$와 같이 정의할 수도 있습니다.

따라서 이 과정을 통해 우리는 $(i)$가 데이터를 참조하는 $x$ 또는 $y$ 또는 $z$라는 표기법을 사용할 것입니다.

이제 성능을 측정하기 위해 사용할 수 있는 **손실 함수** 또는 **오류 함수**에 대해 알아보겠습니다.

$L(\hat{y},y)=\frac{1}{2}(\hat{y}-y)^2$
{: .text-center}

할 수 있는 한 가지는 알고리즘이 $\hat{y}$를 출력하고 실제 레이블이 $y$일 때 손실은 제곱 오차 또는 1/2제곱 오차로 정의할 수 있습니다. 이것을 할 수 있다는 것이 밝혀졌지만 로지스틱 회귀에서 사람들은 일반적으로 이것을 하지 않습니다. 매개변수를 배우게 되면 나중에 이야기할 최적화 문제가 볼록하지 않게 된다는 것을 알 수 있기 때문입니다. 따라서 최적화 문제를 해결하기 위해 여러 로컬 최적화를 사용하게 됩니다.

손실 함수라고 불리는 $L$이 실제 라벨이 $y$일 때 출력 $\hat{y}$가 얼마나 좋은지 측정하기 위해 정의해야하는 함수라는 것입니다. 그리고 하강법이 잘 작동하지 않는다는 점을 제외하고는 합리적인 선택일 수 있을 것 같습니다.

따라서 로지스틱 회귀에서는 실제로 제곱오차와 비슷한 역할을 하지만 볼록한 최적화 문제를 제공하는 다른 손실 함수를 정의했습니다.

로지스틱 회귀에서 사용하는 것은 실제로 다음과 같은 손실 함수입니다. 

$L(\hat{y},y)=-(y\log{\hat{y}}+(1-y)\log{(1-\hat{y}}))$
{: .text-center}

이 손실 함수가 왜 이치에 맞는지 살펴보겠습니다. 제곱 오차를 사용하는 경우 제곱 오차가 가능한 한 작기를 원한다는 것을 명심하십시오. 그리고 이 로지스틱 회귀를 사용하면 손실된 함수도 가능한한 작아지기를 원할 것입니다.

이것이 왜 의미가 있는지 이해하기 위해서, 두 가지 사례를 사펴보죠.

첫 번째 경우에는 $y$가 $1$일 때 손실 함수를 보면 $-\log{\hat{y}}$입니다. $y$가 $1$이면 두 번째 항 $1$에서 $y$를 뺀 값은 $0$과 같기 때문에 $y$가 $1$이면 $-\log{\hat{y}}$이 가능한 한 작아야 한다는 뜻입니다.

즉, $\log{\hat{y}}$이 최대한 크게 되기를 원하는 것이고 $\hat{y}$이 커지기를 원한다는 것입니다. 하지만 $\hat{y}$는 시그모이드 함수이기 때문에 절대 $1$보다 클 수 없습니다.

따라서 이것은 $y$가 $1$과 같으면 가능한 한 크게 $y$를 원하지만 $1$보다 클 수는 없다는 뜻입니다.

다른 경우는 $y$가 $0$이면 손실 함수의 첫 번째 항은 $y$가 $0$이기 때문에 $0$이고 두 번째 항에서 손실 함수를 정의합니다. 따라서 손실 함수는 $-\log{(1-\hat{y})}$이 됩니다.

따라서 학습 절차에서 손실된 함수를 적게 만들려고 한다면 이것이 의미하는 바는 $\log{(1-\hat{y})}$이 크길 원한다는 것입니다. 그리고 비슷한 추론을 통해 이 손실 함수가 $\hat{y}$을 가능한 작게 만들려고 한다는 결론을 내릴 수 있습니다.

다시 $\hat{y}$은 $0$과 $1$사이에 있어야 하기 때문입니다. 즉, $y$가 $0$과 같으면 손실 함수가 매개변수를 푸쉬하여 $\hat{y}$를 가능한 한 $0$에 가까워지도록 합니다.

마지막으로 단일 훈련 예제에 대해 마지막 함수를 정의했습니다. 그것은 단일 훈련 예제에서 여러분이 얼마나 잘 작동하는지를 측정합니다. 이제 전체 훈련 세트에서 어떻게 하고 있는지 측정하는 **비용 함수**라는 것을 정의할 것입니다.

$J(w,b)=\frac{1}{m} \displaystyle\sum_{i=1} ^{m} L(\hat{y}^{(i)},y^{(i)})=-\frac{1}{m} \displaystyle\sum_{i=1} ^{m} [y^{(i)}\log{\hat{y}^{(i)}}+(1-y^{(i)})\log{(1-\hat{y}^{(i)})}]$
{: .text-center}

따라서 매개 변수 $w$, $b$에 적용되는 비용 함수 $J$는, 평균이 될 것이며, 손실 함수의 합인 $m$ 중 하나는 각 훈련 예제에 적용됩니다. 그 다음으로 $\hat{y}$은 특정 매개변수 $w$와 $b$를 사용하는 로지스틱 회귀 알고리즘에 의한 예측 결과 입니다. 그래서 이것을 확장하면 이것은 그 중 $-1$과 같고 $i$의 일부는 위의 손실 함수의 정에서 $1$과 같습니다.

그래서 손실 함수는 단일 훈련 예제에만 적용된다는 것입니다. 마찬가지로 비용 함수는 매개변수의 비용이므로 로지스틱 회귀 모델을 훈련할 때 매개 변수 $w$와 $b$를 찾으려고 합니다. 따라서 아래에 작성된 전체 비용 함수 $J$를 최소화 할 수 있습니다.

---

![image](https://user-images.githubusercontent.com/55765292/173479226-c8c7b7a7-258b-4b34-89aa-0c1a5bb97cc3.png){: .align-center}

지금까지 로지스틱 회귀 알고리즘의 설정, 훈련 예제의 손실 함수 및 알고리즘 매개변수에 대한 전체 비용 함수를 살펴보았습니다. 로지스틱 회귀는 아주아주 작은신경망으로 볼 수 있겠습니다. 다음에는 이 로지스틱 회귀를 아주 작은 신경망으로 보는 방법에 대해 보겠습니다.