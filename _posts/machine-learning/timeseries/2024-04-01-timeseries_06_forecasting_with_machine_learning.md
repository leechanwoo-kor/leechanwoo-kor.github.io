---
title: "[Time Series] 06. Forecasting With Machine Learning"
categories:
  - Time Series
tags:
  - Time Series
  - Machine Learning
toc: true
toc_sticky: true
toc_label: "Forecasting With Machine Learning"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0699e7c1-a138-47f2-b2ec-51311425a4b0){: .align-center}<br>

## Introduction

시간 인덱스라는 단일 입력에서 모든 피처가 파생되는 간단한 회귀 문제로 예측을 다루었습니다. 원하는 추세와 계절별 특징을 생성하기만 하면 미래의 모든 시간에 대한 예측을 쉽게 만들 수 있었습니다.

하지만 지연 특징을 추가하면서 문제의 성격이 달라졌습니다. 지연 특징을 사용하려면 예측 시점에 지연된 목표 값을 알고 있어야 합니다. 지연 1 특징은 시계열을 1단계 앞으로 이동시키므로 미래 1단계는 예측할 수 있지만 2단계는 예측할 수 없습니다.

예측하려는 기간까지 항상 지연을 생성할 수 있다고 가정했습니다(즉, 모든 예측은 한 단계 앞으로만 예측). 실제 예측에는 일반적으로 이보다 더 많은 것이 필요하므로 이번에는 다양한 상황에 대한 예측을 만드는 방법을 보겠습니다.

<br>

## Defining the Forecasting Task

예측 모델을 설계하기 전에 설정해야 할 두 가지 사항이 있습니다:

- 특징(features): 예측이 이루어지는 시점에 어떤 정보를 사용할 수 있는지
- 대상(target): 예측 값이 필요한 기간

**예측 원점(forecast origin)** 은 예측을 수행하는 시간입니다. 실제로 예측 원점은 예측되는 시간에 대한 학습 데이터가 있는 마지막 시간이라고 생각할 수 있습니다. 원점까지의 모든 데이터를 사용하여 특징을 만들 수 있습니다.

**예측 기간(forecast horizon)** 은 예측을 하는 시간입니다. 예를 들어 '1단계' 예측 또는 '5단계' 예측과 같이 예측 기간에 포함된 시간 단계의 수로 예측을 설명하는 경우가 많습니다. 예측 기간은 대상을 설명합니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aa7092e8-a826-4555-97b0-203592555201)

_A three-step forecast horizon with a two-step lead time, using four lag features. The figure represents what would be a single row of training data -- data for a single prediction, in other words._
{: .text-center}

원점과 예측 기간 사이의 시간은 예측의 **리드 타임(lead time)** 또는 _지연 시간(latency)_ 입니다. 예측의 리드 타임은 원점에서 예측 기간까지의 단계 수로 설명됩니다(예: "1단계 앞선" 또는 "3단계 앞선" 예측). 실제로는 데이터 수집 또는 처리 지연으로 인해 예측이 원점보다 여러 단계 앞서 시작해야 할 수도 있습니다.

<br>

## Preparing Data for Forecasting

ML 알고리즘으로 시계열을 예측하려면 해당 알고리즘에 사용할 수 있는 데이터 프레임으로 시계열을 변환해야 합니다. (물론 추세 및 계절성과 같은 확정적(deterministic) 특징만 사용하는 경우는 예외입니다.)

이 과정의 전반부는 지연으로 특징 집합을 만들 때 살펴봤습니다. 후반부는 목표를 준비하는 단계입니다. 이 작업을 수행하는 방법은 예측 작업에 따라 다릅니다.

데이터 프레임의 각 행은 하나의 예측을 나타냅니다. 행의 시간 인덱스는 예측 기간의 첫 번째 시간이지만 전체 기간에 대한 값을 같은 행에 정렬합니다. 다단계 예측의 경우, 이는 각 단계마다 하나씩 여러 개의 출력을 생성하는 모델이 필요하다는 것을 의미합니다.

