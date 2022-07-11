---
title: "[Ⅱ. Deep Neural Network] Optimization Algorithms (3)"
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
toc_label: "Optimization Algorithms (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Optimization Algorithms

## Optimization Algorithms

### Exponentially Weighted Averages
이제 몇 가지 최적화 알고리즘을 보여드리고 싶습니다. 이것들은 기울기 하강보다 더 빠릅니다. 이러한 알고리즘을 이해하기 위해서는 지수 가중 평균이라는 것을 사용할 줄 알아야합니다. 지수 가중 이동 평균이라고도 하는데요. 이 부분에 대해 먼저 이야기 해보고 이 내용을 바탕으로 조금 더 상세한 최적화 알고리즘 내용을 다루어 보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178212358-5072544b-1e18-4e6e-9b59-2fc5e5276627.png)

![image](https://user-images.githubusercontent.com/55765292/178212447-03f3fde2-6457-4da1-9b98-de823d936341.png)

