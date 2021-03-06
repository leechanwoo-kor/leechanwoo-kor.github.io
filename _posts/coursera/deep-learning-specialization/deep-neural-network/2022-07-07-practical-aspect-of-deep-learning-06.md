---
title: "[Ⅱ. Deep Neural Network] Practical Aspects of Deep Learning (6)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Tensorflow
  - Deep Learning
  - Mathematical Optimization
  - hyperparameter tuning
toc: true
toc_sticky: true
toc_label: "Practical Aspects of Deep Learning (6)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Practical Aspects of Deep Learning

## Setting Up your Optimization Problem

### Normalizing Inputs

신경망을 훈련할 때 속도를 높이기 위한 기술 중 하나는 입력을 정규화하는 것입니다. 이게 무슨 말인지 한번 보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/177666340-51c96d34-ab0c-434a-9ded-1675d92adcfd.png)

두 가지의 입력 특징을 가지고있는 훈련 세트를 봅시다. 특징 $x$는 2차원이고, 그림은 훈련 세트 산포도입니다. 

입력값의 정규화는 두 가지 단계가 있습니다. 첫 번째는 평균을 빼거나 0으로 만드는 단계입니다.

$\mu = \cfrac{1}{m} \displaystyle\sum_{i=1}^{m}x^{(i)}$

뮤는 위처럼 표현된 벡터입니다. $x$는 모든 훈련 예시에 대해 $x$에서 
$\mu$를 뺀 값으로 설정됩니다. 즉 평균이 0이 될 때까지 훈련 세트를 이동하기만 하면 됩니다. 즉 평균이 0이될 때까지 훈련 세트를 이동하기만 하면 됩니다.

두 번째는 분산을 정규화하는 단계입니다. 여기서 특징 $x_1$은 특징 $x_2$보다 분산이 훨씬 큽니다.

$\sigma = \cfrac{1}{m} \displaystyle\sum_{i=1}^{m}x^{(i)2}$

시그마는 위 식으로 나타나며 이것은 요소 y의 제곱일 것입니다. 이제 시그마 제곱은 각 특징의 분산이 있는 벡터입니다. 이미 평균을 뺐기 때문에 $x^{(i)}$ 제곱인 요소 y의 제곱은 분산일 뿐입니다.

각각의 예시를 이 시그마 벡터로 나눕니다. 일부 그림에서는 $x_1$과 $x_2$의 분산이 모두 1이 되는 결과가 됩니다. 팁 하나를 드리자면 이 방법을 사용하여 훈련 데이터의 척도를 조정할 경우 동일한 뮤와 시그마를 사용하여 테스트 세트를 정규화합니다.

특히 훈련 세트와 테스트 세트를 다르게 정규화하지 않습니다. 이 값이 무엇이든 이 두 공식에서 사용하여 훈련 세트와 테스트 세트와 뮤와 시그마 제곱을 따로 추정하는 대신 정확히 같은 방식으로 테스트 세트를 조정합니다. 훈련과 테스트 예제 모두 훈련 데이터에 대해 계산된 동일한 뮤와 시그마 제곱으로 정의된 동일한 변환을 수행하기를 원하기 때문입니다.

이렇게 하는 이유는 무엇일까요? 입력 특징을 왜 정규화하는 것일까요?

