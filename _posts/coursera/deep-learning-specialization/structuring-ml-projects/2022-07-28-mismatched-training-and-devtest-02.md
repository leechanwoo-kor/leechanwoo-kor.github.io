---
title: "[Ⅲ. Structuring Machine Learning Projects] Mismatched Training and Dev/Test Set (2)"
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
toc_label: "Mismatched Training and Dev/Test Set (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## Mismatched Training and Dev/Test Set

### Bias and Variance with Mismatched Data Distributions

학습 알고리즘의 편향과 분산 값 예측은 해야 할 작업의 우선순위를 결정하는 데 도움을 줍니다. 하지만 훈련 세트가 개발/시험 세트와 다른 분포에서 오는 경우 편향과 분산을 분석하는 방법이 달라집니다. 한번 살펴보겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/181418524-55f59587-9bf2-4abe-b7f2-14bedc266c16.png)

계속해서 고양이 분류기 예시로 보겠습니다. 인간은 이 작업에서 거의 완벽에 가까운 능력을 보인다고 가정해 봅시다. 그러면 베이즈 오류/베이즈 최적화 오류가 이 문제의 경우 0%임을 알 수 있습니다. 오류 분석을 하기 위해서는 보통 훈련 오류를 보고 개발 세트의 오류도 봅니다.

이번 예시에서 훈련 오류는 1% 개발 오류는 10%라고 해 보겠습니다. 만약 개발 데이터가 훈련 세트와
동일한 분포에서 왔다면 아주 큰 분산 문제가 생길 것입니다.

알고리즘이 훈련 세트를 잘 일반화시키지 못하는 것이죠. 개발 세트에서는 잘 했는데 갑자기 문제가 생기는 겁니다. 하지만 훈련 데이터와 개발 데이터가 다른 분포에서 올 때에는 이렇게 쉽게 단정할 수 없습니다.

또 사실 저게 개발 세트에서 잘 하고 있는 모습인지도 모릅니다. 훈련 세트가 고해상도에 아주 선명한 이미지로 되어 있었기 때문에 훈련 세트는 아주 쉬웠고 개발 세트가 훨씬 더 어려웠을 수도 있습니다. 

그래서 사실 분산 문제가 없을 수 있고 지금의 결과는 개발 세트에 정확히 분류하기 어려운 이미지들이 더 많이 포함되어 있음을 반영하는 것일 수 있습니다.

이 분석의 문제는 훈련 오류에서 개발 오류로 넘어갔을 때 한 번에 두 가지가 바뀌었다는 것입니다.

먼저 알고리즘이 훈련 세트에서는 데이터를 봤지만 개발 세트에서는 아니었다는 것입니다. 다음으로는 개발 세트의 데이터 분포가 다릅니다.

그리고 두 가지를 한번에 바꾸었기 때문에 9%로 증가한 오류 중 얼마만큼이 알고리즘이 개발 세트에 있는 데이터를 보지 못해 생기는 오류인지 알기 어렵습니다. 이건 분산에서 오는 문제겠죠.

또 얼마만큼의 오류가 단순히 개발 세트 데이터가 달라서 생기는 것인지 구분하기도 쉽지 않습니다.

이런 효과들을 확인하기 위해서는 훈련-개발 세트라고 부를 새로운 데이터를 정의하는 것이 도움이 될 것입니다. 이것이 새로운 데이터의 부분집합인데요.

일부 추출해서 빼낸 이 데이터는 훈련 세트와 동일한 분포를 가집니다. 하지만 신경망 네트워크에서 따로 훈련시키는 데이터는 아닙니다.

이게 어떤 뜻이냐면 이전에는 일부 훈련 세트와 개발 세트, 그리고 시험 세트를 이렇게 설정했었습니다. 개발과 시험 세트는 같은 분포를 훈련 세트는 다른 분포를 가질 것입니다.

이제는 훈련 세트들을 무작위로 섞은 뒤 일부 훈련 세트를 추출해 이를 훈련-개발 세트라고 할 것입니다. 개발과 시험 세트가 같은 분포로 되어 있듯 훈련 세트와 훈련-개발 세트도 같은 분포로 되어 있을 것입니다.

하지만 차이점은 이제 신경망을 훈련 세트에서만 훈련시킨다는 것입니다. 훈련-개발 부분에서는 따로 훈련을 진행하지 않을 것입니다. 오류 분석을 위해서는 인식기의 오류를 훈련 세트에서 보고 훈련-개발 세트 개발 세트에서도 봐야 합니다.

