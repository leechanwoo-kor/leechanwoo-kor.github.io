---
title: "[Recommendation System] 추천 모델 개발 (1) - 모델 데이터"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "추천 모델 개발 (1) - 모델 데이터"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc9f80c0-9407-4392-b8da-9872f1775560){: .align-center}<br>

# 모델 데이터

좋은 추천을 개발하기 위해서는 데이터, 모델, 서빙까지 아키텍처의 구성요소가 전부 고려되어야 합니다. 단순히 모델만 고려해서는 좋은 퀄리티를 만들기가 어렵습니다. 로그를 어떻게 쌓을 것이며 쌓은 로그를 어떻게 레이블 데이터로 만들고 여기서 어떻게 모델에 인풋으로 전환하고, 이 데이터를 모델에서 어떻게 잘 처리하고 모델의 아웃풋을 어떻게 할 것인지, 모델의 아웃풋을 어떤 방식으로 서빙할 것인지, 이 모든게 아키텍처 상 전부 고려가 필요합니다. 특히 데이터가 잘 처리되면 추천 모델의 퀄리티는 더욱 빛을 발합니다. 이 글에서는 먼저 데이터에 대해서 기술합니다.

## Introduction

### VT(Viewed Together)

커머스에서 가장 필요한 기본적인 추천으로 상품 페이지에서 사용자에게 “함께 본 상품” 혹은 “비슷한 상품”과 같은 형태로 노출됩니다.

상품 페이지의 맥락(context)에서 사용자는 현재 보고 있는 상품을 알아보려고 클릭하였습니다. 이때는 현재 상품과 관련된 상품들이 추천되는 것이 핵심입니다. 이런 상품들이 추천될 수 있습니다. 각각은 여러개 위젯의 형태로 노출될 수 있습니다.

- 현재 보고 있는 상품 대신 살 수 있는 상품들
- 내가 찾았던 상품은 아니지만 현재 보고 있는 상품과 함께 구매할 수 있는 상품들
- 사용자가 최근에 확인했던 상품과 관련된 상품들

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bf0bc838-b8a1-42f2-9f09-393766121ce8){: .align-center}<br>

소셜이나 유튜브와 달리 쇼핑, 여행등 물건을 판매하는 사이트에서는 사용자가 구매전에 가격과 옵션등을 비교하려는 의지가 매우 강한데, 이러한 사용자의 요구를 만족시키는 추천이 VT와 같은 추천입니다. 사용자는 아직 구매가 발생하기 전이므로 여러 대안들을 비교하고 있는 상태이며, 이런 사용자들의 관심을 파악하여 좋은 대안들을 추천해 줍니다.

- 그 결과로 상품 페이지에서 VT의 CTR이 매우 높음
- 어떤 사이트에서는 상품 페이지에서 비교할 수 있는 상품을 선정해 상세 옵션을 포함해 보여주는 경우가 있다. 이것도 VT로 응용가능
- 홈페이지에서 최근 본 상품과 VT를 함께 보여주는 개인화 추천의 경우 CTR이 매우 높음

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/673c8c1a-62ec-4201-a102-165c66a258e2){: .align-center}<br>

VT가 상품 페이지에서 “베스트”가 아닌 현재 상품의 “관련도 베스트” 상품을 보여주기 때문에 모든 상품 페이지에서 추천 상품이 전부 다릅니다. 이 점에서 VT는 노출 Coverage rate의 향상에 크게 기여합니다.

<br>

## 레이블 데이터(Labeled Data)

추천 모델을 학습하려면 레이블 데이터가 필요합니다. 아주 많은 양의 데이터가 필요합니다. 이러한 데이터를 수작업으로 만들어야 될까요? 이 데이터를 어떻게 만들고 모델에 어떻게 적용하는지는 아주 중요한 이유입니다. 어떻게 로그로부터 이러한 데이터를 만드는지 알아보겠습니다.

### Implicit Feedback

