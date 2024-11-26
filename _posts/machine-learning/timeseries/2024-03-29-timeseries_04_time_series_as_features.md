---
title: "[Time Series] 04. Time Series as Features"
categories:
  - Machine Learning
tags:
  - Time Series
toc: true
toc_sticky: true
toc_label: "Time Series as Features"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0699e7c1-a138-47f2-b2ec-51311425a4b0){: .align-center}<br>

## What is Serial Dependence?

이전에는 _시간 종속(time dependent)_ 속성, 즉 시간 인덱스에서 직접 도출할 수 있는 특징을 사용하여 가장 쉽게 모델링할 수 있는 시계열의 속성에 대해 살펴보았습니다. 그러나 일부 시계열 속성은 _시계열 종속(serial dependence)_ 속성으로만 모델링할 수 있습니다. 즉, 대상 시계열의 과거 값을 피처로 사용하는 것입니다. 이러한 시계열의 구조는 시간에 따른 플롯에서는 명확하지 않을 수 있지만, 아래 그림에서 볼 수 있듯이 과거 값과 비교하여 플롯하면 구조가 명확해집니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/18a717bd-86bb-4eca-bd97-a1e85eed56ba)

_These two series have serial dependence, but not time dependence. Points on the right have coordinates **(value at time t-1, value at time t)**._

추세와 계절성을 사용하여 위 그림의 왼쪽과 같은 플롯에 곡선을 맞추도록 모델을 학습시켰는데, 이 모델은 시간 의존성을 학습하고 있었습니다. 이 단원의 목표는 모델이 오른쪽 그림과 같은 플롯에 곡선을 맞추도록 훈련하는 것입니다. 즉, 모델이 연속 의존성을 학습하도록 하는 것입니다.

<br>

## Cycles

직렬 의존성이 나타나는 특히 일반적인 방법 중 하나는 **주기(cycles)** 입니다. 주기는 시계열에서 한 시점의 값이 이전 시점의 값에 의존하는 방식과 관련된 시계열의 성장 및 쇠퇴 패턴이지만, 반드시 시간 단계 자체에 의존하는 것은 아닙니다. 순환적 행동은 스스로 영향을 미칠 수 있거나 시간이 지나도 반응이 지속되는 시스템의 특징입니다. 경제, 전염병, 동물 개체 수, 화산 폭발 및 이와 유사한 자연 현상은 종종 주기적 행동을 보입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ae4dcbd0-939c-422c-9919-0a54f54cc00a)

_Four time series with cyclic behavior._
{: .text-center}

주기적 행동이 계절성과 구별되는 점은 주기적 행동이 계절처럼 반드시 시간에 따라 달라지는 것은 아니라는 점입니다. 주기에서 일어나는 일은 특정 발생 날짜보다는 최근 과거에 일어난 일에 더 큰 영향을 받습니다. 시간으로부터 (적어도 상대적으로) 독립적이라는 것은 주기적 행동이 계절성보다 훨씬 더 불규칙할 수 있다는 것을 의미합니다.

<br>

## Lagged Series and Lag Plots

시계열에서 가능한 직렬 의존성(예: 주기)을 조사하려면 시계열의 "지연된(lagged)" 복사본을 만들어야 합니다. 시계열을 **지연(Lagging)** 시킨다는 것은 그 값을 하나 이상의 시간 단계 앞으로 이동하거나, 반대로 인덱스의 시간을 하나 이상의 시간 단계 뒤로 이동하는 것을 의미합니다. 두 경우 모두 시차가 있는 시계열의 관측값이 나중에 발생한 것처럼 보이게 되는 효과가 있습니다.

다음은 미국의 월별 실업률(`y`)과 그 첫 번째 및 두 번째 시차 계열(각각 `y_lag_1` 및 `y_lag_2`)을 함께 보여줍니다. 시차가 있는 시계열의 값이 어떻게 시간적으로 앞으로 이동하는지 주목하세요.

