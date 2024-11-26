---
title: "[Data Cleaning] 01. Handling Missing Values (결측값 처리)"
categories:
  - Machine Learning
tags:
  - Data Cleaning
toc: true
toc_sticky: true
toc_label: "Handling Missing Values"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af91093f-993a-430e-8ded-d5107098faf1){: .align-center}<br>

데이터 정리(Data Cleaning)은 데이터 과학의 핵심적인 부분이지만, 매우 실망스러울 수 있습니다. 일부 텍스트 필드가 왜 왜곡되어 있나요? 누락된 값은 어떻게 해야 할까요? 날짜 서식이 올바르게 지정되지 않는 이유는 무엇인가요? 일관성 없는 데이터 입력을 빠르게 정리하려면 어떻게 해야 할까요? 이 과정에서 이러한 문제가 발생하는 이유와 더 중요한 것은 문제를 해결하는 방법을 다룹니다!

가장 일반적인 데이터 정리 문제를 해결하는 방법을 배워 실제로 데이터를 더 빠르게 분석할 수 있습니다. 실제 지저분한 데이터로 5가지 실습을 진행하며 가장 자주 묻는 데이터 정리 관련 질문에 대한 답을 얻게 됩니다.

이 포스팅에서는 결측값을 처리하는 방법을 살펴봅니다.

<br>

## Take a first look at the data

가장 먼저 해야 할 일은 사용할 라이브러리와 데이터 집합을 로드하는 것입니다.

데모를 위해 미식축구 경기에서 발생한 이벤트의 데이터 집합을 사용하겠습니다. 다음 연습에서는 샌프란시스코에서 발급된 건축 허가 데이터 집합에 새로운 기술을 적용합니다.

```python
# modules we'll use
import pandas as pd
import numpy as np

# read in all our data
nfl_data = pd.read_csv("../input/nflplaybyplay2009to2016/NFL Play by Play 2009-2017 (v4).csv")

# set seed for reproducibility
np.random.seed(0) 
```

```
/opt/conda/lib/python3.7/site-packages/IPython/core/interactiveshell.py:3553: DtypeWarning: Columns (25,51) have mixed types.Specify dtype option on import or set low_memory=False.
  exec(code_obj, self.user_global_ns, self.user_ns)
```

새 데이터 집합을 받으면 가장 먼저 해야 할 일은 데이터 집합의 일부를 살펴보는 것입니다. 이렇게 하면 모든 데이터가 올바르게 읽히는지 확인하고 데이터에 무슨 일이 일어나고 있는지 파악할 수 있습니다. 이 경우, `NaN` 또는 `None`으로 표현되는 누락된 값이 있는지 확인해 보겠습니다.

```python
# look at the first five rows of the nfl_data file. 
# I can see a handful of missing data already!
nfl_data.head()
```

|   | Date       | GameID     | Drive | qtr | down | time  | TimeUnder | TimeSecs | PlayTimeDiff | SideofField | ... | yacEPA    | Home_WP_pre | Away_WP_pre | Home_WP_post | Away_WP_post | Win_Prob | WPA       | airWPA    | yacWPA    | Season |
|---|------------|------------|-------|-----|------|-------|-----------|----------|--------------|-------------|-----|-----------|-------------|-------------|--------------|--------------|----------|-----------|-----------|-----------|--------|
| 0 | 2009-09-10 | 2009091000 | 1     | 1   | NaN  | 15:00 | 15        | 3600.0   | 0.0          | TEN         | ... | NaN       | 0.485675    | 0.514325    | 0.546433     | 0.453567     | 0.485675 | 0.060758  | NaN       | NaN       | 2009   |
| 1 | 2009-09-10 | 2009091000 | 1     | 1   | 1.0  | 14:53 | 15        | 3593.0   | 7.0          | PIT         | ... | 1.146076  | 0.546433    | 0.453567    | 0.551088     | 0.448912     | 0.546433 | 0.004655  | -0.032244 | 0.036899  | 2009   |
| 2 | 2009-09-10 | 2009091000 | 1     | 1   | 2.0  | 14:16 | 15        | 3556.0   | 37.0         | PIT         | ... | NaN       | 0.551088    | 0.448912    | 0.510793     | 0.489207     | 0.551088 | -0.040295 | NaN       | NaN       | 2009   |
| 3 | 2009-09-10 | 2009091000 | 1     | 1   | 3.0  | 13:35 | 14        | 3515.0   | 41.0         | PIT         | ... | -5.031425 | 0.510793    | 0.489207    | 0.461217     | 0.538783     | 0.510793 | -0.049576 | 0.106663  | -0.156239 | 2009   |
| 4 | 2009-09-10 | 2009091000 | 1     | 1   | 4.0  | 13:27 | 14        | 3507.0   | 8.0          | PIT         | ... | NaN       | 0.461217    | 0.538783    | 0.558929     | 0.441071     | 0.461217 | 0.097712  | NaN       | NaN       | 2009   |

