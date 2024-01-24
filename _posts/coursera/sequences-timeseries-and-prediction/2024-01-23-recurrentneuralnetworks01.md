---
title: "[TensorFlow] Recurrent Neural Networks for Time Series (1)"
categories:
  - TensorFlow
tags:
  - Sequences
  - Time Series
  - RNN
  - LSTM
toc: true
toc_sticky: true
toc_label: "Recurrent Neural Networks for Time Series"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757){: .align-center width="50%" height="50%"}<br>

# Recurrent Neural Networks for Time Series

이번에는 시계열 데이터에 RNN과 LSTM을 적용합니다. 지난번에는 이 데이터에 DNN을 적용했습니다.

하지만 시계열은 시간적 데이터이므로 RNN이나 LSTM과 같은 시퀀스 모델을 적용해야 합니다.

시계열 데이터와 같은 경우, 30일 또는 30개 기간의 시계열 데이터에서 예측 날짜에 더 가까운 데이터의 가능성이 더 먼 데이터에 더 큰 영향을 미칠 가능성이 있다는 것을 알 수 있죠? 그럴 가능성이 더 높습니다.

따라서 RNN과 LSTM을 사용하면 이를 데이터에 반영하여 훨씬 더 정확한 예측을 할 수 있습니다.

훨씬 더 큰 윈도우 너머로 멀리 떨어진 곳의 컨텍스트를 전달할 수 있죠.

긴 학습 과정에서 컨텍스트를 전달할 수 있는 셀 상태를 갖는 방식이죠. 일부 시계열 데이터에서는 이것이 정말 큰 영향을 미칠 수 있습니다.

예를 들어, 금융 데이터의 경우 30일 전, 60일 전, 90일 전의 종가보다 오늘의 종가가 내일의 종가에 더 큰 영향을 미칠 수 있습니다.

따라서 RNN와 LSTM을 사용하면 계절적 데이터를 훨씬 더 정확하게 예측할 수 있습니다.

그리고 이번에 보게 될 재미있는 것 중 하나는 람다 레이어입니다.

프로그래머로서 람다 레이어는 편안함을 줍니다. 신경망을 처음 시작할 때 힘든 점 중 하나가 전처리를 위한 코드를 모두 작성하고 후처리를 위한 코드를 모두 작성하는 것입니다.

그런 다음 신경망을 정의하면 신경망 내부에서 이 모든 마법을 수행합니다. 하지만 그 안에서 무슨 일이 일어나는지 제어할 수 없습니다.

그냥 신경망이 하고 싶은 대로 하죠. 아니면 신경망이 하도록 설계된 대로만 하든가.

하지만 텐서플로우와 Keras에서는 람다 레이어를 사용하면 신경망의 레이어처럼 임의의 코드를 효과적으로 작성할 수 있습니다.

예를 들어, 명시적인 전처리 단계를 통해 데이터를 확장한 다음 해당 데이터를 신경망에 공급하는 대신 람다 레이어를 사용할 수 있습니다.

기본적으로 람다 함수는 이름 없는 함수이지만 데이터를 재전송하고 크기를 조정하는 신경망의 레이어로 구현됩니다.

이제 전처리 단계는 더 이상 별도의 별개의 단계가 아니라 신경망의 일부가 되었습니다.

프로그래머 입장에서는 이러한 제어가 가능해져서 훨씬 더 편해졌습니다. 그리고 이런 종류의 것을 만들 수 있다는 것은 훨씬 더 재미있습니다.

<br>

# Conceptual Overview

몇 가지 간단한 분석 기법으로 시작한 다음, 머신 러닝을 사용하여 간단한 회귀를 수행하는 것으로 확장했습니다.

거기에서 더 나은 모델을 얻기 위해 약간 조정한 DNN을 사용합니다. 이번에는 예측 작업을 위한 순환신경망에 대해 알아보겠습니다.

## Recurrent Neural Network, RNN

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/65db66ce-e8a3-49bd-b123-acd33f9a7008){: .align-center width="75%" height="75%"}<br>

순환 신경망 또는 RNN은 순환 레이어가 포함된 신경망입니다. 이는 일련의 입력을 순차적으로 처리하도록 설계되었습니다.RNN은 매우 유연하여 모든 종류의 시퀀스를 처리할 수 있습니다.

이 예제에서는 두 개의 반복 레이어와 최종 밀집 레이어가 포함된 RNN을 구축하여 출력으로 사용합니다.

RNN을 사용하면 시퀀스를 일괄적으로 공급할 수 있으며, 이전에 했던 것처럼 예측을 일괄적으로 출력할 수 있습니다.

한 가지 차이점은 RNN을 사용할 때 전체 입력 형태가 3차원이라는 점입니다.

첫 번째 차원은 배치 크기, 두 번째 차원은 타임스탬프, 세 번째 차원은 각 시간 단계별 입력의 차원입니다.

예를 들어, 단변량 시계열인 경우 이 값은 1이 되고, 다변량인 경우 이보다 커집니다.

