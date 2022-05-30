---
title: "[Machine Learning] SVM(Support Vector Machine) - Python"
categories:
  - Machine Learning
tags:
  - Machine Learning
  - Support Vecrtor Machine
  - SVM
toc: true
toc_sticky: true
toc_label: "SVM(Support Vector Machine) - Python"
toc_icon: "sticky-note"
---

# SVM(Support Vector Machine) - Python

SVM을 파이썬으로 구현해볼 것이다. 구현은 직접 구현을 먼저 해보고 Scikit-Learn에서 제공하는 것과 비교해보려고 한다.

## 직접 구현

### 코드 설명

사실 직접 구현이라고 했지만 완전 밑바닥에서 부터 구현한 것은 아니다. 서포트 벡터 머신 알고리즘으로 초평면을 얻기 위해서 Qudratic Programming 알고리즘이 필요한데 이 부분은 Convex 최적화 알고리즘을 제공하는 모듈인 cvxopt을 사용했다. pip을 이용하여 설치할 수 있다.

```
pip install cvxopt
```

cvxopt에서 Quadratic Programming 알고리즘은 아래와 같은 표준화된 형식의 문제를 풀게 된다.

![image](https://user-images.githubusercontent.com/55765292/170898868-f97b7b69-87f4-4945-8012-dd12328359dc.png){: .align-center}

따라서 서포트 벡터 머신 알고리즘을 위 형식에 맞게 설정만 해주면 되는 것이다.

먼저 필요한 모듈을 불러오자

```
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from itertools import combinations
from collections import Counter
from cvxopt import matrix as cvxopt_matrix
from cvxopt import solvers as cvxopt_solvers
```

### BinarySVC

다음으로 이진 분류를 위한 BinarySVC 클래스를 만들어 준다. 커널 타입과 Polynomial, Sigmoid Kernel에서 $\theta$를 초기값으로 지정할 수 있다. 커널을 지정하지 않으면 자동으로 Soft-Margin Linear SVM 알고리즘이 작동된다.

```
class Binary SVC():
    def __init__(self, kernel=None, coef0=0):
        self.labels_map = None
        self.kernel = kernel
        self.X = None
        self.y = None
        self.alphas = None
        self.w = None
        self.b = None
        self.codf0 = coef0
        if kernel is not None:
            assert kernel in ['poly', 'rbf', 'sigmoid']
```

다음으로 전처리를 위한 여러 가지 함수를 정의한다. 원 데이터의 라벨을 1, -1로 매핑하기 위한 맵을 생성하는 make_label_map 함수, 원 데이터의 라벨을 실제로 1, -1로 변환하는 transform_label 함수, 1과 -1을 원 데이터의 라벨로 바꿔주는 inverse_label 함수 그리고 마지막으로 두 벡터의 커널 값을 계산하는 get_kernel_val 함수를 만들어주었다.

```
class BinarySVC():
    ## 중략
    
    def make_label_map(self, uniq_labels):
        labels_map = list(zip([-1, 1], uniq_labels))
        self.labels_map = labels_map
        return
        
    def transform_label(self, label, labels_map):
        res = [l[0] for l in labels_map if l[1] == label][0]
        return res
        
    def inverse_label(self, svm_label, labels_map):
        try:
            res = [l[1] for l in labels_map if l[0] == svm_label][0]
        except:
            print(svm_label)
            print(labels_map)
            raise
        return res

    def get_kernel_val(self, x, y)
        X = self.X
        coef0 = self.coef0
        gamma = 1/(X.shape[1]*X.var())
        if self.kernel == 'poly':
            return (gamma*np.dot(x,y)+coef0)**2
        elif self.kernel == 'rbf':
            return np.exp(-gamma*np.square(np.linalg.norm(x-y)))
        else:
            return np.tanh(gamma*np.dot(x,y)+coef0)
```
    
이제 주인공이라 할 수 있는 서포트 벡터 모형 적합 함수이다. 적합한다는 것을 알고리즘을 통하여 초평면의 모수를 얻는다는 것을 말한다.

![image](https://user-images.githubusercontent.com/55765292/170917559-74ff13fe-0a0e-4b26-b8f6-0539490774da.png){: .align-center}

위의 식을 이용하여 cvxopt가 계산하는 Quadratic Programming 표준 형식을 맞춰준다.

![image](https://user-images.githubusercontent.com/55765292/170917699-4f68e183-9c05-46a0-97a4-ef7a5cf32aba.png){: .align-center}

여기서 $I$는 $n×n$단위행렬($n$은 데이터 개수이다), $e$는 1로 이루어진 $n$차원 벡터이다. 이때 $Q$는 커널을 사용할 때와 안 할 때로 나누어 만들어주었다.


$w$는 커널을 사용하지 않는 경우에만 계산한다. $b$는 우리가 찾은 해에서 $\alpha$가 특정 값 이상인 인덱스를 구하고 이에 해당하는 $y_i$와 $x_i$를 이용하여 계산한다.

```
class BinarySVC():
    ## 중략
    
    def fit(self, X, y, C):
        assert C >= 0, 'constant C must be non-negative'
        uniq_labels = np.unique(y)
        assert len(uniq_labels) == 2, 'the number of labels is 2'
        self.make_label_map(uniq_labels)
        self.X = X
        y = [self.transform_label(label, self,labels_map) for label in y] ## 1, -1로 변환
        y = np.array(y)
        
        ## formulating standard form
        m, n = X.shape
        y = y.reshape(-1,1)*1.
        self.y = y
        if self.kernel is not None:
            Q = np.zeros((m,m))
            for i in range(m):
                for j in range(m):
                    Q[i][j] = y[i]*y[j]*self.get_kernel_val(X[i], X[j])
        else:
            yX = y*X
            Q = np.dot(yX,yX.T)
        P = cvxopt_matrix(Q)
        q = cvxopt_matrix(-np.ones((m, 1)))
        G = cvxopt_matrix(np.vstack((np.eye(m)*-1, np.eye(m))))
        h = cvxopt_matrix(np.hstack((np.zeros(m), np.ones(m) * C)))
        A = cvxopt_matrix(y.reshape(1, -1))
        b = cvxopt_matrix(np.zeros(1))
        
        ## cvxopt configuration
        cvxopt_solvers.options['show_progress'] = False ## 결과 출력 표시 X
        sol = cvxopt_solvers.qp(P, q, G, h, A, b)
        alphas = np.array(sol['x'])
        S = (alphas>1e-4).flatten()
        if self.kernel is not None:
            sum_val = 0
            S_index = np.where(S==True)[0]
            for s in S_index:
                temp_vec = np.array([self.get_kernel_val(z, X[s]) for z in X])
                temp_vec = np.expand_dims(temp_vec, axis=1)
                sum_val += np.sum(y[s] - np.sum(y*alphas*temp_vec))
            b = sum_val/len(S)
            self.b = b
        else:
            w = ((y*alphas).T@X).reshape(-1,1)
            b = np.mean(y[S] - np.dot(X[S],w))
            self.w = w
            self.b = b
        self.alphas = alphas
        return
```

다음으로 예측을 위한 함수를 만들어 주었다.

```
class BinarySVC():
    ## 중략
    
    def predict(self, X):
        predictions = [self._predict(x) for x in X]
        return predictions
        
    def _predict(self, x):
        if self.kernel:
            temp_vec = np.array([self.get_kernel_val(x, y) for y in self.X])
            temp_vec = np.expand_dims(temp_vec, axis=1)
            S = (self.alphas>1e-4).flatten()
            res = np.sign(np.sum(self.y[S]*self.alphas[S]*temp_vec[S])+self.b)
        else:
            res = np.sign(self.w.T.dot(x)+self.b)
        res = self.inverse_label(res, self.labels_map)
        return res
```





















