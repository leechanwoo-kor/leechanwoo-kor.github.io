---
title: "[Time Series] Linear Regression With Time Series"
categories:
  - Time Series
tags:
  - Time Series
toc: true
toc_sticky: true
toc_label: "Linear Regression With Time Series"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0699e7c1-a138-47f2-b2ec-51311425a4b0){: .align-center}<br>

## Welcome to Time Series!

**예측(forecasting)** 은 아마도 현실 세계에서 머신러닝을 가장 많이 활용하는 분야일 것입니다. 기업은 제품 수요를 예측하고, 정부는 경제 및 인구 증가를 예측하며, 기상학자는 날씨를 예측합니다. 과학, 정부, 산업(개인 생활은 말할 것도 없고!) 전반에 걸쳐 다가올 일에 대한 이해는 시급한 요구이며, 이러한 분야의 실무자들은 이러한 요구를 해결하기 위해 머신러닝을 점점 더 많이 적용하고 있습니다.

시계열 예측은 오랜 역사를 가진 광범위한 분야입니다. 이 글들은 가장 정확한 예측을 목표로 최신 머신러닝 방법을 시계열 데이터에 적용하는 데 중점을 둡니다. 이 과정의 강의는 과거 Kaggle 예측 경연 대회에서 우승한 솔루션에서 영감을 얻었지만, 정확한 예측이 우선시되는 모든 경우에 적용할 수 있습니다.

이 과정을 마치면 다음과 같은 방법을 알게 됩니다:

- 주요 시계열 구성 요소(추세, 계절, 주기)를 모델링하는 특징을 엔지니어링합니다,
- 다양한 종류의 시계열 플롯으로 시계열을 시각화합니다,
- 상호 보완적인 모델의 강점을 결합한 예측 하이브리드를 만드는 방법, 그리고
- 다양한 예측 작업에 머신 러닝 방법을 적용합니다.

연습의 일부로 [Store Sales - Time Series Forecasting](https://www.kaggle.com/c/store-sales-time-series-forecasting) 대회에 참가할 수 있는 기회가 주어집니다. 이 대회에서는 에콰도르에 본사를 둔 대형 식료품 소매업체인 Corporación Favorita의 약 1800개 제품 카테고리에 대한 매출을 예측하는 과제를 수행해야 합니다.

<br>

## What is a Time Series?

예측의 기본 대상은 시간에 따라 기록된 일련의 관측치인 **시계열(time series)** 입니다. 예측 애플리케이션에서 관찰은 일반적으로 일별 또는 월별과 같이 일정한 빈도로 기록됩니다.

```python
import pandas as pd

df = pd.read_csv(
    "../input/ts-course-data/book_sales.csv",
    index_col='Date',
    parse_dates=['Date'],
).drop('Paperback', axis=1)

df.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9f16f64d-65ff-4834-9b48-50efb8e60920)

이 시계열 레코드는 30일 동안 소매점에서의 하드커버 책 판매량을 기록합니다. 시간 인덱스가 Date인 단일 열의 관측값 하드커버가 있음을 알 수 있습니다.

<br>

## Linear Regression with Time Series

이 과정의 첫 번째 파트에서는 **선형 회귀(linear regression)** 알고리즘을 사용하여 예측 모델을 구축합니다. 선형 회귀는 실무에서 널리 사용되며 복잡한 예측 작업에도 자연스럽게 적응합니다.

**선형 회귀(linear regression)** 알고리즘은 입력 특징에서 가중 합계를 만드는 방법을 학습합니다. 두 개의 특징에 대해

```python
target = weight_1 * feature_1 + weight_2 * feature_2 + bias
```

학습하는 동안 회귀 알고리즘은 `target`에 가장 적합한 매개변수 `weight_1`, `weight_2` 및 `bias`의 값을 학습합니다. (이 알고리즘은 대상과 예측 간의 제곱 오차를 최소화하는 값을 선택하기 때문에 보통 _일반 최소 제곱(ordinary least squares)_ 이라고도 합니다.) 가중치는 _회귀 계수(regression coefficients)_ 라고도 하며, `bias`는 이 함수의 그래프가 Y축을 교차하는 위치를 알려주기 때문에 _절편(intercept)_ 이라고도 합니다.

### Time-step features

시계열에는 시간 단계(time-step) 특징과 지연(lag) 특징이라는 두 가지 종류의 특징이 있습니다.

시간 단계 특징은 시간 인덱스에서 직접 도출할 수 있는 특징입니다. 가장 기본적인 시간 단계 특징은 시계열의 시간 단계를 처음부터 끝까지 카운트 오프하는 **시간 더미(time dummy)** 입니다.

```python
import numpy as np

df['Time'] = np.arange(len(df.index))

df.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8f6df937-1e58-4227-9a1e-fddbddb33d36)