지금까지 사용했던 모델에는 2차원 입력이 있었고, 배치 차원이 첫 번째 차원이었고, 두 번째 차원에는 모든 입력 기능이 있었습니다.

하지만 더 나아가기 전에 RNN 레이어를 자세히 살펴보고 어떻게 작동하는지 알아보겠습니다.

## Recurrent Layer

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/48946abd-fa1c-4930-8b78-779e509aa655){: .align-center width="75%" height="75%"}<br>

많은 셀이 있는 것처럼 보이지만 실제로는 하나뿐이며, 출력을 계산하는 데 반복적으로 사용됩니다.

이 다이어그램에서는 셀이 많은 것처럼 보이지만, 레이어에서 동일한 셀을 여러 번 재사용하고 있는 것입니다.

각 시간 단계에서 메모리 셀은 해당 단계의 입력 값을 가져옵니다.

예를 들어, 시간 0에는 0이고 상태 입력은 0입니다. 그런 다음 해당 단계의 출력(이 경우 Y0)과 다음 단계에 공급되는 상태 벡터 H0을 계산합니다.

H0은 X1과 함께 셀에 공급되어 Y1과 H1을 생성하고, 다음 단계의 셀에 X2와 함께 공급되어 Y2와 H2를 생성합니다.

이 단계는 입력 차원(이 경우 30개의 값이 있는)의 끝에 도달할 때까지 계속됩니다.

이러한 유형의 아키텍처를 순환 신경망이라고 부르는 이유는 셀의 출력으로 인해 값이 반복되고, 한 단계의 값이 다음 시간 단계에서 다시 입력되기 때문입니다.

NLP에서 살펴본 바와 같이, 이는 상태를 판단하는 데 매우 유용합니다.

문장에서 단어의 위치에 따라 그 의미가 결정될 수 있습니다.

마찬가지로 숫자 계열의 경우 계열에서 가까운 숫자가 목표 값에서 멀리 떨어진 숫자보다 더 큰 영향을 미칠 수 있습니다.

<br>

# Shape of the inputs to the RNN

데이터의 형태와 데이터가 분할되는 배치에 대해 언급했습니다.

이를 살펴보는 것이 중요하며, 다음으로 이에 대해 자세히 알아보겠습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/95a6d6a8-6e26-4192-ab50-62f5313ee05c){: .align-center width="75%" height="75%"}<br>

입력은 3차원입니다. 예를 들어 윈도우 크기가 30개이고 타임스탬프가 4개씩 일괄 처리한다고 가정하면, 모양은 4×30×1이 되고 각 타임스탬프의 메모리 셀 입력은 다음과 같이 4×1 행렬이 됩니다.

X 셀은 또한 이전 단계의 상태 행렬을 입력받습니다. 물론 이 경우 첫 번째 단계에서는 0이 됩니다.

이후 단계에서는 메모리 셀의 출력이 됩니다. 물론 셀은 상태 벡터를 제외하고는 여기서 볼 수 있는 Y 값을 출력합니다.

메모리 셀이 3개의 뉴런으로 구성된 경우, 입력되는 배치 크기가 4개이고 뉴런의 수가 3개이므로 출력 행렬은 4×3이 됩니다.

따라서 레이어의 전체 출력은 3차원이며, 이 경우 4×30×3입니다.

4는 배치 크기, 3은 유닛 수, 30은 전체 스텝 수입니다.

예를 들어, H_0은 Y_0의 복사본이고, H_1은 Y_1의 복사본인 것처럼 단순 RNN에서 상태 출력 H는 출력 행렬 Y의 복사본일 뿐입니다.

따라서 각 타임스탬프에서 메모리 셀은 현재 입력과 이전 출력을 모두 가져옵니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f0838ca4-2a88-4ddc-9562-d934ae960e85){: .align-center width="75%" height="75%"}<br>

어떤 경우에는 시퀀스를 입력하되 출력은 하지 않고 배치의 각 인스턴스에 대해 단일 벡터만 얻고 싶을 수도 있습니다.

이를 일반적으로 Sequence-to-Vector RNN이라고 합니다.

하지만 실제로는 마지막 출력을 제외한 모든 출력을 무시하면 됩니다. TensorFlow에서 Keras를 사용할 때는 이것이 기본 동작입니다.

따라서 반복 레이어가 시퀀스를 출력하도록 하려면 레이어를 만들 때 반환 시퀀스를 참으로 지정해야 합니다.

하나의 RNN 레이어를 다른 레이어 위에 쌓을 때 이 작업을 수행해야 합니다.

<br>

# Outputting a Sequence

