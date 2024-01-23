---
title: "[TensorFlow] Recurrent Neural Networks for Time Series (2)"
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

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757" width="50%" height="50%">
</p>

## Adjusting the learning rate dynamically

이전에서 RNN을 살펴보고, 이를 어떻게 sequence to vector, sequence to sequence 예측에 사용할 수 있는지 알아보았습니다. 이제 당면한 문제에 대해 코딩하고 이를 사용해 시계열에서 좋은 예측을 얻을 수 있는지 살펴보겠습니다.

앞으로 보게 될 한 가지는 옵티마이저의 학습 속도에 맞게 신경망을 최적화하는 코드를 조금 작성해 보겠다는 것입니다. 이 코드는 매우 빠르게 훈련할 수 있으며, 이를 통해 하이퍼파라미터 튜닝에 많은 시간을 절약할 수 있습니다.

<br>

```
train_set = windowed_dataset(x_train, window_size, batch_size=128, shuffle_buffer=shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Lambda(lambda x: tf.expand_dims(x, axis=-1), input_shape=[None]),
  tf.keras.layers.SimpleRNN(40, return_sequences=True),
  tf.keras.layers.SimpleRNN(40),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 100.0)
])

lr_schedule = tf.keras.callbacks.LearningRateScheduler(lambda epoch: 1e-8 * 10**(epoch / 20))

optimizer = tf.keras.optimizers.SGD(learning_rate=1e-8, momentum=0.9)

model.compile(loss=tf.keras.losses.Huber(),
              optimizer=optimizer,
              metrics=["mae"])

history = model.fit(train_set, epochs=100, callback=[lr_schedule])
```

다음은 각각 40개의 셀이 있는 두 개의 레이어로 RNN을 훈련하는 코드입니다. 학습 속도를 조정하기 위해 여기에서 볼 수 있는 콜백을 설정합니다. 각 에포크마다 학습 속도가 조금씩 변경되며, 학습하는 동안 여기에서 해당 설정을 확인할 수 있습니다.

또한 여기에서 볼 수 있는 Huber라는 새로운 손실 함수를 도입했습니다. Huber 함수는 이상값에 덜 민감한 손실 함수이며, 이 데이터는 약간 노이즈가 있을 수 있으므로 한번 사용해 볼 가치가 있습니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4feeb92b-b9d8-477d-84b6-1baaf5d659ce"
    width="50%" height="50%">
</p>

<br>

100개의 에포크에 대해 이 함수를 실행하고 각 에포크에서 손실을 측정하면 확률적 경사 하강에 대한 최적의 학습률이 약 마이너스 10에서 마이너스 5 사이임을 알 수 있습니다.

이제 이 학습률과 확률적 경사 하강 최적화 도구로 컴파일된 모델을 설정하겠습니다.

<br>

```
tf.keras.backend.clear_session()
tf.random.set_seed(51)
np.random.seed(51)

dataset = windowed_dataset(x_train, window_size, batch_size=128)
shuffle_buffer=shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Lambda(lambda x: tf.expand_dims(x, axis=-1), input_shape=[None]),
  tf.keras.layers.SimpleRNN(40, return_sequences=True),
  tf.keras.layers.SimpleRNN(40),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 100.0)
])

optimizer = tf.keras.optimizers.SGD(learning_rate=5e-6, momentum=0.9)
model.compile(loss=tf.keras.losses.Huber(), optimizer=optimizer, metrics=["mae"])
history = model.fit(dataset, epochs=500)
```

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/248f024f-3bad-4bc0-ae45-8d7dce618f49" width="50%" height="50%">
</p>

<br>

500개의 에포크에 대해 훈련한 후 이 차트를 얻게 되는데, 검증 세트의 MAE는 약 6.35입니다. 나쁘지는 않지만 더 잘할 수 있을지 궁금합니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6762a155-2323-4653-9724-0876c43aba2a">
</p>

<br>

오른쪽 차트는 지난 몇 개의 에포크로 확대된 트레이닝 중 손실과 MAE입니다. 보시다시피, 400에포크가 조금 지나서 불안정해지기 시작할 때까지는 진정으로 하락하는 추세였습니다. 이 점을 감안할 때 약 400개 차트주기에 대해서만 훈련하는 것이 좋습니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/97161620-414b-4b56-8f05-26398a52d887" width="50%" height="50%">
</p>

<br>

그렇게 하면 이런 결과가 나옵니다. MAE가 조금 더 높을 뿐 거의 동일하지만, 이를 위해 100에포크 상당의 훈련을 절약했습니다. 그러니 그만한 가치가 있습니다.


<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/790d075d-388d-49cc-8af1-246a180ae74f">
</p>

<br>

훈련 MAE와 손실을 간단히 살펴보면 다음과 같은 결과가 나옵니다. 간단한 RNN을 사용한 것만으로도 꽤 좋은 결과를 얻었습니다.

<br>

