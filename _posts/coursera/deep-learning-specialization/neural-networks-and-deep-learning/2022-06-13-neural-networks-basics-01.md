---
title: "[Ⅰ. Neural Networks and Deep Learning] Neural Networks Basics (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Neural Networks Basics (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Logistic Regression as a Neural Network

### Binary Classification
이번 포스팅에서는 신경망 프로그래밍의 기초에 대해 알아보도록 하겠습니다. 신경망을 구현할 때는 매우 중요한 몇 가지 기술이 있습니다. 예를 들어, $m$개의 훈련 예제를 가진 훈련 세트가 있으면, 훈련 예제에 대해서 for문을 돌리면서 하나씩 훈련 세트를 처리 해 왔을 것입니다. 하지만 신경망을 구현할 때는 일반적으로 전체 훈련 세트를 반복하기 위해 for문을 사용하지 않고 처리하고자 합니다. 따라서 이번 포스팅에서 그 방법을 알게 될 것입니다.

또 다른 아이디어는 신경망의 계산을 구성할 때 일반적으로 순방향 전달(forward pass) 또는 순방향 전파(forward propagation) 단계 그 다음에는 역방향 전달(backward pass) 또는 역방향 전파(backward propagation) 단계라는 것이 있습니다. 그래서 이번 포스팅에서는 신경망 학습의 계산이 왜 전파가 되는지와 왜 역방향 전파가 되는지에 대해 소개하도록 하겠습니다.

이 포스팅에서 이해를 돕고자 로지스틱 회귀를 통해 아이디어를 전달하려 합니다. 하지만 예전에 로지스틱 회귀에 대해서 들어보셨을지라도, 이 포스팅에서 몇 가지 새롭고 흥미로운 아이디어를
얻을 수 있을 것이라고 생각합니다. 그럼 시작해보도록 합시다.

