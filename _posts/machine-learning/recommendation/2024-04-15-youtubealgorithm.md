---
title: "[Recommendation System] 유튜브 알고리즘으로 보는 딥러닝 기반 추천 시스템"
categories:
  - Recommendation System
tags:
  - Recommendation System
toc: true
toc_sticky: true
toc_label: "유튜브 알고리즘으로 보는 딥러닝 기반 추천 시스템"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3722bd96-62df-4846-95d7-59a90168780b){: .align-center}<br>

## 추천 시스템

[추천 시스템](https://ko.wikipedia.org/wiki/%EC%B6%94%EC%B2%9C_%EC%8B%9C%EC%8A%A4%ED%85%9C)은 정보 필터링 (IF) 기술의 일종으로, 특정 사용자가 관심을 가질만한 정보 (영화, 음악, 책, 뉴스, 이미지, 웹 페이지 등)를 추천하는 것이다. 추천 시스템에는 협업 필터링 기법을 주로 사용한다. 소셜 북마크 사이트에서 링크를 사람들에게 추천하고 무비렌즈 데이터 세트에서 영화를 추천하는 방법 등이 이에 속한다.

**다양한 후보** 가운데서 **사용자가 원하는 것**을 쉽게 **선택**하도록 **돕는** 시스템!

### 추천 시스템에서 사용되는 Data 유형

- Contents Data
    - User info
    - Item info
- Interaction Data
    - Explicit feedback (명시적 피드백)
        - Rating, Like, Dislike, Etc...
    - Implicit feedback (암묵적 피드백)
        - History, Click, Purchase Etc...

## 딥러닝 기반 추천 시스템

https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0f8d777a-6719-48c2-a644-dd6d78249f59

### 유튜브 추천 알고리즘 트릴로지

2010년부터 지금까지 총 3개의 논문

1. The YouTube Video RecSys(2010)
2. Deep Neural Networks for Youtube Recommendations(2016)
3. What Video to Watch Next : Youtube(2019)

이 중 2, 3을 살펴보면서 추천 시스템에 **딥러닝이 어떻게 사용되는지** 또 **우리가 아는 모델과 어떻게 다른지** 알아보겠습니다.

## 유튜브의 3가지 고민

- Scale
    - 일반 알고리즘이 가정한 상황과 다른 거대한 플랫폼
        - Distributed Training, Fast Inference 필요
- Freshness
    - 너무나도 많은 동영상이 동시에 업로드
        - 새롭게 업로드 되는 아이템을 반영
- Noise
    - Sparse, Variable한 유저 데이터(Implicit data)
    - poorly structured Metadata
        - Robust한 모델이 필요

### 2 Stage (2 Model)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d3d0482b-4332-472a-ba04-0fbbc7dd505a/20e7689e-3266-4109-acd0-d4f0f914286e/Untitled.png)

https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/99881dc1-423e-4a7d-a2a6-b3e8902b82fd

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d3d0482b-4332-472a-ba04-0fbbc7dd505a/fc63cbf9-4ee4-46f4-a1cb-35477c4c8f43/Untitled.png)