```python
import numpy as np
import pandas as pd

N = 20
ts = pd.Series(
    np.arange(N),
    index=pd.period_range(start='2010', freq='A', periods=N, name='Year'),
    dtype=pd.Int8Dtype,
)

# Lag features
X = pd.DataFrame({
    'y_lag_2': ts.shift(2),
    'y_lag_3': ts.shift(3),
    'y_lag_4': ts.shift(4),
    'y_lag_5': ts.shift(5),
    'y_lag_6': ts.shift(6),    
})

# Multistep targets
y = pd.DataFrame({
    'y_step_3': ts.shift(-2),
    'y_step_2': ts.shift(-1),
    'y_step_1': ts,
})

data = pd.concat({'Targets': y, 'Features': X}, axis=1)

data.head(10).style.set_properties(['Targets'], **{'background-color': 'LavenderBlush'}) \
                   .set_properties(['Features'], **{'background-color': 'Lavender'})
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/04d53bfa-df60-4537-a90e-eeb920bb57ed)

위의 그림은 _예측 정의(Defining a Forecast)_ 그림과 유사한 데이터 집합을 준비하는 방법, 즉 5개의 지연 특징을 사용하는 2단계 리드 타임의 3단계 예측 작업을 보여줍니다. 원래 시계열은 `y_step_1` 입니다. 누락된 값은 채우거나 삭제할 수 있습니다.

<br>

## Multistep Forecasting Strategies

예측에 필요한 여러 목표 단계를 생성하는 데는 여러 가지 전략이 있습니다. 각각의 장단점이 있는 네 가지 일반적인 전략에 대해 간략히 설명하겠습니다.

### Multioutput model (다중 출력 모델)

여러 개의 출력을 자연스럽게 생성하는 모델을 사용합니다. 선형 회귀와 신경망 모두 다중 출력을 생성할 수 있습니다. 이 전략은 간단하고 효율적이지만 사용하려는 모든 알고리즘에 사용할 수 있는 것은 아닙니다. 예를 들어, XGBoost는 이 작업을 수행할 수 없습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/55356bb8-0e98-47e9-8933-170c7c68080c)

### Direct strategy (직접 전략)

한 모델은 1단계 앞, 다른 모델은 2단계 앞을 예측하는 식으로 각 단계마다 별도의 모델을 학습시킵니다. 1단계 앞을 예측하는 것은 2단계 앞을 예측하는 것과는 다른 문제이므로 각 단계마다 다른 모델이 예측을 수행하도록 하는 것이 도움이 될 수 있습니다. 단점은 많은 모델을 학습시키면 계산 비용이 많이 들 수 있다는 것입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9ac67fc6-e31e-4ff3-939d-2a9483424b8f)

### Recursive strategy (재귀 전략)

단일 한 단계 모델을 학습하고 그 예측을 사용하여 다음 단계의 지연 특징을 업데이트합니다. 재귀적 방법에서는 모델의 1단계 예측을 다음 예측 단계의 지연 특징으로 사용하기 위해 동일한 모델에 다시 입력합니다. 하나의 모델만 학습하면 되지만 단계마다 오류가 전파되기 때문에 예측이 장기간에 걸쳐 부정확할 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ddf8831f-29f7-459b-b575-8a0b47649008)

### DirRec strategy (직접-재귀 전략)

직접 및 재귀 전략의 조합으로, 각 단계별로 모델을 학습시키고 이전 단계의 예측을 새로운 지연 특징으로 사용합니다. 단계별로 각 모델은 추가 지연 입력을 받습니다. 각 모델에는 항상 최신 지연 특징 집합이 있으므로 DirRec 전략은 직접 전략보다 직렬 의존성을 더 잘 포착할 수 있지만 재귀 전략과 같은 오류 전파 문제가 발생할 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c4b1df5-f812-4f16-a99d-9e02f686e2cc)

<br>

## Example - Flu Trends

이 예에서는 _독감 트렌드_ 데이터에 다중 출력 및 직접 전략을 적용하여 이번에는 훈련 기간 이후 여러 주에 대한 실제 예측을 만들어 보겠습니다.

예측 작업의 기간을 8주, 리드 타임은 1주라고 정의하겠습니다. 즉, 다음 주부터 8주 동안의 독감 사례를 예측하는 것입니다.

숨겨진 셀은 예제를 설정하고 도우미 함수 `plot_multistep` 을 정의합니다.

```python
from pathlib import Path
from warnings import simplefilter

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor

simplefilter("ignore")

# Set Matplotlib defaults
plt.style.use("seaborn-whitegrid")
plt.rc("figure", autolayout=True, figsize=(11, 4))
plt.rc(
    "axes",
    labelweight="bold",
    labelsize="large",
    titleweight="bold",
    titlesize=16,
    titlepad=10,
)
plot_params = dict(
    color="0.75",
    style=".-",
    markeredgecolor="0.25",
    markerfacecolor="0.25",
)
%config InlineBackend.figure_format = 'retina'


def plot_multistep(y, every=1, ax=None, palette_kwargs=None):
    palette_kwargs_ = dict(palette='husl', n_colors=16, desat=None)
    if palette_kwargs is not None:
        palette_kwargs_.update(palette_kwargs)
    palette = sns.color_palette(**palette_kwargs_)
    if ax is None:
        fig, ax = plt.subplots()
    ax.set_prop_cycle(plt.cycler('color', palette))
    for date, preds in y[::every].iterrows():
        preds.index = pd.period_range(start=date, periods=len(preds))
        preds.plot(ax=ax)
    return ax


data_dir = Path("../input/ts-course-data")
flu_trends = pd.read_csv(data_dir / "flu-trends.csv")
flu_trends.set_index(
    pd.PeriodIndex(flu_trends.Week, freq="W"),
    inplace=True,
)
flu_trends.drop("Week", axis=1, inplace=True)
```

먼저 다단계 예측을 위해 대상 시리즈(독감으로 인한 주간 진료소 방문 횟수)를 준비합니다. 이 작업이 완료되면 학습과 예측이 매우 간단해집니다.

```python
def make_lags(ts, lags, lead_time=1):
    return pd.concat(
        {
            f'y_lag_{i}': ts.shift(i)
            for i in range(lead_time, lags + lead_time)
        },
        axis=1)