![image](https://user-images.githubusercontent.com/55765292/173289066-8343da2d-e5bc-46bc-9a0a-a1f3fb674efa.png)


로지스틱 회귀는 이진 분류를 위한 알고리즘입니다. 문제를 통해 이야기해 보도록 합시다. 여기 예로 이진 분류 문제가 하나 있습니다. 여기와 같이 입력 이미지가 있습니다. 이미지를 인식하기 위해서 고양이일 때에는 $1$로, 고양이가 아닐 때는 $0$으로 레이블을 출력하려 합니다. 그리고 출력 레이블을 나타내기 위해 $y$를 사용하도록 하겠습니다.

이미지는 컴퓨터에서 어떻게 표현되는지 살펴 보겠습니다. 이미지를 저장하기 위해서 컴퓨터는 각각 빨간색, 녹색, 파란색 채널에 해당하는 세 개로 분리된 행렬을 사용합니다. 따라서 입력 이미지가 64 x 64 픽셀인 경우 빨간색, 녹색, 파란색 픽셀의 채도값에 해당하는 3개의 64 x 64 행렬이 있을 것입니다. 이 작은 슬라이드를 만들기 위해 훨씬 더 작은 행렬로 그렸지만 실제로는 64 x 64가 아닌 5 x 4 행렬입니다. 이 픽셀들의 채도값을 특징 벡터로 바꾸기 위해 여기 픽셀값 모두를 하나의 입력 특징 벡터 $x$에 펼쳐 보았습니다. 모든 픽셀 채도값을 특징 벡터에 나열하기 위해서 다음과 같이 이 이미지에 해당하는 특징 벡터 $x$를 정의해 봅시다.

![image](https://user-images.githubusercontent.com/55765292/173293274-a13bc777-7854-4ee8-876f-661cefd69f90.png){: .align-center}

우리는 모든 픽셀 값 255, 231 등을 취할 것입니다. 255, 231, 이런식으로 빨간색 픽셀값 모두를 나열합시다. 그리고 결국 255, 134, 255, 134 등등 이 이미지의 모든 빨강, 초록, 파랑 픽셀 채도값을 나열하는 긴 특징 벡터를 얻을 때까지 계속합니다. 이 이미지가 64 x 64 이미지인 경우 이 벡터 $x$의 전체 차원은 64 x 64 x 3이 될 것입니다. 왜냐하면 이 모든 행렬에서 우리가 가지고 있는 총 숫자이기 때문입니다. 이 경우에는 12,288이 되겠고 여기 모든 숫자를 곱하면 얻을 수가 있습니다. 그래서 $n_x=12,288$을 사용하여 입력 특징 $x$의 차원을 나타낼 것입니다. 그리고 때때로 간결하게 입력 특징 벡터의 차원을 나타내기 위해 소문자 $n$을 쓰겠습니다.

따라서 이진 분류에서 우리의 목표는 이 특징 벡터 $x$로 표현되는 이미지를 입력할 수 있는 분류기를 배우는 것입니다. 그리고 해당 레이블 $y$가 $1$인지 $0$인지 즉, 고양이 이미지인지 고양이가 아닌 이미지인지 예측합니다. 앞으로 이 강의에서 사용하게 될 몇 가지 표기법을 정리해 보겠습니다.

---

#### Notation

![image](https://user-images.githubusercontent.com/55765292/173308708-f00e6cf4-ec22-493e-b8e2-5630d1d9f0fc.png)

하나의 훈련 표본은 $(x,y)$쌍으로 표기되며 여기서 $x$는 $x$차원을 가진 특징 벡터이고 $y$는 $0$ 혹은 $1$중에 하나의 값을 가지는 레이블입니다. 훈련 세트는 소문자 $m$ 훈련 예제로 구성되어 있습니다. 그래서 당신의 훈련 세트는 $(x^{(1)}, y^{(1)})$로 작성될 것이며 이는 첫 번째 훈련 예제 $(x^{(2)}, y^{(2)})$의 입력값과 출력값이며 마지막 훈련 표본 $(x^m, y^m)$으로 적을 수가 있습니다. 그리고 그것은 모두 당신의 전체 훈련 세트입니다.

훈련 예제의 수를 나타내기 위해 소문자 $m$을 사용하도록 하겠습니다. 그리고 가끔 훈련 예제의 숫자임을 강조하기 위해 이것을 $m=m_{train}$ 으로 적도록 하겠습니다. 그리고 테스트 세트를 이야기할 때 테스트 예제의 수를 나타내기 위해 $m_{test}$를 사용할 수도 있습니다. 그래서 이것이 테스트 예제의 수입니다.

마지막으로 모든 훈련 예제를 더욱 간결한 표기법으로 출력하기 위해서 대문자 $X$로 행렬을 정의하겠습니다. 이 행렬은 훈련 세트 입력값들 $x^{(1)}, x^{(2)}$ 등을 가져와서 열로 입력값들을 쌓은 것입니다 그래서 $x^{(1)}$을 가져와서 여기 행렬의 첫번째 열에 놓고 $x^{(2)}$는 두번째 열, 이런식으로 $x^{(m)}$까지 놓겠습니다. 그러면서 행렬 $X$가 만들어지겠습니다. 따라서 이 행렬 $X$는 $m$개의 열을 가질 것이며 m은 훈련 예제의 수와 훈련의 수를 나타내고, 이 행렬의 높이는 $n_x$입니다. 다른 원인에서는 행으로 훈련 예제를 쌓아 정의된 행렬 $X$를 보실 수 있습니다 $x^{(1)}$ 전치시키고, 아래로 가서 $x^{(m)}$까지 전치시키는 식으로 말입니다. 하지만 신경망을 구현할 때는 왼쪽에 있는 이 규칙을 사용하면 구현이 훨씬 쉬워집니다.

그래서 요약하면, $X$는 $n_x$ x $m$차원을 가진 행렬이고, 파이썬을 코딩할 때 나오는 X.shape는 행렬의 형태를 알기 위한 파이썬 명령어이고 $(n_x, m)$이라는 것을 알 수 있습니다. 따라서 그것은 단순히 $n_x$ x $m$차원의 행렬이라는 것을 의미합니다. 이것이 훈련 예제를 그룹화하고 $x$를 행렬에 입력하는 방법입니다.

그렇다면 출력 레이블 $Y$는 어떻게 할까요? 신경망을 좀 더 쉽게 구현할려면 $Y$도 열로 해서 쌓는 것이 더 편리합니다. 그래서 우리는 대문자 $Y$를 $y^{(1)}, y^{(2)}$와 동일하게 $y^{(m)}$까지 정의하려고 합니다. 그러면 여기 있는 $Y$는 $1$ x $m$ 차원 행렬이 됩니다. 그리고 다시 파이썬에서 Y.shape로 보면 $(1, m)$이 되겠죠. 즉, 이것은 $1$ x $m$ 행렬임을 의미합니다. 그리고 이 과정의 후반부에서 신경망을 구현하면 유용하다는 것을 알게 될 것입니다. 규칙은 다른 훈련 예제와 관련된 데이터를 적용시키는 것이며 여기서 데이터는 $x$ 또는 $y$ 또는 나중에 다룰 데이터의 양입니다. 그러나 여기에서 $x$와 $y$에 대해 수행한 것처럼 다른 훈련 예제와 관련된 자료 또는 데이터를 가져와서 다른 열에 쌓는 방식으로 진행합니다. 따라서 그것은 로지스틱 회귀에 사용할 표기법입니다. 다음에는 이 표기법을 사용하여 로지스틱 회귀를 도출하는 법을 다루겠습니다.

### Logistic Regression

이제 로지스틱 회귀에 대해 알아보겠습니다. 이것은 지도 학습 문제에서 결과값 레이블 $y$가 $0$ 이거나 $1$ 인 경우 사용하는 학습 알고리즘입니다. 즉 이진 분류 문제의 경우이죠.

![image](https://user-images.githubusercontent.com/55765292/173308859-befab9c9-eddf-403b-b3d5-f0fa12a3abcb.png)

입력 특성 벡터 $x$가 고양이이거나 고양이가 아닌것으로 인식하려는 이미지에 해당하는 경우 결과값을 예측하는 알고리즘이 필요할 것입니다. 이것을 $\hat{y}$ (y hat) 이라고 하고 이것은 y의 추청치입니다. 공식적으로는, $\hat{y}$이 입력 특성 $x$를 감안할 때 $y$가 $1$과 같을 확률이 되기를 원합니다.

다시 말해서, $x$가 사진이라면 지난 번에 보았듯이 $\hat{y}$이 말해주는 것이 좋습니다.

>이것이 고양이 사진일 확률이 얼마나 되는가?

를 말이죠.

그래서 $x$는, 이전에 말했듯이 로지스틱 회귀의 매개 변수가 실수인 $b$와 함께 $x$ 차원 벡터이기도 한 $w$가 될 것이라는 점을 감안할 때 $x$ 차원 벡터입니다 그러므로, 입력값 $x$와
매개변수가 $w$와 $b$인 경우 $\hat{y}$ 결과값은 어떻게 생성할까요?

시도할 수 있는 방법은, 물론 안되겠지만, $\hat{y}$은 입력 $x$의 선형 함수의 일종인 $w^Tx+b$ 입니다. 그리고 실제로 이것은 선형 회귀를 수행하는 경우에 사용합니다. $\hat{y}$이 $y$가 $1$과 같은 확률이 되기를 원하기 때문에 이진 분류를 위한 아주 좋은 알고리즘은 아닙니다.

결과적으로 $\hat{y}$이 $0$에서 $1$사이에 있어야 하는데 $w^Tx+b$가 $1$보다 훨씬 클 수 있거나 음수일 수도 있기 때문에 이를 적용하기는 어렵습니다 이는 확률에 맞지 않기 때문입니다 그것이 여러분이 0과 1 사이가 되기를 바라는 것입니다.

따라서 로지스틱 회귀에서 우리의 출력은 대신 $\hat{y}$이 될 것이며 이 수량에 적용된 시그모이드 함수와 같습니다. 시그모이드 함수는 그림과 같이 생겼습니다. 가로축에 Z를 넣으면 0부터 1까지 부드럽게 진행됩니다. 이는 세로축 0.5에서 교차합니다 $z$의 시그모이드 함수는 이렇습니다. 이 양을 나타내기 위해 $z$를 사용할 것입니다. $w^Tx+b$.

다음은 시그모이드 함수의 공식입니다. $z$가 실수인 $z$의 시그모이드함수는 $\sigma(z)=\frac{\mathrm{1}}{\mathrm{1}+e^{-z}}$입니다. 따라서 몇 가지 사항에 유의하십시오. 만약 $z$의 값이 매우 크면 $e$의 $-z$승은 $0$에 가까울 것입니다. $z$의 시그모이드는 대략 $\frac{1}{1+0}$에 가까운 값일 것입니다. 왜냐하면 매우 큰 수의 음수에 대한 $e$는 $0$에 가까울 것이기 때문입니다. 그러므로 이 값은 $1$에 가깝죠. 실제로 그림을 보시면 $z$ 값이 매우 크면 $z$의 시그모이드는 $1$과 매우 가깝습니다.

반대로 $z$값이 작거나 또는 아주 큰 음수인 경우 $z$의 시그모이드는 $1$에 $1+e^{-z}$이 되고 이 값은 아주 큰 값이 됩니다. 그래서 $1$에 아주 아주 큰 숫자를 더한다고 생각하면됩니다. $0$에 가까운 값이 되겠죠. 그러면 $z$값이 매우 큰 음수가 되면서 $z$의 시그모이드 $0$에 가까운 값이 됩니다.

그러므로 로지스틱 회귀를 구현할 때 해야 할 일은 매개변수 $w$와 $b$를 학습하여 $\hat{y}$이 $y$가 $1$일 가능성에 대한 좋은 추정치가 되도록 하는 것입니다.

---

넘어가기에 앞서, 표기법에 대한 또 다른 참고 사항입니다. 신경망을 프로그래밍할 때 $w$와 $b$ 매개변수를 따로 다룰텐데요. 여기서 $b$는 스펙트럼 간 대응입니다. 다른 코스에서 이 표기법을 다르게 처리하는 경우를 보셨을 수도 있습니다. 간혹, $x_0$이라는 추가 특성을 정의해서 이 값을 1로 만들어주는데요. 이 경우 $x$는 $\mathbb{R}^{n_x+1}$에 속합니다. 그 다음에 $\hat{y}$은 $\sigma(\theta ^Tx)$ 와 같도록 정의합니다. 이 대체 표기법 규칙에서 벡터 매개 변수 $\theta$인 $\theta_0, \theta_1, \theta_2$ 아래로 $\theta_{n_x}$가 있습니다.

따라서 $\theta_0$, 행에 $b$를 배치합니다. 그것은 단지 실수일 뿐이고 $\theta_1$ 부터 $\theta_{n_x}$까지는 $w$의 역할을 합니다. 여러분이 신경망을 구현할 때 $b$와 $w$를 별도의 매개 변수로 유지하는 것이 더 쉬울 것입니다. 이번 포스팅에서는 위 빨간색으로 적은 표기법은 쓰지 않도록 하겠습니다. 이전에 다른 코스에서 이런 표기법을 본 적이 없다면 신경 쓰실 필요 없습니다. 이 표기법을 본 여러분을 위해서 이 코스에서는 이 표기법을 사용하지 않는다는 것을 알려드립니다. 이전에 본 적이 없다면 중요하지 않기 때문에 걱정하지 않으셔도 됩니다.

지금까지 여러분은 로지스틱 회귀 모델이 어떻게 생겼는지 살펴보았습니다. 다음은 매개변수 $w$와 $b$를 변경하기 위해 비용함수를 정의해야 합니다.

