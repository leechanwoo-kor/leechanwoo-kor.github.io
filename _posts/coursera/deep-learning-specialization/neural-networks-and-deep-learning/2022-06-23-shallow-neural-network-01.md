---
title: "[Ⅰ. Neural Networks and Deep Learning] Shallow Neural Networks (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Shallow Neural Networks (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Shallow Neural Networks

### Neural Network Overview
이번에는 신경망을 구현하는 방법을 다뤄보겠습니다. 기술적 디테일로 넘어가기 전에, 볼 내용에 대한 간략한 개요를 보여드리고자 합니다. 따라서 모든 디테일을 따라가지 못하더라도 걱정하지 마십시오. 다음에 기술적인 디테일에 대해 자세히 알아볼 것입니다. 지금은 신경망을 구현하는 방법에 대해 자세히 알아볼 것입니다.

![image](https://user-images.githubusercontent.com/55765292/175183139-b882c426-6d0e-4f01-be06-2d52da9fe14d.png)

지난 번에 로지스틱 회귀에서 모델이 계산 초안에 어떻게 대응하는지 확인했습니다. 그런 다음 특성 $x$ 및 매개변수를 배치합니다. $w$ 및 $b$를 사용하면 $z$를 계산할 수 있으며 이는 $a$를 계산하는 데 사용됩니다.
그리고 출력 $\hat{y}$과 상호 교환 가능하게 사용하면 손실함수 $L$을 계산할 수 있습니다.

신경망은 그림 아래와 같이 생겼습니다. 전에 말했듯이, 많은 작은 시그모이드 유닛을 함께 쌓아서 신경망을 형성할 수 있습니다. 이전에 이 노드가 두 단계를 계산하는 데 해당합니다. 첫 번째는 $z$ 값을 계산하는 것이고 두 번째는 이것을 $a$의 값으로 계산한다는 것이죠.

이 신경망에서, 처음 노드 스택은 $z$와 $a$를 계산합니다. 그런 다음 다음 노드에서는 다른 $z$과의 계산을 합니다.

따라서 나중에 소개할 표기법은 다음과 같습니다.

먼저 특성 $x$를 일부 매개변수 $w$ 및 $b$와 함께 입력하면 이를 통해 $z^{[1]}$를 계산할 수 있습니다. 그래서 우리는 소개할 새로운 표기법은 윗첨자 [1]을 사용하여 노드 스택과 관련된 양을 나타내는 것입니다.

이를 레이어라고 합니다.

그런다음 윗첨자 [2]를 사용하여 해당 노드와 관련된 수량을 나타냅니다. 이를 신경망의 또 다른 레이어라고 합니다. 윗첨자 대괄호는 개별 훈련 예제를 참조할 때 사용하는 윗첨자 괄호와 혼동하지 마십시오.

따라서 $x$개의 윗첨자 (i)가  i번째 훈련 예제를 참조하는 반면, 윗첨자 [1]과 [2]는 이러한 서로 다른 레이어 즉 신경망의 레이어 1과 레이어 2를 나타냅니다.

하지만 로지스틱 회귀와 유사하게 $z^{[1]}$를 계산한 후, $a^{[1]}$을 계산하기 위한 연산이 있을 것입니다. 
그것은 $z^{[1]}$의 시그모이드일 뿐이고 다른 선형 방정식을 사용하여 $z^{[2]}$를 계산한 다음 $a^{[2]}$를 계산합니다. 
$a^{[2]}$는 신경망의 최종 출력이며 $\hat{y}$와 상호 교환하여 사용할 수 있습니다.

많은 디테일인건 알지만 중요한 직관은 로지스틱 회귀의 경우 $z$ 뒤에 계산이 뒤따른다는 것입니다. 이 신경망에서는 여러번 반복하는 데요. $z$ 뒤에 계산을 하고 $z$ 뒤에 계산이 뒤따른다는 것이며, 마지막에 손실을 계산하게 됩니다.

로지스틱 회귀의 경우, 도함수를 계산하기 위해 또는 $da$, $dz$ 등을 계산할 때 역방향 계산을 수행했습니다. 따라서 같은 방식으로 신경망은 $da^{[2]}$, $dz^{[2]}$를 계산하고 $dw^{[2]}$, $db^{[2]}$를 계산하여 역방향 계산을 수행하게 됩니다.

빨간색 화살표로 표시하는 오른쪽에서 왼쪽으로 역방향 계산입니다. 이것은 신경망이 어떻게 생겼는지 간략하게 알 수 있습니다. 이것은 기본적으로 로지스틱 회귀를 취하고 두 번 반복합니다.

다음은 신경망 표현에 대해서 알아보겠습니다.


### Neural Network Representation
지금까지 신경망 그림을 몇 장 보셨을텐데요. 이번에는 이런 그림이 정확히 무엇을 의미하는지 이야기할 것입니다. 바꿔말하면 그렸던 신경망이 정확히 무엇을 나타내는지 말입니다. 그리고 단일 은닉층이라고 불리는 신경망의 사례에 초점을 맞춰 시작하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175185589-ed7c3fd4-a40b-443b-bd03-230accb235f0.png)

여기 신경망의 그림이 있습니다. 여기 이 그림의 일부분에 명칭을 부여하겠습니다. 입력 특징 $x1,x2,x3$이 이렇게 세로로 쌓여있는데요. 그리고 이것을 신경망의 입력층이라고 부릅니다. 따라서 여기에는 신경망에 대한 입력이 포함되어있다는 것은 놀라운 일이 아닙니다.

