---
title: "[Artificial Intelligence] 결정트리(ID3)"
categories:
  - Artificial Intelligence
tags:
  - ID3
toc: true
toc_sticky: true
toc_label: "Bayesian Networks"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Perceptron Learning Algorithm

- 1960년대 최초의 신경망 학습 모델
- 단순 ,제한적(단층모델)
- 다층모델과 기본 개념은 유사함. 좋은 학습 도구
- 현재도 많이 응용됨

## Neural Network

- Nodes(units) connected by links
- Link has a numeric weight
- Input function
  - $net_i = \sum_jw_{ij}x_j$
- Activation function
  - $g(net_i)$
- Output(activation)
  - $out_i = g(net_i)$

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235632107-5a2c19a7-6efe-4e17-b9f7-76304df2be0a.png">

<br>

### Activation Functions

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235632610-1e1176ef-9190-4831-89fa-addc090ae73f.png">


### Perceptron Node – Threshold Logic Unit(Step function)

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235633587-6bfa1952-2cdb-481f-bb86-e8efa36546db.png">

### Two Input Case

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235633664-7f2f0822-9a93-45ee-9e5f-011c48287c06.png">

- $y=hardlim(x)$
  - $y=1, x\geqq0$
  - $y=0, x<0$

### Equivalent perceptiron

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235634174-ed985737-6eea-4d21-a123-8b5471c5df5d.png">

- $out=hardlim(\vec{x} \dot \vec{w})$

### Two Input case

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235635557-6b12214e-9d5b-4f74-a6e3-223c9e1f210c.png">

### Desicion boundary (결정 경계)

- $W^TX-\theta = 0$, $W \dot X = \theta$
  - 결정경계의 모든 점들은 가중치 벡터와 동일한 내적 ($\theta$)을 가짐
- 따라서 경계의 모든 점은 가중치 벡터에 동일한 투영을 가짐. 가중치 벡터에 수직인 직선에 놓임.

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235635934-217a0b3d-8a55-4e51-9fb7-dc015d988854.png">

<br>

- 가중치 벡터는 결정경계에 직교함
- 가중치 벡터는 1을 출력하는 영역 방향을 가르킴
  - 만약 w가 반대방향을 가르키면, 모든 입력벡터와의 내적은 반대부호를 가짐-반대 라벨을 갖는 동일한 분류결과
- 임계치($\theta$)는 경계의 위치를 결정함
  - solve for $W^TX-\theta = 0$ to find the decision boundary

- **즉, 기울기는 가중치이고 절편은 결정경계에 의해서 결정**

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235638244-9f92eccf-1f6f-4401-b457-8a0b8d4e31b7.png">

<br>

# Perceptron Learning Algorithm : Example

- 목적함수가 최대가 되도록 가중치 학습
- 어떤 목적함수를 사용할 것인가?
- 어떤 학습 알고리즘을 사용할 것인가?

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235638494-5a9d48f6-022a-4d86-a546-47723cdc0827.png">

<br>

## First Training Instance

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235638760-3afb60e7-cd26-42b5-aa08-7e5ef6addce9.png">

<br>

## Second Training Instance

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235639068-79155b56-6754-41eb-b49e-71da04d20a45.png">

<br>

# Perceptron Learning Rule

- **$\Delta{w_i} = c(t – z)x_i$**
- $w_i$ 는 입력 $i$ 에서 퍼셉트론 노드로 가중치, $c$는 학습률, $t$는 현재 예의 타겟값, $z$는현재 출력, $x_i$ 는 입력
- Least perturbation principle
  - 에러가 있을 때만 가중치 수정
  - 현재 패턴을 올바로 분류하기 위한 큰 학습률이 아닌 적은 학습률 $c$를 사용
  - $x_i$ 로 스케일
