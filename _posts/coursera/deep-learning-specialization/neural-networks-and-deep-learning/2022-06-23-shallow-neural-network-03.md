---
title: "[Ⅰ. Neural Networks and Deep Learning] Shallow Neural Networks (3)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Shallow Neural Networks (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Shallow Neural Networks

### Vectorizing Across Multiple Examples
지난 포스팅에서는 단일 훈련 예제를 사용하여 신경망에서 예측을 계산하는 방법을 살펴보았습니다. 이번에는 여러 훈련 예제에서 벡터화하는 방법을 볼 수 있습니다. 로지스틱 회귀에서 본 결과와 매우 비슷할 텐데요.

따라서 행렬의 다른 열에 서로 다른 훈련 예제를 쌓으면 이전 영상에서 얻은 방정식을 사용할 수 있습니다. 이전 방정식을 살짝 변형시켜 신경망이 거의 동시에 모든 예제의 출력을 계산하도록 변경하십시오.

그럼 그 방법에 대해 자세히 알아보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175244375-cd9d3608-0507-4ab9-9996-7cd73d9c405c.png)

![image](https://user-images.githubusercontent.com/55765292/175244566-1f1190e2-5b42-4116-8b4f-ff4b9b9f79b1.png)


























