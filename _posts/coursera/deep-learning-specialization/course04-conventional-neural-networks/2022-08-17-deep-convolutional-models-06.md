---
title: "[Ⅳ. Convolutional Neural Networks] Deep Convolutional Models (6)"
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
toc_label: "Deep Convolutional Models (6)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/183551502-3482e2d7-efb0-4815-9c94-b662606b4842.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Deep Convolutional Models

## Practical Advice for Using ConvNets

### Transfer Learning

컴퓨터 비전 애플리케이션을 처음부터 무작위로 초기화하는 방법을 훈련하는 것이 아니라 구축 중인 경우 여러분은 다른 사람이 이미 훈련 시켜놓은 네트워크 아키테처를 다운받아서 사전 훈련으로 사용하고 관심 있는 새로운 작업으로 전환하면 훨씬 더 빠르게 진행됩니다.

컴퓨터 비전 연구 커뮤니티는 인터넷에서 많은 데이터 세트를 게시하는 데 능숙합니다. 그래서 여러분이 만약 Image Net, MS COCO 또는 파스칼 유형의 데이터 세트를 들으면 사람들이 온라인에 올리는 다양한 데이터 세트의 이름이고 많은 컴퓨터 연구자들이 알고리즘을 훈련해 왔습니다.

이러한 트레이닝에는 몇 주가 걸리고 GP에서의 사용도 많아질 수 있습니다. 또한 다른 사람이 이 작업을 수행해 자신의 신경망에 대한 매우 좋은 초기화로 사용하기 위해서 다른 누군가가 몇 주나 걸린 오픈 소스 방식을 다운로드 할 수도 있고 몇 달 동안 고생하는 고성능 검색 프로세스를 거쳤다는 사실도 있습니다.

또한 전이 학습을 이러한 매우 큰 공용 데이터 세트의 일부로부터 자신의 문제로 분류시키는 것에 전이 학습을 사용할 수 있다는 뜻입니다. 그 방법을 좀 더 자세히 살펴보겠습니다.

---

