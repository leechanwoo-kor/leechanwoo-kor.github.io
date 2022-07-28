---
title: "[Ⅲ. Structuring Machine Learning Projects] Mismatched Training and Dev/Test Set (1)"
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
toc_label: "Mismatched Training and Dev/Test Set (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## Error Analysis

### Training and Testing on Different Distributions

딥 러닝 알고리즘은 많은 훈련 자료를 수집하고자 합니다. 표기된 훈련 자료들을 훈련 세트에 충분히 넣었을 때 가장 잘 작동하기 때문이죠.

이 때문에 많은 팀들은 더 많은 훈련 데이터를 얻기 위해 가능한 모든 데이터를 수집하고 이를 훈련 세트에 밀어넣게 되었습니다. 이 데이터 중 일부 혹은 상당 부분이 개발이나 시험 데이터와 같은 분포가 아닐 수 있는데도요.

딥 러닝 시대에는 점점 더 많은 팀들이 개발과 시험 세트와 다른 분포에서 온 데이터로 훈련을 진행하고 있습니다. 여기 훈련 및 시험 분포가 서로 다를 때 처리하기 위한 몇 가지 미묘한 부분들과모범 사례가 있습니다. 한번 자세히 살펴볼까요.

---

![image](https://user-images.githubusercontent.com/55765292/181415000-f3f24989-31f0-427c-bfa1-41fc074856b6.png)

유저가 핸드폰으로 찍은 사진을 업로드하는 앱을 만든다고 가정하고 유저가 업로드한 사진이 고양이인지 아닌지 인식하고 싶다고 해 봅시다. 이제 데이터를 두 개의 출처에서 가져올 수 있는데요.

하나는 여러분이 중요하게 생각하는 데이터 분포입니다. 오른쪽과 같은 모바일 앱 데이터죠 아마추어가 촬영해 덜 전문적이고 덜 프레이밍되고, 더 희미할 수 있습니다. 그리고 나머지 데이터는 웹에서 그냥 다운받을 수 있습니다.

이 예시에서는 아주 전문적으로 프레이밍된 고해상도의 전문적으로 찍힌 고양이 사진을 많이 다운받을 수 있다고 가정합시다. 그리고 앱 유저가 아직 그리 많지 않다고 가정합시다. 어쩌면 사진 만 개를 모바일 앱에 업로드했을지도 모릅니다.

그러나 인터넷에서는 대량의 고양이 사진을 다운받을 수 있죠. 사진 20만 개를 다운받았을 수도 있습니다.

여러분이 정말 원하는 것은 최종 시스템이 모바일 앱 이미지 분포에서 잘 작동하는 것이겠죠? 왜냐하면 유저들은 오른쪽과 같은 사진을 업로드할 것이기에 분류기가 그런 사진들을 잘 분류해야 하기 때문입니다.

하지만 지금 상대적으로 데이터 세트가 작다는 약간의 딜레마가 있습니다. 그 분포에서 나온 예시는 만 개 정도밖에 없고 다른 분포에서 나온 데이터 세트는 훨씬 큽니다. 실제로 원하는 이미지와는 다른 이미지들입니다.

그렇다고 이미지 만 개만 사용하고 싶지는 않을 겁니다. 훈련 세트가 상대적으로 작아질 테니까요.

또 이미지 20만 개가 유용할 것 같지만 이는 원하는 분포와는 다르다는 문제가 있습니다.

그러면 어떻게 해야 할까요?

여기 옵션 하나가 있습니다. 당신이 할 수 있는 하나의 방법은 두개의 데이터 세트를 함께 연결하여 210,000 이미지를 갖게되는거죠. 그리고 당신은 210,000 이미지를 랜덤으로 섞어 개발과 테스트 세트에 넣어 줍니다.

여기서 잠깐 개발과 시험 세트에 각각 2,500개의 예시가 있다고 해 봅시다. 그러면 훈련 세트에는 예시 20만 5천개가 있을 겁니다. 이런 데이터 설정에는 몇 가지 장점이 있지만 단점도 있습니다.

장점은 이제 훈련, 개발, 시험 세트가 모두 같은 분포에서 오기에 관리가 쉽다는 것입니다. 하지만 여기에는 상당한 단점이 있는데요. 이 2,500개의 예시가 있는 개발 세트를 보면 그 중 상당수가 웹페이지 이미지 분포에서 옵니다. 여러분이 실제로 중요하게 생각하는 모바일 앱 이미지 분포가 아니라요.

그래서 여러분의 총 데이터는 웹페이지에서 온 210,000 줄여서 210k 중 200,000, 줄여서 200k입니다. 그래서 이 2500개 기대 예시 중 2381개는 웹페이지에서 올 것입니다. 이는 예상치이고 실제 수치는 랜덤 셔플 방식에 따라 달라질 것입니다.

하지만 평균적으로 119개만이 모바일 앱 업로드에 이용될 것입니다. 그러니 개발 시스템 설정은 곧 팀이 어디에 목표를 두는지 가리킨다는 것을 기억하세요.

그런데 여기서 목표 겨냥을 위해서는 웹페이지 이미지 분포 최적화에 대부분의 시간을 쏟아야 합니다. 이는 원하는 바가 아닐 것입니다. 그래서 저는 옵션 1을 추천하지는 않습니다.

이는 팀으로 하여금 실제로 원하는 데이터 분포와 다른 데이터 분포에 맞춰 개발 세트를 최적화하게 하는 것이기 때문입니다. 이렇게 하는 것보다 다른 옵션을 추천드립니다.

훈련 세트가 여전히 이미지 20만 5천 개라고 하면 저는 트레이닝 세트가 웹에서 온 200,000개의 이미지로 하겠습니다. 원한다면 모바일 앱 이미지 5천개를 추가합니다.

이후 개발과 시험 세트에는 모두 모바일 앱 이미지가 됩니다. 훈련 세트는 웹에서 온 이미지 20만개와 모바일 앱 이미지 5천개를 포함하게 됩니다. 개발 세트는 모바일 앱에서 온 이미지 2,500개 시험 세트는 모바일 앱에서 온 이미지 2,500개일 것입니다.

데이터를 이처럼 훈련, 개발 시험으로 나누게 되면 원하는 곳에 목표를 둘 수 있습니다. 개발 세트에 모바일 앱에서 업로드된 데이터가 있다고 팀에 얘기할 수 있는데 이는 여러분이 정말 원하는 이미지 분포입니다.

그럼 이제 모바일 앱 이미지 분포에서 잘 작동하는 머신러닝 시스템을 만들어 봅시다. 물론 단점은 훈련 분포가 개발 및 시험 세트 분포와 다르다는 것입니다.

그러나 이렇게 훈련, 개발, 시험으로 나뉜 데이터는 장기적으로 훨씬 더 좋은 성과를 가져다 줄 것입니다.

개발/시험 세트와 다른 분포에서 온 훈련 세트를 다루는 상세한 테크닉에 대해서는 나중에 논의해보겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/181415046-eb793c6e-c142-4d17-9bbd-7483c14df107.png)

