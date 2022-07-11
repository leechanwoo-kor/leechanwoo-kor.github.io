---
title: "[Ⅱ. Deep Neural Network] Optimization Algorithms (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Tensorflow
  - Deep Learning
  - Mathematical Optimization
  - hyperparameter tuning
toc: true
toc_sticky: true
toc_label: "Optimization Algorithms (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Optimization Algorithms

## Optimization Algorithms

### Mini-batch Gradient Descent

이번에는 신경망 네트워크를 훨씬 더 빨리 트레이닝 시킬 수 있도록 도와주는 최적화 알고리즘에 대해 살펴보도록 하겠습니다. 머신 러닝을 적용한다는 것은 매우 반복적인 업무를 동반한다고 했습니다. 여러 모델들을 그냥 무조건 트레이닝시키고 가장 잘 작동하는 것을 찾아야합니다. 그렇기 때문에 재빨리 모델들을 트레이닝 시키는 것이 매우 중요합니다.

한가지 더 어렵게 만들 수 있는 부분은 딥러닝이 빅데이터가 준비되었을 때 가장 잘 작동하는 경향이 있다는 것입니다. 신경망을 큰 데이터세트에서 트레이닝 시킬 수 있는데요. 이런 경우 속도가 매우 느리겠죠. 이런 경우 빠른 최적화 알고리즘과 그리고 양질의 최적화 알고리즘을 갖는 것이 팀 효율성의 속도를 높힐 수 있다는 것입니다.

그러면 이제 미니 배치 기울기 하강에 대한 이야기로 시작해보록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178169569-b41138c0-7e63-44ff-9f55-7133efe52e8b.png)

![image](https://user-images.githubusercontent.com/55765292/178169583-b78d6f99-e07d-41db-9f11-e4cab0c12921.png)