# Four weeks of lag features
y = flu_trends.FluVisits.copy()
X = make_lags(y, lags=4).fillna(0.0)


def make_multistep_target(ts, steps):
    return pd.concat(
        {f'y_step_{i + 1}': ts.shift(-i)
         for i in range(steps)},
        axis=1)


# Eight-week forecast
y = make_multistep_target(y, steps=8).dropna()

# Shifting has created indexes that don't match. Only keep times for
# which we have both targets and features.
y, X = y.align(X, join='inner', axis=0)
```

### Multioutput model

다중 출력 전략으로 선형 회귀를 사용하겠습니다. 다중 출력을 위한 데이터가 준비되면 학습과 예측은 언제나처럼 동일합니다.

```python
# Create splits
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, shuffle=False)

model = LinearRegression()
model.fit(X_train, y_train)

y_fit = pd.DataFrame(model.predict(X_train), index=X_train.index, columns=y.columns)
y_pred = pd.DataFrame(model.predict(X_test), index=X_test.index, columns=y.columns)
```

다단계 모델은 입력으로 사용된 각 인스턴스에 대해 완전한 예측을 생성한다는 점을 기억하세요. 훈련 세트에는 269주, 테스트 세트에는 90주가 있으며, 이제 각 주에 대한 8단계 예측이 있습니다.

```python
train_rmse = mean_squared_error(y_train, y_fit, squared=False)
test_rmse = mean_squared_error(y_test, y_pred, squared=False)
print((f"Train RMSE: {train_rmse:.2f}\n" f"Test RMSE: {test_rmse:.2f}"))

palette = dict(palette='husl', n_colors=64)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(11, 6))
ax1 = flu_trends.FluVisits[y_fit.index].plot(**plot_params, ax=ax1)
ax1 = plot_multistep(y_fit, ax=ax1, palette_kwargs=palette)
_ = ax1.legend(['FluVisits (train)', 'Forecast'])
ax2 = flu_trends.FluVisits[y_pred.index].plot(**plot_params, ax=ax2)
ax2 = plot_multistep(y_pred, ax=ax2, palette_kwargs=palette)
_ = ax2.legend(['FluVisits (test)', 'Forecast'])
```

- Train RMSE: 389.12
- Test RMSE: 582.33

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9f03790d-907e-4040-8b8b-34d7257eeb61)


### Direct strategy

XGBoost는 회귀 작업에 대해 여러 개의 출력을 생성할 수 없습니다. 하지만 직접 감소 전략을 적용하면 여러 단계의 예측을 생성하는 데 사용할 수 있습니다. 이는 scikit-learn의 `MultiOutputRegressor` 로 래핑하는 것만큼이나 간단합니다.

```python
from sklearn.multioutput import MultiOutputRegressor

model = MultiOutputRegressor(XGBRegressor())
model.fit(X_train, y_train)

y_fit = pd.DataFrame(model.predict(X_train), index=X_train.index, columns=y.columns)
y_pred = pd.DataFrame(model.predict(X_test), index=X_test.index, columns=y.columns)
```

여기서 XGBoost는 훈련 세트에서 분명히 과적합합니다. 하지만 테스트 세트에서는 선형 회귀 모델보다 독감 시즌의 역학 관계를 더 잘 포착할 수 있었던 것 같습니다. 일부 하이퍼파라미터를 조정하면 더 나은 결과를 얻을 수 있을 것입니다.

```python
train_rmse = mean_squared_error(y_train, y_fit, squared=False)
test_rmse = mean_squared_error(y_test, y_pred, squared=False)
print((f"Train RMSE: {train_rmse:.2f}\n" f"Test RMSE: {test_rmse:.2f}"))

palette = dict(palette='husl', n_colors=64)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(11, 6))
ax1 = flu_trends.FluVisits[y_fit.index].plot(**plot_params, ax=ax1)
ax1 = plot_multistep(y_fit, ax=ax1, palette_kwargs=palette)
_ = ax1.legend(['FluVisits (train)', 'Forecast'])
ax2 = flu_trends.FluVisits[y_pred.index].plot(**plot_params, ax=ax2)
ax2 = plot_multistep(y_pred, ax=ax2, palette_kwargs=palette)
_ = ax2.legend(['FluVisits (test)', 'Forecast'])
```

- Train RMSE: 1.22
- Test RMSE: 526.45

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dadb1591-70d8-4428-b723-3e7f3114ac25)

DirRec 전략을 사용하려면 다중 출력 레귤레이터를 다른 사이킷 학습 래퍼인 `RegressorChain` 으로 대체하기만 하면 됩니다. 재귀 전략은 직접 코딩해야 합니다.