- n 개 입력노드를 갖는 퍼셉트론 생성
- 훈련집합의 각 패턴에 대하여 퍼셉트론 학습규칙을 적용
- 전체 훈련집합에 대한 반복을 한 epoch이라고 함
- 전체 훈련집합 에러가 감소할 때까지 학습을 반복
- **퍼셉트론 수렴정리**: 만약 해가 있다면, 유한 시간 내에 해(가중치)를 발견

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235640186-5f127c46-efce-47d4-bce2-261c047ecb00.png">

<br>

## Augmented Pattern Vectors

- 1 0 1 -> 0
- 1 0 0 -> 1

Augmented Version
- 1 0 1 1 -> 0
- 1 0 1 1 -> 1
  - 임계치를 다른 가중치처럼 취급. 출력을 위,아래로 bias를 줌으로 bias로 부르기도 함

<br>

## Perceptron Rule Example

- 3개 입력과 bias 를 가정(net 가 0보다 크면 출력은 1, 아니면 0)
- 모든 초기 가중치를 0, 학습률을 1 로 가정: $\Delta w_i = c(t – z) x_i$
- Training set
  - 0 0 1 -> 0
  - 1 1 1 -> 1
  - 1 0 1 -> 1
  - 0 1 1 -> 0

|Pattern|Target|Weight Vector|Net|Output|$\Delta W_i = c(t-z)x_i$|
|---|---|---|---|---|---|
|0 0 1 1|0|0 0 0 0|0|0|0 0 0 0|
|1 1 1 1|1|0 0 0 0|0|0|1 1 1 1|
|1 0 1 1|1|1 1 1 1|3|1|0 0 0 0|
|0 1 1 1|0|1 1 1 1|3|1|0 -1 -1 -1|
|one epoch||||||
|0 0 1 1|0|1 0 0 0|0|0|0 0 0 0|
...

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235643423-888dc346-2f30-4a0f-8989-00a90ee5595e.png">

<br>

# Linear Separability

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235643495-66e16c1b-eedc-427d-9fae-d2cd5080efa6.png">

<br>

## Limited Functionality of Hyperplane

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235643729-c1dee58e-65da-4126-ad81-b02b9e16522a.png">

<br>

## Perceptron Limitations

- 단층 퍼셉트론은 선형분리가능한 문제만 학습가능
- AND 함수는 선형분리가능, XOR함수는 불가능.

<br>

- Perceptrons ( in this context of limitations, they refer to single layer perceptrons) can learn many Boolean functions:
  - AND, OR, NAND, NOR, but not XOR

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235644001-88229a75-b5a5-4932-bd90-31869fb08e8e.png">

- 구현해보기(시험에 나옴)

<br>

### Linear Separability

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235644249-203e5d5b-e9ac-4a93-a72e-9297925f094b.png">

<br>

### Perceptron Limitations

- Linearly Inseparable Problems

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235644510-2e3fa6c3-1948-490f-9e03-02b172c52ccc.png">

- Multi-layer perceptron can solve these problems

<br>

# How to Handle Multi-Class Output

- 이진 분류를 위한 학습모델(퍼셉트론, SVM)등의 주제
- 각 출력 클래스에 대해 한 개의 퍼셉트론 생성, 훈련집합에서 모든 다른 클래스들을 음의 예제로 간주
  - 모든 퍼셉트론에 대해 입력 데이터를 가하여 1의 출력 값을 갖는 클래스로 결정
  - 만약 여러 출력이 동시에 1이면, net 가 최대인 퍼셉트론 선택
  - point to class (among all $g_j(x) > 0$) to whose hyperplane the point is most distant. (ref. Alpaydin)
  - Cf. softmax with logistic regression

<br>

## UC Irvine Machine Learning Data Base Iris Data Set

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235644703-1f79a663-64f8-4db6-83b8-230230e33a5a.png">

<br>

## Objective Functions: Accuracy/Error

- 특정 퍼셉트론 모델(즉,특정 가중치를 갖는 퍼셉트론) 의 성능 평가
- 데이터 셋에 대한 모델의 정확도 측정
  - *Classification accuracy* = # Correct/Total instances
  - *Classification error* = # Misclassified/Total instances (= 1 – acc)
