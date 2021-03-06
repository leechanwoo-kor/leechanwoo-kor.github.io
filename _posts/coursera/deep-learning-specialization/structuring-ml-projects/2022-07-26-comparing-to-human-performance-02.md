---
title: "[Ⅲ. Structuring Machine Learning Projects] Comparing to Human-level Performance (2)"
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
toc_label: "Comparing to Human-level Performance (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## Comparing to Human-level Performance

### Understanding human-level performance
인간 수준 성능이라는 표현은 리서치 기사에서 심심찮게 쓰이는 단어인데요 조금 더 정확히 이 부분에 대해
설명드리도록 하겠습니다 특히 인간 수준 성능이라는
문구의 정의는 머신러닝 프로젝트 진전의
촉진제 역할을 할 수 있습니다

---

![image](https://user-images.githubusercontent.com/55765292/180903118-54d445ad-71b7-41c2-a95f-8627a0f8dcbf.png)

이전 영상에서 보셨듯 인간 수준 성능이라는 문구 사용은 베이즈 오류를 추정할 수 있도록 해 줍니다. 어떠한 함수가 현재나 미래에 가질 수 있는 최선의 오류값은 무엇일까요? 이를 염두에 두고 의학 이미지 분류 사례를 보도록 하겠습니다.

이런 영상의학 사진을 본다고 해 봅시다. 이 사진을 바탕으로 분류하는 작업을 맡았다고 해보죠. 훈련 경험이 없는 일반적인 인간은 3%의 오류를 냅니다. 일반적인 영상의학 전문의는 1%의 오류를 내고요. 경험이 많은 의사는 0.7% 정도 오류로 더 잘 하겠죠. 경험이 많은 의사로 구성된 팀 이미지를 분석하고 그 내용을 논의한 뒤 의견을 취합하는 팀은 0.5% 오류를 냅니다.

그러면 어떻게 인간 수준의 오류를 정의할 수 있을까요? 3%, 1%, 0.7% or 0.5%? 어떤 게 맞을까요? 한 가지 기억하실 힌트는 인간 오류에 대해 생각하는 가장 좋은 방법은 베이즈 오류를 통해 접근하는 것입니다.

저라면 인간 수준 오류를 이렇게 정의할 것 같습니다. 프록시나 베이즈 오류 추정값을 원하는 경우 경험 많은 의사 팀이 토론에 토론을 거듭한다면 0.5% 오차율을 달성할 수 있습니다. 베이즈 오류는 0.5% 이하일 것입니다. 이런 팀들이 0.5% 오차율을 달성할 수 있기 때문에 최적 오류는 0.5% 이하라고 할 수 있습니다. 개선이 얼마나 많이 될지는 모르겠지만 작업 팀 규모가 더 클 수도 있고 의사의 경험치가 더 높을 수도 있습니다. 그러므로 오차율은 0.5%보다 낮아질 수 있겠죠. 그렇지만 최적 오류는 0.5%보다 높을 수 없습니다. 그래서 이런 환경에서 저라면 0.5%를 베이즈 오류의 추정치로 지정할 것입니다. 0.5%를 인간 수준 성능으로 정의하는 것이죠. 적어도 이전에 본 것처럼 편향과 분산 분석을 위해 인간 수준 성능을 이용하는 경우에 말이죠.

한편 논문 집필이나 시스템 도입이 목적인 경우 사용할 수 있는 인간 수준 성능의 정의가 다를 수 있는데요. 일반적인 의사의 능력 이상은 되어야 할 것입니다. 성공하면 굉장히 유용할 것 같은데요. 한 영상의학 의사의 역량을 뛰어넘은 시스템이라고 하면 시스템이 일부 맥락에서 도입 가능한 수준일 수 있습니다. 그렇기 때문에 이번 학습에서 명심하실 부분은 어떤 목적으로 인간 수준 오류를 정의할 것인지 명확하게 설정하는 것입니다. 그 목적이 어느 분야에서 특정 인간의 역량을 능가해 시스템을 도입하는 것이라고 하면 이것이 적합한 정의일 수 있겠죠. 하지만 베이즈 오류의 프록시가 목표인 경우 이것이 적합한 정의가 될 것입니다. 이게 왜 중요한지 오류 분석 사례를 통해 알아보도록 하겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/180903140-3ad8778f-8b8b-4c0c-b7b0-e7e4b4824a24.png)

