---
title: "[Python] 제너레이터(Generator)" 
categories:
  - Python
tags:
  - Generator
toc: true
toc_sticky: true
toc_label: "제너레이터(Generator)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/210788377-2257ff8e-33e7-44de-b530-ea6583fd2a74.png)

# 제너레이터(Generator)

메모리를 압도할 정도로 큰 데이터 세트로 작업을 해야하거나 호출될 때마다 내부 상태를 유지해야 하는 복잡한 함수를 가지고 있는 경우가 있습니다. 그러나 함수가 너무 작아서 자신의 클래스를 만들 수 없거나 그 이상의 경우에 제너레이터와 파이썬의 yield문이 도움이 됩니다.

## 제너레이터 사용

[PEP 255](https://peps.python.org/pep-0255/)에 도입된 제너레이터 함수는 [lazy iterator](https://en.wikipedia.org/wiki/Lazy_evaluation)를 반환하는 특수한 종류의 함수입니다. 리스트처럼 반복할 수 있는 개체입니다. 그러나 리스트와 달리 lazy iterator는 내용을 메모리에 저장하지 않습니다.

이제 제너레이터가 무엇을 하는지 대략적으로 알게 되었으니, 두 가지 예를 통해서 살펴보겠습니다. 첫 번째로, 제너레이터가 어떻게 작동하는지 조감도에서 볼 것입니다. 그런 다음 각 예제를 통해 자세히 살펴보겠습니다.
