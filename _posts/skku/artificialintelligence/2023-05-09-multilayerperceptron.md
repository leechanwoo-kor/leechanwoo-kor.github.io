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
- Learning rate $\eta$ = 0.1

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/82fb7ff4-7d60-4db3-8cf6-28ba9b3d7e73">

Have input [0 1] with target [1 0]. 

<br>

- Forward pass. Calculate $1^{st}$ layer activations:

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fd5b5b92-3362-4cb4-9284-6242a104c4eb">

- $u_1 = -1 \times 0 + 0 \times 1 + 1 = 1$
- $u_2 = 0 \times 0 + 1 \times 1 + 1 = 2$

<br>

- Calculate first layer outputs by passing activations thru activation functions

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c8a0d84b-6887-44c2-93b2-a7cf19092d52">

- $z_1 = g(u_1) = 1$
- $z_2 = g(u_2) = 2$

<br>

- Calculate $2^{nd}$ layer outputs (weighted sum thru activation functions):

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/00a8d85b-3370-49d2-bf47-c063614c964a">

- $y_1 = a_1 = 1 \times 1 + 0 \times 2 + 1 = 2$
- $y_2 = a_2 = -1 \times 1 + 1 \times 2 + 1 = 2$

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/169fab27-830f-4f60-9027-1c311305dfc3">

- So
  - $\Delta_1 = (d_1 - y_1) = 1 – 2 = -1$
  - $\Delta_2 = (d_2 - y_2) = 0 – 2 = -2$

<br>

- Calculate weight changes for $1^{st}$ layer (cf perceptron learning):

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fad5188d-33c6-48d3-946f-7e041ba23a74">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a4770f37-092e-4e4c-8f55-1a420dcb5b9c">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c69a17df-3293-4e51-9bab-8e26af3205a0">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/125d70b2-3238-4e75-a02d-89b2535074fd">

- $\delta_1 = - 1 + 2 = 1$
- $\delta_2 = 0 – 2 = -2$

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/47c5e7c8-74b6-4d57-a05d-33284595b755">

<br>

Finally change weights:

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/26403f23-2092-417b-8067-79618db509f5">

- Note that the weights multiplied by the zero input are unchanged as they do not contribute to the error We have also changed biases (not shown)

<br>

- Now go forward again (would normally use a new input vector):

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8d13dab1-3081-4e4d-af17-ffff4c4e8f9f">

<br>

- Now go forward again (would normally use a new input vector):

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d03a084b-3323-4402-9c9e-d8b903859ffb">

- Outputs now closer to target value [1, 0]

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f1a2f172-f575-4ffb-9b0a-7c353767132d">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e7c48cad-f97f-40be-8267-13e6b8c72a13">

<br>

## Selecting initial weight values 

- Choice of initial weight values is important as this decides starting position in weight space. That is, how far away from global minimum
- Select weight values randomly from uniform probability distribution

<br>

## Momentum

- 수렴속도를 높이면서 불안정성을 줄이는 기법
- 가중치 갱신식에 이전 가중치 수정치의 비례값을 더함
- 수정된 가중치 갱신식

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d5741d07-60f7-4b0d-8c93-828f159d33bb">

<br>

- $\alpha$ is momentum constant and controls how much notice is taken of recent history

- Effect of momentum term
  - 가중치의 수정치가 이전 수정치와 같은 부호를 가지면, 관성항은 수정을 많이 하여 수렴속도를 높임.
  - 만약 수정치가 이전의 수정치와 반대부호를 가지면, 관성항은 수정치를 줄여서 속도를 늦추어 진동을 방지한다. (안정화)
  - 지역적 최소치를 회피하도록 도움

<br>

## Adaptive Learning Rate

- Learning rate $\eta$
  - mostly less than or equal to 0.2
  - can be made adaptive for faster convergence
  - kept large when learning takes place and decreased when learning slows down

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c4570d9b-392c-40c4-8c03-6aa461d5cb40">

<br>

## Overtraining

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7114d7d0-a2ff-4e84-8434-59b16294711f">

- where
  -  n = number of training patterns,
  -  m = number of output units

- Could stop training when rate of change of E is small, suggesting convergence

- However, aim is for new patterns to be classified correctly 

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b0e09844-dcd6-4205-9a6b-8f2fb2d3256e">

<br>

- Typically, though error on training set will decrease as training continues generalisation error (error on unseen data) hitts a minimum then increases (cf model complexity etc)
- Therefore want more complex stopping criterion

<br>

- Cross-validation
  - Method for evaluating generalisation performance of networks in order to determine which is best using of available data
- Hold-out method
  - Simplest method when data is not scare
- Divide available data into sets
  - Training data set
    - used to obtain weight and bias values during network training
  - Validation data
    - used to periodically test ability of network to generalize
    - > suggest ‘best’ network based on smallest error

- Cf . Test data

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6c935a90-5076-4d0e-ac2a-fcadec171c78">

<br>

## Weka

Choose classify-functions-multilayer perceptron
1. hidden layer 의 노드 수의 설정방법
popup 창의 choose 난의 multilayer perceptron을 클릭
hiddenLayers 에 은닉층의 노드수 입력
예 2,4 입력
: 1째 은닉층의 노드수 2개
2째 은닉층의 노드수 4개
2. choose 난의 multilayer perceptron을 클릭
popup 창의 GUI 난을 true 로 하면 MLP 구조가 보임

## MLP regressor (cpu performance)

## MLP classifier(iris)



