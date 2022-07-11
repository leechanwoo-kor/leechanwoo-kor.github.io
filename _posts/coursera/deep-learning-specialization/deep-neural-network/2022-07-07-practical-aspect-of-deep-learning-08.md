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

여러분의 새로운 네트워크는 특정 파라미터가 있는데요. $W^{[1]}, b^{[1]}$ 등등 그리고 $W^{[L]}, b^{[L]}$까지 있을 수 있습니다. 기울기 검사를 도입하기 위해서는 첫 번째로 할 것은 모든 파라미터를 자이언트 벡터 데이터 형식으로 재정비해야 합니다. 그러니까 해야 할 일은 W 매트릭스를 이용하여, 벡터로 다시 만들면 됩니다.

모든 W들을 가지고 벡터로 변경한 후에 자이언트 벡터 세타를 형성할 수 있도록 벡터를 연결시켜 줍니다. 자이언트 벡터는 쎄타라고 발음합니다. 비용 함수 J는 W들과 b들의 함수라고 할 수 있습니다.

즉 이제는 이 비용 함수가 쎄타의 함수라고 할 수 있습니다. 다음으로는, W와 b를 같은 방식으로 되어있으니, $dW^{[1]}, db^{[1]}$ 등을 이용하여, 그리고 그들을 쎄타와 차원이 같은 큰 자이언트 벡터 d쎄타를 만들 수 있습니다.

이전과 같이 $dW^{[1]}$를 매트릭스로 끼워 넣어 $db^{[1]}$은 이미 벡터죠. 모두 매트릭스이기도 한 $dW$들의 묶음인데요. 이런 $dW^{[L]}$에 변형을 줍니다. $dW^{[1]}$은 $W^{[1]}$과 같은 차원이라는 것을 잊지 마세요.

$db^{[1]}$은 $b^{[1]}$과 동일한 차원을 갖습니다. 따라서 동일한 종류의 재구성 및 연결 작업을 통해 이러한 모든 미분을 거대한 벡터 $d\theta$로 재구성할 수 있습니다. 그것은 쎄타와 차원이 같습니다.

이제 문제는 쎄타가 기울기인지 아니면 비용 함수 J의 기울기인지입니다.

