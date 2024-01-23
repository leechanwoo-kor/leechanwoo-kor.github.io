---
title: "[TensorFlow] Real-world time series data (3)"
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

## Combining our tools for analysis

표준 DNN을 사용하여 흑점 데이터를 살펴봤습니다. 또한 합성곱 신경망을 많이 사용하고 컨볼루션 신경망도 조금 사용해 왔습니다. 그렇다면 이 모든 것을 종합하여 흑점 활동을 예측할 수 있는지 알아보면 어떻게 될까요?

앞서 살펴본 것처럼 태양 흑점의 주기가 약 11년으로 매우 길고, 그 기간 동안 계절이 완벽하게 일치하지 않기 때문에 이것은 어려운 데이터 세트입니다.

따라서 머신러닝을 사용하여 제대로 된 예측을 구축할 수 있는지 모든 도구를 사용하여 살펴보겠습니다.

<br>

```
window_size = 60
batch_size = 64
train_set = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Conv1D(filters=32, kernel_size=5,
                      strides=1,
                      padding='causal',
                      activation="relu",
                      input_shape=[None, 1]),
  tf.keras.layers.LSTM(32, return_sequences=True),
  tf.keras.layers.LSTM(32),
  tf.keras.layers.Dense(30, activation="relu"),
  tf.keras.layers.Dense(10, activation="relu"),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 400)
])

lr_schedule = tf.keras.callbacks.LearningRateScheduler(lambda epoch: 1e-8 * 10**(epoch / 20))
optimizer = tf.keras.optimizers.SGD(learning_rate=1e-8, momentum=0.9)
model.compile(loss=tf.keras.losses.Huber(), optimizer=optimizer, metrics=["mae"])
history = model.fit(train_set, epochs=100, callbacks=[lr_schedule])
```

가장 먼저 시도해 볼 수 있는 코드가 있습니다. 조금 복잡하게 만들었으니 하나하나 분석해 보겠습니다.

먼저 배치 크기를 64로 설정하고 창 크기를 60으로 설정하겠습니다.

그런 다음 1D 컨볼루션으로 시작하여 32개의 필터를 학습합니다.

이렇게 하면 각각 32개의 셀을 가진 두 개의 LSTM으로 출력한 다음 앞서 본 것과 유사한 뉴런 30개, 10개, 1개로 DNN에 공급합니다.

마지막으로, 숫자가 1-400 범위이므로 X에 400을 곱하는 람다 레이어가 있습니다.

<br>

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6b0e8377-ee2c-405b-8fba-1f3ecf8b9d2a" width="75%" height="75%">
</p><br>

최상의 학습률을 설정하기 위한 첫 번째 테스트 실행을 통해 이 차트를 얻을 수 있습니다. 이 차트는 이 네트워크의 최적 학습률이 약 10에서 마이너스 5 사이임을 시사합니다.

`learning_rate=1e-5`

이 설정으로 500회 동안 훈련했을 때 결과는 다음과 같습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3202ef59-dfdd-4932-a861-ab0621b36f2c" width="75%" height="75%">
</p><br>

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ea79354d-d8d7-4e9a-a08f-9ac4cc9373f0">
</p><br>

낮은 MAE로 꽤 괜찮은 결과입니다. 하지만 훈련 중 손실 함수를 보면 노이즈가 많다는 것을 알 수 있는데, 이는 확실히 최적화할 수 있다는 것을 의미하며, 이전 비디오에서 보았듯이 이러한 상황에서 가장 잘 살펴봐야 할 것 중 하나는 배치 크기입니다.

그래서 256으로 늘리고 다시 훈련해 보겠습니다.

`batch_size=256`

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6db51571-2b13-4137-b59e-f358294e95c4" width="75%" height="75%">
</p><br>

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d4aa1ec1-e14d-48b6-a5a0-2942a010c770">
</p><br>

500개의 에포크가 지나고 나니 예측이 약간 개선되어 올바른 방향으로 나아가고 있습니다. 하지만 제 훈련 노이즈를 보세요. 특히 훈련이 끝날 무렵에는 정말 시끄럽지만 매우 규칙적으로 보이는 파동입니다. 이것은 내 배치 크기가 좋았지만 약간 벗어난 것일 수도 있음을 시사합니다. 보시다시피 변동이 매우 작기 때문에 치명적이지는 않지만, 이 손실을 조금 더 규칙화할 수 있다면 매우 좋을 것 같아서 다른 시도를 해보려고 합니다.


<br>

```
window_size = 60
batch_size = 250
train_set = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Conv1D(filters=60, kernel_size=5,
                      strides=1,
                      padding='causal',
                      activation="relu",
                      input_shape=[None, 1]),
  tf.keras.layers.LSTM(60, return_sequences=True),
  tf.keras.layers.LSTM(60),
  tf.keras.layers.Dense(30, activation="relu"),
  tf.keras.layers.Dense(10, activation="relu"),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 400)
])

optimizer = tf.keras.optimizers.SGD(learning_rate=1e-5, momentum=0.9)
model.compile(loss=tf.keras.losses.Huber(), optimizer=optimizer, metrics=["mae"])
history = model.fit(train_set, epochs=500)
```

제 훈련 데이터에는 3,000개의 데이터 포인트가 있습니다. 그런데 왜 내 창 크기와 배치 크기 같은 것들이 반드시 3,000으로 균등하게 나눌 수 없는 2의 거듭제곱이 될까요? 창 크기와 배치 크기뿐만 아니라 매개 변수를 적절하게 변경하려면 필터도 변경하면 어떻게 될까요? 필터를 60으로 설정하고 LSTM을 32나 64가 아닌 60으로 설정하면 어떨까요? 이미 DNN이 좋아 보이므로 변경하지 않겠습니다.

500회에 걸쳐 훈련한 결과, 노이즈와 손실 함수가 약간 증가하여 배치 크기를 다시 실험해보고 싶었습니다. 그래서 배치 크기를 100으로 줄였더니 이런 결과가 나왔습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/864cbb83-af6d-46a1-97ba-50c7345e50fd" width="75%" height="75%">
</p><br>

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fb832451-bbec-4a00-bf41-bad491ca1eca">
</p><br>

이제 여기서 제 MAE가 실제로 약간 올라갔습니다. 예측은 이전보다 높은 피크에서 훨씬 더 잘 수행되고 있지만 전반적인 정확도는 떨어지고 몇 가지 큰 폭의 하락을 제외하고는 손실이 완화되었습니다.

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0e04f5c8-810e-42c8-abd6-89ee7454804c" width="75%" height="75%">
</p><br>

<br><p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ff2aa04-1f93-4e3f-bcbc-e3de59a98a2a">
</p><br>

이와 같은 하이퍼파라미터로 실험하는 것은 시퀀스뿐만 아니라 무엇이든 머신러닝의 모든 것을 배울 수 있는 좋은 방법입니다. 시간을 투자하여 이 모델을 개선할 수 있는지 살펴볼 것을 적극 권장합니다. 또한 이 작업과 함께 머신 러닝의 모든 요소가 어떻게 작동하는지 자세히 살펴봐야 합니다.
