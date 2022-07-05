---
title: "[Ⅱ. Deep Neural Network] Practical Aspects of Deep Learning (3)"
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
toc_label: "Practical Aspects of Deep Learning (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Practical Aspects of Deep Learning

## Regularizing your Neural Network

### Regularization

신경망이 데이터에 과적합된 것으로 의심되는 경우, 즉 고분산 문제가 있는 경우 가장 먼저 시도해야 하는 것 중 하나는 아마도 정규화일 것입니다. 네트워크의 분산을 줄이기 위해 더 많은 훈련 데이터를 얻기 위한 것이기도 하며 이는 매우 신뢰할 수 있습니다.

그러나 항상 더 많은 훈련 데이터를 얻을 수는 없고 또는 더 많은 데이터를 얻는데 비용이 많이 들 수 있습니다. 그러나 정규화를 추가하면 종종 과적합을 방지하는데 도움이 됩니다. 고분산을 해결하는 다른 방법입니다.

자, 그럼 정규화가 어떻게 이루어지는 한번 살펴보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/177271391-badf0493-85fa-4d9f-85ed-643e3ac26b44.png)

![image](https://user-images.githubusercontent.com/55765292/177271458-2dedd4b8-7ccf-4519-89a2-b10080d68b0d.png)

