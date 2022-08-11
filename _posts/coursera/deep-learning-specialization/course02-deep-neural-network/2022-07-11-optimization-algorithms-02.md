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

미니 배치 크기가 m인 경우 m은 한 극단에서의 훈련 세트 크기였습니다. 그러면 배치 경사 하강법이 남게됩니다. 따라서 이 극단에서 한 개의 미니 배치 $X^1, Y^1$이 남을 것이고 이 미니배치는 전체 훈련 세트와 동일합니다. 따라서 미니 배치 크기를 m으로 설정하는 것은 단순히 배치 경사 하강법을 줍니다.

다른 극단은 미니 배치 크기가 1인 경우일 것입니다. 이 경우 확률적 경사 하강법이라 불리는 알고리즘을 주는데요. 여기서 각각의 예시는 그들의 미니 배치입니다. 이럴 경우는 첫번째 미니 배치 즉 $X^1, Y^1$를 봅니다. 미니 배치 크기가 1인 경우 첫 번째 훈련 예시밖에 없고 첫 번째 훈련 예제를 감지하기 위해서 도함수를 사용합니다.

다음으로 두 번째 미니 배치인 두번째 훈련 샘플을 보고 이값에 경사 하강법 단계를 적용하고 이어서 세 번째 훈련 예시에도 그렇게 하여 한 번에 하나의 훈련 샘플만 보는 것입니다. 비용 함수의 최적화에 있어 이런 2개의 극단이 하는 것을 한번 보겠습니다.

그림 아래가 최소화하려는 비용함수의 곡선이라면 정중앙이 그 최소값이 됩니다. 그러면 배치 경사 하강법은 왼쪽 밑에서 시작한다고 합시다. 비교적 적은 노이즈와 큰 단계를 가질 수 있을 것입니다. 그러면 계속 최소값을 향할 수 있습니다.

확률적 경사 하강법과는 반대로 다른 시작점을 골라봅시다. 그런 다음 모든 반복에서 단일 훈련 예제로 경사 하강법을 사용하면 대부분 전역 최소값 방향으로 가지만 때때로 하나의 예가 나쁜 방향을 가리키면 잘못된 방향으로 가는 경우가 있습니다. 따라서 확률적 경사 하강법은 노이즈가 심할 수 있습니다.

그리고 평균적으로는 좋은 방향으로 인도하겠지만 가끔은 잘못된 방향으로 갈 것입니다. 확률적 경사 하강법은 절대 수렴하지 않을 것이기 때문에 항상 최소값 범위 주위를 계속 진동하고 배회할 것입니다. 하지만 절대로 최소값에 도달하고 멈추지는 않을 것입니다.

실제로 사용할 미니 배치 크기는 이 값 사이에 있을 것입니다. 1과 m사이로 1과 m은 각각 너무 작고 너무 큽니다. 이유는 다음과 같습니다. 경사 하강법을 사용하는 경우 이것은 미니 배치 크기가 m인 경우입니다. 반복마다 아주 거대한 훈련 세트를 처리하는 것입니다.

이것의 주요 단점은 반복마다 긴 시간이 소요된다는 것입니다. 아주 긴 훈련 세트가 있다는 가정하에 말입니다. 작은 훈련 세트가 있는 경우엔 배치 경사 하강법은 괜찮습니다.

반대로 가는 경우 확률적 경사 하강법을 쓰는 경우에는 하나의 예시만 처리해도 진전이 있다는 점이 좋으며 문제가 되지 않습니다. 그리고 노이즈는 더 작은 값의 학습속도를 사용하여 개선시키거나 감소시킬 수 있습니다.

하지만 확률적 경사 하강법의 큰 단점은 벡터화에서 거의 대부분의 속도를 잃는다는 것입니다. 그 이유는 여기서는 훈련 샘플을 하나씩 처리하는데요. 각각의 예시를 처리하는 방식은 매우 비율적이기 때문입니다.

그러므로 실제로 가장 잘 작동하는 것은 미니 배치 크기가 너무 크기 않거나 작지 않은 경우입니다. 실제로 이런 경우에 가장 빠른 학습을 제공합니다. 아시겠지만 이렇게 되면 두 가지 부분에서 좋습니다. 하나는 많은 벡터화를 갖게됩니다.

이전에 사용했던 예시들에서 미니 배치 크기가 1,000개의 예시일 때 1,000개의 예시로 벡터화가 가능할 것이며 이 경우 예시를 하나씩 처리하는 것보다 훨씬 빠를 것입니다.

