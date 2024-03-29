---
title: "[Ⅳ. Convolutional Neural Networks] Deep Convolutional Models (2)"
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
toc_label: "Deep Convolutional Models (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/183551502-3482e2d7-efb0-4815-9c94-b662606b4842.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Deep Convolutional Models

## Case Studies

### ResNets

아주 아주 깊은 신경망은 훈련시키기가 어려운데요. 왜냐하면 기울기 소실과 폭발 유형의 문제들 때문입니다.

이번엔 한 계층에서 활성화를 가져와 신경망의 훨씬 더 깊은 다른 계층으로 갑자기 전달할 수 있는 건너뛰기 연결에 대해 배울 것입니다.

이를 통해 ResNet을 구축하여 심층 신경망을 훈련할 수 있습니다. 때로는 심지어 100 개가 넘는 레이어로 된 네트워크에 대해서도요. 한 번 보시죠.

#### Residual block

![image](https://user-images.githubusercontent.com/55765292/184796769-afef4a8a-fad9-4c2c-94ad-65870fcb90d0.png)

ResNet는 잔류 블럭이라고 불리는 것으로 만들어졌습니다. 먼저 그게 뭔지 설명해보겠습니다.

신경망 레이어가 두 개 있습니다. $a^{[l]}$ 레이어에서 몇 가지 활성화로 시작합니다. 그리고 $a^{[l+1]}$, 그리고 나서 비활성화 된 두개 레이어 뒤에는 $a^{[l+2]}$가 됩니다.

이 계산의 단계를 통해 $a^{[l]}$를 구하고, 그런 다음 먼저 이 방정식에 의해 제어되는 선형 연산자를 적용합니다. $a^{[l]}$ 으로부터 시작해서 $z^{[l+1]}$ 과 가중 매트릭스를 곱하고, 바이어스 벡터 값을 더해주면 됩니다.

그런 다음 ReLU 비선형성을 적용하여 $a^{[l+1]}$를 구합니다. $a^{[l+1]}$가 $g(z^{[l+1]})$인 방정식에 의해 제어됩니다.

그런 다음, 다음 레이어에서 이 선형 단계를 다시 수행하면, 이 방정식에 의해 제어될 것입니다. 이건 바로 왼쪽에 있는 이 방정식하고 꽤 비슷하죠.

그리고 마지막으로, 다른 ReLU 연산을 적용하면, 이제 이 방정식에 의해 제어되며, 여기서 g는 ReLU 비선형성입니다. 이렇게 하면 $a^{[l+2]}$ 값을 얻습니다 자 다시 말해, $[l]$에서 $[l+2]$로 이동하기 위해서는 이 모든 단계를 거쳐야 하는데요.

이걸 레이어 세트의 주요 경로라고 부르도록 하죠. 잔류 네트워크에서, 이걸 바꿔봅시다. $a^{[l]}$을 가져다가 우선 앞으로 쭉 빼서 복사하시고, 바로 여기 신경망에 매치시켜 줍니다.

그러면 이 $a^{[l]}$이 위치하게 됩니다. 비선형성에 적용하기 전에 ReLU 비선형성입니다. 이것을 **지름길short cut** 이라고 부르겠습니다.

주 통로를 따라갈 필요 없이 $a^{[1]}$의 정보는 이제 신경망으로 훨씬 더 깊숙이 들어가는 지름길을 따라갈 수 있습니다. 즉, 이 마지막 방정식이 사라지고 대신 출력 $a^{[l+2]}$가 이전과 같이 $z^{[l+2]}$에 적용된 ReLU 비선형성 g라는 것을 의미합니다. 이제는 $a^{[l]}$을 더하면 됩니다.

따라서, 여기서 이 $a^{[l]}$을 덧셈하면, 이게 잔여 블럭을 만들게 되는 거죠. 이 그림에서 지름길이 이쪽에 가도록 그려서 맨 위에 있는 그림을 수정할 수도 있습니다. 여기 두 번째 레이어로 들어가면서 그릴 건데요. 바로 가기 부분이 ReLU 비선형성 전에 추가되기 때문입니다. 여기 있는 각 노드들은요. 선형 함수와 ReLU가 적용되기 때문입니다.

따라서 $a^{[l]}$는 선형 부분 뒤에 ReLU 부분 전에 들어갑니다. 때로는 지름길이라는 용어 대신 **연결 건너뛰기skip connection**라는 용어를 듣게 될 텐데요. 즉, $a^{[l]}$는 한 레이어를 건너뛰거나 거의 두 레이어를 건너뛰어 신경망 깊숙이 정보를 처리하는 것을 의미합니다.

ResNet의 발명가들이 찾아낸 것은 잔류 블럭을 사용해서 더 심층 신경망을 훈련할 수 있게 해 준 것입니다. ResNet을 구축하는 방법은 이러한 잔류 블럭을 많이 사용하여 심층 신경망을 형성하기 위해 이렇게 겹쳐 쌓아 올리는 것입니다.

#### Residual Network

![image](https://user-images.githubusercontent.com/55765292/184796716-f2b18373-434c-428e-b921-8e15d44e8ce4.png)

이 네트워크를 보시죠 이것은 잔류블럭이 아니라 **평범한 망plain network**이라고 부릅니다. 이는 ResNet 논문 용어입니다. 이것을 ResNet으로 바꾸려면, 이렇게 짧은 연결도 있지만 이러한 모든 건너뛰기 연결을 추가하는 것입니다.

따라서 각 두 레이어는 이전 그림에서 보았던 추가 변경 사항으로 끝나 각 레이어를 잔류 블록으로 전환합니다. 따라서 이 그림은 5개의 잔류블럭이 같이 쌓여있는 것이고, 이는 곧 잔류블럭이 됩니다.

그리고 만약 여러분이 기울기 하강과 같은 표준 최적화 알고리즘이나 훈련 또는 일반 네트워크에 대한 고급 최적화 알고리즘 중 하나를 사용하는 것으로 나타났습니다.

따라서 추가 잔여물 없이 방금 그린 추가 단축 컷이나 건너뛰기 연결도 없습니다. 경험적으로 레이어 수를 늘리면 훈련 오류는 잠시 후 감소하지만 다시 증가하는 경향이 있습니다. 이론적으로 신경망을 더 깊게 만들면 훈련 세트에서 더 잘 수행해야 합니다.

따라서 이론적으로, 더 깊은 네트워크를 갖는것이 도움이 됩니다. 그러나 사실상 현실적으로 ResNet 없이 평범한 망을 가진 경우 평범한 네트워크가 매우 깊다는 것은 모든 최적화 알고리즘이 훨씬 더 많은 시간을 훈련한다는 것을 의미합니다.

그리고 현실적으로 너무 깊은 네트워크를 고르면 훈련 오류가 점점 더 심해집니다.

ResNet의 경우 레이어 숫자가 많아진다 하더라도 훈련 오류의 성능이 계속 저하될 수 있습니다. 우리가 100 개가 넘는 레이어로 네트워크를 훈련하더라도 말이죠.

이런 활성화를 취함으로써, X가 되거나 이러한 중간계 활성화는 신경망에 더 깊이 들어갈 수 있게 해줍니다. 이는 기울기 소실 및 폭발의 문제점들을 처리하도록 도와주고, 성능 저하 없이 훨씬 더 깊은 신경망을 훈련시킬 수 있습니다. 언젠가는 안정되고 평평해질 것입니다.

그리고 더 깊고 깊은 네트워크에는 도움이 되지 않습니다. 하지만 ResNet은 심층 신경망을 훈련하는 데 효과적이지도 않습니다.


### Why ResNets Work?

ResNet은 왜 잘 작동되는 걸까요? ResNet이 이렇게 잘 작동하는 이유를 설명하는 예를 하나 살펴보겠습니다.

적어도 ResNet이 훈련 세트를 잘하도록 하는 능력을 손상시키지 않고 ResNet을 더욱 깊게 만들 수 있는 방법을 살펴보겠습니다.

여러분이 이해하셨듯이 훈련 세트를 잘 하는 것이 보통 훈련 세트, 깊이 또는 훈련 세트를 잘하기 위한 전제 조건입니다. 훈련 세트에서 ResNet을 잘 훈련시키는 것은 그것을 향해 제대로 된 첫 걸음을 내딛는 것이죠. 예시를 하나 보죠.

#### Why do residual networks work?

![image](https://user-images.githubusercontent.com/55765292/184798984-93128b1b-3f7f-4140-9b6a-9d66e00d7677.png)

마지막 영상에서는 네트워크를 더 깊게 하면 네트워크를 훈련 세트 상에서 잘 동작하도록 훈련하는 능력이 저하될 수 있습니다. 그런 이유로 때로는 지나치게 깊은 네트워크는 원하지 않을 수 있습니다.

그러나 여러분이 ResNet를 훈련할 때에 이 말은 사실이 아니거나 적어도 사실일 가능성이 매우 적습니다. 예를 들어 보겠습니다.

예를 들어 X가 큰 신경망에 공급되어 활성화 $a^{[l]}$만 출력한다고 가정해 보겠습니다. 이 예제에서 신경망을 조금 더 깊게 만들고자 수정한다고 가정 해 봅시다. 따라서 동일한 큰 NN을 사용하면, 이 출력은 $a^{[1]}$이 되고, 이 네트워크에 레이어를 추가적으로 몇 개 더할 것입니다.

그리고 나서 여기에 레이어를 하나 더 추가하고, 또 다른 레이어는 여기에 추가합니다. 그럼 이제 출력은 $a^{[l + 2]}$가 되요. 이 블록은 ResNet 블록으로 하겠습니다.

이 블록은 추가 단축컷이 있는 잔류 블록입니다. 토론을 위해서, 이 네트워크 전체에서 가치 활성화 함수를 사용하고 있다고 합시다. 따라서 입력 X를 제외하고 모든 활성화는 0보다 크거나 같습니다. 왜냐하면 값 활성화 출력의 숫자가 0이거나 양수이기 때문입니다.

이제 $a^{[l+2]}$가 어떻게 되는지 봅시다. 이전에 나왔던 표현을 똑같이 써보면, $a^{[l+2]} = g(z^{[l+2]} + a^{[l]})$이 됩니다. $a^{[l]}$을 덧셈하는 것은 우리가 추가했던 건너띄기 연결의 작은 원에서 나온 것입니다.

이걸 확장시키면, 이것은 $g(w^{[l+2]}a^{[l+1]} + b^{[l+2]})$ 입니다. 따라서, 여기 $z^{[l+2]}$는 이것과 같고, 여기에 $a^{[1]}$를 더해줍니다.

지금 보시면 뭔가, 이 K에 대해 L2 정규화를 사용하면, $w^{[l+2]}$의 값이 축소되는 경향이 있습니다. K에서 B로 적용하고 있다면, 이 또한 축소될 것입니다만.

실제로도 K에서 B에 적용하지 않을 때도 있지만 여기서 W는 정말 주목해야 할 핵심 용어입니다. $W^{[l+2]} = 0$ 이고 $b = 0$ 이라고 가정해봅시다.

앞에 항들은 0과 같기 때문에 사라집니다. $g(a^{[l]})$은 $a^{[l]}$과 같아집니다. 왜냐하면 가치 활성화 함수를 사용한다고 가정했기 때문입니다. 모든 활성화가 음수이면, $g(a^{[l]})$ 은 음수가 아닌 양에 적용되는 값입니다.

따라서 다시 $a^{[l]}$을 얻게 됩니다. 즉, 이는 항등 함수가 잔류 블록이 학습하기 쉽다는 것을 나타냅니다.

여기 이 건너띄기 연결이 있으므로 $a^{[l + 2]} = a^{[l]}$ 임을 얻어내는 것은 쉽다는 걸 보여줍니다. 즉, 신경망에 이 2개의 레이어를 추가하면, 신경망의 기능뿐만 아니라 이 2개의 레이어가 없어도 심플한 네트워크에도 영향을 주지 않습니다.

왜냐하면 이 두 개의 레이어를 추가해도 $a^{[l]}$를 a^{[l + 2]}$에 복사하는 것만 해도 항등 함수를 쉽게 배울 수 있기 때문입니다. 이게 바로 두 개의 추가 레이어를 더하고 이 잔류블럭을 여기 큰 신경망의 중간이나 끝 어딘가에 더해도 수행능력은 저해되지 않는 이유인 것입니다.

하지만 물론 성능을 해치는 것이 아니라 퍼포먼스를 돕는 것입니다. 이러한 모든 표제 단위가 실제로 유용한 것을 배웠다면 항등 함수를 배우는 것보다 훨씬 더 잘할 수 있을 것입니다.

또, 이러한 건너띄기 연결의 잔류가 없는 매우 깊은 심층 신경망의 평범한 망에서는 네트워크의 깊이가 점점 깊어질수록 사실 항등함수조차 학습할 수 있는 파라미터를 고르는 것은 매우 어렵고 그렇기 때문에 많은 층이 결과물을 좋게 만드는 것이 아니라 오히려 더 나쁘게 만드는 것입니다.

그리고 잔류 네트워크가 작동하는 주된 이유는 이러한 추가 층이 항등 함수를 쉽게 학습할 수 있기 때문에 성능에 영향을 주지 않고 많은 시간을 사용할 수 있으며 심지어 성능에 도움이 되기 때문입니다.

적어도 수행능력을 저하시키지 않는 적절한 기준치에서 이행하는 것이 쉬워지고, 그러면 뛰어난 수행능력은 솔루션을 개선할 수 있습니다.

이 편집 본을 통해 논의할 가치가 있는 잔류 네트워크의 또 하나의 세부사항은 $z^{[l + 2]}$와 $a^{[l]}$의 차원이 같다고 가정합니다.

ResNet에서는 동일한 컨볼루션을 많이 사용하고 있기 때문에 이것의 차원은 이 레이어 또는 출력 레이어의 차원과 같아집니다. 이렇게 짧은 빨간 원을 연결할 수 있도록 해주는데요.

왜냐하면 같은 컨볼루션은 차원을 그래도 유지해주고 이렇게 하면 이 짧은 원을 수행하고 두 개의 동일한 차원 벡터를 더하는 작업이 쉬워집니다.

입출력이 다른 차원을 가지는 경우를 예시로 들면, 만약 이게 128 차원이고, z 니까, 이 $a^{[l]}$이 256 차원입니다. 추가 매트릭스, 즉 $W_s$를 여기에 더해주세요. 그리고 이 예에서 $W_s$는 256 x 128차원 매트릭스입니다.

따라서, $W_s \times a^{[l]} = 256$ 차원이 되고 이 덧셈은 이제 2개의 256 차원의 벡터 사이에 있는 것입니다. $W_s$로 할 수 있는 게 몇 가지 있는데요. 우리가 배웠던 파라미터 매트릭스일 수도 있고 고정된 매트릭스일 수도 있습니다. 0 패딩으로 $a^{[l]}$를 사용하고, 다음으로 256차원 패드를 0 패딩으로 구현합니다. 이 두 가지 버전 중 어느 것이든 상관없습니다.

자 마지막으로, 이미지 상의 ResNet을 살펴봅시다.

#### ResNet

![image](https://user-images.githubusercontent.com/55765292/184800107-e867e27d-6966-42e6-91f8-847c8bbe8b54.png)

이것들은 Harlow의 논문에서 가져온 이미지들입니다. 평범한 망의 예시로서, 이미지를 입력하고 softmax 출력을 얻을 때까지 많은 컨볼 레이어를 쭉 가지는 것입니다.

이걸 ResNet으로 전환시키려면, 이 추가 건너띄기 연결을 더하세요. 몇 가지 세부사항을 언급하려고 합니다. 여기에 3 x 3 컨볼루션이 많이 있고, 그리고 이 대부분은 똑같은 3 x 3 컨볼루션인데요. 그래서 여러분은 동일한 차원의 특성 벡터를 더하고 있는 것입니다.

따라서 완전히 연결된 레이어보다, 이것들이 진짜 컨볼루션 레이어들입니다. 하지만 같은 컨볼루션이기 때문에, 차원은 보존되므로, $z^{[l + 2]} + a^{[l]}$ 에서 이 덧셈이 이치에 맞게 되는 겁니다.

앞서 NetRes에서 보았던 것과 유사하게 상당한 컨볼루션 레이어가 있고 거기에는 간헐적으로 플링 레이어들 뿐만 아니라 혹은 풀링 같아 보이는 것들도 있죠.

이런 것들이 생겨날 때마다 이전 그림에서 보았던 차원을 조정해야 할 필요가 있습니다. $W_s$ 매트릭스를 할 수 있고, 그리고 이들 네트워크에서 흔히 볼 수 있듯이 여러분에게는 컨볼 풀이 있는데요.

그 후에는 softmax를 사용하여 예측을 하는 완전히 연결된 레이어가 있습니다. 자, 여기까지가 ResNet 에 대한 것입니다.


### Networks in Networks and 1x1 Convolutions

컨텐츠 아키텍처 설계에 있어서, 정말 도움되는 방안은 1 x 1 컨볼루션을 사용하는 것입니다 이제, 궁금하실 텐데요, 1 x 1 컨볼루션은 무엇을 할까요? 그냥 숫자를 곱하는 거 아닐까요? 재미있어 보이는데요, 사실 그렇진 않은 것 같죠 그럼 하나씩 살펴보겠습니다.

#### Why does a $1 \times 1$ convolution do?

![image](https://user-images.githubusercontent.com/55765292/184800578-80eb84d3-fbb8-4fa7-9b88-fedc0fd62931.png)

여기 $1 \times 1$ 필터가 있습니다. 그곳에 저는 숫자 2를 두었습니다. 그리고 $6 \times 6$ 이미지를 가지고 $6 \times 6 \times 1$을 이 $1 \times 1 \times 1$ 필터로 컨벌브하면, 배출량에 2를 곱한 것이 나오게 됩니다. 따라서 1, 2, 3은 2, 4, 6등이 되게 됩니다. 따라서, $1 \times 1$ 필터의 컨볼루션은 특별히 유용해 보이지는 않습니다. 그냥 어떤 숫자로 곱하기를 하는것 뿐이죠.

하지만 이건 $6 \times 6 \times 1$ 채널 이미지의 경우입니다. 만약 여러분이 $6 \times 6 \times 1$가 아닌 $6 \times 6 \times 32$ 가지고 있다면, $1 \times 1$ 필터가 있는 컨볼루션은 훨씬 더 이치에 맞는 무언가를 할 수 있습니다. 특히 $1 \times 1$ 컨볼루션이 수행 할 작업은 여기 있는 36개의 서로 다른 것들을 하나하나 살펴볼 것입니다.

왼쪽 32개의 숫자와 필터의 32개의 숫자 사이에서 요소별 곱을 취합니다. 그런 다음 ReLU를 적용하고 그 후에 비선형성을 적용합니다. 36개의 위치 중 하나를 보려면 이 볼륨에서 한 조각씩 이 36개의 숫자를 취해서 부피에 한 조각씩 곱하면 하나의 실수가 됩니다. 그런 다음 출력 중 하나에 표시됩니다.

사실 32개의 숫자를 생각할 때 $1 \times 32$ 필터는 마치 32개의 숫자를 입력해 주는 1개의 뉴런을 가지고 있는 것 같습니다. 동일한 위치, 높이, 너비에서 32개의 숫자에 32개의 다른 채널을 곱하여 32개의 가중치를 곱합니다.

그런 다음 ReLU를 적용하고 비선형성을 적용합니다. 그 후에 대응되는 것을 이쪽에 출력하면 됩니다.

더 일반적으로 필터가 하나가 아니라 필터가 여러 개인 경우 이는 하나의 단위가 아니라 여러 단위가 하나의 슬라이스에 있는 모든 숫자를 입력해서 출력으로 쌓는 것과 같습니다.

필터 수에 따라 $6 \times 6$으로요. 따라서 $1 \times 1$ 컨볼루션에 대해 생각해볼 수 있는 한가지 방법은 기본적으로 62개의 다른 위치 각각에 적용되는 완전히 연결된 신경망을 갖는 것입니다.

완전히 연결된 신경망이 하는것은 32 숫자를 입력하고 필터 수를 출력합니다. 지불인 표기법인 것 같은데요. 그게 다음 레이어라면 0 + 1의 $n_c$입니다.

각각의 36개의 위치에서, 즉 각각 $6 \times 6$ 위치에서 이렇게 함으로서 필터 수를 기준으로 $6 \times 6$인 출력 값이 나오게 됩니다.

그리고 이것은 여러분의 입력 볼륨에 대해 아주 단순한 계산을 수행할 수 있습니다. 이런 아이디어를 바로 **$1 \times 1$ 컨볼루션** 이라고 부릅니다. 혹은 network in network라고도 불립니다.

#### Using $1 \times 1$ convolutions

![image](https://user-images.githubusercontent.com/55765292/184800624-b40327c5-0fcc-48f2-b4e6-2b97cbbd9be9.png)

$1 \times 1$ 컨볼루션이 매우 유용하다는 예를 들어보자면, 여기 하나가 있습니다. $28 \times 28 \times 192$ 볼륨이라고 가정해보죠.

높이와 넓이를 줄이고 싶다면 플링 레이어를 사용할 수 있습니다. 우린 이걸 하는 방법을 알고 있죠. 그러나 채널 수 중 하나가 너무 커져서 이를 축소해야 합니다. $28 \times 28 \times 32$ 차원 볼륨으로 어떻게 줄일 수 있을까요?

음, 여러분이 할 수 있는 것은 $1 \times 1$인 32필터를 사용하며, 기술적으로 각각의 필터는 $1 \times 1 \times 192$ 차원이 되는데요. 왜냐하면 필터의 채널 수는 입력 볼륨의 채널 수와 일치해야 하기 때문이죠.

그러나 여러분은 32개의 필터를 사용하면 이 프로세스의 출력은 $28 \times 28 \times 32$ 볼륨이 될 것입니다. 이것은 장점이자 볼 수 있는 방법입니다.

풀링 레이어는 단지, $n_H$와 $n_W$, 이 볼륨의 높이와 넓이 축소하는 데 사용됩니다.

$1 \times 1$ 컨볼루션이 어떻게 채널의 수를 줄이는지 살펴보겠습니다. 따라서 일부 네트워크에서는  비용을 절감할 수 있습니다. 하지만 물론, 채널 수를 192로 유지하고자 한다면 그것도 괜찮습니다.

$1 \times 1$ 컨볼루션의 효과는 단지 비선형성을 가지고 있다는 것입니다 $20 \times 20 \times 192$ 입력, 그리고 $20 \times 20 \times 192$ 출력이라는 또 다른 레이어를 추가함으로써 네트워크의 더 복잡한 함수를 배울 수 있습니다.

이제 여러분은 이제 $1 \times 1$ 컨볼루션 연산이 실제로 어떻게 간단한 연산을 수행하는지 살펴보았으며, 볼륨 내 채널 수를 줄이거나, 원하는 경우 채널 수를 그대로 유지하거나 늘릴 수 있습니다.

다음에는 이것을 사용하여 인셉션 네트워크를 구축할 수 있습니다.
