---
title: "[Machine Learning] SVM(Support Vector Machine)"
categories:
  - Machine Learning
tags:
  - Machine Learning
  - SVM
  - Support Vector Machine
toc: true
toc_sticky: true
toc_label: "Question Answering"
toc_icon: "sticky-note"
---

# SVM(Support Vector Machine)

## What is SVM?

**SVM**은 **Logistic Regression**이나 **Neural Network**보다 복잡한 **non-linear한 함수**를 처리하는데 훨씬 효과적입니다.

본격적으로 SVM을 알아보기 전 Logistic Regression에 대해 대략적으로 복습해보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/168734702-a7443171-5f9d-47f6-91d1-d78a8e605264.png){: .align-center}
Logistic Regression의 가설함수 *h(x)*{: .text-center}

Logistic Regression의 **가설함수** **_h(x)_** 를 살펴보겠습니다. 실제값 $y = 1$일때 *h(x)* 가 1에 가까워져야하므로 *$θ^Tx$* 도 0보다 큰 값이 될 것이고, $y=0$일때 $h(x)$는 0에 가까워져야하므로 $θ^Tx$도 0보다 작은 값이 될것입니다. 이때 우리는 $θ^Tx$를 편의상 $z$라고 합니다.

![image](https://user-images.githubusercontent.com/55765292/168735736-20a8edfc-1f7d-47ec-86fd-81f372647ab9.png){: .align-center}

이번엔 **Cost 함수**를 살펴보겠습니다. 이때 $y=1$일떄는 공식의 앞부분만 남고 $y=0$일때는 공식의 뒷부분만 남는다는 사실을 우리는 알고있고 그때의 그래프는 왼쪽과 같습니다. 그런데 **왼쪽의 그래프를 오른쪽의 그래프로 바꿔보겠습니다.**

이때 $y=1$일떄 $z>1$이면 Cost가 0이고, 1보다 작으면 Cost가 점점 커지게 되는데 이를 $Cost_{1}(z)$이라고 칭하겠습니다. 그리고 y=0일 때 z<1이면 Cost가 0이고, 1보다 크면 Cost가 점점 커지게 되는데 이를 $Cost_{0}(z)$이라고 칭하겠습니다.

**이제 Logistic Regression의 Cost 함수에 SVM의 Cost 함수를 도출하기 위해 몇가지 단계를 조금 더 거쳐보겠습니다.**

![image](https://user-images.githubusercontent.com/55765292/168736144-fcbc2ccd-0a96-46c6-a78b-9167835303ac.png){: .align-center}
Logistic Regression의 Cost 함수 -> SVM의 Cost 함수{: .text-center}

첫째는 기존 Cost 함수의 log부분을 $Cost_{1}(z)$와 $Cost_{0}(z)$로 바꾸어줍니다.

우선은 1/m을 지우겠습니다. 왜냐하면 우리의 목적은 결국 최적화인데, **상수인 1/m가 있든 없든 최소값은 항상 동일하기 때문입니다.** 예를 들어 $\frac{1}{m} = 10$이라고 할 때, u의 값은 바뀌지 않는 것을 확인할 수 있습니다.

그리고 **람다의 위치**를 바꾸겠습니다. 기존에 **정규화를 적용한 Logistic Regression의 Cost 함수**는 '$A+λ⁎B$'의 형태인데 이것을 '$C⁎A+B$'의 형태로 변경하는 것입니다. 이때 C는 1/λ입니다. **기존에 B에 λ를 곱했다는 것은 A에 가중치를 두겠다는 것이고, 이 λ를A에 넘겼다는 것은 B에 가중치를 두겠다는 것입니다.**

![image](https://user-images.githubusercontent.com/55765292/168736741-3fbc2973-d23d-4ddf-9f25-2b35da279fbe.png){: .align-center}
SVM의 Cost 함수{: .text-center}

이렇게 Logistic Regression의 Cost 함수에서 몇가지 변경을 해주면 위와 같은 SVM의 Cost 함수가 정의됩니다. 이때 $θ^Tx > 0$ 일때 $h_θ(x)$는 1이고, 그렇지 않으면 0이 됩니다.
