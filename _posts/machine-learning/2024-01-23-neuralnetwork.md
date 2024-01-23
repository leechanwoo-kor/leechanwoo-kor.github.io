---
title: "[AI] ANN, DNN, CNN, RNN의 개념과 차이"
categories:
  - AI
tags:
  - ANN
  - DNN
  - CNN
  - RNN
toc: true
toc_sticky: true
toc_label: "ANN, DNN, CNN, RNN의 개념과 차이"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/28bd941f-8adf-4b5a-8389-5f52890bd627">
</p>

# 인공지능, 머신러닝, 딥러닝

**인공지능**(Artificial Intelligence)는 인간의 지능이 갖고 있는 기능을 갖춘 컴퓨터 시스템을 뜻하며, 인간의 지능을 기계 등에 인공적으로 구현한 것을 말합니다.

**머신러닝**(Machine Learning) 혹은 기계학습은 인공지능의 한 분야로, 컴퓨터가 학습할 수 있도록 하는 알고리즘과 기술을 개발하는 분야를 뜻합니다.

**딥러닝**(Deep Learning)은 여러 비선형 변환기법의 조합을 통해 높은 수준의 추상화(다량의 복잡한 자료들에서 핵심적인 내용만 추려내는 작업)을 시도하는 기계학습 알고리즘의 집합으로 뜻합니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0dd48b02-3fea-4ace-b4ea-04977a72305b"><br>
  <em>인공지능 & 머신러닝 & 딥러닝</em>
</p>

따라서 위의 그림처럼 가장 포괄적인 인공지능 분야 안에 머신러닝이 속하고 있고, 머신러닝 분야 속에는 딥러닝 분야가 속해있다고 볼 수 있겠습니다.

<br>

# ANN, DNN, CNN, RNN

## ANN(Artificial Neural Network)

위에서 설명한 머신러닝의 한 분야인 딥러닝은 **인공신경망**(Artificial Neural Network)를 기초로 하고 있는데요. 인공신경망이라고 불리는 ANN은 사람의 신경망 원리와 구조를 모방하여 만든 기계학습 알고리즘 입니다.

인간의 뇌에서 뉴런들이 어떤 신호, 자극 등을 받고, 그 자극이 어떠한 임계값(threshold)을 넘어서면 결과 신호를 전달하는 과정에서 착안한 것입니다. 여기서 들어온 자극, 신호는 인공신경망에서 Input Data이며 임계값은 가중치(weight), 자극에 의해 어떤 행동을 하는 것은 Output데이터에 비교하면 됩니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/18d4fe8d-d8c8-44f8-b0aa-25cb928c26e1"><br>
  <em>ANN 인공신경망</em>
</p>

<br>

인공신경망은 시냅스의 결합으로 네트워크를 형성한 인공뉴런(노드)이 학습을 통해 시냅스의 결합 세기를 변화시켜, 문제 해결 능력을 가지는 모델 전반을 가리킨다. (출처 : 위키백과)

쉽게 설명하자면,

신경망은 다수의 입력 데이터를 받는 입력층(Input), 데이터의 출력을 담당하는 출력층(Output), 입력층과 출력층 사이에 존재하는 레이어들(은닉층)이 존재합니다. 여기서 히든 레이어들의 갯수와 노드의 개수를 구성하는 것을 모델을 구성한다고 하는데, 이 모델을 잘 구성하여 원하는 Output값을 잘 예측하는 것이 우리가 해야할 일인 것입니다. 은닉층에서는 활성화함수를 사용하여 최적의 Weight와 Bias를 찾아내는 역할을 합니다.

<br>

### ANN의 문제점

- **학습과정에서 파라미터의 최적값을 찾기 어렵다.**
  - 출력값을 결정하는 활성화함수의 사용은 기울기 값에 의해 weight가 결정되었는데 이런 gradient값이 뒤로 갈수록 점점 작아져 0에 수렴하는 오류를 낳기도 하고 부분적인 에러를 최저 에러로 인식하여 더이상 학습을 하지 않는 경우도 있습니다.
