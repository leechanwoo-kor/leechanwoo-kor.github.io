---
title: "[Ⅳ. Convolutional Neural Networks] Deep Convolutional Models (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Deep Learning
  - Facial Recognition System
  - Convolutional Neural Network
  - Tensorflow
  - Object Detection and Segmentation
toc: true
toc_sticky: true
toc_label: "Deep Convolutional Models (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/183551502-3482e2d7-efb0-4815-9c94-b662606b4842.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Deep Convolutional Models

## Case Studies

### Why look at case studies?

이번에 첫 번째로 할 일은 컨볼루션 신경망의 효과적인 컨볼루션 신경망의 사례 연구입니다. 사례 연구를 살펴보는 이유는 무엇 일까요?

지난번에는 컨볼네트의 z 레이어, 풀링 레이어 그리고 완전히 연결된 레이어들과 같은 기본적인 구성 요소에 대해 배웠습니다. 지난 몇 년 동안 컴퓨터 비전 연구는 어떻게 이러한 기본 구성 요소를 조합하여 효과적인 컨볼루션 신경망을 형성할 것인가에 대한 것이 밝혀졌습니다. 사용자가 직관을 얻을 수 있는 가장 좋은 방법 중 하나는 이런 예시를 보는 것입니다.

여러분들이 다른 사람들의 코드를 읽음으로써 코드를 작성하는법을 배웠던 것처럼 직관을 얻는 좋은 방법이자 자신감을 쌓는 방법이 효과적인 자신감의 다른 예를 읽거나 보는 것이라고 생각합니다. 알고보면 하나의 컴퓨터 비전 작업에서 잘 작동하는 신경망 아키텍처와 같은 다른 작업에서도 잘 작동하는 경우가 많습니다.

만약 다른 사람이 신경망을 훈련했거나 신경망 아키텍처를 알아냈다면 고양이, 개, 사람을 잘 알아볼 수 있습니다. 하지만 다른 컴퓨터 비전 태스크가 있는데요.

예를 들어 자율주행 자동차를 개발하려고 할 때, 다른 사람의 신경 네트워크 아키텍처를 사용하여 문제를 해결할 수도 있습니다.

#### Outline
- Classic networks:
  - LeNet-5
  - AlexNet
  - VGG
- ResNet
- Inception

다음에 보실 것들의 개요로써, 먼저, 몇 가지 고전 네트워크를 알려드리려고 합니다. LeNet-5 네트워크는 1980년대에 VGG 네트워크에서 자주 인용되는 AlexNet에서 유래한 것입니다. 이것들은 꽤 효과적인 신경망의 예이며 여러분 작업에도 유용하게 사용될 아이디어들을 이 논문에서도 보실 수 있으실 겁니다.

제가 여러분께 보여드리고 싶은 것은 ResNet 또는 잔여 네트워크라고 하는 겁니다. 여러분은 신경망에 대해 들어보셨을겁니다. 그리고 더 깊이 나아가 ResNet 신경망은 152개의 매우 깊은 층 신경망을 훈련시켰습니다. 그것은 더 효과적으로 하는 흥미로운 기술과 아이디어들을 지니고도 있습니다.

마지막으로 인셉션 신경망 사례 연구를 알아보겠습니다. 이러한 신경망을 보신 후에 효과적인 컨볼루션 신경망을 구축하는 방법에 대해 훨씬 더 나은 직관을 가지게 되셨을거라 생각합니다.

그리고 컴퓨터 비전 작업을 직접 하지 않더라도 여러분은 ResNet 인셉션 네트워크, 이러한 아이디어들 중 많은 것들이 교차 수정되어 다른 분야로 진출하고 있다는 것을 알 수 있습니다.

비록 여러분이 직접 컴퓨터 비전이나 애플리케이션을 구축하지 않더라도 이러한 아이디어 중 일부는 매우 흥미롭고 업무에 도움이 될 것입니다.


### Classic Networks
이번에서는 LeNet-5, AlexNet, VGGNet으로 시작하는 고전 신경망 아키텍처에 대해 배우겠습니다.

#### LeNet-5