이번 예시에서는 훈련 오류가 1% 훈련-개발 세트에서의 오류는 9% 개발 세트에서의 오류는 전과
마찬가지로 10%라고 해 봅시다.

여기서 내릴 수 있는 결론은 훈련 데이터에서 훈련 개발 데이터로 넘어갈 때 오류가 많이 늘었다는 것입니다. 그리고 훈련 데이터와 훈련-개발 데이터의 유일한 차이는 신경망이 이 첫 부분을 다뤘다는 것입니다.

이 부분에 대한 훈련은 확실히 받았지만 훈련-개발 데이터의 경우 그렇지 못했습니다. 이런 부분은 바로 분산 문제가 있다는 걸 말해 주는데요. 훈련-개발 오류가 훈련 세트와 같은 분포도를 가진 데이터로 측정되었기 때문에 그렇습니다.

이제 신경망이 훈련 세트에서 잘 작동하더라도 같은 분포에서 온 훈련-개발 세트의 데이터에 대한 일반화가 잘 되지 않는다는 것을 알게 되었습니다. 같은 분포를 가졌더라도 처음 보는 데이터에 대한 일반화는 잘 되지 않는 것입니다.

이 예시에서는 그렇기 때문에 분산 문제가 발생합니다.

또 다른 예시를 보겠습니다. 훈련 오류가 1% 훈련-개발 오류가 1.5%라고 해 보죠. 그런데 개발 세트에서는 오류가 10%입니다. 이 경우 낮은 분산 문제가 있습니다. 왜냐하면 신경망이 이미 본 적 있는 훈련 데이터에서 본 적이 없는 훈련-개발 데이터로 갈 때는 오류가 약간만 올라가다가 이후 개발 세트로 가자 급상승합니다.

이는 전형적인 데이터 불일치 문제입니다. 데이터가 일치하지 않는 것이죠. 학습 알고리즘이 훈련-개발이나 개발 데이터로 훈련된 것이 아니기 때문입니다.

또 이 두 데이터 세트는 서로 다른 분포에서 왔습니다. 어떤 알고리즘을 학습해도 훈련-개발에선 잘 작동하고 개발에서는 잘 작동하지 않습니다. 알고리즘이 왜인지 여러분이 중요하게 생각하는 분포와 다른 분포에서 잘 작동하는 법을 배우게 된 것입니다.

이를 데이터 불일치 문제라고 합니다.

몇 가지 예시를 더 보겠습니다. 훈련 오류, 훈련-개발 오류 개발 오류입니다. 훈련 오류는 10% 훈련-개발 오류는 11% 개발 오류는 12%입니다 Bayes 오류에서 인간의 프록시 레벨은 약 0%입니다.

이런 종류의 성능이 있다면 편향이 생기는데요 회피가능 편향 문제입니다. 인간 수준보다 훨씬 떨어지기 때문이죠. 따라서 이것은 실제로 높은 편향 설정입니다.

마지막 예시입니다. 훈련 오류가 10% 훈련-개발 오류가 11% 개발 오류가 20%이면 두 가지 이슈가 있어 보입니다.

첫째, 회피가능 편향이 꽤 높습니다 훈련 세트에서조차 그리 잘하고 있지 않기 때문이죠. 인간은 0% 오류에 가까운 반면 우리의 훈련 세트는 10%의 오류를 내고 있습니다.

분산은 조금 작아 보이는데요. 데이터 불일치는 꽤 큽니다. 이 예시에서는 편향 혹은 회피가능 편향 문제 데이터 불일치 문제가 크다고 볼 수 있습니다.

이제 다룬 내용을 보고 일반적인 원리를 적어보겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/181418546-98ae14fa-f182-4684-ad2d-ccdd16c1c18e.png)

가장 핵심적으로 볼 부분은 훈련-개발 세트 오류입니다. 이는 훈련 세트와 동일한 분포를 갖는데요. 여기에서 훈련시키지는 않았습니다.

개발 세트 오류, 그리고 이런 오류 간의 차이에 따라 회피가능 편향과 분산이 얼마나 큰지 감을 잡을 수 있습니다. 데이터 불일치 문제도 말이죠.

이제 인간 수준 오류가 4%라고 해 봅시다. 훈련 오류는 7% 훈련-개발 오류는 10%입니다. 그리고 개발 오류는 12%입니다.

이를 통해 회피가능 편향에 대한 감이 오실 텐데요. 알고리즘이 훈련 세트에서 인간 수준 성능만큼 혹은 이와 비슷한 수준으로 작동하길 바라실 테니까요. 이것으로 분산 수준을 짐작할 수 있습니다.

