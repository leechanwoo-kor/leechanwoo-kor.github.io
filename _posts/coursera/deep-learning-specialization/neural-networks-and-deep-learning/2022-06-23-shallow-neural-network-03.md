---
title: "[Ⅰ. Neural Networks and Deep Learning] Shallow Neural Networks (3)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Shallow Neural Networks (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Shallow Neural Networks

### Vectorizing Across Multiple Examples
지난 포스팅에서는 단일 훈련 예제를 사용하여 신경망에서 예측을 계산하는 방법을 살펴보았습니다. 이번에는 여러 훈련 예제에서 벡터화하는 방법을 볼 수 있습니다. 로지스틱 회귀에서 본 결과와 매우 비슷할 텐데요.

따라서 행렬의 다른 열에 서로 다른 훈련 예제를 쌓으면 이전 영상에서 얻은 방정식을 사용할 수 있습니다. 이전 방정식을 살짝 변형시켜 신경망이 거의 동시에 모든 예제의 출력을 계산하도록 변경하십시오.

그럼 그 방법에 대해 자세히 알아보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175244375-cd9d3608-0507-4ab9-9996-7cd73d9c405c.png)
먼저 이전 포스팅에서 다룬 4개의 방정식이 있습니다. 또한 입력 특성을 $x$로 되돌리면 단일 훈련 예제의 $a^{[2]} = \hat{y}$를 생성하는 데 사용할 수 있습니다.

이제 $m$ 훈련 예제가 있다면 첫 번째 훈련 예제를 위해 이 과정을 반복해야 합니다. 
$x^{(1)}$는 $\hat{y}^{(1)}$을 계산하기 위해 첫 번째 훈련 예제에 대한 예측을 수행합니다.

그런 다음 $x^{(2)}$를 사용하여 
$\hat{y}^{(2)}$를 생성합니다. 
그리고 $\hat{y}^{(m)}$를 생성하기 위해 $x^{(m)}$까지 내려갑니다.

이 모든 활성화 함수 표기법에서도 이것을 $a^{\[2\](1)}$, $a^{\[2\](2)}$ 그리고 $a^{\[2\](m)}$로 표기합니다. 
그래서 이 표기법은 $a^{\[2\](i)}$입니다. 
(i)는 훈련 예제 i를 나타내고 [2]는 레이어 2를 나타냅니다. 이것이 대괄호와 소괄호 인덱스가 작동하는 방식입니다.

따라서 벡터화되지 않은 구현이 있고 모든 훈련 예제의 예측을 계산하려면 i = 1에서 m까지 해야 합니다. 그럼 기본적으로 4가지 방정식을 구현하는 겁니다. 기본적으로 훈련 예제에 의존하는 모든 변수에 윗첨자 소괄호 i를 추가하여 위의 4개의 방정식을 나타냅니다. 따라서 m 훈련예제의 모든 출력을 계산하려면 $x$에 윗첨자 소괄호 $i$를 추가하면 $z$와 $a$가 됩니다.

우리가 하고 싶은 것은 이것을 없애기 위해 이 전체 계산을 벡터화하는 것입니다. 핵심적인 선형대수학을 많이 배운 것 같다면 이것을 정확하게 구현할 수 있는 것이 딥러닝 시대에는 매우 중요하다는 것이 밝혀졌습니다.

그리고 실제로 이 과정에서 표기법을 매우 시중하게 선택했으며 이 벡터화 단계를 최대한 쉽게 만들었습니다. 따라서 이 핵심적인 내용을 통해 알고리즘의 올바른 구현을 보다 신속하게 실현할 수 있기를 바랍니다. 이 코드 블록 전체를 다음 그림과 이걸 어떻게 벡터화하는지 알아보도록 하죠.