```python
import pandas as pd

# Federal Reserve dataset: https://www.kaggle.com/federalreserve/interest-rates
reserve = pd.read_csv(
    "../input/ts-course-data/reserve.csv",
    parse_dates={'Date': ['Year', 'Month', 'Day']},
    index_col='Date',
)

y = reserve.loc[:, 'Unemployment Rate'].dropna().to_period('M')
df = pd.DataFrame({
    'y': y,
    'y_lag_1': y.shift(1),
    'y_lag_2': y.shift(2),    
})

df.head()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a0efa641-3a21-4996-9442-2e28505a774c)

시계열을 시차를 두면 과거 값이 예측하려는 값과 동시적으로(즉, 같은 행에) 나타나도록 할 수 있습니다. 따라서 시차 계열은 직렬 의존성을 모델링하는 기능으로 유용합니다. 미국의 실업률 시리즈를 예측하기 위해 `y_lag_1`과 `y_lag_2`를 피처로 사용하여 목표 `y`를 예측하면 이전 2개월의 실업률의 함수로 미래 실업률을 예측할 수 있습니다.

### Lag plots

시계열의 **지연 플롯(lag plot)** 은 해당 값을 지연에 대해 플롯한 것입니다. 시계열의 직렬 의존성은 종종 지연 플롯을 보면 분명해집니다. 이 _미국 실업률_ 의 지연 플롯을 보면 현재 실업률과 과거 실업률 사이에 강력하고 명백한 선형 관계가 있음을 알 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d864c0b9-c481-4151-a300-317e57e2a0f6)

_Lag plot of US Unemployment with authcorrelations indicated._
{: .text-center}

직렬 의존성의 가장 일반적으로 사용되는 측정값은 **자기상관(autocorrelation)** 로 알려져 있으며, 이는 단순히 시계열이 시차 중 하나와 갖는 상관관계입니다. 미국 실업률은 lag 1에서 0.99, lag 2에서 0.98 등의 자기상관가 있습니다.

### Choosing lags

피처로 사용할 지연을 선택할 때 일반적으로 자기상관이 큰 모든 지연을 포함하는 것은 유용하지 않습니다. 예를 들어, _미국 실업률_ 에서 lag 2의 자기상관은 전적으로 lag 1의 "붕괴된" 정보, 즉 이전 단계에서 이월된 상관관계로 인해 발생할 수 있습니다. lag 2에 새로운 정보가 포함되어 있지 않다면 이미 lag 1이 있는 경우 이를 포함할 이유가 없습니다.

**편자기상관(partial autocorrelation)** 은 이전 모든 지연을 설명하는 지연의 상관관계, 즉 지연이 기여하는 "새로운" 상관관계의 양을 알려줍니다. 편자기상관을 플로팅하면 어떤 지연 기능을 사용할지 선택하는 데 도움이 될 수 있습니다. 아래 그림에서 지연 1부터 지연 6까지는 '상관관계 없음' 구간(파란색)을 벗어나 있으므로 지연 1부터 지연 6까지를 _미국 실업률_ 의 특징으로 선택할 수 있습니다. (지연 11은 false positive일 가능성이 높습니다.)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/05699dc8-bc1a-415b-bfd2-48e124592ce0)

_Partial autocorrelations of US Unemployment through lag 12 with 95% confidence intervals of no correlation._
{: .text-center}

위와 같은 플롯을 _상관관계 그래프(correlogram)_ 라고 합니다. 상관관계 그래프는 기본적으로 푸리에 함수에 대한 주기 도표(periodogram)와 같은 지연 피처에 대한 도표입니다.

마지막으로, 자기상관과 편자기상관은 _선형(linear)_ 의존성의 척도라는 점을 염두에 두어야 합니다. 실제 시계열에는 상당한 비선형 의존성이 있는 경우가 많으므로 지연 기능을 선택할 때는 지연 플롯을 보거나 상호 정보와 같은 보다 일반적인 의존성 측정값을 사용하는 것이 가장 좋습니다. 흑점 계열에는 비선형 의존성을 가진 지연이 있는데, 이는 자기상관로 간과할 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/25d7cd46-a682-47c9-b3ba-88aa0cf23b39)

_Lag plot of the Sunspots series._
{: .text-center}

이러한 비선형 관계는 선형 관계로 변환하거나 적절한 알고리즘을 통해 학습할 수 있습니다.

<br>

## Example - Flu Trends

_독감 동향_ 데이터 집합에는 2009년부터 2016년까지 몇 주 동안의 독감으로 인한 의사 방문 기록이 포함되어 있습니다. 우리의 목표는 앞으로 몇 주 동안의 독감 환자 수를 예측하는 것입니다.

두 가지 접근 방식을 취할 것입니다. 첫 번째는 지연 기능을 사용하여 의사 방문을 예측하는 것입니다. 두 번째 접근 방식은 또 다른 시계열인 Google 트렌드에서 수집한 독감 관련 검색어의 지연을 사용하여 의사 방문을 예측하는 것입니다.

```python
from pathlib import Path
from warnings import simplefilter

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from scipy.signal import periodogram
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from statsmodels.graphics.tsaplots import plot_pacf

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


