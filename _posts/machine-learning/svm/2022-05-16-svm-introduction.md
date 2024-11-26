---
title: "[Machine Learning] SVM(Support Vector Machine) - 1. Introduction"
categories:
  - Machine Learning
tags:
  - SVM
  - Support Vector Machine
toc: true
toc_sticky: true
toc_label: "SVM(Support Vector Machine)"
toc_icon: "sticky-note"
---

# SVM(Support Vector Machine)

## What is SVM?

**SVM**은 **Logistic Regression**이나 **Neural Network**보다 복잡한 **non-linear한 함수**를 처리하는데 훨씬 효과적입니다.

본격적으로 SVM을 알아보기 전 Logistic Regression에 대해 대략적으로 복습해보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/168734702-a7443171-5f9d-47f6-91d1-d78a8e605264.png){: .align-center}

Logistic Regression의 가설함수 $h(x)$
{: .text-center}

Logistic Regression의 **가설함수** **$h(x)$** 를 살펴보겠습니다. 실제값 $y = 1$일때 $h(x)$ 가 1에 가까워져야 하므로 *$θ^Tx$* 도 0보다 큰 값이 될 것이고, $y = 0$일 때 $h(x)$는 0에 가까워져야 하므로 $θ^Tx$도 0보다 작은 값이 될 것입니다. 이때 우리는 $θ^Tx$를 편의상 $z$라고 합니다.

