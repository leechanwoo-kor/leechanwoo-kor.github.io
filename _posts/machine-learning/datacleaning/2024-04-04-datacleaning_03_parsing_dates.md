---
title: "[Data Cleaning] 03. Parsing Dates (날짜 파싱)"
categories:
  - Machine Learning
tags:
  - Data Cleaning
toc: true
toc_sticky: true
toc_label: "Parsing Dates"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af91093f-993a-430e-8ded-d5107098faf1){: .align-center}<br>

이 포스팅에서는 날짜로 작업해 보겠습니다.

<br>

## Get our environment set up

가장 먼저 해야 할 일은 사용할 라이브러리와 데이터 집합을 로드하는 것입니다. 2007년부터 2016년 사이에 발생한 산사태에 대한 정보가 포함된 데이터 집합으로 작업할 것입니다.

```python
# modules we'll use
import pandas as pd
import numpy as np
import seaborn as sns
import datetime

# read in our data
landslides = pd.read_csv("../input/landslide-events/catalog.csv")

# set seed for reproducibility
np.random.seed(0)
```

이제 몇 가지 날짜를 살펴볼 준비가 되었습니다!

<br>

## Check the data type of our date column

먼저 데이터의 처음 다섯 행을 살펴보겠습니다.

```python
landslides.head()
```

|   | id | date    | time  | continent_code | country_name  | country_code | state/province | population | city/town        | distance | ... | geolocation                               | hazard_type | landslide_type     | landslide_size | trigger  | storm_name | injuries | fatalities | source_name                | source_link                                       |
|---|----|---------|-------|----------------|---------------|--------------|----------------|------------|------------------|----------|-----|-------------------------------------------|-------------|--------------------|----------------|----------|------------|----------|------------|----------------------------|---------------------------------------------------|
| 0 | 34 | 3/2/07  | Night | NaN            | United States | US           | Virginia       | 16000      | Cherry Hill      | 3.40765  | ... | (38.600900000000003, -77.268199999999993) | Landslide   | Landslide          | Small          | Rain     | NaN        | NaN      | NaN        | NBC 4 news                 | http://www.nbc4.com/news/11186871/detail.html     |
| 1 | 42 | 3/22/07 | NaN   | NaN            | United States | US           | Ohio           | 17288      | New Philadelphia | 3.33522  | ... | (40.517499999999998, -81.430499999999995) | Landslide   | Landslide          | Small          | Rain     | NaN        | NaN      | NaN        | Canton Rep.com             | http://www.cantonrep.com/index.php?ID=345054&C... |
| 2 | 56 | 4/6/07  | NaN   | NaN            | United States | US           | Pennsylvania   | 15930      | Wilkinsburg      | 2.91977  | ... | (40.4377, -79.915999999999997)            | Landslide   | Landslide          | Small          | Rain     | NaN        | NaN      | NaN        | The Pittsburgh Channel.com | https://web.archive.org/web/20080423132842/htt... |
| 3 | 59 | 4/14/07 | NaN   | NaN            | Canada        | CA           | Quebec         | 42786      | Châteauguay      | 2.98682  | ... | (45.322600000000001, -73.777100000000004) | Landslide   | Riverbank collapse | Small          | Rain     | NaN        | NaN      | NaN        | Le Soleil                  | http://www.hebdos.net/lsc/edition162007/articl... |
| 4 | 61 | 4/15/07 | NaN   | NaN            | United States | US           | Kentucky       | 6903       | Pikeville        | 5.66542  | ... | (37.432499999999997, -82.493099999999998) | Landslide   | Landslide          | Small          | Downpour | NaN        | NaN      | 0.0        | Matthew Crawford (KGS)     | NaN                                               |

5 rows × 23 columns

<br>

`landslides` 데이터 프레임의 "date" 열로 작업하겠습니다. 실제로 날짜가 포함된 것처럼 보이는지 확인해 보겠습니다.

```python
# print the first few rows of the date column
print(landslides['date'].head())
```

```
0     3/2/07
1    3/22/07
2     4/6/07
3    4/14/07
4    4/15/07
Name: date, dtype: object
```

네, 날짜가 있습니다! 하지만 인간인 제가 이것이 날짜라는 것을 알 수 있다고 해서 파이썬도 날짜라는 것을 아는 것은 아닙니다. `head()` 출력의 맨 아래에서 이 열의 데이터 유형이 "object"라고 표시되어 있는 것을 볼 수 있습니다.

> 판다스는 다양한 유형의 데이터 유형을 저장하기 위해 "object" dtype을 사용하지만, 대부분 dtype이 "object"인 열을 볼 때 그 안에 문자열이 들어 있는 경우가 많습니다.

