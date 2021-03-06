---
title: "[Ⅰ. Neural Networks and Deep Learning] Neural Networks Basics (9)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Neural Networks Basics (9)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Python and Vectorization

### Broadcasting in Python
이전 포스팅에서 브로드캐스팅은 파이썬 코드를 더 빠르게 실행하는 데 사용할 수 있는 또 다른 기술이라고 언급했습니다. 이번에는 실제로 파이썬에서 브로드캐스팅이 어떻게 작동하는지 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/174517092-6ac3154c-1822-49eb-bc5d-20df0032c635.png)

예를 들어 방송을 살펴보겠습니다. 이 행렬에서는 탄수화물, 단백질, 그리고 지방에서의 칼로리를 각각의 음식 100g 별로 표현했습니다. 예를 들어, 사과 100g 에서는 56칼로리의 탄수화물을 함유하고 더 훨씬 적은 양의 단백질과 지방이 검출됩니다. 대조적으로, 쇠고기 100g에서는 단백질이 104칼로리 지방이 135칼로리를 함유하고 있습니다.

이제 목표는 4가지 음식 각각에 대한 탄수화물, 단백질 및 지방의 칼로리 비율을 계산하는 것이라고 가정해 봅시다.

예를 들어, 이 열을 보고 그 열에 숫자를 더하면 100g의 사과는 총 59칼로리입니다. 칼로리의 퍼센트를 구하면 탄수화물의 비율은 56/59이므로 약 94.9퍼센트입니다. 사과에 있는 대부분의 칼로리는 탄수화물에서 나오는 반면 쇠고기의 칼로리 대부분은 단백질과 지방 등에서 나옵니다.

따라서 쇠고기의 칼로리 대부분은 단백질과 지방 등에서 나옵니다. 따라서 원하는 계산은 사과, 쇠고기, 계란, 감자 100g의 총 칼로리 수를 얻기 위해 이 행렬 4개 열 각각을 합산하는 것입니다.

그런 다음 4가지 식품 각각에 대한 탄수화물, 단백질 및 지방의 칼로리 비율을 얻기 위해 행렬 전체를 나눕니다. 따라서 문제는, 명시작 for 루프 없이 이 작업을 수행할 수 있습니까? 어떻게 그렇게 할 수 있는지 살펴봅시다.

예를 들어 이 행렬은 $3 \times 4$ 행렬 $A$와 같습니다. 그리고 파이썬 코드 한 줄을 사용하여 열을 요약합니다. 그래서 이 4가지 다른 유형의 식품들 총 칼로리에 해당하는 4개의 숫자를 얻을 것입니다. 이 4가지 다른 유형의 식품들 100g입니다.

그리고 파이썬 코드의 두 번째 줄을 사용하여 4개의 열 각각을 해당 합계로 나눕니다. 글로 명확하지 않다면 파이썬 코드를 보면 더 명확해 질겁니다.

---

```
import numpy as np

A = np.array([56.0, 0.0, 4.4, 68.0],
             [1.2, 104.0, 52.0, 8.0],
             [1.8, 135.0, 99.0, 0.9])
```

행렬 A에 방금 전의 숫자를 적용시키고 행렬 A를 만들었습니다.

이제 여기에 두 줄의 파이썬 코드가 있습니다.

```
cal = A.sum(axis=0)
print(cal)
```

```
[ 59, 239,  155.4,  76.9]
```

첫 번째는 `cal = A.sum()`으로 `axis = 0` 은 수직으로 합산을 의미합니다. 그것에 대해 잠시 후에 더 이야기하겠습니다. 그런 다음 cal을 프린트 하십시오. 수직 합산을 해보겠습니다. 그러면 59는 사과의 총 칼로리이고 239등은 쇠고기와 계란, 감자 등의 총 칼로리입니다.

```
percentage = 100*A/cal.reshape(1,4)
print(percentage)
```

```
[[  94.91525424   0.           2.83140283  88.42652796]
 [   2.03389831  43.51464435  33.46203346  10.40312094]
 [   3.05084746  56.48535565  63.70656371   1.17035111]]
```

그런 다음 계산 백분율은 `A/cal.reshape(1,4)`와 같습니다. 실제로 백분율을 원하므로 여기에 100을 곱합니다. 그런 다음 percentage를 프린트 해봤습니다.

이 명령을 통해서 $A$ 행렬을 취하고 $1 \times 4$ 행렬로 나누었습니다. 그리고 이것은 백분율 행렬을 제공합니다. 아까 직접 계산했듯이 사과는 첫 번째 열에서 총 칼로리 중 94.9%가 탄수화물이었습니다.

다시 이미지를 살펴보겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/174517092-6ac3154c-1822-49eb-bc5d-20df0032c635.png)

두 줄의 코드를 다시 말씀드리면 주피터 노트북에서 `axis = 0`을 조금 더 자세히 설명드리겠습니다. 의미는 파이썬이 수직으로 합산하기를 원한다는 의미합니다. 따라서 이것이 0이라면 수직 합산을 의미하며 1이라면 수평 합산을 의미합니다.

