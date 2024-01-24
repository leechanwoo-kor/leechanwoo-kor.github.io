---
title: "[TensorFlow] Sequences and Prediction (1)"
categories:
  - TensorFlow
tags:
  - Sequences
  - Time Series
toc: true
toc_sticky: true
toc_label: "Sequences and Prediction"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757){: .align-center width="50%" height="50%"}<br>

# Time Series examples

시계열이 무엇인지, 시계열의 다양한 유형에 대해 살펴보겠습니다.

시계열은 어디에나 있습니다. 주가, 일기 예보, 무어의 법칙과 같은 역사적 추세에서 시계열을 본 적이 있을 것입니다.

여기에서는 연도별 칩 출시량을 그룹화한 평방밀리미터당 트랜지스터 수를 플롯한 다음 첫 번째 데이터 항목에서 무어의 법칙 추세선을 그려서 상관관계를 확인했습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3f70991b-a222-4553-ab8e-978ae739b7c2){: .align-center width="75%" height="75%"}<br>

정말 재미있는 상관관계를 보고 싶다면, 타일러 비겐의 가짜 상관관계 사이트에 있는 상관관계를 참조하세요.

이 자료는 비디오 게임 아케이드에서 발생한 총 수익과 미국에서 수여된 컴퓨터 공학 박사 학위의 시계열 상관관계입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4d3b76e8-f2d9-4a68-869d-55412335ca6c){: .align-center width="75%" height="75%"}<br>

이 모든 것이 매우 익숙하지만 시계열이란 정확히 무엇일까요? 시계열은 일반적으로 시간에 따라 동일한 간격으로 정렬된 값의 시퀀스로 정의됩니다.

예를 들어, 무어의 법칙 차트에서는 매년, 일기 예보에서는 매일이 시계열입니다. 이러한 각 예에서는 각 시간 단계에 하나의 값이 존재하며, 따라서 이를 설명하기 위해 단변량이라는 용어가 사용됩니다.

각 시간 단계에 여러 값이 있는 시계열이 있을 수도 있습니다. 예상할 수 있듯이 이를 다변량 시계열이라고 합니다.

다변량 시계열 차트는 관련 데이터의 영향을 이해하는 데 유용한 방법이 될 수 있습니다.

예를 들어, 1950년부터 2008년까지 일본의 출생자 수와 사망자 수를 비교한 이 차트를 생각해 보겠습니다. 이 차트는 두 그래프가 수렴하는 것을 분명히 보여주지만, 사망자 수가 출생자 수를 앞지르기 시작하여 인구 감소로 이어집니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d059d1ea-3a19-4821-9749-896b7bd7806a){: .align-center width="75%" height="75%"}<br>

이제 두 개의 개별적인 단변량 시계열로 취급할 수 있지만, 다변량으로 함께 표시하면 데이터의 실제 가치가 분명해집니다.

또한 CO2 농도에 대한 지구의 기온을 보여주는 이 차트를 생각해 보십시오. 이 차트는 단변수로서 추세를 보여 주지만, 결합하면 데이터에 더 많은 가치를 부여하는 상관관계를 매우 쉽게 확인할 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af333de1-a528-44dd-b6d7-f1a969e26675){: .align-center width="75%" height="75%"}<br>

신체의 움직임도 일련의 단변량 또는 결합된 다변량으로 플로팅할 수 있습니다.

예를 들어 자동차가 이동하는 경로를 생각해 보겠습니다. 시간 단계 0은 특정 위도와 경도에 있습니다. 이후의 시간 단계에서는 자동차의 경로에 따라 이 값이 변경됩니다.

자동차의 가속도, 즉 자동차가 일정한 속도로 움직이지 않는다는 것은 시간 단계 사이의 공간도 크기가 변한다는 것을 의미합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5bc7794d-b6da-4a9e-877a-6cfe3a73a713){: .align-center width="75%" height="75%"}<br>

하지만 자동차의 방향을 단변수로 플롯한다면 어떨까요?

방향에 따라 자동차의 경도는 시간이 지남에 따라 감소하지만 위도는 증가한다는 것을 알 수 있으므로 다음과 같은 차트를 얻을 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f5fa5480-3f0d-46ec-b241-26eecca34411){: .align-center width="75%" height="75%"}<br>

<br>

# Common patterns in time series

시계열은 다양한 형태와 크기로 존재하지만, 몇 가지 매우 일반적인 패턴이 있습니다.

따라서 이러한 패턴을 볼 때 알아보는 것이 유용합니다. 몇 가지 예를 살펴보겠습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ad34bf7e-adef-4a7f-8162-a75fd36cd997){: .align-center width="75%" height="75%"}<br>

첫 번째는 시계열이 움직이는 특정 방향이 있는 **추세(trend)** 입니다.

앞서 살펴본 무어의 법칙의 예에서 볼 수 있듯이, 이는 상승하는 추세입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/14aa2d20-9568-43e9-aec7-986ff6389710){: .align-center}<br>

또 다른 개념은 예측 가능한 간격으로 패턴이 반복될 때 나타나는 **계절성(seasonality)** 입니다.

예를 들어, 소프트웨어 개발자를 위한 웹사이트의 활성 사용자를 보여주는 이 차트를 살펴보세요. 이 차트는 매우 뚜렷한 패턴의 규칙적인 하락을 따릅니다.

그게 무엇인지 짐작할 수 있을까요? 만약 5단위까지 상승했다가 2단위까지 하락했다고 하면 어떨까요?

그러면 근무자가 적은 주말에 매우 뚜렷하게 하락하므로 계절성을 보인다는 것을 알 수 있습니다.

