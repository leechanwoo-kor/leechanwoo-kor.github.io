---
title: "[TensorFlow] Deep Neural Networks for Time Series (1)"
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

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757){: .align-center width="50%" height="50%"}<br>

지난번에는 추세, 계절성 및 약간의 노이즈가 포함된 합성 계절 데이터 세트를 만드는 방법을 살펴보았습니다.

데이터 세트를 분석하고 이를 통해 예측하는 몇 가지 통계적 방법도 살펴보았습니다.

얻은 결과 중 일부는 실제로 꽤 괜찮았지만 아직 기계 학습을 적용한 적은 없었습니다.

이번에는 동일한 데이터를 사용하여 일부 기계 학습 방법을 사용하는 방법을 살펴보실 것입니다. 기계 학습이 어디로 데려갈 수 있는지 알아보겠습니다.

<br>

# Preparing Features and Labels

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/89922764-7eb6-45c1-95fe-7f89ca266708){: .align-center width="75%" height="75%"}<br>

우선 다른 ML 문제들과 마찬가지로 데이터를 특징과 레이블로 나눠야 합니다. 이 경우 특징은 사실상 시리즈 내의 값들의 수이며 다음 값은 레이블입니다.

특징으로 취급할 값들의 수를 윈도우 크기라고 부를 것이고, 여기서 데이터의 윈도우를 가지고 다음 값을 예측하기 위한 ML 모델을 훈련시킵니다.

예를 들어, 만약 시계열 데이터를 한 번에 30일 정도를 특징으로 사용한다면, 30개의 값을 레이블로 사용할 것입니다.

그런 다음 시간이 지남에 따라 30개의 특징을 단일 레이블에 맞추도록 신경망을 훈련시킬 것입니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
for val in dataset:
  print(val.numpy())
```

```
0
1
2
3
4
5
6
7
8
9
```

예를 들어, `tf.data.Dataset` 클래스를 사용하여 데이터를 생성합니다. 10개의 값 범위를 만듭니다.

그것들을 출력할 때 0에서 9까지의 일련의 데이터를 볼 수 있습니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
dataset = dataset.window(5, shift=1)
for window_dataset in dataset:
  for val in Window_dataset:
    print(val.numpy(), end=" ")
  print()
```

```
0 1 2 3 4
1 2 3 4 5
2 3 4 5 6
3 4 5 6 7
4 5 6 7 8
5 6 7 8 9
6 7 8 9
7 8 9
8 9
9
```

그럼 이제 좀 더 재미있게 해보도록 하겠습니다. `dataset.window`를 이용해서 window를 이용해서 데이터 셋을 확장해 보도록 하겠습니다.

매개변수는 윈도우의 크기와 매번 얼마나 이동할 것인지입니다. 따라서 윈도우 크기를 5로 설정하고 출력할 때 시프트를 1로 설정하면 이런 01234, 5개의 값이기 때문에 거기서 멈춘 다음 1234 등이 표시됩니다.

데이터 세트가 끝날 때까지 값이 존재하지 않기 때문에 값이 줄어들 것입니다. 따라서 6789, 789 등을 얻을 것입니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
dataset = dataset.window(5, shift=1, drop_remainder=True)
for window_dataset in dataset:
  for val in Window_dataset:
    print(val.numpy(), end=" ")
  print()
```

```
0 1 2 3 4
1 2 3 4 5
2 3 4 5 6
3 4 5 6 7
4 5 6 7 8
5 6 7 8 9
```

그래서 윈도우를 약간 편집해서 일정한 크기의 데이터를 확보해 봅시다. 윈도우에 `drop_remainder`라는 추가 파라미터를 사용하여 그렇게 할 수 있습니다.

그리고 이것을 True로 설정하면 나머지 모든 항목을 삭제하여 데이터를 잘라낼 것입니다. 즉, 이것은 5개 항목의 윈도우만 제공한다는 것을 의미합니다.

출력할 때 `0 1 2 3 4`에서 시작하여 `5 6 7 8 9`까지 이렇게 표시됩니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
dataset = dataset.window(5, shift=1, drop_remainder=True)
for window_dataset in dataset:
  for window in dataset:
    print(window.numpy())
```

