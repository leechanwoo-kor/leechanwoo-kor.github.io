---
title: "[R Programming] 결측치(Missing Value) 처리"
categories:
  - R Programming
tags:
  - R Programming
toc: true
toc_sticky: true
toc_label: "결측치(Missing Value) 처리"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196178337-b8c46683-8745-4e42-8167-6f12e5faf1d1.png)

<br>
# 결측치(Missing Value) 처리

<br>
## 결측치(Missing Values)

**결측치는 왜 발생하는가?**
- 데이터 조사 입력시 조사원의 실수 및 착오 등으로 누락될 수 있음
- 데이터 연산시 결측치가 발생될 수 있음
  - 벡터에서 인덱스 범위가 넘는 자리에 값을 할당할 경우
  - 기존 객체를 다른 형태의 객체로 변경할 경우
  - 메트릭스를 생성할 때 값을 누락시킨 경우
  - 수학 연산(나눗셈)시 결측치가 발생될 수 있음
- 데이터 병합시 결측치가 발생될 수 있음
  - 데이터 프레임간의 데이터 병합(조인)시 결측치가 발생될 수 있음

<br>
### 결측치를 찾는 방법
- Missing values are denoted by NA or NaN for undefined mathematical operations.
  - is.na() is used to test objects if they are NA(= Not Available)
  - is.nan() is used to test for NaN(= Not a Number)

```R
    ## Create a vector with NAs in it
    x <- c(1, 2, NA, 10, 3)
    ## Return a logical vector indicating which elements are NA
    is.na(x)
### [1] FALSE FALSE  TRUE FALSE FALSE

    ## Return a logical vector indicating which elements are NaN
    is.nan(x)
### [1] FALSE FALSE FALSE FALSE FALSE
```

<br>

- NA values have a class, so there are integer NA, character NA, etc.
- a NaN values is also NA, but the converse is not true.

```R
    ## Now create a vector with both NA and NaN values
    x <- c(1, 2, NaN, NA, 4)
    is.na(x)
### [1] FALSE FALSE  TRUE  TRUE FALSE

    is.nan(x)
### [1] FALSE FALSE  TRUE FALSE FALSE
```

<br>

## 결측치가 있으면 어떻게 해야 하는가?
- 결측치가 있으면
  - 통계 함수(min, max, sum, mean 등) 적용이 어려워짐
  - 데이터 마이닝(데이터 분석)이 어려워짐
- 어떻게 해야 하는가?
  - 데이터 분석을 하기 전에
    - 결측치를 찾고
    - 결측치를 갖고 있는 행(row)를 제거함
  - 데이터 전처리(pre-processing) 과정
- 결측치를 갖고 있는 행(row) 제거시 단점은?
  - 데이터의 손실 발생

<br>

### 실습: 결측치 제거

```R
    library(dplyr)

    # exam 데이터프레임의 science 컬럼에 NA인 데이터만 출력
    exam %>%
          filter(is.na(science))

    # exam 데이터프레임에서 science 컬럼의 결측치 제거
    exam %>%
          filter(!is.na(science))

    # exam 데이터프레임에서 science 컬럼과 math 컬럼의 결측치 모두 제거
    exam %>%
          filter(!is.na(science) & !is.na(math))

    # exam 데이터프레임의 모든 컬럼의 결측치 모두 제거
    exam <- na.omit(score)
```

<br>

## 결측치 제거의 단점 및 대안
- 결측치를 갖고 있는 행(row) 제거시 단점은?
  - 데이터의 손실 발생
- 대안은?
  - 다른 값으로 대체하자!!
    - 대표값(ex. 평균, 최빈값 등)으로 대체
    - 예측값을 추정해서 대체

<br>

### 실습: 결측치를 대체값으로 교체

```R
    # 결측치를 제외하고 science 컬럼의 평균 계산
    mean(exam$science, na.rm = T)
    
    # science 컬럼의 평균을 결측치의 대체값으로 교체함
    exam$science <- ifelse(is.na(exam$science), 55, exam$science)
```