RNN을 사용하여 시퀀스의 값을 예측하는 실험을 했습니다. 결과는 좋았지만 예측에서 이상한 정체기에 부딪히면서 약간의 개선이 필요했습니다. 다양한 하이퍼파라미터를 사용해 실험한 결과 어느 정도 개선이 이루어졌지만, RNN 대신 LSTM을 사용해 그 효과를 확인하는 것이 더 나은 접근 방식일 수 있습니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c2b032d0-e8df-4e26-b4f0-ae98968c3343"
    width="50%" height="50%">
</p>

<br>

RNN을 처음 보셨을 때를 기억하신다면 다음과 같이 생겼습니다. 배치 또는 X를 입력으로 받는 셀이 있고, Y 출력과 상태 벡터를 계산하여 다음 X와 함께 셀에 입력하면 Y와 상태 벡터가 나오는 식으로 작동했습니다.

이는 상태가 후속 계산에 영향을 미치지만, 타임스탬프에 따라 그 영향이 크게 감소할 수 있다는 것을 의미합니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f551deda-c375-4d91-8ff2-2981762cb8ff"
    width="50%" height="50%">
</p>

<br>

LSTM은 여기에 셀 상태를 추가하여 학습 기간 내내 상태를 유지함으로써 셀에서 셀로, 타임스탬프에서 타임스탬프로 상태가 전달되고 더 잘 유지될 수 있도록 합니다. 즉, 창 초기의 데이터가 RNN의 경우보다 전체 투영에 더 큰 영향을 미칠 수 있습니다. 상태는 또한 양방향이 될 수 있으므로 상태가 앞뒤로 이동할 수 있습니다. 텍스트의 경우 이 기능은 정말 강력했습니다.

숫자 시퀀스를 예측하는 데 있어서는 그럴 수도 있고 아닐 수도 있으며, 실험해 보는 것도 흥미로울 것입니다.

<br>

## Coding LSTMs

```
tf.keras.backend.clear_session()

dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Lambda(lambda x: tf.expand_dims(x, axis=-1), input_shape=[None]),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 100.0)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

<br>

먼저 `tf.keras.backend.clear_session`은 모든 내부 변수를 지웁니다. 이를 통해 모델이 이후 버전에 영향을 주지 않고 쉽게 실험할 수 있습니다.

차원을 확장하는 람다 레이어 다음에 32개의 셀이 있는 단일 LSTM 레이어를 추가했습니다. 또한 예측에 미치는 영향을 확인하기 위해 양방향을 만들었습니다.

출력 뉴런은 예측 값을 제공합니다.

또한 10의 1 곱하기 6의 학습 속도를 사용하고 있는데, 이것도 실험해 볼 가치가 있을 것 같습니다.

지금까지 사용한 합성 데이터에 대해 이 LSTM을 실행한 결과는 다음과 같습니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ade78eb9-79c4-435c-80aa-aee58cb12e52"
    width="50%" height="50%">
</p>

큰 스파이크 아래의 정체 구간은 여전히 존재하며 MAE는 6% 초반에 머물러 있습니다. 나쁘지도, 훌륭하지도 않지만 나쁘지는 않습니다. 예측도 약간 낮은 편에 속하는 것 같습니다.

<br>

```
tf.keras.backend.clear_session()

dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Lambda(lambda x: tf.expand_dims(x, axis=-1), input_shape=[None]),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32, return_sequences=True)),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 100.0)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

<br>

따라서 코드를 편집하여 다른 LSTM을 추가하여 영향을 확인해 보겠습니다. 이제 두 번째 레이어를 볼 수 있으며, 이것이 작동하려면 첫 번째 레이어에서 `return_sequences=True`로 설정해야 한다는 것을 알 수 있습니다. 이를 훈련하면 다음과 같은 결과를 볼 수 있습니다. 다음은 차트입니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/063bcc57-8f3f-4cb9-b58a-d13f871b7232"
    width="50%" height="50%">
</p>

<br>

이제 훨씬 더 잘 추적되고 원본 데이터에 더 가까워졌습니다. 급격한 증가를 따라잡지는 못하지만 적어도 비슷하게 추적하고 있습니다. 또한 평균 오차도 훨씬 개선되어 올바른 방향으로 가고 있음을 보여줍니다.

<br>

```
tf.keras.backend.clear_session()

dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Lambda(lambda x: tf.expand_dims(x, axis=-1), input_shape=[None]),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32, return_sequences=True)),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32, return_sequences=True)),
  tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
  tf.keras.layers.Dense(1),
  tf.keras.layers.Lambda(lambda x: x * 100.0)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

<br>

소스를 편집하여 이와 같이 세 번째 LSTM 레이어를 추가하고 두 번째 레이어를 `return_sequences=True`로 설정하면 트레이닝하고 실행하면 다음과 같은 출력을 얻을 수 있습니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9a8e62af-f5db-4861-b543-54cdf3481071"
    width="50%" height="50%">
</p>

<br>
