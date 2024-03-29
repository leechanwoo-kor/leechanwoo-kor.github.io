---
title: "[Ⅲ. Structuring Machine Learning Projects] End-to-end Deep Learning (2)"
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
toc_label: "End-to-end Deep Learning (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## End-to-end Deep Learning

### Whether to use End-to-end Deep Learning

머신러닝 시스템을 구축할 때 종단간 접근법 사용 여부를 결정하려고 한다고 가정해 보겠습니다. 종단간 딥 러닝의 장단점을 살펴본 뒤 이것이 응용 분야에 유망한지 아닌지에 대한 가이드라인을 도출해 보겠습니다.

---

<img width="1116" alt="image" src="https://user-images.githubusercontent.com/55765292/182770996-d84200ac-a3cf-41e6-aedf-d2c5d36c4e22.png">

다음은 종단간 학습을 적용하여 얻을 수 있는 몇가지 이점입니다.

첫째, 종단간 학습은 데이터를 순수하게 반영할 수 있게 해 줍니다. 만일 X, Y데이터를 충분히 가지고 있다면 충분히 큰 신경망을 훈련시킬 경우 신경망은 X에서 Y에 이르기까지 가장 적절한 기능 매핑을 알아낼 것입니다. 순수한 머신러닝 접근법을 사용하면 X에서 Y에 이르기까지의 신경망 학습 입력값이 데이터에 있는 모든 통계를 더 잘 캡처할 수 있을 것입니다. 인간의 선입견을 강제로 반영하기보다요.

예를 들어, 음성 인식의 경우 이전의 음성 인식 시스템은 캣이라는 단어에 대해 ㅋ, ㅐ, ㅅ과 같은 기본 소리 단위인 음소라는 개념을 가지고 있었습니다. 제 생각에 음소는 인간 언어학자들이 만들어 낸 유물입니다. 음소란 언어를 합리적으로 묘사하고 싶은 언어학자들의 환상이라고 생각합니다.

하지만 학습 알고리즘까지 이런 음소로 생각하게 하고 싶지는 않지요. 그리고 만약 학습 알고리즘에 음소 사용을 강요하는 대신 그 알고리즘이 원하는 표현을 배우게 한다면 전체적인 성능은 더 좋아질 수 있습니다. 종단간 딥 러닝의 두 번째 이점은 필요한 구성요소를 직접 설계하는 일이 적다는 것입니다.

이렇게 하면 설계 작업 흐름을 단순화할 수 있습니다. 특성이나 중간 표현을 직접 설계하는 데 많은 시간을 들이지 않아도 됩니다.

그러면 단점은 뭘까요? 여기 몇 가지 단점이 있습니다.

첫째, 데이터가 많이 필요할 수 있습니다. 이 X-Y매핑을 직접 학습하려면 많은 X, Y데이터가 필요합니다. 이전에 하위 작업을 위해 많은 데이터를 가져올 수 있는 몇 가지 예를 보았습니다.

얼굴 인식의 경우 사진에서 얼굴을 식별하기 위한 데이터를 많이 찾을 수 있었습니다. 얼굴 식별 후 이를 인식하는 데이터도요. 하지만 전체 종단간 작업에 통째로 사용할 수 있는 데이터는 적었습니다. X는 종단간 학습의 입력 끝이고 Y는 출력 끝입니다.

그래서 이런 시스템들을 훈련시키기 위해서는 입력 끝과 출력 끝이 모두 있는 데이터 X Y가 필요하며. 이는 우리가 이를 종단간 학습값이라고 부르는 이유이기도 합니다. 시스템의 한쪽 끝에서 다른 쪽 끝까지의 직접 매핑을 습득하기 때문입니다.

또 다른 단점은 잠재적으로 유용할 수 있는 설계된 수제 요소를 배제한다는 것입니다. 머신러닝 연구원들은 수제 설계를 폄하하는 경향이 있는데요. 하지만 데이터가 많지 않아 훈련 세트가 작을 경우 알고리즘이 데이터에서 얻을 수 있는 인사이트가 부족할 것입니다.

따라서 수제 요소 설계가 알고리즘에 지식을 수동으로 주입하는 한 방법이 될 수 있으며 이것이 항상 나쁜 것만은 아닙니다. 학습 알고리즘은 두 군데에서지식을 얻는 것 같습니다. 하나는 데이터, 다른 하나는 수제로 설계한 것입니다. 요소나 특성, 아니면 기타 등등이요.

따라서 엄청난 양의 데이터가 있을 때 수제 설계는 덜 중요해지지만 데이터가 많지 않을 때는 조심스럽게 수동으로 설계한 시스템을 사용하면 인간은 많은 지식을 알고리즘 데크에 투입할 수 있고 이는 아주 유용할 것입니다.

그래서 종단간 딥 러닝의 단점 중 하나는 유용한 수제 설계 요소를 배제한다는 것입니다. 그리고 수제 설계된 구성 요소는 잘 설계된 경우 아주 유용할 수 있습니다. 한편 퍼포먼스를 제한하는 경우 해로울 수도 있는데요.

