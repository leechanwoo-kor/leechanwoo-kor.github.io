---
title: "[Recommendation System] 추천 모델 개발 (3) - 딥러닝 모델"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "추천 모델 개발 (3) - 딥러닝 모델"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc9f80c0-9407-4392-b8da-9872f1775560){: .align-center}<br>

이전 글에 이어 추천 모델은 DLRM, Tab-Transformer에 대해 추가로 알아보고 Attention, Transformer 등의 개념에 대해서도 알아보겠습니다. 이 글의 내용은 실제 production 환경에 적용할 수 있는 추천 모델을 기술하며 성공적으로 적용했던 사례를 기반으로 합니다.

<br>

## DLRM

[Fackbook의 추천 모델](https://arxiv.org/pdf/1906.00091.pdf)로 feautre간 모든 interaction을 모든 feature에 대해 pair로 계산합니다. dense feature와 sparse feautre를 나누고 sparse feature를 embedding하고, feed forward network를 거친 후 feature가 interact하는 단계를 거칩니다. 최종적으로 feed forward network를 거친 후 ouput을 냅니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ead9cc0e-429a-4b41-9479-4b3a15ea9261){: .align-center}<br>

Sparse feature는 상품 카테고리, 노출 카테고리와 같은 categorial feature를 맡고 dense feature는 숫자로 표현되는 feature를 말합니다. Sparse feautre를 embedding 하는 것은 다른 모든 모델에서 처리하는 것과 동일한 방식입니다.

Interaction layer에서는 embedding vector와 dense feature의 모든 pair를 dot product 연산합니다. 이 단계가 모든 feature의 유사도를 구하는 과정입니다. 이렇게 하려면 dense feautre의 차원을 embedding vector와 동일하게 맞추는 작업이 한번 필요합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f0dd1189-170d-462d-87bb-ae1e7d7bb845){: .align-center}<br>

모든 interaction과 dense feature를 연결 후, 최종적으로 마지막 network를 거친 후 sigmoid function을 통해 확률을 구합니다.

DLRM은 feature의 interaction이 존재하지만 item의 interaction은 존재하지 않기 때문에 VT와 같은 추천에서는 결과가 잘 나오지 않습니다. 상품마다 결과가 중복되는 경향도 강합니다. 이런 모델은 상품 페이지의 VT 추천보다는 Feed 랭킹과 같은 서비스에 좀 더 적합합니다.

<br>

## TabTransformer

Amazon에서 제안한 [TabTransformer](https://arxiv.org/pdf/2012.06678.pdf)란 언어 모델에서 유명한 Transformer를 CTR Prediction 분야에 적용한 시도입니다. Self-attention과 Transformer를 사용하여 DB 테이블에 들어있는 데이터를 모델에 적용하였습니다. Transformer는 언어모델이므로 입력은 tokenizing한 문장이라 추천 feature를 적용하기 어렵습니다. TabTransformer에서 categorial feautre, numeric feature를 처리하여 transformer에 적용할 수 있는 방식을 제안하였습니다. 먼저 Transformer에 대해 알아보겠습니다.

### Transformer

[Tranformer](https://arxiv.org/pdf/1706.03762.pdf)는 언어 모델로 BERT, GPT의 기본 모델입니다. 현존하는 대부분의 언어 모델은 Transformer를 기본 모델로 합니다. 최근의 모델도 규모만 커졌을 뿐 대부분은 Transformer 모델이 핵심입니다.

Transformer의 모델은 self-attention을 기반으로 하며 BERT와 같은 encoder는 Transformer의 왼쪽 부분을 모델로 GPT와 같은 decoder는 오른쪽 부분을 모델로 사용합니다. Transformer를 번역에 쓴다면 왼쪽 input에 한국어가 오른쪽의 shift output(영어 input)과 최종 output이 영어가 됩니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f77cb150-4290-4fb4-961e-ca7ca528033c){: .align-center}<br>

### Attention

핵심은 multi-head attention으로 self-attention을 기반으로 합니다. Attention이란 한마디로 문장의 모든 워드간의 관련도를 구하는 것입니다. 문장을 이해하려면 앞뒤 문맥을 잘 알아야 할 것입니다. 대명사가 무엇을 지칭하는지 잘 알아야 문장을 이해할 수 있습니다. 아래 그림에서 보듯이 attention layer는 모든 단어들이 서로 어떤 단어들과 연관이 있는 지를 계산합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cc7b79b0-36ef-4834-8c4c-23cca6589309){: .align-center}<br>
Attention은 각 단어의 embedding에 Wq, Wk, Wv 파라미터와 곱하여 Query, Key, Value 벡터를 얻습니다. 단어가 2개이고 embedding 차원이 100이라면 2 x 100 행렬이 됩니다. 3개의 W 파라미터 테이블을 학습 시키고자 하는 것이 목표입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b8678317-0740-4412-b17c-e2c2ea2dafcc){: .align-center}<br>

