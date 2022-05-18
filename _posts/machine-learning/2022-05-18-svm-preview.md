---
title: "[Machine Learning] SVM(Support Vector Machine) - 4. Preview"
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

이번 포스팅에서는 SVM에 대한 전반적인 preview를 하고, Gaussian Kernal 이외에 mercer theorem을 만족하는 나머지 3가지 kernel에 대해서도 알아보겠습니다.

## SVM Preview

![image](https://user-images.githubusercontent.com/55765292/169024134-8964669a-d040-4756-8518-88daa1471772.png){: .align-center}

SVM을 사용할 때는 두가지 고려해야 합니다. 하나는 **Outlier(이상치)를 얼마나 허용할 것이냐**를 결정하는 **parameter C**, 그리고 **Kernel**입니다. 이때 **Kernel이 없는 경우**는 **linear Kernel**이라 하여 주어진 데이터를 $f$ 함수로 가공하지 않고 $x$ feature 그대로 사용하게 됩니다.

**Kernel을 사용해야 하는 경우** 우리는 대표적으로 **Gaussian Kernel**을 떠올릴 수 있습니다. 이는 위와 같은 공식으로 표현 가능하고, 이때 $σ^2$ 값을 선택해야 합니다.

SVM에서 사용하는 Kernel 함수는 $f = K(x^{(i)},l^{(i)})$로 표현되며, 이때 $l^{(i)}$는 Feature space에 맵핑된 데이터입니다. 이때

$$
∥x - l∥^2 = (x_1 - l_1)^2 + (x_2 - l_2)^2 + ... + (x_n - l_n)^2
$$

을 이용하여 Kernel을 이용하기 전 각 features를 scaling 해줌으로써 range를 비슷하게 조정해줍니다.

---

![image](https://user-images.githubusercontent.com/55765292/169025438-b26e2e83-d8a4-418a-aa8c-61a517844df7.png){: .align-center}

보편적으로 SVM을 사용한다고 하면 **linear Kernel**이나 **Gaussian Kernel**을 사용합니다. 저번 포스팅에서 말했던대로 Mercer's Theorem을 만족하는 Gaussian Kernel을 포함한 **네 가지의 Kernels는 Cost의 global minimum을 찾도록 보장되어 있는데, 이에 대해 알아보겠습니다.**

**Polynomial Kernel**은 $(x^Tl + S)^n$이 공식입니다. 이때 **$S$는 상수**이며, **$n$은 차수로 사용자가 지정하게 됩니다.**

**String Kernel**은 **Input이 string인 경우** 사용이 되며 **문자열들을 분류**할 때 사용됩니다. 예를 들어 string a, b가 $K(a,b)$ 형태로 인자로 들어왔을 때 나오는 **결과값은 두 string이 얼마나 유사한지를 나타냅니다.** 이것은 **보통 text mining 분야에서 데이터를 군집화하고 분류하는데 쓰입니다.**

이외에 **chi-squre Kernel**과 **histogram intersection Kernel** 등이 있지만, Guassian Kernel 보다 성능이 떨어지기 때문에 거의 쓰일 일이 없습니다.

---

![image](https://user-images.githubusercontent.com/55765292/169026243-589e4ff4-bfa3-4a96-b70a-3ff2695275d9.png){: .align-center}

Multi-class classification using SVM
{: .text-center}

SVM도 **multi-class classification**이 가능합니다. 이때 **one vs all method**를 사용하게 됩니다. 이 경우 $y = 1,2,3,...,K$ 까지 존재한다면 $θ$ 또한 $K$개 존재하여 각 $θ^{(i)}$는 $y$값과 매칭됩니다. 그리고 데이터 분류 시 가장 큰 $(θ^{(i)})^Tx$ 값이 나온 class 값을 예측값으로 내놓게 됩니다.

![image](https://user-images.githubusercontent.com/55765292/169026879-c678e810-bebb-4b2b-909d-69756a1aa7b7.png){: .align-center}

SVM은 **feature의 수**와 **dataset**의 사이즈에 따라 각기 다른 알고리즘을 사용하는 것이 좋습니다. features의 수를 n 그리고 dataset의 사이즈를 m이라고 하겠습니다.

1) **만약 $n$이 $m$에 비해서 큰 dataset의 경우** Logistic Regression이나 SVM Linear Kernel을 사용하는 것이 좋습니다. (n = 10000, m = 100000)

2) **만약 $n$은 작은데, $m$이 중간정도 크기의 dataset의 경우**에는 SVM Gaussian Kernel을 사용하는 것이 좋습니다. (n = 10000, m = 10~10000)

3) **만약 $n$이 작고, $m$이 큰 dataset의 경우**에는 feature를 추가하고 Logistic Regression이나 SVM linear Regression을 사용하는 것이 좋습니다.

**SVM 딥 러닝이 나온 이후에도 여전히 활발하게 쓰입니다. 왜냐하면 딥러닝 못지않는 성능과 함께 Cost가 가볍기 때문입니다.**
