---
title: "[Ⅲ. Structuring Machine Learning Projects] Comparing to Human-level Performance (3)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Deep Learning
  - Inductive Transfer
  - Machine Learning
  - Multi-Task Learning
  - Decision-Making
toc: true
toc_sticky: true
toc_label: "Comparing to Human-level Performance (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## Comparing to Human-level Performance

### Surpassing Human-level Performance

많은 팀들은 종종 특정 인식 분류 작업에서 인간 수준의 퍼포먼스를 넘어서는 걸 즐기는데요. 이걸 직접 해 볼 때 눈에 띄는 몇 가지에 대해 얘기해 보겠습니다 .

---

![image](https://user-images.githubusercontent.com/55765292/180908055-365e22e1-d673-41f1-a14d-3678d69c4d99.png)

이전에도 언급했듯 인간 수준에 근접하거나 심지어 이를 능가한 시점에서는 머신 러닝을 개선하는 것이 더 힘들어집니다. 그 이유에 관한 한 가지 예시를 더 들어 보겠습니다.

사람들이 토론하는 문제가 있다고 가정해봅시다. 토론을 통해 0.5% 사람 오류 1% 그리고 0.6%의 트레이닝 에러와 0.8%의 dev error가 생겼다고 해봅시다 이런 경우 회피가능 편향은 어떻게 될까요? 이 문제는 비교적 쉬운데요 베이즈 오차는 0.5% 정도로, 따라서 회피가능 편향은 여기 해당하는 1%를 기준으로 하진 않을 건데요. 이 차이를 이용하겠지요. 따라서 적어도 회피가능 편향을 0.1%로 분산은 약 0.2%로 추정하게 될 것입니다. 그러면 아마 회피가능 편향보다는 분산을 줄일 방법이 더 많을 수 있겠죠.

이제 조금 더 어려운 예시를 보도록 하겠습니다. 마찬가지로 인간 팀과 인간 한 명이 있는데 알고리즘이 0.3% 훈련 오차 0.4% 개발 오차를 갖는다고 해 봅시다. 그럼 회피가능 편향은 어떻게 될까요? 이제는 답하기가 훨씬 어려워졌습니다. 훈련 오차가 0.3%라는 것은 0.2% 과적합을 의미할까요? 또는 베이즈 오류가 사실 0.1%일 수도, 0.2%일 수도, 0.3%일 수도 있습니다. 정확히 알 수가 없습니다. 예시에서 주어진 정보는 사실 충분치가 않습니다.

알고리즘에서 편향과 분산 중 어떤 것을 줄이는 데 집중해야 할지 애매합니다. 이렇게 되면 효율적인 진행이 어려워지게 되는 것이죠. 또 오차가 이미 라벨에 대해 논의하는 인간 팀이 내는 오차보다 낫다고 하면 인간의 직관적인 부분으로 알고리즘의 성능 향상 방향을 결정하기 어려워집니다.

이번 사례에서는 이 0.5% 임계점이 넘어가면 머신 러닝을 발전시킬 수 있는 선택지가 그리 명확하지 않게 됩니다. 그렇다고 해서 진전이 불가능하다는 건 아닙니다. 상당한 발전이 있을 수도 있습니다. 하지만 정확한 방향성을 제시해줄 수 있는 툴이 제한적일 수 있다는 말입니다.

---

![image](https://user-images.githubusercontent.com/55765292/180908095-e2881a6e-bf08-4aa6-9b55-aa2f760dd14d.png)

이미 머신 러닝은 많은 분야에서 인간 수준을 넘어선 해결력을 보여주고 있습니다. 예를 들면 온라인 광고, 광고 클릭 확률 추정 등이 있죠. 요즘 학습 알고리즘은 어떤 인간보다도 이런 부분을 잘 수행하고 있는 것 같습니다. 아니면 제품 추천 같은 것도 있죠 영화나 책을 추천하는 것 말이죠. 오늘날 웹사이트는 단짝 친구보다도 더 나은 추천을 해 주는 것 같습니다.

모든 물류회사가 A에서 B까지 운전하는 데 얼마나 걸릴지, 배달 차량이 A에서 B까지 운전하는 데 얼마나 걸릴지 예측합니다. 다른 예로는 대출금 상환 확률 예측도 있습니다. 그래서 대출신청의 승인여부 의사결정에 도움을 줄 수 있죠. 이런 부분들이 오늘날 머신 러닝이 인간의 능력을 훨씬 뛰어넘는 분야라고 생각됩니다.

이 네 가지 예시에서 나타나는 특성을 살펴보겠습니다. 이 네 예시는 실제로 구조화된 데이터를 기반으로 학습합니다. 사용자가 클릭한 광고에 대한 데이터베이스, 이전에 구매한 제품에 대한 데이터베이스, A에서 B로 이동하는 소요 시간에 대한 데이터베이스 이전 대출 신청내역과 그 결과에 대한 데이터베이스 등이죠.

이런 것들은 자연적으로 인지되는 문제들이 아닙니다. 컴퓨터 비전이나 음성 인식, 자연어 처리 작업이 아니죠. 인간들은 자연적 인식에 아주 능숙합니다. 그래서 컴퓨터가 인간 수준을 넘어 자연 인지 작업을 처리하는 것은 가능하지만 조금 어려울 뿐입니다.

마지막으로, 이런 문제들을 담당하는 팀들은 아주 방대한 양의 데이터를 다루고 있습니다. 예를 들어 이런 네 가지 분야를 다루는 최고의 시스템들은 아마 인간이 볼 수 있는 것보다 훨씬
더 많은 데이터를 조회했을 것입니다. 그래서 컴퓨터가 인간 수준을 뛰어넘는 것을 상대적으로 수월하게 했지요. 이제 컴퓨터가 조사할 수 있는 데이터가 너무 많아 인간의 생각보다 통계적인 패턴을 찾는 게 더 나을 수 있습니다.

이런 문제를 제외하면 최근에는 인간 수준을 뛰어넘는 음성 인식 시스템도 존재합니다. 또 컴퓨터 비전과 이미지 인식 쪽에서도 컴퓨터가 이미 인간 수준을 넘은 경우가 있습니다. 그러나 인간은 이 자연 지각 작업에 아주 능숙하기 때문에 컴퓨터가 그 수준까지 가는 건 더 어려울 거라고 생각합니다.

또 다른 분야로는 의학 업무가 있는데요. 예를 들어 ECG 판독이나 피부암 진단 특정 방사선학 업무들이 있습니다. 이런 분야에서는 컴퓨터가 아주 능숙해지고 있고 단일 인간 수준의 성과를 능가할 수도 있습니다. 그리고 최근 딥 러닝에서 흥미로운 것은 이렇게 인간보다 나은 성능을 보이는 분야들에서도 여전히 일부 어려운 경우가 있는데 인간은 본질적으로 이러한 자연 지각 작업을 아주 탁월하게 처리하는 경향이 있습니다. 그러므로 인간 수준을 능가하는 것은 보통 쉽지는 않지만 충분한 데이터가 있는 경우 딥 러닝 시스템이 단일 지도 학습 문제에서 인간 수준을 넘어선 경우가 많았습니다.

---

### Improving 

직교화와 개발과 시험 세트 모두에 이를 적용하세요. 베이즈 에러의 프록시로서 인간 수준의 퍼포먼스 회피가능 편향과 분산 추정 방법 이 모든 것들을 여러분의 학습 알고리즘 성능을 향상시키는 가이드라인으로 취합해 봅시다.

---

![image](https://user-images.githubusercontent.com/55765292/180927238-0ad38723-b5f2-4c1f-b143-f8e8df26a5bf.png)

효과적인 지도 학습 알고리즘은 기본적으로 두 가지를 할 수 있어야 합니다. 먼저 훈련 세트를 잘 대입할 수 있어야 하며 이는 간단히 말해 낮은 회피가능 편향을 달성할 수 있는 것으로 이해하시면 됩니다.

다음으로 잘 해야 하는 것은 훈련 세트에서 결과가 좋으면 개발 세트나 시험 세트에서도 결과가 잘 나오는 경우가 많습니다. 분산이 나쁘지 않다는 것이죠. 또 직교화의 경우 회피가능 편향 문제를 해결하기 위해 사용할 수 있는 특정 트리거가 있습니다.

더 큰 네트워크를 훈련시키거나 훈련 시간을 늘리는 것 또 분산 문제 해결에 사용할 수 있는 별도의 세트가 있습니다. 일반화나 훈련 데이터를 더 많이 수집하는 등이죠.

---

![image](https://user-images.githubusercontent.com/55765292/180927310-559c46cd-3855-49dd-a929-6ea0a29d9722.png)

배운 내용을 요약하자면 머신 러닝 시스템의 성능을 개선하고 싶을 경우 훈련 오류와 베이즈 에러의 프록시 차이를 보시면 회피가능 편향에 대한 감이 옵니다. 즉 훈련 세트에서 얼마나 더 나은 결과를 내야 하는지에 대한 감입니다. 그리고 개발 오류와 훈련 오류 간 차이를 보고 분산 문제가 얼마나 있는지 추정합니다. 즉 훈련 세트에서 바로 대놓고 훈련시키지 못한 부분에 대해서 얼마나 더 작업해야 하는지가 관건입니다.

훈련 세트에서 개발 세트로 넘어갈 때 회피가능 편향을 얼마나 줄이고 싶던지 간에 더 큰 모델을 트레이닝 시키는 방법을 고려할 것 같습니다. 그래서 훈련 세트에서 더 나은 결과를 얻거나 더 나은 최적화 알고리즘을 사용해 더 오래 훈련하세요. momentum이나 RMSprop 등이요 아니면 아담과 같이 더 나은 알고리즘을 쓰세요.

또 시도해 볼 수 있는 것은 더 나은 신경망 아키텍쳐나 하이퍼 파라미터를 사용하는 것입니다. 여기에는 활성함수나 레이어 개수 히든 유닛 개수를 바꾸는 것 등 모든 것이 포함될 수 있습니다. 하지만 이 경우 모델 사이즈를 늘려 다른 모델이나 다른 모델 아키텍쳐를 사용하는 방향이 되겠네요. 순환 신경망이나 합성곱 신경망 등이요. 여기에 관해서는 나중에 다루도록 하겠습니다.

새로운 신경망 구조가 훈련 세트에 더 잘 맞을지 여부는 때로는 미리 알기 어렵습니다. 하지만 더 나은 아키텍쳐를 사용하면 훨씬 나은 결과를 얻을 때가 있지요. 분산이 문제라는 것을 알게 된 정도를 넘어 시도할 수 있는 기술들이 또 있습니다.

먼저 더 많은 데이터를 얻는 것입니다. 더 많은 훈련 데이터를 얻으면 알고리즘 룸이 보지 못했던 개발 세트 데이터의 일반화를 더 잘할 수 있기 때문입니다. 일반화를 시도해 볼 수도 있습니다. 여기에는 L2 정규화 또는 드롭아웃 또는 데이터 증강기법이 포함됩니다.

또한 다양한 신경망 아키텍쳐나 하이퍼 파라미터 탐색으로 문제 해결에 더 도움이 되는 신경망을 찾아볼 수도 있습니다. 이런 편향이나 회피가능 편향, 분산 개념은 쉽게 배울 수는 있지만 마스터하기는 어려운 내용인 것 같습니다.