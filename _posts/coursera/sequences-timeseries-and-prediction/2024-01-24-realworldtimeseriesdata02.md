---
title: "[TensorFlow] Real-world time series data (2)"
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

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757){: .align-center width="50%" height="50%"}<br>

# Real data - sunspots

시계열 데이터를 살펴보고 통계 분석, 선형 회귀, 딥러닝 네트워크와 순환 신경망을 사용한 머신러닝 등 데이터를 예측하기 위한 몇 가지 기술을 살펴보았습니다.

이제 합성 데이터를 넘어 몇 가지 실제 데이터로 이동하여 예측을 만드는 데 배운 내용을 적용해 보겠습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/be000e39-f924-49a2-b0b9-58224357d844){: .align-center width="50%" height="50%"}<br>

1749년부터 2018년까지 매월 흑점을 추적하는 Kaggle의 이 데이터 세트부터 시작하겠습니다. 흑점은 약 11년마다 계절적 주기가 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eaa65627-3cdb-4ca7-afc9-fb6b69e6d772){: .align-center width="50%" height="50%"}<br>

이 데이터를 통해 예측이 가능한지 확인해 보겠습니다.

첫 번째 열은 인덱스, 두 번째 열은 연, 월, 일 형식의 날짜, 세 번째 열은 측정이 수행된 해당 월의 날짜로 구성된 CSV 데이터 집합입니다.

월별 평균 금액은 해당 월말에 있어야 합니다.

매우 간단한 데이터 집합이지만, 기초 데이터의 특성에 따라 데이터 집합을 예측하기 위해 코드를 최적화하는 방법에 대해 조금 더 이해하는 데 도움이 됩니다.

물론 계절성이 있는 데이터의 경우 한 가지 크기가 모든 경우에 적합하지는 않습니다. 그럼 코드를 살펴보겠습니다.

다음은 CSV 파일을 읽고 그 데이터를 흑점 및 타임스탬프 목록으로 가져오는 코드입니다.

```python
import csv
time_step = []
sunspots = []

with open('/tmp/sunspots.csv') as csvfile:
  reader = csv.reader(csvfile, delimiter=',')
  next(reader)
  for row in reader:
    sunspots.append(float(row[2]))
    time_step.append(int(row[0]))
```

이러한 작업을 처리하는 데 사용할 코드의 대부분이 `np.array`를 사용하므로 이제 목록을 `np.array`로 변환하는 것이 좋습니다.

```python
series= np.array(sunspots)
time = np.array(time_step)
```

NumPy 배열에 항목을 추가할 때마다 목록을 복제하는 데 많은 메모리 관리가 필요하고 속도가 느려질 수 있는 데이터도 많기 때문에, 버려지는 목록에 데이터를 쌓은 다음 NumPy로 변환하는 것이 더 효율적일 수 있습니다.

데이터를 플로팅하면 다음과 같이 보입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/665ad179-2be9-4cc3-8e84-9089874194ab){: .align-center width="75%" height="75%"}<br>

계절성이 있지만, 일부 피크가 다른 피크보다 훨씬 높고 규칙적이지 않다는 점에 유의하세요.

또한 노이즈가 상당히 많지만 일반적인 추세는 없습니다.

```python
split_time = 1000
time_train = time[:split_time]
x_train = series[:split_time]
time_valid = time[split_time:]
x_valid = series[split_time:]

window_size = 20
batch_size = 32
shuffle_buffer_size = 1000
```

이전과 마찬가지로 시리즈를 훈련 및 검증 데이터 집합으로 분할해 보겠습니다. 1,000번째 시점에 분할합니다. 윈도우 크기는 20, 배치 크기는 32, 셔플 버퍼는 1,000입니다.

다음과 같은 `windowed_dataset` 코드를 사용하여 시리즈를 훈련할 수 있는 데이터 세트로 전환합니다.

