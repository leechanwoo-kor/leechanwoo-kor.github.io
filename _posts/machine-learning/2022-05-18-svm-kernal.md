---
title: "[Machine Learning] SVM(Support Vector Machine) - 3. Kernal"
categories:
  - Machine Learning
tags:
  - Machine Learning
  - SVM
  - Support Vector Machine
toc: true
toc_sticky: true
toc_label: "SVM(Support Vector Machine)"
toc_icon: "sticky-note"
---

# SVM(Support Vector Machine)

저번 포스팅에서는 SVM의 Margin에 대해 다루며, 선형으로 분리되는 데이터의 Decision Boundary를 어떻게 지정할 것인가에 대해 다뤄보았습니다. **하지만 이 세상의 대부분의 데이터는 대부분 선형으로 뷴류되지 않습니다.** 결국 우리가 주목해야할 부분은 선형 분류가 아니라 비선형 분류라는 점입니다.

이번 포스팅에서는 선형 분류되는 데이터의 Decision Boundary를 지정하기 위해 이용되는 SVM의 Kernal에 대해 알아보겠습니다.

## SVM Preview

우선은 **Kernal**이라는 개념이 어떻게 나오게 되었는지 SVM을 잠시 복습하면서 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/168981237-dac2c0c1-5482-4ea7-b541-8eba75c5d01b.png){: .align-center}

Hard Margin vs Soft Margin
{: .text-center}

보통 데이터를 분류하려 할 때 데이터 그룹과 동떨어져 있는 **Outlier까지 철저하게 분류하는 것을 Hard Margin,** Outlier를 어느정도 눈감으면서 **최대의 Margin을 가지는 Decision Boundary를 지정하고자 했던 것이 Soft Margin**이었습니다.

사실 이 **Soft Margin**은 비선형 분류를 다루기 위해 Kernal이 나오기전 사용하던 방법이었습니다. 그러나 outlier를 어느 정도 무시하고 Decision Boundary를 정한다는 점에서 분명한 한계가 있었고, 이에 따라 나오게 된게 바로 Kernal입니다.

### 
