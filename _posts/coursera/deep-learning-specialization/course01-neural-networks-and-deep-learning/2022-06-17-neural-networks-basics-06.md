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

여기 다이어그램의 정리된 버전이 있습니다. 이 손실에 대한 도함수를 계산하는 것이기 때문에 뒤로 갈 때 가장 먼저 하고 싶은 것은 이 변수 $a$에 대한 스크립트에 대한 이 손실의 도함수를 계산하는 것입니다.

그렇기 때문에 여기 코드에서 $da$를 이용해 변수를 나타내는데요. 만약 여러분이 미적분학과 익숙하다면 다음과 같이 보여줄 수 있습니다.

$da = \cfrac{dL(a,y)}{da} = -\cfrac{y}{a} + \cfrac{1-y}{1-a}$
{: .text-center}

그리고 그렇게 하는 방법은 손실에 대한 공식을 취하고 미적분학에 익숙하다면 변수, $a$와 관련하여 도함수를 계산할 수 있으며 이 공식을 얻을 수 있습니다. 이제 $da$의 양을 계산했는데요. 그리고 최종 $\alpha$ 변수를 $a$에 대해서 도함수를 구했습니다. 그러면 뒤로 이동할 수 있습니다.

이제 여러분은 $dz$를 보여줄 수 있는데요. 이것은 변수 이며 손실의 도함수가 될 것입니다. $z$ 또는 $L$의 경우 $a$와 $y$를 포함한 손시을 매개 변수로 명시적으로 쓸 수 있습니다. 두 가지 유형의 표기법 모두 동일하게 허용됩니다. 우리는 이것이 $a -y$와 같다는 것을 보여줄 수 있습니다.

$dz = \cfrac{dL}{dz} = \cfrac{dL(a,y)}{dz} = a - y = \cfrac{dL}{da} \cdot \cfrac{da}{dz}$

위의 식을 본다면 방정식이 $a - y$로 단순화된다는 것을 보여줄 수 있습니다. 그것이 공식을 도출해내는 방법이며 이것이 실제로 그 형식에서 잠시 벗어난 연쇄 규칙이라는 것입니다. 미적분에 익숙하신 분이라고 하면 이 계산을 한번 더 해보십시요. 그렇지 않더라도 $dz$를 $a - y$로 계산할 수 있으며 이는 이미 그 미적분을 수행했다는 것입니다.

그런 다음 해당 계산의 마지막 단계는 $w$와 $b$를 얼마나 변경해야 하는지 계산하는 것 입니다. 

$\cfrac{dL}{dw_1} = dw_1 = x_1 \cdot dz$

$\cfrac{dL}{dw_2} = dw_2 = x_2 \cdot dz$

$\cfrac{dL}{db} = db = b \cdot dz$

이 한 가지 예제와 관련하여 기울기 하강을 하고 싶다면 이렇게 하면 됩니다. $dz$를 계산한 다음 위 공식을 사용하여 $dw_1,dw_2$ 및 $db$를 계산한 다음 이러한 업데이트를 수행합니다.

$w_1 := w_1 - \alpha \cdot dw_1$

$w_2 := w_2 - \alpha \cdot dw2$

$b := b - \alpha$

따라서 이것은 하나의 예제에 대해 등급의 한단계가 될 것입니다.

단일 훈련 예제와 관련하여 도함수를 계산하고 로지스틱 회귀를 위한 기울기 하강을 구현하는 방법을 볼 수있습니다. 그러나 훈련 로지스틱 회귀 분석 모델에서는 $m$ 훈련 예제 집합이 주어진 하나의 훈련 예제만 있는 것이 아닙니다. 다음에는 이러한 아이디어를 하나의 예제뿐만 아니라 전체 훈련 세트에서 학습에 어떻게 적용하는 방법을 살펴보겠습니다.