다른 예제를 보시죠 음성으로 작동되는 최신형 자동차 백미러를 만든다고 가정해봅시다. 이는 중국에 실제 존재하는 제품입니다. 여기 이 부분에 대신 음성인식 백미러를 부착하면 백미러와 얘기할 수 있습니다.

> 백미러야, 가장 가까운 주유소로 가는 길을 알려줘

라고 하면 백미러가 알아서 안내합니다. 이 실제 제품을 여러분 국가용으로 만든다고 합시다. 어떻게 데이터를 가져와 이 제품의 음성 인식 시스템을 훈련하실 건가요?

어쩌면 음성인식 쪽에서 오랫동안 일해 오셔서 그리하여 다른 음성인식 앱에 대한 데이터들이 많으실 수도 있습니다. 음성 인식 백미러 데이터가 아닐 뿐이죠. 여기 훈련 데이터를 개발과 시험 세트로 나눌 수 있는 방법이 있습니다.

훈련을 위해서는 음성 쪽에서 일하며 축적해 온 모든 음성 데이터, 예를 들어 몇년동안 다양한 음성인식 데이터 벤더에서 구매한 데이터를 이용할 수 있습니다.

그리고 오늘날에는 실제로 벤더에서 x, y쌍 데이터를 구매할 수 있습니다. 이 때 x는 오디오 클립이고
y는 전사 기록입니다.

혹은 스마트 음성 지원이 되는 스마트 스피커와 관련된 일을 해 보셔서 관련 데이터들을 갖고 계실 수도 있지요. 어쩌면 키보드 음성지원 등에 관련된 일을 해 보셨을 수도 있습니다.

이해를 돕기 위한 추가 예시로 이 모든 출처에서 온 50만 개의 음성이 있다고 가정하겠습니다. 개발 및 시험 세트의 경우 실제로 음성 인식 백미러에서 사용된 것보다 데이터 세트가 훨씬 더 작을 수 있습니다.

유저들이 길찾기 관련 질문을 하거나 다양한 장소에 대한 길찾기를 찾으려 하니 이 데이터 세트에는 많은 거리 주소 데이터가 포함될 수 있겠죠? 다음 주소로 가는 길 안내해 주세요 라던지 이 주유소로 가는 길 좀 안내해 주세요 등이요.

그래서 이 데이터 분포는 왼편과는 아주 다른 모습입니다. 하지만 이것이 여러분이 정말 원하는 유형의 데이터입니다. 제품이 잘 작동되게 하는 데이터니까요 이게 개발/시험 세트 데이터가 돼야 합니다.

이 예시의 훈련 세트에는 왼쪽의 utterance 50만 개 각각 D와 T라고 부를 개발/시험 세트는 각각 utterance 만 개가 있다고 하겠습니다. 이는 실제 음성인식 백미러에서 따온 것입니다.

또는 음성인식 백미러에서 나온 예시 2만 개를 모두 개발/시험 세트에 넣을 필요가 없다고 생각하면 그 반을 떼서 훈련 세트에 넣어도 됩니다.

그럼 훈련 세트는 왼쪽의 utterance 50만 개와 백미러의 만 개를 포함해 총 51만 개의 utterance로 구성될 것입니다 개발/시험 세트는 각각 5천 건 정도 될 것입니다.

2만 개의 utterance 중 만 개는 훈련 세트로 5천 개는 개발 세트로 5천 개는 시험 세트로 갈 것입니다.

이는 데이터는 훈련, 개발, 시험 세트로 나누는 또 다른 합리적인 방법입니다. 또 이는 50만 건이 넘는
큰 훈련 세트를 제공합니다. 훈련 세트에 음성인식 백미러 데이터만 사용하는 경우보다 훨씬 크죠.


---

언제 훈련 세트의 데이터를 개발/시험 세트의 데이터와 다른 분포로 구성해 더 많은 훈련 데이터를 확보할 수 있는지 몇 가지 예를 보셨는데요.

이 예시에서는 이를 통해 학습 알고리즘이 더 잘 작동하는 모습을 보실 수 있습니다. 이제 항상 갖고 있는 데이터를 다 써야 하나 라는 의문이 드실 수 있습니다. 대답은 항상 그렇지는 않다입니다. 다음에서는 반대되는 예를 보겠습니다