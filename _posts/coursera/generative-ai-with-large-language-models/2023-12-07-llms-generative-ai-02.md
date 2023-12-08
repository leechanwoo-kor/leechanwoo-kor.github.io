---
title: "[Generative AI with Large Language Models] Introduction to LLMs and the generative AI project lifecycle (2)"
categories:
  - Generative AI with Large Language Models
tags:
  - Coursera
  - Generative AI with Large Language Models
toc: true
toc_sticky: true
toc_label: "Generative AI & LLM"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0abd4037-b960-49f7-8e43-a264ef42a0f7){: width="50%" height="50%"}{: .align-center}

<br><br>

# Text generation before transformers

## Generating text with RNNs

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c1d0799-398c-4662-bb45-72f933a7f42f" align="center" width="32%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3bc667c0-6d69-4efa-880b-a8a32a4d38ed" align="center" width="32%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dda7616b-2505-424b-b066-5b5c363e9130" align="center" width="32%">
</p>

생성 알고리즘은 새로운 것이 아니라는 점에 유의하는 것이 중요합니다. 이전 세대의 언어 모델에서는 순환 신경망 또는 RNN이라는 아키텍처를 사용했습니다. RNN은 당시에는 강력했지만 생성 작업을 잘 수행하는 데 필요한 컴퓨팅과 메모리의 양이 제한적이었습니다. 간단한 다음 단어 예측 생성 작업을 수행하는 RNN의 예를 살펴봅시다. 모델이 이전에 본 단어가 하나뿐이라면 예측 결과가 좋지 않을 수 있습니다. 텍스트에서 더 많은 이전 단어를 볼 수 있도록 RNN 구현을 확장하면 모델에서 사용하는 리소스를 크게 확장해야 합니다. 예측에 관해서는 모델이 여기서 실패했습니다.

모델을 확장했음에도 불구하고 여전히 올바른 예측을 할 수 있을 만큼 충분한 입력을 보지 못했습니다. 다음 단어를 성공적으로 예측하려면 모델이 이전 단어 몇 개 이상을 볼 수 있어야 합니다. 모델은 문장 전체 또는 문서 전체를 이해해야 합니다. 여기서 문제는 언어가 복잡하다는 것입니다.

<br>

## Understanding lanuage can be challenging

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4004723f-07f9-45cc-8b27-ba4928141952" align="center" width="49%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/34c1b769-7e30-4d35-a8de-6dc18c7e4dc5" align="center" width="49%">
</p>

많은 언어에서 하나의 단어는 여러 가지 의미를 가질 수 있습니다. 이것이 바로 동음이의어입니다. 이 경우 문장의 문맥을 통해서만 어떤 종류의 은행을 의미하는지를 알 수 있습니다. 문장 구조 내의 단어는 모호하거나 구문상 모호성이 있을 수 있습니다. "선생님은 책을 가지고 학생들을 가르쳤다."라는 문장을 예로 들어 보겠습니다. 교사가 책을 사용하여 가르쳤나요, 아니면 학생이 책을 가지고 있었나요, 아니면 둘 다였나요? 알고리즘이 인간의 언어를 이해하지 못할 때도 있는데 어떻게 이해할 수 있을까요?

<br>

## Transformers

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/51f09cc9-e897-4ee7-b074-752f0003b27f)

2017년, 구글과 토론토 대학교에서 '주의력만 있으면 된다'라는 논문이 발표된 후 모든 것이 바뀌었습니다. 트랜스포머 아키텍처가 등장한 것입니다. 이 새로운 접근 방식은 오늘날 우리가 보고 있는 제너레이티브 AI의 진보를 가져왔습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/49895fc0-efdf-44c8-9379-b68e0cdab670)

멀티코어 GPU를 사용하여 효율적으로 확장할 수 있고, 입력 데이터를 병렬 처리하여 훨씬 더 큰 학습 데이터 세트를 활용할 수 있으며, 결정적으로 처리하는 단어의 의미에 주의를 기울이는 법을 배울 수 있습니다. 주의만 기울이면 됩니다. 바로 제목에 있습니다.

<br><br>

# Transformers architecture

## Transformer

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b5df585b-0466-4095-83ab-ffeaf2c61f68)

트랜스포머 아키텍처를 사용하여 대규모 언어 모델을 구축하면 이전 세대의 RNN에 비해 자연어 작업의 성능이 크게 향상되고 재생 기능이 폭발적으로 증가합니다. 트랜스포머 아키텍처의 강점은 문장에 포함된 모든 단어의 관련성과 문맥을 학습하는 능력에 있습니다.

