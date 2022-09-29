---
title: "[Ⅴ. Sequence Models] Natural Language Processing & Word Embeddings (1)"
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
toc_label: "Natural Language Processing & Word Embeddings (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/187809649-f4918caf-ae96-4f46-a0cf-42ba990450d9.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Natural Language Processing & Word Embeddings

## Introduction to Word Embeddings

### Word Representation

지난번에 RNN, GRU, LSTM에 대해 배웠습니다. 이번에는 이러한 아이디어들 중 얼마나 많은 것을 AI의 특징 중 하나인 자연어 처리에 적용할 수 있는지 살펴봅니다. 왜냐하면 딥러닝으로 인해 이것이 실제로 혁신되고 있기 때문입니다.

여러분이 배울 주요 아이디어 중 하나는 단어를 나타내는 방법인 **단어 임베딩word embedding**입니다. 알고리즘은 '남자'와 '여자'의 관계가
'왕'과 '여왕'의 관계와 같다는 예시와 다른 많은 예시의 유사성을 자동으로 이해하는 능력이 떨어집니다.

단어 임베딩 아이디어를 통한 NLP 애플리케이션을 구축할 수 있고, 일반적으로 비교적 소규모의 라벨 훈련 세트 크기의 모델에서조차 말입니다. 이후에는 단어 임베딩에서 편향을 제거하는 방법을 알게 될 겁니다. 이는 학습 알고리즘이 때때로 고르는 바람직하지 않은 성별이나 민족 또는 다른 유형의 편향을 줄이기 위한 것입니다.

그럼 단어 표현에 대한 논의를 시작해보도록 하죠.

#### Word Representation

