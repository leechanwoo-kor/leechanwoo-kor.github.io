---
title: "[Ⅱ. Deep Neural Network] Practical Aspects of Deep Learning (2)"
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
toc_label: "Practical Aspects of Deep Learning (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Practical Aspects of Deep Learning

## Setting up your Machine Learning Application

### Bias/Variance

저는 거의 모든 정말 좋은 기계 학습 편향 및 분산이 실무자는 편향과 분산에 대해 매우 수준높은 이해를 하는 경향이 있습니다. 쉽게 배울 수 있지만 마스터하기 어려운 개념 중 하나라는 것을 알아 차렸습니다. 편향과 분산의 기본 개념을 봤다고 생각하더라도, 항상 여러분이 예상하지 못했던 새로운 부분이 있습니다.

딥러닝 오류에서, 또 하나의 트렌드는, 편향/분산 트레이드 오프라고 불리는 것에 대한 논의가 적습니다. 딥러닝 오류에서는 트레이드 오프가 더 적습니다. 그래서 우리는 여전히 편향에 대해 이야기하고 있습니다. 우리는 여전히 분산에 대해 이야기하고 있죠. 하지만 우리는 편향/분산 트레이드 오프에 대해 덜 이야기 할겁니다. 이게 뭘 의미하는지 보시죠.

![image](https://user-images.githubusercontent.com/55765292/177229853-2c4325ac-12ae-4d2b-8b7a-2875505f3502.png)

다음과 같은 데이터 세트를 살펴보겠습니다. 만약 여러분이 데이터에 직선을 맞추면, 아마도 그것에 맞는 로지스틱 회귀를 얻을 수 있습니다. 이것은 데이터에 매우 적합하지 않으니, 그래서 이것은 높은 편향에 대한거죠 그래서 이것이 데이터에 적합하지 않다고 가정해 봅시다.

반대로, 엄청나게 복잡한 분류기를 맞추면, 아마도 심층 신경망이될 수도 있고, 또는 은닉 유닛을 가진 신경망이, 여러분은 데이터를 완벽하게 맞출 수 있습니다. 하지만 그것도 아주 잘 맞는 것 같지는 않아요. 따라서 고분산 분류기가 있으며 이는 데이터에 과적합됩니다.

그리고 중간 수준의 복잡성을 가진 분류기가, 그 사이에 있을 수 있습니다. 그래서, 여러분도 아시다시피, 어쩌면 이러한 곡선에 맞을 수 있습니다. 데이터에 훨씬 더 합리적으로 적합해 보입니다. 그래서 우리는 그것을, 아시다시피, 딱 맞는 것이라고 부릅니다. 그 사이 어딘가에 있어요.

따라서 이와 같은 2D 예에서는, 단 두가지 특지이으로, $x_1$과 $x_2$라는 두 가지 기능만 있으면 데이터를 플로팅하고 편향과 분산을 시각화할 수 있습니다. 고차원 문제에서는 데이터를 플롯하고 분할 경계를 시각화할 수 없습니다. 대신 편향과 분산을 이해하기 위해 살펴볼 몇 가지 다른 메트릭이 있습니다.