![image](https://user-images.githubusercontent.com/55765292/175244566-1f1190e2-5b42-4116-8b4f-ff4b9b9f79b1.png)

다음은 $m$개의 훈련예제에 대한 for 루프가 있는 이전 그림의 내용입니다.

따라서 행렬 $X$를 이러한 열에 쌓인 훈련 예제와 동일하게 정의했습니다. 그러니 훈련 예제를 모두 여기 열에 쌓도록 합니다. 그러면 이것은 $n$이 되거나 $n_x \times m$이 행렬을 감소시킬 수도 있습니다. 요점만 말하면 for 루프를 벡터화된 구현을 실현하기 위해 필요한 것이 무엇인지 살펴보겠습니다.

이제 해야 할 일은 $Z^{[1]}, A^{[1]}, Z^{[2]}, A^{[2]}$을 계산하는 것입니다. 따라서 다른 열에 소문자 $x$를 쌓아서 소문자 벡터 $x$에서 대문자 $X$ 행렬로 전환했다는 것입니다.

$z$에 대해 동일한 작업을 한다면 $z^{\[1\](1)}, z^{\[1\](2)}$ 등등 그리고 이것들은 모두 $z^{\[1\](m)}$까지의 열 벡터가 됩니다. 그런 다음 행렬 $Z^{[1]}$만 제공합니다.

마찬가지로 $a^{\[1\](1)}, a^{\[1\](2)}$ 등등 $a^{\[1\](m)}$ 을 가져와서 열에 쌓습니다. $X$와 $Z$와 같이 소문자 $a$에서 $A^{[1]}$로 가는 것입니다. $Z^{[2]}, A^{[2]}$도 마찬가지입니다.

여러분이 생각하는데 도움을 줄만한 이 표기법의 특성 중 하나는 이 행렬이 $Z$와 $A$를 수평으로 나타내며 훈련 예제 전체를 인덱싱 한다는 것입니다. 그래서 수평 인덱스가 다른 훈련 예제에 해당하는 이유입니다. 왼쪽에서 오른쪽으로 스윕하면 훈련 셀을 스캔하는 것입니다. 그리고 수직으로의 인덱스는 신경망의 다른 노드에 해당합니다.

예를 들어, 이 노드 평균의 맨 위, 왼쪽 위 구석에 있는 값은 첫 번째 훈련 예제에서 첫 번째 인덱스 유닛의 활성화에 해당합니다. 값을 내리면 첫 번째 훈련 예제에서 두 번째 은닉 유닛의 활성화에 해당하며 첫 번째 훈련 예제의 세 번째 인덱스 유닛 등에 해당합니다. 이렇게 스캔을 해보면 이것은 은닉 유닛 번호에 대한 인덱싱입니다.

반면 수평으로 움직이면 첫 번 째 은닉 유닛부터 움직이게 됩니다. 첫 번째 은닉 유닛에 대한 첫 번째 훈련 예제는 두 번째 훈련 예제, 세 번째 훈련 예제에 복사하겠습니다. 그래서 이 노드가 최종 훈련 예제와 $n$번째 훈련 예제에서 첫 번째 은닉 유닛의 활성화에 해당할 때까지 계속됩니다. 

그래서 행렬 $A$는 수평으로 여러가지 훈련 예제를 살펴봅니다. 그리고 행렬 $A$의 다른 인덱스는 수직으로 다른 은닉 유닛에 해당한다. 그리고 비슷한 직관은 행렬 $Z$와 수평으로 서로 다른 훈련 예제에 대응하는 $X$에 대해서도 마찬가지입니다. 수직적으로는 신경망의 입력층과는 정말 다른 입력 특성에 대응하고 있습니다.

이러한 방정식 중, 이제 여러 예제에서 벡터화로 네트워크에서 구현하는 방법을 알게 되었습니다. 다음에는 이것이 왜 이러한 유형의 벡터화를 올바르게 구현했는지에 대한 규정을 좀 더 보겠습니다. 로지스틱 회귀에서 본 것과 비슷할 것입니다.

### Explanation for Vectorized Implementation
이전에 학습 예제를 행렬 $X$에 수평으로 쌓아올려 신경망으로 이어지는 벡터화된 구현을 어떻게 도출할 수 있는지 확인했습니다. 이제 조금 더 구체적으로 우리가 쓴 방정식이 여러 예제를 걸쳐 벡터화를 올바르게 구현한 이유를 좀 더 정의해 보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175442014-32f51f5f-482b-4cce-82ca-183886035c92.png)

따라서 몇 가지 예를 들어 순방향 전파 계산의 일부를 살펴보겠습니다.

학습 예제에 대한 계산식이 있습니다. 내용을 단순화하기 위해 $b$는 무시하겠습니다. 정당성을 단순화하기 위해 $b$가 $0$과 같다고 가정해봅시다. 하지만 우리가 제시할 주장은 $b$가 $0$이 아니더라도 약간의 변화로 작용한다는 것입니다. 이렇게 내용을 단순한게 만들겠습니다.

그러면 $W^{[1]}$은 행렬이 될겁니다. 이 행렬에는 몇 개의 행이 있습니다. 따라서 $x^{[1]}$을 보면 $W^{[1]}w^{(1)}$은 그림에 보이는 것처럼 열 벡터를 제공합니다. 이는 $Z^{\[1\](1)}$와 같습니다. $x^{(2)},x^{(3)}$도 동일합니다.

