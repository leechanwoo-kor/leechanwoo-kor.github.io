---
title: "[Recommendation System] 추천 모델 개발 (2) - 딥러닝 모델"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "추천 모델 개발 (2) - 딥러닝 모델"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc9f80c0-9407-4392-b8da-9872f1775560){: .align-center}<br>

추천 모델은 추천 결과를 뽑아내는게 핵심이라고 할 수 있습니다. 추천 모델에 들어가는 데이터는 매우 잘 정제되고 양 또한 많아야 합니다. 이렇게 좋은 데이터가 준비되었다면 이 데이터로부터 좋은 추천 결과를 만들어내야 합니다.

데이터들을 어떤 식으로 모델의 인풋으로 만들고, 모델은 어떤 식으로 결과를 뽑아 최종적으로 추천 결과를 만들 수 있는 걸까요? 이글은 추천 모델로 사용될 수 있는 좋은 모델들을 살펴보고 모델이 좋은 결과를 얻기 위한 방법들이 어떤 것이 있는지 기술합니다.

이 글의 내용은 실제 production 환경에 적용할 수 있는 추천 모델을 기술하며 성공적으로 적용했던 사례를 기반으로 합니다.

## CTR Prediction

추천에서는 CTR(Click-Through Rate) Prediction 모델을 씁니다. CTR Prediction은 사용자가 특정 상품을 클릭할 확률일 얼마나 되는지 예측하는 모델을 말합니다. CTR Prediction은 온라인 광고, 추천 등에서 널리 사용되며, 광고 아이템, 배너, 커머스의 상품 등의 아이템의 CTR을 예측하는데 사용합니다. 또한 Youtube나 인스타그램과 같은 feed 랭킹에도 적용할 수 있습니다.

CTR Prediction 모델 중에는 Language model에서 매우 좋은 성과를 내고 있는 Transformer와 같은 모델을 CTR Prediction 분야에 적용하려는 시도도 많습니다. Transformer가 적용된 일부 모델에 대해서도 Transformer란 어떤 것이며 어떤 점을 고려해야 되는지 알아보겠습니다.

## 모델

Item-CF를 비롯한 초창기 모델을 추천 시스템 아키텍처에서 기술한 바 있습니다. 딥러닝 모델들은 정교해지고 확장성이 매우 좋아졌으며 feature가 매우 다양해 졌지만, 개념적인 면에서는 이전의 모델과 크게 다른 것은 아닙니다. 핵심 개념은 Product와 Product 사이의 관련도를 feature로 뽑아 가장 관련된 Product 순으로 보여주는 것이다.

### 추천 모델 overview

추천 모델로 시도해 볼 수 있는 여러 모델들이 있습니다. 이러한 모델들은 논문을 통해 제시되며 기존 것을 조금씩 보완해서 꾸준히 발전합니다. 각 모델들을 실제로 구현해보고 조금씩 변형하거나 장점을 합쳐 production에 잘 작동하는 모델을 만들 필요가 있습니다.

| model name | 추천 모델 |
| --- | --- |
| Wide & Deep | Google Wide Deep 모델 |
| Deep & Cross | Google Deep Cross 모델 |
| Deep & Cross V2 | Google Deep Cross V2 개선 모델 |
| Two-Tower | VT를 위한 Two-Tower 모델 |
| DLRM | Facebook DLRM 모델 |
| TabTransformer | Amazon TabTransformer 모델, Transformer 모델의 CTR prediction 변형 |
| Two-Tower Transformer | Two-Tower와 Transformer 모델 결합 |
| Two-Tower + Cross Features + Feature Interaction | Two-Tower, Cross Feature, Feature Interaction 결합 |

이러한 모델들을 하나씩 확인해보고 사용시 이슈들이 있는지 확인해봅시다.

### [Wide & Deep 모델](https://arxiv.org/pdf/1606.07792.pdf)

Wide & Deep은 Google에서 제시한 모델로 논문상으로는 검색에 사용되었습니다. VT와 같은 추천에도 적용해볼 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/55dc3acb-f260-42f5-907b-7d50ef17f8fb){: .align-center}<br>

Deep + Linear를 합친 모델로 여기서 Deep layer가 너무 범용적인 결과를 뽑는 대신 Wide layer는 로그상 있는 결과만 뽑게 됩니다. 이 2개의 조합으로 Wide & Deep을 구성하여, 정확한 결과 + 범용적인 결과를 뽑을 수 있도록 조합한 것입니다.

Categorical feature(Sparse feature - 카테고리와 같은 속성들)를 deep network로 Continuous feature(Numeric feature - 숫자인 속성들)을 wide network로 처리합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/343773f6-f25e-478b-a228-3fffee7f6975){: .align-center}<br>

그림을 보면 Sparse feature는 embedding 하여 continuous feature와 합친 것을 볼 수 있습니다. 또 관련된 feature를 cross한 feature를 별도로 포함하였습니다.