```
[0 1 2 3 4]
[1 2 3 4 5]
[2 3 4 5 6]
[3 4 5 6 7]
[4 5 6 7 8]
[5 6 7 8 9]
```

이제 기계 학습에서 사용을 시작할 수 있도록 이것들을 numpy 목록에 넣읍시다. 데이터 세트의 각 항목에 대해 `.numpy` 메서드를 호출하면 출력할 때 numpy 목록이 있다는 것을 알 수 있습니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
dataset = dataset.window(5, shift=1, drop_remainder=True)
dataset = dataset.flat_map(lambda window: window.batch(5))
dataset = dataset.map(lambda window: (window[:-1], window[-1]))
for x,y in dataset:
  print(x.numpy(), y.numpy())
```

```
[0 1 2 3] [4]
[1 2 3 4] [5]
[2 3 4 5] [6]
[3 4 5 6] [7]
[4 5 6 7] [8]
[5 6 7 8] [9]
```

다음은 데이터를 특징과 레이블로 나누는 것입니다. 목록의 각 항목에 대해 마지막 값을 제외한 모든 값이 특징이 되고 마지막 값이 레이블이 되는 것이 합리적입니다. 이렇게 매핑하면 달성할 수 있습니다.

마지막 값을 제외한 모든 값으로 분할하고 마지막 값을 -1로 분할한 다음 -1로 마지막 값 자체로 분할할 수 있습니다. 이 출력은 특징과 레이블의 멋진 집합처럼 보입니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
dataset = dataset.window(5, shift=1, drop_remainder=True)
dataset = dataset.flat_map(lambda window: window.batch(5))
dataset = dataset.map(lambda window: (window[:-1], window[-1]))
for x,y in dataset:
  print(x.numpy(), y.numpy())
```

```
[3 4 5 6] [7]
[4 5 6 7] [8]
[1 2 3 4] [5]
[2 3 4 5] [6]
[5 6 7 8] [9]
[0 1 2 3] [4]
```

일반적으로 학습 전에 데이터를 셔플링합니다. 셔플 방법을 사용하면 가능합니다. 버퍼 크기를 10이라고 부르고, 결과를 출력할 때 특징과 레이블 집합이 셔플링된 것을 볼 수 있습니다.

<br>

```python
dataset = tf.data.Dataset.range(10)
dataset = dataset.window(5, shift=1, drop_remainder=True)
dataset = dataset.flat_map(lambda window: window.batch(5))
dataset = dataset.map(lambda window: (window[:-1], window[-1]))
dataset = dataset.shuffle(buffer_size=10)
dataset = dataset.batch(2).prefetch(1)
for x,y in dataset:
  print("x = ", x.numpy())
  print("y = ", y.numpy())
```

```
x = [[4 5 6 7] [1 2 3 4]]
y = [[8] [5]]
x = [[3 4 5 6] [2 3 4 5]]
y = [[7] [6]]
x = [[5 6 7 8] [0 1 2 3]]
y = [[9] [4]]
```

마지막으로, 데이터를 배치하는 것을 볼 수 있고, 이것은 배치 방법으로 이루어집니다.

크기 매개변수가 필요한데, 이 경우에는 2입니다. 그러면 할 일은 데이터를 두 개의 세트로 묶어서 출력하면 이것이 보일 것입니다. 이제 데이터 항목이 두 개씩 세 개씩 배치되어 있습니다.

첫 번째 세트를 보면 x와 y가 대응되는 것을 볼 수 있습니다. 따라서 x가 [4 5 6 7]일 때 y는 [8]이고, x가 [0 1 2 3]일 때 y는 [4]입니다.

이제 일련의 x와 y, 또는 특징과 레이블을 만들 수 있는 도구들을 살펴보셨으니, 데이터 세트에서 예측을 수행하기 위해 필요한 모든 것을 얻을 수 있습니다.
