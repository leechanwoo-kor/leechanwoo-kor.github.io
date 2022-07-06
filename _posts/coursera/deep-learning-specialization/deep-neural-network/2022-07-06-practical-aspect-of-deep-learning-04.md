---
title: "[Ⅱ. Deep Neural Network] Practical Aspects of Deep Learning (4)"
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
toc_label: "Practical Aspects of Deep Learning (4)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Practical Aspects of Deep Learning

## Regularizing your Neural Network

### Dropout Regularization

L2 일반화에 추가로 더욱 강력한 일반화 테크닉인 dropout이라는 것이 있습니다. 어떻게 작동하는 것인지 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/177447990-2f10cd38-332a-4fea-93d2-9ab8934faa38.png)

왼쪽과 같은 신경망을 트레이닝 하는데 overfitting하는 경우입니다. 오른쪽에 신경망을 복사해보겠습니다. dropout에서는 무엇을 할 것이나면, 이 네트워크의 각각 레이어별로 살펴보면서 신경망의 노드를 제거하는 확률을 세팅해볼 것입니다.

각각의 레이어별로 각각의 노드별로 동전을 던져서 노드를 유지할 것인지 제거할 것인지 각각 0.5 활률이 있다고 할 것입니다. 동전을 던진 후에 노드들을 제거하겠다고 할 수도 있습니다. 그러면 들어오고 나가는 링크 또한 제거를 같이 할 것입니다.

그렇게 되면 훨씬 더 작은 감소된 네트워크가 남을 것입니다. 그 다음에 후방향전파 트레이닝을 진행합니다. 여기처럼 감소된 네트워크에 예제가 있고 또 다른 예제가 있는데요. 이 경우에는 동전을 몇 개 던진 이후에 노드의 뭉치를 유지하거나 제거하는 방법이 있습니다.

각각의 트레이닝 예시에 대해서, 여기 있는 방법 중에서 신경망 트레이닝을 시킬 것입니다. 아마도 조금 미친 테크닉이라고 생각할 수도 있는데요. 이것을 코딩하는 방법이 무작위로 이루어지지만 실제로 작동을 합니다.

각각의 예세에 대해서 훨씬 더 작은 네트워크를 트레이닝 시키기 때문에 네트워크를 일반화시킬 수 있는지에 대해 감을 잡을 수 있을 수도 있습니다. 이런 훨씬 더 작은 네트워크가 트레이닝되고 있기 때문이죠. dropout을 어떻게 도입하는지 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/177448028-65bcd66f-0dfc-4a03-993a-b071e3d33f2b.png)

![image](https://user-images.githubusercontent.com/55765292/177448054-8e8abf04-573c-4ec6-a12f-c7d583da71e2.png)
