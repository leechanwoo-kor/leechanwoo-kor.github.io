---
title: "[Ⅰ. Neural Networks and Deep Learning] Shallow Neural Networks (6)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
toc: true
toc_sticky: true
toc_label: "Shallow Neural Networks (6)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/172768350-41a6b2f0-9468-4b13-bc94-4a38f89ce5e6.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Neural Networks Basics

## Shallow Neural Networks

### Random Initialization

신경망을 변경할 때는 가중치를 무작위로 초기화하는 것이 중요합니다. 로지스틱 회귀의 경우 가중치를 0으로 초기화해도 괜찮습니다. 그러나 매개변수에 대한 가중치를 모두 0으로 초기화한 다음 기울기 하강을 적용하면 작동하지 않을 것입니다. 왜 그런지 보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/175846051-3c5a607a-fa40-4998-ac44-df3a3a922dce.png)

![image](https://user-images.githubusercontent.com/55765292/175846072-974408c1-1ccd-4d17-965f-f007cc90def2.png)
