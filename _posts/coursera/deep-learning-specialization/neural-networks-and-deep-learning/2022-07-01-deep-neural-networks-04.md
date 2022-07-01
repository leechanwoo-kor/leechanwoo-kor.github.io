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