다음 그림의 연산으로 Q, K를 먼저 곱하고 softmax를 취한 후 V를 곱해주면 attention score를 구할 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c62719af-82ec-482d-9ea7-228aa8937c49){: .align-center}<br>

Q x K를 봅시다. 이것은 개념적으로 User-CF의 다음과 같은 연산과 비슷하다고 볼 수 있습니다. User의 항목들과 item의 항목들을 dot product하여 하나의 스코어를 구합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4c1b1fcb-f647-43b8-8a69-12a0d9ddb776){: .align-center}<br>

모든 단어에 대한 이와 같은 score를 구하면, 최종적으로 Item-CF에서 모든 item pair에 대해 score를 구하는 것처럼 마찬가지로 단어의 모든 경우의 수 테이블에 대한 관련도를 구하게 됩니다.

### TabTransformer 모델

Amazon의 [TabTransformer](https://arxiv.org/pdf/2012.06678.pdf)는 Self-attention 기반의 transformer를 CTR Prediction에 적용한 모델입니다. Categorial features(카테고리형)를 embedding하여 transformer의 input으로 입력하고 transformer의 출력으로 categorial feature의 embedding을 얻습니다. 그리고 continuous features(수치형)를 transformer의 결과와 concat하여 MLP 레이어 이후 최종 결과를 뽑습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9bbadef3-99d4-4715-9503-135665550b72){: .align-center}<br>

장점은 Categorial feature가 Transformer를 통해 학습하기 때문에 이러한 feature간의 관련도를 확실하게 학습할 수 있게 됩니다. 또한 Transformer를 활용한 좋은 아이디어를 제시했고, 이로부터 transformer를 활용한 여러가지 변형으로 바꿔볼 수 있습니다.

생각해볼만한 단점이 있는데요

- categorial feature만 Transformer를 통과하기 때문에 categorial features끼리만 관련도를 학습하게 됩니다. 하지만 실환경에서는 중요한 feature는 continuous feature에 있는 경우가 많습니다. categorial feature는 카테고리, 태그 등 중요하긴 하지만 대부분 static합니다.
- Transformer는 언어 모델에서 성공한 모델이지만 추천에 적용하기에는 용도가 좀 맞지 않습니다. 문장은 순서가 있고 앞뒤의 문맥이 중요한데 반해 feature는 앞뒤의 문맥보다는 상호 interaction과 cross가 중요합니다.
- feature간의 관련도만 보기 때문에 이 모델 그대로는 item과의 관련도가 잘 나오지 않습니다. 따라서 DLRL처럼 feed랭킹에 좀 적합해 보입니다.
- Transformer는 heavy하기 때문에 작은 리소스로 돌리기 쉽지 않습니다.

## Transformer를 추천에 적용하기

Transformer를 추천에 적용하려면 몇 가지 고려해볼만한 사항이 있습니다.

- Transformer는 문장의 단어가 vocabulary에 매핑되어 id로 변경되고 이를 입력으로 합니다. 그리고 모든 단어 쌍에 대해 관련도를 구하게 됩니다. 이걸 추천에 적용하려면 입력은 item의 id가 되어야 합니다. 그러면 item id의 관련도를 구하게 되므로 transformer의 원래 목적과 동일합니다. 예를 들어 유저의 한 세션 내의 item을 넣을 수 있습니다.
- 만약 item id를 입력하게 되면 다른 feature를 넣을 좋을 방법이 없습니다. 문장과 달리 상품은 구매, 클릭, 좋아요 등 많은 feature가 있습니다. 아무리 item 간의 관련도를 구해봐야 feature가 없으면 좋은 결과가 나오기 어렵습니다.
- Transformer를 적용하는 것은 추천에는 좀 과도합니다. 유저의 상품 클릭은 앞뒤 문맥이나 순서가 문장만큼 복잡하지 않습니다. 떄로는 그 순서가 바뀌어도 중요한 상품일 수 있으며, 베스트나 이벤트 상품으로 인해 우연히 발생하는 경우도 많습니다. “문법적으로 올바른 상품의 순서의 클릭이다” 이런 것은 없습니다.
- Feature의 관련도를 뽑으려면 continuous feature도 categorial feature와 함께 포암되어야 합니다. 이 부분이 다른 추천 모델에서 쉽게 해결하기 어려운 부분입니다.

<br>

## Two-Tower Transformer

앞선 TabTransformer의 아이디어를 약간 변형하여, 전체 모델을 Two-Tower로 구성하여 item간 관련도를 예측하고 타워의 하위를 Transformer로 구성합니다. 하지만 input에서는 continuous와 categorial feature를 전부 Transformer의 input으로 넣도록 변형합니다. 이러면 Transformer에서는 feature의 관련도를 Two-Tower에서는 item의 관련도를 학습하게 됩니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/96a04a2a-8892-42f4-8822-40ec25cd39b9){: .align-center}<br>

