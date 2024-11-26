---
title: "[Data Cleaning] 05. Inconsistent Data Entry (일관되지 않은 데이터 입력)"
categories:
  - Machine Learning
tags:
  - Data Cleaning
toc: true
toc_sticky: true
toc_label: "Inconsistent Data Entry"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af91093f-993a-430e-8ded-d5107098faf1){: .align-center}<br>

이 포스팅에서는 일관성 없는 텍스트 항목을 정리하는 방법을 배워 보겠습니다.

<br>

## Get our environment set up

가장 먼저 해야 할 일은 사용할 라이브러리와 데이터 세트를 로드하는 것입니다.

```python
# modules we'll use
import pandas as pd
import numpy as np

# helpful modules
import fuzzywuzzy
from fuzzywuzzy import process
import charset_normalizer

# read in all our data
professors = pd.read_csv("../input/pakistan-intellectual-capital/pakistan_intellectual_capital.csv")

# set seed for reproducibility
np.random.seed(0)
```

<br>

## Do some preliminary text pre-processing

데이터의 처음 몇 행을 간단히 살펴보는 것으로 시작하겠습니다.

```python
professors.head()
```

|   | Unnamed: 0 | S# | Teacher Name        | University Currently Teaching          | Department            | Province University Located | Designation         | Terminal Degree | Graduated from                                    | Country  | Year   | Area of Specialization/Research Interests         | Other Information |
|---|------------|----|---------------------|----------------------------------------|-----------------------|-----------------------------|---------------------|-----------------|---------------------------------------------------|----------|--------|---------------------------------------------------|-------------------|
| 0 | 2          | 3  | Dr. Abdul Basit     | University of Balochistan              | Computer Science & IT | Balochistan                 | Assistant Professor | PhD             | Asian Institute of Technology                     | Thailand | NaN    | Software Engineering & DBMS                       | NaN               |
| 1 | 4          | 5  | Dr. Waheed Noor     | University of Balochistan              | Computer Science & IT | Balochistan                 | Assistant Professor | PhD             | Asian Institute of Technology                     | Thailand | NaN    | DBMS                                              | NaN               |
| 2 | 5          | 6  | Dr. Junaid Baber    | University of Balochistan              | Computer Science & IT | Balochistan                 | Assistant Professor | PhD             | Asian Institute of Technology                     | Thailand | NaN    | Information processing, Multimedia mining         | NaN               |
| 3 | 6          | 7  | Dr. Maheen Bakhtyar | University of Balochistan              | Computer Science & IT | Balochistan                 | Assistant Professor | PhD             | Asian Institute of Technology                     | Thailand | NaN    | NLP, Information Retrieval, Question Answering... | NaN               |
| 4 | 24         | 25 | Samina Azim         | Sardar Bahadur Khan Women's University | Computer Science      | Balochistan                 | Lecturer            | BS              | Balochistan University of Information Technolo... | Pakistan | 2005.0 | VLSI Electronics DLD Database                     | NaN               |

'Country' 열에 데이터 입력 불일치가 없는지 확인하기 위해 정리하고 싶다고 가정해 보겠습니다. 물론 각 행을 일일이 손으로 확인하고 불일치를 발견하면 수작업으로 수정할 수도 있습니다. 하지만 이보다 더 효율적인 방법이 있습니다!

```python
# get all the unique values in the 'Country' column
countries = professors['Country'].unique()

# sort them alphabetically and then take a closer look
countries.sort()
countries
```

```
array([' Germany', ' New Zealand', ' Sweden', ' USA', 'Australia',
       'Austria', 'Canada', 'China', 'Finland', 'France', 'Greece',
       'HongKong', 'Ireland', 'Italy', 'Japan', 'Macau', 'Malaysia',
       'Mauritius', 'Netherland', 'New Zealand', 'Norway', 'Pakistan',
       'Portugal', 'Russian Federation', 'Saudi Arabia', 'Scotland',
       'Singapore', 'South Korea', 'SouthKorea', 'Spain', 'Sweden',
       'Thailand', 'Turkey', 'UK', 'USA', 'USofA', 'Urbana', 'germany'],
      dtype=object)
```

예를 들어 'Germany'과 'germany' 또는 'New Zealand'와 'New Zealand'와 같이 데이터 입력이 일치하지 않아서 문제가 발생하는 것을 볼 수 있습니다.

가장 먼저 할 일은 모든 것을 소문자로 만들고(원한다면 마지막에 다시 변경할 수 있습니다) 셀의 시작과 끝에 있는 공백을 모두 제거하는 것입니다. 텍스트 데이터에서 대문자와 뒤따르는 공백의 불일치는 매우 흔한 문제이며, 이렇게 하면 텍스트 데이터 입력 불일치의 80% 정도를 해결할 수 있습니다.

```python
# convert to lower case
professors['Country'] = professors['Country'].str.lower()
# remove trailing white spaces
professors['Country'] = professors['Country'].str.strip()
```

다음으로 좀 더 어려운 불일치 문제를 해결해 보겠습니다.

<br>

## Use fuzzy matching to correct inconsistent dfata entry

