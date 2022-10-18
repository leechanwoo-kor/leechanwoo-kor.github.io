---
title: "[R Programming] tidyr / dplyr"
categories:
  - R Programming
tags:
  - R Programming
toc: true
toc_sticky: true
toc_label: "tidyr / dplyr"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196178337-b8c46683-8745-4e42-8167-6f12e5faf1d1.png)

<br>
# tidyr / dplyr

<br>
## 데이터 처리 tidyr (pipe)

<br>
### 파이프(pipe) 개념
- The pipe passes the data frame output that results from the function right before the pipe to input it as the first argument of the function right after the pipe.

![image](https://user-images.githubusercontent.com/55765292/196241086-23058fe9-c781-441d-9661-05a07fcbe191.png)

<br>
### 파이프 (pipe) 연산자 %>%

![image](https://user-images.githubusercontent.com/55765292/196241150-5a201e49-23d3-4604-bcec-57135e3df073.png)

![image](https://user-images.githubusercontent.com/55765292/196241177-62495abb-f70e-4809-ba26-0fd424b16950.png)

<br>
### 파이프 사용하기 (piping)
- 파이프 %>% 사용하기
  - tidyr 패키지 필요
  - install.packages("tidyr")
  - library(tidyr)

```R
# Without piping
function(dataframe, argument_2, argument_3)

# With piping
dataframe %>%
  function(argument_2, argument_3)
```

📌 ext_tracks hurricane dataset : 11,824 obs.of29variables

![image](https://user-images.githubusercontent.com/55765292/196241605-8e92db5f-04e0-4a67-a6ec-eefefaf9eb79.png)

📌 만약, 파이프를 사용하지 않으면?

- For example, without piping, if you wanted to see the time, date, and maximum winds for Katrina from the first three rows of the ext_tracks hurricane data, you could run:
  - In the code, you are creating new R objects at each step, which makes the code clutterd and also requires copying the data frame several times into memory

```R
katrina <- filter(ext_tracks, storm_name == "KATRINA")
katrina_reduced <- select(katrina, month, day, hour, max_wind)
head(katrina_reduced, 3)
```

- As an alternative, you could just wrap one function inside another:
  - This aviods re-assigning the data frame at each step, but quickly becomes ungainly.

```R
head(select(filter(ext_tracks, storm_name == "KATRINA"),
            month, day, hour, max_wind), 3)
```

<br>
## 연산자
- Operators in R
  - Arithmetic Operators
  - Relational Operators
  - Logical Operators
  - Assignment Operators

<br>
### Arithmetic Operators

![image](https://user-images.githubusercontent.com/55765292/196242830-4ad0ad72-9b98-4373-8727-a1be504564df.png)

<br>
### Relational Operators

![image](https://user-images.githubusercontent.com/55765292/196242845-5313b9be-fc57-4ea5-af79-22d7c8909661.png)

<br>
### Logical Operators

![image](https://user-images.githubusercontent.com/55765292/196242882-5ecdb4a0-8765-4ab0-800d-aa6d01f9839e.png)

<br>
### Assignment Operators

![image](https://user-images.githubusercontent.com/55765292/196242793-2f553370-10d8-4aaa-90ac-b489a795d884.png)


<br>
## 데이터 프레임 처리 dplyr 패키지

<br>
### Selecting Data
- The select function subsets certain columns of a data frame by specifying the full column names.

```R
exam %>%
  select(class, english)
```

![image](https://user-images.githubusercontent.com/55765292/196243547-bb1b33e1-c9ff-457a-9e3a-babd6712196a.png)

<br>
### Filtering Data
- The filter function picks out certain rows.

```R
exam %>%
  filter(class == 1)
```

![image](https://user-images.githubusercontent.com/55765292/196243674-2081016c-9895-4397-9b82-ca8103f8ba9d.png)

<br>
### arrange - 순서대로 정렬하기
- 해당 컬럼을 오름차순 혹은 내림차순으로 정렬

```R
exam %>%
  arrange(id)             # id 오름차순으로 정렬

exam %>%
  arrnage(desc(science))  # science 내림차순으로 정렬
```

![image](https://user-images.githubusercontent.com/55765292/196243902-fb8bc738-7e00-4730-81d5-8a764098c161.png)

- id 컬럼은 오름차순, science 컬럼은 내림차순으로 정렬하려면?

```R
exam %>%
  arrange(id, desc(science))
```

<br>
### mutate - 새로운 변수(컬럼) 추가하기
- 새로운 컬럼을 추가하기

```R
exam %>%
  mutate(total = english + science)
```

![image](https://user-images.githubusercontent.com/55765292/196244136-721b3ac5-8e13-4245-83be-fddea15a3aed.png)

- mean (평균) 컬럼을 추가하고 english와 science의 평균을 넣어라!!

```R
exam %>%
  mutate(mean = total/2)
```

- test 컬럼을 추가하고 mean(평균)이 60 이상이면 "pass", 60 미만이면 "fail"로 마킹하라!!

```R
exam %>%
  mutate(test = ifelse(mean >= 60, "pass", "fail"))
```

<br>
### group_by & summarise - 그룹별로 요약하기

```R
exam %>%
  group_by(class) %>%
  summarise(english_sum = sum(english),
            english_mean = mean(english),
            english_median = median(english),
            english_sd = sd(english),
            n = n())
```

![image](https://user-images.githubusercontent.com/55765292/196244701-f019de5b-eef3-41fe-a9bb-2a3e95fc5dbf.png)