[여기](https://pandas.pydata.org/pandas-docs/stable/user_guide/basics.html)에서 pandas dtype 문서를 확인하면 특정 `datetime64` dtype도 있다는 것을 알 수 있습니다. 열의 dtype이 `datetime64`가 아닌 객체이므로 파이썬이 이 열에 날짜가 포함되어 있다는 것을 알지 못한다는 것을 알 수 있습니다.

또한 처음 몇 행을 인쇄하지 않고 열의 dtype만 살펴볼 수도 있습니다:

```python
# check the data type of our date column
landslides['date'].dtype
```

```
dtype('O')
```

문자 코드를 객체의 dtype과 일치시키기 위해 [numpy 문서](https://docs.scipy.org/doc/numpy-1.12.0/reference/generated/numpy.dtype.kind.html#numpy.dtype.kind)를 확인해야 할 수도 있습니다. "O"는 "object"의 코드이므로 이 두 메서드가 동일한 정보를 제공한다는 것을 알 수 있습니다.

<br>

# Covert our date columns to datetime

이제 날짜 열이 날짜로 인식되지 않는다는 것을 알았으니 날짜로 인식되도록 변환할 차례입니다. 이를 "날짜 구문 분석(parsing dates)"이라고 하는데, 문자열을 받아 그 구성 요소를 식별하는 작업이기 때문입니다.

[이 링크에서 자세한 정보를 찾을 수 있는 "strftime directive"라는 가이드](https://strftime.org/)를 통해 날짜의 형식을 결정할 수 있습니다. 기본적인 아이디어는 날짜의 어느 부분이 어디에 있는지, 그리고 그 사이에 어떤 구두점이 있는지 표시해야 한다는 것입니다. [날짜에는 다양한 부분](https://strftime.org/)이 있지만 가장 일반적인 것은 일의 경우 `%d`, 월의 경우 `%m`, 두 자리 연도의 경우 `%y`, 네 자리 연도의 경우 `%Y`입니다.

몇 가지 예를 들어보겠습니다:

- 1/17/07은 "%m/%d/%y" 형식입니다.
- 17-1-2007은 "%d-%m-%Y" 형식입니다.

산사태 데이터 집합에서 "date" 열의 맨 위를 다시 살펴보면, '월/일/두 자리 연도' 형식임을 알 수 있으므로 첫 번째 예제와 동일한 구문을 사용하여 날짜를 구문 분석할 수 있습니다:

```python
# create a new column, date_parsed, with the parsed dates
landslides['date_parsed'] = pd.to_datetime(landslides['date'], format="%m/%d/%y")
```

이제 새 열의 처음 몇 행을 확인하면 dtype이 `datetime64`임을 알 수 있습니다. 또한 날짜가 기본 순서 날짜 시간 객체(연-월-일)에 맞도록 약간 재배열된 것을 볼 수 있습니다.

```python
# print the first few rows
landslides['date_parsed'].head()
```

```
0   2007-03-02
1   2007-03-22
2   2007-04-06
3   2007-04-14
4   2007-04-15
Name: date_parsed, dtype: datetime64[ns]
```

이제 날짜가 올바르게 구문 분석되었으므로 유용한 방식으로 상호 작용할 수 있습니다.

---

- **날짜 형식이 여러 개일 때 오류가 발생하면 어떻게 하나요?** 여기서 날짜 형식을 지정하는 동안 단일 열에 여러 날짜 형식이 있을 때 오류가 발생하는 경우가 있습니다. 이 경우 판다스가 올바른 날짜 형식을 추론하도록 할 수 있습니다. 다음과 같이 하면 됩니다:

`landslides['date_parsed'] = pd.to_datetime(landslides['Date'], infer_datetime_format=True)`

- **왜 항상 `infer_datetime_format = True`를 사용하지 않나요?** 판다스가 항상 시간 형식을 추측하도록 하지 않는 데에는 크게 두 가지 이유가 있습니다. 첫 번째는 특히 누군가가 데이터 입력에 창의력을 발휘한 경우 판다가 항상 올바른 날짜 형식을 알아낼 수 없다는 것입니다. 두 번째는 정확한 날짜 형식을 지정하는 것보다 훨씬 느리다는 것입니다.

<br>

## Select the day of the month

이제 구문 분석된 날짜 열이 있으므로 산사태가 발생한 달의 요일과 같은 정보를 추출할 수 있습니다.

```python
# get the day of the month from the date_parsed column
day_of_month_landslides = landslides['date_parsed'].dt.day
day_of_month_landslides.head()
```

```
0     2.0
1    22.0
2     6.0
3    14.0
4    15.0
Name: date_parsed, dtype: float64
```

원래의 "날짜" 열에서 동일한 정보를 얻으려고 하면 오류가 발생합니다: `AttributeError: Can only use .dt accessor with datetimelike values` 이는 `dt.day`가 dtype이 "object"인 열을 처리하는 방법을 모르기 때문입니다. 데이터 프레임에 날짜가 포함되어 있더라도 유용한 방식으로 상호 작용하려면 먼저 날짜를 구문 분석해야 합니다.

<br>

## Plot the day of the month to check the date parsing

날짜 구문 분석에서 가장 큰 위험 중 하나는 월과 일을 혼동하는 것입니다. `to_datetime()` 함수에는 매우 유용한 오류 메시지가 있지만, 추출한 월의 요일이 맞는지 다시 한 번 확인하는 것도 나쁘지 않습니다.

이를 위해 월별 요일의 히스토그램을 그려 보겠습니다. 1에서 31일 사이의 값을 가질 것으로 예상하며, 산사태가 다른 요일보다 특정 요일에 더 많이 발생한다고 가정할 이유가 없으므로 비교적 고른 분포를 보일 것으로 예상합니다. (모든 달이 31일인 것은 아니므로 31일에 하락하는 경우도 있습니다.) 실제로 그런지 살펴봅시다:

```
# remove na's
day_of_month_landslides = day_of_month_landslides.dropna()

# plot the day of the month
sns.distplot(day_of_month_landslides, kde=False, bins=31)
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4bde5e1a-7db8-4ab4-b7ca-2a7616e2050a)

날짜를 올바르게 파싱한 것 같고 이 그래프가 잘 맞는 것 같습니다.