이제 'Country' 열을 다시 한 번 살펴보고 더 정리해야 할 데이터가 있는지 확인해 보겠습니다.

```python
# get all the unique values in the 'Country' column
countries = professors['Country'].unique()

# sort them alphabetically and then take a closer look
countries.sort()
countries
```

```
array(['australia', 'austria', 'canada', 'china', 'finland', 'france',
       'germany', 'greece', 'hongkong', 'ireland', 'italy', 'japan',
       'macau', 'malaysia', 'mauritius', 'netherland', 'new zealand',
       'norway', 'pakistan', 'portugal', 'russian federation',
       'saudi arabia', 'scotland', 'singapore', 'south korea',
       'southkorea', 'spain', 'sweden', 'thailand', 'turkey', 'uk',
       'urbana', 'usa', 'usofa'], dtype=object)
```

'southkorea'와 'south korea'가 동일해야 하는 또 다른 불일치가 있는 것 같습니다.

[fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) 패키지를 사용해 어떤 문자열이 서로 가장 가까운지 식별할 수 있도록 하겠습니다. 이 데이터 세트는 충분히 작아서 수작업으로 오류를 수정할 수 있지만, 이러한 접근 방식은 확장성이 좋지 않습니다. (수천 개의 오류를 수작업으로 수정하고 싶으신가요? 만 개는 어떨까요? 가능한 한 빨리 자동화하는 것이 일반적으로 좋은 생각입니다. 게다가 재미도 있죠!)

> **퍼지 매칭(fuzzy matching)**: 대상 문자열과 매우 유사한 텍스트 문자열을 자동으로 찾는 프로세스입니다. 일반적으로 한 문자열을 다른 문자열로 변환할 때 변경해야 하는 문자가 적을수록 다른 문자열에 "가까운" 문자열로 간주됩니다. 따라서 "apple"과 "snapple"은 서로 두 개("s"와 "n"을 추가)만 변경하면 되고, "in"과 "on"은 한 개("i"를 "o"로 대체)만 변경하면 됩니다. 퍼지 매칭에 항상 100% 의존할 수는 없지만 일반적으로 최소한 시간을 조금이라도 절약할 수 있습니다.

fuzzywuzzy는 두 문자열이 주어지면 비율을 반환합니다. 비율이 100에 가까울수록 두 문자열 사이의 편집 거리가 작아집니다. 여기서는 도시 목록에서 "south korea"와 가장 가까운 거리에 있는 10개의 문자열을 가져옵니다.

```python
# get the top 10 closest matches to "south korea"
matches = fuzzywuzzy.process.extract("south korea", countries, limit=10, scorer=fuzzywuzzy.fuzz.token_sort_ratio)

# take a look at them
matches
```

```
[('south korea', 100),
 ('southkorea', 48),
 ('saudi arabia', 43),
 ('norway', 35),
 ('austria', 33),
 ('ireland', 33),
 ('pakistan', 32),
 ('portugal', 32),
 ('scotland', 32),
 ('australia', 30)]
```

도시 중 두 개의 항목이 "south korea"에 매우 가깝다는 것을 알 수 있습니다: "south korea" 및 "southkorea"입니다. "국가" 열에서 비율이 47을 초과하는 모든 행을 "south korea"로 바꾸겠습니다.

이를 위해 함수를 작성하겠습니다. (특정 작업을 한두 번 이상 수행해야 할 것 같으면 재사용할 수 있는 범용 함수를 작성하는 것이 좋습니다. 이렇게 하면 코드를 너무 자주 복사하여 붙여넣지 않아도 되므로 시간을 절약하고 실수를 방지할 수 있습니다.)

```python
# function to replace rows in the provided column of the provided dataframe
# that match the provided string above the provided ratio with the provided string
def replace_matches_in_column(df, column, string_to_match, min_ratio = 47):
    # get a list of unique strings
    strings = df[column].unique()
    
    # get the top 10 closest matches to our input string
    matches = fuzzywuzzy.process.extract(string_to_match, strings, 
                                         limit=10, scorer=fuzzywuzzy.fuzz.token_sort_ratio)

    # only get matches with a ratio > 90
    close_matches = [matches[0] for matches in matches if matches[1] >= min_ratio]

    # get the rows of all the close matches in our dataframe
    rows_with_matches = df[column].isin(close_matches)

    # replace all rows with close matches with the input matches 
    df.loc[rows_with_matches, column] = string_to_match
    
    # let us know the function's done
    print("All done!")
```

이제 함수가 생겼으니 테스트해 볼 수 있습니다!

```python
# use the function we just wrote to replace close matches to "south korea" with "south korea"
replace_matches_in_column(df=professors, column='Country', string_to_match="south korea")
```

이제 'Country' 열의 고유 값을 다시 한 번 확인하고 'south korea'를 올바르게 정리했는지 확인해 보겠습니다.

```python
# get all the unique values in the 'Country' column
countries = professors['Country'].unique()

# sort them alphabetically and then take a closer look
countries.sort()
countries
```

훌륭합니다! 이제 데이터 프레임에 "south korea"만 남게 되었으며 손으로 아무것도 변경할 필요가 없습니다.
