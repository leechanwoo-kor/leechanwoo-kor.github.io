---
title: "[Ⅱ. Deep Neural Network] Optimization Algorithms (3)"
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
toc_label: "Optimization Algorithms (3)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/177095282-038ee3ed-f543-4793-9eff-f2d5ac239f36.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Optimization Algorithms

## Optimization Algorithms

### Exponentially Weighted Averages
이제 몇 가지 최적화 알고리즘을 보여드리고 싶습니다. 이것들은 기울기 하강보다 더 빠릅니다. 이러한 알고리즘을 이해하기 위해서는 지수 가중 평균이라는 것을 사용할 줄 알아야합니다. 지수 가중 이동 평균이라고도 하는데요. 이 부분에 대해 먼저 이야기 해보고 이 내용을 바탕으로 조금 더 상세한 최적화 알고리즘 내용을 다루어 보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178212358-5072544b-1e18-4e6e-9b59-2fc5e5276627.png)

위 그림은 런던의 요일별 날씨를 나타냅니다. 그래서 1월 1일 온도는 화씨 40도 였습니다. 섭씨로는 4도입니다. 그리고 1월 2일에는 섭씨 온도가 9도였습니다. 일년에서 반 정도 지난 시점에는, 1년이 365일이기 때문에 180일 정도가 지난 시점이겠죠, 그러면 5월 말 정도가 되겠군요. 여기서 보면 그 날짜에는 화씨 60도, 섭씨 15도였습니다. 따라서 여름으로 갈수록 따듯해지기 시작하고 1월에는 더 추웠습니다.

그래서 이것으로 데이터를 플로팅합니다. 여름이 시작하는 어느날, 연말의 데이터 등이 있습니다. 이 데이터는 약간의 노이즈가 있는 것으로 보이며 온도의 추세, 지역 평균 또는 이동 평균을 계산하려면 위의 식처럼 하면 됩니다.

일단 $v_0$ 값을 0 으로 초기화 합니다. 그 다음으로, 일 별로 값으로 표시되는 모든 항목의 0.9배에 해당 날짜 온도의 0.1배를 더한 가중치로 평균을 냅니다. 그렇게해서 쎄타 1의 값은 첫째날의 온도가 됩니다. 그리고 둘째날에는 가중 평균을 적용시킬 것입니다. 0.9 곱하기 이전 값 더하기 0.1 곱하기 오늘 날씨 온도 등등입니다. 둘째날 더하기 0.1 곱하기 쎼타 3 등등 말이죠.

v라는 날에 대한 더욱 일반적인 공식은 $v_t = 0.9v_{t-1} + 0.1\theta_t$입니다. 이것을 계산하고 빨간색으로 표시하면 위 그림처럼 나옵니다. 일별 날짜 온도를 이동 평균값으로 나타낸 지수 가중 평균이 나옵니다.