- **Overfitting에 따른 문제**
- **학습시간이 너무 느리다.**
  - 은닉층이 많으면 학습하는데에 정확도가 올라가지만 그만큼 연산량이 기하 급수적으로 늘어나게 됩니다.

하지만 이는 점점 해결되고 있습니다. 느린 학습시간은 그래픽카드의 발전으로 많은 연산량도 감당할 수 있을 정도로 하드웨어의 성능이 좋아졌고, 오버피팅문제는 사전훈련을 통해 방지할 수 있게 되었습니다.

<br>

## DNN(Depp Neural Network)

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3c675f58-9768-40df-816a-0e0355dc4efb"><br>
  <em>NN vs DNN</em>
</p>

<br>

ANN기법의 여러문제가 해결되면서 모델 내 은닉층을 많이 늘려서 학습의 결과를 향상시키는 방법이 등장하였고 이를 DNN(Deep Neural Network)라고 합니다. DNN은 은닉층을 2개이상 지닌 학습 방법을 뜻합니다. 컴퓨터가 스스로 분류레이블을 만들어 내고 공간을 왜곡하고 데이터를 구분짓는 과정을 반복하여 최적의 구번선을 도출해냅니다. 많은 데이터와 반복학습, 사전학습과 오류역전파 기법을 통해 현재 널리 사용되고 있습니다.

그리고, DNN을 응용한 알고리즘이 바로 CNN, RNN인 것이고 이 외에도 LSTM, GRU 등이 있습니다.

<br>

## CNN(합성곱신경망 : Convolution Neural Network)

기존의 방식은 데이터에서 지식을 추출해 학습이 이루어졌지만, CNN은 데이터의 특징을 추출하여 특징들의 패턴을 파악하는 구조입니다. 이 CNN 알고리즘은 Convolution과정과 Pooling과정을 통해 진행됩니다. Convolution Layer와 Pooling Layer를 복합적으로 구성하여 알고리즘을 만듭니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/842e3f3f-c692-4657-8e84-f42625a09d08"><br>
  <em>CNN</em>
</p>

<br>

### Convolution

데이터의 특징을 추출하는 과정으로 데이터에 각 성분의 인접 성분들을 조사해 특징을 파악하고 파악한 특징을 한장으로 도출시키는 과정이다. 여기서 도출된 장을 Convolution Layer라고 한다. 이 과정은 하나의 압축 과정이며 파라미터의갯수를 효과적으로 줄여주는 역할을 합니다.

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a04b63c9-b483-4992-8aac-26e0d08346a1"><br>
  <em>CNN - convolution</em>
</p>

<br>

### Pooling

이는 Convolution 과정을 거친 레이어의 사이즈를 줄여주는 과정입니다. 단순히 데이터의 사이즈를 줄여주고, 노이즈를 상쇄시키고 미세한 부분에서 일관적인 특징을 제공합니다.
 
CNN은 보통 정보추출, 문장분류, 얼굴인식 등의 분야에서 널리 사용되고 있습니다.

<br>

## RNN(순환신경망 : Recurrent Neural Network)

<br>

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/51179f9a-363c-4f06-9ffb-baef89933aed"><br>
  <em>RNN</em>
</p>

<br>

RNN 알고리즘은 반복적이고 순차적인 데이터(Sequential data)학습에 특화된 인공신경망의 한 종류로써 내부의 순환구조가 들어있다는 특징을 가지고 있습니다. 순환구조를 이용하여 과거의 학습을 Weight를 통해 현재 학습에 반영합니다.

기존의 지속적이고 반복적이며 순차적인 데이터학습의 한계를 해결한 알고리즘 입니다. 현재의 학습과 과거의 학습의 연결을 가능하게 하고 시간에 종속된다는 특징도 가지고 있습니다. 음성 웨이브폼을 파악하거나, 텍스트의 앞 뒤 성분을 파악할 때 주로 사용됩니다.