이 두 번째 명령어는 행렬 $A$를 사용하는 파이썬 브로드캐스팅의 예제입니다. 그래서 $A$는 $3 \times 4$ 행렬이고 그것을 $1 \times 4$ 행렬로 나눕니다.

기술적으로 `cal`는 이미 $1 \times 4$ 행렬입니다. 즉, `reshape`를 호출할 필요가 없습니다. 실제로 중복됩니다. 하지만 파이썬 코드를 작성할 때 어떤 행렬인지 잘 모를 경우 행렬의 치수가 올바른 열 벡터인지 행 벡터인지 확인하기 위해 `reshape` 명령어를 호출하는 경우가 많습니다.

`reshape` 명령은 호출 비용이 매우 저렴한 작업입니다. 그러므로 `reshape` 명령을 사용하여 행렬의 크기가 필요한지 확인하십시오.

이제 이러한 유형의 작업이 어떻게 작동하는지 자세히 설명하겠습니다. 우리는 $3 \times 4$ 행렬을 가지고 있었고 그것을 $1 \times 4$ 행렬로 나누었다. 그렇다면, 어떻게 $3 \times 4$ 행렬을 $1 \times 4$ 행렬로 나눌 수 있나? 아니면 $1 \times 4$ 벡터로?

![image](https://user-images.githubusercontent.com/55765292/174517122-ea5fa0be-9cae-42c5-b59f-c85474c6db29.png)

브로드캐스팅에 대한 몇 가지 다른 예를 보겠습니다. 만약 $4 \times 1$ 벡터를 어떤 숫자에 더한다면 파이썬은 이 숫자를 가져다가 다음과 같이 $4 \times 1$ 벡터로 자동 확장합니다. 따라서 좌측 벡터에 숫자 100을 더하면 우측에 있는 벡터가 나옵니다.

모든 요소에 100을 더하고 있으며 이전에 상수가 매개변수 $b$였던 형태의 브로드캐스팅을 사용합니다. 그리고 이러한 유형의 브로드캐스팅은 열 벡터와 행 벡터 모두에서 작동하며 사실 로지스틱 회귀에서 매개변수 $b$인 벡터에 추가하는 상수를 사용하여 이전에 유사한 형태의 브로드캐스팅을 사용합니다.


또 하나의 예제를 보도록 합시다. $2 \times 3$ 행렬이 있다고 가정하고 여기에 $n$개의 행렬을 더하면 됩니다. 따라서 일반적인 경우 여기에 (m,n) 행렬이 있고 (1,n) 행렬에 더하는 경우입니다. 파이썬이 행렬 $m$을 복사하면 이것을 $m \times n$의 행렬로 바꾸고 $1 \times 3$ 행렬 대신에 두 번 복사하여 $2 \times 3$ 행렬로 바꾸어 더하면 오른쪽 합계가 나옵니다.

그래서 첫 번째 열에 100을 더했고 두 번째 열에 200을 더했고 세 번째 열에 300을 더했습니다. 이전에 본 작업은 더하기를 하는 것 대신에 나누기를 한 것이죠.


마지막 예제로 (m,n) 행렬이 있고 이것을 (m,1) 벡터, (m,1) 행렬에 더하는 것입니다. 이런 경우, n번을 수평으로 복사하면 (m,n) 행렬이 됩니다. 수평으로 3번 복사가 된다고 생각하시면 되는데요. 그리고 그것들을 더해줍니다. 그러면 우측에 보이는 것처럼 첫 번째 열에 100을 더했고 두 번째 열에 200을 더했습니다.

![image](https://user-images.githubusercontent.com/55765292/174517147-da4bd8af-f867-4764-8331-5ef194921378.png)

여기 파이썬에서 브로드캐스팅하는 더 일반적인 원칙이 있습니다. (m,n) 행렬이 있고 (1,n) 행렬을 더하거나 빼거나 곱하거나 나누면 n번 복사되어 (m,n) 행렬이 됩니다. 그렇게 해서 더하기, 빼기, 곱하기 또는 나누기의 요소를 적용시켜줍니다.

반대로, (m,n) 행렬을 가져다가 (m,1) 행렬을 더하고, 빼고, 곱하고, 나누면 n번 복사할 것입니다. 그렇게해서 (m,n) 행렬로 바꾼 다음 연산 요소를 적용합니다. 브로드캐시팅 중 하나인데요.

즉, (m,1) 행렬이 있는 경우 실제로는 (1,) 행렬인 100을 더하면 다른 (n,1) 행렬이 나올 때까지 이 실수를 n번 복사하게 됩니다. 그리고 나서 이 예제 요소에 더하기와 같은 작업을 수행합니다. 행 벡터에도 비슷하게 적용됩니다.

완전 일반 버전의 브로드캐스팅은 이보다 더 많은 것을 할 수 있습니다. 관심있는 넘파이 관련 자료를 읽고 해당 자료에서 브로드캐스팅에 대한 부분을 볼 수 있습니다. 그것은 브로드캐스팅에 대한 훨씬 더 일반적인 정의를 제공합니다.
