---
title: "[Recommendation System] 그래프 기반 추천 시스템"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "그래프 기반 추천 시스템"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/62e271a0-abad-4050-8883-89e3989c87c6){: .align-center}<br>

기존 추천 시스템에 관한 연구는 전통적인 협업 필터링(CF) 및 행렬 분해(MF) 기반 연구에서 NCF와 같은 딥러닝 기반 모델로 발전되어 왔다. 최근 연구 동향은 그래프 뉴럴 네트워크(Graph Neural Network, GNN) 기법을 활용하여 사용자의 선호도를 그래프 구조로 파악하는 것이 주류이다. 따라서 본 포스트에서는 추천 시스템 연구의 전체적인 동향을 살펴보고, 최종적으로 GNN 기반 추천 시스템을 전반적으로 소개하고자 한다.

<br>

# 1. 전통적 추천 시스템

## 1.1 협업 필터링

학술적으로 **Collaborative Filtering (CF)**는 Goldberg et al.(1992)에 최초로 제안된 추천 알고리즘으로, 특정 제품이나 서비스에 대하여 선호도가 유사한 사용자들은 다른 아이템에 대해서도 유사한 선호도를 보일 것이라는 가정을 기반으로 사용자 선호도를 예측한다. 

CF는 **memory-based CF**와 **model-based CF**로 구분할 수 있으며, Memory-based CF는 사용자 유사도를 기반으로 이웃을 생성하는, **사용자 기반 CF(User-based CF, UBCF)**와 아이템 유사도를 기반으로 이웃을 생성하는 **아이템 기반 CF(Item-based CF, IBCF)**로 구분된다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6e28d591-b036-499a-b0b6-44d3df2170cb){: .align-center}<br>

## 1.2 Matrix Factoriazation

행렬 분해는 사용자와 아이템에 대한 평점으로 구성된 하나의 행렬을 분해하는 방식이다. 이를 활용한 대표적인 알고리즘으로 **특이값 분해(Singular Value Decomposition, SVD)**가 있다.

SVD는 고차원 행렬을 저차원 행렬로 축소하고, 축소한 저차원 행렬을 원래의 행렬로 복원하는 과정을 통해 초기 행렬을 복원한다. 이러한 과정을 통해 추천 대상 사용자가 평점을 부여하지 않은 제품 및 서비스에 대한 평점을 예측할 수 있다.

> 대표적인 논문으로는 넷플릭스에서 발표한 논문이 있다.<br>Koren, Y., Bell, R., & Volinsky, C. (2009).Matrix factorization techniques for recommender systems. Computer, 42(8), 30-37.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/56dd6a51-8297-4870-847f-a112c22fa3bc){: .align-center}<br>

<br>

# 2. 딥러닝 기반 추천 시스템

최근 딥러닝 기술의 발전으로 사용자 리뷰 텍스트, 이미지 등 다양한 정보를 모델에 적용하기 위한 모델들이 활발히 연구되고 있다.

**NeuMF 모델**은 유저와 아이템의 원-핫 벡터(one-hot vector)를 밀집 행렬로 임베딩하여 뉴럴 네트워크 연산을 통해 구매 여부를 예측한다. 이러한 과정을 통해 유저와 아이템의 암묵적인 상호작용을 정교하게 예측하고 있다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/97179f5a-8a6b-4553-baef-76f064044ce1){: .align-center}<br>

이외에도 **AutoRec**은 이미지 분야에서 제안되었던 Auto-Encoder 구조를 사용하여 유저가 아이템에 부여한 평점을 예측한다. BERT를 적용한 **BERT4Rec**은 유저의 구매 순서 데이터를 입력으로 평점을 예측하는 모델도 제안되었다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8f3368d8-8458-4d0b-b9a8-3a1339443391){: .align-center}<br>

한편 유저-아이템 간의 상호 작용 이외에도 다양한 부가 정보를 임베딩 기법을 활용하여 추천 목록을 만드는 연구가 많이 진행되었다. 구글이 발표한 **Wide & Deep model**은 사용자의 인구통계학적 정보, 접속 디바이스 유형, 과거 로그 기록, 설치한 앱 정보 등 다양한 데이터를 딥러닝 모델의 입력으로 활용한다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/36b2c810-a492-4975-8755-70d1437c248d){: .align-center}<br>

