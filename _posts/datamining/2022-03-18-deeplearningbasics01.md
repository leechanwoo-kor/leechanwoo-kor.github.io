---
title: "[Data Mining] 딥러닝의 기초 - 퍼셉트론, 인공신경망"
categories:
  - Data Mining
tags:
  - Data Mining
  - Artificial Neural Network
  - ANN
  - Perceptron
toc: true
toc_sticky: true
toc_label: "딥러닝의 기초 - 퍼셉트론, 인공신경망"
toc_icon: "sticky-note"
---

# 딥러닝의 기초 - 퍼셉트론, 인공신경망

## 표기 방식

![image](https://user-images.githubusercontent.com/55765292/158920694-6ffbeb33-e222-45b5-80da-ad427e26f5d4.png){: .align-center}

## 퍼셉트론

### Frank Rosenblatt(1957)

![image](https://user-images.githubusercontent.com/55765292/158921491-5af453dc-9fe5-4e30-83cf-579fc64cc2bc.png){: .align-center}

**참고 - 활성함수**

![image](https://user-images.githubusercontent.com/55765292/158920799-6fe517b8-2a55-4d71-843f-305ed3297363.png){: .align-center}

### 퍼셉트론의 한계

![image](https://user-images.githubusercontent.com/55765292/158920877-7d44dd84-e1f5-4c1d-92b4-fa9b255fac1b.png){: .align-center}

### 다층퍼셉트론

- 퍼셉트론의 선형분류기를 비선형분류기로
  - 다수의 인공신경세포(노드, Node)로 구성된 층(Layer)으로 구분
  - 입력층, 은닉층(Hidden Layer), 출력층으로 구성

![image](https://user-images.githubusercontent.com/55765292/158921603-f9aada22-eb5c-4b56-a8b0-5e1d9e6d4e26.png){: .align-center}

### 은닉층의 역할

- 도메인을 선형분류 가능하도록 변화시킴

![image](https://user-images.githubusercontent.com/55765292/158921635-64d885fc-1360-46ec-b3cc-f614fef711cb.png){: .align-center}

## 수식으로 표현하는 다층퍼셉트론

### 가중치의 표현

![image](https://user-images.githubusercontent.com/55765292/158921017-a4a6c4cf-8382-4038-af98-77e8397b318c.png){: .align-center}

### 인공신경세포의 표현

![image](https://user-images.githubusercontent.com/55765292/158921047-8728875f-9775-49e2-ab5a-474b4bc06ea7.png){: .align-center}

### 은닉층의 인공신경세포(노드)의 값 계산

![image](https://user-images.githubusercontent.com/55765292/158921105-e29e8569-9b12-4904-8f08-7f0bbb3d6cfb.png){: .align-center}

### 다층퍼셉트론의 출력층 노드의 계산

![image](https://user-images.githubusercontent.com/55765292/158921131-ab1190bd-c04e-43e5-abfc-49e80d3832e3.png){: .align-center}

### 입력층 → 은닉층의 행렬-벡터 표현

![image](https://user-images.githubusercontent.com/55765292/158921345-4680d961-31b6-434b-a9d6-ba62006ef423.png){: .align-center}

### 입력층 → 출력층의 행렬-벡터 표현(앞먹임, Feed-forward or forward pass)

![image](https://user-images.githubusercontent.com/55765292/158921425-d8b01e82-341b-437e-be55-9aaef0b2ab89.png){: .align-center}


## 다층퍼셉트론과 행렬곱

- 지금까지의 수식은 하나의 데이터에 대한 결과
- 다층퍼셉트론의 입력층 → 출력층의 계산은 데이터에 대해 **"독립"**
  - 데이터 간의 의존성이 없기 때문에 동시에 계산 가능
- 입력값-출력값의 데이터가 100개 있다고 가정할 때

![image](https://user-images.githubusercontent.com/55765292/158921747-0e9ecabd-f472-45df-953a-41cd5723e001.png){: .align-center}

- 입력층 → 은닉층의 계산의 변화

![image](https://user-images.githubusercontent.com/55765292/158921797-d349dbbb-6c1b-4dbd-b37b-5014b058051d.png){: .align-center}

---

**[참고] 행렬곱이 왜 중요한가?**

- 많은 계산을 요구하는 O(n^3) 알고리즘
  - 4만 x 4만 행렬곱에 필요한 메모리는 약 12GB

![image](https://user-images.githubusercontent.com/55765292/158921916-1cd21e21-4d02-4af4-a16f-42bc513c17d0.png){: .align-center}

- 행렬곱은 계산자원(CPU, GPU, FPGA, AP, ...)을 가장 잘 활용할 수 있는 알고리즘

![image](https://user-images.githubusercontent.com/55765292/158921997-88f11564-a051-4fcd-a139-0d8351e188d2.png){: .align-center}