Continuou feature를 feed forward network를 통과한 후 transformer에 입력하였으므로 categorial feature와 continuous feature가 동등하게 처리됩니다. 이는 DLRM에서 처리한 방식과 유사합니다.

이러한 모델도 production환경에서 좋은 결과를 보였습니다. 다만 Transformer는 작은 리소스로 학습하기에는 어려운 모델로, 비용 측면에서 Transformer의 크기를 키우기가 쉽지 않고 시간과 리소스 측면에서 무겁다는 단점이 있습니다.

<br>

## Two-Tower + Cross Features + Feature Interaction

Transformer를 적용하는 방식은 feature crossing은 하지 않는데, 상품의 속성들은 카테고리, 도시, 태그 등 이므로 문장의 단어와는 다르게 crossing이 중요합니다. 서로 교차하는 feature를 또 다른 feature로 추가하면 좋은 결과를 낼 수 있습니다. 이는 Cross & Deep에 적용된 방식이기도 합니다.

Cross & Deep에서 수행하는 Feature간 Crossing과 DLRM의 Dot interaction은 처리 방식이 약간 다릅니다. 각 구현은 tensorflow에 구현되어 있어, [DotInteraction layer](https://www.tensorflow.org/recommenders/api_docs/python/tfrs/layers/feature_interaction/DotInteraction)와 [Dcn Cross layer](https://www.tensorflow.org/recommenders/api_docs/python/tfrs/layers/dcn/Cross)를 사용할 수 있습니다.

- Crossing: 기존 layer와 현재 layer의 elementwise multiplication을 수행합니다. 따라서 출력은 input과 동일한 dimension을 갖습니다. 즉, Feature간 값을 곱하는 컨셉입니다.
- Dot interaction: 입력을 모두 동일한 dimension으로 맞추고 모든 feature에 대해 dot product로 관련도를 구합니다. 결과는 (feature의 수 * feautre의 수) dimension을 갖는 관련도 테이블이 됩니다. 즉, 모든 Feature간 관련도를 구하는 컨셉입니다. (Attention과 비슷합니다)

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1813a7fa-2653-4ea6-a868-36d842b19793){: .align-center}<br>

이 모델은 categorial feature와 continuous feature를 같은 크기로 맞추고 Cross network으로 feature간 cross를 수행하고 DotInteraction으로 모든 feature의 관련도를 구하여 최종 embedding을 구합니다. VT 추천을 위해서 item-item tower로 구성합니다.

이렇게 Two-tower에 몇가지 다른 모델의 아이디어를 적용시킨 모델로 production 환경에 VT 추천을 적용하여 좋은 성과를 보였습니다. A/B 테스트로 CTR의 성과를 트레이스 했을 때 약 10 ~ 15% 정도의 향상을 보였습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/19c26fab-f2f6-4f31-bce8-7dab2a0be914){: .align-center}<br>

이 글에서는 이전 글에 기술했던 Wide & Deep, Deep & Cross, Two-Tower 모델에 이어 DLRM, Attention, Transformer, TabTransformer에 대해 기술하였고, 이를 Two-tower TabTransformer로 약간 변형한 모델과 Two-Tower에 Cross Network, Dot interaction을 추가하여 변형한 모델에 대해 기술하였습니다.
