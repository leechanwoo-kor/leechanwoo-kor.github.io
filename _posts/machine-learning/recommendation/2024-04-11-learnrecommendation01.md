---
title: "[Recommendation System] 추천 시스템과 머신 러닝 (1)"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "추천 시스템과 머신 러닝 (1)"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc9f80c0-9407-4392-b8da-9872f1775560){: .align-center}<br>

현대의 디지털 환경에서 개인화는 더 이상 선택이 아닌 필수가 되었습니다. 사용자 개개인의 취향과 관심사에 맞춘 콘텐츠 제공은 사용자 경험을 향상시키고, 서비스의 재이용률을 높이는 중요한 요소입니다. 이러한 개인화의 궁극적 목적을 달성하기 위한 가장 강력한 도구 중 하나가 바로 추천 시스템입니다.

## 추천 시스템과 머신러닝

개인화는 맥락에 따라 다양한 형태로 나타나지만, 가장 일반적인 형태는 고객의 과거 행동 데이터를 기반으로 선호할 아이템을 추천하는 시스템입니다. 단순한 규칙에 기반한 개인화도 가능하지만, 더 나은 성능과 확장성을 위해서는 머신러닝이 특히 적합합니다. 예를 들어, 유튜브의 추천 시스템 같은 유명한 서비스도 머신러닝, 특히 딥러닝 기술을 활용합니다.

머신러닝에 익숙한 사람도 추천 시스템을 처음 접하면, 초기에 소개되는 [**연관규칙분석(Apriori)**](https://leechanwoo-kor.github.io/recommendation%20system/apriori/) 이나 **행렬 분해(Matrix Factorization)** 같은 알고리즘에 어려움을 느낄 수 있습니다. 처음에는 보다 빠르고 익순한 트리 기반 부스팅 모델을 선호할 수 도 있습니다. 하지만 분류. 회귀, 군집화 같은 전통적인 머신러닝 방법론으로도 충분히 개인화를 달성할 수 있으며, 때로는 이러한 접근이 더 적합할 수 있습니다. 그럼에도 불구하고, 추천 시스템이 가지는 고유한 특성을 이해하고 활용하는 것은 성능 향상과 시스템 운영에 있어 매우 중요합니다.

여기서 언급하는 일반적인 머신러닝 모델은 정형 데이터나 테이블 데이터를 대상으로 하는 선형 모델이나 부스팅 모델 등을 의미합니다. 이미지나 자연어 처리 같은 비정형 데이터는 제외하겠습니다. 예를 들어, _iris_ 나 _titanic_ 데이터셋은 포함되지만, _cifar_ 나 _mnist_ 데이터셋은 제외 됩니다. 머신러닝, 특히 지도학습은 목표 변수의 유형에 따라 수치형 값을 예측하는 회귀 문제와 범주형 값을 예측하는 분류 문제로 구분됩니다. 추천 시스템은 회귀 문제일 수도, 분류 문제일 수도 있으며 때로는 정렬이나 순위 문제로도 볼 수 있습니다. 이제 각 시나리오를 예시를 들어 설명하겠습니다.

### 추천 시스템: 회귀 모델

회귀 모델을 활용한 추천 시스템에서는 주로 사용자의 평점을 예측하는 데 사용됩니다. 대표적인 예로, MovieLens 데이터셋이 있으며, 이는 162,000명의 사용자가 62,000편의 영화에 부여한 평점 정보로 구성됩니다. 이 데이터를 사용하여 평점 예측 문제를 해결하는 것은 회귀 모델을 사용한 추천 시스템의 전형적인 사례입니다. 그러나 평점 정보를 단순 수치로 해석하는 회귀 모델은 평점의 본질적인 의미를 완전히 반영하지 못할 수 있습니다. 예를 들어, 평점 4점이 2점의 두 배 가치를 의미하지 않음에도 불구하고, 회귀 모델은 그렇게 해석할 수 있습니다. 이는 평점이 서열 척도(ordinal scale)로 더 적절히 처리 되어야 함을 시사합니다. 하지만 정규화나 버킷화 같은 기법을 통해 이러한 문제를 어느 정도 완화하고, 회귀 모델을 사용하여도 유의미한 예측 성과를 달성할 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ffde818b-026e-4a7d-a36d-fe55f8ef9f1c){: .align-center}<br>

