---
title: "[Recommendation System] 추천 시스템과 머신 러닝 (2)"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "추천 시스템과 머신 러닝 (2)"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc9f80c0-9407-4392-b8da-9872f1775560){: .align-center}<br>

## 희소성 문제의 이해와 접근

추천 시스템의 핵심 문제는 **희소성**입니다. 하루 수천만 유저가 수십억건의 로그를 찍어내는 서비스에서조차 희소성의 문제는 해결되지 않습니다. 서비스에 따라 다르긴 하지만, 오히려 더 심해지는 것이 일반적입니다. 문제를 이해하기 위해 희소성이 무엇인지부터 정확히 알아보고 가겠습니다.

일반적으로 추천시스템에서 말하는 **희소성**이란 _유저와 아이템 사이의 상호작용이 충분히 관찰되지 않았다_ 는 얘기 입니다. 일상에서 흔히 접할 수 있는 미디어와 쇼핑 플랫폼인 유튜브와 쿠팡을 생각해보겠습니다. 아무리 하루 종일 유튜브를 보는 사람이라도 유튜브 영상 모두를 생각해본다면 극히 일부만을 시청했을 것입니다. 쿠팡의 VVIP 유저라고 할지라도 쿠팡 전체 아이템을 사기는 커녕 들여다 보지도 못했을 것입니다.

여기서 말하는 상호작용은 어떤 것이든 상관없습니다. 심지어 단순히 브라우저에서 관측한(이전 글에서 봤듯이 이를 impression이라 합니다) 케이스까지 모두 고려한다해도 그렇습니다. 물론 단순한 노출보다는 좀 더 많은 정보를 담고 있는 클릭, 시청, 구매 등의 정보를 일반적으로 모델에서는 학습합니다.

정확히는 impression이 발생한 데이터 중에 추가적인 긍정적인 반응(positive feedback)이 있는 컨텐츠를 유저들이 선호한다고 가정하여 이를 패턴화합니다. negative feedback은 미묘할 뿐더러 정보량 또한 충분하지 않습니다. [ALS 논문](http://yifanhu.net/PUB/cf.pdf)에서 이에 대해 잘 설명해주었기 때문에 관심 있으신 분은 논문을 읽어보시길 강력히 권장합니다.

개인화에서 말하는 희소성은 밀도와 함께 정의되며, 둘 사이의 관계는 `희소성 = 1 - 밀도` 입니다. 밀도의 정의는 유저-아이템 행렬에서 `(값이 존재하는 경우의 수) / (전체 경우의 수 = 유저 수 * 아이템 수)`이며, 수식으로 정리하면 다음과 같습니다.

$Density = \dfrac{(Observed User, Item feedback) pair}{Users * Items}$
{: .text-center}

분모의 의미는 관측 가능한 모든 경우의 수이므로, 밀도는 (실제 관측된 경우의 수) / (가능한 모든 경우의 수)로 해석할 수도 있습니다. 예컨대 각 유저가 평균적으로 전체 아이템의 1%와 상호작용했다면 밀도는 0.99이며 희소성은 0.01입니다.

정리하면 각 유저는 전체 아이템에 비하면 극히 일부의 아이템만을 경험(일반적으로 positive feedback 기준)하였고, 마찬가지로 각 아이템은 전체 유저에 비하면 극히 일부의 유저만 경험하였습니다. 이를 지표화한 것이 밀도와 희소성이며 0~1 사이의 값을 가집니다. 행렬 분해와 관련하여 조금 더 들여다보기 전에, 희소 행렬을 컴퓨터에서 어떻게 다루는지 잠깐 살펴보겠습니다.

<br>

## 행렬의 구조

유저-아이템 행렬도 언급했고, 행렬 분해 알고리즘이 많이 사용된다고도 했지만 정작 행렬이 어떠한 형태인지는 말하지 않았습니다. 이참에 행렬의 형태를 정확히 정의하고, 실제 컴퓨터에서 이를 어떻게 다루는지 살펴보겠습니다. 유저-아이템 행렬은 일반적으로 유저가 각 유저가 행이 되고 각 아이템이 열이 되며 rating이 값이 되는 다음과 같은 형태의 형렬입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/343c4d0f-1033-4917-9949-84a420dd0501){: .align-center}<br>