<br>

# 3. GNN 기반 추천 시스템

## 3.1 Why Graph?

최근 추천 시스템 분야 최신 논문 및 학회에서는 그래프 기반 모델이 주류로 연구되고 있다.

대부분 유저와 아이템 간의 관계는 본질적으로 그래프 구조로 표현될 수 있다. 또한 협업 필터링의 핵심인 유사 이웃이 구매한 아이템을 추천하는 과정은 이분 그래프 형태로 표현될 수 있다. 추천 시스템을 위한 이분 그래프는 아래 그림과 같다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a4abb78a-2ccb-44e7-8ec1-40da4dd6e44f){: .align-center}<br>

기존 연구들과 달리 GNN을 추천 시스템에 적용했을 때 여러 장점들이 존재한다.

1. 추천 시스템에서 유저와 아이템의 관계는 위 그림과 같이 본질적으로 이분 그래프 구조로 표현할 수 있다.
2. 이러한 구조는 유저와 아이템의 collaborative 관계를 직관적으로 보여줌과 동시에 고수준의 연결성을 표현할 수 있도록 만든다.
3. 또한 그래프 구조의 장점으로 추상적인 개념을 다루기 좋다는 점이 있다.

GNN의 가장 큰 장점은 노드 간 다중 홉(multi-hop) 관계를 구조적으로 표현하여, 고차원의 collaborative signal을 포착할 수 있다는 것이다.

전반적인 GNN 기반 추천 시스템을 살펴보기 전에 GNN에 대한 간단한 소개를 제시하고자 한다.

- 먼저 그래프는 $G=(V, E)$ 로 표현된다
- 여기서 $V$ 는 노드의 집합, $E$ 는 노드 간의 관계를 나타내는 엣지의 집합이다.
- 특정 노드 $v$와 연결된 이웃은 $N(v) = [u \in V(v,u)] \in \varepsilon$ 와 같이 나타낸다.

또한, 기존 전통적인 추천 시스템은 유저가 아이템에 부여한 명시적인 평점 정보만을 활용하는 한계가 있었다면, GNN 기반 추천 시스템은 둘의 상호 관계 자체를 임베딩 가능하다는 이점이 있다.

## 3.2 Graph Neural Network Techniques

GNN은 인접 노드와의 관계성을 통해 자신 노드의 정보를 업데이트 한다. 이때 인접 노드와의 관계를 크게 3가지 방법으로 종합(aggregation)한다. 아래는 대표적으로 사용되는 기법에 대한 간단한 소개이다.

### GCN

GCN은 각 층(layer)마다 동일한 가중치를 적용하여 인접 노드의 정보를 종합한다. 이때 각 인접 노드로부터 타겟 노드에 얼만큼 정보를 전달할 지를 메시지(message)라고 한다. GCN은 이웃들의 정보를 메시지 값에 따라 가중 평균 또는 합을 한다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c722daec-f4b9-4a9b-9d91-ebdedf36d21e){: .align-center}<br>

### GraphSAGE

본 모델에서는 인접 노드의 정보를 종합하여 타겟 노드의 정보를 업데이트 하는 점은 GCN과 비슷하다. 그러나 GCN은 단순 가중 평균 또는 합 연산을 수행했다면, GraphSAGE는 인접 노드의 정보를 종합할 때 LSTM, pooling 등 다양한 기법을 적용한다.

### GAT

Graph Attention Network는 주변 노드의 정보를 반영할 때 각 이웃 노드마다 다른 attention을 부여하여 자기 자신을 업데이트한다. 타겟 노드에게 가장 많은 영향력을 미치는 노드에 더 큰 attention 스코어를 부여하는 것이 GAT의 핵심 아이디어이다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d33e63dc-aa9c-465c-9e74-2b554e33bf99){: .align-center}<br>

이러한 그래프 표현의 기본 배경을 바탕으로 그래프 기법을 추천 시스템에 적용한 모델들을 살펴보겠다.

## 3.3 유저-아이템 상호 관계 기반 모델