의학 이미지 진단 사례를 예로 들겠습니다. 훈련 오류가 5%, 개발 오류가 6%입니다. 그리고 이전 예시에서 봤듯 인간 수준 성능입니다. 이것을 베이즈 오류의 프록시라고 생각할 것입니다. 그것을 일반적인 의사의 성과로 정의했는지 아니면 경험이 풍부한 의사 또는 의사 팀으로 정의했는지에 따라 1% 또는 0.7% 또는 0.5%가 됩니다.

이전에 정의한 것과 마찬가지로 베이즈 오류 또는 그 추정값과 훈련 오류의 차이는 회피가능 편향의 측정값입니다. 이는 학습 알고리즘에 분산이 얼마나 있는지를 측정하는 수치입니다. 첫 번째 사례에서 어떤 결정을 내리던 회피가능 편향의 값은 4% 정도 될 것입니다. 이를 4%에서 4.5%까지로 하면 0.5%를 이용해서요. 반면 이것은 분산은 1%입니다.

이번 사례에서는 인간수준 오류를 어떻게 정의하는지는 그리 중요하지 않습니다. 일반적인 의사의 오류로 지정하든 의사 개인의 오류로 지정하든 의사 팀의 오류로 지정하든 말이죠. 이 값이 4%나 4.5%면 확실히 분산 문제보다 더 커지죠. 이런 경우 더 큰 네트워크를 훈련시키는 등 편향을 줄이는 테크닉에 집중해야 합니다.

두 번째 사례를 보겠습니다. 훈련 오류가 1%이고 개발 오류가 5%라고 가정합시다. 다시 말하지만 별로 중요한 건 아닙니다. 인간 수준 성능이 1%, 0.7%, 0.5%인지 말이죠. 무엇을 사용하더라도 회피가능 편향값이 모두 0에서 0.5%일 테니 말입니다. 이것은 인간 수준 성능과 훈련 오류 사이의 차이입니다. 반면 이 차이는 4%입니다 따라서 어떻게 하던 간에 이 4%는 회피가능 편향보다 더 클 것입니다.

그러므로 분산을 줄이는 테크닉이 권장될 것입니다. 정규화나 더 큰 훈련 세트를 사용하는 것처럼 말이죠. 하지만 정말 중요한 부분은 훈련 오류가 0.7%인지 여부입니다. 여러분이 정말 잘해서 개발 오류가 0.8%가 되었을 경우 베이즈 오류의 추정치가 0.5%가 되도록 지정하는 것이 아주 중요합니다. 이 경우 회피가능 편향의 값이 0.2%가 되기 때문입니다. 분산이 0.1%이기 때문에 회피가능 편향이 2배로 더 큰 값이 됩니다. 이렇게 되면 편향과 분산 모두 문제일 수 있는데 회피가능 편향이 조금 더 큰 문제라고 볼 수 있습니다.

이번 사례는 이미 다뤘듯 0.5%가 베이즈 오류에서 가장 좋게 나온 값인데, 의사 팀이 가장 좋은 성과를 낼 수 있기 때문이죠. 만약 0.7을 베이즈 오류의 추정치로 한다면 회피가능 편향 추정치가 거의 0%가 되어 아마 이를 놓쳤을 텐데요. 사실 훈련 세트에서 더 좋은 성과를 내도록 해야 합니다. 이를 통해 머신러닝 성능이 인간 수준 성능에 근접하는 시점에서 왜 발전을 이루기 더 어려워지는지 어느 정도 감이 오셨으면 합니다.