![image](https://user-images.githubusercontent.com/55765292/184783735-c6b44b9c-e594-4545-9c1c-e56c47181a47.png)

여기 LeNet-5 아키텍처가 있습니다. 32 x 32 x 1 의 이미지로 시작해보겠습니다.

LeNet-5의 목표는 손으로 쓴 숫자를 인식하는 것이었고, 그런 숫자의 이미지 일 수도 있습니다. 그리고 LeNet-5는 그레이 스케일 이미지에 대해 훈련되었기 때문에 이것은 32 x 32 x 1입니다.

이 신경망 아키텍처는 실제로 지난번에 본 마지막 예제와 매우 유사합니다.

첫 번째 단계에서는 스트라이드 하나와 함께 6개의 5 x 5 필터 세트를 사용합니다. 왜냐하면 6개의 필터를 사용하다 보면 20 x 20 x 6이 됩니다. 그리고 패딩이 없고, 스트라이드가 하나인 이미지 크기는 32 x 32에서 28 x 28로 줄어 듭니다.

그런 다음 LeNet 신경망이 풀링을 적용합니다. 그리고 나서 이 논문이 작성됐던 그 때에는 사람들은 평균 풀링을 훨씬 더 많이 사용했었습니다. 하지만 현대적인 변형을 만드는 경우 아마 max풀링을 대신 사용하게 될 것입니다.

하지만 이 예제에서는 필터 너비 2와 스트라이드 2를 사용하여 풀의 평균을 구하고 치수, 높이, 폭을 2배로 줄이면 이제 14 x 14 x 6 볼륨을 얻게 됩니다. 이 볼륨들의 높이와 폭은 척도에 따라 완전히 그려지지 않은 것 같습니다. 기술적으로 이 비례대로 볼륨을 그리면 크기와 높이가 두 배 더 강해집니다.

그런 다음 다른 컨볼루션 레이어를 적용합니다. 이번에는 5 x 5, 16개의 필터 세트를 사용하므로 다음 볼륨으로 16개의 채널을 가지게 됩니다.

그리고 1998년도에 이 논문이 작성되었을 때 사람들은 패딩이나 유효한 컨볼루션을 사용하지 않았었습니다. 이는 컨볼루션 레이어를 적용 할 때마다 장점이 많아졌기 때문입니다. 이게 바로 여기처럼 14 x 14에서 10 x 10 으로 바뀌는 이유입니다.

그런 다음 다른 풀링 레이어를 사용하여 높이와 너비를 2 배로 줄이면 여기서 5 x 5 가 되겠죠. 그리고 이 모든 숫자 이렇게 5 x 5 x 16을 곱하면 이것은 400 됩니다. 25의 16배는 400 이니까요.

그리고 다음 층은 완전히 연결된 층으로 400개의 노드 각각과 120개의 뉴런 각각을 완전히 연결합니다. 그리고 완전히 연결된 층이 있습니다. 400개의 노드를 가진 만 그릴 수도 있습니다. 여기서는 생략하겠습니다.

완전히 연결된 층이 있고 또 다른 완전히 연결된 층이 있습니다. 그리고 나서 마지막 단계로 84개의 함수를 사용하여 최종 출력으로 사용합니다.

ŷ에 대한 예측을 하기 위해 여기에 노드를 하나 더 그려도 됩니다. ŷ는 0에서 9까지의 숫자를 인식 할 때 가능한 10개의 가능한 값을 취했습니다.

이 신경망의 최신 버전에서는 10방향 분류 출력에 softmax층을 사용합니다. 그 당시에도 LeNet-5는 사실 출력 층에서 다른 분류기를 사용했고 이는 현재 쓸모 없는 것입니다.

그래서 이 신경망은 현대 기준으로 볼 때 작았고 약 60,000개의 파라미터를 가지고 있었습니다. 오늘날에는 1 천만에서 1 억 개의 파라미터를 가진 신경망을 자주 보게 됩니다. 문자 그대로 이 네트워크보다 약 1,000 배 큰 네트워크를 보는 것은 드문 일이 아닙니다.

그러나 여러분이 보게 되는 것은 여러분이 네트워크에서 더 깊이, 왼쪽에서 오른쪽으로 갈수록 높이와 폭이 줄어드는 경향이 있다는 것입니다.

채널 수는 늘어나는 반면 이렇게 32 x 32에서 28 x 28, 14, 10에서 5로 이렇게 변화된 것이죠. 네트워크의 층에 깊이 들어갈수록 1부터 6까지, 16까지가 됩니다.

이 신경망에서 여전히 반복되고 볼 수 있는 또 다른 패턴이 있는데요. 이 신경망은 하나 이상의 conv 층과 풀링 층이 있고 그리고 나서 하나 또는 때로는 하나 이상의 컨볼 레이어, pooling 레이어와 그리고 완전히 연결된 층 몇 개 그리고 출력입니다.

따라서 이 유형의 배열은 꽤 일반적입니다.

---

마지막으로, 이것은 논문을 읽고 싶은 사람들을 위한 것 입니다. 다른 몇 가지가 있습니다. 이 고전 논문을 읽고자 하는 사람들만을 위해서 좀 더 깊이 있는 내용을 이야기 하려고 합니다. 빨간색으로 쓰는 모든 것은 건너뛰셔도 무방합니다. 완전히 이해하지 않아도 괜찮지만 그래도 조금 흥미로운 각주도 있을 겁니다.

그 당시의 원본 논문을 읽어보시면 사람들은 시그모이드와 Tanh탄비선형성을 사용했는데요. 당시 사람들은 ReLU를 사용하지 않고 있었습니다.

그래서 논문을 보면 시그모이드와 Tanh이 언급 된 것을 볼 수 있습니다. 그리고 이 네트워크에 대한 재미있는 것들이 있는데요. 현대 표준으로 볼때 우스운 유선 네트워크라는 점입니다.

예를 들어, nc 채널이 있는 nh x nc x nc 네트워크가 있는 경우, f x f x nc 차원의 필터를 사용하며 채널은 전부 이 채널을 사용하고 있는 것으로 보이죠. 하지만 당시 컴퓨터는 훨씬 느렸습니다. 그래서 일부 파라미터 뿐만 아니라 계산에서도 저장하기 위해 본래의 LeNet-5는 매우 복잡한 방식을 가지고 있습니다.

다른 필터들이 입력 블럭의 다른 채널들을 보도록 하는 것이었죠. 그래서 논문에서 그 세부사항들에 대해 말하고 있습니다만, 하지만 더 현대적인 구현이라면 오늘날에는 그런 복잡성이 없을 것입니다.

그리고 그 당시에 실행되었지만 현재 실행되지는 않은 마지막 한 가지는 원래 LeNet-5가 풀링 후에 비선형성을 가졌다는 것입니다. 실제로 이것은 풀링 층 이후에 시그모이드 비선형성을 사용한다고 생각합니다.

그래서 여러분이 이 논문을 읽어 보시면 아시겠지만, 다음들에 다룰 논문보다도 이것은 더 읽기 어려운 논문입니다. 다음 것은 시작하기 조금 더 수월할 것 같습니다.

이 아이디어 중 대부분은 논문의 섹션 2 와 섹션 3에 대한 것들이고 논문의 뒤 부분에서는 다른 내용에 대해 다루고 있는데요. 오늘날 널리 사용되지 않는 그래프 트랜스포머 네트워크에 대해 다루고 있습니다.

따라서 이 논문을 읽어 보시려면 아키텍처에 대해 이야기하는 두 번째 섹션에 초점을 맞추고 흥미로운 실험 및 결과가 많이 있는 세 번째 섹션을 간략하게 살펴 보는 것이 좋습니다.

---

#### AlexNet

![image](https://user-images.githubusercontent.com/55765292/184785189-e2c800b7-f908-4f3b-91b6-436f65392bcc.png)

이제 보여드리려고 하는 신경망의 두 번째 예제는 AlexNet입니다. Alex Krizhevsky의 이름을 따서 명명 것인데요. 이 분은 이 작업을 설명하는 이 논문의 첫 번째 저자입니다. 다른 저자는 Ilya Sutskever와 Geoffrey Hinton이었습니다.

AlexNet 입력은 227 x 227 x 3 이미지로 시작합니다. 그리고 논문을 읽어보시면 224 x 224 x 3의 이미지를 보여줍니다. 그러나 숫자를 보면 그 숫자들이 실제로는 227 x 227밖에 되지 않는다고 생각합니다.

그리고 첫 번째 층은 96개의 11x11 필터 세트를 4개의 스트라이드로 적용합니다. 그래서 4개의 큰 스트라이드를 사용하기 때문에 차원은 55 x 55로 줄어듭니다. 대략적으로 스트라이드가 커서 4배 정도 내려갑니다.

그리고 나서 3 x 3필터의 max 풀링을 적용합니다. f=3 그리고 2의 스트라이드입니다. 이 볼륨을 27 x 27 x 96으로 줄이고, 5 x 5의 같은 컨볼루션, 세임 패딩을 수행해서, 결국 27 x 27 x 276 이 됩니다.

다시 max 풀링을 적용해서 높이와 너비를 13으로 줄입니다. 그리고 또 다른 동일한 컨볼루션 세임 패딩으로 13 x 13 x 384 필터가 됩니다. 그리고 3 x 3 또 같은 컨볼루션을 적용하면 이렇게 되죠.

다시 3 x 3 의 동일한 컨볼루션을 적용해서 이렇게 됩니다. max 풀링을 적용하면 이렇게 6 x 6 x 256으로 작아지고 이 모든 숫자인 6 x 6 x 256을 곱하면 9,216입니다. 그래서 이것을 9216 노드로 풀어 보겠습니다.

그리고 마지막으로 완전히 연결된 레이어가 몇 개 있습니다. 그리고 마지막으로 Softmax를 사용하여 1000개의 원인 중 어떤 것이 객체가 될 수 있는지 출력합니다. 그래서 이 신경망은 LeNet과 많은 유사점을 가지고 있었지만, 훨씬 더 커졌습니다.

이전 그림의 LeNet-5에는 약 60,000 개의 파라미터가 있었지만 AlexNet에는 약 6 천만 개의 파라미터가 있었습니다. 그리고 훨씬 더 많은 은닉 유닛과 더 많은 데이터에 대한 훈련이 있는 매우 유사한 기본 구성 요소를 사용할 수 있습니다. 뛰어난 성능을 발휘할 수 있는 데이터셋에 대한 훈련을 받았습니다. LeNet보다 훨씬 나은 이 아키텍처의 또 다른 측면은 가치 활성화 기능을 사용하는 것이었습니다.

---

다시 말해서, 논문을 읽지 않더라도 신경 쓰지 않아도 되는 고급 세부 정보를 읽어보세요. 그 중 하나는 이 논문이 작성되었을 때, GPU는 여전히 약간 느려서 두 개의 GPU에 대해 복잡한 방식으로 교육을 실시했죠.

기본적인 개념은, 이러한 많은 계층이 실제로 두 개의 서로 다른 GPU로 분할되어 있으며, 두 GPU가 서로 통신할 수 있는 시기를 고려하여 신중하게 조정되었습니다.

이 논문에서는 원래 AlexNet 아키텍처에는 로컬 응답 정규화라는 또 다른 계층 집합도 있었습니다. 이 유형의 레이어는 실제로 별로 사용되지 않습니다. 제가 많이 설명하지 않는 이유이기도 하죠 하지만 로컬 응답 정규화의 기본 개념은, 이러한 블럭 중 하나를 살펴보면, 위에 있는 볼륨 중 하나를 살펴 보시죠.

논의를 위해서, 이 13 x 13 x 256 으로 생각해봅시다. 로컬 응답 정규화(LRN)가 하는 일은 한 위치를 보는 것 입니다. 그 하나의 위치의 높이와 너비를 보는 것이죠. 그리고 이 모든 채널에 걸쳐 내려다 보고 이 모든 256 숫자를 보고 모두를 정규화 시키는 것입니다.

그리고 이 로컬 응답 정규화의 동기는 이 13 x 13 이미지의 각 위치에 대해 매우 높은 활성화를 가진 너무 많은 뉴런을 갖지 않게 하기 위함입니다. 하지만 그 후에 많은 연구자들이 이것이 별로 도움이 되지 않는다는 것을 알게 되었습니다.

그래서 이 아이디어들은 빨간색으로 그리고 있는 있는데요, 왜냐하면 여러분이 이걸 이해하는 게 그리 중요하지 않기 때문입니다. 실제로 오늘날 훈련받은 네트워크 언어에서 로컬 응답 정규화를 사용하지 않습니다.

따라서 딥러닝의 역사에 관심이 있다면 AlexNet 이전에도 딥러닝은 음성 인식 및 기타 분야에서 큰 영향을 받기 시작했다고 생각합니다.

하지만 많은 컴퓨터 비전 커뮤니티가 딥 러닝이 컴퓨터 비전에서도 효과가 있다는 것을 확신시키기 위해 딥 러닝을 진지하게 살펴보도록 설득한 것은 논문뿐이었습니다. 그리고 나서 컴퓨터 비전뿐 아니라 컴퓨터 비전을 넘어서는 분야에서도 커다란 영향을 미칠 만큼 성장했습니다.

그리고 만약 여러분이 논문들을 직접 읽어 보시면, 사실 이 강의를 위해 읽을 필요는 없습니다만, 이 논문 몇몇을 읽어보시고 싶다면 여기 있는 이것이 읽기 수월해서 보시기 좋을 겁니다.

알렉스넷은 상대적으로 복잡한 아키텍처를 가지고 있었지만 많은 하이퍼파라미터가 있습니다. 그리고 Alex Krizhevsky와 그의 공동 저자들이 생각해낸 수치들이 있죠.

---

#### VGG-16

![image](https://user-images.githubusercontent.com/55765292/184786093-a4bf98c2-ef62-474b-9515-693d2d9ffc83.png)

세 번째이자 마지막 예시인 VGG 또는 VGG-16 네트워크라는 거를 보여 드리겠습니다. VGG-16 네트워크에 대 주목할만한 점은 많은 하이퍼 파라미터를 가지고 있는 대신에 더 간단한 네트워크를 사용해서 conv-layers에만 집중하도록 하죠.

단지 하나의 스트라이드와 언제나 동일한 패딩의 3 x 3 필터인 컨볼레이어를 사용하는 것에 초점을 맞추고 그리고 스트라이드 2 를 가진 2 x 2, max 풀링 레이어를 만든다는 점입니다.

그래서 VGG 네트워크에 대한 아주 좋은 점 중 하나는 이 신경망 아키텍처를 단순화 하는 것입니다. 이제 아키텍처를 살펴 보겠습니다.

이미지를 통해 문제를 해결한 다음 처음 두 레이어는 컨볼루션이며, 따라서 이 3x3 필터입니다.

그리고 처음 두 레이어에서는 64 개의 필터를 사용합니다. 동일한 컨볼루션과 64 채널을 사용하기 때문에 224 x 224가 됩니다. VGG-16은 상대적으로 깊은 네트워크이기 때문에 모든 볼륨을 그리지는 않겠습니다.

그래서 이 작은 그림이 의미하는 것은 우리가 이전에 우리가 224 x 224 x 3로 그렸던 것입니다. 224 x 224 x 64가 되는 컨볼루션은 더 깊은 볼륨으로 그려지게 될 것입니다. 224 x 224 x 64가 되는 또 다른 레이어로 그려집니다.

그래서 이 [conv64]x2는 64필터로 여기 이 두 개의 conv를 수행하고 있음을 나타냅니다. 그리고 앞에서 언급했듯이, 필터는 항상 하나의 스트라이드와 3x3 이므로 그것들은 항상 동일한 컨볼루션입니다.

따라서 이러한 모든 볼륨을 그리기보다는 텍스트를 사용하여 이 네트워크를 나타내겠습니다.

다음으로, 풀링 레이어를 사용하고 그러면 풀링 레이어는 줄어들겠죠. 224 x 224 에서 줄어들어서 112 x 112 x 64가 됩니다. 몇 개 더 많은 컨볼 레이어를 갖게 됩니다.

즉, 128개의 필터가 있으며, 이 필터는 동일한 구성이기 때문에 새로운 차원이 무엇인지 살펴보겠습니다. 이것은 112 x 112x 128이 될 겁니다. 그리고 나서 풀링 레이어를 하면 이것의 새로운 차원이 무엇인지 알 수 있겠죠.

이제 256필터를 가진 3개의 컨볼 레이어가 풀링 레이어를 거쳐서 몇 개 더 많은 컨볼레이어를 거치고 풀링 레이어, 더 많은 컨볼 레이어, 풀링 레이어 이런 식으로 됩니다.

그리고 이 마지막 7x7x512를 4,966유닛으로 완전히 연결한 후 수천 개의 클래스 중 하나의 Softmax 출력을 제공합니다.

하지만, VGG-16의 16은 이것이 16 개의 레이어에 가중이 있음을 나타냅니다. 그리고 이것은 꽤 큰 네트워크인데요. 이 네트워크는 약 1억 3천 8백만개의 파라미터를 가지고 있습니다. 현대 기준으로 봐도 꽤 큰 규모입니다.

하지만 VGG-16 아키텍처의 단순성은 매우 매력적이었습니다. 여러분은 이 아키텍처가 정말로 아주 균일하다는 것을 알 수 있습니다. CONV 레이어가 몇 개 있고, 그 다음에 당기는 레이어가 몇 개 있어서 높이와 폭이 줄어듭니다. 풀링 레이어는 높이와 너비를 줄입니다. 여기에 그들 중 몇 개가 있습니다.

그러나 컨볼 레이어에서 필터의 수를 보면 64개의 필터가 있고 128개의 두 배, 256개의 두 배, 512개의 두 배입니다. 저자들은 512가 충분히 크고, 두 배로 한거라 생각했던 것 같습니다.

그러나 모든 단계에서 대략 두 배로 증가하거나 모든 컨벤션 레이어 스택을 통해 두 배로 증가시키는 것은 이 네트워크의 아키텍처를 설계하는 데 사용되는 또 다른 간단한 원리입니다. 그래서 이 아키텍처가 상대적으로 균일하다는 점이 연구자들에게 매우 매력적이라고 생각합니다.

주된 단점은 바로, 훈련해야 하는 파라미터 수 면에서 상당히 큰 네트워크라는 것입니다. 그리고 문헌을 읽으면, VGG-19가 이 네트워크의 더 큰 버전이라고 말하는 사람들을 볼 수 있습니다.

그리고 Karen Simonyan과 Andrew Zisserman에 의해 하단에 인용 된 논문의 세부 사항도 볼 수 있습니다. 그러나 VGG-16은 VGG-19와 거의 비슷하기 때문에 많은 사람들이 VGG-16을 사용할 것입니다.

하지만 이것에서 가장 좋아했던 부분은 이게 이 패턴을 만드는 건데요. 더 깊게 높이와 너비가 감소함에 따라 풀링 레이어가 매번 2배씩감소 한다는 것입니다. 채널의 수는 증가하지만 말이죠.

새로운 컨벤션 레이어 세트를 사용할 때마다 대략 2배씩 증가합니다. 그래서 이 논문이 내려가는 속도와 올라가는 속도를 매우 체계적으로 만들어냄으로써 저는 이 논문이 그런 관점에서 매우 매력적이라고 생각했습니다.

---

자, 여기까지 3 가지 고전적인 아키텍처에 대한 내용이었습니다. 원하시면, 이 논문들을 읽어보시면 좋을 것 같습니다. AlexNet 논문을 시작으로 시작해서 VGGNet 논문으로 넘어가시는 것을 추천 드립니다. LeNet 논문은 읽기가 조금 더 어렵습니다.

하지만 살펴본다면 이 역시 좋은 고전 논문이죠. 다음에는, 이러한 고전적 네트워크를 뛰어 넘어, 좀 더 발전되고 더욱 강력한 신경망 아키텍처를 살펴 보겠습니다.