### NGCF

NGCF는 유저-아이템 상호 관계 기반 모델의 베이스가 되는 연구이다.

전통적인 추천 시스템, 딥러닝 기반 추천 시스템 모델들은 모두 collaborative 관계를 예측하는 것을 목표로 한다. 그러나 이러한 과거 연구들은 유저-아이템의 상호관계 자체를 임베딩하지 못한다는 한계가 존재한다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9772e19d-a33b-4199-b4f1-d9d85960d5bf){: .align-center}<br>

NGCF는 이분그래프를 트리 구조로 펼친 모델을 제시하여 고수준의 연결성(high order connectivity)을 직관적으로 표현한다.

위 그림의 좌측 그림은 유저-아이템 사이의 이분 그래프, 오른쪽 그림은 트리구조를 나타낸다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9cac0282-84f1-4f48-b749-7d713b798ab0){: .align-center}<br>

위 그림은 NGCF의 전체적인 모델 구조를 보여준다.

모델은 크게 유저와 아이템 임베딩의 초기값을 전달해주는 Embedding layer, 유저-아이템의 high order connectivity가 표현되는 Embedding propagation layer, 마지막으로 유저와 아이템 간의 선호도 점수를 예측하는 Prediction layer가 있다.

이때 Embedding propagation layer는 collaborative signal을 포작하기 위해 GNN의 message-passing 구조를 만든다.

유저와 아이템 쌍에서 아이템으로부터 유저에게 전달되는 메시지 값을 만들기 위해 아래 식과 같은 message construction 과정을 거친다.

$m_{u \leftarrow i} = \dfrac{1}{\sqrt{\lvert N_u \rvert \lvert N_i \rvert}} (W_1e_i + W_2(e_i \odot e_u))$

이후 각 메세지들은 aggregation function에 의해 종합되고 최종적으로 활성화 함수를 통과하여 예측 값을 도출한다.

### Light GCN
NGCF의 message construction 과정을 단순화 함과 동시에 예측 정확도까지 향상시킨 LightGCN 모델도 이후 제시 되었다. 저자들은 NGCF에서 임베딩 벡터를 업데이트하는 과정에서 연산이 복잡해질 뿐만 아니라 오히려 추천 성능을 저하시키는 것을 확인했다고 언급한다.

오히려 Embedding propagation layer에서 정규화된 연산을 사용하는 선형 전파층을 사용하여 예측 성능을 향상시켰다. 아래 그림은 LightGCN의 전체 모델 구조이고 NGCF 모델과 비교했을 때 Embedding propagation layer 부분에서만 차이가 있는 점을 확인할 수 있다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2ab61142-9191-4319-88ac-0ead40b69434){: .align-center}<br>

### Multi-GCCF

Multi-GCCF는 엣지의 이중 홉(two-hop) 이웃들을 기준으로 노드의 관계를 풍푸하게 표현하기 위해 hyperedges를 추가하는 연구를 진행한 모델이다.

### DGCF

DGCF도 마찬가지로 이중 홉 이웃과의 관계에서 유저-유저, 아이템-아이템 구조를 만들기 위해 원본 그래프에 새로운 엣지를 더한다. 또한 가성의 intent 노드들을 도입하여 원본 그래프를 서브 그래프로 분해하여 더 나은 표현력을 가진 노드 관계를 활용한다.

### DHCF

DHCF는 하이퍼 엣지를 제안한 모델이고 유저-아이템의 하이퍼 그래프를 통해 명시적인 high-order 상관 관계를 구축한다.

## 3.4 시퀀스 데이터를 활용한 모델

추천 시스템의 또 다른 주요 연구 분야로 순서 기반 데이터로부터 다음 구매를 예측하는 주제가 있다. GNN 기반 추천 시스템도 역시 시퀀스 데이터를 입력 데이터로 사용하여 유저의 다음 선호도를 예측하는 연구들이 활발하게 진행 중이다.

아래 그림은 시퀀스 데이터를 활용한 추천 시스템의 전반적인 프레임워크를 보여준다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d8ad6a14-7610-47ee-a957-646d90c797af){: .align-center}<br>

