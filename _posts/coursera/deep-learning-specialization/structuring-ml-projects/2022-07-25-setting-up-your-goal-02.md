---
title: "[Ⅲ. Structuring Machine Learning Projects] Setting Up your Goal (2)"
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
toc_label: "Setting Up your Goal (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## Setting Up your Goal

### Train/Dev/Test Distributions
훈련 개발이나 개발 세트 또는 시험 세트를 어떻게 설정하는지에 따라 본인이나 팀의 머신러닝 프로젝트 진전 속도가 크게 달라질 수 있습니다. 심지어 대기업 소속 팀들도 팀의 진행 속도를 가속화하기보다는 더디게 만드는 데이터 세트를 구성합니다. 어떻게 하면 데이터 세트를 잘 만들어 팀의 생산성을 최대화할 수 있는지 알아보도록 하겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/180713675-108e057b-88a9-4e76-9082-65dadead1a1c.png)

이번 영상에서는 개발과 시험 세트의 설정 방법에 대해 집중적으로 말씀드리겠습니다. 데브 세트(개발 세트)는 디벨롭먼트 세트라고도 불리는데요. 홀드-아웃 교차 검증 세트라고도 합니다. 일반적인 머신러닝의 워크플로는 다양한 아이디어를 시도해 보고 다양한 모델을 훈련 세트에서 훈련시켜 보고 개발 세트를 이용해 여러 아이디어를 평가한 뒤 그 중 하나를 고르는 것입니다.

개발 세트의 성능 개선을 위해 지속적으로 혁신해 마지막에는 한 가지 마음에 드는 항목을 골라 시험 세트에서 평가해보는 것입니다. 예를 들어 고양이 분류기를 만들고 있다고 해 봅시다. 그리고 미국, 영국, 유럽, 남아메리카 인도, 중국, 기타 아시아 국가, 호주에서 운영을 하고 있다고 생각해 봅시다. 이 때 개발 세트와 시험 세트를 어떻게 설정하면 좋을까요?

한가지 방법은 앞서 언급한 지역 중 네 가지를 고르는 것입니다. 저는 이렇게 네 개를 쓰겠지만 랜덤으로 뽑을 수도 있겠죠. 이 네 가지 지역에서 수집된 데이터가 개발 세트로 이관될 텐데요. 나머지 네 개의 지역은 무작위로 선별해도 되고요. 이들 지역은 시험 세트로 이동시키도록 하겠습니다. 그런데 이번 사례에서는 이렇게 고르는 게 부적합한 것으로 드러났습니다. 개발 세트와 시험 세트가 모두 다른 분포도를 갖고 있어서요. 대신 개발 세트와 시험 세트가 같은 분포에서 나올 것을 권장드립니다.

정확히 무슨 뜻인지 알려드리죠. 기억하셔야 할 것은 개발 세트와 단일 역할번호 평가 지표를 설정하는 것입니다. 이는 목표를 설정하고 팀에게 목표 과녁의 중심이 어딘지 알려주는 것과 같습니다. 일단 개발 세트와 지표를 수립하고 나면 팀이 빠르게 반복 수행을 할 수 있고 다양한 아이디어를 시도해 보고 실험도 해 보고 빠르게 개발 세트를 이용하고 지표를 사용해 분류기를 평가하고
가장 좋은 것을 고를 수 있습니다.

머신러닝 팀은 과녁에 다양한 화살을 쏴서 명중 확률을 높이는 데 뛰어날 수 있습니다. 그래서 개발 세트 지표에서 잘할 수 있도록 하는 것이죠. 왼쪽 예시에서 보이는 개발과 시험 세트에서 설정한 예시의 문제는 팀이 개발 세트에서 몇 달간 노력했더라도 막상 시험 세트에서 시현해 볼 때는 이 네 개 국가나 아래 네 지역에서 얻은 데이터가 개발 세트의 지역과 아주 많이 다를 수 있습니다. 자칫하면 끔찍한 서프라이즈를 볼 수 있는 것이죠.

개발 세트 최적화를 위해 수 개월을 썼지만 시험 세트의 좋은 성능으로 이어지지 않는 것이요. 분포도가 다른 곳에서 만들어진 개발 세트와 시험 세트를 갖는 것은 마치 몇 개월 동안 계속해서
과녁 명중을 위해 노력했지만 수개월 열심히 일하고 나서 뒤늦게 깨닫는 것과 같습니다. “잠깐만, 테스트를 하려면 목표를 이쪽으로 옮겨야겠어” 그러면 팀은 이러겠죠. “잠깐.. 그러면 애초에 왜 다른 과녁에 몇 개월 동안 시간을 낭비하게 한 거야? 과녁 중심이 바뀔 수 있는데 뭐하러 그렇게 열심히 일한 거지?” 라고 반문할 수 있죠.

