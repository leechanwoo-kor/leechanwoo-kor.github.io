---
title: "[Ⅱ. Deep Neural Network] Practical Aspects of Deep Learning (8)"
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
toc_label: "Practical Aspects of Deep Learning (8)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Practical Aspects of Deep Learning

## Setting Up your Optimization Problem

### Gradient Checking

기울기 검사는 많은 시간을 절약할 수 있도록 도와준 기법인데요. 그리고 역전파를 도입하면서 여러 번 버그도 찾을 수 있게 도왔습니다. 기울기 검사를 통해 어떻게 디버그를 할 수 있는지 알아보죠. 또 도입방법과 역전파가 옳은지도 같이 검증해보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/177708519-f0e48acd-b003-45b4-a2e1-069479a9a775.png)

![image](https://user-images.githubusercontent.com/55765292/177708567-de1c6155-24f6-438e-bdc6-b83126ceb0bf.png)