![image](https://user-images.githubusercontent.com/55765292/189653692-94914095-24d3-4376-866e-fba21adaf91c.png)

지금까지 단어의 어휘 집합을 사용해 단어를 표현했는데, 지난 주의 어휘 집합을 1만 단어라고 가정해봅시다. 그리고 원-핫 벡터를 사용해 단어를 표시해 왔습니다.

예를 들어, 만약 Man이 이 사전에서 5391번이면 여러분은 이를 5391번째 위치에 1을 가진 벡터로 나타냅니다. 저는 $O_{5391}$을 이용하여 이 벡터를 나타내겠습니다. 여기서 O는 원-핫을 의미합니다. 그리고 Woman이 9853번이면 $O_{9853}$을 사용하여 표시하는데 9853번째 위치에만 1을 다른 곳은 0을 가집니다.

그리고 다른 단어들인 King, Queen, Apple, Orange도 원-핫 벡터로 유사하게 표시될 겁니다. 이러한 표시의 약점 중 하나는 각 단어를 하나의 개체로 여기고 알고리즘이 교차 단어를 쉽게 일반화하는 것을 허용하지 않는다는 겁니다.

예를 들어,

> I want a glass of orange

를 학습한 언어 모델이 있다고 가정해 봅시다. 다음 단어는 무엇이 될까요? 아마도 juice일 겁니다.

하지만 학습 알고리즘이

> I want a glass of orange juice

를 학습했더라도

> I want a glass of apple __ 

의 경우 Apple과 Orange의 관계가 다른 Man, Woman, King, Queen 같은 단어와 Orange 사이의 관계보다 더 가깝다고 여기지 않습니다. 따라서 학습 알고리즘이 orange juice가 일반적인 단어라고 아는 것으로 apple juice도 일반적인 단어나 구문이라고 인식하는 것을 일반화하기는 쉽지 않습니다.

왜냐하면 두 개의 다른 원-핫 벡터 사이의 내적은 0이기 때문입니다. 만약 두 벡터를, Queen과 King이라고 가정하면 내적은 0입니다 Apple, Orange라면 내적은 0입니다. 그리고 이 벡터들의 어느 쌍이라도 마찬가지입니다. 그래서 어떤 식으로든 Apple과 Orange가 King 또는 Queen과 Orange보다 유사하다는 것을 알 수 없습니다.

#### Featurized Representation: Word Embeddings

![image](https://user-images.githubusercontent.com/55765292/189654138-a418d72e-afb3-465f-8744-637ab23dff9f.png)

따라서 원 핫 표시대신 Man, Woman, King, Queen, Apple, Orange 또는 사전의 모든 단어를 이용하여 특징적인 표현을 배울 수 있다면 좋지 않을까요? 각각의 특징과 값을 학습할 수 있도록 말입니다.

예를 들어, 이 각각의 단어들에서 이 단어들과 연관된 성별을 알고자 합니다. 그래서 만약 성별이 남성은 -1, 여성은 +1 이라면 남성와 연관된 성별은 -1이 되고 여성은 +1이 될 겁니다. 그리고 결국 이러한 것들을 학습하면 King은 -0.95, Queen은 +0.97이 될 겁니다. 그리고 Apple, Orange 같은 경우 성별 구분이 없죠.

또 다른 특징은 이러한 것들이 얼마나 왕족스러운지입니다. 용어 Man과 Woman은 별로 왕족스럽지 않으므로 0에 가까운 값을 가질 수 있습니다. 반면에 King과 Queen은 상당히 왕족스러운 단어입니다. 그리고 Apple과 Orange는 왕족과 별 관련이 없습니다.

나이는 어떨까요? Man과 Woman에는 나이를 나타내는 부분은 없습니다. 어쩌면 성인이라는 것을 암시할지도 모르지만 반드시 젊거나 늙지는 않았을지도 모릅니다. 아마 0에 가까운 값이 될 것입니다. 반면에 King과 Queen은 거의 항상 어른들입니다. 그리고 Apple과 Orange는 나이 면에서 더 중립적일 수 있습니다.

그리고 여기 또 다른 특징은 음식인지 여부입니다 Man은 음식이 아닙니다. Woman은 음식이 아닙니다. King이나 Queen도 아닙니다. 하지만 Apple와 Orange는 음식입니다.

그리고 크기가 얼마만한지 등 다양한 특징들 또한 많이 있을 수 있습니다. 가격이 얼마인지? 살아있는지? 행동인지 아니면 명사인지 동사인지 아니면 다른 것일까요? 그 외 다른 것들이 있겠죠. 많은 특징을 떠올릴 수 있을 겁니다.

예를 들어 300개의 다른 특징이 있는 그림의 경우 이런 숫자들의 목록이 될 수 있습니다. 저는 여기서 4개만 썼지만 300개의 숫자 목록이 될 수도 있습니다. 그러면 Man이라는 단어를 나타내는 300차원 벡터가 됩니다. 저는 이러한 표현을 나타내기 위해 $e_{5391}$이라는 표기법을 사용하려고 합니다.

이와 비슷하게 이 벡터 이 300차원 벡터 또는 이와 같은 300차원 벡터는 $e_{9853}$으로 표시하여 Woman을 표현할 때 사용할 수 있는 300차원 벡터를 나타냅니다.

마찬가지로 여기 다른 예시들도 있습니다. 이 표현을 사용하여 Orange와 Apple을 나타내면 Orange와 Apple이 이제 꽤 비슷하다는 것을 알 수 있습니다. Orange와 Apple의 색깔, 맛이나 몇몇 특징이 각기 다르기 때문에 일부 특징은 다를 것입니다. 하지만 대체로 Apple과 Orange의 많은 특징들은 실제로 동일하거나 아주 비슷한 값을 가지고 있습니다.

그리고 이것은 Orange juice가 하나의 물건이라는 것을 알아내는 학습 알고리즘의 확률을 증가시킵니다. Apple juice의 경우도 마찬가지로 빠르게 알아내죠. 그래서 이는 다른 교차 단어들도 좀 더 일반화되게 해줍니다.

따라서 다음에는 단어 임베딩을 학습하는 방법을 알아볼 것입니다. 이런 고차원의 특징 벡터를 배우면 됩니다. 이 방식은 원-핫 벡터보다 다른 단어를 잘 표현할 수 있습니다. 그리고 우리가 배울 특징들은 성별, 왕족 여부, 나이 등과 같은 구성요소처럼 해석하기가 쉽지는 않을 겁니다. 정확히 무엇을 나타내는지 알아내기가 조금 어려울 겁니다.

하지만 그럼에도 불구하고 우리가 배울 특징 표현은 알고리즘이 King과 Orange 또는 Queen과 Orange보다 Apple과 Orange가 더 유사하다는 것을 빨리 알아내도록 할 것입니다.

#### Visualizing Word Embeddings

![image](https://user-images.githubusercontent.com/55765292/189654226-2a883da8-8508-489c-8400-3ee2d46ab20f.png)

300차원 특징 벡터나 각 단어에 대한 300차원 임베딩을 학습할 수 있다면 가장 많이 하는 일 중 하나는 이 300차원 데이터를 가져와서 시각화할 수 있도록 2차원 공간에 임베드하는 것입니다.

이 작업을 위해 사용되는 하나의 공통 알고리즘은 로렌스반 데르 매텐과 제프 힌튼이 만든 t-SNE 알고리즘입니다. 그리고 이런 임베딩 중 하나를 본다면 Man과 Woman이 같은 그룹에 있고 King과 Queen이 같은 그룹에 있는 경향을 볼 수 있습니다. 그리고 이들은 사람으로 함께 그룹되는 경향이 있습니다.

또 동물로 함께 그룹이 될 수 있습니다. 과일은 서로 가까운 경향을 보일 것입니다. 1, 2, 3, 4 같은 숫자는 서로 가까워질 겁니다. 그런 다음 전체 생물 개체가 함께 그룹화되는 경향이 있습니다.

여러분은 가끔 이런 300차원 이상의 임베딩을 시각화하기 위한 그림들을 인터넷에서 볼 수 있습니다. 그리고 어쩌면 단어 임베딩 알고리즘이 더 연관되어 있어야 한다고 느끼는 개념들에 대한 비슷한 특징을 학습할 수 있다고 느낄 겁니다. 더 유사해야 하는 특징으로 시각화되면서 결국 보다 유사한 특징 벡터에 매핑될 수 있을 겁니다. 그리고 이러한 표현은 아마 300차원 공간에서 이런 종류의 특징 표현을 사용하고 이를 임베딩이라고 부릅니다. 임베딩이라고 부르는 이유는 300차원 공간을 생각할 수 있기 때문입니다.

그리고 2차원 공간에서는 3차원 그림을 그릴 수 없습니다. Orange와 같은 모든 단어들을 가지고 3차원 특성 벡터를 이용하면 오렌지가 300차원 공간의 어느 지점에 임베딩됩니다. Apple이라는 단어는 300차원 공간의 다른 위치에 임베딩할 수 있습니다. 물론 SNE 같은 알고리즘을 이용해서 훨씬 더 낮은 차원의 공간을 설계하면 2D 데이터를 구성해서 살펴볼 수 있습니다. 하지만 임베딩이라는 말은 그곳에서 나온 것입니다.

단어 임베딩은 NLP에서 가장 중요한 아이디어 중 하나였습니다. 이번에는 단어 임베딩을 배우거나 사용하려는 이유를 알아보았습니다. 이어서 이러한 알고리즘을 NLP 알고리즘 구축을 위해 어떻게 사용할 수 있는지 좀 더 깊이 살펴보겠습니다.


### Using Word Embeddings

다른 단어를 피쳐화된 표현을 배우는 것이 무엇을 의미하는지 보았습니다. 이번에는 이러한 표현을 가져와서 NLP 응용 프로그램에 연결하는 방법을 볼 수 있습니다. 우선 예제를 봅시다.

#### Named Entity Recognition Example

![image](https://user-images.githubusercontent.com/55765292/189682767-be93266b-4db5-41ae-acfe-f57e15553aeb.png)

사용자 이름을 검색하려는 경우 **명명된 엔티티 인식named entity recognition** 예제를 계속합니다. 

> Sally Johnson is an orange farmer.

위 문장을 보면 아마도 샐리 존슨이 사람의 이름이라는 것을 알 수 있을 것입니다. 샐리 존슨이 사람이어야 한다는 것을 확실히 하기 위한 한 가지 방법은 오렌지 농부가 사람임을 아는 것입니다.

앞서 이러한 단어 $x^{<1>}, x^{<2>}$ 등을 나타내기 위해 하나의 핫 표현에 대해 말씀 드렸습니다. 하지만 이제 피쳐화된 표현을 사용할 수 있다면 지난 영상에서 우리가 얘기한 내장 벡터를 사용할 수 있습니다.

> Robert Lin is an apple farmer.

단어들을 임베딩시키는 모델을 교육시킨 후 여러분이 새로운 입력사항을 보게 된다면 로버트 린은 사과 농부입니다. 오렌지와 사과가 매우 유사하다는 것을 아는 것은 로버트 린도 사람이고 사람의 이름이기도 하다는 것을 알기 위해 일반화하는 학습 알고리즘을 더 쉽게 만들 수 있습니다.

가장 흥미로운 사례들 중 하나는 만약 여러분이 테스트 중에 로버트 린이 사과 농부가 아니라 훨씬 덜 평범한 단어를 본다면요? 만약 로버트 린이 두리안 경작가라면?

두리안 과일은 싱가포르와 몇몇 다른 나라에서 인기 있는 보기 드문 과일입니다. 그러나 지정된 엔티티 인식 작업에 대해 지정된 작은 레이블 교육 세트가 있는 경우 교육 세트에 두리안이라는 단어를 보거나 단어 경작자를 본 적이 없을 수 있습니다.

엄밀히 말하면 이것은 두리안 경작자 입니다. 하지만 두리안이 과실이라는 것을 포함 그러니까 오렌지, 경작자 같은 걸 배운다면 경작자 같은 사람이 농부라면 재배자 같은 것을 훈련에서 오렌지 농부에게 본것을 일반화해도 됩니다.

단어 임베딩에 관한 이유 중 하나는 단어를 임베딩 시키는 알고리즘이 아주 큰 텍스트를 검토할 수 있고 어쩌면 인터넷에서 찾을 수 있을지도 모릅니다. 따라서 아주 큰 데이터 세트를 검토할 수 있습니다. 어쩌면 10억개의 단어들 어쩌면 심지어 1천억 개의 단어까지도 꽤 합리적일 수 있습니다. 라벨이 없는 글의 매우 큰 훈련 세트죠 라벨이 없는 수많은 텍스트들을 살펴봄으로써 공짜로 더 많은 것을 다운로드 받을 수 있습니다.

오렌지와 두리안이 비슷하다는 것을 알 수 있습니다. 농부와 경작자는 비슷합니다. 따라서 함께 임베딩시키는 것을 배우죠. 오렌지와 두리안 둘 다 엄청난 양의 인터넷 문자를 읽음으로써 얻은 과실이라는 것을 알게 된 후 여러분이 할 수 있는 것은 이 단어를 포함하고 이것을 여러분의 명명된 엔티티 인식 작업에 적용하는 것입니다.

이 작업을 통해 여러분은 훨씬 더 작은 훈련 세트를 갖게 될 수도 있고 어쩌면 100,000개의 단어들 혹은 훨씬 더 작은 단어들을 훈련시킬 수도 있습니다. 그래서 이것은 이전학습 기능을 수행합니다. 라벨이 없는 막대한 양의 텍스트에서 배운정보를 얻는데 기본적으로 인터넷에서 무료로 빨아들여서 오렌지, 사과, 그리고 두리안 과일인지를 알아낼 수 있습니다.

그런 다음 해당 지식을 지정된 엔티티 인식과 같은 작업에 전달합니다. 이 경우 상대적으로 작은 레이블이 지정된 교육 세트가 있을 수 있습니다. 물론 단순성을 위해 l은 이것을 단지 단방향 RNN으로 그렸습니다. 명명된 엔티티 인식 작업을 실제로 수행하려면 여기서 그린 단순한 것이 아니러 양방향 RNN을 사용해야 합니다.

#### Transfer Learning and Word Embeddings

![image](https://user-images.githubusercontent.com/55765292/189684762-d96c9707-2c6e-4230-992c-0f791cb3e5b6.png)

하지만 요약하자면 단어를 임베딩 시키는 방식으로 전달 배움을 수행할 수 있습니다. 1단계는 큰 텍스트 코퍼로부터 단어 포함 방식을 배우는 것입니다 매우 큰 텍스트 코퍼죠. 아니면 미리 준비된 단어를 온라인으로 다운로드할 수도 있습니다. 아주 관대한 라이선스 하에서 온라인에서 찾을 수 있는 단어 포함 서비스가 몇 개 있습니다.

그런 다음 이 단어를 임베딩시켰습니다. 그리고 포함 된 단어를 새로운 임무로 옮길 수 있습니다. 거기에서는 라벨이 아주 작은 교육 세트들이 있습니다. 그리고 이것을, 예를 들어, 300차원의 포함 여러분의 단어를 표현하는데 사용합니다.

한가지 좋은 점은 이제 상대적으로 낮은 차원 피쳐 벡터를 사용할 수 있다는 것입니다. 1만 차원1-핫 벡터를 사용하는 대신 300차원 덴스 벡터를 사용할 수 있습니다. 1핫 벡터는 빠르고 포함에 대해 학습할 수 있는 300차원 벡터는 덴스 벡터입니다.

그리고 마지막으로 새로운 작업에 대한 모델을 교육할 때 더 작은 레이블 데이터 세트를 사용하여 명명된 엔티티 인식 작업에서 필요한 한 가지 일은 계속 세부적으로 튜닝하고 새로운 데이터를 사용하여 단어 포함 방식을 지속적으로 조정하는 것입니다.

실제로 이 작업 2에 데이터 세트가 아주 큰 경우에만 이 작업을 수행할 수 있습니다. 2단계에서 설정한 레이블 데이터가 매우 작다면 일반적으로 나는 계속 포함 단어를 세밀하게 조정하지 않을 것입니다. 단어들을 임베딩시키는 것은 여러분이 수행하고자 하는 임무가 상대적으로 작은 훈련 세트를 가질 때 가장 큰 차이를 만드는 경향이 있습니다.

그래서 이것은 많은 NLP 작업에 유용하다 몇 가지만 말씀드리겠습니다. 명명된 엔터티 인식, 텍스트 요약 공동 참조 해결, 구문 분석에 유용합니다. 이것들은 모두 거의 일반적인 NLP 작업일 것입니다. 언어 모델링, 기계 번역에는 유용하지 않습니다. 특히 이 작업에 전용 데이터가 많은 언어 모델링이나 계 번역 작업에 액세스하는 경우에는 특히 유용합니다.

따라서 다른 전송 학습 설정에서 볼 수 있듯이 어떤 작업 A에서 어떤 작업 B로 옮기려는 경우 학습 전달 과정은 A에 대한 데이터 양이 많은 경우에 가장 유용하고 B에 대해 상대적으로 작은 데이터 세트를 가질 때 유용합니다. 이는 많은 NLP 작업에 해당되며 언어 모델링과 기계 번역 설정에는 거의 적용되지 않습니다.

#### Relation to Face Encoding

![image](https://user-images.githubusercontent.com/55765292/189685358-6dead2e1-4852-4b5c-b7eb-d998c1355f09.png)

마지막으로 포함된 단어들은 당신이 지난 과정을 통해 배웠던 얼굴 인코딩 아이디어와 흥미로운 관계를 갖고 있습니다. 만약 당신이 일치되는 신경 네트워크 과정을 경험한다면 말이죠.

얼굴 인식 기술을 위해 우리는 서로 다른 얼굴을 위한 128차원의 표현을 배울 수 있는 샴 네트워크를 훈련시킨다는 것을 기억하실 겁니다. 그리고 이 인코딩을 비교할 수 있습니다. 이 두 그림이 같은 얼굴인지 알아내기 위해서죠. 인코딩, 임베딩 같은 용어는 비슷한 의미를 갖습니다.

그래서 얼굴 인식 문헌에는 이런 벡터 $f(x^{(i)}), f(x^{(j)})$를 참조하기 위해 인코딩 $x$ 이라는 단어가 사용됩니다. 얼굴 인식 문헌과 우리가 단어 속에 임베딩 되어 있는 것의 차이점 하나는 얼굴 인식 때문에 여러분은 얼굴 인식 기술을 습득할 수 있는 신경 네트워크를 배우고 싶어했다는 것입니다.

심지어 여러분이 이전에 보지 못했던 사진일지라도 말입니다. 그리고 신경 네트워크를 통해 새로운 그림에 대한 인코딩을 계산합니다.

반면에 단어들을 배울때 우리가 할 수 있는 일은 우리가 일정한 어휘를 가지게 될 것입니다. 예를 들면, 만 개의 단어들 말이죠 그리고 $e_1$에서 벡터 $e_{10,000}$을 배우는 겁니다. 예를 들어, $e_{10,000}$까지는 고정된 암호코드를 학습하거나 리 어휘에 있는 각 단어들에 대해 정해진 포함을 학습합니다.

이것은 얼굴 인식에 대한 아이디어 집합과 다음에 우리가 논의하게 될 알고리즘의 차이입니다. 하지만 인코딩 포함 용어는 다소 교환적으로 사용됩니다. 제가 방금 설명한 차이는 용어 자체에 나타나는 차이가 아니라 우리가 이 알고리즘을 얼굴인식 방식으로 사용할 수 있는 방법은 차이에 불과합니다.

미래에는 무제한의 사진을 찍을 수 있죠 자연 언어 처리 대신에 단지 고정된 어휘가 있을 수도 있고 그 외의 모든 것들은 우리가 알 수 없는 단어로 선언합니다.

그래서 단어들을 임베딩 시키는 방식을 사용하면 이런 형태의 전달 학습을 구현할 수 있다는 것을 알 수 있습니다. 그리고 이전에 내장된 벡터와 함께 사용하던 핫 벡터를 대체함으로써 알고리즘이 훨씬 더 일반화되도록 하거나 훨씬 적은 레이블 데이터에서 배울 수 있게 하는 방법도 있습니다.