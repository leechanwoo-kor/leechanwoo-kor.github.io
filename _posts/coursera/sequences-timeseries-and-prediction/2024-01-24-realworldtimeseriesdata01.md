![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/96eb77d8-9afb-4c69-9908-c25a7aa93ba2)---
title: "[TensorFlow] Real-world time series data (1)"
categories:
  - TensorFlow
tags:
  - Sequences
  - Time Series
  - RNN
  - LSTM
toc: true
toc_sticky: true
toc_label: "Real-world time series data"
toc_icon: "sticky-note"
---

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757" width="50%" height="50%">
</p><br>

## Convolution

간단한 RNN과 LSTM을 포함한 반복 신경망을 살펴보았습니다. 지금까지 살펴본 것과 같은 시퀀스를 학습하는 데 LSTM이 어떻게 유용할 수 있는지 살펴보셨습니다. 그리고 LSTM이 RNN과 관련된 몇 가지 문제를 제거하는 방법을 살펴보았습니다.

이번에는 한 단계 더 나아가 LSTM과 컨볼루션을 결합하여 매우 잘 맞는 모델을 얻을 수 있습니다. 그런 다음 이 과정을 시작할 때부터 작업해 온 합성 데이터 세트 대신 실제 데이터에 이를 적용할 것입니다.

<br>

```
model = tf.keras.models.Sequential([
  tf.keras.layers.Conv1D(filters=32, kernel_size=5, strides=1, padding="causal", activation="relu", input_shape=[None, 1]),
  tf.keras.layers.LSTM(32, return_sequences=True),
  tf.keras.layers.LSTM(32),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 200)
])

optimizer = tf.keras.optimizers.SGD(learning_rate=1e-5, momentum=0.9)

model.compile(loss=tf.keras.losses.Huber(),
              optimizer=optimizer,
              metrics=["mae"])

model.fit(dataset, epochs=500)
```

<br>

지난주에 보셨던 LSTM입니다. 다만 순차적 스택의 시작 부분에 추가한 것을 제외하고는요.

32개의 필터를 배우는 Conv1D입니다. 1차원 컨볼루션입니다. 이미지 컨볼루션이 수행되는 것과 거의 같은 방식으로, 5개의 숫자창을 선택하고 그 창에 있는 값들을 필터 값에 곱해 보겠습니다.

<br>

## Bi-directional LSTMs

<br>

```
model = tf.keras.models.Sequential([
  tf.keras.layers.Conv1D(filters=32, kernel_size=5, strides=1, padding="causal", activation="relu", input_shape=[None, 1]),
  tf.keras.layers.LSTM(32, return_sequences=True),
  tf.keras.layers.LSTM(32),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 200)
])

optimizer = tf.keras.optimizers.SGD(learning_rate=1e-5, momentum=0.9)

model.compile(loss=tf.keras.losses.Huber(),
              optimizer=optimizer,
              metrics=["mae"])

model.fit(dataset, epochs=500)
```

<br>

한 가지 중요한 점은 LSTM으로 작업하기 위해 입력 모양을 변경하는 람다 레이어를 제거했다는 것입니다. 따라서 여기서는 실제로 곡선 1D에 입력 모양을 지정하고 있습니다.

<br>

```
def windowed_dataset(series, window_size, batch_size, shuffle_buffer):

  ds = tf.data.Dataset.from_tensor_slices(series)
  df = ds.window(window_size + 1, shift=1, drop_remainder=True)
  ds = ds.flat_map(lambda w: w.batch(window_size + 1))
  ds = ds.shuffle(shuffle_buffer)
  ds = ds.map(lambda w: (w[:-1], w[-1]))

  return ds.batch(batch_size).prefetch(1)
```

<br>

이를 위해서는 우리가 계속 작업해 온 윈도우 데이터 세트 도우미 함수가 필요합니다. 또한 지난주와 마찬가지로 이 코드는 다양한 학습률을 에포크로 변경하고 그 결과를 플롯합니다.