### Gradient Descent on m Examples
로지스틱 회귀에 대한 하나의 훈련 예제와 관련하여 도함수를 계산하고 기울기 하강을 구현하는 방법을 살펴보았습니다. 이제 $m$개의 훈련 예제에 대해 수행하려고 합니다. 시작하기 위해 비용 함수 $J$에 정의를 상기시켜 보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/174223321-b241ff1b-fe4f-4f01-9e95-8ba73fac5362.png)

이전에 보여드린 내용은 단일 훈련 예제에 대한 것이며 단 하나의 훈련 예제가 있을 때 도함수를 계산하는 방법입니다. 그래서 $dw_1, dw_2$ 및 $db$에는 이전과 수행한 것과 동일한 값을 나타내는 윗첨자 $i$가 있습니다.

이제 전체 비용 함수의 합계가 실제로 평균이라는 것을 알 수 있습니다. 개별 손실의 $\cfrac{1}{m}$ 항이기 때문입니다.

따라서 전체 비용 함수의 $w_1$에 대한 도함수는

$\cfrac{d}{dw_1}J(w,b) = \cfrac{1}{m} \displaystyle\sum_{i=1}^{m} \cfrac{d}{dw_i} L(a^{(i)},y^{(i)})
{: .text-center}

과 같이 될 것입니다. 도함수의 평균인 더 많은 함수가 있을 수 있습니다. 그러나 이전에 이항을 $dw_1^{(i)}로 계산하는 방법을 이미 보여주었고 이전에 단일 훈련 예제를 사용하여 이항을 계산하는 방법을 보여줬습니다.

따라서 여러분이 해야할 일은 앞의 훈련 예제에서 보듯이 실제로 이러한 도함수를 계산하고 평균을 내는 것입니다. 그러면 기울기 하강을 구현하는 데 사용할 수 있는 전체 기울기가 제공됩니다.

그래서 그것이 많은 세부사항이었다는 것을 압니다. 그러나 기울기 하강 작업으로 로지스틱 회귀를 구현해야 할 때 까지 이 모든 것을 정리하고 구체적인 알고리즘으로 마무리하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/174223374-414f8268-adf5-45d5-9cea-91ec8e991dbb.png)

그러므로 이제 할 수 있는 일은 다음과 위 식과 같습니다. $j=0,dw_1=0,dw_2=0,db=0$으로 초기화합니다. 이제 훈련 세트에 대한 for 루프를 사용하고 각 훈련 예제에 대한 도함수를 계산한 다음 더하면 됩니다.

$i$는 $1$에서 $m$까지이기 때문에 $m$은 훈련 예제의 수이고 
$z^{(i)} = w^Tx^{(i)} + b$와 같다고 계산합니다. 
예측값 $a^{(i)}$는 
$\sigma{(z^{(i)})}$와 같고 
그리고 $J$는 
$J += -[y^{(i)}\log{a^{(i)}} + (1-y^{(i)})\log{(1-a^{(i)})}]$로 나타낼 수 있습니다.

그리고 앞서 보았던 것처럼 $dz^{(i)}$가 있고, 이는 $a^{(i)}$에서 $y^{(i)}$를 뺀 것과 같으며 
그리고 $dw_1 += x_1^{(i)}dz^{(i)}$와 같으며 $dw_2 += x_2^{(i)}dz^{(i)}$ 이며 두 가지 함수만 있다고 가정하여 계산을 하고 있습니다.

$n$은 $2$와 같고, 그렇지 않으면 $dw_1$에 대해 $dw_2, dw_3, ..$ 등등 같은 작업을 진행합니다. 그리고 나서 $db += dz^{(i)}$로 for 루프의 끝이 납니다.

마지막으로, 모든 $m$개의 훈련 예제에 대해 이 작업을 수행한 후에도 평균을 계산하는 중이므로 $m$으로 나누어야 합니다. 이는 평균을 계산하기 위한겁니다.

그래서 이 모든 계산들을 통해 각 매개변수 $w_1,w_2$ 및 $b$에 대해 비용함수 $J$의 도함수를 계산했습니다.