훈련 세트에서 훈련-개발 세트로 일반화를 얼마나 잘 할 수 있을까요?

이것은 데이터 불일치 수준을 나타내는 척도입니다. 엄밀히 이야기하면 하나를 더 추가할 수 있습니다. 바로 시험 세트 성능입니다. 시험 오류도 적겠습니다.

시험 세트에서는 개발을 진행하지 않는 것이 좋습니다. 자칫해서 시험 세트를 과적합하는 일이 없도록 해야 하니까요. 하지만 여기 이 차이를 보시면 개발 세트에 과적합하는 정도를 알 수 있습니다. 만약 개발 세트 성능과 여러분의 시험 세트 성능에 큰 차이가 있다면 개발 세트에 대해 과한 조정이 들어간 것일 수 있습니다.

이런 경우 더 큰 개발 세트를 찾아야겠지요?

개발 세트와 시험 세트는 같은 분포를 갖고 있다는 것을 기억하세요. 즉 시험 세트보다 개발 세트에서 더 좋은 성과를 내면서 큰 격차를 만들 수 있는 유일한 방법은 어떻게든 개발 세트를 과적합하는 것입니다.

이런 경우 다시 돌아가 개발 세트 데이터를 더 수집하는 것을 고려해볼 수 있습니다. 여기 이렇게 숫자를 적었는데요. 목록을 따라 내려갈 때 숫자는 항상 올라갑니다.

여기 항상 그렇지만은 않은 경우의 예시가 있습니다.

인간 수준 성능이 4% 훈련 오류가 7% 훈련-개발 오류가 10%인 경우 개발 세트로 간다고 해 봅시다. 놀랍게도 개발 세트에서 훨씬 좋은 결과가 나오는 것을 발견합니다. 여기도 6%일 수 있는 거죠.

이런 효과를 본 적 있으실 텐데요. 음성인식 작업에서 훈련 데이터가 개발 세트와 시험 세트보다 훨씬 어려워진 경우 말이죠.

이 두 개는 훈련 세트 분포에서 평가됐고 여기 두 개는 개발/시험 세트 분포에서 평가됐습니다. 그래서 간혹 개발/시험 세트 분포가 작업 중인 응용 프로그램에서 더 쉬운 경우 이 숫자는 내려갈 수 있습니다.

이런 재미있는 경우를 마주할 때 분석에 도움이 될 수 있는 더 일반적인 공식이 있습니다

---