다른 계절적 시계열로는 주말에 최고치를 기록하는 쇼핑 사이트나 드래프트나 개막일, 올스타전 플레이오프, 챔피언 결정전 등 연중 다양한 시기에 최고치를 기록하는 스포츠 사이트가 있을 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ba876c9e-a537-4426-ab26-fe02e0e2f9e4){: .align-center width="75%" height="75%"}<br>

물론 이 차트에서 볼 수 있듯이 일부 시계열에는 추세와 계절성이 함께 나타날 수 있습니다.

전반적인 상승 추세는 있지만 국지적인 최고점과 최저점이 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/755699ac-e988-42c8-a6b2-b5cafa60b926){: .align-center width="75%" height="75%"}<br>

물론 예측이 전혀 불가능하고 무작위 값의 집합으로 이루어진, 일반적으로 **백색소음(white noise)**라고 불리는 것도 있습니다. 이러한 유형의 데이터로 할 수 있는 일은 많지 않습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ed096a2-b6e1-480b-a81a-a14cb2b8a3af){: .align-center width="75%" height="75%"}<br>

하지만 이 시계열을 생각해 보세요. 추세도 없고 계절성도 없습니다.

스파이크는 임의의 타임스탬프에 나타납니다. 다음에 언제 그런 일이 일어날지, 얼마나 강할지 예측할 수 없습니다.

하지만 분명한 것은 전체 시리즈가 무작위적이지 않다는 것입니다. 스파이크 사이에는 매우 결정적인 유형의 감쇠가 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2f67247a-23fc-437b-a0ec-aa7d977fd14d){: .align-center width="75%" height="75%"}<br>

여기서 각 시간 단계의 값은 이전 시간 단계 값의 99%에 가끔씩의 스파이크를 더한 값이라는 것을 알 수 있습니다.

이것은 **자기 상관(autocorrelation) 시계열** 입니다. 즉, 흔히 지연이라고 하는 지연된 복사본과 상관 관계가 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b61e3e80-8217-4628-bede-14c7efe10687){: .align-center width="75%" height="75%"}<br>

이 예제에서는 지연 1에서 강력한 자기 상관 관계가 있음을 알 수 있습니다. 종종 이와 같은 시계열은 이전 단계에 따라 단계가 달라지기 때문에 메모리가 있는 것으로 설명됩니다.

예측할 수 없는 스파이크는 종종 혁신이라고 불립니다. 즉, 과거 값을 기반으로 예측할 수 없다는 뜻입니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8c2de107-f680-40a2-9be6-f41b09d29b12){: .align-center width="75%" height="75%"}<br>

또 다른 예는 시간 단계 1과 50에서 여러 개의 지기 상관관계가 있는 경우입니다. 지연 1의 자기 상관관계는 매우 빠른 단기 지수 지연을 제공하고, 50은 각 스파이크 이후의 작은 균형을 제공합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e92a67a5-b127-4871-8cfe-ad1388b184c1){: .align-center width="75%" height="75%"}<br>

실생활에서 접하게 되는 시계열에는 추세, 계절성, 자기 상관관계, 노이즈 등 이러한 특징이 각각 조금씩 포함되어 있을 것입니다.

지금까지 살펴본 바와 같이 머신러닝 모델은 패턴을 발견하도록 설계되었으며, 패턴을 발견하면 예측을 할 수 있습니다. 대부분의 경우 예측할 수 없는 노이즈를 제외하고는 시계열에서도 작동할 수 있습니다.

하지만 이는 과거에 존재했던 패턴이 당연히 미래에도 계속될 것이라는 가정 하에 이루어진다는 점을 인식해야 합니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0936cbb1-8b01-44ab-bfd6-4a5df1a4a46e){: .align-center width="75%" height="75%"}<br>

물론 실제 시계열이 항상 그렇게 단순하지는 않습니다. 시간이 지남에 따라 행동이 급격하게 변할 수 있습니다.

예를 들어, 이 시계열은 시간 단계 200까지 양의 추세와 뚜렷한 계절성을 보였습니다. 그러나 어떤 일이 발생하여 그 행동이 완전히 바뀌었습니다. 

이것이 주식, 가격이라면 큰 금융 위기나 큰 스캔들 또는 파괴적인 기술 혁신으로 인해 엄청난 변화가 일어났을 수 있습니다. 그 후 시계열은 뚜렷한 계절성 없이 하향 추세를 보이기 시작했습니다.

이를 일반적으로 **비정상적 시계열(Non-stationary Time Series)** 이라고 부릅니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a2276462-973d-43df-9dbf-9bf41c159c1b){: .align-center width="75%" height="75%"}<br>

이를 예측하려면 제한된 기간 동안만 훈련하면 됩니다.

예를 들어, 여기서는 마지막 100보만 걸었습니다. 전체 시계열로 훈련했을 때보다 더 나은 성과를 얻을 수 있을 것입니다.

하지만 이는 데이터가 많을수록 더 좋다고 가정하는 일반적인 머신러닝의 틀을 깨는 것입니다.

하지만 시계열 예측의 경우 시계열에 따라 달라집니다.

시계열이 정태적이라면, 즉 시간이 지나도 그 행동이 변하지 않는다면 좋습니다. 데이터가 많을수록 좋습니다.

그러나 시계열이 고정되어 있지 않다면 학습에 사용해야 하는 최적의 시간 윈도우가 달라집니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3f4e77cd-c3ce-4b0d-8735-d457d02a0ad0){: .align-center width="75%" height="75%"}<br>

이상적으로는 전체 시리즈를 고려하여 다음에 일어날 수 있는 일에 대한 예측을 생성할 수 있기를 바랍니다. 보시다시피, 지금과 같은 급격한 변화를 고려할 때 이것이 항상 생각만큼 간단하지는 않습니다.