![image](https://user-images.githubusercontent.com/55765292/185057762-6109d4a4-c626-4d59-bf7a-0d1cf70d61c8.png)

이 예제로 시작해 보시죠. 자신의 애완 고양이를 인식하기 위해 고양이 탐지기를 만든다고 가정해 봅시다. 인터넷에 따르면 Tigger는 일반적인 고양이 이름이고 Misty는 또 다른 흔한 고양이 이름입니다. 여러분의 고양이 이름이 Tigger, Misty, 둘 다 아님 이라고 합시다.

여러분은 세 개의 클래스 분류에 문제가 있습니다. 이 사진은 Tigger인가요? 아니면 Misty인가요? 아니면 둘 다 아닌가요? 그리고 두 고양이의 모든 경우에 고양이가 그림에 등장합니다.

자, 여러분은 아마도 Tigger 또는 Misty의 사진이 그리 많지 않으므로 훈련 세트는 작을 것입니다. 어떻게 해야 할까요? 온라인에 접속해서 오픈 소스 구현을 다운로드 할 수도 있습니다. 코드뿐만 아니라 가중치도 다운로드 받을 수 있습니다. 이미 트레이닝 된 다운로드 받을 수 있는 네트워크들이 많이 있습니다.

예를 들자면, 1000 개의 다른 클래스들이 있는 Init Net 데이터 세트죠. 그러면 그 네트워크는 1000개의 가능한 클래스 중 하나를 출력하는 softmax 장치가 있을 수 있습니다. 여러분이 할 수 있는 일은 softmax 레이어를 없애고 Tigger 나 Misty를 출력하는 softmax 유닛을 생성하는 것입니다.

네트워크의 관점에서 볼 때, 이러한 모든 레이어를 고정 된 상태로 생각하여 네트워크의 모든 레이어에서 파라미터를 고정시키고 softmax 레이어와 관련된 파라미터를 조정할 것을 권장합니다.

세 가지 가능한 출력인 Softmax 레이어는 어느 것인가요. Tigger 나 Misty 또는 둘 다 아님 인가요? 다른 누군가의 자유 교환 방식을 사용하면 작은 데이터 세트로도 꽤 좋은 성능을 얻을 수 있습니다.

다행스럽게도 프레임워크를 학습하는 많은 사람들이 이 작업 모드를 지원합니다. 그리고 사실 프레임워크에 따라서는 훈련 가능한 파라미터가 0인 경우가 있고 이러한 초기 레이어 중 일부에 대해 설정할 수 있습니다.

다른 사람들은 단지 그런 방법들을 훈련시키지 않거나 때로는 고정이 0 인 파라미터를 가지게 됩니다. 특정 레이어와 관련된 방법을 교육할지 여부를 지정할 수 있는 다양한 방법 및 다양한 딥 러닝 프로그램 프레임워크입니다. 이 경우 softmax 레이어 방식만 훈련하고 이전 레이어 방법은 모두 고정합니다.

일부 구현에 도움이 될 수 있는 또 다른 깔끔한 기술은 이러한 모든 초기 리드가 고정되어 있기 때문에 변경하지 않기 때문에 변경되지 않는 고정 기능이 있습니다. 이 입력 이미지 동작을 가져 와서 해당 레이어의 활성화 세트에 매핑하는 훈련을 실시하지 않습니다.

훈련 속도를 높일 수있는 방법 중 하나는 해당 레이어와 그 레이어의 재활성화 기능을 미리 계산하여 디스크에 저장하는 것입니다. 여러분이 하고 있는 것은 이 고정된 기능을 사용하여 신경망의 이 부분에서, 이 입력된 이미지 X를 사용하여 특징 벡터를 계산하고 이 특징 벡터로부터 얕은 softmax 모델을 훈련하여 예측을 합니다.

이는 훈련 세트의 모든 예제에 대해 레이어 활성화를 사전 계산을 실시해 디스크에 저장 한 다음 거기에 softmax를 훈련하는 것으로 계산에 도움이 됩니다.

안전 디스크, 사전 계산 방법 혹은 안전 디스크의 장점은 훈련 세트를 통해 에포치를 만들고 할 때마다 그 활성화들을 재계산 할 필요가 없다는 것입니다 이것은, 업무에 필요한 훈련 세트가 꽤 작은 경우에 실시하는 작업입니다.

더 큰 훈련 세트가 있는지 여부를 위해 한 가지 최고의 규칙은 여러분이 더 큰 라벨의 데이터 세트를 가지고 있고 Tigger와 Misty, 그리고 둘 다 아님의 아주 많은 사진을 가지고 있다면 여러분이 할 수 있는 일은 더 적은 레이어를 고정하는 것 입니다.

이 레이어만 고정하고 나중에 레이어만 훈련하면 될 것 같습니다. 출력 레이어의 클래스가 다른 경우는 Tigger, Misty 어느 쪽이든 독자적인 출력 유닛이 필요합니다.

이 작업에는 몇 가지 방법이 있습니다. 마지막 몇 개의 레이어 방법을 사용하여 초기화로 사용하고 그곳에서 기울기 하강을 수행하거나 마지막 몇 개의 레이어를 날려버리고 새로운 은닉 유닛과 최종 softmax 출력으로 사용할 수도 있습니다.

이 중 어느 것이 든 시도 할 가치가 있습니다.

그러나 한 가지 패턴은 데이터가 더 많으면 고정된 레이어의 수가 줄어들고 위에서 훈련하는 레이어 수가 늘어날 수 있습니다. 즉, 데이터 세트를 선택해서 하나의 softmax 유닛을 훈련시키기 위한 데이터뿐만 아니라 최종 네트워크의 마지막 몇 레이어를 구성하는 다른 크기의 신경망을 훈련시키기 위한 데이터도 충분히 가지고 있을 수 있다는 것입니다.

마지막으로 많은 양의 데이터를 가지고 있다면 이 오픈 소스 네트워크와 방법을 사용하여 네트워크 전체를 초기화하고 훈련시키는 것과 같습니다. 이것이 1000개의 softmax 이고 출력이 3개밖에 없는 경우에는 자체 softmax 출력이 필요합니다. 관심 있는 라벨의 출력입니다.

하지만 작업에 필요한 라벨의 데이터가 많고 Tigger, Misty 그리고 둘 다 아님의 사진이 많을수록, 여러분은 더 많은 레이어를 훈련할 수도 있고 심한 경우 초기화와 같이 다운로드 한 방법들을 사용할 수도 있습니다. 따라서 그들은 초기화를 대체하고 랜덤 초기화를 수행한 후 기울기 하강, 네트워크의 모든 방법과 레이어를 업데이트 하는 훈련을 할 수 있습니다.

---

이것이 컨볼네트의 훈련을 위한 전이 학습입니다. 실제로 인터넷상의 오픈 데이터 세트는 매우 크고 다른 사람이 몇 주 동안 훈련을 받은 다운로드 방법은 매우 많은 데이터로부터 배웠기 때문에 많은 컴퓨터 비전 어플리케이션에서 다운로드하면 훨씬 더 효율적이라는 것을 알 수 있습니다.

다른 사람의 오픈 소스 방식을 사용하여 문제를 초기화할 수 있습니다. 모든 다른 분야에서 딥러닝의 모든 다른 응용분야에서 컴퓨터 비전은 전이 학습을 거의 항상 실시할 필요가 있는 것이라고 생각합니다. 다른 모든 것을 처음부터 직접 교육할 수 있는 매우 큰 데이터 세트를 보유하고 있지 않다면 말이죠.

그러나 전이 학습은 모든 것을 처음부터 혼자서 훈련할 수 있는 매우 큰 데이터 집합과 매우 큰 계산 예산이 없는 한 진지하게 고려할 가치가 있습니다.


### Data Augmentation

대부분의 컴퓨터 비전 작업은 더 많은 데이터를 사용할 수 있습니다. 데이터 증강은 컴퓨터 비전 시스템의 성능을 향상시키는 데 자주 사용되는 기술 중 하나입니다.

저는 컴퓨터 비전이 꽤 복잡한 과제라고 생각합니다. 여러분이 이 이미지와 이 모든 픽셀을 입력 한 다음 이 사진 안에 보이는 것이 무엇인지 알아내야 합니다. 그러기 위해서는 꽤 복잡한 기능을 배워야 할 것 같습니다.

그리고 실제로는 거의 모든 경쟁 비전 태스크가 더 많은 데이터를 가지고 있으면 도움이 됩니다. 이것은 때로는 충분한 데이터를 얻을 수있는 다른 도메인과는 달리 더 많은 데이터를 확보해야하는 부담을 느끼지 않습니다.

그러나 저는 오늘날에 이 데이터 컴퓨터 비전은, 대다수의 컴퓨터 비전 문제로 인해 충분한 데이터를 얻을 수 없다고 생각합니다. 그리고 이것은 머신러닝의 모든 응용 프로그램에 적용되는 것은 아니지만 컴퓨터 비전에 맞는 것처럼 느껴집니다. 즉, 컴퓨터 비전 모델을 훈련할 때는 데이터 증대가 도움이 되는 경우가 많습니다.

그리고 이것은 이전 학습을 사용하거나 누군가가 사전 훈련한 방법들을 사용해 시작하거나 혹은 처음부터 무언가를 훈련 시키려고 하든간에 사실입니다. 컴퓨터 비전의 일반적인 데이터 증강에 대해 살펴보겠습니다.

#### Common augmentation method

![image](https://user-images.githubusercontent.com/55765292/185060508-05e99023-3d0a-4bea-9e73-d57c7937b76d.png)

아마도 가장 간단한 데이터 증강 방법은 수직 축에서 **미러링mirroring**하는 것일텐데요. 여기서 훈련 세트에 이 예가 있으면 오른쪽으로 그 이미지를 가져오기 위해 수평으로 뒤집습니다.

그리고 대부분의 컴퓨터 비전 작업에서 왼쪽 그림이 고양이라면 미러링은 고양이 일뿐입니다. 또한 미러링 작업을 통해 그림에서 인식하려는 내용이 모두 보존된다면 데이터 증강 기술을 사용하는 것이 좋습니다.

또 다른 일반적으로 사용되는 기술은 임의의 **크롭crop**입니다. 이 데이터 세트에 따라 몇 가지 무작위 크롭을 선택해 봅니다. 그래서 여러분은 그것을 골라 낼 수 있고 그 크롭을 가져 가거나 그 크롭을 이 크롭에 가져갈 수도 있고 이걸 취해서 이 크롭을 취하고 그러면 여러분의 데이터 세트의 다른 무작위 크롭인 훈련 샘플에 주기 위해 다른 예시들을 여러분에게 줄 것입니다.

그래서 임의의 크롭핑은 완벽한 데이터 증강이 아닙니다. 만약 여러분이 고양이처럼 보이는 이 크롭을 취하면 어떻게 될까요? 실제 이미지에서 랜덤 크롭이 상당히 큰 부분 집합인 한 실제로는 가치가 있습니다.

따라서 **미러링과 임의의 크롭**이 자주 사용되며 이론적으로는 회전, 이미지 깎기와 같은 것을 사용할 수 있기 때문에 이렇게 이미지에 적용하면 왜곡 시키며 다양한 형태의 지엽적인 뒤틀림 등을 적용 할 수 있습니다. 그리고 이 모든 것을 시도해 봐도 별로 나쁠 것은 없지만 실제로는 조금 덜 사용되는 것 같기도 하고 복잡하기 때문일 수도 있습니다.

#### Color shifting

![image](https://user-images.githubusercontent.com/55765292/185060663-b53df152-7b93-4743-9468-08b8c3460aa4.png)

일반적으로 사용되는 데이터 증강의 두 번째 유형은 **색상 이동color shifting**입니다. 이와 같은 그림이 주어진다면 R, G 및 B 채널에 다른 왜곡을 추가한다고 가정 해 봅시다.

이 예에서는 빨간색 및 파란색 채널을 추가하고 녹색 채널에서 뺍니다. 그래서 빨간색과 파란색은 보라색을 만듭니다. 따라서 전체 이미지가 좀 더 보라색으로 바뀌게 되고 훈련 세트에 왜곡된 이미지가 생성됩니다.

일러스트를 위해 색상과 연습에 다소 극적인 변경을 가하고 있습니다. 여러분은 작은 분포에서 R, G, B를 그립니다. 여러분이 할 일은 R, G, B의 다른 값들을 취하고 색상 채널을 왜곡시키기 위해 사용하는 것입니다.

따라서 두 번째 예에서는 빨간색이 적고 녹색과 파란색이 많아지면서 이미지가 약간 노란 색으로 변합니다. 그리고 여기에서 우리는 훨씬 더 파랗게 만들고 있습니다. 조금 더 길게 만듭니다.

그러나 실제로 R, G, B 값은 어떤 확률 분포로부터 도출됩니다. 그 이유는 햇빛이 조금 노랗거나 어쩌면 목표물 조명이 조금 더 노랗다면 이미지의 색상을 쉽게 바꿀 수 있지만 고양이의 정체성이나 내용물의 정체성 y라는 라벨은 그대로입니다.

이러한 색 왜곡을 도입하거나 색 변화를 실시함으로써 학습 알고리즘을 이미지 색상의 변화에 보다 견고하게 할 수 있습니다.

#### Implementing distortions during training

![image](https://user-images.githubusercontent.com/55765292/185060733-f65e8446-a069-499f-b34b-e2beda730a0c.png)

따라서 하드 디스크에 훈련 데이터를 저장하고 하드 디스크를 나타내기 위해 이 둥근 버킷 기호인 기호를 사용할 수 있습니다. 그리고 작은 훈련 세트를 가지고 있다면 여러분은 거의 모든 것을 할 수 있고 괜찮으실 겁니다.

하지만 마지막 훈련 세트는 사람들이 자주 구현하는 방법입니다. 즉, 하드 디스크의 이미지를 항상 로드하는 CPU 스레드가 있을 수 있습니다.

따라서 여러분은 하드 디스크에서 들어오는 이미지 스트림을 가지는 것입니다. CPU 스레드를 사용하여 왜곡, 랜덤 자르기, 색상 이동 또는 미러링을 구현할 수 있습니다. 하지만 그래도 각 이미지에서 왜곡된 버전으로 끝낼 수 있습니다.

자, 이 이미지를 보도록 하겠습다. 그것을 미러링을 하고 색상 왜곡 등을 구현하면 됩니다. 그리고 이 이미지가 색이 바뀌면 결국 다른 색상의 고양이로 끝나게 CPU 스레드는 지속적으로 데이터를 로드하고 데이터 배치를 구성하기 위해 왜곡이 필요한지 또는 실제로 많은지를 구현합니다.

그리고 이 데이터는 훈련을 실시하기 위한 다른 스레드나 프로세스에 지속적으로 전달하며 이 작업은 CPU나 대규모 신경 네트워크가 있는 경우 GPU에서 수행할 수 있습니다.

따라서 데이터 증강을 구현하는 일반적인 방법은 데이터를 로딩하고 왜곡을 구현하는 역할을 하는 스레드 1개 거의 4개의 스레드를 가진 다음 다른 스레드 또는 다른 프로세스에 전달하여 훈련을 수행하는 것입니다.

그리고 종종 이것들은 병렬로 실행될 수 있습니다. 데이터 증강을 위한 것입니다. 그리고 심층 신경망을 훈련하는 다른 부분과 마찬가지로 데이터 증강 과정은 몇 개의 하이퍼 파라미터를 가지고 있습니다.

예를들어 어떻게 색상 변경을 구현할지 임의의 크롭핑에는 정확히 어떤 파라미터를 사용하는지 말이죠. 따라서 컴퓨터 비전의 다른 부분과 마찬가지로 시작하기에 좋은 장소는 다음과 같습니다. 데이터 증강을 사용하는 방법에 대한 른 사용자의 오픈 소스 구현입니다.

하지만 물론 더 많은 분산을 포착하고 싶다면 다른 사람의 오픈 소스 구현이 아니라고 생각하겠지만요. 하이퍼 파라미터를 직접 사용하는 것도 합리적일 수 있습니다. 따라서 데이터 증강을 사용하여 컴퓨터 비전 애플리케이션을 더 잘 작동시키시기 바랍니다.