여기서 문제가 되는 것은 다시 한 번 **결측**입니다. 수학에서 행렬의 결측치를 다루는 것과 달리 컴퓨터 상에서는 Null이나 Na 등으로 이를 표현하며, 모든 결측은 일정량의 메모리를 차지합니다. 그런데 문제는 이걸 굳이 표현함으로써 생기는 방대한 메모리의 낭비입니다. 쉽게 말해, 어차피 거의 다 결측이 아니라면 결측이 아닌 것만 표현하면 되지 않냐는 것입니다. 실제 많은 경우에 행렬의 밀도가 1%가 되지 않으며 0.01% 미만도 드문 일입니다.

위의 행렬에서 결측 없이 존재하는 값만을 적재하는 방법은 간단합니다. 세 개의 칼럼(user, item, rating)을 가진 행렬을 새롭게 구성하는 것입니다. 대다수의 추천 알고리즘과 관련된 패키지들은 위 형태의 행렬을 입력값으로 받습니다. 파이썬에서 가장 널리 쓰이는 자료 유형은 아마도 scipy의 [csr_matrix](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.csr_matrix.html) 일 것입니다. 여기서 rating은 위에서 언급한 positive feedback입니다.

대다수의 패키지들은 user id와 item id를 빈 공간 없이 연속적인 정수로 변환하는 과정을 필요로 합니다. 예를 들어, user id가 1, 3, 4인 세명의 유저가 있다면 0, 1, 2 세 명으로 변환이 필요한 것입니다. 그렇지 않을 경우 비어있던 0, 2번 유저도 임베딩 벡터를 구성하며 이를 추론에 활용합니다. 이 부분 때문에 처음 추천 모델을 만들게 되면 유저 아이디를 인덱스로 매핑하고 다시 되돌리는데, 이것이 조금 헷갈릴 수 있어 실수하는 경우가 많습니다. 아래는 관련 코드입니다.

```python
uid_to_idx = {uid: idx for (idx, uid) in enumerate(train_df.user.unique().tolist())}
iid_to_idx = {iid: idx for (idx, iid) in enumerate(train_df.item.unique().tolist())}

idx_to_iid = {idx:iid for iid, idx in iid_to_idx.items()}
idx_to_uid = {idx:uid for uid, idx in uid_to_idx.items()}

row, col, dat = train_df.user.tolist(), train_df.item.tolist(), train_df.rating.tolist()
row = [uid_to_idx[r] for r in row]
col = [iid_to_idx[c] for c in col]
```

<br>

## 행렬 분해

바로 위에서 어떤 행렬을 분해할 것인지 보았습니다. 이제 다시 행렬 분해 알고리즘의 작동 방식을 살펴보겠습니다. 추천 시스템에서 처음 널리 사용된 행렬 분해 알고리즘은 SVD였습니다. 직관적으로 보자면, 유저-아이템 행렬을 차원 축소한 뒤 원상복귀하게 되면 0(기본적으로 결측을 0으로 둡니다)이었던 값들이 전반적인 패턴을 이식하여 다른 값으로 채워지는 것을 예측값으로 보게된다는 컨셉입니다. 보통 PCA를 어느 정도 이해하신 분들이라면 빠르게 감을 잡을 수 있는데, 바로 이해가 가지 않으셔도 그다지 상관없습니다.

실제 가상의 영화 평점 데이터에서 기초적인 SVD기 작동하는 모습을 살펴보겠습니다. 다음은 원시데이터이며, 관측되지 않은 탑건에 대한 지영의 평점은 0으로 표현되었습니다. 우리의 목표는 지영이 탑건을 좋아할지 맞추는 것인데, 대략적으로 토르와 마녀, 탑건이 비슷한 평점을 받는 반면 헤어질 결심(At Last)는 반대의 패턴을 보이는 것을 쉽게 확인할 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/88d024ee-b715-4af6-9349-80fb7e356129){: .align-center}<br>

