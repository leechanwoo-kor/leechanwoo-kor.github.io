---
title: "[Time Series] 03. Seasonality"
categories:
  - Time Series
tags:
  - Time Series
toc: true
toc_sticky: true
toc_label: "Seasonality"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0699e7c1-a138-47f2-b2ec-51311425a4b0){: .align-center}<br>

## What is Seasonality?

시계열의 평균에 규칙적이고 주기적인 변화가 있을 때마다 **계절성(seasonality)** 을 나타낸다고 말합니다. 계절적 변화는 일반적으로 시계와 달력을 따라 하루, 일주일 또는 일 년에 걸쳐 반복되는 것이 일반적입니다. 계절성은 수일 또는 수년에 걸친 자연계의 주기 또는 날짜와 시간을 둘러싼 사회적 행동의 관습에 의해 주도되는 경우가 많습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/422f35c0-b304-41e8-829d-90ee294231f5)

_Seasonal patterns in four time series._
{: .text-center}

계절성을 모델링하는 두 가지 종류의 특징에 대해 알아보겠습니다. 첫 번째 종류인 지표는 매일 관찰되는 주간 계절과 같이 관찰 횟수가 적은 계절에 가장 적합합니다. 두 번째 종류인 푸리에 함수는 일별 관측값의 연간 시즌과 같이 관측값이 많은 시즌에 가장 적합합니다.

<br>

## Seasonal Plots and Seasonal Indicators

이동 평균 플롯을 사용하여 시계열의 추세를 발견한 것처럼, **계절 플롯(seasonal plot)** 을 사용하여 계절별 패턴을 발견할 수 있습니다.

계절 플롯은 관찰하고자 하는 "season"을 공통 기간으로 하여 시계열의 세그먼트를 플롯으로 표시합니다. 이 그림은 Wikipedia의 _삼각법(trigonometry)_ 관련 문서의 일일 조회수에 대한 계절별 플롯을 보여줍니다. 이 문서의 일일 조회수는 일반적인 _주간(weekly)_ 기간에 대해 플롯되어 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e040ad5c-7320-458c-89d1-e52f29ac806b)

_There is a clear weekly seasonal pattern in this series, higher on weekdays and falling towards the weekend._
{: .text-center}

### Seasonal indicators

**계절 지표(Seasonal indicators)** 는 시계열 수준에서 계절별 차이를 나타내는 이진 특징입니다. 계절 지표는 계절 기간을 범주형 특징으로 취급하고 원핫 인코딩을 적용하면 얻을 수 있는 것입니다.

요일을 원핫 인코딩하면 주간 계절 지표를 얻을 수 있습니다. 그러면 _Trigonometry_ 시계열에 대한 주간 지표를 만들면 6개의 새로운 "더미" 특징이 생깁니다. (선형 회귀는 지표 중 하나를 삭제하면 가장 잘 작동합니다. 아래 프레임에서는 월요일을 선택했습니다.)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4fd08b0b-9834-4c85-b730-682d06294b44)

훈련 데이터에 계절 지표를 추가하면 모델이 계절 기간 내의 수치를 구별하는 데 도움이 됩니다:

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/855fc418-c473-497b-a10f-12b04575c639)

_Ordianry linear regression learns the mean values at each time in the season._
{: .text-center}

지표는 켜기/끄기 스위치 역할을 합니다. 언제든지 이러한 지표 중 최대 하나의 값만 `1`(켜짐)을 가질 수 있습니다. 선형 회귀는 `Mon`에 대한 기준값 `2379`를 학습한 다음 해당 날짜에 켜져 있는 지표의 값에 따라 조정되며, 나머지는 `0`이 되어 사라집니다.

<br>

## Fourier Features and the Periodogram

지금 설명하는 종류의 특징은 지표가 비실용적일 수 있는 많은 관측에 걸친 긴 계절에 더 적합합니다. 각 날짜에 대한 특징을 만드는 대신 푸리에 함수는 몇 가지 특징만으로 계절 곡선의 전체적인 모양을 포착하려고 합니다.

_Trigonometry_ 의 연간 계절에 대한 플롯을 살펴보겠습니다. 1년에 세 번 긴 위아래로 움직이는 움직임, 1년에 52번 짧은 주간 움직임 등 다양한 주파수가 반복되는 것을 볼 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af8108b0-221e-4c3d-ba86-6d7bcec64324)

_Annual seasonality in the Wiki Trigonometry series._
{: .text-center}

푸리에 함수로 포착하고자 하는 것은 한 계절 내의 이러한 주파수입니다. 이 아이디어는 모델링하려는 계절과 동일한 주파수를 갖는 주기적인 곡선을 훈련 데이터에 포함시키는 것입니다. 우리가 사용하는 곡선은 삼각 함수 사인과 코사인의 곡선입니다.