Implicit feedback이란 클릭, 구매, impression과 같이 사용자가 사이트에서 행한 액션을 말합니다. 사용자의 어떤 상품에 대한 선호도는 사용자의 액션에 포함되어 있습니다. 사용자의 액션은 로그로 저장되며 로그 데이터를 레이블 데이터로 사용할 수 있습니다.

한편 Explicit feedback이란 사용자가 명시적으로 선호도를 표시하는 리뷰나 별점과 같은 것을 말합니다. 이런 정보 또한 하나의 feature로 사용할 수 있습니다. 하지만 모든 유저가 이런 정보를 남기지 않아 매우 희소합니다. 또한 사용자는 이런 정보를 대충 적는 일도 많기 때문에 정확도가 떨어질 수 있습니다.

추천에서는 Implicit feedback을 가공하여 레이블 데이터로 사용합니다. 어떻게 이렇게 사용하지는지 좀 더 알아보겠습니다.

### Impression 로그와 Pageview 로그

웹이나 앱에서 사용자의 클릭, 구매 등 여러 액션이 발생할 때 필요한 로그를 남기게 됩니다. Impression 로그는 어떤 상품을 봤을 때 남는 로그를 말합니다. Page가 열리는 시점에 일반적으로 Pageview 로그가 남습니다. 정확히 상품이 보이는 시점에 impression 로그가 남도록 하는 것이 중요합니다.

유저가 페이지에 진입했을 때 pageview 로그가 남습니다. 그런데 아직 상품은 보이지 않는 상태이고 스크롤해서 내려야 상품이 보입니다. 이때 pageview로그만 남으면 실제 사용자가 상품을 봤지만 클릭을 안했는지, 상품을 아예 보지 않았는지 알 수가 없습니다. 상품을 봤지만 클릭을 안했다면 추천 품질이 나쁘다고 할 수 있지만, 아예 보지도 않았으면 노출된 추천 상품의 품질이 나쁘다고 할 수 없습니다. 이러면 정확도가 떨어집니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/84181076-0c0b-46e1-ad2c-f88e51c98333){: .align-center}<br>

사용자가 상품을 보는 시점에 정확하게 각 상품에 대한 impression 로그가 남으면 사용자에게 실제로 본 것과 안 본것을 구분할 수 있기 때문에 더욱 정교한 추천을 만들 수 있습니다.

impression 로그를 제대로 남기기 위해서는 앱, 웹 클라이언트쪽에 개발이 필요합니다. 상품 뿐 아니라 배너, 메뉴 등 모든 구성요소에 impression 로그를 넣는 것이 좋습니다. 로그의 양이 많아지기 때문에 이를 처리하기 위한 견고한 로그 수집 플랫폼이 구축되어야 합닏나.

<br>

## 레이블 데이터 생성

이 글에서 서비스에서 남기는 모든 로그를 유저 액션 로그라고 지칭합니다. 서비스의 모든 로그를 각 유저의 관점에서 다룹니다. 유저 액션 로그로부터 4가지 단계를 통해 레이블 데이터를 만듭니다. 모델이 좋은 결과를 만들 수 있게 레이블 데이터를 준비합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/49a45401-6a2b-4c97-9242-1a47199f8af4){: .align-center}<br>

### User Action Feature

유저 액션 feature 단계는 유저 액션 기본 데이터를 만들고 여기서 필요한 정보를 잘 뽑아내는 단계를 말합니다. 사용자 단위로 각 사용자의 액션을 시간순으로 정렬한 데이터를 만듭니다. 이러면 각 사용자 별로 어떤 액션을 취했는지 알 수 있습니다.

유저 액션의 종류는 다음과 같습니다.

- impression: 상품 노출
- click: 상품 클릭
- like: 좋아요 클릭
- purchase: 상품 구매

#### Session

사용자의 액션은 session 단위로 나눌 수 있습니다. session이란 사용자의 액션들 중 의미있는 액션들의 그룹입니다. 서비스 사용 중 특정 시간 동안 응답이 없는 경우를 기준으로 나눈 사용자의 액션을 말합니다. 어느 시점에 사용자의 액션이 없다면 “사용자가 여기까지 사용하고 그만 뒀구나”라고 판단하는 기준입니다. 그 다음 session은 같은 사용자의 다른 액션으로 본다는 것입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5947c126-978e-43ab-8379-40d7b7c4fcd1){: .align-center}<br>