이번 사례에서는 0.7% 오류에 도달했을 때 아주 조심스럽게 베이즈 오류를 추정하지 않는 이상 베이즈 오류에서 얼마나 떨어져 있는지 알기 어렵습니다. 회피가능 편향을 얼마나 줄여야 할지도 모를 것이고요. 사실, 일반적인 의사 한 명의 오차율이 1%라는 사실만 알고 있다면 훈련 세트에 맞춰야 하는지 여부를 아는 것이 매우 까다로울 것입니다. 더군다나 이러한 문제가 이미 잘하고 있는 상황에서 생긴 것이기 때문에 더 힘들죠. 0.7%, 0.8%와 같이 인간 수준 성능과 거의 비슷한 시점에서 말이죠.

반면 왼쪽의 2가지 사례는 인간 수준 성능에서 멀리 떨어져 있는 상황이기 때문에 편향과 분산에 중점을 두기 쉬운 부분이 있었습니다. 이러한 사례들이 보여주듯이 인간 수준 성능과 가까운 선상에 있는 경우 편향과 분산 효과를 제거하기가 훨씬 더 어렵습니다. 그러므로 결과적으로는 더 잘할수록 머신러닝에서 발전을 이루기가 점진적으로 어려워지는 것입니다

---

![image](https://user-images.githubusercontent.com/55765292/180903161-3448f75d-3d3f-4cf3-8c6f-e77f18e5db09.png)

이야기했던 내용을 요약하자면 인간이 이미 잘 수행하는 업무에 대해 인간 수준 오류의 추정치를 가지고 있는 경우 편향와 편차를 이해하기 위해서는 인간수준 오류의 프록시 또는 베이즈 오류의 추정값을 사용할 수 있습니다. 베이즈 오류의 추정값 차이를 통해 회피가능 편향이 얼마나 문제가 되는지, 얼마나 있는지 알 수 있습니다. 또 훈련 오류와 개발 오류의 차이를 통해 분산이 얼마나 문제가 되는지 알고리즘이 훈련 세트에서 개발 세트로 일반화할 수 있는지를 파악할 수 있습니다.

이번 내용과 이전에 다뤘던 내용의 큰 차이는, 이전에는 훈련 오류를 0%와 비교하기보다는 이를 편향 추정 그 자체로 본 반면 이번에는 딱히 0% 예측값을 기대할 수 없다는 조금 미묘한 분석이 있는데요. 이유인즉슨 베이즈 오류가 0이 아닌 경우가 있고 가끔씩은 단순히 특정 한계치보다 더 좋은 결과가 나오는 것이 불가능하기 때문이죠.

따라서 이전 코스에서 우리는 훈련 오류를 측정했고, 훈련 오류가 0에 비해서 얼마나 큰지 확인했습니다. 편향이 얼마나 큰지 알아봤습니다. 이는 베이즈 오류가 0에 가까운 경우엔 잘 작동되었습니다. 고양이 인식 프로그램 같은 경우 말이죠. 이 경우, 인간이 거의 완벽하기 때문에, 베이즈 오류도 거의 완벽하다고 볼 수 있습니다.

따라서 베이즈 오류가 0에 가까울 경우 잘 작동하지만 그러나 때때로 말소리를 들을 수 없는 매우 시끄러운 오디오에서 음성을 인식하는 것과 같이 데이터에 노이즈가 많은 이런 경우 제대로 된 전사가 불가능하죠. 이런 문제의 경우 베이즈 오류에 대한 추정치를 더 정확히 알면 회피가능 편향과 분산을 더 정확히 추정할 수 있습니다.

따라서 편향 감소에 집중할지, 또는 분산 감소에 집중할지 적절한 결정을 내려야 합니다.

복습하자면, 인간 수준 성능의 추정치를 알면 베이즈 오류의 예상값을 알 수 있습니다. 그 다음 알고리즘에서 편향값을 줄일지 분산값을 줄일지 결정할 수 있습니다. 이런 테크닉은 인간 수준 성능을 넘기 전까지는 잘 작동할 것입니다. 그 이후로는 베이즈 오류 추정값을 구하기 어렵기 때문에 명확한 의사결정을 내리는데 어려움이 있을 수 있습니다. 딥 러닝 분야의 흥미로운 진화는
바로 더 많은 작업들이 인간 수준 성능을 능가해 진행되고 있다는 점입니다.