**푸리에 함수(Fourier features)** 는 사인과 코사인 곡선의 쌍으로, 가장 긴 곡선부터 시작하여 계절의 각 잠재적 주파수마다 한 쌍씩 있습니다. 연간 계절성을 모델링하는 푸리에 쌍은 연 1회, 연 2회, 연 3회 등의 빈도를 갖습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d797619d-d152-409f-b2ad-09e50957dc10)

_The first two Fourier pairs for annual seasonality. **Top**: Frequency of once per year. **Bottom**: Frequency of twice per year._
{: .text-center}

이러한 사인/코사인 곡선 세트를 훈련 데이터에 추가하면 선형 회귀 알고리즘이 대상 계열의 계절 성분에 맞는 가중치를 알아냅니다. 이 그림은 선형 회귀가 4개의 푸리에 쌍을 사용하여 _Wiki Trigonometry_ 시계열의 연간 계절성을 모델링하는 방법을 보여줍니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fa7179aa-3d4e-4a20-b16b-067e21846a86)

_**Top**: Curves for four Fourier pairs, a sum of sine and cosine with regression coefficients. Each curve models a different frequency. **Bottom**: The sum of these curves approximates the seasonal pattern._
{: .text-center}

연간 계절성을 잘 추정하기 위해 8개의 피처(four sine / cosine pairs)만 필요했음을 알 수 있습니다. 수백 개의 피처(연중 각 일마다 하나씩)가 필요했던 계절 지표 방법과 비교해 보세요. 푸리에 피처로 계절성의 '주 효과'만 모델링하면 일반적으로 훈련 데이터에 훨씬 적은 수의 피처만 추가하면 되므로 계산 시간이 단축되고 과적합의 위험이 줄어듭니다.

### Choosing Fourier features with the Periodogram

실제로 특징 세트에 몇 개의 푸리에 쌍을 포함해야 할까요? 이 질문에 대한 답은 주기 도표로 찾을 수 있습니다. **주기 도표(periodogram)** 는 시계열에서 주파수의 강도를 알려줍니다.
구체적으로 그래프의 Y축 값은 `(a ** 2 + b ** 2) / 2`이며, 여기서 `a`와 `b`는 해당 주파수에서 사인과 코사인의 계수입니다(위의 푸리에 구성 요소 플롯에서와 같이).

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/07733ec2-933c-4843-943a-6f24d2c631a6)

_Periodogram for the Wiki Tigonometry series._
{: .text-center}

왼쪽에서 오른쪽으로, 1년에 네 번, 분기별로 주기적으로 감소하는 주기도를 볼 수 있습니다. 그래서 연간 시즌을 모델링하기 위해 4개의 푸리에 쌍을 선택했습니다. 주별 빈도는 지표로 모델링하는 것이 더 좋으므로 무시합니다.

### Computing Fourier features (optional)

푸리에 특징을 계산하는 방법을 아는 것이 푸리에 특징을 사용하는 데 필수적인 것은 아니지만, 세부 사항을 보면 더 명확해질 수 있으므로 아래의 셀은 시계열의 인덱스에서 푸리에 특징 집합을 도출하는 방법을 보여줍니다.

```python
import numpy as np


def fourier_features(index, freq, order):
    time = np.arange(len(index), dtype=np.float32)
    k = 2 * np.pi * (1 / freq) * time
    features = {}
    for i in range(1, order + 1):
        features.update({
            f"sin_{freq}_{i}": np.sin(i * k),
            f"cos_{freq}_{i}": np.cos(i * k),
        })
    return pd.DataFrame(features, index=index)


# Compute Fourier features to the 4th order (8 new features) for a
# series y with daily observations and annual seasonality:
#
# fourier_features(y, freq=365.25, order=4)
```

<br>

## Example - Tunnel Traffic

_터널 트래픽_ 데이터 집합을 다시 한 번 살펴보겠습니다. 이 셀은 데이터를 로드하고 `seasonal_plot`과 `plot_periodogram`이라는 두 가지 함수를 정의합니다.