![image](https://user-images.githubusercontent.com/55765292/178212447-03f3fde2-6457-4da1-9b98-de823d936341.png)

그러면 이전 그림에서 봤던 공식을 다시 한번 보겠습니다. 이전에 0.9의 값이었던 값을 베타로 변경할텐데요. 이를 식으로 표현하면

$v_t = \beta v_{t-1} + (1-\beta)\theta_t$

로 나타납니다. 그래서 이전에 베타의 값이 0.9였는데요. 나중에 그 이유에 대해 아시겠지만, 이 값을 산출할 때, $v_t$의 값이 대략적으로 
$\cfrac{1}{1-\beta} \times days' temperature$가 되는 것이라고 생각하면 됩니다. 그렇기 때문에 베타가 0/9가 되는 경우 이것은 이전 10일 동안의 평균 기온과 비슷하다고 생각하시면 됩니다. 그리고 그것은 빨간색 선이었고요.

자, 다른 것을 한번 시도해보죠. 베타를 1과 매우 가까운 값으로 지정해보겠는데요. 베타 값이 0.98이라고 해봅시다. 그러면 $\cfrac{1}{1-0.98} = 50$이 됩니다. 이것은 대략적으로 지난 50일 간의 평균 기온과 비슷하다고 생각하면 됩니다. 이것을 그래프에 나타내면 초록색 라인이 됩니다.

이렇게 매우 큰 베타값에서의 특징 2가지를 살펴보겠습니다. 그래프에 나타나는 것은 훨씬 더 부드러운 결과값인데요. 그 이유는 평균값을 더 많은 일수로 구하기 때문입니다. 그렇기 때문에 이 커브는 곡선이 덜 있고 부드러운 모양이 나오고요.

그러나 반대로 훨씬 더 큰 온도 윈도우에서 평균을 내고 있기 때문에 곡선이 이제 오른쪽으로 더 이동했습니다. 더 큰 윈도우에 대한 평균을 구하는 경우엔 이 공식은 지수 평균 가중의 공식이고 더 느리게 적용되며 온도가 변하는 경우입니다. 약간의 시간차 즉 잠재기가 늘어납니다.

그리고 그 이유는 베타가 0.98인 경우에 그러면 이전 값에 많은 가중치를 부여하고 지금 보고 있는 항목에 0.02에 불과한 훨씬 작은 가중치를 부여합니다. 그래서 온도가 변하는 경우 온도가 상승하거나 떨어지는 경우 지수 평균 가중이 적용됩니다. 베타가 너무 크면 더 천천히 적응합니다.

자 다른 값으로 한번 더 볼까요. 베타를 또 극한 숫자로 지정할 경우에, 예를 들어 0.5라고 하면, 그런 다음 공식을 사용합니다. 이것은 단 이틀의 온도에 대한 평균과 같은 것이며, 이것을 그래프에 나타내면 노란색의 선이 됩니다. 그리고 이틀간의 평균 기온을 구하면 훨씬 더 작은 범위의 평균치를 구하는 것인데요. 데이터에 노이즈가 많고 이상치에 훨씬 더 취약합니다. 그러나 이것은 온도 변화에 훨씬 더 빨리 적응합니다.

이 공식이 그렇기 때문에 많이 도입되는데, 지수 가중 평균이라고 합니다. 지수 가중치라고 하며, 통계 문헌에서는 이동 평균이라고도 합니다. 이용어를 짧게는 지수 가중 평균이라고 할 것이며, 이 매개변수를 변형 시켜주면서 또는 나중에 하이퍼 매개변수를 변형시키면서, 러닝 알고리즘에서는 다양한 효과를 목격할 수 있고, 그리고 어느 사이에 있는 특정 값이 가장 잘 작동하는 경우가 있을 것입니다.

그러면 녹색 또는 노란색 곡선보다 온도의 베타 평균처럼 보일 수 있는 빨간색 곡선이 표시됩니다. 이제 지수 가중 평균을 계산하는 방법에 대한 기본 사항을 알게 되었습니다. 다음에는 이것이 하는일에 대한 직관을 좀 더 알아보겠습니다.


### Understanding Exponentially Weighted Averages
이전에는 지수 가중 평균에 대해서 이야기했었는데요. 신경망을 훈련하는데 사용할 여러 최적화 알고리즘의 주요 요소가 될 것입니다. 그러므로 이번에는 이런 알고리즘이 하는 내용에 대한 직관적인 부분에 대해서 조금 자세히 살펴보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178218111-05ef37dd-5ae4-4c20-b7dc-d8f51de317dd.png)

그림의 식은 지수 가중 평균의 주요 공식입니다. 여기서 베타의 값이 0.9인 경우 빨간색 선이 나오는데요. 만약에 그 값이 1에 가까울 경우, 만약 0.98이면, 초록색 선이 나옵니다. 만약 그 값이 더 작을 경우, 0.5 같은 경우엔, 노란색 선과 같이 됩니다.

이것이 일일 온도의 평균을 계산하는 방법을 이해하기 위해 그 이상을 살펴보겠습니다.

