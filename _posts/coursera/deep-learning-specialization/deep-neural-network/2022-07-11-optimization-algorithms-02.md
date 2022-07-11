---
title: "[Ⅱ. Deep Neural Network] Optimization Algorithms (2)"
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
toc_label: "Optimization Algorithms (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Optimization Algorithms

## Optimization Algorithms

### Understanding Mini-batch Gradient Descent

훈련 세트를 처리하는 중일 때에도 미니 배치 경사 하강법을 사용하여 진행을 시작하고 경사 하강법 단계를 시작하는 방법을 보았습니다. 이번에는 경사 하강법을 구현하는 방법과 이것이 하는 역할 및 효과적인 이유에 대한 더 나은 이해를 얻어보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178188170-243a95a5-d743-4421-b1a3-ddc9869fc27f.png)

모든 반복에서 배치 경사 하강법을 사용하여 전체 훈련 세트를 거치면 모든 단일 반복에서 비용이 감소할 것으로 예상합니다. 그러면 비용함수 J를 다른 반복의 함수로 가지면 모든 단일 반복에서 감소해야 합니다. 그것이 반복 중이더라도 증가하는 경우에는 이상이 있는 것입니다. 아마 학습속도가 너무 클 수도 있겠죠.

하지만 미니 배치 경사 하강법의 경우에 비용함수의 진행률을 그려보면 모든 반복에서 감소하지 않을 수도 있습니다. 특히 $X^t, Y^t$를 처리하는 모든 반복에서 비용함수 $J^t$를 그리면 이것은 $X^t, Y^t$를 이용해서 계산이 되죠. 그러면 모든 반복에서 다른 훈련 세트에서 훈련하거나 실제로 다른 미니 배치에서 훈련하는 것과 같습니다.

그러면 비용함수 J를 그리는데요. 다음과 위와 같은 것을 볼 가능성이 더 큽니다. 감소하는 경향을 보이며 약간의 노이즈도 생길 것입니다. 따라서 $J^t$를 그리면 미니 배치 경사 하강법을 복수의 epoch에서 훈련시킬 때 이렇게 생긴 곡선을 볼 것입니다. 그렇기 때문에 모든 미분마다 내려가지 않아도 괜찮습니다.

하지만 이렇게 감소하는 모양을 볼 텐데요. 그리고 약간의 노이즈가 있는 이유는 아마 $X^1, Y^1$이 조금 더 쉬운 미니 배치로 비용이 조금 더 낮기 때문일 수 있습니다. 하지만 우연으로 $X^2, Y^2$가 어려운 미니 배치일 수도 있죠. 어쩌면 잘못 레이블된 예시도 미니 배치일 수도 있겠죠. 이런 경우 비용이 조금 더 높을 수 있습니다.

그렇기 때문에 비용을 그리면서 이와 같은 진동이 생기는 것인데요. 미니 배치 경사 하강법을 실행할 때 말이죠. 여러분이 골라야하는 매개 변수 중 하나는 바로 미니 배치의 크기입니다.

![image](https://user-images.githubusercontent.com/55765292/178188212-99555a89-ac31-472d-97c7-a6df2af6e0ee.png)

![image](https://user-images.githubusercontent.com/55765292/178188227-564a10a5-0ccf-4093-b4ba-04c504acfb14.png)