![image](https://user-images.githubusercontent.com/55765292/177708567-de1c6155-24f6-438e-bdc6-b83126ceb0bf.png)

자, 기울기 검사를 도입하는 방법은 이렇습니다. 그리고 기울기 검사는 보통 줄여서 grad check라고 많이 합니다.

첫 번째로 앞서 설명 드렸듯이 J는 이제 자이언트 파리미터의 함수인 쎄타입니다. J로 확대되는 영역은 $\theta_1, \theta_2, \theta_3, \dots$ 등등 이라고 할 수 있습니다. 자이언트 파리미터 벡터 쎄타의 차원이 무엇이 되었건 간에 말이죠.

기울기 검사를 도입하기 위해서는 루프를 도입하는데요. 그래서 각각의 $i$ 마다 즉 쎄타 각각의 요소에 $d\theta_{approx}$를 산출해 보겠습니다. 그래서 양면의 값을 만들어보겠습니다.

$\cfrac{J(\theta_1,\theta_2,\dots,\theta_i+\epsilon,\dots) - J(\theta_1,\theta_2,\dots,\theta_i-\epsilon,\dots)}{2\epsilon}$

식을 보면 쎄타 i를 앱실론 만큼 증가시키고 나머지는 그대로 놔두었습니다. 양면을 취하기 때문에, 쎄타 i를 사용하여 다른 쪽에서도 동일하게 수행하되 엡실론을 뺍니다. 그리고 쎄타의 다른 모든 요소들은 그대로 둡니다. 이 값을 가지고 2 쎄타로 나눕니다.

이전에서 봤듯이 이렇게 하면 대략적으로 $d\theta^{[i]}$와 같아야 합니다. 그리고 모든 i의 값에 대해서 값을 구하면, 마지막에는 두 가지 벡터가 남습니다. $d\theta_{approx}$와 $d\theta$입니다. 이 둘의 차원은 동일할 것입니다.

결과적으로 2개 모두 쎄타와 동일한 차원입니다. 다음으로 할 것은 이 벡터들이 서로 일치하는지 확인하는 작업입니다.

구체적으로 어떻게 하면 2개의 벡터가 비교적 가까이 있는지 여부를 어떻게 정의내릴까요?

먼저 이 2개의 벡터간의 거리를 산출합니다. $d\theta_{approx} - d\theta$의 L2 노름입니다. 보시면 알겠지만 제곱 표시가 위에 없습니다. 그래서 이것은 요소들의 차이에 대한 제곱의 합이고, 그리고 그 다음으로 제곱근을 취해서 유클레디안 거리를 얻습니다.

그런 다음 이 벡터의 길이로 정규화하기 위해 $d\theta_{approx} + d\theta$ 값으로 나눠줍니다. 이 벡터에 해당하는 부분도 모두 유클레디안 거리를 적용하도록 합니다.

이것을 실제로 적용하는 경우에, 엡실론을 10의 -7승과 같다고 하는데요. 더 작은 값을 주면 아주 좋지만 이 범위의 엡실론일 경우 근사가 정확할 가능성이 매우 높다는 것을 의미합니다. 이것은 아주 작은 값입니다.

만약에 범위가 10의 -5승에 해당한다고하면 신중히 살펴볼 것 같습니다. 어쩌면 괜찮을 수도 있습니다. 하지만 벡터의 구성 요소를 다시 한번 봐서 그리고 모든 요소들이 너무 크지 않도록 확인할 것입니다.

그리고 이 요소의 차이가 너무 크면 어느 곳에 버그가 있는 것일 수도 있습니다. 만약 공식이 -3승이라고 하면 어디에 버그가 있을지도 몰라서 걱정이 될 것입니다. 10의 -3승 보다 훨씬 더 작은 값을 가져야 합니다. 10의 -3승 보다 더 큰 값이 나오면 어느 곳에 버그가 있을지도 모른다고 걱정이 될 것입니다.

이런 경우엔 개인적인 데이터 요소들을 일일이 보면서 i의 값 중에서 $d\theta$ 값이 $d\theta^{[i]}$와 현저히 다른 값을 찾을 것입니다. 그리고 이것을 이용해서 미분 계산이 틀린 지 여부도 찾아볼 것입니다.

이렇게해서 어느 정도 디버깅을 한 이후에, 마침내 작은 값으로 결과가 나올텐데요. 이렇게 되면 정상적으로 도입한 것일겁니다. 그러므로 신경망을 도입할 때는 보통은 순전파를 도입한 후에 역전파를 도입할 것입니다. 그리고 나서 기울기 검사를 통해 큰 값을 확인할 수 있습니다.

이런 경우 버그가 있음을 감지하고 디버그하고 또 디버그하고 또 디버그할 것입니다. 이렇게 디버깅을 어느 정도 실시한 이후, 기울기 검사를 통해 작은 결과 값이 나오면 훨씬 더 자신 있게 맞다고 이야기할 수 있습니다.

자 이제 기울기 검사가 어떻게 이루어지는지 알았습니다. 신경망을 도입하는 시점에서 이 방법은 버그를 찾는데 큰 도움을 주었고, 이 방법이 도움이 되길 바랍니다. 이어서 기울기 검사를 도입하는 방법에 대한 팁과 노트를 보겠습니다.


---


### Gradient Checking Implementation Notes

![image](https://user-images.githubusercontent.com/55765292/177724203-e5fea4d0-a8a6-4d1a-9a2b-2ae5bb300cbe.png)

첫째, 훈련에서 기울기 검사를 사용하지 말고 디버그용으로만 사용하세요. 이게 의미하는 바는 $d\theta_{approx}^{[i]}$를 계산하는 것, i의 모든 값에 대해 이것은 매우 느린 계산인데요. 기울기 하강을 도입하는 데는 역전파를 사용해서 $d\theta$를 계산하고 역전파를 이용해서 미분을 계산합니다.

이것을 계산하는 것은 디버깅할 때만 가능한데요. 그리고 쎄타에 가까운지 확인하기 위한거죠. 하지만 일단 그렇게 하고나면 기울기 검사를 끄고 그리고 기울기 하강을 반복할 때마다 이 검사를 실행하지 않습니다.

둘째로, 알고리즘이 기울기 검사에 실패한 경우 요소들을 보세요. 개인별 요소들을 보고 버그를 찾으세요 그래서 의미하는 바는 $d\theta_{approx}$가 $d\theta$에서 매우 멀다면 하려는 것은 i의 다른 값을 살펴보고 $d\theta_{approx}$의 값이 실제로 $d\theta$와 값이 다릅니다.

예를 들어 쎄타의 값 또는 $d\theta$의 값이 그것들은 멀리 떨어져 있고, 일부 레이어 또는 일부 레이어의 경우 모드 $db^{[l]}$에 해당하지만 $dw$의 구성 요소는 매우 가깝습니다. 기억할 것은 쎄타의 다른 구성요소는 $b$와 $w$의 다른 구성요소에 해당합니다.

이것이 사실이라면, 버그가 매개변수 b에 대한 미분인 $db$를 계산하는 방법에 있다는 것을 알게 될 것입니다. 마찬가지로 그 반대의 경우도, 만약 매우 먼 값을 찾는 경우 $d\theta$에서 멀리 떨어져 있는 $d\theta{approx}$의 값이며, 그 모든 구성요소가 $dw$에서 또는 특정 레이어의 $dw$에서 온 것을 발견하면 버그의 위치를 찾는 데 도움이 될 수 있습니다.

이것이 항상 버그를 즉시 식별할 수 있게 해주는 것은 아니지만, 때때로 버그를 추적할 위치에 대한 몇 가지 추축을 제공하는 데 도움이 됩니다.

다음으로 기울기 검사를 하는 경우, 정규화를 사용하는 경우 정규화 항을 기억하세요. 따라서 비용 함수가 $J(\theta)$라면 위 그림에 작성한 식과 같습니다. 그리고 $d\theta$가 이 정규화 항을 포함하여 쎄타에 대한 J의 기울기임을 가져야 합니다. 잊지 말고 여기 항을 추가해야합니다.

다음으로 기울기 검사는 드롭아웃에서 작동하지 않는데요. 왜냐하면 모든 반복에서 드롭아웃이 무작위로 은닉 유닛의 일부를 제거하기 때문입니다. 드롭아웃이 경사하강을 수행하는 비용 함수 J를 계산하기 쉽지 않습니다. 드롭아웃은 비용 함수 J를 최적화 시켜준다고 할 수 있는데요. 하지만 비용 함수 J는 반복 업무를 통해 제거될 수 있는 기하급수적으로 큰 값의 노드 일부를 더해서 정의됩니다.

그러므로 비용함수 J는 산출하기 매우 까다롭고, 그리고 단지 비용 함수를 샘플링하는 것입니다. 드롭아웃을 사용하는 다른 임의의 하위 집합을 제거할 때마다 말이죠. 따라서 기울기를 사용하여 드롭아웃이 있는 계산을 다시 확인하기가 어렵습니다.

따라서 원하는 경우 keep-prob 및 드롭아웃을 1.0과 같게 설정할 수 있습니다. 그 이후로 드롭아웃을 키고난 뒤 드롭아웃의 도입이 옳았기를 바랄 수 있겠죠.

마지막으로 불가능한 것은 아니고 거의 발생하지 않습니다. 하지만 w와 b가 0에 가까울 때 기울기 하강 구현이 올바른 것은 불가능하지 않으며, 그래서 무작위 초기화입니다. 하지만 기울기 하강을 실행하면서 w와 b의 값이 커지면서, w와 b가 0에 가까울 때만 역전파 구현이 정확할 수 있습니다. 그러나 w와 b의 값이 커지면 커질수록 정확도가 떨어지게 되는 것이죠.

그러므로 한가지 할 수 있는 것은 기울기 검사를 무작위 초기화에서 실행시키고 그 다음에 네트워크를 어느 정도 훈련 시킨 뒤, w와 b의 값이 0에서 조금 떨어지게 시간을 가질 수 있게 말이죠. 처음의 작은 무작위의 값에서 떨어질 수 있게요. 그 다음 몇 번 훈련을 반복한 후에 다시 기울기 검사를 실행하는 것입니다. 기울기 검사에 대한 내용은 이것이 전부입니다.

훈련, 개발 테스트 세트를 설정하는 방법, 편향 및 분산을 분석하는 방법, 높은 편향 대 고분산 대 아마도 높은 편향이 있는 경우 해야 할 일에 대해 배웠습니다.

정규화에 대한 다른 유형도 살펴보았는데요. 신경망의 L2 정규화와 드롭아웃에 대해 알아봤습니다. 즉, 신경망 훈련의 속도를 높이는 방법을 알아봤습니다

마지막으로, 기울기 검사입니다 그래서 이번에는 많이 보셨겠지만, 이번 내용을 프로그래밍 학습을 통해 많이 연습하실 수 있습니다.