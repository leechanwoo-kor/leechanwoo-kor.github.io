---
title: "[Artificial Intelligence] 다층 퍼셉트론(Multi-Layer Perceptiron, MLP)"
categories:
  - Artificial Intelligence
tags:
  - Multi-Layer Perceptiron
  - MLP
toc: true
toc_sticky: true
toc_label: "다층 퍼셉트론(Multi-Layer Perceptiron, MLP)"
toc_icon: "sticky-note"
---

# Multi-Layer Perceptiron, MLP

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237057845-8ac3bb01-96bd-4534-b3bc-89f3e66dc8bf.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237058048-42bf5672-3628-48f3-8a15-430e10ebce7d.png">

<br>

- MLP and backpropagation algorithm which is used to train it
- MLP used to describe any general feedforward (no recurrent connections) network

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237058979-4e59748a-2985-4689-b987-6776b2ede4d3.png">

- 3 layer (no. of layers of adaptive weights), 3층 신경망
- 1st question:
  - 은닉층의 역할?
    - 특징추출기
  - 단층 신경망의 문제점?

<br>

## XOR problem

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237060353-2c54d785-e388-43c0-9b60-3cdddd6875e9.png">

- XOR (exclusive OR) problem
  - 0+0=0
  - 1+1=2=0 mod 2
  - 1+0=1
  - 0+1=1
- Perceptron does not work here
- Single layer generates a linear decision boundary

<br>

- Minsky & Papert (1969) offered solution to XOR problem by combining perceptron unit responses using a second layer of units

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237060588-5d222c35-3f7b-49db-b55d-333fcfc517e4.png">

- $out = hard lim(w_1 x_1 + w_2 x_2 - \theta)$

<br>

## Three Layer Networks

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237062453-122e32c5-0c69-4bcc-9a5b-0ff2a5a6d597.png">

<br>

## Properties of architecture

- 층내에서 연결이 없음
- 입력층과 출력층의 직접연결이 없음
- 인접층간에는 완전연결
- 출력 unit개수, 입력 unit 개수
- 은닉층의 유닛의 개수는 입력유닛 혹은 출력 유닛의 개수보다 작거나, 많을수 있다. 

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237062944-6252bf04-c682-49d2-a755-c151bf0545fb.png">

<br>

## Decision Boundary

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/237063010-653abad5-076f-46b8-852b-014ce3c51596.png">

- 2층은 지역적 지식을 추출하고, 3층은 전역적인 지식을 추출
- 은닉층에 sigmoidal 구동함수를 사용하면, 2층 신경망은 어떤 함수라도 근사화 할 수 있음. : Universal Approximation

<br>

# Backpropagation Learning 

- 단층 퍼셉트론에서 가중치를 찾기 위해, 손실함수를 경사하강법을 적용 :
  - $\Delta w_{ji} = (t_j - y_j) x_i$
- 입력유닛 $i$ 에서 출력 유닛 $j$로의 가중치 ($w_{ji}$) 의 수정량은 입력과 $j$ 출력 유닛의 에러에만 의존하는 지역적 특성

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cb6948a6-6cb8-4c5b-b318-2f17a9416db7">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2596149a-df26-406e-aadd-47405690de82">

- 에러는 3째층에서만 계산됨. 첫째층과 2째층의 가중치는?
- 처음 2개층에는 직접적인 에러가 없음.

<br>

- Credit assignment problem
  - Problem of assigning ‘credit’ or ‘blame’ to individual elements involved in forming overall response of a learning system (hidden units)
  - In neural networks, problem relates to deciding which weights should be altered, by how much and in which direction

<br>

- 초기층의 가중치가 출력, 따라서 에러에 얼마나 기여하는지를 결정해야함
- 즉, 가중치 wij 가 에러에 어떤 영향을 끼치는지 구하고자 함. 다음 값을 구하고자 함.

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/213981d8-5bb3-4a08-a99e-8530eda3d282">

<br>

- Backpropagation learning algorithm ‘BP’
- Solution to credit assignment problem in MLP. Rumelhart, Hinton and Williams (1986)