![image](https://user-images.githubusercontent.com/55765292/181418578-83e48355-a755-43ff-90b2-35a70552e48c.png)

음성으로 활성화되는 백미러에 대한 예시로 동기 부여를 해 보겠습니다. 지금까지 적고 있었던 숫자들을 표에도 배치할 수 있는데요. 가로 축에는 다른 데이터 세트를 배치할 것입니다.

예를 들어, 일반 음성 인식 작업에서 가지고 온 데이터가 있을 수 있습니다. 작은 스피커를 가지고 여러 음성 인식 문제에서 수집한 데이터 또는 구매한 데이터 등이 있습니다.

또 차 안에서 녹음된 백미러 전용 음성 데이터도 있습니다. 표의 이 x축에서 데이터 세트를 변경해 보겠습니다. 여기 다른 축에는 다른 데이터 검사법이나 알고리즘을 나타낼 것입니다.

첫번째로, 인간 수준 성능이 있습니다. 이 데이터 세트들에서 인간이 얼마나 정확한지 알아보는 방법입니다. 그리고 교육시킨 신경망 네트워크에 있는 예제에 오류도 있습니다. 마지막으로 신경망이 훈련하지 않은 example들의 오류가 있습니다.

이전에 언급했던 인간 수준은 여기에 들어갑니다. 이 데이터 카테고리에서 인간이 얼마나 잘 하는지에 대한 수치입니다.

각종 음성인식 작업에서의 데이터 훈련 세트에 넣을 수 있는 발화 500,000개가 있다고 해 봅시다. 이전 예시에서 이 수치는 4%입니다. 여기 있는 이 숫자는 훈련 오류입니다. 이전 예시에서는 7%였습니다.

만약 학습 알고리즘이 이 예시를 봤고 이 예시에 대한 경사 하강법을 보였으며 이 예시가 훈련 세트 분포에서 온 경우 또는 일반 음성 인식 분포에서 온 경우 알고리즘은 훈련 예시에서 얼마나 잘 작동할까요?

여기는 훈련-개발 세트 오류입니다. 보통 이것보다 큰데요. 이 분포에서 온 음성 인식데이터에 대한 것입니다. 만약 알고리즘이 이 분포에서 온 예시로 훈련되지 않았을 경우 얼마나 잘 작동할까요?

이것을 바로 훈련 개발 오류라고 합니다. 그리고 오른쪽으로 이동하면 이 박스가 보이시죠. 이것은 개발 세트 오류입니다. 시험 세트 오류도 될 수 있습니다. 방금 전 예시에서는 6%였죠.

개발과 시험 오류는 엄밀히 이야기하면 두 개의 숫자인데요. 둘 중 하나가 여기 박스에 들어갈 수 있습니다.

이것은 백미러에서 얻은 데이터가 있을 경우입니다. 자동차 백미러 프로그램에서 실제로 녹음된 데이터죠. 그런데 신경망이 이 예시에 대해 오차역전파를 진행하지 않았다면 어떤 오류가 있는 걸까요?

이전에는 이 두 숫자의 차이, 이 두 숫자의 차이 또 이 두 숫자의 차이를 분석했습니다. 그리고 이 차이는 회피가능 편향값입니다. 이 차이는 분산값입니다. 그리고 이 차이는 데이터 불일치 값입니다.

그리고 남아있는 두 개의 엔트리를 여기 이 표에 넣는 것도 유용할 수 있습니다. 만약 이 값도 6%인 경우 이 값은 사람들에게 자동차 백미러 음성 데이터를 라벨링하라고 한 뒤 이들이 얼마나 잘 하는지 측정해 얻을 수 있습니다. 또 이것도 6%일 수 있겠죠. 이 때는 백미러 음성 데이터를 가지고 와서 훈련 세트에 넣습니다. 신경망이 학습할 수 있도록요.

그런 다음 그 데이터 일부에 대한 오류를 측정합니다 그렇게 했는데 이 값이 나온다면 이미 백미러 음성 인식 데이터에 대해서는 인간 수준의 성능을 내고 있는 것입니다. 즉 이 데이터 분포에서는 꽤 잘 하고 있는 것으로 볼 수 있겠죠.

이런 부가적 분석을 할 경우 한 가지 방향이 항상 뚜렷히 제시되지는 않습니다. 하지만 부가적인 인사이트를 제공하기도 하죠.

예를 들어 이 두 개의 숫자를 비교하면 인간은 자동차 백미러 음성 인식 데이터를 일반 음성 인식보다 어려워한다는 것을 알 수 있습니다. 인간이 4%가 아니라 6%의 오류값을 갖기 때문입니다.

또 이런 차이들을 보면 편향과 분산, 데이터 불일치 문제를 다양한 각도로 이해할 수 있습니다. 이렇게 보다 일반적인 공식이 제가 몇 번 사용한 방법입니다.

여러 문제에 대해 엔트리 일부를 조사하고 이 차이들을 보면 향후 방향에 대한 감이 옵니다. 한편 때로는 이 표 전체를 채우는 것이 추가 인사이트를 얻는 데 도움이 될 수 있습니다.

마지막으로, 예전에 편향 해결을 위한 방법들 분산을 다루는 기술에 대해서도 얘기했었는데요. 그러면 데이터 불일치는 어떻게 다룰 수 있을까요?

특히 개발 및 시험 세트와 다른 분포에서 가져온 데이터를 훈련하면 데이터를 더 많이 얻을 수 있고 학습 알고리즘의 성능 개선에 많은 도움이 될 수 있습니다.

이제 편향과 분산 문제 뿐 아니라 새로운 잠재적 데이터 불일치 문제도 생겼는데요. 데이터 불일치를 해결할 수 있는 특별히 좋은 방법이 있을까요?

솔직히 말씀드리자면 데이터 불일치를 다루는 훌륭하거나 체계적인 방법은 없습니다만 몇 가지 도움이 될 수 있는 방법이 있습니다.

개발/시험 세트와 다른 분포에서 온 훈련 데이터를 이용하면 더 많은 데이터를 얻을 수 있고 학습 알고리즘 성능 향상에 도움이 될 수 있습니다. 편향/분산과 같은 두 가지 잠재적인 문제를 넘어 세 번째 문제인 데이터 불일치도 발생할 수 있는데요.

만약 오류 분석을 통해 데이터 불일치가 오류의 주된 원인이라는 결론이 나온다면 이를 어떻게 해결할 수 있을까요? 안타깝게도 데이터 불일치 해결을 위한 체계적인 해결책은 없지만 그래도 어느 정도 도움이 되는 방법들이 있습니다 다음에 보도록 하겠습니다
