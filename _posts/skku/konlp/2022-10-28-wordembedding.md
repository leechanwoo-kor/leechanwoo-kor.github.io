---
title: "[NLP] 단어 임베딩(Word Embedding)"
categories:
  - NLP
tags:
  - NLP
  - Word Embedding
toc: true
toc_sticky: true
toc_label: "단어 임베딩(Word Embedding)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196322694-37aa45dd-c985-4514-8ba4-dd447a6486a6.png)

<br>

# 단어 임베딩(Word Embedding)

<br>

##  단어 임베딩(Word Embedding)
- 실수 공간 상에 단어의 위치와 단어 간 거리가 실제 의미를 반영시키고자 함

![image](https://user-images.githubusercontent.com/55765292/198577798-c90f3b61-51da-410b-9e33-cdb3efc9c851.png)

<br>

- 하나의 단어를 밀집 벡터(dense vector)로 표현하는 방법
  - 예를 들면, 원-핫 인코딩을 사용해서 만든 16차원 벡터를 단어 임베딩을 통해 4차원 벡터로 바꾸자!!

![image](https://user-images.githubusercontent.com/55765292/198577942-e69e7746-af68-4f55-958f-c3d21c681ffc.png)

<br>

### NPLM
- Journal of Machine Learning Research, 2003

![image](https://user-images.githubusercontent.com/55765292/198578255-12edb893-d53d-4ed0-9ec2-defd07a621ba.png)

<br>

## Word2Vec
- Efficient & effective tool for learning word representations from corpus

<br>

- ICLR Workshop, 2013

![image](https://user-images.githubusercontent.com/55765292/198578471-e89a8a19-b272-4820-a4ef-93e9a4534e88.png)

<br>

- NIPS, 2013

![image](https://user-images.githubusercontent.com/55765292/198578511-a8307745-6be9-443c-8c62-d1a69ca8920f.png)

<br>

- 텍스트 말뭉치를 받아들이고 각 단어에 대한 벡터 표현을 출력하는 딥러닝 알고리즘

![image](https://user-images.githubusercontent.com/55765292/198578633-7c50c42d-d91c-48ac-ab19-be8c28779d00.png)

- 이론적 근거 --> 분포 가설(Distributed Hypothesis) (by John Firth, 1880-1960)
  - 같은 문맥의 단어, 즉 비슷한 위치에 나오는 단어는 비슷한 의미를 가진다!!
    - 어떤 글에서 비슷한 위치에 존재하는 단어는 단어 간의 유사도가 높다고 판단하는 방법
    - '나는 식사를 하기 전에 반드시 ___을 씻는다'
- 유형
  - CBOW(Continuous Bag of Words) 모델
  - Skip-gram 모델

<br>

- CBOW --> 주변 단어들을 가지고 중간에 있는 단어를 예측하는 방법
- Skipgram --> 중간에 있는 단어를 가지고 주변 단어들을 예측하는 방법

![image](https://user-images.githubusercontent.com/55765292/198579114-f522831c-854f-42b8-a7d6-0ae10f83d3f8.png)

<br>

### 단어 임베딩(= 단어의 벡터표현)을 하면 무엇을 할 수 있는가?
- 유사한 의미의 단어가 벡터공간 상에서 가까운 곳에 위치

![image](https://user-images.githubusercontent.com/55765292/198579286-6de778dd-e29e-46cb-b737-ef4bc4415c81.png)

  - 단어 간의 유사도(similarity)를 벡터의 거리를 사용하여 구할 수 있다!!
    - 유의어 추출
    - 의미 추출
    - 관계 추출
    - 텍스트 분류

<br>

## 단어 임베딩 vs 문장 임베딩

<br>

### 단어 임베딩
- Word2Vec, GloVe, FastText, Swivel 등 2017년 이전의 임베딩 기법들
- 단점
  - 동음이의어(homonym)를 분간하기 어려움
    - 단어의 형태가 같다면 동일한 단어로 인식하여 모든 문맥 정보를 해당 단어 벡터에 투영하기 때문
    - 배 --> 먹는 배? 신체의 배? 교통의 배? --> 이 모든 의미가 뭉뚱그려져 하나의 벡터로 표현됨
  - 단어 간 유사도 --> 관련성이 높다는 뜻이지 "유의관계"는 아니다!!
    - 춥다 : 덥다 --> 온도 속성
    - 흑 : 백 --> 색상 속성
    - 소음 : 적막 --> 소리 속성

<br>

### 문장 임베딩
- 2018년 ELMo, BERT, GPT 발표
- 개별 단어가 아닌 단어 시퀀스 전체의 문맥적 의미를 함축시킴

![image](https://user-images.githubusercontent.com/55765292/198579888-96aeac06-75fc-41f5-bd3f-8faa4d2b3d74.png)