이 모델은 검색에 사용된 ctr prediction 모델로 보이며, VT 추천의 결과로 쓰기에는 너무 같은 상품이 반복되는 단점이 있습니다. 상품마다 다양한 상품이 추천되는 것이 VT 추천에서 중요한데, 이 모델은 왠만한 상품의 추천 결과가 중복되어 나타납니다. 즉 여러 개 상품의 베스트가 나가는 형태로 결과가 나와 적합하지 않은 측면이 있습니다.

이 모델보다는 Deep & Cross 모델이 좀 더 좋은 결과를 보입니다.

### [Deep & Cross](https://arxiv.org/abs/1708.05123)

Deep & Cross 모델은 구글에서 Wide & Deep 다음에 논문을 통해 제시된 모델입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a0f6ca89-5181-40c1-8a91-c799c19188b1){: .align-center}<br>

Sparse Feature를 embedding하고 이를 dense feature와 함께 cross, deep network 양쪽에 input으로 넣습니다. Cross network에서 feature 간 cross가 발생합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/27e157de-89fa-4524-b2cc-717f6ae84b5f){: .align-center}<br>

모든 Feature간의 cross가 발생하도록 모델이 구성되어 있습니다. Wide & Deep에서 수동으로 cross를 발생시키는 것에 비해 sparse, dense 모든 feature간 cross가 모델에 포함되어 있다는 점에 차이가 있습니다.

이 모델은 Wide & Deep 보다 좋은 결과를 냅니다. 전반적으로 production 환경에서 좋은 결과를 냅니다. 하지만 Cross network의 depth가 조금만 깊어져도 혹은 embedding의 차원이 커지면 메모리가 많이 필요합니다. 상대적으로 좋은 리소스의 서버가 필요합니다.

### [Deep & Cross V2](https://arxiv.org/abs/2008.13535)

Deep & Cross V2는 기존 Deep & Cross의 쌓는 방식으로 여러가지 변형을 둔 것으로 한 모델을 개선하기 위한 시도가 어떤 것인지 보여줍니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f22db073-028f-4335-aaf0-dfd58f3766d4){: .align-center}<br>

이 모델에서는 input인 embedding layer는 동일하게 두고 그 위를 stacked 형식으로 쌓거나 parallel로 쌓는 등의 변형을 제시합니다.

Deep & Cross V2 Stacked 모델은 cross network 이후 deep network을 둔 것으로 매우 효과적입니다. 구현한 모델 중에 이 stacked 모델이 production 레벨에서 매우 좋은 결과를 보였습니다. 다만 현실적으로 많은 stck을 쌓기에는 리소스의 이슈로 쉽지 않습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/802cfc30-3144-489f-b74e-365c32c43cc2){: .align-center}<br>

모든 feature를 cross하는 방식으로 cross layer가 작동합니다. 이런 cross network을 몇 단계로 쌓을 수 있습니다.

### [Two-Tower](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/b9f4e78a8830fe5afcf2f0452862fb3c0d6584ea.pdf)

Two-Tower 모델은 양쪽에 타워를 쌓아 embedding의 similarity를 구하는 모델입니다. Two-tower 모델 아키텍처를 본인의 모델에 확장, 변형하여 굉장히 범용적으로 적용할 수 있습니다. 각각의 tower는 위에 언급된 deep & cross와 같은 모델이 될 수도 있고, transformaer가 적용될 수도 있습니다. 추천 뿐 아니라 검색 쿼리에 대해서도 적용할 수 있습니다. 이 모델을 추천 모델로 구현하길 추천드립니다.

Two-tower 모델의 일반적인 모습을 봅시다. 양쪽의 tower가 하나로 만나는 모양을 하고 있습니다. 그림에서는 왼쪽에 user feautre 오른쪽에 item feature가 표현되어 있습니다. 여기서는 user와 item간의 관련도를 뽑는 모델을 보여주고있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/085fe2ed-d7a3-4b04-a021-d418ca9a01d4){: .align-center}<br>

왼쪽은 Context feature이며, 오른쪽은 Item feature입니다. Context란 현재의 환경을 말하며 오른쪽은 그 대상으로 이해할 수 있습니다. 따라서 왼쪽과 오른쪽 모두 관련도를 뽑기 위한 어떤 것도 될 수 있습니다. User, Item이 아니라 Item, Item, 혹은 Query, Item등 어떤 것도 될 수 있으며 Context feature는 여러 가지를 합한 Query-User-Item의 조합이 될 수 있습니다.

왼쪽과 오른쪽 Tower의 결과물은 각 feautre의 embedding입니다. 2개의 embedding은 최종적으로 dot 연산하여 similarity를 구합니다.(cosine-similarity). 각 tower는 encoder의 역할을 하고 있습니다. 최종적으로는 두 embedding의 0~1사이의 관련된 확률을 구할 수 있습니다.

