---
title: "[Ⅱ. Deep Neural Network] Optimization Algorithms (4)"
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
toc_label: "Optimization Algorithms (4)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Optimization Algorithms

## Optimization Algorithms

### Bias Correction in Exponentially Weighted Averages
어떻게 지수 가중 평균을 적용하는지 살펴보았었습니다. 편향 수정이라고 하는 디테일한 기법이 있는데요. 평균의 계산을 더 정확하게 해줍니다. 어떻게 작동하는 것인지 알아보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178386506-95d83730-2135-45ed-b14f-7f45c87478b9.png)

이전에 베타에 대한 수치가 0.9인것과 0.98인 것을 보았습니다. 하지만 수식을 구현하면 실제로 베타가 0.98일때 녹색 곡선을 얻지 않을 것이며 실제로 보라색 곡선을 얻게 됩니다. 보라색 곡선이 아주 낮게 시작한다는 것을 알 수 있죠. 어떻게 고칠 수 있는지 보겠습니다.

이동 평균을 구현할 때, $v_0 = 0$으로 초기화합니다. 그리고 나서 $v_1 = 0.98v_0 + 0.02\theta_1$입니다. 그러나 $v_0 = 0$이므로 그냥 소거됩니다. 그래서 $v_1$은 $0.02\theta_2$에 불과합니다. 그렇기 때문에 첫째날의 온도가 화씨40도인 경우, $v_1 = 0.02 \times 40$일 될 것이고, 그것은 0.8이므로 여기서 훨씬 더 낮은 값을 얻게 됩니다.

이건 첫째날의 온도에 대한 그리 좋은 수치가 아닙니다. 쎄타1과 쎄타2가 양수라고 가정합시다. 이것을 계산할 때, $v_2$는 쎄타1 또는 쎄타2 보다 훨씬 작을 것이며, 그래서 $v_2$는 그 해의 첫 이틀간 기온에 대한 좋은 추정치가 압니다. 이 수치를 수정하면 훨씬 더 정확하게 만들고 훨씬 좋은 결과를 얻을 수 있는 방법이 있는 것으로 알려졌으며 특히 추정 초반 부분에 대한 것입니다.

구체적인 예를 들어 보겠습니다. t가 2인 경우, $1 - \beta^t = 1 - (0.98)^2 = 0.0396$입니다. 그러므로 둘째날의 기온 추정치는 $\cfrac{v_2}{0.0396}$이며 이것은 $\cfrac{0.0196\theta_1 + 0.02\theta_2}{0.0396}$가 됩니다.

이는 쎄타1과 쎄타2의 가중 평균이 되고 이것은 이 편향을 제거합니다. 그러므로 t의 값이 커지면서 베타의 t승은 0에 근접해지고, 그것은 t가 충분히 큰 이유입니다. 편향 수정 영향은 없게됩니다. 그러므로 t의 값이 큰 경우 보라색 선과 초록색 선은 상당히 겹치게 됩니다.

그러나 이러한 초기 학습 단계에서 여전히 추정치를 올리고 있을 때에 편향 수정은 온도에 대한 더 나은 추정치를 얻도록 도울 수 있습니다. 이 편향 수정은 보라색 선에서 녹색 선으로 가도록 도와줍니다.

머신 러닝에서 지수 가중 편균의 대부분의 구현에 대해 사람들은 보통 바이어스 수정에 대해 구현하는 것을 신경쓰지 않습니다. 왜냐하면 대부분의 사람들은 오히려 그 초기 기간을 재고 조금 더 편향된 평가를 한 다음 거기서부터 시작하기 때문입니다.

그러나 초기 단계에서 편향에 대해 우려하며 지수 가중 평균이 아직 워밍 업 하는 동안에 그러면 편향 수정은 더 좋은 추정치를 일찍 하는데 도움이 됩니다.

이제 지수 가중 평균에서의 편향 수정도 알게됐습니다. 계속해서 이를 사용하여 더 나은 최적화 알고리즘을 구축해보겠습니다.