이런 일을 방지하기 위해 여러분께 권장드리는 부분이 있는데요. 이렇게 무작위로 섞인 데이터를 개발과 시험 세트에 반영합니다. 이렇게 되면 개발 세트와 시험 세트 모두 8개 지역에서 수집된 데이터를 갖게 됩니다. 또 개발과 시험 세트 모두 같은 분포도에서 온 것이고 이 분포도는 모든 데이터들이 섞인 데이터 분포도라고 할 수 있습니다.

---

![image](https://user-images.githubusercontent.com/55765292/180713696-85eabafb-7e93-44df-91b8-a6b704a0a15a.png)

또 다른 예시를 말씀드리겠습니다. 사실 실화입니다만 세부 내용만 조금 바꿨습니다. 제가 알고 있는 팀 중 하나는 개발 세트 최적화에 몇 개월을 들였는데요. 이 개발 세트는 중산층의 우편번호와 대출 승인 내역으로 이루어져 있었습니다. 구체적인 머신러닝 문제는 “대출 신청에 관한 입력값 X로 y를 예측할 수 있을까요? 예상할 수 있을까요?” 였습니다.

이를 통해 대출 승인 결정에 도움을 주는 것이죠 개발 세트는 대출 신청으로 만들어집니다. 중산층의 집코드로 만들어진 것이죠. 집코드는 미국의 우편번호입니다. 이 팀은 몇 개월 작업을 한 뒤 갑자기 저소득층 우편번호 데이터로 시험해보기로 마음먹었습니다. 당연히 중산층의 우편번호 분포 데이터와 저소득층의 우편번호 데이터는 많이 달랐습니다.

이전 사례에서 최적화를 위해 정말 많은 시간을 쏟았음에도 분류기는 후자 사례에서 제대로 작동하지 않았습니다. 결과적으로 이 팀은 약 3개월이라는 시간을 낭비하고 많은 작업을 다시 실행해야 했습니다. 어떤 일이 벌어진 건가 하면 이 팀은 3개월간 오로지 한 가지 목표를 향해 달렸고 3개월 뒤 매니저가 “이렇게 다른 목표를 설정하는데 괜찮은지?" 물었을 때 이는 완전히 다른 지점이었던 것이죠. 이는 팀에게 아주 곤혹스러운 경험으로 남았습니다.

---

![image](https://user-images.githubusercontent.com/55765292/180713723-42564c71-789f-4434-9e6e-97bddad78759.png)

그러므로 제가 권장드리는 것은 개발 세트와 시험 세트를 설정할 때 미래에 어떤 데이터를 반영시킬지와 어떤 것을 중요시 여길지를 고려하여 적합한 개발 세트와 시험 세트를 고르는 것입니다. 그리고 특히 여기 있는 개발 세트와 시험 세트는 모두 같은 분포에서 만들어져야 합니다.

따라서 미래에 어떤 데이터를 다루던 간에 그 경우에 사용한 데이터와 같은 유형의 데이터를 확보하셔야 합니다. 그 데이터가 무엇이건 간에 개발 세트와 시험 세트에 모두 넣으세요. 이렇게 하면 목표를 실제로 여러분이 원하는 곳에 설정하고 팀이 같은 목표를 효율적으로 달성할 수 있게 할 수 있습니다.

훈련 세트를 어떻게 설정하는지는 아직 다루지 않았으므로 나중에 말씀드리겠습니다. 이번에 꼭 기억하셔야 할 내용은 개발 세트 설정과  이는 여러분이 실제로 목표로 삼고 싶은 대상을 정의합니다. 또 가능하면 개발 세트와 시험 세트를 같은 분포도로 설정해 머신러닝 팀이 원하는 어떤 목표도 맞출 수 있도록 하는 것입니다. 훈련 세트를 어떻게 선택하는지에 따라 얼마나 잘 목표를 맞추는지 결정지을 수 있습니다.

---

### Size of the Dev and Test Sets
개발과 시험 세트가 같은 분포에서와야 한다는 것을 배웠는데요. 그렇다면 길이는 얼마 정도면 될까요? 개발과 시험 세트를 설정하는 가이드라인이 딥 러닝 시대를 맞아 바뀌고 있습니다. 모범 사례를 한번 보도록 하겠습니다. 

![image](https://user-images.githubusercontent.com/55765292/180715628-6dc7cffc-1bc1-421a-b548-85deb8bf8231.png)

머신 러닝에서의 경험 법칙을 들어보셨을 수 있는데요 가지고 있는 데이터를 모두 사용해 훈련 및 시험 세트에 각각 70 대 30으로 나누는 것입니다. 또는 훈련, 개발, 시험 세트를 설정해야 했다면 훈련 60%, 개발 20%, 시험 20%를 사용할 것입니다.

머신러닝 초기에는 이것이 합리적인 비율이었습니다. 특히 데이터 세트 크기가 그리 크지 않았을 때 말이죠. 그래서 만약 총 100개의 예시가 있다고 하면 70:30 또는 60:20:20과 같은 경험 법칙이 합리적이었을 것입니다. 수천 개의 예시가 있었거나, 만 개의 예시가 있었거나 하는 경우에는 합리적인 비율이 아니라고도 볼 수 없겠죠.

하지만 최근 머신러닝 시대에서는 훨씬 더 큰 데이터와 세트를 다룹니다. 그러므로 백만 개의 훈련 샘플이 있다고 가정할 때 이런 경우 98%를 훈련 세트로 설정하고 1%는 개발, 나머지 1%는 시험으로 분배하는 것이 이상적이라고 할 수 있을 겁니다. 그리고 DNT를 사용하여 개발 및 시험 세트를 단축시키려는 경우 만약 백만 개의 사례가 있다고 하면 그 중 1%는 사례 만 개이기 때문에 개발과 시험 세트로는 충분한 양이죠.

그래서 최근 데이터 세트의 양이 크게 늘어난 큰 딥러닝 시대에는 개발 세트나 시험 세트를 데이터의 20% 또는 30% 미만으로 구성하는 것이 합리적입니다. 또 딥 러닝 알고리즘 또한 아주 많은 데이터를 필요로 하기 때문에 큰 데이터 세트를 보유하고 있을 경우 그 중 상당 부분이 훈련 세트로 가는 문제가 있습니다 .

---

![image](https://user-images.githubusercontent.com/55765292/180715653-3bcbb74d-f156-454a-bccd-3b4cc30c1b42.png)

![image](https://user-images.githubusercontent.com/55765292/180715666-866a3a5b-96af-4c8c-aab5-1d763a2dfdf3.png)

그렇다면 시험 세트는 어떨까요? 시험 세트는 시스템 개발이 끝난 뒤로는 최종 시스템이 얼마나 우수한지 평가하는 데 도움을 줍니다. 지침은 시험 세트를 높은 확신을 줄 수 있을 만큼 충분히 크게 설정하는 것입니다.

따라서 최종 시스템의 성능을 아주 정확하게 측정할 필요가 없는 이상 시험 세트에서 수백만 개의 예시는 필요치 않을 수 있으며 만 개, 십만 개 등 성능을 잘 평가할 수 있다고 생각되는 수치면 충분합니다. 이는 가령 전체 데이터 세트의 30%라고 가정할 수 있습니다. 보유하고 있는 데이터 양에 따라 달라지겠죠.

일부 응용 프로그램에서는 최종 시스템의 전체 성능에 대한 높은 확신이 필요하지 않을 수도 있습니다. 필요한 것은 훈련과 개발 세트가 전부일 수도 있습니다. 시험 세트가 없는 것도 괜찮을 수 있습니다.

실제로 이런 일이 있는데요. 훈련/시험 분할을 한다고 말해 놓고는 실제로는 시험 세트를 계속 반복하고 있었습니다. 따라서 시험 세트라기보다는 훈련/개발 분할을 한 거였고 시험 세트는 사실 없었죠. 이 개발과 시험 세트에 실제로 튜닝을 한다면 개발 세트라고 하는 게 맞습니다.

하지만 머신러닝의 역사를 보면 시험 세트로 취급해야 하는 것을 개발 세트라고 부르는 일이 흔하게 일어나고 있습니다. 하지만 오로지 훈련할 데이터 조금 튜닝할 데이터만 조금 필요로 하는 경우 최종 시스템을 만들어 보고 그 실제 작동 방식에 대해서 너무 걱정하지 않을 생각이라면 이를 그냥 훈련/개발 세트라고 부르고 시험 세트가 없다는 것을 인정하는 편이 좋을 것 같습니다.

조금 특이한가요? 시스템 구축시 시험 세트를 설정하지 않는 것은 결코 추천하지 않습니다. 개인적으로 시험 세트를 따로 두는 것이 안심이 되는 편인데요. 당신이 그걸 바꾸기 전에 그걸 사용해 제 작업 방식을 편견 없이 추정할 수 있습니다. 하지만 아주 큰 개발 세트가 있는 경우라면 심한 과적합이 일어나지 않을 것이라고 생각되면 훈련/개발 세트만 가지는 것도 괜찮을 수 있습니다. 일반적으로 추천하는 것은 아니지만요.

요약하자면 빅데이터 시대에서 제 생각에 70/30이라는 오래된 경험 법칙은 더 이상 적용되지 않는 것 같습니다. 지금까지의 트렌드는 훈련에 더 많은 데이터를 사용하고 개발 및 시험에는 데이터를 덜 사용합니다. 특히 데이터 세트가 아주 클 때 말이죠. 결함 기반 규칙은 개발 세트를 목적에 맞는 크기로 설정하는 것인데요.

이는 여러 아이디어 평가와 AOP 픽업에 도움이 될 수 있습니다. 또 시험 세트는 최종 비용 평가에 도움이 됩니다. 목적에 맞게 적당한 크기로
시험 세트를 설정하면 됩니다. 이는 총 데이터의 30% 미만일 수 있습니다.