session을 나누는 기준은 20분, 30분, 60분 등 서비스마다 다를 수 있습니다. 예를 들어 여행 서비스라면 여행지에서 돌아다니면서 사진도 찍으면 서비스에 접그하는 시간 간격이 길고 아침, 저녁 숙소에서만 접근할 수도 있습니다. 사용자가 서비스를 사용하는 패턴에 따라 session의 시간이 조정될 수 있습니다.

session은 클라이언트에서 로그를 남기는 시점에 임의로 발급한 키를 남기는 것이 일반적입니다. 다른 session이면 키를 교체하여 unique한 키가 session 단위로 남도록 해야 합니다.

#### Event Key

좋은 품질을 위해서는 로그에서 event key를 같이 남겨주면 좋습니다. Event key란 한 session안에서 어떤 액션을 취할 때 노출된 상품과 클릭을 하나로 묶어서 구분할 수 있도록 unique한 key를 남기는 것입니다.

추천 상품이 여러개 노출될 때 추천 서버에 api를 호출하여 결과를 받아옵니다. 이를 사용자가 클릭한다면, 이때 impression, click 로그가 남게 됩니다. 이 로그에 둘 다 같은 unique한 event key를 부여합니다. 그러면 어떤 상품이 노출됐을 때 클릭한 것과 클릭하지 않은 것을 정확히 알 수 있습니다.

사용자가 페이지를 refresh하면 또 다른 api 호출이 서버에 요청되고 서버는 추천 상품을 리턴해줍니다. 이때는 다른 event key가 남아 앞선 액션과 구분할 수 있어야 합니다. 이렇게 event key를 남기면 나중에 어떤 후보 상품 중에 하나를 클릭했는지 알 수 있으며 레이블 데이터로 만들기 위한 정확한 데이터가 됩니다. 추천 뿐 아니라 검색 등 상품 결과를 리턴하는 서비스에서 공통으로 활용할 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aa6f1c94-b4ae-4c2d-bfe7-b82fb727ac4a){: .align-center}<br>

Event key의 구현은 api 서버에서 event key를 발급하여 api 결과에 포함하여 리턴하면, 이를 클라이언에서 노출, 클릭 등의 한 api 결과와 관련한 액션에 event를 남기는 방식으로 구현할 수 있습니다.

### User Action Refining

Refining 단계에서는 유저 액션 로그를 학습 가능한 형태로 만듭니다. 유저 액션 데이터의 노이즈를 제거하고 정확한 데이터로 만드는 과정입니다. 일반적으로 클라이언트로부터 수집한 로그 데이터에는 많은 이슈가 있습니다. 아직 로그 수집에 대한 플랫폼이 안정화가 되어 있지 않은 경우에는 장애의 우려도 있습니다.

- 장애로 수집이 제대로 안돼서 액션들이 비어 있는 경우
- 시간 순서가 제대로 되어 있지 않은 경우
- 새로운 로그가 추가되면서 포맷이 변경되는 경우
- Unique 해야할 키가 중복되는 경우
- 상품 id가 변경되는 경우
- 어뷰징 유저

이런 이슈들은 그대로 남겨두고 쓰기는 어렵고, 될 수 있으면 처리가 되어야 합니다. 없는 로그를 만들 수는 없지만 키가 중복되거나 상품 id가 변경되거나 로그의 포맷이 변경되는 경우는 맞게 수정되어야 합니다. 기능은 추가되고 로그는 계속 늘어나므로 이때마다 이런 이슈를 찾아서 해결하는 것은 쉽지 않은 일이며 많은 노력과 시간이 필요합니다. 이런 이유로 추천 개발 쪽에서는 클라이언트의 로그를 이해하고 문제 해결에 참여할 필요가 있습니다.

Refining 단계에서는 이러한 노이즈를 제거하고 action pair를 만들 수 있도록 다음과 같은 단계로 진행합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1b7c6073-a941-4768-9a67-3dcb07745432){: .align-center}<br>