```python
from pathlib import Path
from warnings import simplefilter

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from sklearn.linear_model import LinearRegression
from statsmodels.tsa.deterministic import CalendarFourier, DeterministicProcess

simplefilter("ignore")

# Set Matplotlib defaults
plt.style.use("seaborn-whitegrid")
plt.rc("figure", autolayout=True, figsize=(11, 5))
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
    legend=False,
)
%config InlineBackend.figure_format = 'retina'


# annotations: https://stackoverflow.com/a/49238256/5769929
def seasonal_plot(X, y, period, freq, ax=None):
    if ax is None:
        _, ax = plt.subplots()
    palette = sns.color_palette("husl", n_colors=X[period].nunique(),)
    ax = sns.lineplot(
        x=freq,
        y=y,
        hue=period,
        data=X,
        ci=False,
        ax=ax,
        palette=palette,
        legend=False,
    )
    ax.set_title(f"Seasonal Plot ({period}/{freq})")
    for line, name in zip(ax.lines, X[period].unique()):
        y_ = line.get_ydata()[-1]
        ax.annotate(
            name,
            xy=(1, y_),
            xytext=(6, 0),
            color=line.get_color(),
            xycoords=ax.get_yaxis_transform(),
            textcoords="offset points",
            size=14,
            va="center",
        )
    return ax


def plot_periodogram(ts, detrend='linear', ax=None):
    from scipy.signal import periodogram
    fs = pd.Timedelta("365D") / pd.Timedelta("1D")
    freqencies, spectrum = periodogram(
        ts,
        fs=fs,
        detrend=detrend,
        window="boxcar",
        scaling='spectrum',
    )
    if ax is None:
        _, ax = plt.subplots()
    ax.step(freqencies, spectrum, color="purple")
    ax.set_xscale("log")
    ax.set_xticks([1, 2, 4, 6, 12, 26, 52, 104])
    ax.set_xticklabels(
        [
            "Annual (1)",
            "Semiannual (2)",
            "Quarterly (4)",
            "Bimonthly (6)",
            "Monthly (12)",
            "Biweekly (26)",
            "Weekly (52)",
            "Semiweekly (104)",
        ],
        rotation=30,
    )
    ax.ticklabel_format(axis="y", style="sci", scilimits=(0, 0))
    ax.set_ylabel("Variance")
    ax.set_title("Periodogram")
    return ax


data_dir = Path("../input/ts-course-data")
tunnel = pd.read_csv(data_dir / "tunnel.csv", parse_dates=["Day"])
tunnel = tunnel.set_index("Day").to_period("D")
```

일주일과 1년 동안의 계절별 플롯을 살펴보겠습니다.

```python
X = tunnel.copy()

# days within a week
X["day"] = X.index.dayofweek  # the x-axis (freq)
X["week"] = X.index.week  # the seasonal period (period)

# days within a year
X["dayofyear"] = X.index.dayofyear
X["year"] = X.index.year
fig, (ax0, ax1) = plt.subplots(2, 1, figsize=(11, 6))
seasonal_plot(X, y="NumVehicles", period="week", freq="day", ax=ax0)
seasonal_plot(X, y="NumVehicles", period="year", freq="dayofyear", ax=ax1);
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/16eff73b-52e0-4afb-ba40-15b6537ce7ae)

이제 주기 도표를 살펴보겠습니다.

```python
plot_periodogram(tunnel.NumVehicles);
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aa05d587-326b-4f2e-9297-f84ec6149b72)

주별 시즌은 강하고 연간 시즌은 약하다는 점에서 위의 계절별 플롯과 일치합니다. 주간 시즌은 지표로 모델링하고 연간 시즌은 푸리에 특징으로 모델링하겠습니다. 오른쪽에서 왼쪽으로 보면 주기 그래프가 _격월(6)_ 과 _월간(12)_ 사이에서 떨어지므로 10개의 푸리에 쌍을 사용하겠습니다.

이전 추세 피처를 만들 때 사용한 것과 동일한 유틸리티인 `DeterministicProcess`를 사용하여 계절 피처를 만들겠습니다. 두 개의 계절 기간(주간 및 연간)을 사용하려면 그 중 하나를 '추가 기간'으로 인스턴스화해야 합니다:

```python
from statsmodels.tsa.deterministic import CalendarFourier, DeterministicProcess

fourier = CalendarFourier(freq="A", order=10)  # 10 sin/cos pairs for "A"nnual seasonality

dp = DeterministicProcess(
    index=tunnel.index,
    constant=True,               # dummy feature for bias (y-intercept)
    order=1,                     # trend (order 1 means linear)
    seasonal=True,               # weekly seasonality (indicators)
    additional_terms=[fourier],  # annual seasonality (fourier)
    drop=True,                   # drop terms to avoid collinearity
)

X = dp.in_sample()  # create features for dates in tunnel.index
```

특징 집합을 만들었으므로 모델을 맞추고 예측을 할 준비가 되었습니다. 90일 예측을 추가하여 모델이 학습 데이터를 넘어 어떻게 추정하는지 확인하겠습니다. 여기 코드는 이전 코드와 동일합니다.

```python
y = tunnel["NumVehicles"]

model = LinearRegression(fit_intercept=False)
_ = model.fit(X, y)

y_pred = pd.Series(model.predict(X), index=y.index)
X_fore = dp.out_of_sample(steps=90)
y_fore = pd.Series(model.predict(X_fore), index=X_fore.index)

ax = y.plot(color='0.25', style='.', title="Tunnel Traffic - Seasonal Forecast")
ax = y_pred.plot(ax=ax, label="Seasonal")
ax = y_fore.plot(ax=ax, label="Seasonal Forecast", color='C3')
_ = ax.legend()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4bf3b8dd-83ed-49df-8521-4ec9bfb8c615)

예측을 개선하기 위해 시계열로 할 수 있는 작업은 아직 더 많습니다. 다음 단원에서는 시계열 자체를 특징으로 사용하는 방법에 대해 알아보겠습니다. 시계열을 예측의 입력으로 사용하면 시계열에서 흔히 볼 수 있는 또 다른 구성 요소인 주기를 모델링할 수 있습니다.