---

우리가 하고 있는 일에 대한 몇가지 세부 사항은 $dw_1$과 $dw_2$및 $db$를 누산기로 사용하므로 이 계산 후, $dw_1$은 $w_1$에 대한 전체 비용 함수의 도함수와 같고 $dw_2$와 $db$에 대해서도 마찬가지 입니다. 따라서 $dw_1$과 $dw_2$에 윗첨자 $i$가 없으며 그 이유는 여기 코드에서 전체 훈련 세트를 합산하는 누산기로 사용하기 때문입니다.

반면에, 여기서 $dz^{(i)}$는 단 하나의 훈련 예제에 관련하여 $dz$였습니다. 컴퓨터화된 하나의 훈련 예제인 $i$를 참조하기 위해 윗첨자 $i$가 있는 겁니다.

따라서, 이 모든 계산들을 마친 후 기울기 하강의 한 단계를 구현하기 위해

$w_1 := w_1 - \alpha \cdot dw_1$

$w_2 := w_2 - \alpha \cdot dw_2$

$b := b - \alpha \cdot db$

로 계산됩니다.

마지막으로, $J$는 비용 함수에 대한 값입니다. 모든 항목은 한 단계만 기울기 하강을 하므로 여러 단계 기울기 하강을 하려면 모든 항목을 여러번 반복해야 합니다. 이러한 세부 사항이 너무 복잡해 보이더라도 직접 프로그래밍 해보면서 구현하면 더 명확해질 것입니다.

하지만 여기서 구현한 계산에는 두 가지 약점이 있는데 즉, 이러한 방식으로 로지스틱 회귀를 구현하려면 두 개의 for 루프를 작성해야 합니다.

첫 번째 for 루프는 $m$ 훈련 예제에 대한 for 루프이며 두 번째 for 루프는 여기 모든 함수에 대한 for 루프입니다. 그럼, 이 예제에서는 두 개의 함수만 있습니다. $n$은 $2$이고, $x$는 2와 같습니다.

하지만 개별 손실 항이 늘어나면 $w_1,w_2,w_3,...,w_n$에 대한 계산이 필요하여 함수 n개에 대한 for 루프가 필요하게 됩니다.

딥러닝 알고리즘을 구현할 때 코드에 for 루프가 명시되어 있으면 알고리즘 실행 효율성이 떨어집니다. 딥러닝 시대에는 점점 더 큰 데이터셋으로 이동하고 있기 때문에 명시적 for 루프를 사용하지 않고 알고리즘을 구현할 수 있다는 것은 매우 중요하며 훨씬 더 큰 데이터셋으로 확장할 수있습니다.

즉, 벡터화 기법이라고 불리는 기술들이 있어 코드에서 이러한 명시적 for 루프를 제거할 수있습니다. 딥 러닝이 등장하기 전인 딥 러닝 이전 시대에는 벡터화가 좋은 방식이었죠. 가끔은 코드를 빠르게 하기 위해 할 수도 있고 그렇지 않을 수도 있었습니다.

그러나 딥 러닝 시대에는 이와 같은 for 루프를 제거하는 벡터화가 매우 중요해졌습니다. 왜냐하면 매우 큰 데이터 셋에 대해 점점 더 많은 훈련을 하고 있고 따라서 매우 효율적인 코드가 필요합니다.

다음은 벡터화와 단일 for 루프를 사용하지 않고 이 모든 것을 구현하는 방법에 대해 이야기 해보겠습니다. 따라서 로지스틱 회귀를 위한 로지스틱 회귀 또는 기울기 하강을 구현하는 방법을 감지하시기 바랍니다. 프로그래밍 연습을 실시하면 상황이 더 명확해질 것입니다.

하지만 실제로 프로그래밍 연습을 하기 전에 이 모든 것을 구현할 수 있도록 벡터화에 대해 이야기하고 for 루프를 사용하지 않고 기울기 하강의 단일 반복을 구현할 수 있습니다.