이제 모든 학습 예제를 함께 쌓아서 형성하는 학습 세트 대문자 $X$를 생각해 봅시다. 따라서 행렬 대문자 $X$는 벡터 $x^{(1)}$을 가져와서 수직으로 쌓고 $x^{(2)}, x^{(3)}$도 쌓음으로써 형성됩니다. 이것은 3개의 학습 예제만 가지고 있는 경우입니다.

만약 더 있다고 하면 계속 수평으로 쌓이게 됩니다. 하지만 이 행렬 $X$에 $W$를 곱하면 행렬 곱셈이 어떻게 작용하는지 생각해보면 첫 번째 열은 보라색으로 그린 것과 같은 값이 됩니다. 두 번째 열은 초록색으로 그려진 4개의 값이 됩니다. 그리고 세 번째 열은 오렌지색 값이 될 것입니다.

그러나 이는 당연히 $z^{\[1\](1)}$이 열 벡터로 표현되고 그 다음으로 $z^{\[1\](2)}, z^{\[1\](3)}$도 열 벡터로 표현됩니다. 그리고 이것은 세 가지 학습 예제가 있는 경우입니다. 더 많은 예제를 얻으면 더 많은 열이 생깁니다. 그러면 이것은 행렬 대문자 $Z^{[1]}$입니다.

이 내용은 우리가 당시 단일 학습 예제를 볼 때 이전에 $w^{[1]}x^{(i)} = z^{\[1\](i)}$와 같은 이유에 대한 정당성을 제공하기를 바랍니다. 다른 학습 예제를 가져와서 다른 열에 쌓으면 해당 열에 $z$도 쌓이게 됩니다.

여기서 다루진 않겠지만 파이썬 브로드캐스팅을 통해서도 확인이 가능합니다. 여기 값들은 다시 더하면, 이 값에 대한 $b$에 값은 여전히 정확합니다. 그리고 실제로 일어나는 일은 결국 파이썬 브로드캐스팅이 되고 결국 이 행렬의 각 열에 대해 개별적으로 $b^{[i]}$가 생기게 되는 것입니다.

그래서 이 그림에서는 $Z^{[1]} = W^{[1]}X + b^{[1]}$의 식을 정당화했을 뿐입니다. 이전에 다룬 네 단계 중 첫 번째 단계의 올바른 벡터화이지만 비슷한 분석을 통해 다른 단계도 매우 유사한 논리를 사용하여 작동한다는 것을 보여줄 수 있습니다.

마지막으로, 전체적으로 복습해보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175442344-e6408798-c006-40cc-bd5b-b763f51ce630.png)

이것이 당신의 신경망이라면 우리는 이것이 전파를 위해 구현해야 할 일이라고 말했고 $1$에서 $m$까지 하나 하나의 학습예제는 학습 예제 1과 같습니다. 그리고 나서 우리는 열에 학습 예제를 쌓고 각 $z$와 $a$값에 대해 해당 열을 쌓습니다. 따라서 그림에는 $A^{[1]}$의 예이지만 나머지도 마찬가지입니다.

이전에 그 다음으로 보여준 것은 $Z^{[1]} = W^{[1]}X + b^{[1]}$이 모든 $m$ 예제에서 동시에 벡터화 시킬 수 있다는 것입니다. 그리고 비슷한 추론으로 밝혀지면 다른 모든 줄이 이 네 줄의 코드에서 모두 올바른 벡터화라는 것을 보여줄 수 있습니다.

다시 말씀드리자면, $x = a^{[0]}$이기 때문에 $x^{(i)} = a^{\[0\](i)}$로 표현할 수 있었습니다. 그리고 첫 번째 방정식에도 대칭성이 있습니다. $z,a$ 각 쌍의 방정식이 실제로 매우 유사해 보이지만 모든 지수가 1씩 진행된다는 것을 알 수 있습니다.

이것은 신경망의 다른 층들이 대략 같은 일을 하고 있거나 같은 계산을 반복하고 있따는 것을 보여줍니다. 여기 두 층의 신경망이 있습니다. 다음에는 더 깊은 신경망에 대해 배우겠습니다. 보다 깊은 신경망이 기본적으로 이 두 단계를 수행하고 있습니다. 여기에서 보는 것보다 훨씬 더 많은 시간을 수행한다는 것을 알 수 있습니다.

이렇게 하면 여러 학습 예제에서 신경망을 벡터화할 수 있습니다. 다음으로, 지금까지 우리는 신경망 전반에 걸쳐 시그모이드 함수를 사용해왔습니다. 그것은 사실 최선의 선택이 아니라는 것이 밝혀졌습니다. 다음엔 시그모이드 함수가 하나의 가능한 선택인 다른 활성화 함수를 어떻게 사용할 수 있는지 조금 더 자세히 알아보겠습니다.