시간 더미를 사용한 선형 회귀 모델을 생성합니다:

```python
target = weight * time + bias
```

그런 다음 시간 더미를 사용하여 _시간_ 플롯의 시계열에 곡선을 맞출 수 있습니다, 여기서 `Time`은 X축을 형성합니다.

```python
import matplotlib.pyplot as plt
import seaborn as sns
plt.style.use("seaborn-whitegrid")
plt.rc(
    "figure",
    autolayout=True,
    figsize=(11, 4),
    titlesize=18,
    titleweight='bold',
)
plt.rc(
    "axes",
    labelweight="bold",
    labelsize="large",
    titleweight="bold",
    titlesize=16,
    titlepad=10,
)
%config InlineBackend.figure_format = 'retina'

fig, ax = plt.subplots()
ax.plot('Time', 'Hardcover', data=df, color='0.75')
ax = sns.regplot(x='Time', y='Hardcover', data=df, ci=None, scatter_kws=dict(color='0.25'))
ax.set_title('Time Plot of Hardcover Sales');
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bc4c8cb8-807b-46df-9760-a487c6c21ac4)

시간 단계 특징을 사용하면 **시간 의존성(time dependence)** 을 모델링할 수 있습니다. 시계열은 값이 발생한 시간으로부터 값을 예측할 수 있는 경우 시간 종속적입니다. 하드커버 판매량 계열에서는 일반적으로 월 후반의 판매량이 월 초반의 판매량보다 높다는 것을 예측할 수 있습니다.

### Lag features

**지연 특징(lag feature)** 을 만들기 위해 대상 계열의 관측값을 나중에 발생한 것처럼 보이도록 이동합니다. 여기에서는 1단계 지연 특징을 만들었지만 여러 단계로 이동하는 것도 가능합니다.

```python
df['Lag_1'] = df['Hardcover'].shift(1)
df = df.reindex(columns=['Hardcover', 'Lag_1'])

df.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5201a999-d482-4809-87cd-693a3d291b09)

지연 특징을 사용한 선형 회귀 모델을 생성합니다:

```python
target = weight * lag + bias
```

따라서 지연 특징을 사용하면 계열의 각 관측값이 이전 관측값에 대해 그려지는 지연 플롯에 곡선을 맞출 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9e95c319-dc4c-4613-84da-2047f4cde501)

지연 플롯에서 하루의 매출(`Hardcover`)이 전날의 매출(`Lag_1`)과 상관관계가 있음을 알 수 있습니다. 이와 같은 관계가 보이면 지연 특징이 유용하다는 것을 알 수 있습니다.

보다 일반적으로 지연 특징을 사용하면 **직렬 의존성(serial dependence)** 을 모델링할 수 있습니다. 시계열은 이전 관측치를 통해 다음 관측치를 예측할 수 있을 때 직렬 의존성을 갖습니다. 하드커버 판매량에서, 하루의 높은 판매량은 일반적으로 다음 날의 높은 판매량을 의미한다고 예측할 수 있습니다.

---

시계열 문제에 머신 러닝 알고리즘을 적용하는 것은 주로 시간 인덱스와 지연을 이용한 피처 엔지니어링에 관한 것입니다. 대부분의 경우 단순성을 위해 선형 회귀를 사용하지만, 이러한 특징은 예측 작업에 어떤 알고리즘을 선택하든 유용하게 사용할 수 있습니다.

<br>

## Example - Tunnel Traffic

_터널 통행량(tunnel traffic)_ 은 2003년 11월부터 2005년 11월까지 매일 스위스의 바레그 터널을 통과하는 차량 수를 설명하는 시계열입니다. 이 예에서는 시간 단계 특징과 지연 특징에 선형 회귀를 적용하는 연습을 해보겠습니다.

숨겨진 셀이 모든 것을 설정합니다.