def lagplot(x, y=None, lag=1, standardize=False, ax=None, **kwargs):
    from matplotlib.offsetbox import AnchoredText
    x_ = x.shift(lag)
    if standardize:
        x_ = (x_ - x_.mean()) / x_.std()
    if y is not None:
        y_ = (y - y.mean()) / y.std() if standardize else y
    else:
        y_ = x
    corr = y_.corr(x_)
    if ax is None:
        fig, ax = plt.subplots()
    scatter_kws = dict(
        alpha=0.75,
        s=3,
    )
    line_kws = dict(color='C3', )
    ax = sns.regplot(x=x_,
                     y=y_,
                     scatter_kws=scatter_kws,
                     line_kws=line_kws,
                     lowess=True,
                     ax=ax,
                     **kwargs)
    at = AnchoredText(
        f"{corr:.2f}",
        prop=dict(size="large"),
        frameon=True,
        loc="upper left",
    )
    at.patch.set_boxstyle("square, pad=0.0")
    ax.add_artist(at)
    ax.set(title=f"Lag {lag}", xlabel=x_.name, ylabel=y_.name)
    return ax


def plot_lags(x, y=None, lags=6, nrows=1, lagplot_kwargs={}, **kwargs):
    import math
    kwargs.setdefault('nrows', nrows)
    kwargs.setdefault('ncols', math.ceil(lags / nrows))
    kwargs.setdefault('figsize', (kwargs['ncols'] * 2, nrows * 2 + 0.5))
    fig, axs = plt.subplots(sharex=True, sharey=True, squeeze=False, **kwargs)
    for ax, k in zip(fig.get_axes(), range(kwargs['nrows'] * kwargs['ncols'])):
        if k + 1 <= lags:
            ax = lagplot(x, y, lag=k + 1, ax=ax, **lagplot_kwargs)
            ax.set_title(f"Lag {k + 1}", fontdict=dict(fontsize=14))
            ax.set(xlabel="", ylabel="")
        else:
            ax.axis('off')
    plt.setp(axs[-1, :], xlabel=x.name)
    plt.setp(axs[:, 0], ylabel=y.name if y is not None else x.name)
    fig.tight_layout(w_pad=0.1, h_pad=0.1)
    return fig


data_dir = Path("../input/ts-course-data")
flu_trends = pd.read_csv(data_dir / "flu-trends.csv")
flu_trends.set_index(
    pd.PeriodIndex(flu_trends.Week, freq="W"),
    inplace=True,
)
flu_trends.drop("Week", axis=1, inplace=True)

ax = flu_trends.FluVisits.plot(title='Flu Trends', **plot_params)
_ = ax.set(ylabel="Office Visits")
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cf1bf9c0-2bac-494d-bd3a-c6a3ae5235a5)

_독감 트렌드_ 데이터는 규칙적인 계절성 대신 불규칙한 주기를 보여줍니다. 새해 즈음에 정점에 도달하는 경향이 있지만 때로는 더 빠르거나 늦게, 때로는 더 크거나 작게 나타납니다. 이러한 주기를 지연 기능으로 모델링하면 계절적 특징처럼 정확한 날짜와 시간에 제약을 받지 않고 변화하는 조건에 동적으로 대응할 수 있습니다.

먼저 지연 및 자기상 플롯을 살펴보겠습니다:

```python
_ = plot_lags(flu_trends.FluVisits, lags=12, nrows=2)
_ = plot_pacf(flu_trends.FluVisits, lags=12)
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c32ea8ef-87fd-4a8c-96c3-ccbf0d6aad0c)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0ca2d49d-9418-46c5-be3c-01875aa9012c)

지연 플롯은 `FluVisits`와 그 지연의 관계가 대부분 선형임을 나타내며, 편자기상관은 지연 1, 2, 3, 4를 사용하여 의존성을 포착할 수 있음을 시사합니다. `shift` 메소드를 사용하면 Pandas에서 시계열을 지연시킬 수 있습니다. 이 문제에서는 지연으로 인해 발생하는 결측치를 `0.0`으로 채우겠습니다.

```python
def make_lags(ts, lags):
    return pd.concat(
        {
            f'y_lag_{i}': ts.shift(i)
            for i in range(1, lags + 1)
        },
        axis=1)