그리고 두 번째로 전체 훈련 세트를 처리하기 전까지 기다릴 필요없이 진전이 있게 만들 수 있습니다. 다시 한번 이전 영상에서 다뤘던 수치를 사용하여 각각의 훈련 세트의 epoch는 5,000개의 경사 하강법 단계를 밟게 해줍니다. 따라서 실제로 잘 작동하는 중간의 미니 배치 크기가 있을 것입니다.

미니 배치 경사 하강법에 대해서는 오른쪽 아래에서 시작할 것이며 반복이 계속 이어지면서 최소값을 향할 것을 보장할 수 없습니다만 연속 하강보다는 조금 더 균등하게 최소값을 향해 가는 경향이 있습니다. 그리고 항상 정확하게 변환되거나 작은 범위에서 진동하는 것은 아닙니다. 이것이 문제라면 언제든지 학습속도를 늦출 수 있습니다.

그러면 미니 배치 크기가 m과 1이 아니여야 하며 그 사이 값을 가지려면 어떤 것을 고를 수 있을까요? 여기 그 가이드라인이 있습니다.

![image](https://user-images.githubusercontent.com/55765292/178188227-564a10a5-0ccf-4093-b4ba-04c504acfb14.png)

먼저 작은 훈련 세트일 경우 배치 경사 하강법을 이용하세요 작은 훈련 세트의 경우에는 미니 배치 경사 하강법을 쓰는 의미가 없는데요. 전체 훈련 세트를 꽤 빨리 처리할 수 있기 때문입니다. 그러므로 배치 경사 하강법을 이용하면 됩니다. 작은 훈련 세트가 뜻하는 것은 아마 2,000보다 작을 때를 말하는 것이며 이런 경우 배치 경사 하강법을 사용해도 정말 괜찮습니다.

아니면 조금 더 큰 훈련 세트의 경우 전형적인 미니 배치의 크기는 64에서 512가 꽤 대표적인데요. 왜냐하면 컴퓨터 메모리 배치 방식과 접속 방법에 따라 가끔씩 그 코드가 2의 거듭제곱을 거질때 더 빨리 실행됩니다. 64는 그러면 2의 6승이며 2의 7승, 2의 8승, 2의 9승 따라서 미니배치의 크기를 2의 거듭제곱으로 구현합니다.

이번에는 미니 배치의 크기를 1,000으로 사용했는데요. 정말로 그렇게 하고 싶은 경우에는 1024를 쓰시는 것을 추천드리며 이 값은 2의 10승이죠. 조금 흔하진 않지만 1024 크기의 미니 배치가 있긴 합니다.

마지막 팁으로는 미니 배치가 모든 $X^t, Y^t$ 값을 CPU/GPU 메모리에 들어가도록 하는 것입니다. 이것은 전적으로 응용프로그램에 달려있는데요. 또 훈련 샘플이 얼마나 큰지에 따라 변할 수 있습니다. 하지만 CPU 또는 GPU 메모리에 들어가지 않는 미니배치를 처리하게 되는 경우 프로세스를 사용하든 데이터를 사용하든 상관없습니다.

그러면 성능이 갑자기 저하되는 것과 더 악화되는 것을 볼 것입니다. 바라건대 이 내용을 주로 사용하는 미니배치의 크기 범위에 대한 이해를 얻었으면 좋겠습니다. 실제로는 당연히 미니배치 크기가 또 다른 하나의 하이퍼 파리미터 인데요. 빠른 검색을 통해 어떤 것이 충분한지 알아볼 수 있습니다. 비용함수 J를 줄이는 데 말이죠.

개인적으로 여러가지 값을 시도해볼 것입니다. 몇 가지 다른 2의 거듭제곱을 시도한 다음 경사 하강법 최적화 알고리즘을 가능한 효율적으로 만드는 선택을 하세요. 바라건대 이 내용이 가이드라인이 되어 하이퍼 파리미터 검색에 대한 이해도를 높혀주었기를 바랍니다.

미니 배치 경사 하강법을 구현하는 방법과 알고리즘을 더 빨리 실행하는 방법, 특히 더 큰 훈련 세트에 대한 방법을 살펴봤습니다. 하지만 경사 하강법 또는 미니배치 경사 하강법보다 훨씬 더 효율적인 알고리즘이 존재합니다. 다음에 그것에 대해 다뤄보겠습니다.