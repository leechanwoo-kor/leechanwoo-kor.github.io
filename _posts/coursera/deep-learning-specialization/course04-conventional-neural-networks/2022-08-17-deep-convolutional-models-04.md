---
title: "[Ⅳ. Convolutional Neural Networks] Deep Convolutional Models (4)"
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
toc_label: "Deep Convolutional Models (4)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/183551502-3482e2d7-efb0-4815-9c94-b662606b4842.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Deep Convolutional Models

## Case Studies

### MobileNet

ResNet 아키텍처와 인셉션 네트에 대해 배웠습니다. 이번에는 MobileNets, 즉, 컴퓨터 비전에 사용되는 또 다른 기초 컨볼루션 신경망 아키텍처에 대해 배우겠습니다. MobileNets는 낮은 계산 환경에서도 작동하는 새로운 네트워크를 쌓고 전개 할수 있게 해줍니다.

---

![image](https://user-images.githubusercontent.com/55765292/185012294-d9551906-fbc7-4c53-97b5-eef4a266e882.png)

왜 다른 신경망 아키텍처가 필요할까요? 여러분이 다른 신경망에서 여태 배운 것들이 상당히 많은 비용이 든다는 것을 알게 됩니다. 배포 시 CPU나 GPU가 덜 강력한 장치에서 신경망을 실행하려면 MobileNet이라는 훨씬 더 나은 성능을 발휘할 수 있는 또 다른 신경망 아키텍처가 있습니다.

depthwise separable 컨볼루션이 어떻게 작동하는지 의견을 나누고 싶습니다. 먼저 정상적인 컨볼루션이 하는 일을 다시 한번 생각해 보고 그런 다음 depthwise separable 컨볼루션을 만들기 위해 수정할 것입니다.

#### Normal Convolution

![image](https://user-images.githubusercontent.com/55765292/185012413-c4e4bc48-1bfb-4566-bc98-04c88bd0e1f3.png)

일반적인 컨볼루션에서 입력 이미지는 $n \times n \times n_c$이며, 여기서 $n_c$는 채널 수입니다.

이 경우 $6 \times 6 \times 3$ 채널이고, $f \times f \times n_c$인 필터를 사용하여 컨볼빙하려고 합니다. 이 경우 $3 \times 3 \times 3$가 되죠.

여러분이 이렇게 하는 방법은 제가 그릴 이 필터로 3차원 노란색 블록으로 가져가서 노란색 필터를 저쪽에 놓는 것입니다. 여러분이 해야 할 27개의 곱셈이 있습니다. 그것을 더하면 여러분은 이 값을 얻게 됩니다.

그런 다음 필터를 위로 이동 시키고 27쌍의 숫자를 곱하면 그것을 더하면 여러분은 이 수를 얻으며 그리고 여러분은 계속 이것을 얻는데 이것을 얻기 위해 그리고 이것 그리고 계속하는데 여러분이 $4 \times 4$ 출력 값을 모두 계산할때까지 합니다.

이때 우리는 패딩을 사용하지 않았고 그리고 우리는 하나의 스트라이드를 사용하므로 $n_{out} \times n_{out}$의 출력 크기가 입력 크기보다 약간 작습니다.

그것은 $6 \times 6$ 대신에 이것은 $4 \times 4$ 단순이 이 한가지 $3 \times 3 \times 3$ 필터를 갖기보다 $n_c$ 프라임 필터가 있을 수 있습니다.

그리고 만약 여러분이 이 중 다섯 가지가 있다면 그러면 출력은 $4 \times 4 \times 5$, 또는 $n_out \times n_out \times n_c'$입니다.

우리가 방금 한 계산 비용이 무엇인지 알아보죠. 이 출력을 계산하는 데 필요한 계산의 총 수는 필터 파라미터의 수에 $3 \times 3$을 곱하여 주어집니다.

우리가 이 큰 노란색 블록을 설치한 장소의 수 입니다. 즉, 그것은 $4 \times 4$이며 그리고 나서 필터 수로 곱하면 이 경우에는 5입니다. 이게 우리가 해야 할 총 곱셈의 개수인지 직접 확인하실 수 있습니다.

왜냐하면 각각의 우리가 필터를 내린 위치들에 대해 우리는 이렇게 많은 곱셈을 해야하며 그런 다음 우리는 이 많은 필터를 얻게 됩니다.

만약 여러분이 이 숫자들을 곱하면 이것은 2,160개가 되는 것으로 밝혀졌습니다. 우리는 다시 돌아 올겁니다.

Depthwise separable 컨볼루션을 고안하면 $6 \times 6 \times 3$ 이미지를 입력으로 받아들이고 2,160보다 더 적은 계산으로 $4 \times 4 \times 5$의 활성화 세트를 출력할 수 있습니다.

자, Depthwise separable 컨볼루션이 어떻게 그렇게 하는지 봅시다.

#### Depthwise Separable Convolution (1)

![image](https://user-images.githubusercontent.com/55765292/185012467-a9bb9551-59ac-4969-ac7c-3c1864d62b1f.png)

방금 여러분이 보신 일반적인 컨볼루션과 대조적으로 depthwise separable 컨볼루션에는 두가지 단계가 있습니다. 먼저 여러분은 depthwise 컨볼루션을 사용하고, 그 다음 pointwise 컨볼루션을 차례로 사용합니다.

이 두가지 단계가 함께 depthwise separable 컨볼루션을 만드는 것입니다. 이 두 가지 단계가 어떻게 작동하는지 살펴봅시다. 특히 이 두 단계 중 첫 번째 단계인 depthwise 컨볼루션이 어떻게 작동하는지에 대한 세부 사항을 구체화해 봅시다.

#### Depthwise Convolution

![image](https://user-images.githubusercontent.com/55765292/185012569-8e8508d8-8795-4618-96f3-33dd02bf6148.png)

이전과 같이 우리는 $6 \times 6 \times 3$인 입력을 가지고, $n \times n \times n_c$는, 3 채널 입니다.

필터와 depthwise 컨볼루션은 $f \times f \times n_c$가 아닌 $f \times f$가 되는데 단지 $f \times f$입니다. 필터의 수는 $n_c$가 될 것이며, 이 경우에는 3이죠.

그렇게 하면 여러분은 $4 \times 4 \times 3$ 출력을 계산하는 방법은 여러분이 각 필터를 입력 채널의 각 채널 중 하나에 적용하는 것입니다. 이것을 단계적으로 통과합시다.

먼저 첫 번째 3 필터에 초점을 맞추죠. 빨간색에만요. 그런 다음 빨간 필터를 사용하여 여기에 위치하고 9 곱셈을 합니다. 이것은 9개의 숫자에 27이 아니라 9를 의미한다는것을 주목하고 더하세요. 그것은 여러분에게 이 값을 줍니다.

그리고 나서 그것을 바꾸어 놓고 9개의 대응하는 숫자 쌍을 곱하면 그것은 여러분에게 여기에 있는 이 값을 주며 그리고 여러분이 이러한 16 값의 마지막에 도달할때까지 계속 합니다.

다음으로 우리는 두 번째 채널로 갑시다. 그리고 녹색 필터를 봅시다. 녹색 필터는 여러분이 이곳에 위치하고 이 값을 계산하기 위해 9개의 곱셈을 수행합니다. 이 값을 계산하기 위해서는 하나씩 위로 이동하세요. 하나씩 이동하고 계속합니다. 출력의 두 번째 채널에서 이 값을 모두 계산 할 때까지 16번 반복합니다.

마지막으로, 세 번째 채널을 위해 이 작업을 수행하는데 거기에는 파란 필터가 있어요. 이 값을 계산하기 위해 거기에 위치하고, 이동하고, 이동하고, 이동하며, 여러분이 3번째 채널에서도 모든 16개의 출력을 계산할때까지 계속 합니다.

출력의 크기는 이 단계 이후에는 $n_out \times n_out$, $4 \times 4, \times n_c$인데, $n_c$는 이 $n_c$와 같습니다. 여러분의 원래 입력에 있는 채널의 수 입니다.

우리가 방금 한 계산 된 비용을 살펴보죠. 이러한 각 출력 값을 생성하기 때문에 각각의 이것들은 $4 \times 4 \times 3$ 출력 값을, 그것은 9번의 곱셈을 필요로 합니다.

총 계산 비용은 $3 \times 3$에 필터 위치의 수를 곱한 값이며, 그것은, 이러한 필터의 각각의 위치의 수는 왼쪽에 있는 이미지 위에 배치 되었습니다. $4 \times 4$가 있었고, 그리고 나서 마침내, 3인 필터의 수를 곱합니다.

이것을 바라보는 또 다른 방법은 여러분에게 $4 \times 4 \times 3$ 출력이 있는데 그리고 이러한 출력의 각각에 대해 여러분은 9 곱셈을 해야만 합니다. 총 계산 비용은 $3 \times 3$, 4 \times 4 \times 3$입니다.

그리고 여러분이 이 숫자들을 모두 곱하면, 432가 됩니다. 하지만 우리는 아직 끝나지 않았습니다 분리된 컨볼루션의 depthwise 컨볼루션 부분입니다.

한 단계 더 있는데, 그것은 우리는 이 $4 \times 4 \times 3$ 중간 값으로 한 단계를 더 수행 해야 합니다 

#### Depthwise Separable Convolution (2)

![image](https://user-images.githubusercontent.com/55765292/185012774-97bca3f9-6796-4683-b0a3-c396c9aa8050.png)

나머지 단계는 다음과 같이 $4 \times 4 \times 3$세트의 값으로 또는 $n_out \times n_out \times n_c$세트 값으로 pointwise 컨볼루션을 적용하여 우리가 원하는 출력을 얻기 위해 $4 \times 4 \times 5$로 할 것입니다. 이제 pointwise 컨볼루션이 어떻게 작동하는지 보죠.

#### Pointwise Convolution

![image](https://user-images.githubusercontent.com/55765292/185012792-fd179798-3dc3-4a6d-bfab-797c9e84d268.png)

여기에 pointwise 컨볼루션이 있습니다. 우리는 중간 값 세트를 가지고 바로 $n_out \times n_out \times n_c$로 $1 \times 1 \times n_c$인 필터로 계산합니다.

이 경우에는 $1 \times 1 \times 3$입니다. 그럼, 여러분은 이 분홍색 필터를 가지고 이 분홍색은 $1 \times 1 \times 3$블록인데 그리고 가장 왼쪽 위에 있는 위치에 적용하세요.

3가지 곱셈을 수행하시고 그것을 더하면 여러분에게 이러한 값을 줍니다. 하나씩 이동하고 세 쌍의 숫자를 곱하고 그것들을 더하면 여러분에게 그 값을 제공하는 등의 작업을 수행할 수 있습니다.

이 출력의 모든 16 값을 채울 때까지 계속 합니다. 자, 우리는 1개의 필터로 이것을 했습니다. 바로 또 다른 $4 \times 4$ 출력, $4 \times 4 \times 5$ 차원 출력을 얻기 위해서죠.

여러분은 실제로 $n_c'$ 필터를 사용하여 이 작업을 수행할 수 있습니다. 이 경우, $n_c'$은 5로 설정될 것입니다. 따라서 이러한 $1 \times 1 \times 3$ 필터 5개로 여러분은 다음과 같이 $4 \times 4 \times 5$ 출력을 얻습니다.

여러분에게 $n_out \times n_out \times n_c$ 프라임 차원 출력을 제공하기 위해 말이죠. pointwise 컨볼루션은 $4 \times 4 \times 5$의 출력을 제공합니다. 계산 비용을 알아보죠. 우리가 방금 한 것에 대해서 말이죠.

이 모든 $4 \times 4 \times 5$ 출력 값 모두를 위해 이 분홍색 필터를 입력의 일부에 적용해야 했습니다. 세 번의 연산이 필요하거나 필터 파라미터의 개수인 $1 \times 1$이 필요합니다. 필터는 다음 위치에 배치되어야 합니다. $4 \times 4$의 서로 다른 위치 말이죠. 그리고 우리는 4개의 필터가 있습니다.

우리가 여기서 한 일의 비용을 말하는 것은, $1 \times 1 \times 3 \times 4 \times 4 \times 5$, 이는 240개의 곱셈입니다.

#### Depthwise Separable Convolution (3)

![image](https://user-images.githubusercontent.com/55765292/185012822-508164f0-bc27-4ce9-b1fb-ffe6f453f6e8.png)

우리가 방금 다룬 예에서 일반적인 컨볼루션에서는, $6 \times 6 \times 3$ 입력으로 입력되었고, 그리고 $4 \times 4 \times 5$ 출력으로 끝났습니다.

depthwise separable 컨볼루션에도 마찬가지 인데, 단지 우리가 2 단계로 depthwise 컨볼루션을 했고 그 다음 pointwise 컨볼루션을 차례로 사용했습니다.

자, 이 모든 작업에 대한 계산 비용은 얼마일까요? 

#### Cost Summary

![image](https://user-images.githubusercontent.com/55765292/185012839-f6af9355-3216-4832-aa11-5bd275079a61.png)

일반적인 컨볼루션의 경우 우리는 출력을 계산하기 위해 2160곱셈이 필요했습니다.

depthwise separable 컨볼루션에는, 우선은, depthwise 단계가 있었죠. 우리가 초반에 다뤘던 겁니다. 432배의 곱셈과 pointwise 단계, 이는 우리가 240개의 곱셈을 가졌던 것이고, 그래서 이러한 것들을 더하면 우리는 672의 곱셈을 얻게 됩니다.

만약 우리가 이 두 숫자 사이의 비유을 보면, 2160에 있는 672에서, 이것은 약 0.31인 것으로 밝혀졌습니다. 이 예의, depthwise separable 컨볼루션은, 약 31퍼센트였습니다. 일반적인 컨볼루션만큼 계산 비용이 많이 들고 절감 효과가 있습니다.

MobileNets 논문의 저자들은 일반적으로 일반 컨볼루션과 비교하여 depthwise separable 컨볼루션 비용의 비율이 $\dfrac{1}{n_c'}$과 $\dfrac{1}{f^2}과 같다는 것을 보여주었습니다.

우리의 경우에 이것은 5분의 1 더하기 3제곱 분의 1 또는 9분의 1, 즉 0.31 이었습니다. 보다 전형적인 신경망 예에서, $n_c'$은 훨씬 더 클 것입니다. 이것은 512분의 1일 수도 있습니다. 출력에 512개의 채널이 있고 3제곱에 1개 더하면 이는 상당히 일반적인 파라미터 또는 새 네트워크일 수 있습니다.

이것은 정말 작고, 이것은 9분의 1입니다. 대략적으로, 비교하여 depthwise separable 약 9분의 1일 수 있고 계산 비용이 약 10배 저렴합니다.

그래서 depthwise separable 컨볼루션에도 콘트넷의 빌딩 블록으로서, 일반 컨볼루션을 사용하는 것보다 훨씬 효율적으로 추론을 수행할 수 있게 해줍니다.

#### Depthwise Separable Convolution (4)

![image](https://user-images.githubusercontent.com/55765292/185012887-b51e0946-2bf2-4d68-b938-26d2d1160793.png)

우리가 겪은 예를 통해서 여기에서의 입력은 $6 × 6 × n_c$ 이었고, 여기서 $n_c$는 3과 같으므로 따라서 여러분은 여기에 $3 \times 3 \times n_c$ 필터가 있는 겁니다.

이제 depthwise separable 컨볼루션은 임의 수의 입력 채널에 대해 작동합니다. 만약 여러분이 6개의 입력 채널을 가지고 있다면 여기서 $n_c$는 6과 같으므로 여러분도 따라서 $3 \times 3 \times 6$ 필터를 갖게 됩니다.

중간 출력은 계속해서 $4 \times 4 \times n_c$이며, $4 \times 4 \times 6$이 됩니다.

자, 이 도표에는 뭔가 잘못된 것 같은데요. 그렇지 않나요? 무엇이냐면 이것은 $3 \times 3 \times 3$이 아닌 $3 \times 3 \times 6$이어야 합니다.

하지만 도표를 만들기 위해 조금 더 간단해 보이지만 채널 수가 3보다 큰 경우에도 저는 여전히 depthwise 컨볼루션 연산을 마치 이 세 개의 필터로 이루어진 스택인 것처럼 그릴 것입니다.

이 아이콘을 나중에 볼 때 depthwise 컨볼루션 연산에서 우리는 채널 수를 문자 그대로 정확하게 시각화하는 것이 아니라 depthwise 컨볼루션을 나타내기 위해 사용하는 아이콘이라고 생각해 보세요.

유사한 아이콘을 사용하여 pointwise 컨볼루션을 나타냅니다. 이 예제에서 입력은 다음과 같습니다. $4 \times 4 \times n_c$, 여기에는 실제로, 이 값이 있습니다.

값의 스택을 $1 \times 1 \times n_c$로 확장하는 대신 저는 이렇게 생긴 이 분홍색 필터를 계속해서 사용하겠습니다. $n_c$가 훨씬 더 크더라도, 도표 몇 개를 더 단순하게 만들기 위해 필터가 세 개밖에 없는 것처럼 그릴 것입니다.

그리고 이건 어떤 차원이든 출력를 얻을 수 있는데요. 예를들어 $4 \times 4 \times 8$과, 이런 경우 어떠한 $n_c'$의 값을 곱한거죠.

---

여러분은 depthwise separable 컨볼루션에 대해 배우셨고 이는 두 가지 주요 단계를 포함하는데, 그것은 depthwise 컨볼루션과 바로 pointwise 컨볼루션 입니다.

이 연산은 일반 컨볼루션 연산과 동일한 입력과 출력 차원를 갖도록 설계할 수 있지만 훨씬 낮은 계산 비용으로 수행할 수 있습니다. 다음으로는 이 빌딩 블럭을 가지고, 그리고 이를 사용하여 MobileNet을 구축 하겠습니다.
