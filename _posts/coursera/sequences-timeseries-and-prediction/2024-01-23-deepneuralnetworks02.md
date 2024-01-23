---
title: "[TensorFlow] Deep Neural Networks for Time Series (2)"
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

## Feeding windowed dataset into neural network

이전 n개의 값이 입력 피처로 표시되는 윈도우 데이터셋을 생성하여 기계 학습을 위한 시계열 데이터를 준비하는 방법을 살펴보았습니다. 그리고 임의의 타임스탬프가 있는 현재 값은 출력 레이블 또는 y입니다. 그러면 약간 이렇게 보일 것입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c214b5a2-cd73-4f66-ae39-becad35e4ae8)


x에 입력 값이 여러 개 있는 경우 일반적으로 데이터 위의 윈도우라고 합니다. 이전에 이러한 윈도우를 생성하기 위해 텐서 플로우 데이터셋에서 도구를 사용하는 방법을 살펴보았습니다. 이번 주에는 해당 코드를 신경망에 공급하고 데이터 위에서 훈련하는 방법을 설명합니다.

```Python
def windowed_dataset(series, window_size, batch_size, shuffle_buffer):
  dataset = tf.data.Dataset.from_tensor_slices(series)
  dataset = dataset.window(window_size + 1, shift=1, drop_remainder=True)
  dataset = dataset.flat_map(lambda window: window.batch(window_size + 1))
  dataset = dataset.map(lambda window: (window[:-1], window[-1]))
  dataset = dataset.shuffle(shuffle_buffer)
  dataset = dataset.batch(batch_size).prefetch(1)
  return dataset
```

윈도우 데이터셋을 호출하는 이 함수부터 시작하겠습니다. 윈도우의 크기에 대한 파라미터와 함께 데이터 시리즈를 가져올 것입니다. 교육 시 사용할 배치의 크기와 데이터를 셔플하는 방법을 결정하는 셔플 버퍼의 크기입니다.

첫 번째 단계는 tf.data 데이터셋을 사용하여 시리즈에서 데이터셋을 생성하는 것입니다. 그리고 `from_tensor_slices` 방법을 사용하여 시리즈를 전달합니다.

그런 다음 `window_size`를 기반으로 데이터셋의 `window` method를 사용하여 데이터를 적절한 window로 슬라이스 할 것입니다. 각각의 window는 한 번씩 이동됩니다. 드롭 잔량을 true로 설정하여 모두 동일한 크기로 유지할 것입니다.

그런 다음 작업하기 쉽도록 데이터를 평평하게 만듭니다. 그리고 윈도우 크기 + 1 크기의 덩어리로 평평하게 됩니다.

한 번 납작해지면 쉽게 섞을 수 있습니다. 셔플을 호출하고 셔플 버퍼를 전달합니다. 셔플 버퍼를 사용하면 속도가 조금 빨라집니다.

예를 들어 데이터 세트에 100,000개의 항목이 있지만 버퍼를 1000개로 설정합니다. 첫 번째 1000개의 요소로 버퍼를 채우면 임의로 하나를 선택합니다.

그런 다음 다시 임의로 선택하기 전에 첫 번째 요소와 1000개로 대체합니다. 초대형 데이터 세트의 경우 임의의 요소를 선택하는 것이 더 작은 수에서 선택하여 효과적으로 속도를 높일 수 있습니다.

그런 다음 셔플된 데이터 세트는 마지막 요소를 제외한 모든 요소인 x와 마지막 요소인 x로 나뉩니다.

그런 다음 선택한 배치 크기로 배치되어 반환됩니다.

<br>

## Single layer neural network

이제 윈도우 데이터셋이 생겼으니 신경망 훈련을 시작할 수 있습니다. 먼저 매우 간단한 선형 회귀 분석부터 시작하겠습니다. 정확도를 측정한 다음 그 부분을 개선하기 위해 노력하겠습니다.

```Python
split_time = 1000
time_train = time[:split_time]
x_train = series[:split_time]
time_valid = time[split_time:]
x_valid = series[split_time:]
```