### Gradient Descent with Momentum
모멘텀 또는 기울기 하강과 모멘텀이라고하는 알고리즘이 있는데요. 일반적인 기울기 하강 알고리즘 보다 거의 항상 더 빨리 작동합니다. 한 문장으로 말하자면, 기본 아이디어는 기울기의 지수 가중 평균을 산출하는 것인데요. 그 다음에 이 기울기를 이용해서 가중을 업데이트하는 것입니다. 이번에는 한 문장으로 표현한 이 설명을 풀어서 해석하고 어떻게 도입하는지 한번 보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178394003-862ffbbd-a0a3-4514-97ed-4ae6f00f8c2f.png)

하나의 예로 이런 곡선을 가진 비용함수를 최적화시키려고 한다고 해봅시다. 빨간점은 최소점의 위치를 나타냅니다.

결과적으로 발산 하거나 갈라지게 할 수 있습니다. 따라서 진동이 너무 커지는 것을 방지해야 하기 때문에 너무 크지 않은 학습률을 사용해야 합니다.

이 문제를 보는 또 다른 시각은 바로 세로축에서 입니다. 이 경우에 학습률이 조금 늦길 바랄텐데요. 왜냐하면 이 변동이 싫기 때문이죠. 하지만 가로축의 경우에는 빠른 러닝을 원할 것입니다. 그 이유는 더 공격적으로 왼쪽에서 오른쪽으로 이동하길 바라기 때문입니다. 저기 빨간색 점인 최소값을 향해 말이죠.

기울기 하강과 모멘텀을 도입할때 할 수 있는 것들입니다. 또는 반복마다 또는 더 상세하게 반복 t마다 기본적인 미분 dw, db를 산출할 것입니다. 위첨자 대괄호 L은 생략하겠습니다. 하지만 결국 현재의 미니 배치에서 dw와 db를 계산하는 것입니다.

그리고 배치 기울기 하강을 쓰는 경우, 현재 미니 배치를 그냥 전체 배치 일 것입니다. 그리고 이것은 배치 기울기 하강의 경우 잘 작동합니다. 그러므로 지금 현재 미니 배치가 전체 훈련인 세트경우 이것도 잘 작동합니다.

그러면 그 다음으로 vdW를 베타 vdw가 되도록 계산합니다. $(1-\beta)dw$를 산출합니다. 따라서 이것은 이전에 계산할 때와 유사합니다. $v_{\theta} = \beta v_{\theta} + (1-\beta)\theta_t$입니다. 즉, 그래서 그것은 얻고 있는 w에 대한 미분의 이동 평균을 계산하고 있습니다.

다음으로, 비슷하게 $Vdb = \beta Vdb + (1-\beta)db$로 산출합니다 그러고나서 가중을 업데이트할텐데요. $w := w - \alpha \times Vdw$ $dw$로 업데이트 하는 대신에 미분으로 $vdw$로 업데이트 합니다 그리고 비슷하게, $b := b - \alpha \times Vdb$로 업데이트 합니다 그러면 이것이 하는 것은 기울기 하강의 절차를 부드럽게 해주는 것입니다.

예를 들어, 기울기의 평균화를 구하면 세로축의 방향의 변동은 거의 0에 가까운 값으로 평균화되는 경향이 있음을 알 수 있습니다. 그러므로 세로 방향으로 더 느리게 하고 싶을텐데요. 이것은 양수와 음수를 평균화 하므로 평균은 0에 가까울 것입니다.

반면에, 가로축 방향에서는 모든 미분이 가로 방향의 오른쪽을 가르키는데요. 그래서 가로방향에서의 평균은 아직 꽤 큰 값일 것입니다. 그렇기 때문에 여기 몇개의 반복을 따른 알고리즘에서 기울기 하강과 모멘텀이 결과적으로 세로방향에서 훨씬 더 작은 변동을 나타내는 것을 찾을 수 있어요.

하지만 단순히 더 빨리 가로 방향으로 움직이는 것에 초점이 맞춰져 있죠. 그러므로 이것이 알고리즘이 더 단순한 여정을 밟도록 해주고 또는 최소값의 방향에서 변동이 무뎌지게 해주거나 말이죠. 어떤 사람들에게는 효과가 있는 이 추진력에 대한 하나의 직관이지만 그릇 모양 함수를 최소화하려는 경우 모두가 그렇지 않죠.

그릇 모양 함수를 최소화하면 이동 평균을 제공하는 것으로 생각할 수 있는 아랫막길로 내려가고 있는 공에 가속을 제공한다고 생각하면 됩니다. 그리고 이러한 모멘텀 항은 속도를 나타내는 것으로 생각할 수 있습니다.

