---
title: "[Ⅱ. Deep Neural Network] Practical Aspects of Deep Learning (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Tensorflow
  - Deep Learning
  - Mathematical Optimization
  - hyperparameter tuning
toc: true
toc_sticky: true
toc_label: "Practical Aspects of Deep Learning (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Practical Aspects of Deep Learning

## Setting up your Machine Learning Application

### Train / Dev / Test sets
아마도 이제 신경망을 구현하는 방법은 배웠을 것입니다. 이제는 학습 알고리즘이 합리적인 시간 내에 신경망이 잘 작동할 겁니다. 하이퍼파라미터 튜닝부터 데이터 설정 방법, 최적화 알고리즘이 빠르게 실행되어 신경망 구현이 올바른지 학습하도록 하는 방법의 실용적인 측면을 배우게 됩니다.

먼저 셀룰러 머신 러닝 문제에 대해 이야기한 다음, 무작위화에 대해 이야기한 다음, 좋은 고성능 신경망을 찾기 위한 확인하는 방법에 이르기까지 다양합니다. 그럼 시작하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/177110689-cb6ea89c-50bd-431e-ad14-40d11aaaa2d0.png)

훈련, 개발 및 테스트 세트를 설정하는 방법을 잘 선택하면 신경망에 몇 개의 레이어가 있는지와 같이 몇 가지 트릭에 대해 이야기할 것입니다.

신경망을 트레이닝할 때 여러분은 많은 결정을 내려야 합니다. 신속한 도움이 되는 데 큰 차이가 날 수 있습니다. 각 계층에 몇 개의 은닉 유닛이 있기를 원하는지 학습률은 얼마인지 그리고 다른 레이어에 사용하려는 활성화 함수는 어떻게 설정할 지 등입니다.

새 어플리케이션을 시작할 때 첫 번째 시도에서 이 모든 것과 다른 하이퍼파라미터 선택에 대해 올바른 값을 정확하게 추측하는 것은 거의 불가능합니다.

따라서 실제로 적용 머신러닝은 고도로 반복적인 프로세스, 특정 수의 레이어로 구성된 신경망을 구축하고 싶은지, 이 특정 네트워크가 얼마나 잘 작동하는지, 특정 수의 은닉 유닛, 특정 데이터 세트 등에 대한 것일 수 있습니다.

그런 다음 코드를 실행하여 코드를 작성하고 시도하기만 하면 됩니다. 실험을 실행하고 결과에 따라 더 나은 신경망을 찾기 위해 또는 이 특정 구성이 작동하는지와 같은 아이디어로 시작하는 경우가 많습니다. 그리고 그 결과를 바탕으로, 여러분은 아이디어를 구체화하고 선택을 변경할 수 있습니다. 계속 반복해야할 수 있습니다.

오늘날 딥 러닝은 자연어 처리에서 컴퓨터 비전, 음성 인식, 구조화된 데이터에 대한 많은 응용 프로그램에 이르기까지 많은 영역에서 큰 성공을 거두었습니다. 그리고 구조화된 데이터에는 광고에서 웹 검색에 이르기까지 이것은 단지 인터넷 검색 엔진이 아닙니다.

예를 들어 쇼핑 웹사이트도 마찬가지입니다. 이미 많은 웹사이트에 기사를 보내 모든 것이 포함되며, 검색 창에 용어를 입력할 때 훌륭한 검색 결과를 제공합니다. 컴퓨터 보안, 예를 들어, 물류 등을 파악합니다.

물건을 픽업하고 내려주길 원하는 웹사이트가 있습니다. 그래서 경험이 많은 연구원이 뛰어들어서 NKLP에서는 컴퓨터 비전에서 무언가를 하려고 할 수 있습니다. 아니면 음성 인식 분야에 많은 경험을 가진 연구원이, 여러분도 아시다싶이, 광고 관련 일을 하려고하는 경우가 종종 있습니다. 또는, 보안 담당자가 뛰어들어 물류 관련 일을 하고 싶어할 수도 있습니다.

그리고 최선의 선택은 보유하고 있는 데이터의 양, 컴퓨터 구성을 통해 보유하고 있는 입력 기능의 수, GPU 또는 CPU에서 트레이닝하는지 여부에 따라 달라질 수 있습니다.

그렇다면 GPU와 CPU의 구성이 정확히 무엇인지 그리고 기타 여러 가지가 있습니다. 그래서 많은 응용 분야에서 거의 불가능하다고 생각합니다. 딥 러닝 관련 경험이 매우 풍부한 사람들조차도 처음에는 최상의 초매개변수 선택을 정확하게 추측하는 것이 거의 불가능하다는 것을 알게 됩니다.

그래서 오늘날 응용 딥 러닝 애플리케이션에 적합한 네트워크를 찾기 위해 이 주기를 여러 번 반복해야 하는 매우 반복적인 프로세스 입니다.