```python
def windowed_dataset(series, window_size, batch_size, shuffle_buffer):
  dataset = tf.data.Dataset.from_tensor_slices(series)
  dataset = dataset.window(window_size + 1, shift=1, drop_remainder=True)
  dataset = dataset.flat_map(lambda window: window.batch(window_size + 1))
  dataset = dataset.shuffle(shuffle_buffer)
                   .map(lambda window: (window[:-1], window[-1]))
  dataset = dataset.batch(batch_size).prefetch(1)
  return dataset
```

<br>

# Train and tune the model

```python
dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(10, input_shape=[window_size], activation="relu"),
  tf.keras.layers.Dense(10, activation="relu")
  tf.keras.layers.Dense(1)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

간단한 DNN으로 돌아가서 어떤 일이 일어나는지 살펴보겠습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/973f877b-105f-4a90-97d4-1b12d93b272c){: .align-center width="75%" height="75%"}<br>

위과 같은 차트가 나오는데, 눈으로 보기에는 아주 좋아 보이지만 평균 편차가 매우 커서 뭔가 문제가 있는 것 같습니다.

실제로 결과를 확대하면 원본 데이터에서 예측이 어떻게 작동하는지 조금 더 자세히 볼 수 있습니다.

```python
split_time = 1000
time_train = time[:split_time]
x_train = series[:split_time]
time_valid = time[split_time:]
x_valid = series[split_time:]

window_size = 20
batch_size = 32
shuffle_buffer_size = 1000
```

문제의 단서는 윈도우 크기일 수 있습니다.

앞서 20이라고 했으므로 학습 윈도우 크기는 20개의 타임 슬라이스에 해당하는 데이터입니다.

그리고 각 타임 슬라이스가 실시간으로 한 달이라는 점을 감안하면 우리의 윈도우는 2년이 조금 안 됩니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/70dd9767-cf86-4291-bca9-173814f54b1d){: .align-center width="75%" height="75%"}<br>

하지만 이 차트를 기억하신다면 흑점의 계절성이 2년보다 훨씬 크다는 것을 알 수 있습니다. 11년에 가깝습니다.

그리고 실제로 일부 과학자들은 서로 다른 주기가 서로 교차하는 22년이 될 수도 있다고 말합니다.

그렇다면 11년치 데이터를 윈도우 크기로 하여 132로 재학습하면 어떻게 될까요?

```python
window_size = 132
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6bb214e2-4bed-47df-953d-748959b8e216){: .align-center width="75%" height="75%"}<br>

이 차트는 비슷해 보이지만, MAE를 보면 실제로는 더 나빠져서 윈도우 크기를 늘려도 효과가 없다는 것을 알 수 있습니다. 왜 그럴 것이라고 생각하시나요?

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/32701de3-2a32-4b7b-a721-44cc4eddcf5a){: .align-center width="75%" height="75%"}<br>

데이터를 되돌아보면 약 11년 동안 계절에 따라 달라지는 것을 알 수 있지만, 윈도우에 전체 계절이 필요하지 않다는 것을 알 수 있습니다.

데이터를 다시 확대하면 다음과 같이 일반적인 시계열을 볼 수 있습니다.

이후의 값은 이전의 값과 어느 정도 관련이 있지만 노이즈가 많습니다.

따라서 학습을 위해 큰 기간의 시간이 필요하지 않을 수도 있습니다.

처음에 설정한 20과 조금 더 비슷하게 30으로 설정해 보겠습니다.

```python
window_size = 30
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6bb214e2-4bed-47df-953d-748959b8e216){: .align-center width="75%" height="75%"}<br>

이 코드를 다시 살펴보면 윈도우 크기를 30으로 변경할 수 있습니다.

하지만 분할 시간을 살펴보면 데이터 세트에는 약 3,500개의 항목이 있지만 이를 훈련과 유효성 검사로 분할하고 있습니다.

이제 1,000개, 즉 훈련에 1,000개, 유효성 검사에 2,500개만 사용됩니다.

정말 안 좋은 분할입니다. 훈련 데이터가 충분하지 않습니다.

그럼 3,000개와 500개로 만들어 봅시다.

그러면 재학습할 때 이 결과를 얻을 수 있습니다.

```python
split_time = 3000
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0696e183-0251-49c9-ab40-e44feee71fd7){: .align-center width="75%" height="75%"}<br>

