---
title: "[Ⅳ. Convolutional Neural Networks] Special Applications (1)"
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
toc_label: "Special Applications (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/183551502-3482e2d7-efb0-4815-9c94-b662606b4842.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Special Applications

## Face Recognition

### What is Face Recognition

지금까지 여러분은 컨볼네트에 대해 많은 것을 배웠습니다. 이제는 몇 가지 중요한 특별한 컨볼네트 응용프로그램을 보겠습니다.

얼굴 인식에 대한 것으로 시작한 다음 신경전달으로 넘어가서 문제 연습에서 구현하고 자신만의 예술작품을 만들 수 있습니다.

바이두의 얼굴 인식 시스템을 보면 얼굴 인식뿐만 아니라 생체 인식도 모두 시연했습니다. 후자는 여러분이 살아있는 인간이라는 것을 의미합니다.

생체 감지는 지도 학습을 통해서도 구현 될 수 있으며 살아있는 사람 대 살아있지 않은 사람을 예측할 수 있습니다. 하지만 시간을 절약하고 싶군요. 그 대신 시스템에서 얼굴 인식 부분을 만드는 방법을 이야기하는 데 집중하도록 하죠.

먼저, 얼굴 인식에 사용되는 몇 가지 용어를 살펴 보겠습니다.

#### Face verification vs. face recognition

