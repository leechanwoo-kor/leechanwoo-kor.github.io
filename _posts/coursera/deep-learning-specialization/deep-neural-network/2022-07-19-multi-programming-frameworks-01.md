---
title: "[Ⅱ. Deep Neural Network] Introduction to Programming Frameworks (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Tensorflow
  - Deep Learning
  - Mathematical Optimization
  - Hyperparameter Tuning
toc: true
toc_sticky: true
toc_label: "Introduction to Programming Frameworks (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Optimization Algorithms

## Introduction to Programming Frameworks

### Deep Learning Frameworks

![image](https://user-images.githubusercontent.com/55765292/179641788-c387ce91-ce3e-44d9-a1ce-6904c886fcba.png)

오늘날 쉽게 신경망 네트워크를 도입할 수 있도록 도와줄 수 있는 많은 딥러닝 프레임워크가 있는데요. 대표적인 것들이 몇 개 있습니다. 이러한 각 프레임워크에는 전용 사용자 및 개발자 커뮤니티가 있으며 이러한 각 프레임 워크는 일부 응용 프로그램 하위 집합에 대해 신뢰 할 수 있는 선택이라고 생각합니다. 이러한 딥 러닝 프레임워크와 이러한 딥 러닝 프레임워크가 얼마나 잘 변화하는지 비교하는 기사를 작성하는 사람들이 많이 있습니다.

이러한 프레임워크를 너무 강력하게 지지하기보다는 프레임워크를 선택하는 데 사용하는 기준을 공유하고 싶습니다.

중요한 기준 중의 하나는 프로그래밍의 용이함인데요. 이는 신경망을 개발하고 이를 반복할 뿐만 아니라 프로덕션에 배포하는 것을 의미합니다. 실제로 사용하는 경우 수행 하려는 작업에 따라 수천 또는 수백만 또는 수억 명의 사용자가 사용할 수 있습니다.

두번째로 중요한 기준은 실행 속도인데요. 특히 큰 데이터 세트에서 훈련 할때 말이죠. 어떠한 특정 프레임워크는 여러분이 신경망을 더 빨리 실행하고 더 빨리 효율적으로 훈련 할 수 있도록 가능케 해줄 것입니다.

그 다음으로 사람들이 보통 이야기를 많이 하지 않는 기준은 프레임워크가 완전히 오픈되어있는지의 여부인데 이것이 중요한 기준이라고 생각합니다. 프레임워크가 완전히 오픈되기 위해서는 오픈 소스일 뿐만 아니라 좋은 거버넌스도 필요하다고 생각합니다.

작업 중인 애플리케이션에 따라 이것이 나눗셈이든 자연어 처리이든 온라인 광고든 그 밖의 무엇이든 간에 이러한 프레임워크 중 여러 가지가 좋은 선택이 될 수 있다고 생각합니다. 따라서 프로그래밍 프레임워크에서는 단순한 수치 선형 대수 라이브러리보다 더 높은 수준의 추상화를 제공하므로 이러한 프로그램 프레임워크는 머신러닝 어플을 더 효율적으로 만들어 줄 것입니다.

---

### TensorFlow

딥러닝 알고리즘을 개발하고 사용하는 방법을 훨씬 효율적으로 만드는 데 도움이 되는 딥러닝 프로그램 프레임워크가 거의 없습니다. 이러한 프레임워크 중 하나는 TensorFlow입니다.

이번에 하고자 하는 것은 TensorFlow 프로그램의 기본 구조를 단계별로 살펴보는 것이며, TensorFlow를 여러분이 사용하여 이러한 프로그램을 구현하고 신경망을 직접 구현할 수 있는 방법을 알 수 있습니다.

---

![image](https://user-images.githubusercontent.com/55765292/179642331-d38c9942-013f-4726-84f4-ed7e33dfa4af.png)

흥미를 돋구기 위한 문제로 시작해보겠는데요.

최소화하고 싶은 비용 함수 $J$가 있다고 가정해 보겠습니다. 이 예에서는 매우 간단한 비용 함수를 사용할 것입니다. $J(w) = w^2 -  10w + 25$인 비용 함수입니다.

이 함수는 실제로 $(w - 5)^2$이라는 것을 알 수 있습니다. 만약 이 이차적인 것을 확장한다면 위의 표현식을 얻을 수 있습니다. 이를 최소화하는 $w$값은, $w = 5$입니다.

하지만 몰랐다고 하고 비용함수만 있다고 생각해 봅시다. 이를 최소화하기 위해 TensorFlow에서 어떤 것을 구현할 수 있는지 알아보겠습니다.

왜냐하면 매우 유사한 구조이기 때문에 프로그램을 신경망 훈련에 사용할수 있는데 여기서 신경망의 모든 파라미터에 따라 복잡한 비용 함수 $J$를 얻을 수 있습니다. 그런 다음 유사하게 여러분은 TensorFlow를 사용하여 이 비용 함수를 최소화하는 $w$와 $b$의 값을 자동으로 찾으려고 하지만 왼쪽의 간단한 예부터 시작하겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/179642364-698ced4e-3765-42f3-8a57-21948f753c7b.png)


```
import numpy as np
import tensorflow as tf
```

TensorFlow를 시작하기 위해서 여러분은 numpy를 np로, tensorflow를 tf로 가져옵니다.

```
w = tf.Variable(0, dtype=tf.tloat32)
optimizer = tf.zeras.optimizers.Adam(0.1)

def train_step():
  with tf.GradientTape() as tape:
    cost = w ** 2 - 10 * w + 25
  trainable_variables = [w]
  grade = tape.gradient(cost,trainable_variables)
  optimizer.apply_gradients(zip(grade, trainable_variables))

print(w)
```
`tf.Variable 'Variable:0' shape=() dtype=float32, numpy=0.0>`

다음으로 할 일은 파라미터 w를 정의하는겁니다. `w = tf.Variable(0, dtype=tf.tloat32)`를 사용하여 변수를 0으로 초기화하고 dtype = tf.float 32로 ensorFlow 부동 소수점을 나타냅니다.

다음으로 사용할 최적화 알고리즘을 정의하겠습니다. 이 경우 Adam 최적화 알고리즘은 `optimizer = tf.zeras.optimizers.Adam(0.1)`입니다. 0.1의 학습률을 가지고 있다고 가정합시다.

그 다음으로 비용함수를 정의해보겠습니다. 비용 함수는 $w^2 -  10w + 25$라는 것을 기억하세요. 그것을 적으세요.

TensorFlow의 위대한 점은 바로 여러분은 단지 순전파를 구현하여 비용 함수의 가치를 계산하기 위해 코드를 작성하기만 하면 됩니다.

TensorFlow는 역전파를 수행하는 방법 또는 기울기 계산을 수행할 수 있습니다. 이를 위한 한 가지 방법은 GradientTape를 사용하는 것입니다. `with tf.GradientTape() as tape:` 구문을 보여드리겠는데요

Gradient Tape라는 이름의 직관력은 구식 카세트 테이프와 유사하며 여기서 Gradient Tape는 전진 단계에서 여러분이 비용 함수를 계산할 때 작업 순서를 기록합니다. 그리고 여러분이 테이프를 거꾸로 틀고 순서를 거꾸로 틀면 역순으로 조작 순서를 다시 확인할 수 있으며 그리고 상기 방법을 따라 역전파 및 기울기를 계산하는 단계를 포함합니다.

`def train_step():` 이제 루프를 반복하는 트레이닝 단계 함수를 정의해 보죠. 이 기능으로 단일 교육 단계를 정의하려고 합니다. 훈련의 한 반복을 수행하기 위해서 사용자는 `trainable_variables`를 정의해야 합니다. `trainable_variables` 는 단지 w가 있는 목록일 뿐입니다.

그런 다음 비용이 많이 드는 테이프 변수를 사용하여 그레이디언트를 계산할 것입니다. 이렇게 하면 최적기를 사용하여 그라데이션 및 그라데이션 변수를 적용할 수 있습니다. 우리가 사용할 신택스는 실제로 zip 기능을 사용할 것이며 내장된 Python 함수를 사용하여 다음과 같은 작업을 수행할 수 있는데요.

목록을 학습할 수 있는 변수로서 이 변수들을 쌍으로 구성하여 함수가 목록 두 개를 취하여 해당 요소를 쌍으로 묶을 수 있도록 합니다. 우리가 아직 train_step을 실행하지 않은 w의 초기 값을 인쇄하기 위해 여기에 print(w)를 입력하겠습니다. w는 처음에 초기화한 0의 값이며, 우리가 초기화한 것입니다.

```
train_step()
print(w)
```
`tf.Variable 'Variable:0' shape=() dtype=float32, numpy=0.9999997>`

이제 작은 학습 알고리즘의 한 단계를 실행해서 그리고 w의 새로운 값을 출력해 보니 0에서 약 0.1로 약간 증가했습니다.

```
for i in range(1000):
  train_step()
print(w)
```
`tf.Variable 'Variable:0' shape=() dtype=float32, numpy=5.000001>`

이제 train_step을 1000번 반복합시다. 만약 제가 1000개의 train_step print(w)를 준비한다면, 무슨 일이 벌어질지 봅시다. 꽤 빠르게 실행합니다. 이제 w는 거의 거의 5이며, 우리가 아는것은 이 비용의 최소한의 기능이었습니다.

몇 가지 주목해야 할 사항이 있는데요. w는 최적화하고자 하는 매개변수입니다. 이것이 변수로 선언한 이유입니다. 해야 할 일은 기울기 테이프를 사용하여 비용 함수를 계산하는 데 필요한 작업 순서를 기록하기만 하면 되고 그리고 그것이 유일한 문제이자 TensorFlow 비용 함수와 관련하여 미분을 취하는 방법을 자동으로 알아낼 수 있었습니다. 그래서 TensorFlow에서 단지 순전파를 구현하고 기울기 계산을 어떻게 하는지 알아내는 겁니다.