MAE가 15로 개선되었지만 더 개선할 수 있을까요?

<br>

```python
dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(30, input_shape=[window_size], activation="relu"),
  tf.keras.layers.Dense(15, activation="relu")
  tf.keras.layers.Dense(1)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-6, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

신경망 설계와 매개변수의 높이를 수정하는 것이 한 가지 방법이 될 수 있습니다.

기억하시겠지만, 뉴런이 10개, 10개, 1개로 구성된 세 개의 레이어가 있었습니다.

이제 입력 모양이 30으로 커졌습니다.

따라서 30, 15, 1과 같이 다른 값을 시도하고 다시 훈련해 볼 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6a58c766-7ca7-4c0d-8f77-84c98d78e926){: .align-center width="75%" height="75%"}<br>

이제 다시 10, 10, 1로 바꾸고 대신 학습 속도를 살펴봅시다. 조금 조정해 봅시다. 이제 재훈련 후 MAE가 약간 줄어든 것을 볼 수 있습니다.

```python
dataset = windowed_dataset(x_train, window_size, batch_size, shuffle_buffer_size)

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(10, input_shape=[window_size], activation="relu"),
  tf.keras.layers.Dense(10, activation="relu")
  tf.keras.layers.Dense(1)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(learning_rate=1e-7, momentum=0.9))
model.fit(dataset, epochs=100, verbose=0)
```

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dfe3c2c6-f050-444e-bcec-f8a030af92fd){: .align-center width="75%" height="75%"}<br>

<br>

# Prediction

```python
model.predict(series[3205:3235][np.newaxis])
```

```
7.0773993
```

흥미롭게도 예측을 해보겠습니다. 제가 사용하는 윈도우 크기는 30스텝이고 데이터 세트의 길이는 3,235스텝입니다.

따라서 데이터 세트가 끝난 후 다음 값을 예측하려면 이 코드를 사용합니다. 그러면 7.0773993이라는 결과가 나옵니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7ddd5edd-65c6-43d2-ab9c-2ebdb6a41bfd){: .align-center width="75%" height="75%"}<br>

데이터 집합은 2018년 7월까지 올라가므로 실제로는 2018년 8월에 7.077개의 흑점을 예측하고 있습니다.

데이터 세트와 약간 다른 데이터가 있는 이 관측 차트를 보면 2018년 8월에 실제로 기록된 흑점 수가 8.7개라는 것을 알 수 있습니다.

따라서 예측이 나쁘지는 않지만 더 개선할 수 있는지 살펴봅시다.

```python
split_time = 3000
window_size = 60

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(20, input_shape=[window_size], activation="relu"),
  tf.keras.layers.Dense(10, activation="relu"),
  tf.keras.layers.Dense(1)
])

model.compile(loss="mse", optimizer=tf.keras.optimizers.SGD(lr=1e-7, momentum=0.9))
```

이 설정으로 MAE를 13.75로 낮추었더니 예측값이 8.13으로 실제 수치인 8.7에 훨씬 가까워졌습니다.

그러나 모델 생성에는 무작위 요소가 있으므로 결과가 다를 수 있습니다.

이렇게 한 번의 예측을 기반으로 정확도를 평가하는 것은 실망스러운 결과를 초래할 수 있으며, 여러 판독값에 대한 평균 정확도를 평가하는 것이 훨씬 더 낫습니다.

그래서 여기서는 DNN을 사용하여 흑점 값을 예측하는 방법을 살펴봤습니다.

약간의 튜닝을 통해 MAE를 약간 줄였습니다.

그리고 이 모델을 사용하여 다음 달의 값을 예측해보니 실제 값에 상당히 근접했습니다.