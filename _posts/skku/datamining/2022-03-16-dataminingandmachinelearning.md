---
title: "[Data Mining] 데이터 마이닝과 기계학습"
categories:
  - Data Mining
tags:
  - Data Mining
  - Machine learning
toc: true
toc_sticky: true
toc_label: "데이터 마이닝과 기계학습"
toc_icon: "sticky-note"
---

# 데이터 마이닝과 기계학습

## 데이터 마이닝 셀프 스터디 방법 (1/2)

### 문제 중심의 데이터 마이닝 역량 습득

- Kaggle → Code → 자신이 해결하고자 하는 문제 검색
- (예시) Marketing으로 검색
  - https://www.kaggle.com/jennifercrockett/marketing-analytics-eda-task-final/notebook
- 문제와 데이터를 확인하고, 주어진 코드를 한 줄 씩 재작성
  - Python을 전혀 모를 경우 → 웹상의 튜토리얼을 따라 jupyter notebook 설치 및 실행 → 기본적인 문법 공부 필요
  - Python을 경험해 본 경우 → 해당 코드를 한 줄 씩 작성해 가면서 실행
  - 분석 방법론을 확인하고 방법론에 대한 공부
    - 해당 문제에서는 Linear Regression을 사용하기 때문에, 선형회귀분석의 가장 기본적인 방법인 Least Square Method 공부(선형대수에서 배움)
    - 코딩에 익숙하면 scikit-learn의 해당 함수에서 내용 확인, [Least Square Method에 대한 온라인 강의 등을 확인](https://www.youtube.com/watch?v=YwZYSTQs-Hk).
  - 각종 시각화 방법 확인

## 데이터 마이닝 셀프 스터디 방법 (2/2)

### 프로젝트 팀 구성원이 스터디 그룹으로 하는 것을 추천

- 1주에 한명씩 공부한 내용을 공유하는 방식으로 추진
  - 가능하면 블로그 혹은 웹페이지에 공부한 내용을 정리
- 접근하기 쉬운 문제부터 시작
- 이번 강의의 프로젝트를 준비하는 차원으로도 적합

### 지속적인 학습이 중요

- **개개인이 설정한 목표**에 따라 수준을 결정할 필요가 있음
- 데이터 마이닝 방법론은 도구적인 측면이 강하기 때문에 장기간 사용하지 않으면 무용지물


## 데이터 마이닝과 기계학습

### 데이터 마이닝
- 빅데이터에서 새로운 패턴이나 지식을 발견하는 데 목적
- 데이터베이스 지식 발견 프로세스의(Knowledge Discovery in Database)한 과정을 의미
- 다양한 분야와 혼용되어 활용(AI, ML, BI 등)
- 새로운 사실을 발견해야 한다는 점에서 군집 분석이나 이상 탐지가 주류를 이룸

### 기계학습
- 데이터를 통한 **학습**과정을 통해 특정 패턴을 **예측**하는 것이 목적
- 데이터 마이닝과 방법론적으로 매우 유사함
- 기계학습의 접근방법 중 비지도 학습의 경우 대부분데이터 마이닝에 활용 가능함
- 기계학습이 크게 부상한 이유는 지도학습 방법 중 **인공신경망**을 활용한 딥러닝


## 기계학습

### 지도학습

**라벨링**된 데이터로 학습하는 방법
- 입력과 출력 데이터의쌍으로 이루어졌으며, 입력값에 대해 예측하고자 하는 출력값이 이미 부여된 경우를 의미함
  - 라벨링(labeling)은 태깅(tagging) 혹은 어노테이션(annotation)으로도 사용
  - 라벨링된 데이터는 처음 구축할 때 많은 비용이 소요되며, 적법한 절차를 준수해야함
- 학습데이터는 다다익선이나 분야에 따라 구축이 어려운 경우도 존재
  - 대안으로는 활성학습(Active Learning)이 있음

지도학습은 **분류**가 주된 목적이며 다양한 모델이 있음
- 회귀분석
- 인공신경망
  - 심층신경망, 합성곱신경망, 순환신경망 등

### 비지도학습

**라벨링**이 없는 데이터에서 패턴을 찾는 방법
- 입력과 출력이 아닌 입력 데이터만 있는 경우
  - 입력과 출력이 아닌 입력 데이터만 있는 경우
  - (예시) 사람의 안면데이터에 대한 비지도학습의 경우 사람을 성별, 인종으로 군집
  - 비지도학습은 학계에서도 매우 도전적인 과제
    - 귀납적 편향(Inductive Bias) 없이는 비지도학습을 성공적으로 수행하기 어려움
  - 입력데이터 자체만으로 지도학습을 수행하는 경우에도 해당
    - (예시) 오토 인코더
    ![image](https://user-images.githubusercontent.com/55765292/158527162-9f8c0d49-cc78-4d0d-9a07-165f98ee249c.png)

### 강화학습
특정 환경의 보상을 통해 행동하는 방식을 구현하는 방법
![image](https://user-images.githubusercontent.com/55765292/158527236-92dac374-8da7-4dfb-a639-8f213520bbe8.png)


## 인공신경망 모델
![image](https://user-images.githubusercontent.com/55765292/158527278-946e5bfa-e004-45ea-84ba-1975cf8e5677.png)

### 인공신경망 모델 - 순환신경망
![image](https://user-images.githubusercontent.com/55765292/158527332-740d1009-5753-4ece-831d-08ed4f678bee.png)

### 인공신경망 모델 - 합성곱신경망
![image](https://user-images.githubusercontent.com/55765292/158527366-270081b7-6b9b-4923-b462-48276cb737c9.png)

### 인공신경망 모델 - 적대적 생성 신경망(GAN)
![image](https://user-images.githubusercontent.com/55765292/158527398-aa264757-1946-49cf-863c-a6a1b652f5dc.png)
