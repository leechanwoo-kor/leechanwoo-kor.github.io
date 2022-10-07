---
title: "[Ⅴ. Sequence Models] Transformer Network (1)"
categories:
  - Deep Learning Specialization
  - Transformer Network
tags:
  - Coursera
  - Deep Learning Specialization
  - Natural Language Processing
  - Attention Models
  - Transformer Network
  - Transformers
  - Self Attention
  - Multi Head Attention
toc: true
toc_sticky: true
toc_label: "Transformer Network (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/187809649-f4918caf-ae96-4f46-a0cf-42ba990450d9.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Transformer Network

## Transformers

### Transformer Network Intuition

딥 러닝에서 가장 흥미로운 발전 중 하나는 **트랜스포머 네트워크transformer network**입니다. 이는 NLP 세계를 완전히 장악한 아키텍쳐이죠. 그리고 오늘날 NLP에 대한 가장 효과적인 많은 알고리즘들은 트랜스포머 아키텍처를 기반으로 하죠.

이것은 상대적으로 복잡한 신경망 아키텍처이지만 조금씩 살펴볼 것입니다. 그래서 끝날 무렵 트랜스포머 네트워크 작동 방법에 대해 더 잘 알게 되고 문제없이 적용하게 될 것입니다.

<br/>

![image](https://user-images.githubusercontent.com/55765292/194481705-56cccaed-b737-4cbb-b142-4239d37ae40a.png)

시퀀스 작업의 복잡도가 증가함에 따라 모델의 복잡성도 증가합니다. **RNN**에서 **기울기 소멸vanishing gradients** 문제가 있어 **장거리 종속성long range dependencies**과 **시퀀스sequence**를 캡처하는데 어려움이 있다는 것을 발견했습니다.

그런 다음 **GRU**를, 그리고 **LSTM** 모델을 정보 플로우를 제어하기 위해 게이트를 사용하는 많은 문제들을 해결하는 방법으로 살펴보았습니다. 그래서 이들 각각의 단위는 몇 가지 더 많은 계산을 했죠.

이러한 직관들은 정보 플로우에 대한 제어를 개선시켰지만 복잡도 또한 증가시켰습니다. 그래서 RNN에서 GRU 그리고 LSTM으로 이동하면서 모델들은 더 복잡해 졌습니다.

그리고 이 모든 모델들은 여전히 **순차적sequential** 모델입니다. input을, input 문장을 한 번에 한 단어나 토큰을 소화했다는 점에서 말이죠. 그리고 각 단위가 마치 정보 플로우에 병목인 것 같았습니다. 왜냐하면, 예를 들어서 이 마지막 단위의 output을 계산하기 위해 먼저 이전에 오는 모든 단위의 output을 계산해야 하기 때문이죠.

트랜스포머 아키텍처를 배우고나면 전체 시퀀스에 대해 더 많은 계산을 병렬로 실행할 수 있게 합니다. 그래서 왼쪽에서 오른쪽으로 한 번에 한 단어씩 처리하는 대신 전체 문장을 동시에 소화할 수 있죠.

<br/>

트랜스포머 네트워크는 Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser 그리고 Illia Polosukhin가 작성한 논문 Attention Is All You Need로 발표되었습니다. 

- Attention + CNN

트랜스포머 아키텍처의 주요 혁신은 표현representation를 기반으로 한 어텐션attention의 사용과 CNN, 컨볼루션 신경망 스타일의 결합입니다.

![image](https://user-images.githubusercontent.com/55765292/194481771-85d5f09e-7464-489e-abd1-224e5feba169.png)

그래서 RNN은 한 번에 하나의 output을 처리하는데요. 그래서 $y^{<0>}$가 $y^{<1>}$을 계산하는데 제공되고 그리고 이것은 $y^{<2>}$를 계산하는데 사용되죠. 이는 토큰을 처리하는데 매우 순차적인 방법입니다. 그리고 이것을 CNN이나 많은 픽셀 단어들을 input 할 수 있는 신뢰도와 대조할 수 있습니다. 그리고 그것들에 대한 표현들을 병렬로 계산할 수 있습니다.

그래서 어텐션 네트워크에서 볼 수 있는 것은 매우 풍부하고 유용한 단어 표현을 계산하는 방법입니다. 하지만 CNN의 병렬 처리 스타일과 더 유사한 것으로 말이죠. 어텐션 네트워크를 이해하기 위해서 다음 두 개의 주요 아이디어가 있을 것입니다.

첫 번째는 **셀프 어텐션self attention**입니다. 셀프 어텐션의 목적은, 예를 들어, 만약 $A^{<1>}, A^{<2>}, A^{<3>}, A^{<4>}$ 그리고 $A^{<5>}$ 라는 5개의 단어로 된 문장이 있다면, 이 5개의 단어에 대한 5개의 표현을 계산하게 되는 것입니다. 그리고 이는 문장의 모든 단어들에 대한 표현을 병렬로 계산하는 방법을 기반으로 하는 어텐션이 될 것입니다.

그런 다음 **멀티 헤드 어텐션multi head attention**은 셀프 어텐션 처리의 루프에 대한 기본 A입니다. 따라서 이러한 표현들의 여러 버전이 나오게 되죠. 그리고 이러한 표현들은 매우 풍부한 표현들이 될 것이며 유효성을 위한 기계 번역이나 다른 NLP에도 사용될 수 있습니다.

이어서 이 풍부한 표현들을 계산하기 위해 셀프 어텐션을 보겠습니다. 그 후에, 멀티 헤드 어텐션에 대해 이야기 할 것입니다. 그리고 트랜스포머 네트워크에 대한 모든 것을 종합하여 전체 트랜스포머 아키텍처가 최종적으로 어떻게 작동하는지 이해할 수 있을 것입니다

<br/>

### Self-Attention

### Multi-Head Attention

### Transformers