이 데이터와 컨볼루션 및 LSTM 기반 네트워크를 사용하면 다음과 같은 플롯을 얻을 수 있습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a6d945ae-66fe-447c-904b-41e1af2fda17" width="50%" height="50%">
</p><br>

10에서 마이너스 5 사이가 분명 바닥이고 그 이후에는 약간 불안정해 보이므로 이 값을 원하는 학습률로 삼겠습니다.

<br>

```
model = tf.keras.models.Sequential([
  tf.keras.layers.Conv1D(filters=32, kernel_size=5, strides=1, padding="causal", activation="relu", input_shape=[None, 1]),
  tf.keras.layers.LSTM(32, return_sequences=True),
  tf.keras.layers.LSTM(32),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 200)
])

optimizer = tf.keras.optimizers.SGD(learning_rate=1e-5, momentum=0.9)

model.compile(loss=tf.keras.losses.Huber(),
              optimizer=optimizer,
              metrics=["mae"])

model.fit(dataset, epochs=500)
```

<br>


따라서 최적화를 정의할 때 아래와 같이 학습률을 1e-5로 설정합니다. 500에포크 동안 학습하면 이 곡선을 얻을 수 있습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cc1ec26d-1f9b-4aa8-94c5-3e740b4a6dc1" width="50%" height="50%">
</p><br>

이전보다 크게 개선되었습니다. 피크가 정체기를 벗어났지만 여전히 데이터에 비해 충분히 높지 않습니다. 물론 노이즈가 한 요인이고 노이즈로 인해 피크가 크게 변동하는 것을 볼 수 있지만, 우리 모델이 이보다 조금 더 잘할 수 있다고 생각합니다. 우리의 MAE는 5 미만이지만 첫 번째 피크를 제외하면 이보다 훨씬 낮을 것입니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0912b159-5c78-4199-ac32-c6fa3d2a3164">
</p><br>

한 가지 해결책은 조금 더 오래 훈련하는 것입니다. 500 에포크에서 MAE 손실 곡선이 평평해 보이지만, 확대하면 천천히 감소하는 것을 볼 수 있습니다. 네트워크는 느리지만 여전히 학습하고 있습니다.

<br>

```
model = tf.keras.models.Sequential([
  tf.keras.layers.Conv1D(filters=32, kernel_size=5, strides=1, padding="causal", activation="relu", input_shape=[None, 1]),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32, return_sequences=True)),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 200)
])
```

이제 한 가지 방법은 LSTM을 이렇게 양방향으로 만드는 것입니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b8aedaae-bd70-4f30-9ff1-833c3aa1e1da" width="50%" height="50%">
</p><br>

훈련할 때, 이 방법은 MAE 값의 손실이 매우 낮고 때로는 1보다 작아 매우 좋아 보입니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0de9c5b0-62bf-4521-b274-c2670aeacab9" width="50%" height="50%">
</p><br>

하지만 안타깝게도 검증 세트에 대한 예측을 플로팅할 때 과적합이 발생하며, 실제로 과적합을 피하기 위해 일부 매개변수를 조정해야 할 수도 있습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2b2d03b8-c9df-4d14-bdeb-5d28daec5b83">
</p><br>

MAE에 대한 손실을 플롯하면 많은 노이즈와 불안정성이 있다는 문제가 명확하게 시각화됩니다. 이와 같은 작은 스파이크의 일반적인 원인 중 하나는 배치 크기가 작아 무작위 노이즈가 더 많이 발생하기 때문입니다.

한 가지 힌트는 배치 크기를 살펴보고 그것이 제 데이터에 적합한지 확인하는 것이었습니다. 따라서 이 경우에는 다양한 배치 크기로 실험해 볼 가치가 있습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f5f655d8-2c56-4dac-955e-a5cf3c42df87" width="50%" height="50%">
</p><br>

예를 들어 원래 32개보다 크고 작은 다양한 배치 크기를 실험해 보았는데, 16개를 시도했을 때 검증 세트에 미치는 영향과 훈련 손실 및 MAE 데이터에 미치는 영향을 여기에서 확인할 수 있습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ff0cf9fe-3c1f-4a87-9f3b-67cad0a5b079">
</p><br>
