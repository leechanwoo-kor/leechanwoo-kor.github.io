---
title: "[Ⅰ. Neural Networks and Deep Learning] Deep Neural Networks (4)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Deep Neural Networks (4)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Deep Neural Networks

## Deep Neural Network

### Forward and Backward Propagation

이전에 심층 신경망을 구현하는 기본 블록, 각 레이어에 대한 순방향 전파 단계 및 그에 상응하는 역방향 전파 단계를 보았습니다. 이제 이러한 단계를 실제로 구현하는 방법을 살펴보겠습니다. 순방향 전파부터 시작하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/176808845-5ecbd0b1-864a-465c-842b-3c9811185d3c.png)

$a^{[l-1]}$을 입력하고, $a^{[l]}$과 캐시 $z^{[l]}$을 출력합니다. 우리는 단지 구현의 관점에서 $w^{[l]},b^{[l]}$도 캐시하여 프로그램 연습에서 함수의 호출을 조금 더 쉽게 할 수 있다고 말씀드렸습니다.

여기 방정식은 이미 익숙해 보이시겠지만, 순방향 함수를 구현하는 방법은

$z^{[l]} = w^{[l]} \cdot a^{[l-1]} + b^{[l]}$

그러면

$a^{[l]} = g^{[l]}(z^{[l]})$

활성화 함수까지 구현할 수 있습니다.

이전에 본 4단계 다이어그램에서는 상자 체인이 앞으로 나아가고 있다는 것을 기억하므로 따라서 $x$와 동일한 $a^{[0]}$을 입력하여 이를 초기화합니다. 그러면 첫 번째 입력은 $a^{[0]}$입니다. 하나의 예제를 수행하는 경우 $a^{[0]}$이며 전체 훈련 세트를 처리하는 경우 $A^{[0]}$입니다.

이것은 체인의 첫 번째 순방향 함수에 대한 입력이며, 그리고 이것을 반복하는 것만으로 왼쪽에서 오른쪽으로 순방향 전파를 계산할 수 있습니다.

다음은 역방향 전파 단계에 대해 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/176809707-7c4c8fa1-2263-4599-9c81-edf0563614f8.png)

여기서 여러분의 목표는 $da^{[l]}$을 입력하고, $da^{[l-1]},dw^{[l]},db^{[l]}$을 출력하는 것입니다. 이것들을 계산하는 데 필요한 단계들을 적어보겠습니다.

$dz^{[l]} = da^{[l]} \times g^{[l]'}(z^{[l]})$

그런 다음 도함수를 계산하기 위해

$dw^{[l]} = dz^{[l]} \cdot a^{[l-1]T}$

명시적으로 캐시에 넣지 않았지만 이것이 필요하다는 것이 밝혀졌습니다. 그런 다음

$db^{[l]} = dz^{[l]}$

$da^{[l-1]} = w^{[l]T} \cdot dz^{[l]}$

과 같습니다. 도함수에 대해 자세하게 다루고 싶지 않습니다만, da에 대해 이 정의를 가져와 첫 번째 방정식에 대입하면 이전과 동일한 공식을 얻을 수 있습니다.

$dz^{[l]} = w^{[l+1]T}dz^{[l+1]} \times g^{[l]'}(z^{[l]})$

이게 대수학처럼 보인다는 것을 알고 있습니다. 여러분은 이것이 우리가 지난 주에 하나의 은닉층으로 신경망을 구축하고 있을 때 역방향 전파를 위해 작성한 방정식이라는 것을 스스로 다시 확인할 수 있습니다.

다시 말하지만, 역함수를 구현하는 데 필요한 4개의 방정식만 있으면 됩니다.

마지막으로, 벡터화된 버전을 볼텐데요, 첫 번째 줄은

$dZ^{[l]} = dA^{[l]} \times g^{[l]'}(Z^{[l]})$

이됩니다.

$dW^{[l]} = \cfrac{1}{m} np.sum (dZ^{[l]},axis=1,keepdim=True)$

입니다. 지난 번에 db를 계산하기 위해 np.sum을 사용하는 것에 대해 이야기했습니다. 마지막으로

$dA^{[l-1]} = W^{[l]T} \cdot dZ^{[l]}$

입니다. 여기에서 이 수량 da를 입력할 수 있습니다. 다음과 같이 $dW^{[l]},db^{[l]}$ 필요한 도함수 및 $da^{[l-1]}$을 출력합니다. 이것이 바로 역함수를 구현하는 방법입니다.

#### Summary

![image](https://user-images.githubusercontent.com/55765292/176827725-380b383c-f9dc-4ecc-b6dc-8d53babc01cc.png)

요약하자면, 입력 $x$를 취하면 첫 번째 레이어에 ReLU 활성화 함수를 갖게 됩니다. 그런 다음 두 번째 레이어로 이동하여 다른 ReLU 활성화 함수를 사용하고 세 번째 레이어로 이동하여 이진 분류를 수행하는 경우 시그모이드 활성화 함수를 가지고 있을 수 있으며 이는 $\hat{y}$를 출력합니다.

그런 다음 $\hat{y}$를 사용하여 손실을 계산할 수 있습니다. 이를 통해 역방향 반복을 시작할 수 있습니다. 빨간 화살표를 살펴보겠습니다. 역전파가 도함수를 계산하고 $dw^{[3]},db^{[3]},dw^{[2]},db^{[2]},dw^{[1]},db^{[1]}$을 계산합니다.

그 과정에서 캐시에 대해 계산하게 됩니다. $z^{[1]},z^{[2]},z^{[3]}$을 전송할 것입니다. 여기서는 $da^{[2]},da^{[1]}$을 역방향으로 통과합니다. $da^{[0]}$을 계산할 수 있지만 그것은 사용하지 않을 것이므로 그냥 버리시면 됩니다.

이렇게 해서 세 번째 레이어 신경망을 위한 순방향 전파 및 역방향 전파를 구현할 수 있습니다.

마지막으로 설명하지 않은 세부 사항은 순방향 재귀에 대한 것인데, 입력데이터 $x$를 사용하여 초기화할 것입니다. 그러면 역방향 재귀는 어떨까요? 알고 보니 로지스틱 회귀를 사용할 때 $da^{[l]}$는 이진 분류를 수행할 때 $da^{[l]} = - \cfrac{y}{a} + \cfrac{(1-y)}{(1-a)}$와 같습니다.

$\hat{y}$과 관련하여 출력에 대한 손실함수의 도함수는 그것이 무엇인지를 알 수 있습니다. 미적분학이 익숙하시면, 손실함수 $L$을 찾아 $a$에 대한 $\hat{y}$에 대한 도함수를 구하면 그 공식을 얻었다는 것을 보여줄 수 있습니다.

이것은 최종 레이어인 대문자 L에 대해 $dA$에 사용해야 하는 공식입니다. 물론 벡터화된 구현을 사용하는 경우 이 방법이 아닌 다른 예제와 동일한 레이어 l에 대한 da를 사용하여 역방향 재귀를 초기화합니다.

다음은 하이퍼 매개 변수와 매개 변수에 대해 다뤄보겠습니다. 깊은 신경망을 훈련할 때 하이퍼 매개변수를 잘 구성할 수 있으면 네트워크를 보다 효율적으로 개발하는데 도움이 될 것입니다. 다음에는 그것이 정확히 무엇을 의미하는지 알아보겠습니다.