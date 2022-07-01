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















