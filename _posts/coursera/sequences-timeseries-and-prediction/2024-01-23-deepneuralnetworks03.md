---
title: "[TensorFlow] Deep Neural Networks for Time Series (3)"
categories:
  - TensorFlow
tags:
  - Sequences
  - Time Series
toc: true
toc_sticky: true
toc_label: "Deep Neural Networks for Time Series"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757">
</p>

## Deep neural network training, tuning and prediction

시퀀스의 다음 값을 예측하기 위한 머신러닝에 대해 살펴보았습니다. 데이터를 훈련할 수 있는 윈도우 청크로 분해하는 방법을 배웠고, 선형 회귀와 같은 효과를 내는 간단한 단일 계층 신경망을 살펴봤습니다. 이제 DNN을 사용하여 모델 정확도를 개선할 수 있는지 다음 단계로 넘어가 보겠습니다.

```Python
dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(10, input_shape=[window_size], activation="relu"),
  tf.keras.layers.Dense(10, activation="relu"),
  tf.keras.layers.Dense(1)
])

model.complie(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

앞서 살펴본 선형 회귀 모델과 크게 다르지 않습니다. 그리고 이것은 세 개의 레이어로 구성된 비교적 간단한 심층 신경망입니다. 이제 한 줄씩 풀어보겠습니다. 먼저 원하는 창 크기, 배치 크기, 셔플 버퍼 크기와 함께 x_train 데이터를 전달하여 생성할 데이터 집합을 가져와야 합니다.

그런 다음 모델을 정의하겠습니다. 뉴런 10개, 10개, 1개로 구성된 세 개의 레이어로 간단하게 정의해 보겠습니다. `input_shape`은 `window_size`이며, relu를 사용하여 각 레이어를 활성화합니다.

그런 다음 평균 제곱 오차 손실 함수와 확률적 경사 하강 optimizer를 사용하여 이전과 같이 모델을 컴파일합니다.

마지막으로, 100개의 에포크에 걸쳐 모델을 적용하고 몇 초 동안 훈련하면 다음과 같은 결과를 볼 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7cdd296a-2984-4240-9e4d-6c6e03d1436d)

```Python
tf.keras.metrics.mean_absolute_error(x_valid, results).numpy()
```

```
4.9833784
```

아직은 꽤 괜찮습니다. 그리고 평균 절대 오차를 계산하면 이전보다 낮아졌으므로 올바른 방향으로 나아가고 있는 것입니다.

하지만 최적화 기능의 경우 다소 아쉬운 부분도 있습니다. 우리가 선택한 학습률 대신 최적의 학습률을 선택할 수 있다면 좋지 않을까요? 더 효율적으로 학습하고 더 나은 모델을 구축할 수 있을 것입니다.

콜백을 사용하는 기법을 살펴보겠습니다.

```Python
dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(10, input_shape=[window_size], activation="relu"),
  tf.keras.layers.Dense(10, activation="relu"),
  tf.keras.layers.Dense(1)
])

lr_schedule = tf.keeras.callbacks.LearningRateScheduler(
  lambda epoch: 1e-8 * 10**(epoch / 20))

optimizer = tf.keras.optimizers.SGD(learning_rate=1e-8, momentum=0.9)

model.complie(loss="mse", optimizer=optimizer)
history = model.fit(dataset, epochs=100, callbacks=[lr_schedule])
```

여기 이전 신경망의 코드가 있습니다. 하지만 학습 속도 스케줄러를 사용하여 학습 속도를 조정하는 콜백을 추가했습니다.

이것은 각 에포크가 끝날 때마다 콜백에서 호출됩니다. 이 콜백이 수행하는 작업은 학습률을 에포크 번호에 따른 값으로 변경하는 것입니다.

따라서 에포크 1에서는 1e-8 * 10**(1 / 20))이 됩니다. 그리고 100번째 에포크에 도달하면 1e-8 * 10**(100 / 20))이 되며, 이는 model.fit()의 callbacks 매개변수에 설정했기 때문에 각 콜백에서 발생합니다.

<br>

```Python
lrs = 1e-8 * (10 ** (np.arrange(100) / 20))
plt.semilogx(lrs, history.history["loss"])
plt.axis([1e-8, 1e-3, 0, 300])
```

이렇게 학습한 후 이 코드를 사용하여 에포크별 학습률과 마지막 에포크별 학습률을 비교하면 다음과 같은 차트를 볼 수 있습니다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/77adca3c-3e34-46d7-be3a-f2d8f8b3fded)

Y축은 해당 에포크의 손실을 나타내고 X축은 학습률을 나타냅니다. 이제 이와 같이 비교적 안정적인 곡선의 최저점을 선택하면 10의 약 7배에서 -6을 구할 수 있습니다.


```Python
window_size = 30
dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(10, activation="relu", input_shape=[window_size]),
  tf.keras.layers.Dense(10, activation="relu"),
  tf.keras.layers.Dense(1)
])

optimizer = tf.keras.optimizers.SGD(learning_rate=7e-6, momentum=0.9)

model.complie(loss="mse", optimizer=optimizer)
history = model.fit(dataset, epochs=500)
```

이를 학습률로 설정한 다음 재학습을 진행하겠습니다. 여기에는 동일한 신경망 코드가 있고 학습률을 업데이트했기 때문에 조금 더 오래 훈련하겠습니다. 500회 동안 훈련한 후 결과를 확인해 보겠습니다.

<br>

```Python
# Plot the loss
loss = history.history['loss']
epochs = range(len(loss))
plt.plot(epochs, loss, 'b', label='Training Loss')
plt.show()
```

다음은 훈련 중에 계산된 손실을 플로팅하는 코드이며, 다음과 같은 차트가 표시됩니다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eb5f461e-5915-4796-84d2-7acabb8b86a5)

언뜻 보기에는 10에포크 이상 훈련하는 데 시간을 낭비하는 것처럼 보이지만, 초기 손실이 너무 높았기 때문에 다소 왜곡된 결과입니다.

<br>

```Python
# Plot all but the first 10
loss = history.history['loss']
epochs = range(10, len(loss))
plot_loss = loss[10:]
print(plot_loss)
plt.plot(epochs, plot_loss, 'b', label='Training Loss')
plt.show()
```

이 부분을 잘라내고 다음과 같은 코드를 사용하여 10번 이후 기간의 손실을 플롯하면 차트에서 다른 이야기를 들을 수 있습니다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/094010b8-314b-463f-bc28-dffe939a6c72)

500개의 에포크가 지난 후에도 손실이 계속 감소하고 있음을 알 수 있습니다. 이는 우리 네트워크가 실제로 매우 잘 학습하고 있음을 보여줍니다.

원본 데이터에 오버레이된 예측 결과는 다음과 같습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/02babc2d-4771-4bdf-9b75-299b5af813a1)

```Python
tf.keras.metrics.mean_absolute_error(x_valid, results).numpy()
```

```
4.4847784
```

그리고 전체 결과의 평균 절대 오차가 이전보다 훨씬 낮아졌습니다.