5 rows × 102 columns

네, 누락된 값이 몇 개 있는 것 같습니다.

<br>

## How many missing data points do we have?

이제 누락된 값이 몇 개 있다는 것을 알았습니다. 각 열에 몇 개가 있는지 살펴봅시다.

```python
# get the number of missing data points per column
missing_values_count = nfl_data.isnull().sum()

# look at the # of missing points in the first ten columns
missing_values_count[0:10]
```

```
Date                0
GameID              0
Drive               0
qtr                 0
down            61154
time              224
TimeUnder           0
TimeSecs          224
PlayTimeDiff      444
SideofField       528
dtype: int64
```

꽤 많은 것 같습니다! 이 문제의 규모를 더 잘 파악하기 위해 데이터 집합에서 누락된 값이 몇 퍼센트인지 확인하는 것이 도움이 될 수 있습니다:

```python
# how many total missing values do we have?
total_cells = np.product(nfl_data.shape)
total_missing = missing_values_count.sum()

# percent of data that is missing
percent_missing = (total_missing/total_cells) * 100
print(percent_missing)
```

```
24.87214126835169
```

와, 이 데이터 집합의 셀 중 거의 4분의 1이 비어 있네요! 다음 단계에서는 누락된 값이 있는 일부 열을 자세히 살펴보고 어떤 문제가 있는지 알아보겠습니다.

<br>

## Figure out why the data is missing

데이터 과학에서 "데이터 의도(data intution)" 라고 부르는 부분, 즉 "데이터를 실제로 살펴보고 데이터가 왜 그런지, 그리고 그것이 분석에 어떤 영향을 미칠지 파악하는 것" 이 바로 이 지점에서 시작됩니다. 데이터 과학을 처음 접하고 경험이 많지 않은 경우, 특히 데이터 과학을 처음 접하는 사람에게는 실망스러운 부분이 될 수 있습니다. 누락된 값을 처리하려면 의도를 사용하여 값이 누락된 이유를 파악해야 합니다. 이를 파악하기 위해 스스로에게 물어볼 수 있는 가장 중요한 질문 중 하나는 다음과 같습니다:

> **이 값이 기록되지 않아서 누락된 것인가, 아니면 존재하지 않아서 누락된 것인가?**

존재하지 않아서 누락된 값(예: 자녀가 없는 사람의 장남 키)이라면 그 값이 무엇일지 추측하는 것은 의미가 없습니다. 이러한 값은 `NaN` 으로 유지하고 싶을 것입니다. 반면에 어떤 값이 기록되지 않아 누락된 경우 해당 열과 행의 다른 값을 기반으로 그 값이 무엇이었을지 추측해 볼 수 있습니다. 이를 **대입(imputation)** 이라고 하며, 다음 포스팅에서 그 방법을 알아보겠습니다! :)

예제를 통해 살펴보겠습니다. `nfl_data` 데이터 프레임에서 누락된 값의 수를 살펴보면 "TimesSec" 열에 누락된 값이 많다는 것을 알 수 있습니다:

