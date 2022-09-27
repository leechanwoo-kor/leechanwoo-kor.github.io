---
title: "[Ⅴ. Sequence Models] Sequence Models & Attention Mechanism (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Natural Language Processing
  - Long Short Term Memory (LSTM)
  - Gated Recurrent Unit (GRU)
  - Recurrent Neural Network
  - Attention Models
toc: true
toc_sticky: true
toc_label: "Sequence Models & Attention Mechanism (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/187809649-f4918caf-ae96-4f46-a0cf-42ba990450d9.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Sequence Models & Attention Mechanism

## Sequence to Sequence Models

### Basic models

이번에는 Sequence to Sequence에 대해 이야기 하겠습니다. 이는 기계 번역에서 음성인식까지 모든 것에 유용하죠. 기본 모델로 시작해서 빔 서치 어텐션 모델, 그리고 스피치와 같은 오디오 데이터에 대한 모델 논의를 다룰 것입니다. 시작해 보죠.

#### Sequence to Sequence Model

![image](https://user-images.githubusercontent.com/55765292/192558133-1fa3f261-09c3-4cb3-9263-8f4977297071.png)

여러분이 

> Jane visite I'Afrique Septembre

와 같은 프랑스어를 입력해보고 싶다고 합시다. 그리고 그것을 영어 문장으로 바꾸고 싶다면

> Jane is visiting Africa in September

평소대로 $x^{< 1>}$ 에서 $x^{<5>}$를 사용합니다. 이 경우에 5는 단어와 input 시퀀스를 나타냅니다. 그리고 $y^{<1>}$ 에서 $y^{<6>}$을 사용해 output 시퀀스의 단어를 나타냅니다. 그래서 어떻게 신경망을 훈련시켜 시퀀스 X를 input하고 시퀀스 y를 output 할 수 있을까요?

먼저 인코더 네트워크라고 하는 네트워크를 RNN으로 구축합니다. 그리고 이는 GRU 또는 LSTM이 될 수 있는데, 입력 프랑스 단어를 한 번에 한 단어씩 넣습니다. input 시퀀스 RNN을 수집한 후 input 문장을 나타내는 벡터를 output 합니다.

그러고 나서 디코드된 네트워크를 빌드할 수 있는데요. 여기다 그려 보죠. 이는 왼쪽에 검은색으로 표시된 인코딩 네트워크에 의한 인코딩 output을 input을 해서 인코더 네트워크에 의해 한 번에 한 단어씩 번역을 output 하도록 시킬 수 있습니다.

궁극적으로 이는 시퀀스의 끝과 디코더가 멈추는 문장을 말할 수 있게 해줍니다. 그리고 평소처럼 생성기 토큰을 가져다 닉스에게 공급하면 언어 모델을 사용해 기술을 합성할 때 이전과 같은 순서를 유지할 수 있습니다.

딥 러닝에서 가장 주목할 만한 최근 결과들 중 하나가 바로 이 모델이 작동한다는 것입니다. 충분한 프랑스어 문장과 영어 문장들을 주어서 모델을 프랑스어 문장을 input하고 그에 상응하는 영어 번역을 output 하도록 훈련시키면 이것은 실제로 잘 작동됩니다.

이 모델은 단순히 input이 된 프랑스어 문장의 인코딩을 찾는 인코딩 네트워크를 사용합니다. 그리고 디코딩 네트워크를 사용해 상응하는 영어 번역을 생성하죠.

#### Image Captioning

![image](https://user-images.githubusercontent.com/55765292/192558322-80b39e9a-91da-4b95-be99-2ada8640bfa9.png)

이와 매우 유사한 구조 또한 이미지 캡션image captiong에도 작동됩니다. 여기 보이는 것과 같은 이미지를 볼 때 자동적으로

> A cat sitting on a chair

로 자막을 달아지게 하려 합니다. 그러면 어떻게 네트워크에서 이미지를 input하고 위에 있는 저런 자막을 output 하도록 훈련시킬까요?

자신감에 대한 이전 호출에서 여러분은 이미지를 컨볼루션 네트워크로 미리 훈련된 AlexNet에 input 하는 방법을 살펴 보았으며 그리고 input 이미지의 기능에 학습자를 인코딩하는 방법을 배웠습니다. 그래서 이는 실제로 AlexNet 구조입니다. 그리고 만약 우리가 이 마지막 소프트맥스 단위를 제거하면 자유 무역 AlexNet은 고양이 이미지를 나타낼 수 있는 4,096차원 특성벡터를 제공할 수 있습니다.

이 사전 훈련된 네트워크는 이미지에 대한 인코딩된 네트워크가 될 수 있으며 여러분은 이제 이미지를 나타내는 4,096차원 벡터가 있습니다. 그런 다음 여러분은 이것을 가지고 한 번에 한 단어씩 자막을 생성하는 RNN에게 줄 수 있습니다.

우리가 본 프랑스에서 영어로 번역하는 기계 번역과 비슷하게 여러분은 이제 input을 설명하는 특성벡터를 input할 수 있습니다. 그리고 단어의 output 세트를 한 번에 한 단어씩 생성할 수 있죠.

그리고 이것은 이미지 캡션을 하는데 효과적입니다. 특히 여러분이 생성하고자 하는 자막이 너무 길지 않을 때 말이죠. 이제 여러분은 기본 시퀀스 대 시퀀스 모델 작동 방법을 보셨습니다.

기본 이미지에서 시퀀스로 혹은 이미지 캡셔닝 모델 작동 방법을 살펴 보셨죠 하지만 이런 모델을 실행하는 방법에는 몇 가지 차이점이 있는데요. 언어 모델을 사용해 소설 텍스트를 합성하는 방법과 비교해서 시퀀스를 생성하는 것이죠.

주요 차이점 중 하나는 번역에서 무작위로 선택하지 않아도 되는 것입니다. 여러분은 가장 가능성이 높은 번역을 원할 수도 임의로 선택한 캡션을 원하지 않을 수도 있지만 최상의 캡션과 가장 가능성이 높은 캡션을 원합니다. 그래서 그것을 어떻게 생성하는지 살펴보겠습니다.

### Picking the Most Likely Sentence

![image](https://user-images.githubusercontent.com/55765292/192560465-6170eac5-42cb-4ee2-a96b-af1f1122d817.png)


![image](https://user-images.githubusercontent.com/55765292/192560356-68b9002a-d42f-4447-97a8-ec6df4a2a94c.png)


![image](https://user-images.githubusercontent.com/55765292/192560562-acd28c7c-389c-43d0-a3d7-9fb2c1521c0e.png)
