---
title: "[Time Series] 02. Trend"
categories:
  - Time Series
tags:
  - Time Series
toc: true
toc_sticky: true
toc_label: "Trend"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0699e7c1-a138-47f2-b2ec-51311425a4b0){: .align-center}<br>

## What is Trend?

시계열의 **추세(trend)** 컴포넌트는 시계열 평균의 지속적이고 장기적인 변화를 나타냅니다. 추세는 시계열에서 가장 느리게 움직이는 부분으로, 가장 중요한 시간 규모를 나타내는 부분입니다. 제품 판매량의 시계열에서 추세가 증가하는 것은 해마다 더 많은 사람들이 제품을 알게 되면서 시장이 확장되는 효과일 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7aeac71e-6a80-4e5b-a276-df066b68f1a2)

_Trend patterns in four time series._
{: .text-center}

이 포스트에서는 평균 추세에 초점을 맞출 것입니다. 하지만 일반적으로 시계열에서 지속적이고 느리게 움직이는 모든 변화가 추세를 구성할 수 있으며, 예를 들어 시계열에는 일반적으로 변동에 추세가 있습니다.

<br>

## Moving Average Plots

시계열에 어떤 종류의 추세가 있는지 확인하려면 **이동 평균 플롯(moving average plot)** 을 사용할 수 있습니다. 시계열의 이동 평균을 계산하려면 정의된 폭의 슬라이딩 창 내에서 값의 평균을 계산합니다. 그래프의 각 점은 양쪽 창 안에 있는 시계열의 모든 값의 평균을 나타냅니다. 이 개념은 시계열의 단기 변동을 완화하여 장기적인 변화만 남도록 하는 것입니다.

![trend](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b06b56d7-7d48-4b89-8c6e-3b184d642e5e)

_A moving average plot illustrating a linear trend. Each point on the curve (blue) is the average of the points (red) within a window of size 12._
{: .text-center}

위의 _Mauna Loa_ 시계열에서 해마다 위아래로 반복되는 움직임, 즉 단기적인 _계절적(seasonal)_ 변화를 볼 수 있습니다. 변화가 추세의 일부가 되려면 계절적 변화보다 더 긴 기간에 걸쳐 발생해야 합니다. 따라서 추세를 시각화하기 위해 시계열의 계절적 변화보다 더 긴 기간의 평균을 취합니다. _Mauna Loa_ 시계열의 경우, 각 연도의 계절을 부드럽게 표현하기 위해 크기 12의 창을 선택했습니다.

<br>

## Engineering Trend

추세의 형태를 파악한 후에는 시간 단계 특징을 사용하여 모델링을 시도할 수 있습니다. 시간 더미 자체를 사용하여 선형 추세를 모델링하는 방법을 이미 살펴봤습니다:

```
target = a * time + b
```

시간 더미의 변형을 통해 다른 많은 종류의 추세를 맞출 수 있습니다. 추세가 2진법(포물선)으로 보이는 경우 시간 더미의 제곱을 특징 집합에 추가하면 됩니다:

```
target = a * time ** 2 + b * time + c
```

선형 회귀는 계수 `a`, `b`, `c`를 학습합니다.

아래 그림의 추세 곡선은 이러한 종류의 특징과 scikit-learn의 `선형 회귀(LinearRegression)`를 사용하여 모두 적합했습니다:

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a7b45714-c93c-4424-b89a-8d641ff30d8e)

_**Top**: Series with a linear trend. **Below**: Series with a quadratic trend._

이전에 이 트릭을 본 적이 없다면 선형 회귀가 선이 아닌 곡선에도 적합할 수 있다는 사실을 깨닫지 못했을 수 있습니다. 적절한 모양의 곡선을 특징으로 제공할 수 있다면 선형 회귀가 대상에 가장 적합한 방식으로 결합하는 방법을 학습할 수 있다는 개념입니다.

<br>

## Example - Tunnel Traffic

이 예에서는 _터널 교통량_ 데이터셋에 대한 추세 모델을 만들겠습니다.

```python
from pathlib import Path
from warnings import simplefilter

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

simplefilter("ignore")  # ignore warnings to clean up output cells

# Set Matplotlib defaults
plt.style.use("seaborn-whitegrid")
plt.rc("figure", autolayout=True, figsize=(11, 5))
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
tunnel = tunnel.set_index("Day").to_period()
```

이동 평균 플롯을 만들어 이 계열이 어떤 추세를 보이는지 확인해 보겠습니다. 이 계열은 매일 관찰되므로 1년 이내의 단기적인 변화를 부드럽게 처리하기 위해 365일 기간을 선택하겠습니다.

