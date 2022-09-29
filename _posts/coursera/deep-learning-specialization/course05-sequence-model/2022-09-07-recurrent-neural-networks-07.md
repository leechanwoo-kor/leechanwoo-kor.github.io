---
title: "[Ⅴ. Sequence Models] Recurrent Neural Networks (7)"
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
toc_label: "Recurrent Neural Networks (7)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/187809649-f4918caf-ae96-4f46-a0cf-42ba990450d9.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Recurrent Neural Networks

## Recurrent Neural Networks

### Bidirectional RNN

이제 여러분은 RNN의 주요 빌딩 블록 대부분을 살펴봤습니다. 하지만 훨씬 더 강력한 모델을 만들 수 있는 두가지 아이디어가 있는데요.

첫 번째는 **양방향bidirectional RNN**으로 시퀀스에서 한 시점의 전과 후의 정보를 모두 사용합니다. 이를 먼저 얘기해 볼 겁니다. 그리고 두 번째는 **깊은deep RNN**으로 다음에 다루겠습니다. 그럼 양방향 RNN으로 시작해 봅시다.

#### Getting Information From The Future

![image](https://user-images.githubusercontent.com/55765292/188816136-0c81a941-f85a-4d8d-a8c2-56d1a49b63df.png)

그래서 양방향 RNN에 동기를 부여하기 위해서 개체명 인식의 맥락에서 이전에 몇 번 본 네트워크를 살펴보도록 하죠. 그리고 이 네트워크의 문제 중 하나는 세 번째 단어인 Teddy가 사람의 이름의 일부인지를 알아내기 위해 문장의 첫 번째 부분 만 보는 것만으로는 충분하지 않습니다.

그래서 $y^{<3>}$이 0 or 1이 되어야 한다고 하기 위해서는 처음 몇 개의 단어 보다 더 많은 정보가 필요합니다. 첫 세 단어는 그것이 "Teddy bears"를 말하는지 아니면 미국의 전대통령 "Teddt Roosevelt"를
말하는지를 알려주지 않기 때문입니다.

그래서 이것이 단방향 또는 RNN 전용 방향입니다. 그리고 제가 방금 만든 이 코멘트는 이 세포들이 표준 RNN 블록이든 GRU이든 또는 LSTM 블록이든 상관없이 사실이지만 이 모든 블록은 오직 순방향으로만 진행합니다.

#### Bidirectional RNN (BRNN)

![image](https://user-images.githubusercontent.com/55765292/188816256-7ef6bbe6-4aaf-4d53-88e8-5d8f92d05502.png)

따라서 이러한 문제는 양방향 RNN, BRNN으로 해결할 수 있습니다. 양방향 RNN은 이렇게 작동하며 간단한 네 개의 단어를 사용하겠습니다. $x^{<1>}$에서 $x^{<4>}까지의 4개의 input이 있습니다.

그래서 이 네트워크의 숨겨진 레이어는 앞으로 반복되는 요소를 가집니다. 그래서 이것을 $\overrightarrow{a}^{<1>},\overrightarrow{a}^{<2>},\overrightarrow {a}^{<3>}$ 그리고 $\overrightarrow{a}^{<4>}$라고 부르겠습니다. 오른쪽 화살표를 그 위에 그려서 4개의 반복적인
요소에 주목하겠습니다.

그리고 w는 다음과 같이 연결되어 있습니다. 4 개의 각 반복 유닛은 현재 x에 영향을 줍니다. 그런 다음 피드 인을 해 $\hat{y}^{<1>},\hat{y}^{<2>},\hat{y}^{<3>},\hat{y}^{<4>}$를 예측하는 것을 돕습니다.

그래서 지금까지는 한 일이 별로 없습니다. 그냥 이전 RNN을 그렸죠. 하지만 약간 재미 있는 위치에 화살표를 그렸죠. 하지만 제가 이 위치에 화살표를 그린 이유는 우리가 할 일로 그곳에 백워드 반복을 추가할 것이기 때문이죠.

그래서 $\overleftarrow{a}^{<1>}$ 화살표를 왼쪽으로 그려 백워드로 연결되어 있음을 표시합니다. $\overleftarrow{a}^{<2>},\overleftarrow{a}^{<3>},\overleftarrow{a}^{<4>}$ 그래서 왼쪽 화살표는 거꾸로 된 연결을 뜻합니다.

그런 다음 우리는 다음과 같이 네트워크를 연결합니다. 그리고 이 a 백워드 연결은 서로 연결되어 거꾸로 갑니다. 그래서 이 네트워크는 순환 초안을 정의합니다.

즉, input 시퀀스 $x^{<1>~<4>}$를 고려할 때 우리가 첫 번째로 계산할 4개의 시퀀스는 $\overrightarrow{a}^{<1>}$이며 이를 사용해 $\overrightarrow{a}^{<2>}$를 그리고 $\overrightarrow{a}^{<3>},\overrightarrow{a}^{<4>}$를 계산하는데 사용합니다.

반면 백워드 시퀀스는 $\overleftarrow{a}^{<4>}$를 계산하여 시작해 거꾸로 3개를 차례로 계산합니다. 컴퓨팅 네트워크 활성화에 주목하세요.

이는 후문제가 아닌 정문제입니다. 하지만 정문제는 왼쪽에서 오른쪽으로 가는 복잡도의 일부분을 가지고 있으며 그리고 긍정적인 경쟁은 이 다이어그램에서 오른쪽에서 왼쪽으로 갑니다. 하지만 아직 거꾸로
세 개를 계산하지 않았는데요. 그런 다음 해당 활성화를 완전히 거꾸로 2 에서 1에서 사용할 수 있습니다.

여러분은 아직 모든 숨겨진 활성화를 계산하지 않았습니다. 그렇다면 예측을 할 수 있습니다.

예를 들어서, 예측을 하기 위해서는 여러분의 네트워크는 

> $\hat{y}^{< t>}=g(W_y[\overrightarrow{a}^{< t>}, \overleftarrow{a}^{< t>}] + b_y)$

순방향과 역방향 활성화 $a^{< t>}$ 모두를 넣어서 이런 모양이 되어야 합니다. 그래서 만약 시간 세트 3에서 예측을 살펴보면 $x^{<1>}$의 정보는 여기 $\overrightarrow{a}^{<1>}$으로 가서 $\overrightarrow{a}^{<2>}$로, 그리고 $x^{<2>}$의 정보는 여기로 가서 $\overrightarrow{a}^{<3>}$로 $\hat{y}^{<3>}$로 갑니다.

그래서 $x^{<1>},x^{<2>},x^{<3>}$에서의 정보는 모두 고려되었고 $x^{<4>}$에서의 정보는 백워드 $\overleftarrow{a}^{<4>}$에서 백워드 $\overleftarrow{a}^{<3>}$ 그리고 $\hat{y}^{<3>}$로 갈 수 있습니다. 그래서 이것은 예측 및 세 개를 묶어 이 단계에서 순방향 및 역방형 모두로 가는 현재의 정보 그리고 미래의 정보 뿐만 아니라 과거로부터의 모든 두 정보를 입력하게 해줍니다.

그래서 특히 "He said" "Teddy Roosevelt ..."라는 문장을 볼 때 Teddy가 사람의 이름인지 예측하기 위해서 여러분은 과거와 미래로부터의 정보를 고려합니다. 그래서 이것이 **양방향 RNN** 입니다.

그리고 여기 이 블록들은 표준 RNN 블록이 될 수 없습니다만 GRU, 혹은 LSTM 블록이 될 수 있죠. 사실 많은 NLP 문제, 많은 텍스트나 자연어 처리 문제에서는 LSTM이있는 양방향 RNN이 일반적으로 사용되는 것처럼 보입니다.

그래서 만약 NLP 문제가 있고 완전한 문장이 있다면 여러분은 문장에서 BRNN w/LSTM라는 이름으로 레이블을 붙이려고 할텐데요. 그 이전에 백워드는 꽤 합리적인 시도가 될 것입니다.
  
그래서 이것이 양방향 RNN이었습니다. 그리고 이는 기본적인 RNN 아키텍처나 GRU, 혹은 LSTM을 변형시킬 수 있습니다. 그리고 이런 변형을 하면 RNN이나 GRU LSTM을 사용하는 모델을 가질 수 있습니다.

그리고 시퀀스 중간에라도 예측을 할 수 있지만 전체 시퀀스에서 잠재적으로 정보를 고려합니다. 양방향 RNN의 단점은 예측을 하기 전에 전체 데이터 시퀀스가 필요하다는 것입니다.

그래서 예를 들어, 음성 인식 시스템을 빌드할 때 BRNN은 모든 음성을 고려할 수 있게 해줄 것입니다. 하지만 만약 이런 간단한 구현을 사용하면 여러분이 실제로 처리할 수 있기 전에 전체 발언을 얻기 위해서 그 사람이 말하는 것을 멈추기를 기다려야 하며 음성 인식 예측을 만들어야 합니다.

그래서 실시간 음성 인식 어플은 여러분이 여기서 본 이상적 RNN에 의한 표준을 사용하는 것 보다 더 복잡한 모델입니다. 하지만 전체 문장을 동시에 얻을 수 있는 많은 자연어 처리 어플에서는 표준 BRN과 알고리즘이 매우 효과적입니다.

그래서 여기까지가 BRNN이었고요. 이어서 이 모든 아이디어 RNN, LSTM, GRU에 대해서 그리고 양방향 버전, 그들의 심층버전을 만드는 것에 대해 얘기하겠습니다.

### Deep RNNs

지금까지 본 RNN의 다른 버전은 이미 자체적으로 꽤 잘 작동할 것입니다. 그러나 매우 복잡한 기능을 학습하는 경우 RNN의 여러 계층을 함께 쌓아 이러한 모델의심층 버전을 구축하는 것이 더 유용합니다.

이러한 심층 RNN을 만드는 방법을 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/188833178-75fa261e-34a9-4645-b1f6-35c8f260993b.png)

따라서 표준 신경망을 기억하신다면 입력값 x가 있을 것입니다 그것에 어떤 은닉층이 쌓여있고 첫 번째 은닉층에 대해 활성화 $a^{[1]}$가 있다고 해봅시다. 그런 다음 활성화 $a^{[2]}$로 다음 계층에 쌓이고 그런 다음 다른 계층으로 활성화 $a^{[3]}$이 쌓이며 $\hat{y}$을 예측합니다.

따라서 심층 RNN은 이런 식입니다. 직접 그린 이 네트워크를 통해 시간에 맞춰 펼치는 겁니다. 한번 보시죠. 지금까지 보셨던 표준 RNN 입니다. 하지만 표기법을 조금 바꿔봤습니다.

이것을 활성화 시간 0에 대한 $a^{<0>}$로 쓰는 대신 이 [1]을 추가해 계층 1을 표시합니다. 따라서 표시하기 위해 사용할 표기법은 $a^{[l]< t>}$로 이는 계층 l과 연결된 활성화이며 시간 t와 연결된 것을
표시하기 위해 $< t>$를 씁니다.

따라서 이것은 a에서 활성화되며 이것이 첫 번째 계층의 시간 1,2,3,4가 될 겁니다. 그런 다음 우리는 이것들을 쌓아서 이것이 3개의 은닉층이 있는 새로운 네트워크가 될 겁니다.

이 값이 어떻게 계산되는지 예를 들어보겠습니다. 따라서 $a^{[2]<3>}은 두 가지 입력을 가집니다. 아래에서 오는 입력이 있고 왼쪽에서 오는 입력도 있습니다.

따라서 컴퓨터는 활성화 함수 g에 행렬에 곱하는데 활성화 양을 계산하기 때문에 이는 $W_a$가 될 것입니다. 그리고 두번째 계층의 경우 그리고 왼쪽의 $a^{[2]<2>}$와 아래 쪽의 $a^{[1]<3>}$에 두 번째 계층의 $b_a$를 더해주면 됩니다.

이것이 활성화값을 얻는 방법입니다. 따라서 똑같은 매개변수 $W_a^{[2]}$와 $b_a^{[2]}$는 이 계층의 모든 계산에 사용됩니다.

반면, 첫 번째 계층에는 매개변수인 $W_a^{[1]}$와 $b_a^{[1]}$이 있습니다.

표준 RNN은 왼쪽에 있는 것과 비슷하지만 우리는 100개 이상의 계층이 있는 매우 심층적인 신경망을 본 적이 있습니다. RNN의 경우 3개 계층도 이미 상당히 많은 겁니다. 시간 차원 때문에 이러한 네트워크는 몇 개의 계층만 있어도 상당히 커질 수 있습니다. 100개의 계층이 쌓이는 건 보기 드문 경우입니다.

여러분이 종종 볼 수 있는 한 가지는 서로의 위에 쌓인 순환층이 있다는 것입니다. 하지만 여기서 출력을 가지고 이걸 없앤 다음 수평으로 연결되지 않은 심층 다발을 가질 수 있고 여기 이 심층 네트워크가 최종적으로 $y^{<1>}$을 예측합니다,

그리고 여기 같은 심층 네트워크는 $y^{<2>}$를 예측합니다. 따라서 이것은 네트워크 아키텍처의 한 유형입니다. 시간에 따라 연결된 3개의 순환 유닛이 있고 이후에는 네트워크를 따라 이어집니다.

보다시피 $y^{<3>}$와 $y^{<4>}$에서도 같습니다. 심층 네트워크는 있지만 수평적인 연결은 없습니다. 이것이 우리가 더 많이 보고 있는 아키텍처의 한 종류입니다.

그리고 꽤 자주 이러한 블록들은 표준 RNN이나 단순 RNN 모델일 필요는 없습니다. 이것들은 또한 GRU 블록과 LSTM 블록일 수도 있습니다.

마지막으로 양방향 RNN의 심층 버전을 만들 수도 있습니다. 심층 RNN은 훈련하는 데 상당한 비용이 들고 많은 심층 순환 계층이 보이지는 않지만 이미 큰 시간 범위가 있는 경우가 많습니다.

제 생각에 이건 시간에 연결된 세 개의 심층 순환 계층입니다. 심층 합성곱 신경망에서 볼 수 있는 만큼의 많은 심층 순환 계층을 볼 수는 없습니다.

심층 RNN에 대한 설명은 여기까지입니다 여러분은 이제 기본 RNN과 기본 순환 유닛부터 GRU, LSTM, 양방향 RNN, 방금 본 심층 버전에 이르기까지 시퀀스 모델 학습을 위한 매우 강력한 모델을 구성할 수 있는 매우 풍부한 도구를 손에 넣으셨습니다.