```python
model = keras.models.Sequential([
  keras.layers.SimpleRNN(20, return_sequences=True, input_shape=[None, 1]),
  keras.layers.SimpleRNN(20),
  keras.layers.Dense(1)
])
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/48878f2c-ea59-4e96-8100-1291183ae3fc){: .align-center width="75%" height="75%"}<br>

두 개의 반복 레이어가 있고 첫 번째 레이어에는 `return_sequences=True`가 설정되어 있는 이 RNN을 예로 들어보겠습니다.

이 레이어는 다음 레이어에 공급되는 시퀀스를 출력합니다.

다음 레이어에는 `return_sequence`가 `True`로 설정되어 있지 않으므로 마지막 단계까지만 출력됩니다.

하지만 `input_shape`를 보면 `[None, 1]`로 설정되어 있습니다.

TensorFlow는 첫 번째 차원이 배치 크기이며 어떤 크기든 가질 수 있다고 가정하므로 이를 정의할 필요가 없습니다.

다음 차원은 타임스탬프 수인데, 이 차원은 0으로 설정할 수 있으며, 이는 RNN이 모든 길이의 시퀀스를 처리할 수 있음을 의미합니다.

마지막 차원은 단변량 시계열을 사용하기 때문에 단 하나입니다.

```python
model = keras.models.Sequential([
  keras.layers.SimpleRNN(20, return_sequences=True, input_shape=[None, 1]),
  keras.layers.SimpleRNN(20, return_sequences=True),
  keras.layers.Dense(1)
])
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/09cf8531-03fe-4f30-8b82-cc7972c86c09){: .align-center width="75%" height="75%"}<br>

`return_sequences`와 모든 반복 레이어를 true로 설정하면 모든 레이어가 시퀀스를 출력하고 밀집 레이어는 시퀀스를 입력으로 받게 됩니다.

Keras는 각 타임스탬프에서 동일한 밀집 레이어를 독립적으로 사용하여 이 문제를 처리합니다.

여기서는 여러 개의 레이어가 있는 것처럼 보이지만 각 타임스탬프에서 재사용되는 것은 동일한 레이어입니다.

이를 sequence to sequence RNN이라고 합니다. 시퀀스 배치가 공급되면 동일한 길이의 시퀀스 배치를 반환합니다.

차원이 항상 일치하지 않을 수도 있습니다. 메모리 판매의 단위 수에 따라 달라집니다. 

```python
model = keras.models.Sequential([
  keras.layers.SimpleRNN(20, return_sequences=True, input_shape=[None, 1]),
  keras.layers.SimpleRNN(20),
  keras.layers.Dense(1)
])
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/48878f2c-ea59-4e96-8100-1291183ae3fc){: .align-center width="75%" height="75%"}<br>

이제 두 번째 레이어가 시퀀스를 반환하지 않는 2계층 RNN으로 돌아가 보겠습니다. 이렇게 하면 단일 밀도에 대한 출력을 얻을 수 있습니다.

<br>

# Lambda Layers

```python
model = keras.models.Sequential([
  keras.layers.Lambda(lambda x: tf.expand_dims(x, axis=-1), input_shape=[None]),
  keras.layers.SimpleRNN(20, return_sequences=True, return_sequences=True),
  keras.layers.SimpleRNN(20),
  keras.layers.Dense(1),
  keras.layers.Lambda(lambda x: x * 100.0)
])
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/48878f2c-ea59-4e96-8100-1291183ae3fc){: .align-center width="75%" height="75%"}<br>

하지만 여기에 몇 개의 새로운 레이어, 즉 람다 유형을 사용하는 레이어를 추가하고 싶습니다.

이 유형의 레이어는 임의의 연산을 수행하여 텐서플로우의 Keras 기능을 효과적으로 확장할 수 있는 레이어이며, 모델 정의 자체 내에서 이 작업을 수행할 수 있습니다.

따라서 첫 번째 람다 레이어는 차원을 지원하는 데 사용됩니다.

윈도우 데이터 세트 도우미 함수를 작성했을 때를 기억한다면, 이 함수는 데이터에 대한 2차원 윈도우 배치를 반환했는데, 첫 번째는 배치 크기이고 두 번째는 타임스탬프 수였습니다.

하지만 RNN은 배치 크기, 타임스탬프 수, 계열 차원이라는 3차원을 기대합니다.

람다 레이어를 사용하면 윈도우 데이터 세트 도우미 함수를 다시 작성하지 않고도 이 문제를 해결할 수 있습니다.

람다를 사용하면 배열을 한 차원씩 확장하기만 하면 됩니다. 입력 모양을 없음으로 설정하면 모델이 모든 길이의 시퀀스를 취할 수 있다는 뜻입니다.

마찬가지로 출력을 100으로 확대하면 학습을 도울 수 있습니다.

RNN 레이어의 기본 활성화 함수는 쌍곡선 탄젠트 활성화인 tanh입니다. 이 함수는 음수와 1 사이의 값을 출력합니다.

시계열 값은 보통 40대, 50대, 60대, 70대와 같이 10대의 순서로 나오기 때문에 출력을 같은 구장으로 확장하면 학습에 도움이 될 수 있습니다.

람다 레이어에서도 이 작업을 수행할 수 있으며, 단순히 100을 곱하기만 하면 됩니다.