![image](https://user-images.githubusercontent.com/55765292/177666384-703b5cfe-2684-4d73-b328-1468ef7cd2b0.png)

비용 함수는 오른쪽 상단에 쓰여있는 것으로 정의되어 있음을 기억하세요. 정규화되지 않은 입력 특징을 사용하는 경우 비용 함수는 첫 번째 그림 처럼 보일 가능성이 높습니다.

예를 들어, 매우 찌그러진 막대 매우 길쭉한 비용 함수로 찾으려는 최소값이 저쪽에 있을 수 있습니다. 그러나 여러분의 특징이 매우 다른 규모에 있다면 특징 $x_1$의 범위가 1부터 1,000이고 특정 $x_2$의 범위가 0부터 1이라 가정하면 매개변수 $w_1$과 $w_2$의 비율 또는 범위가 매우 다른 값을 차지하게 됩니다.

이러한 축은 $w_1$과 $w_2$여야 하는데요. 그러나 플롯 $w$와 $b$의 직관은 비용함수가 이렇게 매우 단순할 수 있다는 것입니다. 이 함수의 윤곽을 그릴 경우 이렇게 크게 늘어진 함수를 보게 될 것입니다. 반면에 이 특징을 정규화시키면 그 다음 비용 함수는 평균적으로 더 대칭으로 보일 것입니다.

왼쪽처럼 비용함수로 경사 하강법을 하고 있다면 그러면 아주 작은 학습속도를 사용해야할 수도 있습니다. 경사 하강법은 최종적으로 최소값으로 도달하기 전에 앞뒤로 진동하는데 많은 단계가 필요할 수 있기 때문입니다. 반면에 구형의 윤곽이 더 있다면 어디서 시작하든 경사 하강법은 최소값으로 꽤나 많이 직진합니다. 왼쪽 그림처럼 진동할 필요 없이 경사 하강법이 필요한 곳에서 훨씬 더 큰 단계를 수행할 수 있습니다.

물론 실제로는 $w$는 높은 차원의 벡터입니다. 이것을 2D로 구성하려고 한다 해서 모든 직관이 올바르게 전달되지는 않습니다. 그러나 비용이 많이 드는 기능은 기능이 비슷한 규모일 때 더 둥글고 최적화하기가 쉽습니다. 1부터 1000, 0부터 1이 아닌 대부분 -1부터 1이거나 서로 거의 유사한 분산을 포함할 수 있습니다.

이렇게 하면 비용 함수 J를 더욱 쉽고 빠르게 최적화할 수 있습니다. 실제로 한 가지 특징 예를들어 $x_1$은 0 ~ 1 범위이고 $x_2$ -1 ~ 1 범위이며 $x_3$은 1 ~ 2 범위로 이들은 상당히 유사한 범위이며 그리고 이건 아주 잘 작동하는데요.

또 다른 것은 그들이 1 ~ 100과 0 ~ 1처럼 극적으로 다른 범위에 있을 때입니다. 이는 최적화 알고리즘에 영향을 주는 것입니다. 모든 것을 0으로 설정하는 것만으로 그리고 마지막에 했던 것과 같은 변화에서 모든 특징이 비슷한 규모로 구성되어 있고 일반적으로 알고리즘 학습 속도가 빨라집니다.

입력 특징이 매우 다른 규모 예를 들어, 어떤 특징은 0 ~ 1사이이고 총합은 1 ~ 1000사이일 때 그러면 특정을 정규화하는 것이 중요합니다. 비슷한 규모의 특징인 경우 이 단계는 덜 중요합니다. 이러한 유형의 정규화를 수행해도 전혀 해를 끼치지 않지만 말이죠. 어차피 종종 사용하게 됩니다.

이것이 알고리즘의 교육 속도를 높이는 데 도움이 될지 잘 모르겠지만요. 이것이 입력 특징의 정규화입니다. 다음으로 계속해서 신경망의 훈련 속도를 높이는 방법에 대해 다루겠습니다.


### Vanishing / Exploding Gradients

신경망을 훈련시키는 것의 가장 큰 문제점 중 하나는, 특히 심층 신경망이 그런데요, 바로 데이터 소실과 기울기가 폭발하는 경우입니다. 무슨 뜻이냐면 심층 신경망을 훈련 하는 경우 분산이나 기울기가 때때로 매우 크거나 굉장히 작은 값을 갖게 될 수 있는데 심지어 기하급수적으로 작아질 수도 있는데요. 이런 경우 훈련이 매우 까다로울 수 있습니다.

이번에는 기울기 폭발 및 소실이 실제로 의미하는 것이 무엇인지 알게되실 것이며 또한 무작위 가중치 초기화의 신중한 선택을 사용하여 이 문제를 크게 줄이는 방법에 대해서도 설명합니다.

![image](https://user-images.githubusercontent.com/55765292/177670930-d3e5164d-d544-490e-a379-3e3506c090ea.png)

더 그릴 수 있지만 레이어당 은닉 유닛이 두 개뿐인 것처럼 그렸습니다. 이 신경망은 파라미터 $w^{[1]},w^{[2]}, \dots, w^{[l]}$까지 그 값을 가질 것입니다. 단순하게 하기 위해서 z의 활성화 함수 g가 z와 같다고 가정해보겠습니다. 그래서 선형 활성화 함수이죠. 그리고 b는 무시하고, $b^{[l]} = 0$이라고 하겠습니다.

따라서 출력 y가 다음과 같이 표시될 수 있습니다.

$\hat{y} = w^{[l]}w^{[l-1]}w^{[l-2]} \dots w^{[3]}w^{[2]}w^{[1]}x$

계산에 대한 검토식은 그림에 있습니다.

이제 각각의 가중치 매트릭스 $w^{[l]}$이 항등식의 1배보다 약간 크다고 가정해 보겠습니다. 단위 매트릭스의 1.5배라고요. 그렇게 되면 $\hat{y}$은 1.5 단위 매트릭스위 L-1승 곱하기 x입니다. 그리고 만약 L이 심층 신경망에 대해 크다면 $\hat{y}$ 값 또한 매우 클 것입니다.

사실상 기하급수적으로 성장하게 되고 레이어 수에따라 1.5만큼 커집니다. 그렇기 때문에 아주 깊은 심층신경망이 있다고 하면 y의 값은 폭발적인 값이 나올 것입니다.

반대로 이 값을 0.5로 바꾸면 그러니까 1보다 작은 값으로 바꾼다면, 그러면 이것은 0.5의 L승이 됩니다. 그래서 각각의 매트릭스는 1보다 작은 값이 되는데요. $x_1$과 $x_2$가 1, 1 이라고 가정해보면 활성 값은 1/2, 1/4, 1/8, ... 이렇게 1/2의 L승이 될 때까지합니다. 활성화 값은 네트워크 레이어 수 L의 함수로 기하급수적으로 감소합니다. 그러므로 심층 네트워크에서는 활성화가 기하급수적으로 줄어들게 됩니다.

여기서 기억할만한 직관적인 부분은 바로 w 가중에 따라서 다른 모든 것들이 1보다 조금 큰 값이라고 할 때 또는 단위 매트릭스보다 조금 더 큰 값이라고 할 때 그런 다음 심층 네트워크에서 활성화가 폭발할 수 있습니다.

그리고 만약 w값이 단위보다 조금 작을 경우 그러면 이 값이 0.9, 0.9 이렇게 될 수 있겠죠. 이런 경우 심층 네트워크로 이루어져 있고 활성화가 기하급수적으로 감소할 것입니다.

그리고 비록 L의 함수로 기하급수적으로 증가하거나 감소하는 활성화의 관점에서 이 논증을 겪었지만 컴퓨터가 보낼 미분 또는 기울기도 기하급수적으로 증가하거나 층 수의 함수로 기하급수적으로 감소한다는 것을 보여주기 위해 유사한 논쟁을 사용할 수 있습니다. 일부 현대 신경망에서 L은 150입니다 최근에 마이크로소프트는 152개의 층을 가진 신경망으로 좋은 결과를 얻었는데요

이런 심층 신경망은 L의 함수대로 활성화나 기울기가 기하급수적으로 증가 또는 감소하는 경우 그 값 또한 매우 커지거나 작아질 수 있습니다. 이러한 점이 훈련을 어렵게 만드는데요. 특히, L과 비교하여 기울기가 급격히 작으면, 기울기 하강이 천천히 이루어질 것입니다. 기울기 하강을 교육시키는데는 오랜 시간이 소요될 것입니다.

요약하자면, 이제까지 심층 네트워크에서 기울기 소실 또는 폭발 값을 갖는 경우를 보았습니다. 사실, 이 문제는 오랫동안 심층신경망을 훈련 시키는 과정에서 큰 장벽으로 작용해 왔습니다. 알고 보니, 부분적으로나마 해결책이 있었습니다. 문제를 완전히 해결하진 못하지만, 큰 도움이 되는 해결책이고 이 방법은 가중을 신중하게 초기화하는 방법인데요. 다음에 더 자세히 다루겠습니다.