여기서 볼 수 있듯이 이웃 단어 옆에 있는 각 단어뿐만 아니라 문장의 다른 모든 단어와도 연관성이 있습니다. 이러한 관계에 관심도 가중치를 적용하여 모델이 입력된 단어의 위치에 관계없이 각 단어와 다른 단어의 관련성을 학습하도록 합니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/31be07c9-1c81-4ac0-9167-5ab919d74a8e)

<br>

## Self-attention

이를 통해 알고리즘은 누가 책을 가지고 있는지, 누가 책을 가지고 있을 수 있는지, 그리고 그 책이 문서의 더 넓은 맥락과 관련이 있는지를 학습할 수 있습니다. 

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/873c1657-748d-4b6d-a483-70846c654301)

이러한 관심도 가중치는 LLM 훈련 중에 학습되며, 이번 주 후반에 이에 대해 자세히 알아보겠습니다. 이 다이어그램을 주의도 맵이라고 하며 각 단어와 다른 모든 단어 사이의 주의도 가중치를 설명하는 데 유용할 수 있습니다. 이 양식화된 예시에서는 책이라는 단어가 교사라는 단어 및 학생이라는 단어와 강하게 연결되어 있거나 주의를 기울이고 있음을 알 수 있습니다. 이를 셀프 어텐션라고 하며, 전체 입력에 걸쳐 이러한 방식으로 긴장감을 학습하는 능력은 모델의 언어 인코딩 능력을 크게 인정받습니다.

이제 트랜스포머 아키텍처의 핵심 속성 중 하나인 자기 주의에 대해 살펴보았으니 이제 모델이 어떻게 작동하는지 자세히 살펴보겠습니다.

## Transformers

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9e0bff25-5009-47a7-b52f-81af15dd98d4" align="center" width="49%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7902814b-d0fb-4da2-8236-2b6e64f3e733" align="center" width="49%">
</p>

다음은 이러한 프로세스가 어디에서 진행되는지 자세히 살펴볼 수 있도록 트랜스포머 아키텍처를 단순화한 다이어그램입니다. 트랜스포머 아키텍처는 인코더와 디코더의 두 부분으로 나뉩니다. 이러한 구성 요소는 서로 함께 작동하며 여러 가지 유사점을 공유합니다. 또한 여기에 표시된 다이어그램은 종이만 있으면 누구나 쉽게 이해할 수 있도록 만든 것입니다. 모델에 대한 입력이 하단에 있고 출력이 상단에 있는 것을 주목하세요. 가능한 한 이 과정 내내 이 원칙에 충실하려고 노력할 것입니다.

이제 머신러닝 모델은 거대한 통계 계산기에 불과하며 단어가 아닌 숫자로 작동합니다.


<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3c5054c-b1f2-4f66-a6ef-9add9d1dfb72" align="center" width="49%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1a175c1b-8555-4038-88ae-bbcb566170a2" align="center" width="49%">
</p>

따라서 처리할 텍스트를 모델에 전달하기 전에 먼저 단어를 토큰화해야 합니다. 간단히 말해, 단어를 숫자로 변환하고 각 숫자는 모델이 작업할 수 있는 모든 가능한 단어의 사전에서 위치를 나타냅니다. 여러 토큰화 방법 중에서 선택할 수 있습니다. 예를 들어, 두 개의 완전한 단어와 일치하는 토큰 ID를 사용하거나 토큰 ID를 사용하여 단어의 일부를 나타낼 수 있습니다. 여기에서 볼 수 있듯이. 중요한 것은 모델 학습을 위해 토큰화 방법을 선택한 후에는 텍스트를 생성할 때 동일한 토큰화 방법을 사용해야 한다는 것입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/94049919-d292-4ce0-af26-c1a5f67aa4e9)

이제 입력이 숫자로 표시되었으므로 임베딩 레이어로 전달할 수 있습니다. 이 레이어는 학습 가능한 벡터 임베딩 공간으로, 각 토큰이 벡터로 표현되고 해당 공간 내에서 고유한 위치를 차지하는 고차원 공간입니다. 어휘의 각 토큰 ID는 다차원 벡터와 일치하며, 이러한 벡터는 입력 시퀀스에서 개별 토큰의 의미와 문맥을 인코딩하는 방법을 학습하게 됩니다.

임베딩 벡터 공간은 자연어 처리에서 한동안 사용되어 왔으며, Word2vec과 같은 이전 세대 언어 알고리즘에서도 이 개념을 사용하고 있습니다. 이 개념이 익숙하지 않더라도 걱정하지 마세요. 강의 내내 이에 대한 예제를 보게 될 것이며, 이번 주 말의 읽기 연습에 추가 리소스에 대한 링크가 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7055e1e7-f9c9-4a0a-8de5-37bfa68b79cc)