![image](https://user-images.githubusercontent.com/55765292/178218198-e031dc47-024a-439b-874c-90e3889b85f1.png)

그래서 여기 방정식이 다시 있습니다. 베타의 값을 0.9로 설정하고, 이 값에 상응하는 몇개의 식을 더 적어보겠습니다. 만약에 t의 값이 0에서 1로 그리고 2에서 3으로 t가 늘어날 때의 값을 분석하는 반면에 여기서는 t의 값이 감소할 때의 경우를 적었습니다. 그리고 이것은 지속됩니다.

첫번째 식을 보겠습니다. $v_{100}$이 실제로는 어떤 의미 인지 보겠습니다. 2개의 항을 맞바꿔서 보면 $v_{100} = 0.1\theta_{100} + 0.9v_{99}$입니다. 그리고 $v_{99}, v_{98}$을 대입하면 쎄타 100에 대한 가중 평균이 나옵니다. 이것은 그해의 100일간의 온도를 계산한 $v_100$까지 반영하여 현재 시점의 기온을 뜻합니다.

이것을 그림으로 그리는 방법 중 한가지는 몇일간의 기온이 있다고 가정해보겠습니다. 가로축은 t, 세로축은 쎄타이고요. 그러면 각각의 쎄타는 값을 가질 것입니다. 이렇게 몇일의 기온이 있을 것입니다.

그러면 이제 기하급수로 감소하는 함수 하나를 그려볼텐데요. $v_{100}$을 살펴보면서 세부사항까지 봤습니다. 그러나 이러한 모든 계수는 더하면 1이 되거나 1과 매우 근접한 값을 갖게됩니다. 편향 수정이라는 값과 이것에 대한 내용은 다음에 다루겠지만 이런 점 때문에 지수 가중 평균이라고 합니다.

마지막으로 몇일간의 기록으로 기온이 평균값을 갖는지 볼텐데요. 0.9의 10승을 해보면 그 값이 0.35정도 되는데요. 이 값은 대략 1/e이 됩니다. 맨아래 식을 참조하면 베타가 0.9인 경우 높이가 1/3 정도 감소하는데 약 10일 정도가 소요되는데요. 마치 직전 10일간의 기온만 집중하여 지수 가중 평균을 구하는 것과 같습니다. 약 10일 정도 이후 가중치가 현재 날짜 가중치 1/3 보다 약간 더 감소하기 때문에 그렇습니다.

반면에 베타의 값이 0.98이었다고 하면 첫 50일에는 1/e 보다 큰 값이 되었다가, 그 후엔 꽤 빠른 속도로 감소할 것입니다. 그래서 직관적으로 고정불변의 법칙 같이 봐도 되는데, 값이 50일 간의 대략적인 평균치라고 보면 됩니다. 그 이유는 이 예제에서 마치 앱실론의 값이 0.02인 것과 같습니다. 즉, 앱실론 분의 1이 50인 것이죠. 이렇게해서 이 공식이 나오는 것입니다.

1 빼기 베타 분의 1로 평균을 구하는 것이 되죠. 여기서 앱실론은 1-베타를 대체합니다. 이것이 말해주는 것인 어떠한 상수까지 대략적으로 이것이 평균이 되어야하는 평균기온 일 수를 나타냅니다. 하지만 이것은 그냥 대충 들여다 본 것이고, 정식 수학적 표현은 아닙니다 

![image](https://user-images.githubusercontent.com/55765292/178218284-bf37b2f2-ccb4-481d-881b-b703588afc2d.png)

자 그럼 마지막으로 이것을 어떻게 구현하는지 알아보겠습니다. 기억하시겠지만, $v_0$는 0으로 초기화하고 시작하는데요, 그 다음에 첫째날의 $v_1$을 계산하고, 그 다음에 $v_2$ 등등 말이죠.

자 이제 알고리즘을 설명드리자면, 여기 $v_0, v_1, v_2$ 등을 각각의 변수로 적은게 유용했죠. 실제로 이것을 구현하는 경우엔, 이렇게 합니다. $v$를 초기화한 값을 0이라 하고, 첫번째 날은, $v_1 = \beta v_0 + (1-\beta)\theta_1$로 설정할 것입니다. 그 다음날에는, $v$를 업데이트하여 $v_2 = \beta v_1 + (1-\beta)\theta_2$로 할 것입니다. 
어떤 것은 이런 $v_{\theta}$로 표기할텐데요. 쎄타인 파라미터에 대해 지수 가중 평균을 구하고 있다는 의미를 나타냅니다.

다시 말하지만 새로운 형식을 위해, 여러분은 $v_{\theta}$는 0과 같다고 설정하고, 
그 다음에, 반복적으로, 매일, 다음 $\theta_t$를 얻은 다음, $v$로 설정하면, 쎄타가 베타로 업데이트되고, 
$v_{\theta}$의 이전 값에 1 빼기 베타를 곱하고 
$v_{\theta}$의 현재 값을 곱합니다. 

그래서 지수 가중 평균을 구하는 것의 장점 중 하나는, 아주 적은 양의 메모리가 이용된다는 것입니다. 여러분은 단 하나의 값만 메모리에 보관하면 됩니다. 그리고, 가장 마지막 구한 값에 이 공식을 써서 계속 덮어 쓰면 됩니다. 바로 이것이, 바로 효율성인데, 기본적으로 한줄 코드면 되고, 지수 가중 평균을 계산해서 값 하나만 메모리에 저장하면 됩니다. 물론 가장 좋은 방법은 아니며, 가장 정확한 평균 계산 방식은 아닌데요, 구동 윈도우를 이동하여 계산하려면, 명백하게 합을 구해야 하는데, 최근 10일간의 값이나 지난 50일 간의 기온을 더하고 10이나 50으로 나누면, 대개 더 좋은 추정치를 얻게 됩니다.

하지만 이것의 단점은, 이렇게 명백히 그 동안의 기온들을 보관하고 지난 10일간의 수치를 더하려면 더 많은 메모리가 필요하고, 구현도 더 복잡하고, 연산 부담도 커집니다. 예제들을 다음에 보겠습니다만, 많은 양의 변수들의 평균값 계산이 필요합니다. 이것은 계산 및 메모리 효율성 관점에서 매우 효율적인 방법이므로 많은 머신 러닝에서 사용됩니다.

단지 한줄 코드면 된다는 점 역시, 또 하나의 장점이라고 말할 필요도 없죠. 자 이제 여러분은 지수 가중 평균을 어떻게 구현하는지 배웠습니다. 이제 한가지 여러분이 아시면 좋을만한 것이 있는데요. 바로 바이어스 수정입니다 이것은 다음에 볼텐데요, 그 다음에는, 여러분은 이것들을 사용해서 직접적인 생성보다 더 나은 최적화 알고리즘을 구축할 것입니다.