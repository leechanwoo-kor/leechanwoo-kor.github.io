---
title: "[Data Mining] 딥러닝의 기초 - 오류역전파법"
categories:
  - Data Mining
tags:
  - Data Mining
  - Back Propagation
toc: true
toc_sticky: true
toc_label: "딥러닝의 기초 - 오류역전파법"
toc_icon: "sticky-note"
---

# 딥러닝의 기초 - 오류역전파법

## 손실 함수

**예측값과 실제값의 차이를 나타냄**
- 학습가능한 매개변수의 함수로 표현
- 모델의 목표에 따라 서로 다른 손실함수 사용
  - 분류(크로스 엔트로피, 로그 로스), 회귀(평균제곱오차)
- 평균제곱오차 예시 (하나의 입출력 데이터)

![image](https://user-images.githubusercontent.com/55765292/161898655-976af8d9-b5b2-44ce-b744-73b7d7c2878d.png){: .align-center}

## 오류역전파법
**손실 함수가 최소가 되는 가중치를 찾는 방법**
- 가중치 갱신 방법 - 경사하강법
  - 방향 : 손실 함수에 대해 각각의 가중치로 편미분
  - 강도 : 학습률에 따라 조정
  ![image](https://user-images.githubusercontent.com/55765292/161898868-60581158-9fae-4d47-909f-eb50c6bae7e9.png){: .align-center}
- 경사하강법을 기반으로 다양한 variation이 존재
![image](https://user-images.githubusercontent.com/55765292/161898890-55ee88a3-6ff5-451a-845d-0dd91cce8298.png){: .align-center}

**다층퍼셉트론의 표현**

![image](https://user-images.githubusercontent.com/55765292/161898995-14ffea95-f033-4183-b710-e31df0ff3b6d.png){: .align-center}