SVD를 통해 행렬을 분해한 뒤, 특이값(Singlear value)를 최소 1개에서 최대 4개까지 사용해보며 데이터가 복원되는 과정을 지켜보겠습니다. 1개를 사용하면 정보를 너무 많이 버려서 패턴을 학습할 수 없고, 4개를 사용하면 데이터를 모두 사용해 원본 데이터를 그대로 복원합니다. 2개 정도를 사용했을 때, 지영의 탑건에 대한 평점이 의도된 대로 복원되는 것을 확인할 수 있습니다. (코드는 아래 첨부하였습니다)

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b1d7c797-43a0-4c2f-acb0-05d8396a21cd){: .align-center}<br>

위의 시나리오는 가상의 시나리오이며 실제 추천 시스템에서 활용되는 SVD가 동작하는 방식과도 다소 다릅니다. 하지만 우리의 직관을 어느 정도는 채워줄 수 있기에 즐겨 사용하는 예시입니다. 눈치채신 분도 있겠지만 SVD는 PCA와 결이 같으며, AE(Auto Encoder)와도 통하는 바가 있습니다. 실제 최신 논문 중 상당 수는 AE를 이용하여 행렬을 분해합니다.

하지만 여기서도 문제는 존재합니다. 기존의 SVD 알고리즘은 너무나도 희소한 행렬을 고려하지 않았습니다. 앞에서 말한 것처럼 일반적으로 추천 모델이 다루는 상호작용 행렬은 밀도가 1%, 특히 규모가 큰서비스의 경우는 0.01% 미만인데, 이러한 환경에서는 SVD 알고리즘이 정상적으로 작동하기 어렵습니다. 이러한 문제를 해결하기 위해 다양한 알고리즘들이 제안되었는데, 그 중 현재까지도 널리 쓰이며 전반적으로 우수한 퍼포먼스를 내는 가장 유명한 알고리즘은 아마도 ALS일 것입니다.

일반적인 머신러닝 알고리즘의 관점으로 보면, feedback을 y로 두고 이가 존재하는 경우만 맞추는 지도 학습을 한 뒤, y가 존재하지 않을 때에 대해 성능을 보는 것과 같습니다. 하지만 이렇게 될 때, 유저와 아이템의 특성을 user-item matrix에서도 뽑아내어 활용하고 싶은데, 이때 MF를 사용하지 않으면 이에 관한 적절한 피쳐를 구성할 수 없다는 것이 문제입니다. 희소성을 고려한다면 더더욱 그렇습니다.

### SVD 코드

```python
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.DataFrame({
    "Minsu":{"Thor":4, "Top Gun":5, "Witch":4, "At Last":2},
    "Jiyoung":{"Thor":4, "Top Gun":0, "Witch":4, "At Last":1},
    "Hyesun":{"Thor":3, "Top Gun":2, "Witch":3, "At Last":4},
    "Jungho":{"Thor":2, "Top Gun":1, "Witch":2, "At Last":5}
}).T

matrix = data.values
u, s, vh = np.linalg.svd(matrix)

def recover_matrix(sv_count):
    smat = np.zeros(data.shape)
    smat[:sv_count, :sv_count] = np.diag(s[:sv_count])
    matrix_recovered = np.dot(u, np.dot(smat, vh)).round().astype(int)
    return matrix_recovered

plt.figure(figsize=(20,7))

plt.subplot(2,4,1)
sns.heatmap(data, cmap="YlGnBu")
plt.title("Raw")

data_max = data.max().max()
data_min = data.min().min()

for sv_count in range(1, 5):
    df_recovered = pd.DataFrame(recover_matrix(sv_count), index=data.index, columns=data.columns)

    plt.subplot(2, 4, sv_count+4)
    sns.heatmap(df_recovered, cmap="YlGnBu", vmin=data_min, vmax=data_max)
    plt.title(f"# Used Singular Vector: {sv_count}")
plt.show()
```