훈련을 하기 전에 데이터셋을 훈련 세트와 검증 세트로 나누어야 합니다. 1000번 단계에서 이를 수행할 코드를 보여드리겠습니다.

훈련 데이터는 분할 시간까지의 `x_train`이라는 시리즈의 하위 집합임을 알 수 있습니다.

<br>

```Python
window_size = 20
batch_size = 32
shuffle_buffer_size = 1000

dataset = windowed_dataset(series, window_size, batch_size, shuffle_buffer_size)
l0 = tf.keras.layers.Dense(1, input_shape=[window_size])
model = tf.keras.models.Sequential([10])
```

간단한 선형 회귀 분석을 위한 코드를 보여드리겠습니다. 한 줄씩 살펴봅시다.

먼저 윈도우 데이터셋 함수로 전달하고자 하는 모든 상수를 설정하는 것부터 시작하겠습니다. 여기에는 방금 설명한 대로 데이터셋 함수의 윈도우 크기, 훈련에 사용할 배치 크기, 셔플 버퍼 크기가 포함됩니다.

그런 다음 데이터셋을 생성하겠습니다. 시리즈를 가져가서 이 작업을 수행하고 나중에 검토할 노트에는 일주일 동안 생성한 것과 동일한 합성 시리즈를 생성합니다. 원하는 윈도우 크기, 배치 크기, 셔플 버퍼 크기에 따라 시리즈를 전달하면 훈련에 사용할 수 있는 포맷된 데이터셋이 다시 제공됩니다.

그런 다음 입력 모양이 윈도우 크기인 단일 밀집 레이어를 생성할 것입니다. 선형 회귀 분석의 경우 그 정도만 있으면 됩니다. 이 접근 방식을 사용하고 있습니다.

레이어를 L0이라는 변수에 전달함으로써 나중에 학습된 가중치를 출력하고 싶기 때문에 레이어를 참조할 변수가 있으면 훨씬 쉽게 수행할 수 있습니다.

그러면 간단히 모델을 이와 같은 유일한 레이어를 포함하는 시퀀스로 정의합니다.

<br>

```Python
model.complie(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

이제 이 코드로 모델을 컴파일하고 맞추겠습니다. 손실을 MSE로 설정하여 평균 제곱 오차 함수를 사용하고 최적화 도구는 확률적 경사 하강법(SGD)을 사용할 것입니다.

문자열 대신 이 방법론을 사용하여 파라미터를 설정하여 학습 속도 및 모멘텀을 초기화할 수 있습니다. 여기에 있는 다른 값으로 실험하여 모델을 보다 정확하게 수렴하거나 더 빠르게 수렴할 수 있는지 확인하십시오.

다음은 x값과 y값으로 미리 포맷되어 있는 데이터셋을 통과시키기만 하면 모델을 맞출 수 있습니다. 저는 여기서 100개의 에포크를 위해 달릴 것입니다. 에포크지만 에포크 출력은 0으로 설정해서 무시합니다.

<br>

```Python
print("Layer weights {}".format(l0.get_weights()))
```

훈련이 끝나면 이 코드로 실제로 다른 가중치를 검사할 수 있습니다. 앞서 `l0`이라는 변수가 있는 레이어를 언급했던 것 기억나세요?

```
Layer weights: 
 [array([[ 0.24443024],
       [ 0.50793034],
       [ 0.32102567],
       [-0.2414703 ],
       [-0.5269546 ],
       [ 0.25312227],
       [ 0.41894245],
       [ 0.39935517],
       [-0.22515604],
       [ 0.3001697 ],
       [-0.328422  ],
       [-0.09302515],
       [-0.17813256],
       [ 0.5175285 ],
       [ 0.06078804],
       [-0.44169194],
       [-0.48767447],
       [-0.05016029],
       [ 0.2246682 ],
       [ 0.06284082]], dtype=float32), array([0.], dtype=float32)]