```python
from pathlib import Path
from warnings import simplefilter

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

simplefilter("ignore")  # ignore warnings to clean up output cells

# Set Matplotlib defaults
plt.style.use("seaborn-whitegrid")
plt.rc("figure", autolayout=True, figsize=(11, 4))
plt.rc(
    "axes",
    labelweight="bold",
    labelsize="large",
    titleweight="bold",
    titlesize=14,
    titlepad=10,
)
plot_params = dict(
    color="0.75",
    style=".-",
    markeredgecolor="0.25",
    markerfacecolor="0.25",
    legend=False,
)
%config InlineBackend.figure_format = 'retina'


# Load Tunnel Traffic dataset
data_dir = Path("../input/ts-course-data")
tunnel = pd.read_csv(data_dir / "tunnel.csv", parse_dates=["Day"])

# Create a time series in Pandas by setting the index to a date
# column. We parsed "Day" as a date type by using `parse_dates` when
# loading the data.
tunnel = tunnel.set_index("Day")

# By default, Pandas creates a `DatetimeIndex` with dtype `Timestamp`
# (equivalent to `np.datetime64`, representing a time series as a
# sequence of measurements taken at single moments. A `PeriodIndex`,
# on the other hand, represents a time series as a sequence of
# quantities accumulated over periods of time. Periods are often
# easier to work with, so that's what we'll use in this course.
tunnel = tunnel.to_period()

tunnel.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d7bd1bc1-7347-4576-be3c-c799adf9d49f)


### 시간 단계 특징

시계열에 누락된 날짜가 없다면 시계열의 길이를 계산하여 시간 더미를 만들 수 있습니다.

```python
df = tunnel.copy()

df['Time'] = np.arange(len(tunnel.index))

df.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0ad3eeab-70c1-4ce0-942d-ede2c5a7d754)

선형 회귀 모델을 fitting하 절차는 scikit-learn의 표준 단계를 따릅니다.

```python
from sklearn.linear_model import LinearRegression

# Training data
X = df.loc[:, ['Time']]  # features
y = df.loc[:, 'NumVehicles']  # target

# Train the model
model = LinearRegression()
model.fit(X, y)

# Store the fitted values as a time series with the same time index as
# the training data
y_pred = pd.Series(model.predict(X), index=X.index)
```

실제로 생성된 모델은 (대략) 다음과 같습니다: `Vehicles = 22.5 * Time + 98176`. 시간에 따른 적합 값을 플로팅하면 시간 더미에 선형 회귀를 맞추면 이 방정식으로 정의된 추세선이 어떻게 생성되는지 알 수 있습니다.

```python
ax = y.plot(**plot_params)
ax = y_pred.plot(ax=ax, linewidth=3)
ax.set_title('Time Plot of Tunnel Traffic');
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9266ed18-eca9-4046-8df3-480a53082d08)

### 지연 특징

판다스는 `shift` 메소드라는 간단한 메소드로 시계열을 지연시키는 방법을 제공합니다.

```python
df['Lag_1'] = df['NumVehicles'].shift(1)
df.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4611457d-092e-40b0-8b8a-ade43aa6ceeb)

지연 특징을 만들 때 생성된 결측값을 어떻게 처리할지 결정해야 합니다. 0.0으로 채우거나 알려진 첫 번째 값으로 '백필링(backfilling)'하는 것도 한 가지 옵션입니다. 대신 누락된 값을 삭제하고 해당 날짜의 대상 값도 삭제합니다.

```python
from sklearn.linear_model import LinearRegression

X = df.loc[:, ['Lag_1']]
X.dropna(inplace=True)  # drop missing values in the feature set
y = df.loc[:, 'NumVehicles']  # create the target
y, X = y.align(X, join='inner')  # drop corresponding values in target

model = LinearRegression()
model.fit(X, y)

y_pred = pd.Series(model.predict(X), index=X.index)
```

지연 플롯은 하루의 차량 수와 전날의 차량 수 사이의 관계를 얼마나 잘 맞출 수 있었는지 보여줍니다.

```python
fig, ax = plt.subplots()
ax.plot(X['Lag_1'], y, '.', color='0.25')
ax.plot(X['Lag_1'], y_pred)
ax.set_aspect('equal')
ax.set_ylabel('NumVehicles')
ax.set_xlabel('Lag_1')
ax.set_title('Lag Plot of Tunnel Traffic');
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aba4feda-4848-45c6-a3cf-a5fe97996be0)

지연 특징을 통한 이 예측은 시간 경과에 따른 계열을 얼마나 잘 예측할 수 있는지에 대해 무엇을 의미할까요? 다음 시간 플롯은 현재 예측이 최근 과거의 계열의 동작에 어떻게 반응하는지 보여줍니다.

```python
ax = y.plot(**plot_params)
ax = y_pred.plot()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e3c4cf20-9d7d-4fcc-b581-7913a118cd9c)

최상의 시계열 모델은 일반적으로 시간 단계 특징과 지연 특징의 조합을 포함합니다. 다음에는 이러한 특징을 시작점으로 삼아 시계열에서 가장 일반적인 패턴을 모델링하는 특징을 엔지니어링하는 방법을 배우겠습니다.