따라서 얼마나 빨리 진전을 이룰 수 있는지를 결정하는 것 중 하나는 이 주기를 얼마나 효율적으로 돌릴 수 있느냐입니다. 그리고 훈련, 개발 측면에서 데이터 세트를 잘 성정하십시오. 데이터 세트를 사용하면 훨씬 더 효율적으로 작업할 수 있습니다.

![image](https://user-images.githubusercontent.com/55765292/177110728-450c5c38-1536-4379-bfeb-8a3b6fdb964a.png)

따라서 이것이 여러분의 트레이닝 데이터라면, 큰 상자로 그려 보겠습니다. 그런 다음 전통적으로 보유하고 있는 모든 데이터를 가져와서  그 중 일부를 훈련 세트로, 일부는 홀드아웃 교차 검증 세트로 조각할 수 있습니다. 이것은 때때로 개발 세트라고도 합니다. 간결하게 하기 위해 이것을 개발 세트라고 부르겠습니다.

이 모든 용어는 거의 같은 것을 의미합니다.

그런 다음 테스트 세트로 사용할 마지막 부분을 조각할 수 있습니다. 따라서 워크플로는 훈련 세트에서 알고리즘 훈련을 계속하는 것입니다. 그리고 개발 세트 또는 홀드아웃 교차 검증 세트를 사용하여 다양한 모델 중 개발 세트에서 가장 성능이 좋은 모델을 확인하십시오. 그리고 충분히 이 작업을 수행한 후, 여러분이 평가하고 싶은 최종 모델이 있을 때, 알고리즘이 얼마나 잘 작동하는지에 대한 편견 없는 추정치를 얻기 위해 찾은 최고의 모델 테스트 세트에서 평가할 수 있습니다.

머신 러닝의 이전 세대에는 모든 데이터를 가져와서 70/30%로 분할하는 것이 일반적이었습니다. 사람들은 종종 70/30 훈련 테스트 분할에 대해 이야기합니다. 명시적인 개발세트가 없거나 기계 학습에서 60% 훈련 20% 개발 및 20% 테스트 측면에서 분할합니다. 그리고 몇 년 전에 이것은 모법사례로 널리 간주되었습니다. 60/20/20%인 경우에 말이죠. 총 100개의 예가 있거나, 아님 총 1000개의 예가 있을 수도 있고 아마도 10,000개의 예 후에 이러한 종류의 비율은 완전히 합리적인 경험 법칙이 될 겁니다.

그러나 예를 들어 총 백만 개의 예제가 있을 수 있는 현대의 빅 데이터시대에는 개발 및 테스트 세트가 전체에서 훨씬 더 작은 비율이 되고 있는 추세입니다. 개발 세트의 목표는 다양한 알고리즘을 테스트하고 어떤 알고리즘이 더 잘 작동하는지 확인하는 것임을 기억하십시오.

따라서 개발 세트는 두 가지 다른 알고리즘 선택 또는 열 가지 다른 알고리즘 선택을 평가하고 어느 것이 더 나은지 빠르게 결정할 수 있을 만큼 충분히 커야 합니다. 그리고 이를 위해 전체 데이터의 20%가 필요하지 않을 수 있습니다.

예를 들어, 백만 개의 훈련 예제가 있는 경우, 어느 하나 여러분의 개발 세트에 10,000개의 예제만 있으면 충분합니다. 또는 두 개의 알고리즘이 더 나은지 평가하기 위해 결정할 수 있습니다.

그리고 비슷한 맥락에서, 테스트 세트의 주요 목표는 최종 분류기가 주어졌을 때 테스트 세트가 얼마나 잘 수행되고 있는지 꽤 자신 있게 추정할 수 있도록 하는 것입니다. 그리고 다시, 백만 개의 예가 있는 경우 10,000개로 결정할 수도 있습니다. 예제는 단일 분류기를 평가하고 분류기가 얼마나 잘 작동하는지에 대한 좋은 추정치를 제공하기에 충분합니다.

따라서 이 예에서 백만 개의 예가 있는 경우 비율은 다음과 같을 것입니다. 개발용으로 10,000개, 테스트용으로 10,000개만 필요하다면, 이 10,000은 100만 개의 1%이므로 훈련 98%, 개발 1%, 테스트 1%가 필요합니다. 또한 다음과 같은 응용 프로그램도 보았습니다. 백만 개 이상의 예제가 있는 경우 99.5%의 훈련과 0.25%의 개발, 0.25%의 테스트로 긑날 수 있습니다. 아니면 0.4% 개발, 0.1% 테스트일 수도 있습니다.

요약하자면, 머신 러닝 문제를 설정할 때, 종종 그것을 훈련, 개발 및 테스트 세트와 설정하고 상대적으로 작은 데이트 세트가 있는 경우 이러한 기존 비율이 괜찮을 수 있습니다.

그러나 훨씬 더 큰 데이터세트가 있는 경우 개발 및 테스트 세트를 데이터의 20% 또는 10% 보다 훨씬 작게 설정하는 것도 괜찮습니다. 후에 학습할 전문화 부분에서 개발 및 테스트 세트의 크기에 대한 보다 구체적인 가이드라인을 제공할 것입니다.

![image](https://user-images.githubusercontent.com/55765292/177116304-62375952-7721-4ea3-9a29-671782f2eb01.png)

현재 딥 러닝 시대에 우리가 보고 있는 또 다른 추세는 점점 더 많은 사람들이 일치하지 않는 훈련과 테스트 분포에 대해 훈련한다는 것입니다. 사용자가 많은 사진을 업로드할 수 있는 앱을 만들고 있고 사용자에게 보여주기 위해 고양이 사진을 찾는 것이 목표라고 가정해 보겠습니다.

훈련 세트는 인터넷에서 다운로드한 고양이 사진에서 가져온 것일 수도 있지만요. 개발 및 테스트 세트는 앱을 사용하는 사용자의 고양이 사진으로 구성될 수 있습니다. 따라서 훈련 세트에는 인터넷에서 수집한 많은 사진이 있을 수 있지만 개발 및 테스트 세트는 사용자가 업로드한 사진입니다.

많은 웹페이지에 매우 높은 해상도, 매우 전문적이며 멋지게 액자에 담긴 고양이 사진이 있습니다. 하지만 아마도 사용자가 업로드하고 있을 수 있습니다. 좀 더 캐주얼한 상태에서 휴대폰 카메라로 방금 찍은 저해상도 이미지입니다. 따라서 이 두 데이터 분포는 다를 수 있습니다.

이 경우, 개발 세트와 테스트 세트가 동일한 배포판에서 나온 것인지 확인하세요. 이 특정 지침에 대해서도 더 자세히 설명하겠지만 개발 세트를 사용하여 다양한 모델을 평가할 것이기 때문입니다. 개발 세트의 성능을 개선하기 위해 정말 엄청난 갈망을 가지고 있기 때문에 제가 보고 있는 한 가지 추세는 모든 종류의 창의적인 전술을 사용할 수 있다는 것입니다.

웹페이지를 크롤링하는 것과 같이 다른 방법보다 훨씬 더 큰 훈련 세트를 얻기 위해서 말이죠. 그 비용의 일부가 훈련 세트 데이터가 개발 및 테스트 세트와 동일한 배포에서 나오지 않을 수도 있다는 점입니다. 그러나 이 경험 법칙을 따르는 한 기계 학습 알고리즘의 진행 속도가 더 빨라진다는 것을 알게 됩니다. 그리고 이 특정 경험 법칙에 대해서는 나중에 전문화 과정에서도 자세히 설명하겠습니다.


마지막으로 테스트 세트가 없어도 괜찮습니다. 테스트 세트의 목표는 편향 없는 추정치를 제공하지만 선택한 네트워크의 최종 네트워크 성능 말이죠. 하지만 그 편향 없는 추정이 필요하지 않다면 테스트 세트가 없어도 괜찮을 것입니다.

따라서 개발 세트만 있고 테스트 세트가 없는 경우 훈련 세트에서 훈련한 다음 다른 모델 아키텍처를 시도하는 것입니다. 개발 세트에서 평가한 다음, 이를 사용하여 반복하고 좋은 모델에 도달하려고 합니다.

데이터를 개발 세트에 맞추었기 때문에, 더 이상 편향되지 않은 성능 추정치를 제공하지 않습니다. 그러나 여러분이 필요없으시다면, 그것 역시 완전히 괜찮습니다. 머신 러닝 세계에서는 훈련할 수만 있따면, 별도의 테스트 세트는 제공하지 않는다는 점을 기억하세요. 대부분의 사람들은 이것을 훈련 세트라고 부릅니다.

개발 세트를 테스트 세트라고 해도됩니다. 그러나 그들이 실제로 하는 것은 테스트 세트를 홀드아웃 세트로 사용하는 것입니다. 테스트 세트에 과적합되게 때문에, 적절한 용어는 아닐 수 있습니다. 그래서 팀이 여러분에게 훈련과 테스트 세트만 있다고 한다면 저는 조심스럽게 접근하고, 정말 훈련 개발 세트가 있는 걸까라고 생각할 것입니다. 테스트 세트에 과적합되기 때문입니다.

문화적으로 이러한 팀의 용어 개발 집합 중 일부를 그리고 훈련된 테스트 세트가 아니라 훈련된 개발 세트라고 부르도록 하세요. 변경하는 것이 더 정확한 용어일 수 있습니다. 그리고 이것은 알고리즘의 성능에 대한 완전히 편향 없는 추정이 필요하지 않은 경우 실제로 괜찮은 방법입니다.

따라서 훈련 개발 및 테스트 세트를 설정하면 더 빠르게 통합할 수 있습니다. 또한 알고리즘 편향과 분산을 보다 효율적으로 측정할 수 있으므로 알고리즘을 개선하는 방법을 보다 효율적으로 선택할 수 있습니다. 다음에는 그 이야기를 다루겠습니다.