```

음, 여기서 유용한 부분이 있습니다. 출력은 이렇게 보일 것입니다. 자세히 검사해보면 첫 번째 어레이에는 20개의 값이 있고 두 번째 어레이에는 1개의 값만 있는 것을 알 수 있습니다.

네트워크가 값을 최대한 잘 맞추기 위해 선형 회귀를 학습했기 때문입니다. 따라서 첫 번째 어레이의 각 값은 x에 있는 20개의 값에 대한 가중치로 볼 수 있고 두 번째 어레이의 값은 b 값입니다.

<br>

## Machine learning on time windows

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8604bd6e-1cb0-4348-8cbb-6ecd21f6d4d8)

그래서 이 그림을 다시 생각해보면 입력창을 20개의 폭이라고 생각한다면, x0, x1, x2 등등 x19까지라고 부르자.

그것은 일반적으로 x축이라고 불리는 가로축 위의 값이 아니라, 가로축 위의 그 지점의 시계열의 값입니다.

따라서 현재 값보다 20단계 앞서 있는 시간 t0의 값을 x0, t1을 x1 등이라고 부릅니다. 마찬가지로 출력에 대해서도 현재 시간에서의 값을 y라고 생각합니다.

<br>

## Prediction

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/988fb722-497f-49a9-9ee4-5c223ffc1bcb)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/012f3f38-3f63-4b7b-8e2e-7faf9bf0be48)

그래서 이제 다시 값들을 보고 특정 타임스탬프 시간의 값에 대한 가중치이고 b가 바이어스임을 확인하면, x 값에 가중치를 곱한 다음 바이어스를 더하여 어떤 단계에서든 y 값을 예측하는 표준 선형 회귀 분석을 수행할 수 있습니다.

<br>

```Python
print(series[1:21])
model.predict(series[1:21][np.newaxis])
```

예를 들어, 제가 시리즈에서 20개의 항목을 선택하여 출력하면 20x 값을 볼 수 있습니다. 예측을 하고 싶다면, 그 시리즈를 제 모델에 전달하여 예측을 얻을 수 있습니다. NumPy 새 축은 모델에서 사용하는 입력 차원으로 모양을 변경합니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/92f60d46-b659-4764-b44f-315aef55eb49)

출력은 이렇게 보일 것입니다. 맨 위 배열은 모델에 입력을 제공하는 20개의 값이고, 아래는 모델에서 가져온 예측 값입니다. 그래서 모델이 20개의 값을 볼 때 다음 예측 값은 49.08478이라고 말하도록 훈련시켰습니다.

<br>

```
forecast = []
for time in range(len(series) - window_size):
  forecast.append(model.predict(series[time:time + window_size][np.newaxis]))

forecast = forecast[split_time - window_size:]
result = np.array(forecast)[:, 0, 0]
```

따라서 윈도우 크기가 20이었던 이전의 20개 지점을 기준으로 시계열의 모든 지점에 대한 예측값을 작성하려면 이렇게 코드를 작성할 수 있습니다.

예측의 빈 목록을 만든 다음, 시리즈와 윈도우 크기를 반복하여 예측하고 결과를 예측 목록에 추가합니다.

시계열을 훈련과 테스트 감각으로 나누어서 특정 시간이 훈련이고 나머지는 검증되기 전에 모든 것을 가져가는 것을 했습니다. 그래서 분할 시간 후에 예측값을 가져다가 도표팅을 위해 NumPy 배열에 로드할 것입니다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/81b05226-f764-4f20-9cb2-07d6e88dc524)

이 도표는 실제 값이 파란색이고 예측값이 주황색인 경우 이와 같습니다. 여러분은 예측이 지난 비디오에서 해야 했던 모든 통계 체조와 비교할 때 꽤 좋아 보이고 예측값을 얻는 것은 비교적 간단하다는 것을 알 수 있습니다.

<br>

```Python
tf.keras.metrics.mean_absolute_error(x_valid, results).numpy()
```

```
4.9526777
```

이전에 했던 것처럼 평균 절대 오차를 측정하고 이전에 했던 복잡한 분석을 통해 있었던 것과 유사한 야구장에 있다는 것을 알 수 있습니다.

이제는 선형 회귀 분석을 계산하기 위해 신경망의 단일 레이어를 사용하는 것입니다.