X = make_lags(flu_trends.FluVisits, lags=4)
X = X.fillna(0.0)
```

이전에는 학습 데이터를 넘어 원하는 만큼의 단계에 대한 예측을 만들 수 있었습니다. 그러나 지연 특징을 사용할 때는 지연된 값을 사용할 수 있는 시간 단계만 예측할 수 있습니다. 월요일에 지연 1 특을 사용하면 필요한 지연 1 값은 아직 발생하지 않은 화요일이므로 수요일에 대한 예측을 만들 수 없습니다.

이 문제를 처리하는 전략은 6단원에서 살펴보겠습니다. 이 예제에서는 테스트 집합의 값을 사용하겠습니다.

```python
# Create target series and data splits
y = flu_trends.FluVisits.copy()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=60, shuffle=False)

# Fit and predict
model = LinearRegression()  # `fit_intercept=True` since we didn't use DeterministicProcess
model.fit(X_train, y_train)
y_pred = pd.Series(model.predict(X_train), index=y_train.index)
y_fore = pd.Series(model.predict(X_test), index=y_test.index)
```

```python
ax = y_train.plot(**plot_params)
ax = y_test.plot(**plot_params)
ax = y_pred.plot(ax=ax)
_ = y_fore.plot(ax=ax, color='C3')
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c34316c3-a443-4718-aa4a-37d785766f5e)

예측 값만 보면 대상 계열의 갑작스러운 변화에 반응하기 위해 모델이 어떻게 시간 단계가 필요한지 알 수 있습니다. 이는 대상 계열의 지연만을 특징으로 사용하는 모델의 일반적인 한계입니다.

```python
ax = y_test.plot(**plot_params)
_ = y_fore.plot(ax=ax, color='C3')
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3f94bdd1-186c-4c25-81d2-cb41c5ff91ac)

예측을 개선하기 위해 독감 사례의 변화에 대한 "early warning"를 제공할 수 있는 선행 지표, 시계열을 찾아볼 수 있습니다. 두 번째 접근 방식에서는 Google 트렌드에서 측정한 일부 독감 관련 검색어의 인기도를 학습 데이터에 추가합니다.

`FluCough` 이라는 검색어를 `FluVisits` 이라는 목표에 대해 플로팅하면 이러한 검색어가 선행 지표로 유용할 수 있음을 알 수 있습니다. 독감 관련 검색은 병원 방문 전 몇 주 동안 더 인기가 높아지는 경향이 있습니다.

```python
ax = flu_trends.plot(
    y=["FluCough", "FluVisits"],
    secondary_y="FluCough",
)
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0384a323-469c-41c4-bfcd-3650db7abc2e)

데이터 세트에는 129개의 이러한 용어가 포함되어 있지만 여기서는 몇 개만 사용하겠습니다.

```python
search_terms = ["FluContagious", "FluCough", "FluFever", "InfluenzaA", "TreatFlu", "IHaveTheFlu", "OverTheCounterFlu", "HowLongFlu"]

# Create three lags for each search term
X0 = make_lags(flu_trends[search_terms], lags=3)
X0.columns = [' '.join(col).strip() for col in X0.columns.values]

# Create four lags for the target, as before
X1 = make_lags(flu_trends['FluVisits'], lags=4)

# Combine to create the training data
X = pd.concat([X0, X1], axis=1).fillna(0.0)
```

예측은 다소 거칠지만, 독감 방문의 급격한 증가를 더 잘 예측할 수 있는 것으로 보이며, 이는 검색 인기도의 여러 시계열이 실제로 선행 지표로서 효과적이라는 것을 시사합니다.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=60, shuffle=False)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = pd.Series(model.predict(X_train), index=y_train.index)
y_fore = pd.Series(model.predict(X_test), index=y_test.index)

ax = y_test.plot(**plot_params)
_ = y_fore.plot(ax=ax, color='C3')
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2b5aea1a-4386-4f07-a422-8f5a2d1db754)

이번에 설명하는 시계열은 "purely cyclic"이라고 할 수 있는 것으로, 뚜렷한 추세나 계절성이 없습니다. 하지만 시계열이 추세, 계절성, 주기라는 세 가지 요소를 동시에 가지고 있는 경우는 드물지 않습니다. 각 구성 요소에 적절한 기능을 추가하기만 하면 선형 회귀를 통해 이러한 시계열을 모델링할 수 있습니다. 구성 요소를 개별적으로 학습하도록 훈련된 모델을 결합할 수도 있는데, 다음은 _예측 하이브리드(forecasting hybrid)_ 를 통해 그 방법을 알아보겠습니다.
