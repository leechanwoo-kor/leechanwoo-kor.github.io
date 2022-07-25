---
title: "[Ⅲ. Structuring Machine Learning Projects] Introduction to ML Strategy (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Deep Learning
  - Inductive Transfer
  - Machine Learning
  - Multi-Task Learning
  - Decision-Making
toc: true
toc_sticky: true
toc_label: "Introduction to ML Strategy (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/179931579-167db454-5d9d-4e0d-a8fe-454770dc97a6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Structuring Machine Learning Projects

## Introduction to ML Strategy

### Why ML Strategy
머신러닝 프로젝트 구성법 일명 머신러닝 전략을 다뤄보겠습니다. 이를 통해 머신러닝 시스템을 더욱 빠르고 효율적으로 작동시킬 수 있으면 좋겠습니다. 그렇다면 머신러닝 전략이란 무엇일까요? 예시를 살펴보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/180672824-2f21d299-7d10-471d-80db-a00b705d85d7.png)

고양이 비용 파일을 작업하는 중이라고 가정해보겠습니다. 얼마간 작업한 뒤 시스템 정확도가 90%가 되었는데요. 이 수치는 아직 충분치 않습니다. 그러면 시스템을 어떻게 개선할지에 대해 다양한 아이디어가 있을 수 있는데요.

예를 들어 훈련 데이터를 더 많이 수집해야 한다고 생각할 수 있습니다. 아니면 훈련 세트가 아직 충분히 다양하지 않기 때문에 더 다양한 포즈의 고양이 사진이나 더 다양한 부정 예시 세트를 수집해야 한다고 얘기할 수도 있습니다.

경사하강법을 이용해 알고리즘을 더 큰 네트워크나 더 작은 네트워크를 시도하거나 드롭아웃 또는 L2 정규화를 시도해 볼 수도 있습니다. 또는 활성화 함수나 숨은 유닛의 개수 등 네트워크 구조를 바꿀 수도 있습니다.

이렇게 딥러닝 시스템을 개선하려고 할 때 시도할 수 있는 것이 참 많은데요. 문제는 선택을 잘못하게되면 실제로 6개월 정도를 프로젝트 방향만 바꾸는데 소비할 수 있는데 그 뒤에야 방향을 바꾼 것이 아무런 도움이 안되었다는걸 깨달을 수도 있습니다.


### Orthogonalization

![image](https://user-images.githubusercontent.com/55765292/180673196-fa05f521-6c2d-4d3e-b324-9b4426a16ae3.png)

![image](https://user-images.githubusercontent.com/55765292/180673210-175c6ae0-0fe8-4d49-b66e-da6b28c0b544.png)



























