---
title: "[Data Cleaning] 02. Scaling and Normalization (스케일링 및 정규화)"
categories:
  - Data Cleaning
tags:
  - Data Cleaning
toc: true
toc_sticky: true
toc_label: "Scaling and Normalization"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af91093f-993a-430e-8ded-d5107098faf1){: .align-center}<br>

이 포스팅에서는 데이터를 스케일링하고 정규화하는 방법(그리고 이 둘의 차이점!)에 대해 살펴보겠습니다.

## Get our environment set up

가장 먼저 해야 할 일은 사용할 라이브러리를 로드하는 것입니다.

```python
# modules we'll use
import pandas as pd
import numpy as np

# for Box-Cox Transformation
from scipy import stats

# for min_max scaling
from mlxtend.preprocessing import minmax_scaling

# plotting modules
import seaborn as sns
import matplotlib.pyplot as plt

# set seed for reproducibility
np.random.seed(0)
```

## Scaling vs. Normalization: What's the difference?

스케일링과 정규화를 혼동하기 쉬운 이유 중 하나는 두 용어가 같은 의미로 사용되기도 하고, 더 혼란스럽게도 매우 유사하기 때문입니다! 두 경우 모두 숫자 변수의 값을 변환하여 변환된 데이터 포인트가 특정 유용한 속성을 갖도록 하는 것입니다. 차이점은 다음과 같습니다.

- **스케일링(scaling)** 에서는 데이터의 _범위_ 를 변경하는 반면,
- **정규화(normalization)** 에서는 데이터 _분포_ 의 _모양_ 을 변경하는 것입니다.

이러한 각 옵션에 대해 좀 더 자세히 살펴보겠습니다.

<br>

## Scaling

이는 데이터를 0-100 또는 0-1과 같은 특정 척도에 맞도록 변환하는 것을 의미합니다. [서포트 벡터 머신(SVM)](https://en.wikipedia.org/wiki/Support_vector_machine) 또는 [K-최근접 이웃(KNN)](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) 과 같이 데이터 포인트가 얼마나 멀리 떨어져 있는지를 측정하는 방법을 사용할 때 데이터 스케일을 조정할 수 있습니다. 이러한 알고리즘을 사용하면 숫자 특징의 '1'의 변화가 동일한 중요성을 갖습니다.

예를 들어 엔화와 미국 달러로 표시된 일부 제품의 가격을 살펴보고 있다고 가정해 보겠습니다. 미국 달러 1달러는 약 100엔의 가치가 있지만, 가격을 스케일링하지 않으면 SVM이나 KNN과 같은 방법은 1엔의 가격 차이를 미국 달러 1달러의 차이만큼 중요하게 고려합니다! 이것은 분명히 우리의 직관과 맞지 않습니다. 통화를 사용하면 통화 간 변환이 가능합니다. 하지만 키와 몸무게 같은 것을 보고 있다면 어떨까요? 몇 파운드를 1인치(또는 몇 킬로그램을 1미터)로 환산해야 하는지 명확하지 않습니다.

변수의 배율을 조정하면 서로 다른 변수를 동등하게 비교할 수 있습니다. 스케일링이 어떤 것인지 명확히 이해하기 위해 가상의 예를 살펴보겠습니다.

```python
# generate 1000 data points randomly drawn from an exponential distribution
original_data = np.random.exponential(size=1000)

# mix-max scale the data between 0 and 1
scaled_data = minmax_scaling(original_data, columns=[0])

# plot both together to compare
fig, ax = plt.subplots(1, 2, figsize=(15, 3))
sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
ax[0].set_title("Original Data")
sns.histplot(scaled_data, ax=ax[1], kde=True, legend=False)
ax[1].set_title("Scaled data")
plt.show()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c015ae8b-49b6-472b-b903-60802aaa560d)

데이터의 모양은 변하지 않지만 0에서 8 사이의 범위가 아니라 0에서 1 사이의 범위가 된 것을 알 수 있습니다.

<br>

## 정규화

스케일링은 데이터의 범위만 변경합니다. 정규화는 보다 근본적인 변환입니다. 정규화의 핵심은 관측값을 정규 분포로 설명할 수 있도록 변경하는 것입니다.

> [정규 분포(normal distribution)](https://en.wikipedia.org/wiki/Normal_distribution): "bell curve"이라고도 하는 이 분포는 평균 위와 아래에 거의 동일한 관측값이 있고, 평균과 중앙값이 같으며, 평균에 가까운 관측값이 더 많은 특정 통계 분포입니다. 정규 분포는 가우스 분포(Gaussian distribution)라고도 합니다.

일반적으로 데이터가 정규 분포라고 가정하는 머신 러닝 또는 통계 기법을 사용하려는 경우 데이터를 정규화합니다. 선형 판별 분석(linear discriminant analysis, LDA)과 가우스 나이브 베이즈(Gaussian naive Bayes) 등이 그 예입니다. (tip: 이름에 "가우스(Gaussian)"가 포함된 모든 방법은 정규 분포를 가정합니다.)

여기서 정규화에 사용하는 방법을 [박스-콕스 변환(Box-Cox Transformation)](https://en.wikipedia.org/wiki/Power_transform#Box%E2%80%93Cox_transformation)이라고 합니다. 일부 데이터를 정규화하는 것이 어떤 모습인지 간단히 살펴보겠습니다:

```python
# normalize the exponential data with boxcox
normalized_data = stats.boxcox(original_data)

# plot both together to compare
fig, ax=plt.subplots(1, 2, figsize=(15, 3))
sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
ax[0].set_title("Original Data")
sns.histplot(normalized_data[0], ax=ax[1], kde=True, legend=False)
ax[1].set_title("Normalized data")
plt.show()
```

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/55ed6f97-5674-45be-b87d-2b846dac8612)

데이터의 _모양_ 이 달라진 것을 볼 수 있습니다. 정규화하기 전에는 거의 L자 모양이었습니다. 그러나 정규화 후에는 종의 윤곽선처럼 보입니다(따라서 "bell curve" 라고 함).