- 일반적으로 손실함수(aka 경비,에러)를 최소화함
- 실수값을 갖는 출력과 타켓
  - Pattern error = Target – output
    - 일반적인 방식 제곱오차 = $\sum(t_i – z_i)^2$ (L2 loss)
    - 에러의 상쇄방지: $\sum |t_i – z_i|$ (L1 loss)
  - 전체 제곱오차의 합(SSE) = $\sum \sum (t_i – z_i)^2$

<br>

## Mean Squared Error

- 평균제곱오차(MSE)- SSE/n : n은 데이터 집합의 예의 개수
  - 크기가 다른 데이터집합의 오차를 정규화
  - MSE 는 패턴당 평균 제곱오차
- Root Mean Squared Error (RMSE) –MSE 의 제곱근
  - 오차의 단위를 원래값으로 복원
    - SSE 왜냐하면 SSE 는 오차를 제곱
  - RMSE는 출력과 타겟과의 평균거리(오차)

<br>

## Gradient Descent Learning: Minimize (Maximize) the Objective Function

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235645716-8ad85c22-1b7d-4b20-aed9-1d2c03d67d98.png">

<br>

## Deriving a Gradient Descent Learning Algorithm

<br>

- 목표는 전체 오차(혹은 다른 목적함수)를 줄이도록 매 반복마다 가중치 수정
- 전체 제곱오차의 합(가능한 목적함수)
  - $E : \sum (t_i – z_i)^2$
- $\frac{fE}{w_{ij}}$ 의 반대방향으로 가중치 수정하는 알고리즘
- 수식이 구해지면 gradient descent learning algorithm(경사하강법) 적용가능

### Batch vs Stochastic Update

- 그래디언트를 구하려면 훈련집합 전체에 대하여 에러를 합하고, 각 epoch 의 마지막에서만 가중치를 수정해야 함
- Batch (gradient) vs stochastic (on-line, incremental)
  - stochastic algorithm에서는 각 입력 패턴마다 가중치를 수정함(이때는 참 그래디언트를 따른 수정은 아님
  - Stochastic 는 대부분 좀더 효율적이며, 사용에 적합Backpropagation 알고리즘에서 다시 다룸

<br>

(참고) Linear Models which are Non-Linear in the Input Space
- 현재까지는 를 사용함
- 입력을 비선형방식으로 전처리 한 후 퍼셉트론에 연결
- 퍼셉트론의 학습 알고리즘을 그대로 사용, 입력만 다름 - SVM
- 예를 들면, 두 개의 입력 x,y ( 그리고 bias) 문제에 대해, 입력 x2,y2, x·y 을 추가함
- 퍼셉트론은 5차원 과제로 생각하며, 이 5차원에서 선형문제로간주함
- 이때 원래의 2-d 입력 공간에서의 결정경계면은?

<br>

## Quadric (2차) Machine

- All quadratic surfaces (2nd order)
- ellipsoid
- parabola
- etc.
- 해결 가능한 문제가 급격히 증가
- 여전히 많은 문제들이 quadrically separable 하지 못함
- 3차원 혹은 고차원 특징들을 사용할 수 있으나, 가능한 특징의 개수는 지수적으로 증가.다층신경망은 입력공간으로부터 고차원 특징을 자동으로 발견하도록 함

### Simple Quadric Example

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235646418-892b28c4-7d04-48c9-970e-9fcabb64d055.png">

- 퍼셉트론은 f1 만을 이용해 데이터를 분리 할 수 없음.
- 퍼셉트론에 다른 특징을 추가할 수 있는가?

<br>

- f_2 = f_1^2

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/235646560-1fd1bbfc-da3b-477c-840a-fec806315db7.png">

<br>

- 퍼셉트론은 f1 만을 이용해 데이터를 분리 할 수 없음.
- 퍼셉트론에 f_2 = f_1^2 특징을 추가
- 단지 특징만을 사용하면서, 데이터를 분리하기 위해 이차원 결정경계면을 구현한 것으로 생각할 수 있음




