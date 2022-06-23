---
title: "[Ⅰ. Neural Networks and Deep Learning] Shallow Neural Networks (3)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Shallow Neural Networks (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Shallow Neural Networks

### Vectorizing Across Multiple Examples
지난 포스팅에서는 단일 훈련 예제를 사용하여 신경망에서 예측을 계산하는 방법을 살펴보았습니다. 이번에는 여러 훈련 예제에서 벡터화하는 방법을 볼 수 있습니다. 로지스틱 회귀에서 본 결과와 매우 비슷할 텐데요.

따라서 행렬의 다른 열에 서로 다른 훈련 예제를 쌓으면 이전 영상에서 얻은 방정식을 사용할 수 있습니다. 이전 방정식을 살짝 변형시켜 신경망이 거의 동시에 모든 예제의 출력을 계산하도록 변경하십시오.

그럼 그 방법에 대해 자세히 알아보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175244375-cd9d3608-0507-4ab9-9996-7cd73d9c405c.png)
먼저 이전 포스팅에서 다룬 4개의 방정식이 있습니다. 또한 입력 특성을 $x$로 되돌리면 단일 훈련 예제의 $a^{[2]} = \hat{y}$를 생성하는 데 사용할 수 있습니다.

이제 $m$ 훈련 예제가 있다면 첫 번째 훈련 예제를 위해 이 과정을 반복해야 합니다. $x^{(1)}$는 $\hat{y}^{(1)}$을 계산하기 위해 첫 번째 훈련 예제에 대한 예측을 수행합니다.

그런 다음 $x^{(2)}$를 사용하여 $\hat{y}^{(2)}$를 생성합니다. 그리고 $\hat{y}^{(m)}$를 생성하기 위해 $x^{(m)}$까지 내려갑니다.

이 모든 활성화 함수 표기법에서도 이것을 $a^{[2](1)}$, $a^{[2](2)}$ 그리고 $a^{[2](m)}$로 표기합니다. 그래서 이 표기법은 $a^{[2](i)}$입니다. (i)는 훈련 예제 i를 나타내고 [2]는 레이어 2를 나타냅니다. 이것이 대괄호와 소괄호 인덱스가 작동하는 방식입니다.

따라서 벡터화되지 않은 구현이 있고 모든 훈련 예제의 예측을 계산하려면 i = 1에서 m까지 해야 합니다. 그럼 기본적으로 4가지 방정식을 구현하는 겁니다. 기본적으로 훈련 예제에 의존하는 모든 변수에 윗첨자 소괄호 i를 추가하여 위의 4개의 방정식을 나타냅니다. 따라서 m 훈련예제의 모든 출력을 계산하려면 $x$에 윗첨자 소괄호 $i$를 추가하면 $z$와 $a$가 됩니다.

우리가 하고 싶은 것은 이것을 없애기 위해 이 전체 계산을 벡터화하는 것입니다. 핵심적인 선형대수학을 많이 배운 것 같다면 이것을 정확하게 구현할 수 있는 것이 딥러닝 시대에는 매우 중요하다는 것이 밝혀졌습니다.

그리고 실제로 이 과정에서 표기법을 매우 시중하게 선택했으며 이 벡터화 단계를 최대한 쉽게 만들었습니다. 따라서 이 핵심적인 내용을 통해 알고리즘의 올바른 구현을 보다 신속하게 실현할 수 있기를 바랍니다. 이 코드 블록 전체를 다음 그림과 이걸 어떻게 벡터화하는지 알아보도록 하죠.


![image](https://user-images.githubusercontent.com/55765292/175244566-1f1190e2-5b42-4116-8b4f-ff4b9b9f79b1.png)


