```python
# look at the # of missing points in the first ten columns
missing_values_count[0:10]
```

```
Date                0
GameID              0
Drive               0
qtr                 0
down            61154
time              224
TimeUnder           0
TimeSecs          224
PlayTimeDiff      444
SideofField       528
dtype: int64
```

[문서](https://www.kaggle.com/datasets/maxhorowitz/nflplaybyplay2009to2016)를 보면 이 열에는 플레이가 이루어졌을 때 게임에서 남은 시간(초)에 대한 정보가 있다는 것을 알 수 있습니다. 즉, 해당 값이 존재하지 않아서 누락된 것이 아니라 기록되지 않았기 때문에 누락된 것일 수 있습니다. 따라서 그냥 NA로 두기보다는 그 값을 추측하는 것이 합리적일 것입니다.

반면에 "PenalizedTeam"과 같이 누락된 필드가 많은 다른 필드도 있습니다. 하지만 이 경우에는 페널티가 없었다면 어느 팀이 페널티를 받았는지 말하는 것이 의미가 없기 때문에 필드가 누락되어 있습니다. 이 열의 경우 비워 두거나 "neither"과 같은 세 번째 값을 추가하여 NA를 대체하는 것이 더 합리적일 것입니다.

**Tip**: 아직 읽어보지 않았다면 데이터 집합 설명서를 읽어보시기 바랍니다! 다른 사람에게서 받은 데이터 집합으로 작업하는 경우, 그 사람에게 연락하여 자세한 정보를 얻을 수도 있습니다.
{: .notice--info}

매우 신중한 데이터 분석을 하고 있다면 이 시점에서 각 열을 개별적으로 살펴보고 누락된 값을 채우기 위한 최선의 전략을 찾아낼 수 있습니다. 이 포스팅의 나머지 부분에서는 누락된 값에 도움이 될 수 있지만 유용한 정보를 제거하거나 데이터에 노이즈를 추가할 수 있는 몇 가지 "quick and dirty" 기술을 다룰 것입니다.

<br>

## Drop missing values

바쁘거나 값이 누락된 이유를 파악할 이유가 없는 경우, 누락된 값이 포함된 행이나 열을 제거하는 것이 한 가지 옵션이 될 수 있습니다.

참고: 중요한 프로젝트에는 일반적으로 이 방법을 권장하지 않습니다! 일반적으로 시간을 들여 데이터를 살펴보고 누락된 값이 있는 모든 열을 하나하나 살펴보면서 데이터 집합을 제대로 파악하는 것이 좋습니다.
{: .notice--warning}

결측값이 있는 행을 삭제하고 싶은 경우, 판다스에는 이 작업을 도와주는 편리한 함수인 `dropna()`가 있습니다. NFL 데이터 집합에 사용해 보겠습니다!

```python
# remove all the rows that contain a missing value
nfl_data.dropna()
```

|   | Date | GameID | Drive | qtr | down | time | TimeUnder | TimeSecs | PlayTimeDiff | SideofField | ... | yacEPA | Home_WP_pre | Away_WP_pre | Home_WP_post | Away_WP_post | Win_Prob | WPA | airWPA | yacWPA | Season |
|---|------|--------|-------|-----|------|------|-----------|----------|--------------|-------------|-----|--------|-------------|-------------|--------------|--------------|----------|-----|--------|--------|--------|
|   |      |        |       |     |      |      |           |          |              |             |     |        |             |             |              |              |          |     |        |        |        |

0 rows × 102 columns

맙소사, 모든 데이터가 제거된 것 같습니다! 데이터 집합의 모든 행에 적어도 하나의 누락된 값이 있었기 때문입니다. 대신 결측값이 하나 이상 있는 열을 모두 제거하는 것이 더 나을 수 있습니다.

```python
# remove all columns with at least one missing value
columns_with_na_dropped = nfl_data.dropna(axis=1)
columns_with_na_dropped.head()
```

|   | Date       | GameID     | Drive | qtr | TimeUnder | ydstogo | ydsnet | PlayAttempted | Yards.Gained | sp | ... | Timeout_Indicator | Timeout_Team | posteam_timeouts_pre | HomeTimeouts_Remaining_Pre | AwayTimeouts_Remaining_Pre | HomeTimeouts_Remaining_Post | AwayTimeouts_Remaining_Post | ExPoint_Prob | TwoPoint_Prob | Season |
|---|------------|------------|-------|-----|-----------|---------|--------|---------------|--------------|----|-----|-------------------|--------------|----------------------|----------------------------|----------------------------|-----------------------------|-----------------------------|--------------|---------------|--------|
| 0 | 2009-09-10 | 2009091000 | 1     | 1   | 15        | 0       | 0      | 1             | 39           | 0  | ... | 0                 | None         | 3                    | 3                          | 3                          | 3                           | 3                           | 0.0          | 0.0           | 2009   |
| 1 | 2009-09-10 | 2009091000 | 1     | 1   | 15        | 10      | 5      | 1             | 5            | 0  | ... | 0                 | None         | 3                    | 3                          | 3                          | 3                           | 3                           | 0.0          | 0.0           | 2009   |
| 2 | 2009-09-10 | 2009091000 | 1     | 1   | 15        | 5       | 2      | 1             | -3           | 0  | ... | 0                 | None         | 3                    | 3                          | 3                          | 3                           | 3                           | 0.0          | 0.0           | 2009   |
| 3 | 2009-09-10 | 2009091000 | 1     | 1   | 14        | 8       | 2      | 1             | 0            | 0  | ... | 0                 | None         | 3                    | 3                          | 3                          | 3                           | 3                           | 0.0          | 0.0           | 2009   |
| 4 | 2009-09-10 | 2009091000 | 1     | 1   | 14        | 8       | 2      | 1             | 0            | 0  | ... | 0                 | None         | 3                    | 3                          | 3                          | 3                           | 3                           | 0.0          | 0.0           | 2009   |

5 rows × 41 columns

```python
# just how much data did we lose?
print("Columns in original dataset: %d \n" % nfl_data.shape[1])
print("Columns with na's dropped: %d" % columns_with_na_dropped.shape[1])
```

```
Columns in original dataset: 102
Columns with na's dropped: 41
```

꽤 많은 양의 데이터가 손실되었지만, 이 시점에서 데이터에서 모든 `NaN`을 성공적으로 제거했습니다.

<br>

## Filling in missing values automatically

또 다른 옵션은 누락된 값을 자동으로 채우는 것입니다. 다음 비트에서는 NFL 데이터의 작은 하위 섹션을 가져와서 잘 인쇄할 수 있도록 합니다.

```python
# get a small subset of the NFL dataset
subset_nfl_data = nfl_data.loc[:, 'EPA':'Season'].head()
subset_nfl_data
```

|   | EPA       | airEPA    | yacEPA    | Home_WP_pre | Away_WP_pre | Home_WP_post | Away_WP_post | Win_Prob | WPA       | airWPA    | yacWPA    | Season |
|---|-----------|-----------|-----------|-------------|-------------|--------------|--------------|----------|-----------|-----------|-----------|--------|
| 0 | 2.014474  | NaN       | NaN       | 0.485675    | 0.514325    | 0.546433     | 0.453567     | 0.485675 | 0.060758  | NaN       | NaN       | 2009   |
| 1 | 0.077907  | -1.068169 | 1.146076  | 0.546433    | 0.453567    | 0.551088     | 0.448912     | 0.546433 | 0.004655  | -0.032244 | 0.036899  | 2009   |
| 2 | -1.402760 | NaN       | NaN       | 0.551088    | 0.448912    | 0.510793     | 0.489207     | 0.551088 | -0.040295 | NaN       | NaN       | 2009   |
| 3 | -1.712583 | 3.318841  | -5.031425 | 0.510793    | 0.489207    | 0.461217     | 0.538783     | 0.510793 | -0.049576 | 0.106663  | -0.156239 | 2009   |
| 4 | 2.097796  | NaN       | NaN       | 0.461217    | 0.538783    | 0.558929     | 0.441071     | 0.461217 | 0.097712  | NaN       | NaN       | 2009   |


판다스의 `fillna()` 함수를 사용하여 데이터 프레임에서 누락된 값을 채울 수 있습니다. 한 가지 옵션은 `NaN` 값을 무엇으로 대체할지 지정하는 것입니다. 여기서는 모든 `NaN` 값을 0으로 바꾸고 싶다고 말합니다.

```python
# replace all NA's with 0
subset_nfl_data.fillna(0)
```

|   | EPA       | airEPA    | yacEPA    | Home_WP_pre | Away_WP_pre | Home_WP_post | Away_WP_post | Win_Prob | WPA       | airWPA    | yacWPA    | Season |
|---|-----------|-----------|-----------|-------------|-------------|--------------|--------------|----------|-----------|-----------|-----------|--------|
| 0 | 2.014474  | 0.000000  | 0.000000  | 0.485675    | 0.514325    | 0.546433     | 0.453567     | 0.485675 | 0.060758  | 0.000000  | 0.000000  | 2009   |
| 1 | 0.077907  | -1.068169 | 1.146076  | 0.546433    | 0.453567    | 0.551088     | 0.448912     | 0.546433 | 0.004655  | -0.032244 | 0.036899  | 2009   |
| 2 | -1.402760 | 0.000000  | 0.000000  | 0.551088    | 0.448912    | 0.510793     | 0.489207     | 0.551088 | -0.040295 | 0.000000  | 0.000000  | 2009   |
| 3 | -1.712583 | 3.318841  | -5.031425 | 0.510793    | 0.489207    | 0.461217     | 0.538783     | 0.510793 | -0.049576 | 0.106663  | -0.156239 | 2009   |
| 4 | 2.097796  | 0.000000  | 0.000000  | 0.461217    | 0.538783    | 0.558929     | 0.441071     | 0.461217 | 0.097712  | 0.000000  | 0.000000  | 2009   |

좀 더 능숙하게 누락된 값을 같은 열의 바로 뒤에 오는 값으로 대체할 수도 있습니다. (이 방법은 관측값에 일종의 논리적 순서가 있는 데이터 집합에 매우 적합합니다.)

```python
# replace all NA's the value that comes directly after it in the same column, 
# then replace all the remaining na's with 0
subset_nfl_data.fillna(method='bfill', axis=0).fillna(0)
```

|   | EPA       | airEPA    | yacEPA    | Home_WP_pre | Away_WP_pre | Home_WP_post | Away_WP_post | Win_Prob | WPA       | airWPA    | yacWPA    | Season |
|---|-----------|-----------|-----------|-------------|-------------|--------------|--------------|----------|-----------|-----------|-----------|--------|
| 0 | 2.014474  | -1.068169 | 1.146076  | 0.485675    | 0.514325    | 0.546433     | 0.453567     | 0.485675 | 0.060758  | -0.032244 | 0.036899  | 2009   |
| 1 | 0.077907  | -1.068169 | 1.146076  | 0.546433    | 0.453567    | 0.551088     | 0.448912     | 0.546433 | 0.004655  | -0.032244 | 0.036899  | 2009   |
| 2 | -1.402760 | 3.318841  | -5.031425 | 0.551088    | 0.448912    | 0.510793     | 0.489207     | 0.551088 | -0.040295 | 0.106663  | -0.156239 | 2009   |
| 3 | -1.712583 | 3.318841  | -5.031425 | 0.510793    | 0.489207    | 0.461217     | 0.538783     | 0.510793 | -0.049576 | 0.106663  | -0.156239 | 2009   |
| 4 | 2.097796  | 0.000000  | 0.000000  | 0.461217    | 0.538783    | 0.558929     | 0.441071     | 0.461217 | 0.097712  | 0.000000  | 0.000000  | 2009   |

---
