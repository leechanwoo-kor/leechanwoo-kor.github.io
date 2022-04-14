---
title: "[Data Mining] CNN"
categories:
  - Data Mining
tags:
  - Data Mining
  - CNN
toc: true
toc_sticky: true
toc_label: "CNN"
toc_icon: "sticky-note"
---

# Convolutional Neural Network

## 합성곱

### 합성곱의 수식
두 함수가 겹치는 영역을 적분한 합성함수

![image](https://user-images.githubusercontent.com/55765292/163291257-adb079fc-0d0a-4560-b605-3660a0d9f5f0.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/163291364-79826478-d001-4a2e-8cfc-c0d7a4236f80.png){: .align-center}

### 이미지에서의 합성곱
- 이미지를 변환하는 "필터"(Filter)의 의미를 가짐
- 이미지 처리에서 "커널"(Kernel)로도 활용

![image](https://user-images.githubusercontent.com/55765292/163291556-1fa1cb56-7fae-4ece-9873-e31e789195cf.png){: .align-center}

### 이미지에서의 합성곱의 과정

![image](https://user-images.githubusercontent.com/55765292/163291653-4151035f-a6ff-44dc-a7b8-4091d7ce3be9.png){: .align-center}

## 합성곱 층

### 합성곱 필터를 학습 가능한 매개 변수로
- 합성곱 필터는 주어진 임무를 반별하기 위한 매개변수로 학습됨

![image](https://user-images.githubusercontent.com/55765292/163291861-059574a4-dff4-4d01-a82c-3a9f125bbca4.png){: .align-center}

### 왜 합성곱을 사용하는가?
- 다층 퍼셉트론으로 이미지 인식을 하면 모수의 수가 이미지의 크기에 따라 증가
- 합성곱은 모수의 수를 공유 (Local Connectivity)

![image](https://user-images.githubusercontent.com/55765292/163291973-4a9e1008-a679-488f-aeec-cb76e7de1ccc.png){: .align-center}

### 합성곱의 적용
- 행렬(3D Volume)로 표현된 입력에 합성곱을 적용하는 방식은 별도의 초모수가 지정되지 않은 경우 원소 단위로 움직임

![image](https://user-images.githubusercontent.com/55765292/163292040-70fd8905-1c9e-4526-a8aa-489a9ead9f8e.png){: .align-center}

## 합성곱의 구성

### 패딩(P)
- 합성곱 필터가 입력 행렬을 벗어나는 경우를 방지, 양대각의 마지막 원소의 정보 손실 처리, 출력 행렬의 크기 조정을 위해 0을 추가

![image](https://user-images.githubusercontent.com/55765292/163292119-6a2effd9-e504-458d-8d81-2cef7d36ffa8.png){: .align-center}

### 스트라이드(S)
- 스트라이드는 합성곱 필터가 움직이는 단위를 결정

![image](https://user-images.githubusercontent.com/55765292/163292214-a3973457-a6ee-422e-b9f6-5d34aa9a9a9a.png){: .align-center}

## 합성곱 층의 적용
- *W* × *H* 크기의 합성곱이 *D*의 채널로 구성된 합성곱 필터가 *K*개 있는 경우

![image](https://user-images.githubusercontent.com/55765292/163292339-49b710f9-042c-4c92-8e86-95ceb9dfd1af.png){: .align-center}

- 합성곱 층의 적용 예시

![image](https://user-images.githubusercontent.com/55765292/163292381-63469d00-427d-4c5e-a4e4-44a1bb5bd128.png){: .align-center}

- 합성곱 층의 출력 형태 계산

![image](https://user-images.githubusercontent.com/55765292/163292410-4c87d486-83ca-4698-a11b-72ca0d05d0a7.png){: .align-center}

### 합성곱 층으 ㅣ계산
- 데이터의 중복을 허용하면 반복적인 행렬곱으로...

![image](https://user-images.githubusercontent.com/55765292/163292468-c6757070-9fd9-4b6e-ae10-0a15116608f8.png){: .align-center}

## 풀링층

### 다운 샘플링을 위한 풀링층(Pooling Layer)
- 합성곱 층을 거친 출력의 크기를 줄이는 특징을 추출하는 역할
- 크기가 줄어듦에 따라 학습 가능한 가중치가 줄어드는 효과
- 정방 행렬의 원소(최대 4x4)에서 최대 값을 추출하는 Max pooling과 평균을 취하는 Average Pooling이 있음

![image](https://user-images.githubusercontent.com/55765292/163292579-c5b4d46b-e05b-4745-8c01-5118ea1e8878.png){: .align-center}

## 편평층

### 편평 층(Flattening Layer)은 행렬의 벡터화
- 비선형적인 현상의 분류기(다층 퍼셉트론에서의 은닉층)에 적용시키기 위해, 행렬로 표현된 정보를 벡터로 대체

![image](https://user-images.githubusercontent.com/55765292/163292660-bfbffa1d-466d-4f34-a7bb-9c7c27ebadb6.png){: .align-center}

## 합성공 신경망의 구조

**- 입력 → 합성곱 층 → 풀링 층 → 편평 층 → FC 층 → 분류**

![image](https://user-images.githubusercontent.com/55765292/163292745-fcdbe455-ffc8-4d18-830f-a00b1d75828b.png){: .align-center}

---
**합성곱 신경망의 구조 예시**

![image](https://user-images.githubusercontent.com/55765292/163292815-9a483127-474a-49a5-8b67-c5390a175134.png){: .align-center}

## 잔차 층

### 잔차 층(Residual Layer) 더 깊은 신경망 구성을 위한 장치
- 2015년 ILSVRC의 우승팀인 MSRA에서 개발한 신경망으로 최대 152층 구성
- SKip Connection이라고도 지칭됨

![image](https://user-images.githubusercontent.com/55765292/163292944-6af482fb-357e-4da9-a673-5a643c4dbab7.png){: .align-center}

## 합성곱 신경망의 활용 방법

### 이미 학습된 모델(Pre-trained model) 활용
- 데이터가 비슷하다면 마지막 분류층만 재학습(fine-tuning)
- 과업이 비슷하다면 전체 가중치를 재학습(transfer learing)
- Pre-trained 모델은 공개 SW를 통해 활용 가능

![image](https://user-images.githubusercontent.com/55765292/163293046-1bb8698e-f8aa-43d3-b3c0-da7b1b7986e4.png){: .align-center}


참고자료
- https://en.wikipedia.org/wiki/Convolution
- https://en.wikipedia.org/wiki/Kernel_(image_processing)
- 추형석, 엑사스케일과 인공지능, 그리고 양자컴퓨터(2021)
- https://cs231n.github.io/convolutional-networks/
- https://en.wikipedia.org/wiki/Convolutional_neural_network
- https://towardsdatascience.com/what-is-residual-connection-efb07cab0d55
- https://keras.io/api/applications/