- 노이즈 제거: 전반적 로그의 노이즈를 제거합니다. 위에 언급된 이슈들을 처리합니다.
- 유저 액션 클러스터링: 유저 기준으로 액션을 묶고 각 유저 액션에서 발생하는 로그 순서 혹은 액션이 누락되어서 발생하는 비정상적인 액션을 처리합니다.
- Deduplication: 유저 액션에서 발생하는 중복을 처리합니다. 같은 상품을 여러번 보는 경우, 구매한 상품을 다시 보는 경우, 중복 구매를 하는 경우 등 여러 이슈들을 처리합니다.
- Action Pair: 다음에 설명할 레이블 데이터의 후보를 만듭니다.

### Action Pair 레이블 데이터

Action Pair란 사용자의 액션을 2개씩 묶어 레이블을 만드는 것을 말합니다. 2개의 window를 기반으로 액션을 묶습니다. 만약 session이 종료되면 다음 액션에 대한 window가 시작됩니다.

다음 그림을 보면 User A의 액션이 t1, t2 시간 순으로 있습니다. 이때 t3, t4 사이는 하나의 session이 아닙니다. 이 사용자는 2개의 나뉘어진 session을 갖고 있고 각가 action pair를 뽑습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4c1dc78f-b1f8-4a30-b81c-961e9f50a5fb){: .align-center}<br>

상품을 본 후(imp) 클릭을 했다면(click), 이를 action pair로 뽑을 수 있습니다. 레이블은 노출된 상품 중에 어떤 상품을 클릭했는지 여부를 레이블로 합니다. 이 예에서는 데이터는 imp, click이 되고 레이블은 1이 됩니다. session이 깨진 액션은 pair로 묶이지 못합니다.

단순히 액션만을 묶는 것은 아닙니다. 사용자가 상품을 보고 클릭하고 구매했을 때는 그 시간 간격, 상품의 속성, 현재 사용자의 context(이전에 무엇을 봤는지, 무엇을 구매했는지), 현재 페이지의 context 등 여러가지 feature들이 있습니다. Pair 사이에 서로 관련되어 있는 feature들을 매우 중요하게 처리합니다. 최종적으로는 이런 action pair와 action pair의 feature가 이 단계에서 추출됩니다.

구매 액션은 클릭에 비해 더욱 중요하므로 레이블은 multi-class가 될 수도 있습니다. 이어서 이에 대한 내용을 기술합니다.

### 가중치 부여

사용자 액션은 여러 가지 종류가 있으며 커머스에서는 구매가 가장 중요합니다. 단순히 클릭보다는 훨씬 더 가치가 있습니다. 이러한 액션의 퀄리티를 어떻게 반영할까요? 몇가지 방법이 있습니다.

- multi-class 분류
- class-weight
- sample-weight

Multi-class 분류는 액션의 중요도 별로 레이블을 멀티 클래스로 구성하는 것입니다. “클릭” < “좋아요” < “리뷰” < “구매” 순으로 중요하기 때문에 순서대로 0, 1, 2, 3으로 구성합니다. 장점은 심플하게 레이블을 구성할 수 있다는 점이고, 단점은 나중에 모델로부터 inference하여 결과를 뽑을 때 클래스를 선택하기가 쉽지 않다는 점입니다. 보통은 구매로 갈수록 로그의 양이 10배 이상 적기 때문에 오히려 클래스의 품질이 떨어질 수도 있습니다.

Class-weight는 로그의 불균형 문제로 class에 가중치를 주어 해결하는 방식입니다. 구매 액션의 경우 매우 중요한데 비해 로그의 수가 작기 때문에 이점 때문에 학습이 잘 안되는 문제를 해결하기 위해 class에 weight를 주는 방법입니다. 다음은 Tensorflow에 전달되는 class_weight의 예입니다. 학습시 인자로 전달되어야 합니다.

```python
#샘플: class_weight는 json 형태로 표현합니다.
weight_for_0 = (1 / neg) * (total / 2.0)
weight_for_1 = (1 / pos) * (total / 2.0)

class_weight = {0: weight_for_0, 1: weight_for_1}
```