- BP 는 두 단계:
  - 순방향 패스: 순방향으로 각 유닛의 입력값 계산, 출력 계산을 반복하여 최종 출력값 구함.
  - 역방향 패스: 출력 유닛의 에러신호를 계산한후 역방향으로 에러를 전파함. (에러는 실제값과 목표치와의 차이)

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cd3dbe2c-853d-4cfd-a46b-a4ac9b27b83c">

<br>

- 2층으로 설명함. 쉽게 다층으로 확장 가능함.

- $z_i(t) = g( \sum_j v_{ij}(t) x_j(t) )$ at time t
  - $= g ( u_i(t) )$
- $y_i (t) = g( \sum_j w_{ij}(t)z_j(t) )$ at time t
  - $= g ( a_i(t) )$
- a/u activation(total 입력)
- g 구동함수(activation function)
- 바이어스는 추가 가중치로 둠

## Forward pass

- Weights are fixed during forward and backward pass at time t

<img width="612" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3a0a840f-fe2e-422c-a9cb-df24744db337">

<br>

<img width="205" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/88bd6623-5efa-49ea-a6fe-4d2d59a33962">

<br>

## Backward Pass

Will use a sum of squares error measure. For each training pattern we have:

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5e7cd7be-127d-49c7-9ed1-16ecc13199ad">

<br>

where dk
is the target value for dimension k. We want to know how to modify weights in order to decrease E. **Use gradient descent** ie

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0562782b-ee56-467f-926a-90caa085806f">

<br>

**both for hidden units and output units**

<br>

- The partial derivative can be rewritten as product of two terms using chain rule for partial differentiation

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a2f0c134-7438-44b5-b135-efd25eb8def5">

**both for hidden units and output units**

- Term A
  - i 유닛의 전체입력 변화에 따라 에러가 어떻게 변하는가? $\Delta i$
- Term B
  - 가중치 w 의 변화에 따라 i 유닛의 입력은 어떻게 변하는가? $z_j$

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c969982d-9c19-4cc8-aa47-fa421f5d0dfb">

<br>

# Activation Functions

- How does the activation function affect the changes?

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b242d6fc-302f-4d36-bf80-907b1ab969a9">

- we need to compute the derivative of activation function g
- to find derivative the activation function must be smooth (differentiable)

<br>

- Sigmoidal (logistic) function-common in MLP

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aea1c4c1-b446-40c5-9c16-85626cabf5d5">

<br>

- Derivative of sigmoidal function is

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/14d63025-096c-4023-b36d-8565bd64d79c">

- Derivative of sigmoidal function has max at 𝑎𝑖(𝑡)= 0, is symmetric about this point falling to zero as sigmoid approaches extreme values

<br>

- 가중치의 수정값은 구동함수의 미분에 비례함.

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/32a7eb28-dde4-4de6-9534-adf91ed7e48e">

- 가중치 수정은 유닛의 전체입력이 중간값(0부근)일 때 가장 크게 발생. 입력이 아주 크거나,아주 작을 때에는 수정치는 거의 0임. 유닛이 포화상태. …다층일 때 그래디언트 소멸(gradient vanish)문제

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c1f198a6-14e5-4672-825c-bfc79d9e00a5">

<br>

# Batch Learning, Online learning

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3d2b8a63-1b10-440b-ad57-930ab51b9903">

- Batch learning :
  - 각 훈련데이터에 대한 계산된 가중치 수정치를 누적함
  - 전체 훈련데이터에 대해 누적된 값을 한번에 수정함- –epoch
  - 수정 횟수 적음
- Online learning :
  - 가중치를 각 훈련데이터마다 수정함
  - 소요 메모리 공간 적음
  - 학습률은 작은 값으로 둠
  - 데이터는 랜덤한 순서로 입력함 - stochastic gradient descent
  - 랜덤순서…지역적 최소값을 회피하는데 도움

<br>

# Activation function of output unit

<img width="677" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8bc4cb35-1e0e-434f-aba6-bcac58142699">

<br>

# Learning Example

- Once weight changes are computed for all units, weights are updated at the same time (bias included as weights here). An example:

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/602a2d06-3aef-4bb0-b3be-92f7c73783ae">

<br>

- Use identity activation function (ie g(a) = a)

<br>

- All biases set to 1. Will not draw them for clarity.
- Learning rate  = 0.1

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/82fb7ff4-7d60-4db3-8cf6-28ba9b3d7e73">

Have input [0 1] with target [1 0]. 

<br>