그릇이 있다고 가정하고 공을 갖고 미분은 이 작은 공에 가속도를 부여하는데 작은 공이 언덕을 굴러 내려가는 것처럼 말이죠. 그러면 더욱 더 가속에 따라 빨리 구르겠죠. 그리고 데이터는 1보다 약간 작은 값이 되기 때문에 마찰력이 약간 적용되어 공이 제한없이 속도가 붙는 것을 막아줍니다. 그러므로 기울기 하강이 이전의 단계를 각각 개인별로 취하는 것이 아닌거죠.

![image](https://user-images.githubusercontent.com/55765292/178394040-9fe480d9-cf56-4d1a-8d28-1ad83258f7a1.png)

마지막으로 이것을 어떻게 도입하는지 보겠습니다. 이것이 알고리즘인데요. 자 이제 학습률 알파와 여기 파라미터 베타와 같이 2개의 하이퍼 파라미터가 있는데 이것들은 여러분의 지수 가중 평균을 조정하죠. 베타의 가장 흔한 값은 0.9입니다. 그리고 저희는 지금 10일 간의 평균기온을 산출하는 것인데요. 지난 10개의 기울기 하강의 평균치를 구하는 것입니다.

실제로는 베타가 0.9인 것이 잘 작동합니다. 그럼 바이어스 수정도 해 볼까요. vdW 와 vdb를 갖고 나누기 1 빼기 베타의 t승을 해줍니다. 실제로 사람들은 이것을 잘 사용 안하는데요. 왜냐하면 단 10개의 반복 후에 이러한 미분 항이 워밍업되어 더 이상 바이어스 추정치가 아닙니다. 그렇기 때문에 실제로 많은 사람들이 바이어스 수정에 대해 신경쓰는 것을 보지 못합니다. 기울기 하강이나 모멘텀을 도입할 때 말이죠.

그리고 당연히 이 절차는 $Vdw = 0$로 초기화시켜주죠. 여기서 매트릭스는 0들로 이루어진 매트릭스로 dW와 동일한 차원을 갖고 그것은 W와 또 동일한 차원으로 이루어져 있습니다. 그리고 Vdb 또한 0의 벡터로 초기회되죠. 그러면 db와 같은 차원, 결과적으로 b와 같은 차원을 갖게 됩니다.

마지막으로, 모멘텀이 있는 경사 하강에 대한 문헌을 읽는다면 1 - 베타 항이 생략된 것을 종종 볼 수 있다는 점을 언급하고 싶습니다. 그렇게해서 vdW= 베타 vdw 더하기 dW가 됩니다. 여기 보라색 버전을 쓰면서 나타나는 최종 효과는, vdW가 1 빼기 베타로 스케일 된다는 것 또는 더 정확히 얘기하면 1/1-베타로 말입니다.

그러므로 여러분이 이러한 기울기 하강 업데이트를 할때 알파는 그에 상응하는 1/1-베타로 변해야 합니다. 실제로, 이 2개 모두 잘 작동할텐데요. 학습률 알파가 가장 최적의 값이 어떤것인지에 대해 영향을 줍니다. 하지만 개인적으로 이 공식이 조금 덜 직관적으로 이해가 되는데요. 그 이유는 이것의 영향이 바로 하이퍼 파라미터 베타를 튜닝하는 경우, 이것이 vdW 와 vdb의 스케일링에도 영향을 주기 때문입니다. 그러면 결과적으로 학습률 알파를 어쩌면 다시 튜닝해야할 수도 있습니다.

그렇기 때문에 개인적으로 여기 왼쪽에 적은 공식을 선호하는데요. 1 빼기 베타 항을 생략하는 것보다 말이죠. 하지만 베타의 값이 0.9인 2개 모두 하이퍼 파라미터로써 흔한 선택입니다. 단지 학습률이 이 2가지 버전에서 다른 방식으로 튜닝되야 한다는 점이 있는 것뿐이죠.

자, 이것이 기울기 하강과 모멘텀에 대한 내용의 전부인데요. 이것은 모멘텀이 없는 간단한 경사 하강법 알고리즘 보다 거의 항상 더 잘 작동합니다. 하지만 러닝 알고리즘을 빨라지게 만드는 다른 방법이 또 있는데요. 다음에 이런 내용을 다루겠습니다.