예를 들어 만약 알고리즘이 음소로 생각하도록 강요한 경우 하지만 사실 알고리즘 자체적으로 더 나은 표현을 생각할 수 있었던 경우 등입니다. 그래서 이는 양날의 검과 같은 것으로 해로울 수도 있고 도움이 될 수도 있습니다. 수제 설계 요소는 작은 훈련 세트에서 훈련시 더 유용한 경향이 있습니다.

---

<img width="1157" alt="image" src="https://user-images.githubusercontent.com/55765292/182771111-fc1b308d-f032-4ca9-ac21-cc3e6554a4a4.png">

그래서 만약 새로운 머신러닝 시스템을 구축하고 있고 종단간 딥 러닝 사용 여부를 결정하는 중이라면 핵심 질문은 X에서 Y까지 매핑하는 데 필요한 복잡성 함수를 배울 수 있는 충분한 데이터가 있는가 하는 것입니다. 제게 필요한 복잡성이라는 표현에 대한 공식적 정의는 없지만 직관적으로 보면 X부터 Y까지의 함수를 배우려고 할 때 즉 이런 사진을 보고 사진에서 뼈의 위치를 인지하려고 하는 것은 상대적으로 쉬운 것처럼 보입니다.

이런 작업에는 데이터가 많이 필요하지 않을 수 있습니다. 아니면 사진을 보고 어떤 사람의 얼굴을 찾는 것도 그렇게 어려운 문제가 아닌 것처럼 보일 수도 있습니다. 여기도 데이터가 그리 많이 필요치 않을 수 있죠. 아니면 적어도 과제 해결에 충분한 데이터를 찾을 수 있을지도 모르죠.

반대로 손을 보고 아이의 나이를 바로 매핑하는 데 필요한 함수는 훨씬 복잡한 문제처럼 보입니다. 순수한 종단간 딥 러닝 접근법을 적용하는 경우 더 많은 학습 데이터가 필요할 수 있겠죠. 좀 더 복잡한 예시로 마무리하겠습니다.

어떻게 자율 주행차를 만들 수 있을까요? 여기 한 방법이 있는데요. 종단간 딥 러닝 접근법은 아닙니다. 차 앞에 있는 레이더, 라이다, 기타 센서로 촬영한 이미지를 입력으로 사용할 수 있습니다. 간단한 설명을 위해 차 앞이나 주변에 뭐가 있는지 사진을 찍었다고 해 봅시다. 그리고 안전 운행을 위해서는 다른 차들과 보행자들도 감지해야 합니다. 물론 다른 것들도요. 그래도 예시에서는 간단히 가겠습니다.

다른 차들과 보행자들이 어디에 있는지 알아낸 다음에는 이제 우리 차의 경로를 계획해야 합니다. 다시 말해 다른 차들이 어디에 있는지 보행자들이 어디에 있는지 보고는 어떻게 차를 움직일지, 다음 몇 초 동안 어떤 길로 갈지를 결정해야 합니다. 특정 도로로 가기로 했다면 이는 도로의 전경이고 이게 여러분의 차입니다.

이 도로로 가기로 결정한 경우 그것이 여러분의 경로가 되고 그러면 적절한 조종, 가속과 제동 명령을 생성해 이를 실행해야 합니다. 사진이나 인식 입력값에서 시작해 자동차와 보행자 감지까지 가는 것 이는 딥 러닝을 사용해 할 수 있습니다. 하지만 다른 차와 보행자들이 가는 길을 알아내 내 경로를 선택하고 차를 정확히 어떻게 움직일지 파악하는 것은 보통 딥 러닝으로 되지 않습니다.

대신 모션 플래닝이라는 소프트웨어로 가능합니다. 만약 로봇공학 수업을 들으실 기회가 있다면 모션 계획에 대해 배우게 되실 겁니다. 차를 어떤 경로로 운전할지 결정하면 또 다른 알고리즘이 나올 것입니다.

예를 들어 제어 알고리즘이라고 하죠. 이 알고리즘이 핸들을 얼마나 돌릴지 가속 페달이나 브레이크를 얼마나 밟을지에 대한 정확한 결정을 내립니다. 이 예시가 보여주는 것은 머신러닝이나 딥 러닝을 사용해 개별 구성 요소를 학습하고 지도 학습을 적용할 때는 어떤 작업에서 데이터를 얻는가에 따라 학습하고자 하는 X-Y 매핑 유형을 신중하게 선택해야 한다는 것입니다.

이와는 대조적으로, 이미지를 입력하고 차 조종 방식을 직접 출력하는 순수한 종단간 딥 러닝 접근 방식에 대해 이야기하는 것은 즐거운 일이죠. 하지만 오늘날의 데이터 가용성과 신경망을 통해 배울 수 있는 것들의 종류를 고려해 볼 때 이는 사실 가장 장래성 있는 접근 방식이 아니며 팀들이 좋은 성과를 보인 접근법도 아닙니다.

그리고 데이터 가용성과 현재의 신경망 훈련 능력을 고려할 때 저는 이 순수한 종단간 딥 러닝 접근법이 사실 이런 더 정교한 접근법보다 유망하지 않다고 생각합니다. 지금까지 종단간 딥 러닝에 대해 살펴보았습니다. 이는 때로 아주 효과적일 수 있지만 동시에 종단간 딥 러닝을 어디에 적용하는지도 염두에 두어야 합니다. 