이동 평균을 만들려면 먼저 `롤링(rolling)` 방법을 사용하여 윈도우 계산을 시작합니다. 그런 다음 `평균(mean)` 방법을 사용하여 해당 기간 동안의 평균을 계산합니다. 보시다시피 _터널 트래픽_의 추세는 선형에 가까운 것으로 보입니다.

```python
moving_average = tunnel.rolling(
    window=365,       # 365-day window
    center=True,      # puts the average at the center of the window
    min_periods=183,  # choose about half the window size
).mean()              # compute the mean (could also do median, std, min, max, ...)

ax = tunnel.plot(style=".", color="0.5")
moving_average.plot(
    ax=ax, linewidth=3, title="Tunnel Traffic - 365-Day Moving Average", legend=False,
);
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/23989fcc-ed1f-48a7-8cff-806fa64b9b5e)

1강에서는 Pandas에서 시간 더미를 직접 설계했습니다. 하지만 이제부터는 `statsmodels` 라이브러리의 `DeterministicProcess`라는 함수를 사용하겠습니다. 이 함수를 사용하면 시계열 및 선형 회귀에서 발생할 수 있는 몇 가지 까다로운 실패 사례를 피할 수 있습니다. `order`는 다항식 순서를 나타냅니다: `1`은 선형, `2`는 이차, `3`은 3차 등 다항식 순서를 나타냅니다.

```python
from statsmodels.tsa.deterministic import DeterministicProcess

dp = DeterministicProcess(
    index=tunnel.index,  # dates from the training data
    constant=True,       # dummy feature for the bias (y_intercept)
    order=1,             # the time dummy (trend)
    drop=True,           # drop terms if necessary to avoid collinearity
)
# `in_sample` creates features for the dates given in the `index` argument
X = dp.in_sample()

X.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ecb4cc6c-da07-44e4-ae67-53c4432dbbb6)

(참고로 _deterministic process_ 은 시계열이 랜덤하지 않거나 완전히 _결정된_ 시계열에 대한 기술 용어입니다(예: `Const` 및 `trend` 시계). 시간 지수에서 파생된 특징은 일반적으로 결정론적이라고 할 수 있습니다.)

기본적으로 이전과 마찬가지로 추세 모델을 만들지만, `fit_intercept=False` 인수를 추가합니다.

```python
from sklearn.linear_model import LinearRegression

y = tunnel["NumVehicles"]  # the target

# The intercept is the same as the `const` feature from
# DeterministicProcess. LinearRegression behaves badly with duplicated
# features, so we need to be sure to exclude it here.
model = LinearRegression(fit_intercept=False)
model.fit(X, y)

y_pred = pd.Series(model.predict(X), index=X.index)
```

`LinearRegression` 모델에서 발견한 추세는 이동 평균 플롯과 거의 동일하므로, 이 경우 선형 추세가 올바른 결정이었음을 알 수 있습니다.

```python
ax = tunnel.plot(style=".", color="0.5", title="Tunnel Traffic - Linear Trend")
_ = y_pred.plot(ax=ax, linewidth=3, label="Trend")
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9ac2eb6f-6f54-4a7d-a5bb-a3cbe5176fd4)

예측을 하기 위해 "표본 외" 특징에 모델을 적용합니다. "표본 외"는 학습 데이터의 관찰 기간을 벗어난 시기를 의미합니다. 30일 예측을 만드는 방법은 다음과 같습니다:

```python
X = dp.out_of_sample(steps=30)

y_fore = pd.Series(model.predict(X), index=X.index)

y_fore.head()
```

```
2005-11-17    114981.801146
2005-11-18    115004.298595
2005-11-19    115026.796045
2005-11-20    115049.293494
2005-11-21    115071.790944
Freq: D, dtype: float64
```

다음 30일 동안의 추세 예측을 보기 위해 시계열의 일부를 플롯해 보겠습니다:

```python
ax = tunnel["2005-05":].plot(title="Tunnel Traffic - Linear Trend Forecast", **plot_params)
ax = y_pred["2005-05":].plot(ax=ax, linewidth=3, label="Trend")
ax = y_fore.plot(ax=ax, linewidth=3, label="Trend Forecast", color="C3")
_ = ax.legend()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f7c6b36d-fb21-4596-9a03-734ea3a7a7fc)

이번 포스팅에서 배운 추세 모델은 여러 가지 이유로 유용한 것으로 밝혀졌습니다. 더 정교한 모델을 위한 기준점이나 시작점 역할을 하는 것 외에도, 추세를 학습할 수 없는 알고리즘(예: XGBoost 및 랜덤 포레스트)을 사용하는 '하이브리드 모델'의 구성 요소로 사용할 수도 있습니다.