유저-아이템 상호작용 기반 GNN 모델과 달리 시퀀스 데이터 기반 GNN 모델은 시간 순서에 따른 유저의 행동을 표현한 그래프를 입력 형태로 활용한다. 또한 각 행동 순서는 방향성이 있는 엣지 (directed edge)들로 표현된다.

딥러닝 기법인 RNN, STAMP 등의 여러 방법론이 세션 기반 추천을 위해 도입되었지만 다음과 같은 한계를 지닌다.

먼저 하나의 세션 내에서 적절한 유저 행동이 존재하지 않으면 유저의 표현력이 제한된다. RNN 기반 모델은 과거로부터 축적된 은닉 벡터를 활용하는데 충분한 정보가 없다면 유저가 적절히 임베딩 되기 어렵다. 또한 단순 순서만 반영하기 때문에 맥락 속에서 발생하는 상호작용을 무시하고 단 방향성만 고려한다.

이러한 문제점을 해결하기 위해 **SR-GNN 모델**은 아이템 간의 풍부한 상호 관계를 반영한 잠재 벡터를 생성하는 알고리즘을 제시한다.

아래 그림은 SR-GNN의 전체 구조를 나타낸다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e0f02568-9acc-45b9-aa92-93633339425b){: .align-center}<br>

$v_1, v_2, \dots, v_7$ 은 추천 대상인 아이템 리스트를 의미한다. 각 세션 그래프는 하나의 서브 그래프로 간주 된다.

위 예시에서는 $v_2 \rightarrow v_5 \rightarrow v_6 \rightarrow v_7$ 으로 이어지는 하나의 세션이 하나의 서브 그래프가 된다. 각 세션이 GNN 모델의 연산을 거치면서 각각의 노드 벡터를 도출한다. 이후 전반적인 선호도를 나타내는 global 벡터와 세션 내에서 유저의 현재 선호도를 나타내는 local 벡터가 나온다. 이후 모델은 최종적으로 각 세션에 대해 다음 선택될 아이템을 예측한다.

세션 기반 GNN 추천 시스템의 또 다른 주류 분야로 그래프 구조를 현재 시퀀스에 조정하는 방법론도 있다.

현 시점의 노드가 한 개 이상의 연속적인 아이템과 연관이 있다면 **MA-GNN 모델**은 연관성을 바탕으로 세 가지 서브 시퀀스 아이템을 도출한다. 이 때 이들 사이에 엣지를 연결하고 아이템 간의 거리는 무시한다.

**SGNN-HN 모델**은 가상의 스타 노드를 도입하여 시퀀스에 중앙으로 간주한다. 이 노드는 현재 시퀀스 모든 아이템들과 가상의 연결이 있다고 가정한다. 이러한 스타 노드의 벡터 별 연결 표현은 현재 시퀀스의 전반적인 선호도를 표현한다고 볼 수 있다.

한편 **LESSR 모델**은 하나의 시퀀스에서 두 개의 그래프를 구축한다. 이는 기존 연구들이 현재 타겟 노드의 시퀀스만을 고려하지만 이웃 노드들의 시퀀스는 고려하지 않는다는 한계를 지적한다. 이러한 서브 그래프는 각 아이템 간의 short-cut path를 허용하여 각 이웃들의 시퀀스 순서를 구별한다.

## 3.5 지식 그래프를 활용한 모델

지식 그래프는 속성 정보를 바탕으로 아이템 간의 관계를 표현한 그래프이다. 지식 그래프를 추천 시스템에 적용했을 때 두 가지의 장점을 얻을 수 있다.

1. 첫째로 아이템 간의 관계를 풍부하게 표현할 수 있기 때문에 보다 풍부한 의미론적 인베딩을 얻을 수 있다.
2. 두 번째로는 유저와 이웃의 구매 기록 정보와 아이템 속성을 통합하여 표현할 수 있다는 장점이 있다.

이러한 장점에도 불구하고, 지식 그래프를 사용하면 모델의 복잡성이 증가하고 연산이 증가된다는 단점이 있다.