샘플 시퀀스를 다시 살펴보면, 이 간단한 사례에서 각 단어가 토큰 ID에 매치되고 각 토큰이 벡터로 매핑된 것을 볼 수 있습니다. 원본 트랜스포머 문서에서 벡터의 크기는 실제로 512로, 이 이미지에 넣을 수 있는 것보다 훨씬 컸습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/61f936d8-a10d-4bac-8bf9-70b9aafa4bbd)

간단히 설명하기 위해 벡터 크기를 3이라고 가정하면, 단어를 3차원 공간에 그려서 단어 간의 관계를 확인할 수 있습니다. 이제 임베딩 공간에서 서로 가까이 있는 단어들을 어떻게 연관시킬 수 있는지, 그리고 단어 사이의 거리를 각도로 계산하여 모델이 언어를 수학적으로 이해할 수 있는 능력을 갖추는 방법을 볼 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cda1b6f1-3503-41c3-91cc-37ea1656c5a7)

인코더 또는 디코더의 베이스에 토큰 벡터를 추가하면 위치 인코딩도 추가됩니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5ffeccbf-3921-4b24-96d1-9b37facc9982)

모델은 각 입력 토큰을 병렬로 처리합니다. 따라서 위치 인코딩을 추가하면 어순에 대한 정보를 보존하고 문장에서 단어 위치의 관련성을 잃지 않습니다. 입력 토큰과 위치 인코딩을 합산한 후에는 결과 벡터를 자기 주의 레이어로 전달합니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b7a43907-ca18-4db7-982b-ae64a4a7786e)

여기서 모델은 입력 시퀀스에 있는 토큰 간의 관계를 분석합니다. 앞서 살펴본 것처럼, 이를 통해 모델은 입력 시퀀스의 여러 부분에 주의를 기울여 단어 간의 문맥적 의존성을 더 잘 포착할 수 있습니다. 훈련 중에 학습되어 이러한 계층에 저장되는 자체 주의 가중치는 해당 입력 시퀀스에서 각 단어가 시퀀스의 다른 모든 단어에 대해 갖는 중요성을 반영합니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/83ea85c0-abb6-43e9-a504-39f1881a6e13)

그러나 이것은 한 번만 일어나는 것이 아니라 트랜스포머 아키텍처에는 실제로 여러 개의 자기 주의가 있습니다. 즉, 여러 세트의 자기 주의 가중치 또는 헤드가 서로 독립적으로 병렬로 학습됩니다. 주의 계층에 포함되는 주의 헤드의 수는 모델마다 다르지만 12~100개 범위의 숫자가 일반적입니다. 여기서 직관적으로 알 수 있는 것은 각각의 자체 주의 헤드는 언어의 다른 측면을 학습한다는 것입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b425c616-cc19-4c9e-95c9-84b211497d03)

예를 들어, 한 헤드는 문장에 등장하는 사람 개체 간의 관계를 볼 수 있습니다. 반면에 다른 두뇌는 문장의 활동에 집중할 수 있습니다. 또 다른 두뇌는 단어의 운율과 같은 다른 속성에 초점을 맞출 수도 있습니다.

주의 헤드는 언어의 어떤 측면을 학습할지 미리 정해두지 않는다는 점에 유의하세요. 각 헤드의 가중치는 무작위로 초기화되고 충분한 훈련 데이터와 시간이 주어지면 각 헤드가 언어의 다른 측면을 학습하게 됩니다. 여기서 설명한 예처럼 주의력 지도를 해석하기 쉬운 것도 있지만, 그렇지 않은 것도 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ac9a1d8a-d03a-4333-bc53-f43ea8d59887)

이제 모든 관심도 가중치가 입력 데이터에 적용되었으므로 출력은 완전히 연결된 피드 포워드 네트워크를 통해 처리됩니다. 이 계층의 출력은 토큰화 사전의 모든 토큰에 대한 확률 점수에 비례하는 로짓 벡터입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c8a060bb-3aba-4eb7-80b9-eb4b1047a1d3)

그런 다음 이 로그를 최종 소프트맥스 계층으로 전달하면 각 단어에 대한 확률 점수로 정규화됩니다. 이 출력에는 어휘의 모든 단어에 대한 확률이 포함되므로 여기에는 수천 개의 점수가 있을 수 있습니다. 하나의 토큰이 나머지 토큰보다 높은 점수를 갖게 됩니다. 이것이 가장 가능성이 높은 예측 토큰입니다. 하지만 이 과정의 뒷부분에서 살펴보겠지만, 이 확률 벡터에서 최종 선택 항목을 변경하는 데 사용할 수 있는 여러 가지 방법이 있습니다.