[sample-weight](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf/keras/Model#fit)은 로그의 불균형 문제를 해결하기 위해 input data에 weight을 주는 방식입니다. 사용자 액션의 시간의 흐름에 대한 가치 변화에 대한 가중치도 줄 수 있습니다. 데이터에서 한 클래스 안에서도 여러 가중치를 줄 수 있다는 장점이 있어 class-weight보다 데이터에 포커스를 맞추어 범용적으로 사용할 수 있습니다. Tensorflow fit 함수에 sample weight을 인자로 넘길 수 있습니다. 혹은 데이터를 전처리시 map()에서 지정할 수도 있습니다.

```python
# fit 샘플: class_weight과 sample_weight이 인자로 들어갑니다.
fit(
    x=None, y=None, batch_size=None, epochs=1, verbose=1, callbacks=None,
    validation_split=0.0, validation_data=None, shuffle=True, class_weight=None,
    sample_weight=None, initial_epoch=0, steps_per_epoch=None,
    validation_steps=None, validation_freq=1, max_queue_size=10, workers=1,
    use_multiprocessing=False, **kwargs
)
```

sample-weight는 범용적으로 한 클래스 내에서도 데이터에 대한 가중치를 줄 수 있습니다. 추천 모델에 사용하는 데이터는 보통 sample-weight으로 처리합니다.

<br>

## Features

feature 기준으로 정리해보면 다음과 같이 나눌 수 있습니다. 각 features 그룹은 확장성있게 추가될 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/43f6c883-4478-4f72-bb1b-988bdf06a8aa){: .align-center}<br>

### User Features

User의 액션 정보를 말합니다. 개인화 추천을 위해 user 정보를 많이 넣을 수 있습니다. 하지만 모델에 user 정보가 들어가면 배치로 추천 결과를 뽑지 못하고 실시간으로 inference해야 하는 단점이 있습니다. 또한 VT는 개인화 추천이 아니므로 여기서는 한정적으로 사용됩니다.

### Product Features

상품의 기본 feature를 말합니다. 대부분 커머스에서 상품의 속성은 핵심 데이터이므로 추가될 수 있는 많은 feature들이 있습니다. 노이즈가 너무 많은 데이터는 사용하기가 쉽지 않으므로 제거하는 것이 나을 수 있습니다.

### Pair Features

Product-product pair에 대한 context feature를 말합니다. Pair featrue는 VT에서 결과의 퀄리티 차이를 만들어내는 중요한 요소로, 미리 추출하고 계산해서 normalize한 결과를 사용합니다. 이러한 정보를 raw한 값으로 모델에 제공해서는 유의미한 결과를 뽑기가 쉽지가 않습니다. 또한 모델의 크기와 연산이 커질 수 있어 리소스, 비용에 영향을 미칠 수 있습니다. 가격 대비 성능을 생각하면 유용하다고 확인된 score를 직접 반영하는 것이 좋습니다.

### Product Statistics Features

특정 타임 구간에서 product의 통계 feature를 말합니다. 윈도를 두는 이유는 액션이 발생한 시점의 상품 통계가 시점마다 다르기 때문입니다. 단순히 상품의 현재까지의 통계가 아니라 클릭, 구매가 발생한 시점의 통계가 필요합니다. 같은 상품이어도 봄, 여름, 등 시즌 혹은 할인 시즌에 따라서 feature가 달라질 수 있습니다.

---

이 글에서는 모델에 필요한 데이터를 어떻게 잘 만들것인지에 대해 알아봤습니다. impression 로그가 준비되어야 하고, 레이블 데이터를 만들기 위해 유저 액션 feature 만들기, refining하기, action pair 레이블 생성, 가중치 부여에 대한 내용을 기술하였습니다.

좋은 추천 퀄리티를 위해서는 높은 퀄리티의 레이블 데이터를 만드는 것이 필수입니다. 추천 개발은 로깅, 데이터, 모델, 서빙 까지 전부 엮여 있으며 함께 고려해야 합니다.