예를 들어, “[Mixed Negative Sampling for Learning Two-tower Neural Networks in Recommendations](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/b9f4e78a8830fe5afcf2f0452862fb3c0d6584ea.pdf)” 논문에서는 다음과 같이 Query-Item 타워를 사용했고 dot product 연산으로 관련도를 구하였습니다. 왼쪽 타워에는 환경을 나타내는 user, context, seed app feature를 입력하고 오른쪽은 candidate app feautre를 입력하였습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8d66c701-e438-4c35-83f2-d6d15bb4c0e7){: .align-center}<br>

또 한가지 예로, [ATTN](https://personal.ntu.edu.sg/c.long/paper/21-ICDE-arrivalPrediction.pdf) 논문에서 다음과 같은 구조로 제시되기도 했습니다. User와 Item을 각각 타워에 Item쪽을 profile, statistics를 묶어 feature로 사용하였습니다. 이는 일반적인 similarity를 구하는 two-tower 모델입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7c032ff4-d059-40e2-82ca-68c75ca2db81){: .align-center}<br>

Language 모델에서의 예로, Sentence-BERT에서는 양쪽 tower에 BERT를 두고 문장사이의 관련도를 구하는 방식으로 two-tower모델을 활용하였습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e47657b2-896c-46c0-a2a7-c9aaf661971f){: .align-center}<br>

양쪽 tower를 max pooling하여 최종 vector를 구하고 이로부터 similarity를 구하는 방식으로, BERT 파인 튜닝 없이 문장에 대한 관련도를 구할 수 있습니다. BERT에 두 문장을 넣어 관련도를 뽑는 것보다 Sentence BERT가 더 좋은 결과를 얻었습니다.

<br>

## VT를 위한 Two-tower 모델

VT 추천을 위해서는 다음과 같이 Item의 context feature와 item feature의 Two-tower 모델을 제안합니다. 개인화 추천이 아니므로 item-item으로 two-tower를 구성합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/543db910-0d1b-404f-ab98-93a472c6d85f){: .align-center}<br>

Item A에 대한 Context feature와 Item B의 feature를 embedding 하여 최종적으로 Item A와 B의 similarity를 학습할 수 있습니다. 두 item 사이의 pair feature를 입력으로 넣으면 다른 item 과의 관계와 차별화를 많이 둘 수 있습니다. Pair feature는 두 item에 동시에 발생하는 사용자 액션의 feature입니다. 이는 상품마다 다른 VT 추천이 나가는데 도움이 됩니다.

이 Two-tower 모델을 기본 모델로 몇 가지 변형을 줍니다. Hidden layer 부분을 deep cross v2 방식이나 tab-transformer로 교체하면 feature간 관련도를 학습할 수 있습니다. Hidden layer에서 feature간 관련도를 학습하고 최종적으로는 item간 관련도를 학습합니다. 이 모델을 기반으로 변형한 모델은 production 환경에서 A/B테스트 결과에서 매우 좋았습니다.

<br>

## Multiple output

Output을 하나가 아니라 2개로 하는 것이 추천 학습에 큰 도움이 됩니다. 하나의 결과는 클릭을 예측하거나 클래스(구매, 클릭 등)의 확률을 예측합니다. 이는 두 item의 유사도를 예측하는데 뛰어나지만 두 item에 대한 유저액션의 전체적인 통계를 잘 반영하지 못합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3a2f60fd-f946-4aae-8b37-d752ac92e3af){: .align-center}<br>

그래서 [GloVe](https://nlp.stanford.edu/pubs/glove.pdf)에서 제안된 방식으로 전체적인 통계정보를 모델을 output으로 반영해주면 더 좋은 퀄리티의 추천 결과를 얻을 수 있습니다. GloVe는 언어모델이므로 추천에 맞게 약간 변형을 해 줄 필요가 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bb0a2fb6-68cd-44af-9369-7cb7b9ddf3bc){: .align-center}<br>

GloVe에서는 윈도우 안에 있는 단어와 단어가 동시에 출현하는 확률을 계산합니다. 추천에서는 윈도우는 세션으로, 단어를 item으로, 동시에 출현한다는 것은 유저의 액션(클릭 혹은 구매)으로 바꿀 수 있습니다.

Output을 2개를 셋팅함으로써 item과의 관련도와 전체 통계 양쪽을 학습 시킬 수 있습니다. 내부 embedding에서부터 전반적인 향상을 기대할 수 있으며 최종 예측도 향상된 결과를 얻을 수 있습니다.

Mulitple-output은 Two-tower 뿐 아니라 Wide & Deep, Deep & Cross 등의 다른 모델에 동일하게 적용될 수 있습니다.

---

이 글에서는 어떤 추천 모델이 있는지 전체적으로 Overview 해보고 그 중에서 Wide & Deep, Deep & Cross, Two-Tower 모델에 대해서 알아봤습니다. Two-Tower 모델은 각 Tower에 여러가지 모델을 끼워 넣거나 context feature를 다양하게 제공하여 추천에 있어 확장성 다양하게 활용할 수 있습니다.