그리고 원의 레이어가 있습니다. 이것을 신경망의 은닉층이라고합니다. 은닉이라는 단어가 무엇을 의미하는지 잠시후에 설명드리겠습니다. 여기 최종 레이어는 단 하나의 노드로 구성되어 있는데요. 여기 이렇게 단일 노드층을 출력층이라고 하며 예측값 $\hat{y}$을 생성하는 역할을 합니다. 지도 학습과 함께 학습하는 신경망에서 학습 세트가 입력 $x$ 값과 목표 출력 $y$갑도 포함됩니다.

따라서 은닉층이라는 용어는 학습 세트에서 중간에 있는 노드의 실제 값이 관찰되지 않음을 나타냅니다. 즉, 학습세트에 무엇이 포함되어 있어야 하는지 알 수 없습니다. 입력값은 보이고, 또, 출력값도 보입니다. 하지만 은닉층에 있는 것들은 표시되지 않기 때문에 은닉층이라는 이름이 설명됩니다.

조금 더 많은 표기법을 보도록 합시다. 이전에는 벡터 $X$를 사용하여 입력 기능을 표시했는데요. 입력 기능 값에 대한 대체 표기법은 $a^{[0]}$가 됩니다. $a$라는 용어 또한 활성화를 의미하며 신경망의 다른 레이어가 다음 레이어로 전달하는 값을 뜻합니다. 그러므로 입력 레이어는 값 $x$를 은닉층에 전달하므로 입력층 $a^{[0]}$이라 부를 것입니다.

다음 레이어인 은닉층에는 차레로 몇 가지 활성화 세트를 생성할 텐데요. 이것은 $a^{[1]}$로 쓸 것입니다. 그래서 특히, 이 첫 번째 단위 아래 첨자 1을 생성합니다. 이 두 번째 노드에서도 값을 생성합니다.

그러면 $a^{[1]}$의 값은 파이썬에서 여러분이 원하는 4차원 벡터인데요. 왜냐하면 $4 \times 1$ 행렬 또는 4열 벡터이기 때문입니다. 그리고 이것은 4차원인데요. 이 경우에 이 은닉층에 4개의 노드, 4개의 유닛 또는 4개의 은닉 유닛을 가지고 있기 때문입니다.

마지막으로 오픈 레이어가 $a^{[2]}$ 값을 재생성합니다. 이 값은 그냥 실수입니다. 따라서 $\hat{y}$은 $a^{[2]}$의 값을 갖게 됩니다. 이것은 로지스틱 회귀에서 $\hat{y}$이 $a$인 경우인데요. 로지스틱 회귀에서 출력층이 하나만 있는 것과 유사하므로 윗첨자 대괄호를 사용하지 않습니다. 하지만 신경망에서는 윗첨자 대괄호를 사용하여 어떤 레이어에서 왔는지 명시적으로 나타냅니다.

신경망의 표기법에 대한 재미있는 점은 여기서 본 네트워크를 2개의 레이어 신경망이라고 한다는 것입니다. 그 이유는 신경망에서 레이어를 계산할 때 입력층을 계산하지 않기 때문입니다.

따라서 은닉층이 첫 번째 레이어고 출력층이 두 번째 레이어입니다. 그러면 표기법에서 입력층을 레이어 0이라고, 기술적으로는 이 신경망에 3개의 레이어가 있을 수 있습니다. 입력층, 은닉층 및 출력층이 있기 때문입니다.

하지만 일반적은 사용법에서 연구 논문과 다른 코스에서 보면 사람들이 이 특정 신경망을 2개의 레이어 신경망이라고 부르는 것을 볼 수 있습니다. 왜냐하면 우리는 입력층을 공식 레이어로 계산하지 않기 때문입니다.

마지막으로, 나중에 보겠지만 은닉층과 출력층에 각각 연관된 매개 변수가 있다는 것입니다. 은닉층은 연계된 매개 변수 $w$ 및 $b$와 연관됩니다. 그리고 윗첨자 [1]을 써서 이것이 은닉층이 있는 레이어 1과 관련된 매개 변수임을 나타냅니다.

나중에 보겠지만 $w$ $4 \times 3$행렬이고 $b$는 $4 \times 1$ 벡터임을 알 수 있습니다. 첫 번째 좌표 4는 은닉 유닛과 레이어의 4개 노드가 있다는 사실에서 비롯되고 3은 3개의 입력 특징이 있다는 사실에서 비롯됩니다. 이 행렬의 차원에 대해서는 나중에 이야기 하겠습니다.

그러나 일부 출력 레이어에서는 매개변수 $w^{[2]}$와 $b^{[2]}$와도 연관되어 있습니다. 그리고 각각의 치수는 $1 \times 4$, $1 \times 1$입니다. 이 $1 \times 4$는 은닉층에서 4개의 유닛을 가지고 있고 출력 레이어는 1개의 유닛만을 가지고 있기 때문입니다. 이후에 이러한 행렬과 벡터의 차원에 대해서 살펴보겠습니다.

지금까지 2개의 신경망이 어떻게 생겼는지 보셨습니다. 그것은 하나의 은닉층이 있는 신경망입니다. 다음에는 이런 신경망이 정확히 어떤 것을 계산하는지 알아보겠습니다. 그것이 신경망이 $x$를 입력하고 출력 $\hat{y}$를 계산하는 방법입니다.