대표적으로 이러한 장점을 활용함과 동시에 복잡성이 증가하는 한계를 극복하고자 한 연구로 **KGAT 모델**이 있다. 유저-아이템 상호작용 기반 GNN, 시퀀스 데이터를 사용한 GNN에서는 상호작용 외 부가 정보를 활용하지 못한다는 한계가 있다.

기존 이분 그래프 역시 유저-아이템 간의 직접적인 연결만을 사용한다. 아이템-아이템 간의 직접적인 연결은 사용하지 않기 때문에 아이템 속성 자체의 연관성이 고려되지 않는다. 따라서 KGAT는 이러한 연결성을 고려하고자 CKG(Collaborative Knowledge Graph)를 제안하였고, 기존 이분 그래프 보다 더욱 고수준의 관계를 고려할 수 있었다.

아래 그림은 유저-아이템 이분 그래프에 아이템-속성 정보가 반영된 이분 그래프를 적용한 예시이다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/88d772f8-33f8-42cc-bba0-ec81d8a1fab7){: .align-center}<br>

그러나 이러한 구조를 사용하게 되면 앞서 언급처럼 한 노드에 대한 high-order relation이 급격하게 커질 수 있다. 이는 속성 관계가 많아질수록 그만큼 모델의 연산이 커지는 것을 의미한다.

또한 다양한 주제의 속성을 활용하면 각 엣지들이 불균형한 가중치를 갖기 때문에 어텐션 메커니즘을 적용하여 이러한 문제들을 해결한다.

아래 그림은 CKG에 어텐션 메커니즘을 적용한 임베딩 값을 입력으로 최종 예측을 계산하는 모델 구조이다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9bf1df07-c177-436a-aef0-f606a7cc3e00){: .align-center}<br>

## 3.6 이 외 모델

**유저들의 그룹**에게 추천을 해주는 그룹 추천 시스템은 세 가지 타입의 관계성을 사용한다. **유저-아이템 상호작용**과 **유저-그룹 관계**, 그리고 **그룹-아이템 선호도 관계**를 그래프 구조로 활용한다.

이러한 관계에서 그룹은 유저와 아이템을 연결해주는 ‘가교’ 역할을 한다.

### GAME(He, Chow et al. 2020) 모델

GAME 모델은 그룹 노드 개념을 제안한 연구이다. 그룹 노드에 어텐션을 적용해서 연결된 이웃을 기반으로 적절한 가중치를 학습한다. 멀티미디어 추천은 유저가 멀티미디어 콘텐트에 보인 선호도를 바탕으로 추천을 제공한다. 본 주제에서 가장 중요한 개념은 멀티 모달리티이다. 텍스트, 이미지, 비디오와 같은 개별 모달리티를 통합하여 멀티 모달리티 정보를 활용한다.

최근 GNN은 유저와 멀티 모달 콘텐츠의 상호작용을 이분 그래프 구조로 파악하려는 시도가 있다.

### MMGCN

MMGCN은 각 모달리티에 대한 유저-아이템 이분 그래프를 구축한다. 여기서 전반적인 유저-아이템 선호도는 이러한 하위 그래프들의 종합이다.

### GRCN

GRCN은 멀티 모달리티 정보와 유저-아이템 상호작용을 순전파하는 과정에서 각 모달리티의 가중치를 학습한다. 이후 각 모달리티에 연결된 이웃 정보를 종합하여 타겟 노드의 값을 업데이트한다.

<br>

# 4. 마무리

추천 시스템에서 유저-아이템 관계는 본질적으로 그래프 구조로 표현된다. 네트워크, 그래프 기법과 딥러닝 기술의 발전으로 이러한 상호작용 그래프 신경망에 적용한 연구가 최근 추천 시스템의 주류 분야로 자리잡았다.

GNN을 활요한 추천 시스템은 그래프 구조를 통해 유저- 아이템 상호 관계 자체를 임베딩하여 모델에 반영한다. 이는 기존 연구에 비해 보다 고수준의 관계를 활용하기 때문에 유저와 아이템의 collaborative signal을 효과적으로 포착할 수 있다. 따라서 기존 전통적인 추천 시스템, 딥러닝 기반 추천 시스템과 차별화된 연구 주제로 발전하고 있다.
