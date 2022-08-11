---
title: "[Ⅳ. Convolutional Neural Networks] Convolutional Neural Networks (4)"
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
toc_label: "Convolutional Neural Networks (4)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/183551502-3482e2d7-efb0-4815-9c94-b662606b4842.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Convolutional Neural Networks

## Foundations of Convolutional Neural Networks

### One Layer of a Convolutional Network

이제 합성곱 신경망의 한 레이어를 구성할 준비가 되었습니다. 예시를 한 번 살펴봅시다. 전에 3D 입체형을 두 개의 필터와 합성곱을 하는 방법을 살펴보았습니다.

---

![image](https://user-images.githubusercontent.com/55765292/183840550-a1605e2a-a0a9-4bb6-b00c-0d6f8198d47a.png)

2개의 4 x 4 출력을 갖는 이 예시에서 첫 번째 필터와 컨볼브해서 첫 번재 4 x 4 출력을 얻게 되었고 두 번재 필터와 컨볼브해서 다른 4 x 4 출력을 얻게 되었습니다.

이것을 합성곱 신경망 레이어로 만들기 위해 마지막으로 할 일은 각각에 편향을 더하는 것인데 이 수는 실수여야 합니다. 파이썬 브로드캐스팅은 16개의 요소에 동일한 숫자를 패딩하고 여기서는 상대적 비선형성이라고 하는 비선형성을 적용하면 출력은 4 x 4가 됩니다.

편향과 비선형성을 적용한 결과입니다. 아래에 있는 것에도 다른 편향을 추가합니다. 실수로 수행해야 합니다. 동일한 숫자를 모든 16 개의 숫자에 더한 다음 ReLU 비선형성 같은 비선형성을 적용합니다.

그러면 또 다른 4 x 4 의 출력이 나옵니다. 이전에 했던 것처럼 이것을 이렇게 쌓으면 4 x 4 x 2 출력을 얻게 됩니다. 이 계산을 통해 6 x 6 x 3이 4 x 4 x 4가 되었는데 이것이 합성곱 신경망의 한 개의 레이어입니다.

이것을 합성곱이 아닌 표준 신경망의 한 레이어에 연결시키기 위해서는 전파의 바로 전 단계는 이렇습니다. $z^{[1]} = w^{[1]}a^{[0]}$ 에 $a^{[0]}$ 는 $x$ 와 같고 그리고 $b^{[1]}$ 을 더합니다. $a^{[1]}$ 산출하기 위해서 비선형성을 적용하면 $g(z^{[1]})$가 됩니다.

이 예시에서는 이것이 $a^{[0]}$인데 실제로는 $x$ 에 해당하고 이 필터들은 $w^{[1]}$과 유사한 역할을 합니다. 그래서 합성곱 연산을 할 때에 이 27 개의 숫자를 취하게 되는데 정확히는 필터가 두개이기 때문에 27 x 2에 해당하는 숫자를 갖게됩니다.

이 숫자들을 모두 곱해야 합니다. 이 4 x 4 행렬을 얻기 위해 일차 함수를 계산하는 것입니다. 이 합성곱 연산의 출력인 4 x 4행렬은 $w^{[1]} \times a^{[0]}$과 비슷한 역할을 합니다.

이 두 개 4 x 4 행렬의 출력입니다. 또 편향을 더해야 하는데 ReLU를 더하기에 앞서 이것은 $z$와 비슷한 역할을 합니다.

그리고 마지막으로 이런 비선형성을 적용해 줍니다. 이 아웃풋은 $a^{[1]}$의 역할을 하고 다음 레이어에서 활성화됩니다. 이런 식으로 $a^{[0]}$ 에서 $a^{[1]}$으로 선형 연산을 해주고 합성곱에서는 이것들을 곱해줍니다.

따라서 합성곱은 실제로 선형 연산을 적용하고 있으며 편향과 ReLU 연산을 하는 것입니다. 6 x 6 x 3 차원의 $a^{[0]}$로부터 시작해서 신경망의 레이어 하나를 거쳐서 4 x 4 x 2 차원의 $a^{[1]}$으로 바뀌게 되는 것입니다.

따라서 6 x 6 x 3 은 4 x 4 x 2로 바뀌었고 이것이 합성곱 신경망의 하나의 레이어가 되는 것입니다. 이 예시는 두 개의 필터로 인해 두 개의 속성을 지니고 있습니다.

그래서 4 x 4 x 2 의 출력이 나온 것이죠. 하지만 예를 들어 2개가 아니라 필터가 10개가 있다면 4 x 4 x 10 크기의 출력을 갖게 되겠죠.

이제는 두 개가 아닌 10 개의 행렬을 쌓아서 4 x 4 x 10 이 되고 그것이 $a^{[1]}$ 이 될 것입니다. 좀 더 잘 이해하기 위해 연습을 한 번 해봅시다.

---

![image](https://user-images.githubusercontent.com/55765292/183840687-c316eed7-df84-47d6-a12a-834c317305f1.png)

2개가 아닌 10개의 필터가 있고 각각 3 x 3 x 3 크기로 신경망의 한 레이어에 있다면 이 레이어는 몇 개의 매개변수를 가질까요? 한 번 알아봅시다.

각각의 필터는 3 x 3 x 3 의 크기로 27 개의 변수를 가집니다. 숫자가 27개가 될 것이고 편향을 더해줘야 합니다. 이것을 $b$ 라는 변수라고 하면 총 28 개의 변수를 갖게 되죠.

이전에는 2개의 필터만 그렸었는데 이번에는 10개의 필터가 존재합니다. 1, 2, … ,10개의 필터가 있고 28에 10을 곱하면 280개의 매개 변수를 가지게 됩니다.

한 가지 좋은 점은 입력 이미지의 크기가 1000 × 1000 이 되던지 5000 × 5000 이 되던지 변수의 수는 280개로 여전히 고정되어 있다는 것입니다. 그리고 이 10개의 필터로 수직 엣지, 수평 엣지 등 여러 가지 다른 속성들을 검출할 수 있습니다.

아주 큰 이미지라도 적은 수의 변수로 가능합니다. 이것이 과대적합을 방지하는 합성곱 신경망의 한 성질입니다. 이 10개의 속성 검출기가 잘 작동한다면 훨씬 더 큰 이미지에도 적용이 가능하고 매개 변수의 수는 여전히 고정되어 있고 상대적으로 작습니다. 이 예시의 280개처럼 말이죠.

---

![image](https://user-images.githubusercontent.com/55765292/183840721-a6ed3a16-462a-49a4-b819-54770f4f3a24.png)

이를 마무리 하면서 합성곱 레이어를 설명하는 표현을 한 번 요약해보자면 $l$ 은 합성곱 계층이고 $f^{[l]}$ 로 필터의 크기를 표시하겠습니다. 이전에는 필터 크기를 $f \times f$ 로 나타냈지만 이제는 $[l]$ 이라는 표현으로 $f \times f$의 필터의 크기가 $l$이라고 표시하겠습니다.

그리고 일반적으로 $[l]$ 은 특정 레이어 $l$ 을 나타내는 표현입니다. 이제 $p^{[l]}$로 패딩의 양을 표시하겠습니다. 패딩의 양은 밸리드 합성곱으로 패딩이 없을 수도 있고 구체화될 수 있습니다. 아니면 패딩이 있는 세임 합성곱이 될 수도 있습니다. 그래서 출력의 크기가 입력의 크기가 동일할 수 있죠.

그리고 $s^{[l]}$ 로 스트라이드를 나타낼 것입니다. 이 레이어의 입력은 특정한 크기를 가지게 되는데 $n \times n \times (채널의 수)$ 의 크기를 갖게 됩니다. 이 표현을 $[l－1]$ 으로 바꿔서 사용하도록 하겠습니다. 이전 레이어의 활성값이기 때문입니다. $n^{[l-1]} \times n^{[l-1]} \times n_C^{[l-2]}$입니다.

지금까지의 예시에서는 높이와 너비가 같은 이미지를 사용했지만 다른 경우에는 $H$ 와 $W$ 첨자로 이전 레이어의 입력의 높이와 너비를 표시하겠습니다.

따라서 레이어 $l$에서 볼륨의 크기는 $n_H \times n_W \times n_C$이고 $[l]$을 갖게 됩니다. 이것은 l 레이어의 입력은 지난 레이어의 값을 사용하기 때문에 $[l-1]$로 표기한 것입니다. 그리고 이 신경망의 레이어가 그 자체로 출력이 될 것입니다.

그래서 출력은 $n_H^{[l]} \times n_W^{[l]} \times n_C^{[l]}$ 이죠. 이것이 출력의 사이즈가 됩니다. 이전에 살펴보았듯이 출력의 크기 또는 적어도 높이와 너비는 다음 공식으로 표현했습니다.

$\dfrac{n + 2p - f}{s} + 1$인데 전체를 내림해야 합니다. 새로운 표기에서 $l$ 레이어의 출력의 크기가 이전 레이어의 크기가 되고 그리고 $l$ 레이어에서 사용하는 패딩을 더해준 후 이 $l$ 레이어에서 사용하고 있는 필터의 크기를 빼면 됩니다.

이것이 높이에 해당하는 것입니다. 그래서 출력 크기의 높이가 주어졌고 오른쪽에 있는 이 수식으로 너비를 계산할 수 있습니다. $H$ 를 지우고 $W$를 넣으면 되는데 그래서 높이던 너비던 이 공식에 넣게 되면 출력의 높이와 너비를 계산할 수 있습니다.

이렇게 해서 $n_H^{[l-1]}$ 은 $n_H^{[l]}$과 $n_W^{[l-1]}$은 $n_W^{[l]}$과 연관이 됩니다. 그렇다면 채널의 수는 어디서 오는 것일까요? 살펴보겠습니다.

출력의 크기가 이런 깊이를 가진다면 이전에 배워서 알고 있듯이 이것은 레이어의 필터의 수입니다. 이전 예시에서는 두 개의 필터가 있어서 출력이 4 x 4 x 2 인 2차원이었습니다.

만약 10개의 필터가 있다면 출력의 크기는 4 x 4 x 10 이 됩니다. 이 출력값에 있는 채널의 수는 그저 신경망 계층에서 사용하는 필터의 개수입니다.

다음은 각 필터의 크기입니다. 각 필터는 $f^{[l]} \times f^{[l]} \times 숫자$ 일텐데 그럼 그 마지막 숫자는 무엇일까요?

6 x 6 x 3 이미지를 3 x 3 x 3 필터로 합성곱을 해야 한다는 것을 살펴보았습니다. 필터의 채널의 수와 입력의 채널의 수가 일치해야 하기 때문에 이 숫자는 이 숫자와 동일해야 합니다.

따라서 각각의 필터는 $f^{[l]} \times f^{[l]} \times n_C^{[l - 1]}$ 이 되는 것입니다. 편향과 비선형성을 적용한 후 출력은 이 레이어의 활성값인 $a^{[l]}$ 이 되고 이미 살펴봤듯이 이것의 크기가 됩니다.

$a^{[l]}$ 은 3D 크기가 되고 $n_H^{[l]} \times n_W^{[l]} \times n_C^{[l]}$이 되는 것입니다. 만약 벡터화된 방식을 사용하거나 배치 기울기 하강 또는 미니 배치 기울기 하강을 사용할 때 m 예시를 가지고 있다면, m 활성값인 $A^{[l]}$을 산출하게 되는데 $m \times n_H^{[l]} \times n_W^{[l]} \times n_C^{[l]}$ 가 됩니다.

프로그래밍 크기와 배치 기울기 하강을 사용한다면 변수들의 배치 순서가 될 것입니다. 우선 인덱스와 트레일링 예제가 있고 3개의 변수들이 있습니다. 다음은 가중치 또는 $w$ 라는 변수입니다.

필터의 크기에 대해서는 이미 살펴봤는데 필터는 $f^{[l]} \times f^{[l]} \times n_C^{[l - 1]}$ 입니다. 하지만 이것은 필터 하나의 크기입니다.

그렇다면 우리는 몇 개의 필터를 갖고 있을까요? 이것이 총 필터 수입니다. 모든 필터의 가중치는 필터를 전부 모은 것이기 때문에 그 크기는 이것에 필터의 개수를 곱해주면 됩니다.

마지막 값이 l 레이어의 필터의 개수이기 때문이죠. 마지막으로 편향에 대한 매개 변수인데 필터마다 하나의 실수값인 편향을 가지기 때문에 편향은 이렇게 많은 변수가 됩니다.

이 크기의 백터에 해당하는 것입니다 나중에 보겠지만 이후의 코드에서는 (1, 1, 1, $n_C^{[l]}$) 의 4 차원 행렬 또는 텐서로 나타냅니다.

많은 표현법들이 있었습니다. 많은 경우에 일반적으로 사용되는 표현들이죠. 온라인 상 오픈 소스 코드를 살펴보게 되면 높이와 너비와 채널의 배치 순서에 대해 정해진 기준이 없습니다. GitHub 의 소스코드나 오픈소스의 코드를 보면 일부 작성자들이 이 순서를 대신 사용한다는 것을 알게 될 것입니다.

채널을 먼저 배치하고 때로는 변수의 그 순서를 볼 수 있습니다. 사실 실제로 다수의 일반적인 프레임워크에서 변수 혹은 매개 변수가 있습니다.

그러나 먼저 채널 수를 나열하거나 이러한 볼륨으로 인덱싱할 때 마지막으로 채널 수를 나열하려고 합니다. 일관성이 있다면 두 방식 모두 괜찮습니다.

딥러닝의 분야에서는 합의가 된 표현이 아닐 수 있습니다. 그래도 여기에서는 이 기준을 따르겠습니다. 높이, 너비, 채널의 순서로 나열하는 것이죠.

갑작스럽게 아주 많은 표기들을 소개해서 어떻게 외울지 걱정될텐데 걱정할 필요 없습니다. 굳이 외울 필요는 없고 연습하다보면 익숙해질 것입니다.

요점은 합성곱 신경망의 한 레이어가 어떻게 구성되어 있는지와 한 레이어의 활성값에서 다른 레이어로 전달될 때 필요한 매핑의 과정입니다.

이제 합성곱 신경망의 한 층이 어떻게 구성되어 있는지 알게 되었고 이것들을 쌓아서 더 깊은 합성곱 신경망을 구성해 보겠습니다.