![image](https://user-images.githubusercontent.com/55765292/168735736-20a8edfc-1f7d-47ec-86fd-81f372647ab9.png){: .align-center}

이번엔 **Cost 함수**를 살펴보겠습니다. 이때 $y=1$일 때는 공식의 앞부분만 남고 $y=0$일 때는 공식의 뒷부분만 남는다는 사실을 우리는 알고 있고 그때의 그래프는 왼쪽과 같습니다. 그런데 **왼쪽의 그래프를 오른쪽의 그래프로 바꿔보겠습니다.**

이때 $y = 1$일때 $z > 1$이면 Cost가 0이고, 1보다 작으면 Cost가 점점 커지게 되는데 이를 $Cost_{1}(z)$이라고 칭하겠습니다. 그리고 $y = 0$일 때 $z < 1$이면 Cost가 0이고, 1보다 크면 Cost가 점점 커지게 되는데 이를 $Cost_{0}(z)$이라고 칭하겠습니다.

---

**이제 Logistic Regression의 Cost 함수에 SVM의 Cost 함수를 도출하기 위해 몇가지 단계를 조금 더 거쳐보겠습니다.**

![image](https://user-images.githubusercontent.com/55765292/168736144-fcbc2ccd-0a96-46c6-a78b-9167835303ac.png){: .align-center}

Logistic Regression의 Cost 함수 → SVM의 Cost 함수
{: .text-center}

첫째는 기존 Cost 함수의 log부분을 $Cost_{1}(z)$와 $Cost_{0}(z)$로 바꾸어줍니다.

우선은 $\frac{1}{m}$을 지우겠습니다. 왜냐하면 우리의 목적은 결국 최적화인데, **상수인 $\frac{1}{m}$가 있든 없든 최소값은 항상 동일 하기 때문입니다.** 예를 들어 $\frac{1}{m} = 10$이라고 할 때, u의 값은 바뀌지 않는 것을 확인할 수 있습니다.

그리고 **람다의 위치**를 바꾸겠습니다. 기존에 **정규화를 적용한 Logistic Regression의 Cost 함수**는 '$A+λ⁎B$'의 형태인데 이것을 '$C⁎A+B$'의 형태로 변경하는 것입니다. 이때 C는 1/λ입니다. **기존에 B에 λ를 곱했다는 것은 A에 가중치를 두겠다는 것이고, 이 λ를A에 넘겼다는 것은 B에 가중치를 두겠다는 것입니다.**

![image](https://user-images.githubusercontent.com/55765292/168736741-3fbc2973-d23d-4ddf-9f25-2b35da279fbe.png){: .align-center}

SVM의 Cost 함수
{: .text-center}

이렇게 Logistic Regression의 Cost 함수에서 몇가지 변경을 해주면 위와 같은 SVM의 Cost 함수가 정의됩니다. 이때 $θ^Tx > 0$ 일때 $h_θ(x)$는 1이고, 그렇지 않으면 0이 됩니다.


## SVM에서 Margin이란?

![image](https://user-images.githubusercontent.com/55765292/168740342-9d679e2c-3f4b-4e03-abfe-cb294c032a43.png){: .align-center}

**SVM**은 **Large Margin Classification**으로 불리기도 합니다. 왜 그런지 다시 한번 SVM을 살펴보겠습니다.

만약 $y = 1$일 때, $Cost_{1}(z)$는 $θ^Tx > 1$일 때 0이 됩니다. 반면에 $y= 0$일 때, $Cost_{0}(z)$는 $θ^Tx < -1$일 때 0이 됩니다. 이때 우리가 주목해야할 점은 기존에 Logistic Regression의 Cost 함수는 0을 기준으로 나뉘었음에 반해, **SVM은 1과 -1을 경계지점으로 하여 -1과 1사이에 Gap이 발생한다는 점입니다.**

![image](https://user-images.githubusercontent.com/55765292/168740799-462b197e-6795-4e3f-90ef-222524bdca6b.png){: .align-center}

Cost 함수에서 Decision Boundary 도출
{: .text-center}

이제 C를 살펴보겠습니다. 만약 **C=100000로 아주 큰 값**이라고 해보겠습니다. 이때 Cost 값이 최소화되기 위해선 Cost함수가 포함되어 있는 ∑가 0이 되어야 할 것입니다. 이를 위해선 $y = 1$일 때는 $z ≥ 1$이어야 하고 $y = 0$일 때는 $z ≤ -1$이어야 합니다.

이렇게 해서 ∑부분이 사라지게 되면 위처럼 뒷부분만 남게됩니다. 이것이 바로 **Classification을 위한 Decision Boundary**가 됩니다.

![image](https://user-images.githubusercontent.com/55765292/168741495-254b5a6e-0368-4c7b-9b73-5c49a07ff542.png){: .align-center}

하나의 Dataset에 대한 여러 Decision Boundary
{: .text-center}

하나의 Dataset에 대한 Decision Boundary는 여러 케이스들이 존재할 수 있습니다. 그 중에 특히 **위 그래프의 검정색 라인은 안정적이고 균형적으로 Data를 분리하고 있습니다.**

![image](https://user-images.githubusercontent.com/55765292/168741670-2b97b302-48e8-460c-b4e6-a9dd6cfe9836.png){: .align-center}

이때 검정색의 Decision Boundary가 dataset와 두는 일정한 거리 혹은 간격(Gap)을 **Margin**이라고 하고, 이것이 SVM이 Large Margin Classification이라고 불리는 이유입니다.

![image](https://user-images.githubusercontent.com/55765292/168741793-0dbf3cfe-4a38-4a18-aa06-a64f6ec1b4ab.png){: .align-center}

Outlier를 어떻게 다룰것인가
{: .text-center}

**SVM은 데이터를 올바르게 분리하면서 Margin의 크기를 최대화하는 것이 중요합니다.** 따라서 특정 그룹에서 혼자 동떨어져 있는 **이상치(outlier)** 를 다루는 것이 중요합니다.

앞에서 봤던 똑같은 Dataset에 새로운 데이터가 추가된 상황을 생각해보겠습니다. 이 새로운 데이터는 누가 봐도 outlier임을 알 수 있습니다.

이때 우리는 **두 가지 선택지**가 있습니다. **첫째**는 이러한 Outlier까지 철저하게 분리하는 **Hard Margin**입니다. 이 경우 데이터와 Decision Boundary 사이의 **Margin이 매우 작아지며,** 이런 Outlier를 모두 고려하며 Decision Boundary를 정하려 하면 **Overfitting 문제**가 발생할 수도 있습니다.

**둘째**는 Outlier들을 어느 정도 margin안에 포함하게 하면서 무시하는 **Soft Margin**입니다. 이경우 Margin은 커지지만 **Underfit**의 위험이 있습니다.

**Hard Margin**을 위해서는 **C의 값을 크게 잡아야 하며, Soft Margin**을 위해서는 **C의 값을 작게 잡아야 합니다.**