평점 데이터는 사용자가 직접 제공하는 **명시적 피드백(explicit feedback)** 의 일종으로, 사용자가 영화에 대해 느낀 만족도나 선호도를 반영합니다. 하지만, MovieLens 데이터셋처럼 평점만을 포함하는 경우, 이는 상대적으로 제한된 정보를 제공한다고 볼 수 있습니다. 실제 온라인 서비스에서는 사용자의 관람 여부, 클릭, 노출 등 풍부한 정보를 활용하여 추천 시스템을 개선할 수 있습니다. 명시적 피드백은 사용자의 직접적인 선호를 나타내는 중요한 정보원이지만, 그 양이 한정적일 수 있다는 단점이 있습니다.

### 추천 시스템: 분류 모델

분류 모델은 추천 시스템에서 사용자가 특정 아이템을 클릭하거나 구매할 확률을 예측하는 데 주로 사용됩니다. 특히 이커머스와 같은 분야에서 분류 모델의 활용도가 높습니다. 사용자가 웹사이트나 애플리케이션을 통해 다양한 아이템에 노출되고(이를 impression이라고 합니다), 이 중 일부를 클릭하거나 구매하는 행위(user feedback 중 하나입니다)는 이진 분류 문제로 처리될 수 있습니다. 클릭 또는 구매 여부를 예측함으로써, 시스템은 사용자에게 가장 관련성 높은 아이템을 제안할 수 있습니다.

**암시적 피드백(implicit feedback)** 은 사용자의 명시적인 선호 표현이 없는 상황에서도 추천 시스템이 사용자의 선호를 유추할 수 있게 하는 중요한 정보입니다. 예를 들어, 사용자가 아이템을 클릭했거나 구매한 기록은 강력한 선호 신호로 해석될 수 있습니다. 반면, 사용자가 아이템을 클릭하지 않은 경우, 이 정보는 일반적으로 데이터에 포함되지 않지만, 사용자의 비선호를 암시할 수 있습니다. 이러한 암시적 피드백을 활용하는 것은 추천 시스템에서 매우 중요하며, 사용자의 실제 행동 패턴을 기반으로 보다 정확한 추천을 제공하는 데 도움을 줍니다.

분류 모델을 사용한 추천 시스템은 특히 사용자가 대량의 아이템 중에서 선택하는 상황에서 그 효과를 발휘합니다. 아이템 노출 데이터, 클릭 및 구매 기록 등 다양한 유형의 사용자 행동 데이터를 활용하여, 시스템은 사용자의 다양한 선호와 행동 패턴을 학습하고, 이를 바탕으로 개인화된 추천을 제공합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c3d602bb-8ec3-436e-ae76-b626e5e8c288){: .align-center}<br>

암시적 피드백과 노출 데이터의 중요성은 추천 시스템에서 매우 큰 역할을 합니다. 예를 들어, 영화 평점과 같이 사용자가 명시적으로 자신의 선호를 표현하는 경우가 있지만, 이러한 데이터는 상대적으로 드물게 발생합니다. 대부분의 사용자는 영화를 관람한 후 평점을 남기지 않으며, 실제로 평점을 남기는 사용자의 비율은 10% 미만일 수 있습니다. 이와 대비하여, 사용자가 아이템을 클릭하거나 구매한 경우, 이러한 행위는 명시적인 선호 표현 없어도 추천 시스템이 사용자의 관심사를 유추할 수 있는 암시적 피드백을 제공합니다. 그러나 사용자가 노출된 아이템에 대해 아무런 반응을 보이지 않는 경우, 이러한 비활동은 대부분 데이터에 기록되지 않아, 추천 시스템에서는 이를 암시적 피드백의 중요한 부분으로 활용하기 어렵습니다.

<br>

## 노출 데이터의 중요성과 활용

추천 시스템을 구축하고 운영하는 과정에서 노출 데이터의 역할은 매우 중요합니다. 많은 공개 데이터셋, 예를 들어 MovieLens,는 사용자의 행동 데이터는 제공하지만, 노출 데이터를 포함하지 않습니다. 실제 추천 시스템에서 노출 데이터는 시스템의 성능 평가와 모델 학습의 두 가지 주요 측면에서 필수적인 요소입니다.

### 모델 평가