![image](https://user-images.githubusercontent.com/55765292/186801948-fff025db-000f-4d4f-90db-d7f432a05ee9.png)

얼굴 인식 문헌을 보면 사람들은 종종 **얼굴 검증face verification**과 **얼굴 인식face recognition**에 대해 이야기합니다.

얼굴 검증 문제란 사람의 이름이나 ID는 물론 입력 이미지가 주어졌을 때 시스템의 작업이 입력 이미지가 요청한 사람의 것이 맞는지 그 여부를 확인하는 것입니다. 그래서 가끔은 일대일 문제라고도 부르며 그 사람이 이것을 요청한 바로 그 사람이 맞는지 여부를 알게 됩니다.

따라서 인식 문제는 검증 문제보다 훨씬 어렵습니다. 그 이유를 알아보기 위해 99 퍼센트의 정확성을 갖춘 검증 시스템이 있다고 가정 해 봅시다. 99 퍼센트는 그렇게 나쁘지는 않겠지만 만약 이제는 인식 시스템에서 K = 100이라고 가정해봅시다. 데이터베이스에 100명의 사용자가 있는 인식 태스크에 이 시스템을 적용하면 실수할 확률이 100배가 되고 각 사람에게 실수할 확률이 1%에 불과합니다.

따라서 데이터베이스가 있는 경우 100명의 사람이 그리고 여러분이 만약 허용 가능한 인식 오류를 원할 경우 99.9 이상의 정확도를 가진 검증 시스템이 필요할 수 있으며 이 시스템을 100명의 데이터베이스로 실행하기 위해서는 정확도가 매우 높지만 오류가 발생할 가능성이 있습니다.

사실, 여러분이 100 명으로 구성된 데이터베이스를 가지고 있다면 현재 잘 작동하기 위해서는 99 % 이상이어야 합니다. 하지만 다음 몇 개의 영상에서는 얼굴 검증 시스템을 구성 요소로 구축하는 데 초점을 맞추고 정확도가 충분히 높으면 인식 시스템에도 사용할 수 있습니다.

다음에는 얼굴 검증 시스템을 구축하는 방법에 대해 설명하겠습니다. 이것이 어려운 문제라고 생각되는데요. 이는 원샷 학습 문제를 해결해야 하기 때문입니다.

### One Shot Learning

얼굴 인식의 도전중 하나는 바로 여러분이 원샷 학습 문제를 해결 해야 한다는 것입니다. 즉, 대부분의 얼굴 인식 어플리케이션에서 단 하나의 이미지나 얼굴의 예를 하나만 제시해도 그 사람을 알아볼 수 있어야 합니다.

역사적으로 볼 때, 딥러닝 알고리즘은 훈련 사례가 하나만 있는 경우 제대로 작동하지 않습니다. 이게 무엇을 뜻하는지 예를 보죠. 그리고 이 문제를 해결하는 방법에 대해 이야기 해 봅시다.

![image](https://user-images.githubusercontent.com/55765292/186803105-38d56244-a091-46f1-a18d-43e4347119ac.png)

예를 들어, 조직 내 직원 사진 4장 분량의 데이터베이스가 있다고 가정해 보겠습니다. 이들은 실제로 제 딥러닝 AI 동료들인 Khan, Daniel, Younes 및 Thian 입니다.

이제 누군가가 사무실에 나타나서 개찰구를 통과하길 원한다고 가정 해 봅시다. 이 시스템이해야 할 일은 Daniel의 단 하나의 이미지만 본 적이 있음에도 불구하고 실제로 이것이 같은 사람이라는 것을 인식하는 것입니다.

반대로 데이터베이스에 없는 사람을 발견하면 데이터베이스 내의 네 명의 사용자 중 하나가 아님을 인식해야 합니다.

따라서 원샷러닝 문제에서는 한 가지 예를 통해 학습해서 그 사람을 다시 인식해야 합니다. 또한 대부분의 얼굴 인식 시스템이 사용하는 이유는 한 장의 사진만 있을 수 있기 때문입니다. 직원 데이터베이스 내의 직원 또는 팀 구성원 각각에 대해 이 정보가 필요합니다.

따라서 시도 할 수 있는 한 가지 방법은 사람의 이미지를 입력하고 컨볼네트로 보내는 것입니다. 또한 4개의 출력 또는 이들 4명의 각각에 대응하는 5개의 출력을 가진 softmax단위를 사용하여 라벨 y를 출력하도록 합니다. 그러면 softmax에서 이것은 5 개의 출력이 될 것입니다.

그러나 이것은 실제로 잘 작동하지 않습니다. 왜냐하면 이렇게 작은 훈련 세트를 가지고 있다면 이 작업을 위한 강력한 신경망을 훈련시키기에 충분하지 않기 때문입니다.

그리고 새로운 사람이 여러분의 팀에 합류하면 어떻게 될까요? 그래서 지금 여러분이 인식해야 할 다섯 명이 있으니 이제 6 개의 출력이 있어야 합니다. 매번 컨볼네트를 재 학습 시켜야 할까요? 그것은 좋은 접근법으로 보이지 않습니다

따라서 얼굴 인식을 수행하고 원샷 학습을 수행하기 위해서요. 또한 이 작업을 수행하기 위해서 할 일은 **유사 함수similarity function**를 배우는 것입니다.

#### Learning a "similarity" function

![image](https://user-images.githubusercontent.com/55765292/186803135-f6ec3222-556e-4165-9533-47b56ee4be8f.png)

특히 여러분은 신경망 d를 나타내는 함수를 학습하기를 원하는데요. 이 함수는 두 이미지를 입력하고 두 이미지 간의 차이 정도를 출력합니다. 두 이미지가 같은 사람인 경우 여러분은 이것이 작은 숫자를 출력하기를 바랍니다. 두 이미지가 서로 매우 다른 두 사람의 이미지 일 경우 여러분은 그것이 큰 숫자를 출력하기를 바랍니다.

그래서 인식 시간 동안 그것들 사이의 차이의 정도가 $\tau_{tau}$ 라고 불리는 어떤 임계 값보다 작으면 이는 하이퍼 파라미터입니다. 그러면 이 두 그림이 같은 사람이라는 것을 예측할 수 있습니다.

그것이 $\tau$ 보다 크다면 여러분은 이들이 다른 사람들이라고 예측할 것입니다. 이것이 얼굴 검증 문제를 해결하는 방법입니다.

이것을 인식 작업에 사용하려면 새로운 그림이 주어지면 이 함수 d를 사용하여 이 두 이미지를 비교하는 것입니다. 그리고 아마도 이 예제에서는 매우 큰 숫자를 출력 하겠지만 10 이라고 가정 해 봅시다.

그런 다음 이것을 데이터베이스의 두 번째 이미지와 비교합니다. 그리고 이 두 사람이 같은 사람이기 때문에 아주 작은 숫자를 출력 해 주세요. 데이터베이스의 다른 이미지 등에 대해서도 이렇게 합니다.

그리고 이것을 바탕으로 실제로 이 사람이 Daniel인 것을 알 수 있습니다. 이와는 대조적으로 데이터베이스에 없는 사람이 나타나면 함수 d를 사용하여 이러한 모든 쌍 비교를 수행 할 때, 네 쌍 비교 모두에 대해 매우 큰 숫자가 출력되어야합니다.

그러면 여러분은 데이터베이스에 있는 네 명 중 그 누구도 아니라고 말하게 되는 것이죠. 어떻게 이것이 원샷 학습 문제를 풀 수 있도록 해주는지 잘 보세요.

여러분이 이 함수 d를 배울 수 있는 한 한 쌍의 이미지를 입력하면 기본적으로 동일한 인물인지 다른 인물인지를 알려줍니다. 그런 후에 만약 새로운 사람이 여러분의 팀에 합류하면 데이터베이스에 다섯 번째 사람을 추가 할 수 있고 그럼 잘 작동합니다.

이 d함수를 어떻게 학습하는지를 보셨고 이렇게 두 개의 이미지를 입력하면 원샷 학습 문제를 해결할 수 있습니다. 다음에는 실제로 신경망이 이 함수 d를 학습하게 하는 방법을 살펴 보겠습니다.

### Siamese Network

#### Goal of Learning

지난 영상에서 배웠던 함수 d의 작업은 두 얼굴을 입력해서 얼마나 닮았는지 얼마나 다른지 알려주는 겁니다. 이를 수행하는 좋은 방법은 **샴 네트워크siamese network**를 사용하는 것입니다. 한번 자세히 살펴볼까요.

![image](https://user-images.githubusercontent.com/55765292/186804892-b84ee15b-4c93-4fa6-b7e0-84d9f956ce09.png)

여러분께서는 이러한 컨볼네트 사진을 보는 것에 익숙하시죠. $x^{(1)}$이라는 이미지를 입력해보겠습니다. 그리고 일련의 컨볼루션 층과 풀링 층과 완전히 연결된 층을 통해 이런 특성 벡터를 얻을 수 있습니다. 그리고 때로는 분류를 위해 softmax 유닛에 공급되기도 합니다.

이번에는 그렇게 하진 않을 겁니다. 맨 오른쪽 벡터에 초점을 맞춰 보겠습니다. 예를들어 128개의 숫자가 네트워크 내의 더 깊은 곳에 있는 완전히 연결된 층에 의해 계산됩니다. 그리고 이 128개의 숫자 목록에 이름을 붙여보죠. 

먼저 $f(x^{(1)})$이라고 부르겠습니다. $f(x^{(1)})$은 바로 $x^{(1)}$의 입력 이미지를 인코딩하는 것으로 생각해야 합니다. Khan의 이 그림을 입력 이미지로 취해서 128 개 숫자의 벡터로 다시 표현합니다. 얼굴 인식 시스템을 구축하는 방법은 두 사진을 비교하려면 첫 번째 사진과 두 번째 사진을 비교합니다.

이 두 번째 그림을 같은 신경망에 같은 파라미터로 전송하여 128개의 다른 벡터를 얻을 수 있고, 그것은 두 번째 그림을 암호화하는 것입니다. 그래서 저는 이 두 번째 그림을 그래서 저는 이 두 번째 그림 인코딩을 $f(x^{(2)})$라고 부르고 여기서 저는 이 두 입력 이미지를 표시하기 위해 $x^{(1)}$과 $x^{(2)}$를 사용합니다.

이것이 반드시 훈련세트에 있는 첫 번째 및 두 번째 예시일 필요는 없습니다. 어떤 두 장의 사진이든 상관없습니다.

마지막으로 이러한 인코딩이 이 두 이미지를 잘 나타내 준다고 생각한다면 여러분이 할 수 있는 것은 $x^{(1)}$과 $x^{(2)}$ 사이의 거리 이미지 d를 이 두 이미지의 인코딩의 차이의 표준으로서 이 이미지를 정의하는 것입니다.

두 개의 서로 다른 입력으로 두 개의 동일한 컨볼루션 신경망을 실행하고 그것들을 비교하는 것을 샴 신경망 아키텍처라고 부르기도 합니다. 여기 제시 한 많은 아이디어는 Yaniv Taigman, Ming Yang, Marc'AurelioRanzato와 Lior Wolf 가 작성한 논문에서 비롯되었는데요. 그들이 개발한 연구 시스템에서 DeepFace라고 불리는 논문입니다.

그럼 이 샴 신경망을 어떻게 훈련 시키나요? 이 두 신경망에는 동일한 파라미터가 있음을 기억하세요. 따라서 신경망을 실제로 훈련시키면 두 그림이 같은 인물일 때 이를 알려주는 함수 d가 생성됩니다.

#### Goal of Learning

![image](https://user-images.githubusercontent.com/55765292/186804922-7ad01d5b-be1a-4e0c-b6be-6299834860fb.png)

더 형식적으로 신경망의 파라미터는 $f(x^{(i)})$의 인코딩을 정의합니다. 그래서 임의의 입력 이미지 $x^{(i)}$가 주어지면 신경망은 이 $f(x^{(i)})$를 인코딩하여 이 128차원을 출력합니다.

더 형식적으로 하고 싶은 것은 파라미터를 학습해서 만약 같은 사람의 두 그림 $x^{(i)},x^{(j)}$가 있다면 여러분은 인코딩 사이의 거리가 작기를 바랍니다. 이전 그림에서는, $x^{(1)}$과 $x^{(2)}$를 사용했어요.

하지만 이것은 사실 훈련 세트에서 $x^{(i)}$와 $x^{(j)}$의 쌍입니다. 반대로, $x^{(i)}$와 $x^{(j)}$가 서로 다른 사람이라면 인코딩 간의 거리가 길어져야 합니다.

따라서 신경망의 모든 층에서 파라미터를 변경하면 결국 다른 인코딩으로 끝나게 됩니다. 그리고 여러분이 할 수 있는 것은 역전파를 사용하고 이러한 조건들을 만족시키기 위해 모든 파라미터를 변화시키는 것입니다.

이렇게 샴 네트워크 아키텍처에 대해 배워보았습니다. 좋은 인코딩을 만드는 관점에서 신경망이 무엇을 출력하게 해야 하는지에 대한 감각을 얻었습니다.

하지만 신경망이 여기서 논의한 것을 학습하도록 하는 객관적인 함수는 어떻게 정의할 수 있을까요? 삼중항 손실 함수를 사용하여 어떻게 할 수 있는지 다음에 보겠습니다.