추천 모델을 개발하고 서비스에 적용하는 것이 최종 목표일 때, 노출 데이터는 모델의 성능을 평가하는 데 있어 필수적입니다. 노출 데이터가 있어야만, 우리는 모델을 정확하게 평가할 수 있습니다. 예를 들어, 뉴스 추천 시스템에서 모델의 성능은 A/B 테스트를 통해 평가될 수 있습니다. 이 과정에서 전체 기사의 랜덤 노출(A)과 개인화된 추천 노출(B)을 비교합니다. 여러 지표 중 전환률(Click-Through Rate, CTR) 은 중요하며, 이를 계산하기 위해서는 노출 데이터가 필수적입니다. 전환률 외에도 재방문률, 체류시간, 클릭 횟수 등 다양한 지표를 측정할 때 노출 데이터는 중요한 역할을 합니다. 노출 데이터 없이는 추천 시스템의 다양성과 의외성 같은 중요한 지표를 살펴보기 어렵습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c11a4f6f-4289-4f58-9320-4db5c15980aa){: .align-center}<br>

### 모델 학습

노출 정보를 활용하는 것은 모델 학습에 있어 더 복잡하고 미묘한 과정입니다. 유튜브 같은 서비스에서 개인화된 추천은 사용자에게 제안된 여러 아이템 중에서 선택을 유도합니다. 사용자가 한 아이템을 클릭했다면, 이는 클릭한 아이템에 대한 선호를 나타내며, 나머지 미선택 아이템들에 대해서는 상대적으로 덜 선호하는 암시적 피드백을 제공합니다 이러한 정보는 추천 시스템이 사용자의 선호를 학습하는 데 있어 매우 중요합니다.

노출 데이터는 추천 시스템의 성능을 정확하게 평가하고 사용자의 선호를 더 잘 이해하며 예측하기 위한 학습 과정에서 중요한 역할을 합니다. 추천 시스템에서 노출 데이터의 활용은 모델의 정확도와 개인화된 추천의 품질을 높이는 데 기여합니다.

<br>

## 추천 모델 학습하기

추천 시스템 내에서 다양한 모델의 유형이 존재하며, 여기서는 몇 가지 기본적인 사례부터 시작해 점진적으로 복잡한 경우들을 탐색해보고자 합니다.

### 행렬 분해 (Matrix factorization)

행렬 분해는 추천 시스템 입문자가 반드시 접하게 되는 기법 중 하나로, SVD와 같은 방법에서 시작합니다. ALS(Alternating Least Squares)나 BPR(Bayesian Personalized Ranking) 같은 알고리즘은 주로 positive feedback 데이터를 학습에 활용합니다. BPR의 경우, positive feedback이 부재한 상황을 negative sample로 간주하며 모델 학습을 진행하며, 이 때 전체 인기도(popularity)를 고려한 샘플링이 중요합니다.

### Factorization Machine, FM

FM은 추천 시스템에만 국한되지 않고 다양한 머신러닝 분야에서 활용합니다. 하지만, 특히 hybrid(CF + CBF) 모델에서 그 유용성이 두드러집니다. FM은 positive 및 negative sample을 비교하여 학습하는 방식을 채택합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3125a899-042c-4235-a388-4864eb995c97){: .align-center}<br>

### 그래프 기반 추천 (Graph-based Recommendation)

소셜 네트워크 분석에 큰 발전을 이룬 그래프 모델은 개인화된 추천 시스템과도 잘 어울립니다. 사용자와 아이템을 노드로, feedback을 엣지로 활용하여 다양한 그래프 모델을 추천에 적용할 수 있습니다. 비록 진입 장벽이 다소 높지만, 그래프 모델은 추천 정확도 면에서 뛰어난 성능을 보입니다.

### Multi-Armed Bandit (MAB)

MAB는 추천 시스템에서 앙상블 기법으로 유용하게 사용될 수 있으며, 특히 톰슨 샘플링 방법이 주목받습니다. MAB는 실시간으로 추천 성능을 극대화하는 데 효과적이지만 구현에는 상당한 개발 노력이 요구됩니다.

이러한 다양한 모델은 추천 시스템의 근간을 이루며 각각의 모델이 제공하는 독특한 접근 방식을 통해 사용자에게 맞춤화된 추천을 제공하는 데 기여합니다.